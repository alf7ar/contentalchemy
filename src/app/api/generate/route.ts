import { NextRequest, NextResponse } from "next/server"
import { generateContent, type Platform } from "@/lib/openai"

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

    const result = await generateContent({
      platform: platform as Platform,
      topic,
      businessName,
      businessType,
      tone,
      targetAudience,
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error("Generation API error:", error)
    return NextResponse.json(
      { error: "Failed to generate content" },
      { status: 500 }
    )
  }
}
