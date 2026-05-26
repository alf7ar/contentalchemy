import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase"
import { checkUsageLimit, getUserSubscription } from "@/lib/db"

export async function GET(_request: NextRequest) {
  try {
    const supabase = createClient()
    const { data: { session } } = await supabase.auth.getSession()

    if (!session?.user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      )
    }

    const usage = await checkUsageLimit(session.user.id)
    const subscription = await getUserSubscription(session.user.id)

    return NextResponse.json({
      authenticated: true,
      user: {
        id: session.user.id,
        email: session.user.email,
        name: session.user.user_metadata?.full_name || null,
      },
      usage: usage.usage,
      subscription: subscription
        ? {
            plan: subscription.plan_id,
            status: subscription.status,
            startDate: subscription.start_date,
            endDate: subscription.end_date,
            paymentVerified: subscription.payment_verified,
          }
        : null,
    })
  } catch (error) {
    console.error("User API error:", error)
    return NextResponse.json(
      { error: "Failed to fetch user data" },
      { status: 500 }
    )
  }
}
