import { useTranslations } from "next-intl"
import Link from "next/link"

export default function Footer() {
  const t = useTranslations("footer")

  return (
    <footer className="bg-gray-50 border-t border-gray-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">✨</span>
            <span className="font-semibold text-gray-900">ContentAlchemy</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <span>© 2026 {t("rights")}</span>
            <Link href="#" className="hover:text-primary-600 transition-colors">{t("terms")}</Link>
            <Link href="#" className="hover:text-primary-600 transition-colors">{t("privacy")}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
