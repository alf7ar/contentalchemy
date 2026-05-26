"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Sparkles, Globe, Smartphone, Palette, Hash, Share2, BarChart3, Shield, Bot, Zap, Layers, Repeat } from "lucide-react"

const features = [
  {
    icon: Bot,
    titleAr: "ذكاء اصطناعي متطور",
    titleEn: "Advanced AI Engine",
    descAr: "نستخدم أقوى نماذج الذكاء الاصطناعي (GPT-4o + Gemini) عشان نولدلك محتوى احترافي يناسب علامتك التجارية.",
    descEn: "We use the most powerful AI models (GPT-4o + Gemini) to generate professional content that fits your brand.",
  },
  {
    icon: Globe,
    titleAr: "محتوى بالعربية الفصحى والمصرية",
    titleEn: "Arabic & Egyptian Dialect",
    descAr: "بنفهم الفرق بين العربية الفصحى والمصري الدارجة. اختار النغمة اللي تناسب جمهورك.",
    descEn: "We understand the difference between formal Arabic and Egyptian dialect. Choose the tone that fits your audience.",
  },
  {
    icon: Smartphone,
    titleAr: "محتوى لكل منصة",
    titleEn: "Content for Every Platform",
    descAr: "فيسبوك، إنستجرام، لينكد إن، تيك توك، تويتر، وموتيفيشنال. كل منصة ليها أسلوبها المخصوص.",
    descEn: "Facebook, Instagram, LinkedIn, TikTok, Twitter, and Motivational. Each platform has its own unique style.",
  },
  {
    icon: Palette,
    titleAr: "7 نغمات مختلفة",
    titleEn: "7 Different Tones",
    descAr: "احترافي، غير رسمي، مضحك، ملهم، جريء، تعليمي، عادي. اختار النغمة اللي تناسب صوت علامتك التجارية.",
    descEn: "Professional, Casual, Funny, Inspirational, Edgy, Educational, Neutral. Pick the tone that matches your brand voice.",
  },
  {
    icon: Hash,
    titleAr: "هاشتاجات ذكية",
    titleEn: "Smart Hashtags",
    descAr: "بنولّد هاشتاجات مخصصة لكل منصة عشان توصل لأكبر عدد من الجمهور المستهدف.",
    descEn: "We generate platform-specific hashtags to maximize your reach to the target audience.",
  },
  {
    icon: Share2,
    titleAr: "مشاركة مباشرة",
    titleEn: "Direct Sharing",
    descAr: "شارك المحتوى على واتساب بنقرة واحدة. نسخ سريع لكل المنصات.",
    descEn: "Share content to WhatsApp with one click. Quick copy for all platforms.",
  },
  {
    icon: BarChart3,
    titleAr: "تاريخ المحتوى",
    titleEn: "Content History",
    descAr: "كل المحتوى اللي اتعمل محفوظ عشان ترجعله في أي وقت.",
    descEn: "All generated content is saved so you can come back to it anytime.",
  },
  {
    icon: Shield,
    titleAr: "آمن وخصوصي",
    titleEn: "Secure & Private",
    descAr: "بياناتك آمنة ومش بنشاركها مع حد. تقدر تمسح بياناتك في أي وقت.",
    descEn: "Your data is secure and never shared. You can delete your data anytime.",
  },
  {
    icon: Zap,
    titleAr: "سريع جداً",
    titleEn: "Lightning Fast",
    descAr: "بنولّد محتوى لـ 6 منصات في أقل من 30 ثانية. وفر وقتك وركز على شغلك.",
    descEn: "Generate content for 6 platforms in under 30 seconds. Save time and focus on your work.",
  },
  {
    icon: Repeat,
    titleAr: "إعادة إنشاء",
    titleEn: "Regenerate",
    descAr: "مش عجبك المحتوى؟ جدد لأي منصة لوحدها من غير ما تبدأ من الأول.",
    descEn: "Don't like the content? Regenerate any platform individually without starting over.",
  },
]

export default function FeaturesPage() {
  const params = useParams()
  const locale = params.locale as string
  const isAr = locale === "ar"

  useEffect(() => {
    document.title = isAr ? "ميزات ContentAlchemy - أداة إنشاء محتوى السوشيال ميديا" : "ContentAlchemy Features - AI Social Media Content Generator"
  }, [isAr])

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="py-20 md:py-28 bg-gradient-to-b from-primary-50 to-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {isAr ? "ميزات ContentAlchemy" : "ContentAlchemy Features"}
            </h1>
            <p className="text-xl text-gray-500 mb-8 max-w-2xl mx-auto">
              {isAr
                ? "كل الأدوات اللي تحتاجها عشان تبني حضور قوي على السوشيال ميديا في مكان واحد."
                : "All the tools you need to build a strong social media presence in one place."}
            </p>
            <Link
              href={`/${locale}/pricing`}
              className="inline-flex px-8 py-3.5 bg-primary-600 text-white rounded-xl hover:bg-primary-700 font-semibold text-lg transition-all"
            >
              {isAr ? "ابدأ دلوقتي" : "Start Now"}
            </Link>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feat, i) => {
                const Icon = feat.icon
                return (
                  <div
                    key={i}
                    className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg hover:border-primary-100 transition-all"
                  >
                    <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {isAr ? feat.titleAr : feat.titleEn}
                    </h3>
                    <p className="text-gray-500 leading-relaxed">
                      {isAr ? feat.descAr : feat.descEn}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-800">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <Layers className="w-12 h-12 text-white/60 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {isAr ? "جاهز تبدأ رحلة المحتوى بتاعتك؟" : "Ready to Start Your Content Journey?"}
            </h2>
            <p className="text-primary-100 text-lg mb-8">
              {isAr
                ? "جرب ContentAlchemy النهارده وشوف الفرق. أول 5 محتويات مجاناً!"
                : "Try ContentAlchemy today and see the difference. First 5 contents free!"}
            </p>
            <Link
              href={`/${locale}/pricing`}
              className="inline-flex px-8 py-3.5 bg-white text-primary-700 rounded-xl hover:bg-primary-50 font-semibold text-lg transition-all"
            >
              {isAr ? "شوف الباقات" : "See Plans"}
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
