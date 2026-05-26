"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { useParams } from "next/navigation"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Check, X, Copy, CheckCircle, Smartphone, Shield, Wallet } from "lucide-react"
import { PLANS, getInstapayInstructions, getVodafoneCashInstructions, type PlanId, type PaymentMethod } from "@/lib/payment"

export default function PricingPage() {
  const t = useTranslations("pricing")
  const params = useParams()
  const locale = params.locale as string
  const [selectedPlan, setSelectedPlan] = useState<PlanId | null>(null)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("instapay")
  const [copied, setCopied] = useState(false)

  const plans = [
    {
      ...PLANS.free,
      name: t("free"),
      desc: t("free_desc"),
      popular: false,
      cta: t("cta_free"),
      href: `/${locale}/auth`,
    },
    {
      ...PLANS.starter,
      name: t("starter"),
      desc: t("starter_desc"),
      popular: false,
      cta: t("cta_paid"),
    },
    {
      ...PLANS.pro,
      name: t("pro"),
      desc: t("pro_desc"),
      popular: true,
      cta: t("cta_paid"),
    },
    {
      ...PLANS.agency,
      name: t("agency"),
      desc: t("agency_desc"),
      popular: false,
      cta: t("cta_paid"),
    },
  ]

  const handleSubscribe = (planId: PlanId) => {
    if (planId === "free") return
    setSelectedPlan(planId)
  }

  const paymentInfo = selectedPlan
    ? paymentMethod === "instapay"
      ? getInstapayInstructions(selectedPlan)
      : getVodafoneCashInstructions(selectedPlan)
    : null

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-gradient-to-b from-white to-gray-50">
        {/* Payment Modal */}
        {selectedPlan && paymentInfo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">
                  الدفع عبر {paymentMethod === "instapay" ? "Instapay" : "Vodafone Cash"}
                </h2>
                <button onClick={() => setSelectedPlan(null)} className="p-2 rounded-xl hover:bg-gray-100">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Payment method selector */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setPaymentMethod("instapay")}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-medium text-sm transition-all border ${
                      paymentMethod === "instapay"
                        ? "bg-primary-50 text-primary-700 border-primary-200"
                        : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <Smartphone className="w-5 h-5" />
                    Instapay
                  </button>
                  <button
                    onClick={() => setPaymentMethod("vodafone_cash")}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-medium text-sm transition-all border ${
                      paymentMethod === "vodafone_cash"
                        ? "bg-red-50 text-red-700 border-red-200"
                        : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <Wallet className="w-5 h-5" />
                    Vodafone Cash
                  </button>
                </div>

                <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-6 text-center">
                  <div className="w-16 h-16 mx-auto bg-primary-100 rounded-2xl flex items-center justify-center mb-4">
                    {paymentMethod === "instapay" ? (
                      <Smartphone className="w-8 h-8 text-primary-600" />
                    ) : (
                      <Wallet className="w-8 h-8 text-red-600" />
                    )}
                  </div>
                  <p className="text-3xl font-bold text-gray-900 mb-1">
                    {paymentInfo.amount} <span className="text-lg">جنيه</span>
                  </p>
                  <p className="text-gray-500">باقة {PLANS[selectedPlan].name}</p>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900">تعليمات الدفع:</h3>
                  <ol className="space-y-2">
                    {paymentInfo.steps.map((step, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                        <span className="w-6 h-6 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">
                          {i + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="bg-gray-50 rounded-2xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">رقم الحساب:</span>
                    <div className="flex items-center gap-2">
                      <code className="text-sm font-bold text-gray-900" dir="ltr">{paymentInfo.number}</code>
                      <button onClick={() => copyToClipboard(paymentInfo.number)} className="p-1 hover:bg-white rounded-lg transition-colors">
                        <Copy className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">المبلغ:</span>
                    <span className="font-bold text-gray-900">{paymentInfo.amount} جنيه</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">كود التحويل:</span>
                    <div className="flex items-center gap-2">
                      <code className="text-sm font-bold text-primary-600 bg-primary-50 px-2 py-1 rounded-lg">
                        {paymentInfo.reference}
                      </code>
                      <button onClick={() => copyToClipboard(paymentInfo.reference)} className="p-1 hover:bg-white rounded-lg transition-colors">
                        {copied ? <CheckCircle className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4 text-gray-400" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 text-sm text-yellow-800">
                  <p className="font-medium mb-1">📱 بعد الدفع:</p>
                  <p>أرسل صورة الإيصال {paymentMethod === "instapay" ? "وكود التحويل" : "ورقم العملية"} عبر واتساب إلى الرقم نفسه للتأكيد وسيتم تفعيل باقاتك فوراً.</p>
                </div>

                <button
                  onClick={() => setSelectedPlan(null)}
                  className="w-full py-3 bg-gray-100 text-gray-700 rounded-2xl hover:bg-gray-200 font-semibold transition-colors"
                >
                  تم الدفع ✓
                </button>
              </div>
            </div>
          </div>
        )}

        <section className="py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{t("title")}</h1>
              <p className="text-xl text-gray-500 mb-4">{t("subtitle")}</p>
              {/* Trust badges */}
              <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-gray-500">
                <span className="flex items-center gap-1"><Smartphone className="w-4 h-4 text-green-600" /> Instapay</span>
                <span className="text-gray-300">•</span>
                <span className="flex items-center gap-1"><Wallet className="w-4 h-4 text-red-600" /> Vodafone Cash</span>
                <span className="text-gray-300">•</span>
                <span className="flex items-center gap-1"><Shield className="w-4 h-4 text-green-600" /> بدون بطاقة</span>
                <span className="text-gray-300">•</span>
                <span className="flex items-center gap-1"><Check className="w-4 h-4 text-green-600" /> إلغاء في أي وقت</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`relative group rounded-3xl p-8 transition-all duration-300 ${
                    plan.popular
                      ? "bg-white border-2 border-primary-500 shadow-xl shadow-primary-100 scale-105"
                      : "bg-white border border-gray-200 hover:border-primary-200 hover:shadow-lg"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      {t("popular")}
                    </div>
                  )}
                  <div className="text-center mb-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-500 text-sm mb-4">{plan.desc}</p>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold text-gray-900">
                        {plan.priceEGP}
                      </span>
                      <span className="text-gray-500">جنيه</span>
                      <span className="text-gray-400 text-sm">{t("per_month")}</span>
                    </div>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 text-gray-600">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  {plan.id === "free" ? (
                    <Link
                      href={plan.href!}
                      className="block text-center py-3 px-6 rounded-2xl font-semibold transition-all bg-gray-100 text-gray-700 hover:bg-gray-200"
                    >
                      {plan.cta}
                    </Link>
                  ) : (
                    <button
                      onClick={() => handleSubscribe(plan.id as PlanId)}
                      className={`block w-full text-center py-3 px-6 rounded-2xl font-semibold transition-all ${
                        plan.popular
                          ? "bg-primary-600 text-white hover:bg-primary-700 shadow-lg shadow-primary-200"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {plan.cta}
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Comparison Table */}
            <div className="mt-20">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">مقارنة الباقات</h2>
              <p className="text-gray-500 text-center mb-10">شوف الفرق بين الباقات واختار اللي يناسبك</p>
              <div className="overflow-x-auto">
                <table className="w-full max-w-4xl mx-auto bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="text-right py-4 px-6 font-semibold text-gray-900 w-1/3">الميزة</th>
                      {plans.map((plan, i) => (
                        <th key={i} className={`text-center py-4 px-4 font-semibold ${plan.popular ? 'text-primary-700' : 'text-gray-900'}`}>
                          {plan.name}
                          {plan.popular && <span className="block text-xs text-primary-500 font-normal mt-1">الأكثر طلباً</span>}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { label: "المحتوى الشهري", values: ["10 محتوى", "50 محتوى", "200 محتوى", "غير محدود"] },
                      { label: "عدد المنصات", values: ["3 منصات", "6 منصات", "6 منصات", "6 منصات"] },
                      { label: "النغمات", values: ["3 نغمات", "5 نغمات", "7 نغمات", "7 نغمات"] },
                      { label: "اللهجة المصرية", values: ["✓", "✓", "✓", "✓"] },
                      { label: "هاشتاجات ذكية", values: ["✓", "✓", "✓", "✓"] },
                      { label: "مشاركة واتساب", values: ["✓", "✓", "✓", "✓"] },
                      { label: "إعادة إنشاء", values: ["✗", "✓", "✓", "✓"] },
                      { label: "تاريخ المحتوى", values: ["آخر 5", "آخر 20", "غير محدود", "غير محدود"] },
                      { label: "دعم فني", values: ["—", "إيميل", "إيميل + واتساب", "أولوية قصوى"] },
                    ].map((row, i) => (
                      <tr key={i} className={`border-b border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                        <td className="py-3.5 px-6 text-sm font-medium text-gray-800">{row.label}</td>
                        {row.values.map((val, j) => {
                          const isCheck = val === "✓"
                          const isCross = val === "✗"
                          const isDash = val === "—"
                          return (
                            <td key={j} className={`text-center py-3.5 px-4 text-sm ${plans[j].popular ? 'font-medium' : ''}`}>
                              {isCheck ? (
                                <Check className="w-5 h-5 text-green-500 mx-auto" />
                              ) : isCross ? (
                                <X className="w-5 h-5 text-gray-300 mx-auto" />
                              ) : isDash ? (
                                <span className="text-gray-300">—</span>
                              ) : (
                                <span className={plans[j].popular ? 'text-primary-700' : 'text-gray-600'}>{val}</span>
                              )}
                            </td>
                          )
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-16 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-medium">
                <Smartphone className="w-4 h-4" />
                الدفع عبر Instapay أو Vodafone Cash - تحويل فوري ومباشر
              </div>
              <p className="text-gray-500 mt-4 text-sm">
                لا تحتاج لبطاقة ائتمان. ادفع مرة واحدة عبر Instapay أو Vodafone Cash واستمتع بالخدمة لشهر كامل
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
