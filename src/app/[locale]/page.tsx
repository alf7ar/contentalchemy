import { useTranslations } from "next-intl"
import { getTranslations } from "next-intl/server"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Sparkles, Camera, TrendingUp, Zap, Clock, Shield, Star, ChevronLeft, Share2, Video, Users, Megaphone } from "lucide-react"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "hero" })
  return {
    title: t("title"),
    description: t("subtitle"),
    openGraph: {
      title: t("title"),
      description: t("subtitle"),
    },
  }
}

const testimonials = [
  { name: "أحمد محمد", role: "مدير تسويق", text: "منذر! كنت بقضي ساعات في كتابة المحتوى، دلوقتي باخد محتوى جاهز في ثواني. فعلاً أداة ثورية.", stars: 5 },
  { name: "سارة علي", role: "صاحبة متجر", text: "من أحسن الأدوات اللي جربتها للمحتوى العربي. اللهجة المصرية مضبوطة والتنوع بين المنصات رهيب.", stars: 5 },
  { name: "محمد حسن", role: "وكالة تسويق", text: "بنستخدمها لكل عملائنا. توفير وقت هائل وجودة محتوى ممتازة. أنصح بيه.", stars: 5 },
]

const stats = [
  { value: "١٠٠٠+", label: "مستخدم نشط" },
  { value: "٥٠٠٠+", label: "منشور مولّد" },
  { value: "٩٨٪", label: "رضا العملاء" },
  { value: "٥", label: "منصات مدعومة" },
]

const platforms = [
  { icon: <Camera className="w-6 h-6" />, name: "Instagram" },
  { icon: <Share2 className="w-6 h-6" />, name: "Facebook" },
  { icon: <Video className="w-6 h-6" />, name: "TikTok" },
  { icon: <Users className="w-6 h-6" />, name: "LinkedIn" },
  { icon: <Megaphone className="w-6 h-6" />, name: "Ads" },
]

const faqs = [
  { q: "هل المحتوى باللهجة المصرية؟", a: "أيوة! بنستخدم الذكاء الاصطناعي عشان ينشئ محتوى باللهجة المصرية مضبوط مية في المية." },
  { q: "هل في خطة مجانية؟", a: "أكيد! تقدر تجرب مجاناً بدون ما تدفع حاجة وتستخدم كل المميزات الأساسية." },
  { q: "هل بنشر مباشرة على السوشيال ميديا؟", a: "لسه دلوقتي بنسخ المحتوى، لكن قريب جداً هينشر مباشرة على كل المنصات." },
  { q: "هل ينفع للشركات الكبيرة؟", a: "طبعاً! عندنا باقات للوكالات والشركات الكبيرة بعدد منشورات غير محدود." },
]

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <PlatformsSection />
        <FeaturesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <FAQSection />
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
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-28">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-6 animate-pulse">
            <Sparkles className="w-4 h-4" />
            بالذكاء الاصطناعي
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6">
            {t("title")}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            {t("subtitle")}
          </p>
          {/* Trust badges */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
            <span className="text-gray-500 text-sm mr-2">مئات المستخدمين يثقون في ContentAlchemy</span>
          </div>
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

function StatsSection() {
  return (
    <section className="py-12 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-primary-600 mb-1">{stat.value}</p>
              <p className="text-gray-500 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function PlatformsSection() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-gray-500 text-sm mb-6">مدعوم على أشهر المنصات</p>
        <div className="flex flex-wrap items-center justify-center gap-6">
          {platforms.map((p, i) => (
            <div key={i} className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-gray-200 shadow-sm">
              <span className="text-gray-700">{p.icon}</span>
              <span className="text-sm font-medium text-gray-700">{p.name}</span>
            </div>
          ))}
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

function TestimonialsSection() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">ماذا يقول المستخدمون؟</h2>
          <p className="text-xl text-gray-500">آلاف المستخدمين يثقون في ContentAlchemy</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all">
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: t.stars }).map((_, si) => (
                  <Star key={si} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 leading-relaxed mb-6">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {t.name[0]}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{t.name}</p>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQSection() {
  return (
    <section className="py-20 md:py-28 bg-gray-50" id="faq">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">الأسئلة الشائعة</h2>
          <p className="text-xl text-gray-500">كل ما تريد معرفته عن ContentAlchemy</p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details key={i} className="group bg-white rounded-2xl border border-gray-200 p-6 open:shadow-lg transition-all cursor-pointer">
              <summary className="flex items-center justify-between text-lg font-semibold text-gray-900 list-none">
                {faq.q}
                <ChevronLeft className="w-5 h-5 text-gray-400 group-open:rotate-90 transition-transform" />
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">{faq.a}</p>
            </details>
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
        <p className="text-xl text-primary-100 mb-4">جرب ContentAlchemy مجاناً، وطور تواجدك على السوشيال ميديا</p>
        <p className="text-primary-200 text-sm mb-10">لا تحتاج لبطاقة ائتمان. اشترك مجاناً وابدأ فوراً.</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/ar/auth"
            className="inline-flex items-center px-10 py-5 bg-white text-primary-700 rounded-2xl hover:bg-primary-50 transition-all font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105"
          >
            ابدأ مجاناً ←
          </Link>
          <Link
            href="/ar/pricing"
            className="inline-flex items-center px-10 py-5 bg-primary-500 text-white rounded-2xl hover:bg-primary-400 transition-all font-bold text-lg border border-primary-400 shadow-xl hover:shadow-2xl"
          >
            شوف الباقات
          </Link>
        </div>
      </div>
    </section>
  )
}
