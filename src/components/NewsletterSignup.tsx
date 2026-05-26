"use client"

import { useState } from "react"
import { Send, CheckCircle2 } from "lucide-react"

export default function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setLoading(true)

    try {
      // Store in localStorage for now (will connect to email service later)
      const existing = JSON.parse(localStorage.getItem("contentalchemy_emails") || "[]")
      existing.push({ email: email.trim(), date: new Date().toISOString() })
      localStorage.setItem("contentalchemy_emails", JSON.stringify(existing))
      setStatus("success")
      setEmail("")
    } catch {
      setStatus("error")
    } finally {
      setLoading(false)
      setTimeout(() => setStatus("idle"), 4000)
    }
  }

  return (
    <section className="py-16 bg-white border-y border-gray-100">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl flex items-center justify-center mb-6">
          <Send className="w-8 h-8 text-primary-600" />
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">اشترك في نشرتنا البريدية</h3>
        <p className="text-gray-500 mb-6">
          أول واحد يعرف العروض والميزات الجديدة. نصائح تسويقية مجانية كل أسبوع.
        </p>

        {status === "success" ? (
          <div className="flex items-center justify-center gap-2 text-green-600 bg-green-50 rounded-2xl py-4 px-6">
            <CheckCircle2 className="w-5 h-5" />
            <span className="font-medium">تم الاشتراك! هينوصلك كل جديد 📩</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="بريدك الإلكتروني"
              required
              className="flex-1 px-5 py-3.5 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all text-right"
              dir="rtl"
            />
            <button
              type="submit"
              disabled={loading || !email.trim()}
              className="px-6 py-3.5 bg-primary-600 text-white rounded-2xl hover:bg-primary-700 disabled:opacity-50 font-semibold transition-all flex items-center justify-center gap-2 whitespace-nowrap"
            >
              {loading ? "..." : "اشترك"}
              <Send className="w-4 h-4" />
            </button>
          </form>
        )}

        {status === "error" && (
          <p className="text-red-500 text-sm mt-3">حصل خطأ. حاول تاني.</p>
        )}

        <p className="text-gray-400 text-xs mt-4">لن نرسل لك سبام. تقدر تلغي الاشتراك في أي وقت.</p>
      </div>
    </section>
  )
}