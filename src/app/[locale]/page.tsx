import { useTranslations } from "next-intl"
import { getTranslations } from "next-intl/server"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Sparkles, Camera, TrendingUp, Zap, Clock, Shield } from "lucide-react"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "hero" })
  return { title: t("title") }
}

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}

function HeroSection() {
  const t = useTranslations("hero")

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-50">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM5M2M1ZmQiIGZpbGwtb3BhY2l0eT0iMC4wNCI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            بالذكاء الاصطناعي
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6">
            {t("title")}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
            {t("subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/ar/auth"
              className="inline-flex items-center px-8 py-4 bg-primary-600 text-white rounded-2xl hover:bg-primary-700 transition-all font-semibold text-lg shadow-lg shadow-primary-200 hover:shadow-xl hover:scale-105"
            >
              {t("cta")}
              <span className="mr-2">←</span>
            </Link>
            <Link
              href="#how-it-works"
              className="inline-flex items-center px-8 py-4 bg-white text-gray-700 rounded-2xl hover:bg-gray-50 transition-all font-semibold text-lg border border-gray-200 shadow-sm"
            >
              {t("demo")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function FeaturesSection() {
  const t = useTranslations("features")

  const features = [
    {
      icon: <Sparkles className="w-8 h-8 text-primary-600" />,
      title: t("arabic.title"),
      desc: t("arabic.desc"),
    },
    {
      icon: <Camera className="w-8 h-8 text-pink-600" />,
      title: t("platforms.title"),
      desc: t("platforms.desc"),
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-600" />,
      title: t("ai.title"),
      desc: t("ai.desc"),
    },
    {
      icon: <Clock className="w-8 h-8 text-green-600" />,
      title: t("speed.title"),
      desc: t("speed.desc"),
    },
  ]

  return (
    <section className="py-20 md:py-28 bg-white" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t("title")}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <div key={i} className="group p-8 bg-white rounded-2xl border border-gray-100 hover:border-primary-100 hover:shadow-lg transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function HowItWorksSection() {
  const steps = [
    { num: "01", icon: <Shield className="w-6 h-6" />, title: "أدخل موضوعك", desc: "اكتب موضوع المنشور أو رابط المقال أو وصف المنتج" },
    { num: "02", icon: <Zap className="w-6 h-6" />, title: "اختر المنصات", desc: "اختر المنصات التي تريد محتوى لها: إنستغرام، فيسبوك، تيك توك، لينكد إن" },
    { num: "03", icon: <Sparkles className="w-6 h-6" />, title: "AI ينشئ المحتوى", desc: "الذكاء الاصطناعي ينشئ محتوى مخصص لكل منصة بالعربية" },
    { num: "04", icon: <TrendingUp className="w-6 h-6" />, title: "انشر واحصل على تفاعل", desc: "انسخ المحتوى وانشره مباشرة، وزود تفاعلك" },
  ]

  return (
    <section className="py-20 md:py-28 bg-gray-50" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">كيف يعمل ContentAlchemy؟</h2>
          <p className="text-xl text-gray-500">في 4 خطوات بسيطة</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="relative text-center group">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-primary-200">
                {step.num}
              </div>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-500">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTASection() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-primary-600 to-primary-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">ابدأ رحلة نجاحك اليوم</h2>
        <p className="text-xl text-primary-100 mb-10">جرب ContentAlchemy مجاناً، وطور تواجدك على السوشيال ميديا</p>
        <Link
          href="/ar/auth"
          className="inline-flex items-center px-10 py-5 bg-white text-primary-700 rounded-2xl hover:bg-primary-50 transition-all font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105"
        >
          ابدأ مجاناً ←
        </Link>
      </div>
    </section>
  )
}
