import { NextRequest, NextResponse } from "next/server"
import { createPaymentTransaction, verifyPayment } from "@/lib/db"
import { PLANS, generateInstapayRef } from "@/lib/payment"
import type { PlanId } from "@/lib/payment"

/**
 * n8n Payment Webhook
 *
 * This endpoint is called by n8n when a payment is confirmed via WhatsApp.
 * n8n workflow:
 *   1. Watch WhatsApp (Business API) for incoming messages
 *   2. Check if message contains a transaction reference (CA-XXXXXXXX)
 *   3. Extract user phone and transaction ref
 *   4. POST to this endpoint with { transactionRef, phoneNumber }
 *   5. This endpoint verifies and activates the subscription
 *
 * Also accepts POST from the frontend when user initiates a payment
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, userId, planId, paymentMethod, transactionRef, phoneNumber } = body

    // Action 1: Initiate payment (from frontend)
    if (action === "initiate") {
      if (!userId || !planId || !paymentMethod) {
        return NextResponse.json(
          { error: "Missing required fields: userId, planId, paymentMethod" },
          { status: 400 }
        )
      }

      const plan = PLANS[planId as PlanId]
      if (!plan) {
        return NextResponse.json({ error: "Invalid plan" }, { status: 400 })
      }

      const ref = transactionRef || generateInstapayRef()

      await createPaymentTransaction({
        userId,
        planId: planId as PlanId,
        amountEGP: plan.priceEGP,
        paymentMethod: paymentMethod as "instapay" | "vodafone_cash",
        transactionRef: ref,
        phoneNumber,
      })

      return NextResponse.json({
        success: true,
        transactionRef: ref,
        amount: plan.priceEGP,
        instructions: {
          instapay: "ادفع عبر Instapay وأرسل الإيصال على واتساب",
          vodafone_cash: "ادفع عبر Vodafone Cash وأرسل الإيصال على واتساب",
        },
      })
    }

    // Action 2: Verify payment (from n8n webhook or admin)
    if (action === "verify") {
      if (!transactionRef) {
        return NextResponse.json(
          { error: "Missing transactionRef" },
          { status: 400 }
        )
      }

      const result = await verifyPayment(transactionRef)
      if (!result.success) {
        return NextResponse.json(
          { error: result.error || "Verification failed" },
          { status: 404 }
        )
      }

      return NextResponse.json({
        success: true,
        userId: result.userId,
        planId: result.planId,
        message: "Subscription activated successfully",
      })
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 })
  } catch (error) {
    console.error("Payment webhook error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
