"use client"

import { useParams } from "next/navigation"
import { Check, Copy, ExternalLink, Settings, Globe, Database, Smartphone } from "lucide-react"
import { useState } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

const steps = [
  {
    icon: <Database className="w-6 h-6" />,
    title: "1. إنشاء حساب Supabase (مجاني)",
    desc: "اذهب إلى supabase.com وأنشئ مشروعاً جديداً. اختر منطقة مصر أو أوروبا.",
    action: "افتح Supabase",
    url: "https://supabase.com",
    fields: [
      { key: "NEXT_PUBLIC_SUPABASE_URL", label: "SUPABASE_URL", copy: "https://xxxxxxxxxxxx.supabase.co" },
      { key: "NEXT_PUBLIC_SUPABASE_ANON_KEY", label: "SUPABASE_ANON_KEY", copy: "eyJhbGciOiJIUzI1NiIs..." },
    ],
  },
  {
    icon: <Smartphone className="w-6 h-6" />,
    title: "2. إعداد حساب Instapay",
    desc: "كل ما تحتاجه هو رقم هاتفك المسجل في Instapay. افتح التطبيق وتأكد من أن رقمك نشط. هذا كل شيء!",
    action: "فتح Instapay",
    url: "https://instapay.com",
    fields: [
      { key: "INSTAPAY_NUMBER", label: "رقم Instapay", copy: "010XXXXXXXX (رقم هاتفك)" },
    ],
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "3. شراء دومين (اختياري)",
    desc: "اشتر دومين من namecheap.com أو godaddy.com. مثلاً: contentalchemy.eg",
    action: "شراء دومين",
    url: "https://namecheap.com",
    fields: [
      { key: "Domain", label: "اسم الدومين", copy: "contentalchemy.com" },
    ],
  },
  {
    icon: <Settings className="w-6 h-6" />,
    title: "4. ربط Vercel مع GitHub (مجاني)",
    desc: "اذهب إلى vercel.com، سجل بحساب GitHub، واستورد مشروع contentalchemy. سيتم النشر تلقائياً.",
    action: "افتح Vercel",
    url: "https://vercel.com/new",
    fields: [
      { key: "Vercel", label: "الخطوة", copy: "Import → contentalchemy → Deploy" },
    ],
  },
  {
    icon: <Settings className="w-6 h-6" />,
    title: "5. إضافة المتغيرات البيئية",
    desc: "في Vercel، اذهب إلى Project Settings → Environment Variables. أضف OPENAI_API_KEY وبيانات Supabase ورقم Instapay.",
    action: "فتح Vercel",
    url: "https://vercel.com",
    fields: [],
  },
  {
    icon: <Check className="w-6 h-6" />,
    title: "6. الموقع جاهز! 🎉",
    desc: "بعد إضافة المتغيرات، سينشر Vercel الموقع تلقائياً. يمكنك البدء في جني الأرباح فوراً عبر Instapay.",
    action: "زيارة الموقع",
    url: "https://contentalchemy.vercel.app",
    fields: [],
  },
]

export default function SetupPage() {
  const params = useParams()
  const locale = params.locale as string
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const copyToClipboard = async (text: string, key: string) => {
    await navigator.clipboard.writeText(text)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">دليل الإعداد</h1>
            <p className="text-xl text-gray-500">6 خطوات فقط لتشغيل موقع ContentAlchemy</p>
          </div>

          <div className="space-y-8">
            {steps.map((step, i) => (
              <div key={i} className="bg-white rounded-3xl border border-gray-200 p-8 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                    {step.icon}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h2>
                    <p className="text-gray-600 mb-4">{step.desc}</p>

                    {step.fields.length > 0 && (
                      <div className="space-y-2 mb-4">
                        {step.fields.map((field) => (
                          <div key={field.key} className="flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-2.5">
                            <span className="text-sm font-mono text-gray-500 flex-shrink-0">{field.key}:</span>
                            <span className="text-sm text-gray-700 flex-1 truncate">{field.copy}</span>
                            <button
                              onClick={() => copyToClipboard(field.copy, field.key)}
                              className="p-1.5 rounded-lg hover:bg-gray-200 transition-colors flex-shrink-0"
                            >
                              {copiedKey === field.key ? (
                                <Check className="w-4 h-4 text-green-600" />
                              ) : (
                                <Copy className="w-4 h-4 text-gray-400" />
                              )}
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    <a
                      href={step.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors text-sm font-medium"
                    >
                      <ExternalLink className="w-4 h-4" />
                      {step.action}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-gradient-to-br from-primary-600 to-primary-800 rounded-3xl p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">الموقع أصبح جاهزاً!</h2>
            <p className="text-primary-100 mb-6">بعد إكمال الخطوات، سيكون موقع ContentAlchemy جاهزاً لاستقبال العملاء</p>
            <p className="text-primary-200 text-sm">
              إذا احتجت أي مساعدة، تواصل معنا على support@contentalchemy.com
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
