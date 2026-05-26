import { NextRequest, NextResponse } from "next/server"
import { sendEmail, getWelcomeEmailHtml } from "@/lib/email"
import { createClient } from "@/lib/supabase"

export async function POST(_request: NextRequest) {
  try {
    const supabase = createClient()
    const { data: { session } } = await supabase.auth.getSession()

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const name = session.user.user_metadata?.full_name || session.user.email?.split("@")[0] || "User"
    const locale = session.user.user_metadata?.locale || "ar"

    const sent = await sendEmail({
      to: session.user.email,
      subject: locale === "ar" ? "مرحباً بك في ContentAlchemy! 🎉" : "Welcome to ContentAlchemy! 🎉",
      html: getWelcomeEmailHtml(name, locale),
    })

    if (sent) {
      return NextResponse.json({ success: true })
    }

    // Email service not configured - that's ok
    return NextResponse.json({ success: false, message: "Email service not configured" })
  } catch {
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
