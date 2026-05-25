export const INSTAPAY_NUMBER = "01111143036"
export const INSTAPAY_WALLET_PROVIDER = "Instapay"

export const PLANS = {
  free: {
    id: "free",
    priceId: "free",
    name: "مجاني",
    priceEGP: 0,
    postsPerMonth: 3,
    brands: 1,
    features: ["3 منشورات/شهر", "منصة واحدة", "محتوى عربي وإنجليزي"],
  },
  starter: {
    id: "starter",
    priceId: "starter",
    name: "ستارتر",
    priceEGP: 199,
    postsPerMonth: 50,
    brands: 1,
    features: ["50 منشور/شهر", "جميع المنصات", "محتوى عربي احترافي", "دعم فني"],
  },
  pro: {
    id: "pro",
    priceId: "pro",
    name: "احترافي",
    priceEGP: 499,
    postsPerMonth: -1,
    brands: 1,
    features: ["غير محدود من المنشورات", "جميع المنصات", "محتوى عربي احترافي", "محتوى إنجليزي", "دعم فني متميز"],
  },
  agency: {
    id: "agency",
    priceId: "agency",
    name: "وكالة",
    priceEGP: 999,
    postsPerMonth: -1,
    brands: 5,
    features: ["غير محدود", "جميع المنصات", "حتى 5 علامات تجارية", "حسابات متعددة", "مدير حساب مخصص"],
  },
} as const

export type PlanId = keyof typeof PLANS

export interface InstapayPayment {
  id: string
  userId: string
  planId: PlanId
  amountEGP: number
  transactionRef: string
  phoneNumber: string
  status: "pending" | "verified" | "failed"
  createdAt: Date
  verifiedAt?: Date
}

export function generateInstapayRef(): string {
  return `CA-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`
}

export function getInstapayInstructions(planId: PlanId): {
  amount: number
  number: string
  wallet: string
  reference: string
  steps: string[]
} {
  const plan = PLANS[planId]
  return {
    amount: plan.priceEGP,
    number: INSTAPAY_NUMBER,
    wallet: INSTAPAY_WALLET_PROVIDER,
    reference: generateInstapayRef(),
    steps: [
      "افتح تطبيق Instapay على هاتفك",
      `ادفع ${plan.priceEGP} جنيه إلى الرقم: ${INSTAPAY_NUMBER}`,
      "انسخ كود التحويل الظاهر أدناه",
      "أدخل كود التحويل في الموقع لتأكيد الدفع",
      "سيتم تفعيل الباقة فوراً بعد التحقق",
    ],
  }
}
