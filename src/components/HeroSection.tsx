"use client"

import { useTranslations } from "next-intl"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Star, Sparkles } from "lucide-react"

export default function HeroSection() {
  const t = useTranslations("hero")
  const params = useParams()
  const locale = params.locale as string
  const isAr = locale === "ar"

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-50">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM5M2M1ZmQiIGZpbGwtb3BhY2l0eT0iMC4wNCI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-28">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-6 animate-pulse">
            <Sparkles className="w-4 h-4" />
            {isAr ? "بالذكاء الاصطناعي" : "AI-Powered"}
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6">
            {t("title")}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            {t("subtitle")}
          </p>
          <div className="flex items-center justify-center gap-2 mb-8">
            {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
            <span className="text-gray-500 text-sm mr-2">
              {isAr ? "مئات المستخدمين يثقون في ContentAlchemy" : "Thousands trust ContentAlchemy"}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={`/${locale}/auth`}
              className="inline-flex items-center px-8 py-4 bg-primary-600 text-white rounded-2xl hover:bg-primary-700 transition-all font-semibold text-lg shadow-lg shadow-primary-200 hover:shadow-xl hover:scale-105"
            >
              {t("cta")}
              <span className={`${isAr ? 'mr-2' : 'ml-2'}`}>→</span>
            </Link>
            <Link
              href={`/${locale}/features`}
              className="inline-flex items-center px-8 py-4 bg-white text-gray-700 rounded-2xl hover:bg-gray-50 transition-all font-semibold text-lg border border-gray-200 shadow-sm"
            >
              {isAr ? "اعرف المزيد" : "Learn More"}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
