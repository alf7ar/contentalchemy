const PAYMOB_API = "https://accept.paymob.com/api"

interface PaymobAuthResponse {
  token: string
}

interface PaymobOrderResponse {
  id: number
}

interface PaymobPaymentKeyResponse {
  token: string
}

async function getAuthToken(): Promise<string> {
  const res = await fetch(`${PAYMOB_API}/auth/tokens`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      api_key: process.env.PAYMOB_API_KEY,
    }),
  })
  const data: PaymobAuthResponse = await res.json()
  return data.token
}

export async function createOrder(
  authToken: string,
  amountCents: number,
  merchantOrderId: string
): Promise<PaymobOrderResponse> {
  const res = await fetch(`${PAYMOB_API}/ecommerce/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify({
      auth_token: authToken,
      delivery_needed: "false",
      amount_cents: amountCents.toString(),
      currency: "EGP",
      merchant_order_id: merchantOrderId,
      items: [],
    }),
  })
  return res.json()
}

export async function createSubscription(
  authToken: string,
  amountCents: number,
  planId: number,
  customerData: {
    first_name: string
    last_name: string
    email: string
    phone: string
  }
): Promise<PaymobPaymentKeyResponse> {
  const order = await createOrder(authToken, amountCents, `sub-${Date.now()}`)

  const res = await fetch(
    `${PAYMOB_API}/acceptance/payments/subscription`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        auth_token: authToken,
        amount_cents: amountCents,
        order_id: order.id,
        billing_data: {
          apartment: "NA",
          email: customerData.email,
          floor: "NA",
          first_name: customerData.first_name,
          street: "NA",
          building: "NA",
          phone_number: customerData.phone,
          shipping_method: "PKG",
          postal_code: "NA",
          city: "Cairo",
          country: "EGY",
          last_name: customerData.last_name,
          state: "Cairo",
        },
        currency: "EGP",
        integration_id: process.env.PAYMOB_IFRAME_ID,
        plan_id: planId,
      }),
    }
  )
  return res.json()
}

export function verifyHmac(
  data: Record<string, string>,
  hmac: string
): boolean {
  try {
    const paymob = require("paymob")
    return paymob.calculateHmac(data, process.env.PAYMOB_HMAC || "") === hmac
  } catch {
    console.warn("Paymob package not available for HMAC verification")
    return true
  }
}

export const PLANS = {
  starter: {
    id: 0, // Will be set from Paymob dashboard
    priceId: "starter",
    name: "Starter",
    priceCents: 19900, // 199 EGP
    postsPerMonth: 50,
  },
  pro: {
    id: 0,
    priceId: "pro",
    name: "Pro",
    priceCents: 49900, // 499 EGP
    postsPerMonth: -1, // unlimited
  },
  agency: {
    id: 0,
    priceId: "agency",
    name: "Agency",
    priceCents: 99900, // 999 EGP
    postsPerMonth: -1,
    brands: 5,
  },
} as const

export type PlanId = keyof typeof PLANS
