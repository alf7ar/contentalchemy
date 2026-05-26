import { NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase"
import { checkUsageLimit, getUserSubscription } from "@/lib/db"

export async function GET(_request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()
    const { data: { session } } = await supabase.auth.getSession()

    if (!session?.user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      )
    }

    let usageResult: { allowed: boolean; usage: { used: number; limit: number; remaining: number; plan: string; isPro: boolean }; error?: string }
    let subscription: Awaited<ReturnType<typeof getUserSubscription>> | null = null
    try {
      usageResult = await checkUsageLimit(session.user.id)
      subscription = await getUserSubscription(session.user.id)
    } catch {
      usageResult = { allowed: true, usage: { used: 0, limit: 999, remaining: 999, plan: "free", isPro: false } }
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        id: session.user.id,
        email: session.user.email,
        name: session.user.user_metadata?.full_name || null,
      },
      usage: usageResult.usage,
      subscription: subscription
        ? {
            plan: subscription.plan_id,
            status: subscription.status,
            postsLimit: subscription.posts_limit,
            startDate: subscription.current_period_start,
            endDate: subscription.current_period_end,
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
