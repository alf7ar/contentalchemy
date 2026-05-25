"use client"

import { useTranslations } from "next-intl"
import { useParams } from "next/navigation"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Check } from "lucide-react"

export default function PricingPage() {
  const t = useTranslations("pricing")
  const params = useParams()
  const locale = params.locale as string

  const plans = [
    {
      id: "free",
      name: t("free"),
      price: 0,
      desc: t("free_desc"),
      popular: false,
      features: ["3 منشورات/شهر", "منصة واحدة", "محتوى عربي وإنجليزي", "لا يحتاج بطاقة ائتمان"],
      cta: t("cta_free"),
      href: `/${locale}/auth`,
    },
    {
      id: "starter",
      name: t("starter"),
      price: 199,
      desc: t("starter_desc"),
      popular: false,
      features: ["50 منشور/شهر", "جميع المنصات", "محتوى عربي احترافي", "دعم فني"],
      cta: t("cta_paid"),
      href: `/${locale}/auth?plan=starter`,
    },
    {
      id: "pro",
      name: t("pro"),
      price: 499,
      desc: t("pro_desc"),
      popular: true,
      features: ["غير محدود من المنشورات", "جميع المنصات", "محتوى عربي احترافي", "محتوى إنجليزي", "دعم فني متميز", "الجدولة والنشر التلقائي"],
      cta: t("cta_paid"),
      href: `/${locale}/auth?plan=pro`,
    },
    {
      id: "agency",
      name: t("agency"),
      price: 999,
      desc: t("agency_desc"),
      popular: false,
      features: ["غير محدود", "جميع المنصات", "حتى 5 علامات تجارية", "حسابات متعددة", "API مخصص", "مدير حساب مخصص"],
      cta: t("cta_paid"),
      href: `/${locale}/auth?plan=agency`,
    },
  ]

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-gradient-to-b from-white to-gray-50">
        <section className="py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{t("title")}</h1>
              <p className="text-xl text-gray-500">{t("subtitle")}</p>
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
                        {plan.price === 0 ? 0 : plan.price}
                      </span>
                      {plan.price > 0 && <span className="text-gray-500">جنيه</span>}
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
                  <Link
                    href={plan.href}
                    className={`block text-center py-3 px-6 rounded-2xl font-semibold transition-all ${
                      plan.popular
                        ? "bg-primary-600 text-white hover:bg-primary-700 shadow-lg shadow-primary-200"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
