import { NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase"
import { isAdmin } from "@/lib/admin"

export async function GET(_request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()
    const { data: { session } } = await supabase.auth.getSession()

    if (!session?.user?.email || !isAdmin(session.user.email)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    // Fetch payment records from content_history (where platform = 'payment')
    const { data: paymentRecords } = await supabase
      .from("content_history")
      .select("*")
      .eq("platform", "payment")
      .order("created_at", { ascending: false })
      .limit(50)

    // Parse JSON content for each payment record
    const transactions = (paymentRecords || []).map((record) => {
      let content: Record<string, unknown> = {}
      try {
        content = JSON.parse(record.content || "{}")
      } catch {
        // ignore
      }
      return {
        id: record.id,
        user_id: record.user_id,
        created_at: record.created_at,
        ...content,
      }
    })

    // Fetch subscriptions from the existing table
    const { data: subscriptions } = await supabase
      .from("subscriptions")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50)

    return NextResponse.json({
      transactions,
      subscriptions: subscriptions || [],
      admin: session.user.email,
    })
  } catch (error) {
    console.error("Admin API error:", error)
    return NextResponse.json(
      { error: "Database query failed" },
      { status: 503 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()
    const { data: { session } } = await supabase.auth.getSession()

    if (!session?.user?.email || !isAdmin(session.user.email)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    const body = await request.json()
    const { action, transactionId, userId, planId } = body

    if (action === "verify_transaction") {
      if (!transactionId) {
        return NextResponse.json({ error: "Missing transactionId" }, { status: 400 })
      }

      // Get the transaction from content_history
      const { data: record } = await supabase
        .from("content_history")
        .select("*")
        .eq("id", transactionId)
        .single()

      if (!record) {
        return NextResponse.json({ error: "Transaction not found" }, { status: 404 })
      }

      let content: Record<string, unknown> = {}
      try {
        content = JSON.parse(record.content || "{}")
      } catch {
        // ignore
      }

      const targetPlan = (content.plan_id as string) || planId || "pro"
      const targetUserId = record.user_id
      const limit = targetPlan === "agency" ? 999999 : targetPlan === "pro" ? 500 : 50

      // Update subscription in existing table
      const { error: subError } = await supabase
        .from("subscriptions")
        .update({
          plan_id: targetPlan,
          status: "active",
          posts_limit: limit,
          updated_at: new Date().toISOString(),
        })
        .eq("user_id", targetUserId)

      if (subError) {
        return NextResponse.json({ error: "Failed to update subscription" }, { status: 500 })
      }

      return NextResponse.json({ success: true, message: "Payment verified and subscription activated" })
    }

    if (action === "activate_subscription") {
      if (!userId || !planId) {
        return NextResponse.json({ error: "Missing userId or planId" }, { status: 400 })
      }

      const limit = planId === "agency" ? 999999 : planId === "pro" ? 500 : 50

      const { error: subError } = await supabase
        .from("subscriptions")
        .update({
          plan_id: planId,
          status: "active",
          posts_limit: limit,
          updated_at: new Date().toISOString(),
        })
        .eq("user_id", userId)

      if (subError) {
        return NextResponse.json({ error: "Failed to update subscription" }, { status: 500 })
      }

      return NextResponse.json({ success: true, message: "Subscription activated" })
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 })
  } catch (error) {
    console.error("Admin API error:", error)
    return NextResponse.json(
      { error: "Database query failed" },
      { status: 503 }
    )
  }
}
