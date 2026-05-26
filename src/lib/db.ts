import { createClient } from "@/lib/supabase"
import type { PlanId } from "@/lib/payment"

export interface UserSubscription {
  id: string
  user_id: string
  plan_id: PlanId
  status: "active" | "expired" | "cancelled" | "pending"
  start_date: string
  end_date: string | null
  payment_method: string | null
  payment_ref: string | null
  payment_verified: boolean
}

export interface UsageRecord {
  id: string
  user_id: string
  month: number
  year: number
  posts_used: number
  posts_limit: number
}

export interface UsageInfo {
  used: number
  limit: number
  remaining: number
  plan: PlanId
  isPro: boolean // true if unlimited
}

const PLAN_POST_LIMITS: Record<PlanId, number> = {
  free: 3,
  starter: 50,
  pro: -1, // unlimited
  agency: -1, // unlimited
}

const supabase = createClient()

/**
 * Get the current user's subscription
 */
export async function getUserSubscription(userId: string): Promise<UserSubscription | null> {
  const { data, error } = await supabase
    .from("user_subscriptions")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(1)
    .single()

  if (error || !data) return null
  return data as UserSubscription
}

/**
 * Get or create usage record for current month
 */
export async function getOrCreateUsage(userId: string, planId: PlanId): Promise<UsageRecord> {
  const now = new Date()
  const month = now.getMonth() + 1
  const year = now.getFullYear()

  // Try to find existing record
  const { data: existing } = await supabase
    .from("usage_tracking")
    .select("*")
    .eq("user_id", userId)
    .eq("month", month)
    .eq("year", year)
    .single()

  if (existing) return existing as UsageRecord

  // Create new record
  const limit = PLAN_POST_LIMITS[planId] ?? 3
  // If unlimited (pro/agency), use a large number for display but keep 0 used
  const displayLimit = limit === -1 ? 999999 : limit

  const { data: created, error } = await supabase
    .from("usage_tracking")
    .insert({
      user_id: userId,
      month,
      year,
      posts_used: 0,
      posts_limit: displayLimit,
    })
    .select()
    .single()

  if (error || !created) throw new Error("Failed to create usage record")
  return created as UsageRecord
}

/**
 * Increment usage counter
 */
export async function incrementUsage(userId: string): Promise<void> {
  const now = new Date()
  const month = now.getMonth() + 1
  const year = now.getFullYear()

  const { error } = await supabase.rpc("increment_usage", {
    p_user_id: userId,
    p_month: month,
    p_year: year,
  })

  // If RPC doesn't exist yet, use direct update
  if (error) {
    // Try increment directly
    const { error: updateError } = await supabase
      .from("usage_tracking")
      .update({ posts_used: supabase.rpc("increment", { amount: 1 }) } as Record<string, unknown>)
      .eq("user_id", userId)
      .eq("month", month)
      .eq("year", year)

    // Last resort: increment via raw SQL
    if (updateError) {
      await supabase.from("usage_tracking").upsert(
        { user_id: userId, month, year, posts_used: 1 },
        { onConflict: "user_id,month,year" }
      )
    }
  }
}

/**
 * Check if user can generate more content
 */
export async function checkUsageLimit(userId: string): Promise<{
  allowed: boolean
  usage: UsageInfo
  error?: string
}> {
  try {
    const subscription = await getUserSubscription(userId)
    const planId: PlanId = subscription?.plan_id ?? "free"
    const limit = PLAN_POST_LIMITS[planId]

    // Pro/Agency = unlimited
    if (limit === -1) {
      return {
        allowed: true,
        usage: { used: 0, limit: -1, remaining: 999999, plan: planId, isPro: true },
      }
    }

    const usage = await getOrCreateUsage(userId, planId)

    if (usage.posts_used >= limit) {
      return {
        allowed: false,
        usage: {
          used: usage.posts_used,
          limit,
          remaining: 0,
          plan: planId,
          isPro: false,
        },
        error: `You've reached your monthly limit of ${limit} posts. Upgrade your plan to generate more.`,
      }
    }

    return {
      allowed: true,
      usage: {
        used: usage.posts_used,
        limit,
        remaining: limit - usage.posts_used,
        plan: planId,
        isPro: false,
      },
    }
  } catch (dbError) {
    // Graceful fallback: if DB tables don't exist yet, allow generation
    console.warn("DB not ready for usage tracking, allowing (run migration):", dbError)
    return {
      allowed: true,
      usage: { used: 0, limit: 999, remaining: 999, plan: "free", isPro: false },
    }
  }
}

/**
 * Verify a payment transaction
 */
export async function verifyPayment(transactionRef: string): Promise<{
  success: boolean
  userId?: string
  planId?: string
  error?: string
}> {
  const { data: transaction, error } = await supabase
    .from("payment_transactions")
    .select("*, user_subscriptions!inner(user_id, plan_id)")
    .eq("transaction_ref", transactionRef)
    .single()

  if (error || !transaction) {
    return { success: false, error: "Transaction not found" }
  }

  // Mark transaction as verified
  await supabase
    .from("payment_transactions")
    .update({ status: "verified", verified_at: new Date().toISOString(), verified_by: "webhook" })
    .eq("id", transaction.id)

  // Update subscription
  await supabase
    .from("user_subscriptions")
    .update({
      status: "active",
      payment_verified: true,
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", transaction.user_id)

  // Update usage limit
  const planId = transaction.plan_id
  const limit = PLAN_POST_LIMITS[planId as PlanId] ?? 3
  const displayLimit = limit === -1 ? 999999 : limit

  const now = new Date()
  await supabase.from("usage_tracking").upsert(
    {
      user_id: transaction.user_id,
      month: now.getMonth() + 1,
      year: now.getFullYear(),
      posts_limit: displayLimit,
    },
    { onConflict: "user_id,month,year" }
  )

  return {
    success: true,
    userId: transaction.user_id,
    planId: transaction.plan_id,
  }
}

/**
 * Create a payment transaction record
 */
export async function createPaymentTransaction(params: {
  userId: string
  planId: PlanId
  amountEGP: number
  paymentMethod: "instapay" | "vodafone_cash"
  transactionRef: string
  phoneNumber?: string
}): Promise<{ id: string } | null> {
  const { data, error } = await supabase
    .from("payment_transactions")
    .insert({
      user_id: params.userId,
      plan_id: params.planId,
      amount_egp: params.amountEGP,
      payment_method: params.paymentMethod,
      transaction_ref: params.transactionRef,
      phone_number: params.phoneNumber || null,
      status: "pending",
    })
    .select("id")
    .single()

  if (error) return null
  return { id: data.id }
}
