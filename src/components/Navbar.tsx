"use client"

import { useEffect, useState } from "react"
import { useTranslations } from "next-intl"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Menu, X, Globe } from "lucide-react"
import { createClient } from "@/lib/supabase"
import type { User } from "@supabase/supabase-js"

export default function Navbar() {
  const t = useTranslations("nav")
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const params = useParams()
  const router = useRouter()
  const locale = params.locale as string

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  const switchLocale = () => {
    const newLocale = locale === "ar" ? "en" : "ar"
    const path = window.location.pathname.replace(`/${locale}`, `/${newLocale}`)
    router.push(path)
  }

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    setUser(null)
    router.push(`/${locale}`)
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
            {user && (
              <Link href={`/${locale}/dashboard`} className="text-gray-600 hover:text-primary-600 transition-colors">
                {t("dashboard")}
              </Link>
            )}
            <button
              onClick={switchLocale}
              className="flex items-center gap-1 text-gray-600 hover:text-primary-600 transition-colors px-3 py-1.5 rounded-lg hover:bg-gray-50"
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm">{locale === "ar" ? "English" : "العربية"}</span>
            </button>
            {user ? (
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium text-sm"
              >
                {t("logout")}
              </button>
            ) : (
              <Link
                href={`/${locale}/auth`}
                className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors font-medium text-sm"
              >
                {t("signup")}
              </Link>
            )}
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
            {user && (
              <Link href={`/${locale}/dashboard`} className="block text-gray-600 hover:text-primary-600 py-2" onClick={() => setIsOpen(false)}>
                {t("dashboard")}
              </Link>
            )}
            <button onClick={switchLocale} className="block text-gray-600 hover:text-primary-600 py-2">
              {locale === "ar" ? "English" : "العربية"}
            </button>
            {user ? (
              <button
                onClick={() => { handleLogout(); setIsOpen(false) }}
                className="block w-full text-center px-4 py-2 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 font-medium"
              >
                {t("logout")}
              </button>
            ) : (
              <Link
                href={`/${locale}/auth`}
                className="block text-center px-4 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 font-medium"
                onClick={() => setIsOpen(false)}
              >
                {t("signup")}
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
