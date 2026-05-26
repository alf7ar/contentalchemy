import { NextRequest, NextResponse } from "next/server"
import { verifyPayment } from "@/lib/db"
import { PLANS, generateInstapayRef } from "@/lib/payment"
import type { PlanId } from "@/lib/payment"

/**
 * n8n Payment Webhook
 *
 * Initiate: Called from frontend when user starts a payment
 * Verify: Called by n8n when payment is confirmed via WhatsApp
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

      // Store payment intent in content_history
      const { createServerSupabaseClient: makeClient } = await import("@/lib/supabase")
      const supabase = await makeClient()
      await supabase.from("content_history").insert({
        user_id: userId,
        platform: "payment",
        topic: "payment_intent",
        content: JSON.stringify({
          type: "payment",
          plan_id: planId,
          payment_method: paymentMethod,
          transaction_ref: ref,
          amount_egp: plan.priceEGP,
          phone_number: phoneNumber || null,
          status: "pending",
        }),
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
      if (!userId || !planId) {
        return NextResponse.json(
          { error: "Missing required fields: userId, planId" },
          { status: 400 }
        )
      }

      const result = await verifyPayment({
        userId,
        planId: planId as PlanId,
        paymentMethod: paymentMethod || "instapay",
        transactionRef: transactionRef || `manual-${Date.now()}`,
      })

      if (!result.success) {
        return NextResponse.json(
          { error: result.error || "Verification failed" },
          { status: 500 }
        )
      }

      return NextResponse.json({
        success: true,
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
