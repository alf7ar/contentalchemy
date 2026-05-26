import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase"
import { isAdmin } from "@/lib/admin"

export async function GET(_request: NextRequest) {
  try {
    const supabase = createClient()
    const { data: { session } } = await supabase.auth.getSession()

    if (!session?.user?.email || !isAdmin(session.user.email)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    // Fetch payment transactions
    const { data: transactions } = await supabase
      .from("payment_transactions")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50)

    // Fetch active subscriptions
    const { data: subscriptions } = await supabase
      .from("user_subscriptions")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50)

    return NextResponse.json({
      transactions: transactions || [],
      subscriptions: subscriptions || [],
      admin: session.user.email,
    })
  } catch (error) {
    console.error("Admin API error:", error)
    return NextResponse.json(
      { error: "Database not ready. Run the SQL migration first." },
      { status: 503 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
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

      // Get the transaction
      const { data: transaction } = await supabase
        .from("payment_transactions")
        .select("*")
        .eq("id", transactionId)
        .single()

      if (!transaction) {
        return NextResponse.json({ error: "Transaction not found" }, { status: 404 })
      }

      // Mark transaction as verified
      await supabase
        .from("payment_transactions")
        .update({ status: "verified", verified_at: new Date().toISOString(), verified_by: "admin" })
        .eq("id", transactionId)

      // Activate subscription
      const limit = transaction.plan_id === "pro" || transaction.plan_id === "agency" ? 999999 : 50
      await supabase
        .from("user_subscriptions")
        .upsert({
          user_id: transaction.user_id,
          plan_id: transaction.plan_id,
          status: "active",
          payment_method: transaction.payment_method,
          payment_ref: transaction.transaction_ref,
          payment_verified: true,
          start_date: new Date().toISOString(),
        }, { onConflict: "user_id,plan_id" })

      // Update usage limit
      const now = new Date()
      await supabase.from("usage_tracking").upsert(
        {
          user_id: transaction.user_id,
          month: now.getMonth() + 1,
          year: now.getFullYear(),
          posts_limit: limit,
        },
        { onConflict: "user_id,month,year" }
      )

      return NextResponse.json({ success: true, message: "Payment verified and subscription activated" })
    }

    if (action === "activate_subscription") {
      if (!userId || !planId) {
        return NextResponse.json({ error: "Missing userId or planId" }, { status: 400 })
      }

      const limit = planId === "pro" || planId === "agency" ? 999999 : 50
      await supabase
        .from("user_subscriptions")
        .upsert({
          user_id: userId,
          plan_id: planId,
          status: "active",
          payment_method: "instapay",
          payment_verified: true,
          start_date: new Date().toISOString(),
        }, { onConflict: "user_id,plan_id" })

      const now = new Date()
      await supabase.from("usage_tracking").upsert(
        {
          user_id: userId,
          month: now.getMonth() + 1,
          year: now.getFullYear(),
          posts_limit: limit,
        },
        { onConflict: "user_id,month,year" }
      )

      return NextResponse.json({ success: true, message: "Subscription activated" })
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 })
  } catch (error) {
    console.error("Admin API error:", error)
    return NextResponse.json(
      { error: "Database not ready. Run the SQL migration first." },
      { status: 503 }
    )
  }
}
