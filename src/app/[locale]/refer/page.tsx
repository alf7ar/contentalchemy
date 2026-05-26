"use client"

import { useParams } from "next/navigation"
import { useState } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Gift, Users, Award, Copy, CheckCircle2, Share2, Sparkles } from "lucide-react"

export default function ReferPage() {
  const params = useParams()
  const locale = params.locale as string
  const isAr = locale === "ar"
  const [copied, setCopied] = useState(false)

  // Simulated referral link — in production this would be user-specific
  const referralLink = "https://contentalchemy.com/ar/auth?ref=USER123"

  const copyLink = async () => {
    await navigator.clipboard.writeText(referralLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 3000)
  }

  const steps = isAr
    ? [
        { icon: Users, title: "شارك رابطك", desc: "شارك رابط الدعوة مع أصدقائك وزملائك على واتساب أو السوشيال ميديا" },
        { icon: Gift, title: "هما يسجلوا", desc: "لما صديقك يسجل في ContentAlchemy باستخدام رابطك، بيحصل على أول 10 محتويات مجاناً" },
        { icon: Award, title: "أنت تكسب", desc: "كل صديق يسجل ويشتري باقة، أنت بتكسب 20% من قيمة الباقة كرصيد في حسابك" },
      ]
    : [
        { icon: Users, title: "Share Your Link", desc: "Share your referral link with friends and colleagues on WhatsApp or social media" },
        { icon: Gift, title: "They Sign Up", desc: "When a friend signs up using your link, they get 10 free contents" },
        { icon: Award, title: "You Earn", desc: "Every friend who buys a plan earns you 20% credit in your account" },
      ]

  const rewards = isAr
    ? [
        { title: "20% عمولة", desc: "من كل باقة يشترك فيها صديقك" },
        { title: "رصيد في حسابك", desc: "تقدر تستخدمه لتجديد باقاتك أو ترقية خطتك" },
        { title: "مكافآت إضافية", desc: "أول 10 دعوات تحصل على شهر مجاني إضافي" },
        { title: "بدون حد أقصى", desc: "قدر ما تجيب، قد ما تكسب — مفيش حد للعمولة" },
      ]
    : [
        { title: "20% Commission", desc: "From every plan your friend subscribes to" },
        { title: "Account Credit", desc: "Use it to renew your plan or upgrade" },
        { title: "Bonus Rewards", desc: "First 10 referrals get a free bonus month" },
        { title: "No Limits", desc: "Refer as many as you want — no cap on earnings" },
      ]

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-gradient-to-b from-white to-gray-50">
        {/* Hero */}
        <section className="py-20 md:py-28 bg-gradient-to-br from-primary-600 via-primary-700 to-accent-700 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Gift className="w-14 h-14 mx-auto mb-6 text-primary-200" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {isAr ? "برنامج الدعوة" : "Referral Program"}
            </h1>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              {isAr
                ? "ادعي أصدقائك لـ ContentAlchemy وكسب 20% عمولة على كل باقة يشتركوا فيها"
                : "Invite your friends to ContentAlchemy and earn 20% commission on every plan they buy"}
            </p>
            {/* Referral Link Box */}
            <div className="max-w-lg mx-auto bg-white/10 backdrop-blur rounded-2xl p-4 flex items-center gap-3">
              <code className="flex-1 text-left text-sm font-mono bg-white/10 rounded-xl px-4 py-2.5 truncate">
                {referralLink}
              </code>
              <button
                onClick={copyLink}
                className="flex items-center gap-2 px-5 py-2.5 bg-white text-primary-700 rounded-xl hover:bg-primary-50 font-semibold transition-all"
              >
                {copied ? <CheckCircle2 className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                {copied ? (isAr ? "تم النسخ" : "Copied!") : (isAr ? "نسخ" : "Copy")}
              </button>
            </div>
            <p className="text-primary-200 text-sm mt-3">
              <Share2 className="w-3.5 h-3.5 inline mr-1" />
              {isAr ? "شارك الرابط مع أصدقائك على واتساب وفيسبوك" : "Share the link with friends on WhatsApp & Facebook"}
            </p>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
              {isAr ? "ازاي الشغل بتاع الدعوة؟" : "How It Works"}
            </h2>
            <p className="text-gray-500 text-center mb-12 max-w-lg mx-auto">
              {isAr ? "ثلاث خطوات بسيطة عشان تبدأ تكسب" : "Three simple steps to start earning"}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((step, i) => {
                const Icon = step.icon
                return (
                  <div key={i} className="text-center">
                    <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-primary-600" />
                    </div>
                    <div className="text-2xl font-bold text-primary-600 mb-2">{i + 1}</div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Rewards */}
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
              {isAr ? "المكافآت" : "Rewards"}
            </h2>
            <p className="text-gray-500 text-center mb-12">
              {isAr ? "كل ما تدعي ناس أكتر، كل ما تكسب أكتر" : "The more you refer, the more you earn"}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {rewards.map((reward, i) => (
                <div key={i} className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-6 text-center border border-primary-100">
                  <Award className="w-10 h-10 text-primary-600 mx-auto mb-3" />
                  <h3 className="font-bold text-gray-900 mb-1">{reward.title}</h3>
                  <p className="text-sm text-gray-500">{reward.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-800">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <Sparkles className="w-12 h-12 text-white/60 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {isAr ? "ابدأ ادعي أصدقائك النهارده!" : "Start Referring Today!"}
            </h2>
            <p className="text-primary-100 text-lg mb-8">
              {isAr
                ? "كل ما تدعي ناس أكتر، كل ما تكسب أكتر. مفيش حد أقصى للمكافآت."
                : "The more you refer, the more you earn. No cap on rewards."}
            </p>
            <button
              onClick={() => {
                copyLink()
                // Also open WhatsApp share
                const text = encodeURIComponent(
                  isAr
                    ? "جرب ContentAlchemy! أفضل أداة لإنشاء محتوى السوشيال ميديا بالعربية والمصرية. سجل عبر الرابط:"
                    : "Try ContentAlchemy! The best AI tool for Arabic social media content. Sign up here:"
                )
                window.open(`https://wa.me/?text=${text}%20${encodeURIComponent(referralLink)}`, "_blank")
              }}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-primary-700 rounded-xl hover:bg-primary-50 font-semibold text-lg transition-all"
            >
              <Share2 className="w-5 h-5" />
              {isAr ? "شارك على واتساب" : "Share on WhatsApp"}
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
