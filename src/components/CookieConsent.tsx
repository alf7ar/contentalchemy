"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { X } from "lucide-react"

export default function CookieConsent() {
  const params = useParams()
  const locale = params?.locale as string ?? "ar"
  const isAr = locale === "ar"
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) setVisible(true)
  // Safe one-time read from localStorage on mount; not a cascading-render issue
  // eslint-disable-next-line react-hooks/set-state-in-effect
  }, [])

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted")
    setVisible(false)
  }

  const decline = () => {
    localStorage.setItem("cookie-consent", "declined")
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white border-t border-gray-200 shadow-2xl"
      role="dialog"
      aria-label={isAr ? "تنبيه الكوكيز" : "Cookie notice"}
    >
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="text-sm text-gray-600 flex-1 leading-relaxed">
          {isAr ? (
            <>بنستخدم الكوكيز عشان نحسن تجربتك على الموقع. باستمرارك في التصفح، أنت موافق على <Link href={`/${locale}/privacy`} className="text-primary-600 underline hover:text-primary-700">سياسة الخصوصية</Link> بتاعتنا.</>
          ) : (
            <>We use cookies to improve your experience. By continuing to browse, you agree to our <Link href={`/${locale}/privacy`} className="text-primary-600 underline hover:text-primary-700">Privacy Policy</Link>.</>
          )}
        </p>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={decline}
            className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 font-medium transition-colors"
          >
            {isAr ? "رفض" : "Decline"}
          </button>
          <button
            onClick={accept}
            className="px-5 py-2 bg-primary-600 text-white text-sm rounded-xl hover:bg-primary-700 font-semibold transition-colors"
          >
            {isAr ? "قبول" : "Accept"}
          </button>
          <button onClick={decline} className="p-1 hover:bg-gray-100 rounded-lg transition-colors" aria-label="Close">
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  )
}
