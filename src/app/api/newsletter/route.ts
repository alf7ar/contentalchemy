import { NextRequest, NextResponse } from "next/server"

interface NewsletterEntry {
  email: string
  date: string
  source: string
}

// In-memory store (resets on server restart - for production use a database)
const subscribers: NewsletterEntry[] = []

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, source } = body

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "البريد الإلكتروني غير صحيح" },
        { status: 400 }
      )
    }

    // Check if already subscribed
    const exists = subscribers.find(s => s.email === email.toLowerCase())
    if (exists) {
      return NextResponse.json(
        { message: "أنت مشترك بالفعل!" },
        { status: 200 }
      )
    }

    const entry: NewsletterEntry = {
      email: email.toLowerCase(),
      date: new Date().toISOString(),
      source: source || "landing-page",
    }

    subscribers.push(entry)

    // TODO: Connect to email service (SendGrid, Mailchimp, etc.)
    // await emailService.addSubscriber(entry)

    console.log(`[Newsletter] New subscriber: ${email} from ${entry.source}`)

    return NextResponse.json(
      { message: "تم الاشتراك بنجاح!" },
      { status: 201 }
    )
  } catch (error) {
    console.error("[Newsletter] Error:", error)
    return NextResponse.json(
      { error: "حصل خطأ. حاول مرة أخرى." },
      { status: 500 }
    )
  }
}

// Admin: get subscriber count
export async function GET() {
  return NextResponse.json({
    count: subscribers.length,
    subscribers: subscribers.slice(-10).reverse(),
  })
}
