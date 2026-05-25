"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Menu, X, Globe } from "lucide-react"

export default function Navbar() {
  const t = useTranslations("nav")
  const [isOpen, setIsOpen] = useState(false)
  const params = useParams()
  const router = useRouter()
  const locale = params.locale as string

  const switchLocale = () => {
    const newLocale = locale === "ar" ? "en" : "ar"
    const path = window.location.pathname.replace(`/${locale}`, `/${newLocale}`)
    router.push(path)
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href={`/${locale}`} className="flex items-center gap-2">
            <span className="text-2xl">✨</span>
            <span className="font-bold text-xl text-gray-900">ContentAlchemy</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link href={`/${locale}`} className="text-gray-600 hover:text-primary-600 transition-colors">
              {t("home")}
            </Link>
            <Link href={`/${locale}/pricing`} className="text-gray-600 hover:text-primary-600 transition-colors">
              {t("pricing")}
            </Link>
            <Link href={`/${locale}/dashboard`} className="text-gray-600 hover:text-primary-600 transition-colors">
              {t("dashboard")}
            </Link>
            <button
              onClick={switchLocale}
              className="flex items-center gap-1 text-gray-600 hover:text-primary-600 transition-colors px-3 py-1.5 rounded-lg hover:bg-gray-50"
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm">{locale === "ar" ? "English" : "العربية"}</span>
            </button>
            <Link
              href={`/${locale}/auth`}
              className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors font-medium text-sm"
            >
              {t("signup")}
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 space-y-3">
            <Link href={`/${locale}`} className="block text-gray-600 hover:text-primary-600 py-2" onClick={() => setIsOpen(false)}>
              {t("home")}
            </Link>
            <Link href={`/${locale}/pricing`} className="block text-gray-600 hover:text-primary-600 py-2" onClick={() => setIsOpen(false)}>
              {t("pricing")}
            </Link>
            <Link href={`/${locale}/dashboard`} className="block text-gray-600 hover:text-primary-600 py-2" onClick={() => setIsOpen(false)}>
              {t("dashboard")}
            </Link>
            <button onClick={switchLocale} className="block text-gray-600 hover:text-primary-600 py-2">
              {locale === "ar" ? "English" : "العربية"}
            </button>
            <Link
              href={`/${locale}/auth`}
              className="block text-center px-4 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 font-medium"
              onClick={() => setIsOpen(false)}
            >
              {t("signup")}
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
