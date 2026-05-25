import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, data } = body

    console.log("Paymob webhook received:", { type, data })

    if (type === "TRANSACTION") {
      const { success, order_id, amount_cents } = data
      if (success) {
        // Activate subscription for user
        console.log(`Payment successful for order ${order_id}, amount: ${amount_cents}`)
        // TODO: Update user subscription in database
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 })
  }
}
