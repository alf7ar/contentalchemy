"use client"

import { useTranslations } from "next-intl"
import { useParams } from "next/navigation"
import Link from "next/link"

export default function Footer() {
  const t = useTranslations("footer")
  const params = useParams()
  const locale = params.locale as string

  return (
    <footer className="bg-gray-50 border-t border-gray-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">✨</span>
              <span className="font-semibold text-gray-900">ContentAlchemy</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              الذكاء الاصطناعي لإنشاء محتوى السوشيال ميديا بالعربية والمصرية
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">روابط سريعة</h4>
            <div className="flex flex-col gap-2 text-sm text-gray-500">
              <Link href={`/${locale}`} className="hover:text-primary-600 transition-colors">{t("home")}</Link>
              <Link href={`/${locale}/features`} className="hover:text-primary-600 transition-colors">{t("features")}</Link>
              <Link href={`/${locale}/pricing`} className="hover:text-primary-600 transition-colors">{t("pricing")}</Link>
              <Link href={`/${locale}/contact`} className="hover:text-primary-600 transition-colors">{t("contact")}</Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">قانوني</h4>
            <div className="flex flex-col gap-2 text-sm text-gray-500">
              <Link href="#" className="hover:text-primary-600 transition-colors">{t("terms")}</Link>
              <Link href="#" className="hover:text-primary-600 transition-colors">{t("privacy")}</Link>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-6 text-center text-sm text-gray-500">
          © 2026 ContentAlchemy. {t("rights")}
        </div>
      </div>
    </footer>
  )
}
