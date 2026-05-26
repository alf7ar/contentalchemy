import { createClient } from "@/lib/supabase"
import type { PlanId } from "@/lib/payment"

export interface UserSubscription {
  id: string
  user_id: string
  plan_id: PlanId
  status: "active" | "expired" | "cancelled" | "pending" | "trialing"
  posts_limit: number
  brands_limit: number
  current_period_start: string
  current_period_end: string | null
  created_at: string
  updated_at: string
}

export interface UsageRecord {
  id: string
  user_id: string
  month: string // DATE: YYYY-MM-DD
  posts_used: number
  brands_used: number
}

export interface UsageInfo {
  used: number
  limit: number
  remaining: number
  plan: PlanId
  isPro: boolean
}

const PLAN_POST_LIMITS: Record<PlanId, number> = {
  free: 3,
  starter: 50,
  pro: -1, // unlimited
  agency: -1, // unlimited
}

function getCurrentMonthKey(): string {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-01`
}

/**
 * Get the current user's subscription
 */
export async function getUserSubscription(userId: string): Promise<UserSubscription | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(1)
    .single()

  if (error || !data) return null
  return data as UserSubscription
}

/**
 * Get usage record for current month
 */
export async function getCurrentUsage(userId: string): Promise<UsageRecord | null> {
  const supabase = createClient()
  const monthKey = getCurrentMonthKey()

  const { data, error } = await supabase
    .from("usage_tracker")
    .select("*")
    .eq("user_id", userId)
    .gte("month", monthKey)
    .lt("month", `${new Date().getFullYear()}-${String(new Date().getMonth() + 2).padStart(2, "0")}-01`)
    .limit(1)
    .maybeSingle()

  if (error) return null
  return data as UsageRecord | null
}

/**
 * Increment usage counter for current month
 */
export async function incrementUsage(userId: string): Promise<boolean> {
  const supabase = createClient()
  const monthKey = getCurrentMonthKey()

  // Check if record exists
  const existing = await getCurrentUsage(userId)

  if (existing) {
    const { error } = await supabase
      .from("usage_tracker")
      .update({ posts_used: (existing.posts_used || 0) + 1 })
      .eq("id", existing.id)

    if (error) {
      console.warn("Failed to increment usage:", error)
      return false
    }
    return true
  } else {
    // Create new usage record
    const { error } = await supabase.from("usage_tracker").insert({
      user_id: userId,
      month: monthKey,
      posts_used: 1,
      brands_used: 0,
    })

    if (error) {
      console.warn("Failed to create usage record:", error)
      return false
    }
    return true
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
    const supabase = createClient()
    const subscription = await getUserSubscription(userId)

    // If no subscription found, use free plan defaults
    const planId: PlanId = (subscription?.plan_id as PlanId) ?? "free"
    // Use posts_limit from subscription table if available, otherwise derive from plan
    const limit = subscription?.posts_limit ?? PLAN_POST_LIMITS[planId] ?? 3

    // Pro/Agency = unlimited
    if (limit === -1) {
      return {
        allowed: true,
        usage: { used: 0, limit: -1, remaining: 999999, plan: planId, isPro: true },
      }
    }

    const usage = await getCurrentUsage(userId)
    const used = usage?.posts_used ?? 0

    if (used >= limit) {
      return {
        allowed: false,
        usage: { used, limit, remaining: 0, plan: planId, isPro: false },
        error: `You've reached your monthly limit of ${limit} posts. Upgrade your plan to generate more.`,
      }
    }

    return {
      allowed: true,
      usage: { used, limit, remaining: limit - used, plan: planId, isPro: false },
    }
  } catch (dbError) {
    // Graceful fallback
    console.warn("DB not ready for usage tracking, allowing:", dbError)
    return {
      allowed: true,
      usage: { used: 0, limit: 999, remaining: 999, plan: "free", isPro: false },
    }
  }
}

/**
 * Update subscription plan (after payment verification)
 */
export async function updateSubscriptionPlan(
  userId: string,
  planId: PlanId,
): Promise<boolean> {
  const supabase = createClient()
  const limit = PLAN_POST_LIMITS[planId]
  const displayLimit = limit === -1 ? 999999 : limit

  const { error } = await supabase
    .from("subscriptions")
    .update({
      plan_id: planId,
      status: "active",
      posts_limit: displayLimit,
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", userId)

  if (error) {
    console.warn("Failed to update subscription:", error)
    return false
  }
  return true
}

/**
 * Verify a payment transaction (for n8n webhook / admin)
 * Updates the subscription plan and logs payment in content_history
 */
export async function verifyPayment(params: {
  userId: string
  planId: PlanId
  paymentMethod: string
  transactionRef: string
}): Promise<{ success: boolean; error?: string }> {
  const supabase = createClient()

  // First, check if the user has a subscription
  const subscription = await getUserSubscription(params.userId)

  if (!subscription) {
    // No subscription exists - but with the trigger on auth.users, this shouldn't happen
    // If it does, create one
    const limit = PLAN_POST_LIMITS[params.planId]
    const displayLimit = limit === -1 ? 999999 : limit

    const { error: insertError } = await supabase.from("subscriptions").insert({
      user_id: params.userId,
      plan_id: params.planId,
      status: "active",
      posts_limit: displayLimit,
      brands_limit: params.planId === "agency" ? 999 : params.planId === "pro" ? 10 : 3,
      current_period_start: new Date().toISOString(),
    })

    if (insertError) {
      return { success: false, error: "Failed to create subscription" }
    }
  } else {
    // Update existing subscription
    const limit = PLAN_POST_LIMITS[params.planId]
    const displayLimit = limit === -1 ? 999999 : limit

    const { error: updateError } = await supabase
      .from("subscriptions")
      .update({
        plan_id: params.planId,
        status: "active",
        posts_limit: displayLimit,
        updated_at: new Date().toISOString(),
      })
      .eq("id", subscription.id)

    if (updateError) {
      return { success: false, error: "Failed to update subscription" }
    }
  }

  // Log payment in content_history for record
  await supabase.from("content_history").insert({
    user_id: params.userId,
    content: JSON.stringify({
      type: "payment",
      plan_id: params.planId,
      payment_method: params.paymentMethod,
      transaction_ref: params.transactionRef,
      amount_egp: params.planId === "agency" ? 999 : params.planId === "pro" ? 499 : 199,
      verified_at: new Date().toISOString(),
    }),
    platform: "payment",
  })

  return { success: true }
}

/**
 * Get all payment records for admin (from content_history)
 */
export async function getPaymentRecords() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("content_history")
    .select("*")
    .eq("platform", "payment")
    .order("created_at", { ascending: false })

  if (error) return []
  return data.map((record) => {
    let content: Record<string, unknown> = {}
    try {
      content = JSON.parse(record.content || "{}")
    } catch {
      // ignore
    }
    return { id: record.id, user_id: record.user_id, ...content, created_at: record.created_at }
  })
}
