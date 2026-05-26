"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Send, MessageCircle, Mail, Smartphone, CheckCircle2 } from "lucide-react"

export default function ContactPage() {
  const params = useParams()
  const locale = params.locale as string
  const isAr = locale === "ar"
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setLoading(true)
    // Simulate send
    await new Promise(r => setTimeout(r, 1000))
    setSent(true)
    setLoading(false)
    setForm({ name: "", email: "", message: "" })
    setTimeout(() => setSent(false), 5000)
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-gradient-to-b from-white to-gray-50">
        <section className="py-20 md:py-28">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {isAr ? "تواصل معنا" : "Contact Us"}
              </h1>
              <p className="text-xl text-gray-500">
                {isAr ? "احنا هنا عشان نساعدك. كلمنا على أي حاجة." : "We're here to help. Reach out anytime."}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
              {/* Contact Info */}
              <div className="space-y-8">
                <h2 className="text-2xl font-bold text-gray-900">
                  {isAr ? "معلومات التواصل" : "Contact Information"}
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{isAr ? "واتساب" : "WhatsApp"}</h3>
                      <p className="text-gray-500">{isAr ? "أسرع طريقة للتواصل" : "Fastest way to reach us"}</p>
                      <a
                        href="https://wa.me/201111143036"
                        target="_blank"
                        className="text-primary-600 hover:text-primary-700 font-medium"
                      >
                        01111143036
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{isAr ? "إيميل" : "Email"}</h3>
                      <a
                        href="mailto:support@contentalchemy.com"
                        className="text-primary-600 hover:text-primary-700 font-medium"
                      >
                        support@contentalchemy.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Smartphone className="w-6 h-6 text-accent-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{isAr ? "تليفون" : "Phone"}</h3>
                      <p className="text-gray-500">{isAr ? "من 9 صباحاً لـ 9 مساءً" : "9 AM to 9 PM"}</p>
                      <a
                        href="tel:01111143036"
                        className="text-primary-600 hover:text-primary-700 font-medium"
                      >
                        01111143036
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-primary-50 border border-primary-100 rounded-2xl p-6">
                  <p className="text-primary-800 font-medium mb-1">{isAr ? "⏰ ساعات العمل" : "⏰ Working Hours"}</p>
                  <p className="text-primary-600 text-sm">
                    {isAr ? "السبت للخميس: 9 صباحاً - 9 مساءً" : "Sat - Thu: 9 AM - 9 PM"}
                  </p>
                  <p className="text-primary-600 text-sm">
                    {isAr ? "الجمعة: 2 ظهراً - 8 مساءً" : "Friday: 2 PM - 8 PM"}
                  </p>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {isAr ? "ابعتلنا رسالة" : "Send Us a Message"}
                </h2>

                {sent ? (
                  <div className="flex items-center justify-center gap-3 text-green-600 bg-green-50 rounded-2xl py-8 px-6">
                    <CheckCircle2 className="w-6 h-6" />
                    <span className="font-medium text-lg">
                      {isAr ? "تم إرسال رسالتك! هنتواصل معاك قريباً" : "Message sent! We'll get back to you soon."}
                    </span>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {isAr ? "الاسم" : "Name"}
                      </label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                        placeholder={isAr ? "اسمك الكريم" : "Your name"}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {isAr ? "البريد الإلكتروني" : "Email"}
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                        placeholder="email@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {isAr ? "رسالتك" : "Message"}
                      </label>
                      <textarea
                        value={form.message}
                        onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                        required
                        rows={5}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all resize-none"
                        placeholder={isAr ? "اكتب رسالتك هنا..." : "Write your message here..."}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 bg-primary-600 text-white rounded-xl hover:bg-primary-700 disabled:opacity-50 font-semibold transition-all flex items-center justify-center gap-2"
                    >
                      {loading ? (isAr ? "جاري الإرسال..." : "Sending...") : (isAr ? "إرسال الرسالة" : "Send Message")}
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
