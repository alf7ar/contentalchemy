import { NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase"
import { generateContent, type Platform } from "@/lib/openai"
import { checkUsageLimit, incrementUsage } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { platform, topic, businessName, businessType, tone, targetAudience } = body

    if (!platform || !topic) {
      return NextResponse.json(
        { error: "Missing required fields: platform, topic" },
        { status: 400 }
      )
    }

    // Check authentication
    const supabase = await createServerSupabaseClient()
    const { data: { session } } = await supabase.auth.getSession()

    if (!session?.user) {
      return NextResponse.json(
        { error: "Authentication required. Please sign in." },
        { status: 401 }
      )
    }

    // Check usage limit
    const { allowed, usage, error: usageError } = await checkUsageLimit(session.user.id)

    if (!allowed) {
      return NextResponse.json(
        {
          error: usageError || "Monthly limit reached",
          usage,
          code: "USAGE_LIMIT_REACHED",
        },
        { status: 403 }
      )
    }

    // Generate content
    const result = await generateContent({
      platform: platform as Platform,
      topic,
      businessName,
      businessType,
      tone,
      targetAudience,
    })

    // Increment usage
    await incrementUsage(session.user.id)

    return NextResponse.json({
      ...result,
      usage: {
        ...usage,
        used: usage.used + 1,
        remaining: Math.max(0, usage.remaining - 1),
      },
    })
  } catch (error) {
    console.error("Generation API error:", error)
    return NextResponse.json(
      { error: "Failed to generate content" },
      { status: 500 }
    )
  }
}
