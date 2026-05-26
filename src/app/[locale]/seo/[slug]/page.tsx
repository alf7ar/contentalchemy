import { notFound } from "next/navigation"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import seoPages from "@/lib/seo-pages"
import { Check, Sparkles, ArrowLeft } from "lucide-react"

// Allow runtime fallback for any locale+slug combination not pre-rendered
export const dynamicParams = true

export async function generateStaticParams() {
  const locales = ["ar", "en"]
  const params: { locale: string; slug: string }[] = []
  for (const locale of locales) {
    for (const page of seoPages) {
      params.push({ locale, slug: page.slug })
    }
  }
  return params
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const decodedSlug = decodeURIComponent(slug)
  const page = seoPages.find((p) => p.slug === decodedSlug)
  if (!page) return { title: "غير موجود" }

  return {
    title: page.title,
    description: page.description,
    keywords: page.keywords.join(", "),
  }
}

export default async function SEOPage(props: {
  params: Promise<{ slug: string; locale: string }>
}) {
  const params = await props.params
  const rawSlug = params.slug
  const slug = decodeURIComponent(rawSlug)
  const locale = params.locale
  // Try matching both raw (possibly encoded) and decoded slug
  const page = seoPages.find((p) => p.slug === slug || p.slug === rawSlug)
  if (!page) notFound()

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="py-16 md:py-24 bg-gradient-to-br from-primary-50 via-white to-accent-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href={`/${locale}`}
              className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              العودة للرئيسية
            </Link>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{page.h1}</h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">{page.content}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {page.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-sm border border-gray-100">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            <Link
              href={`/${locale}/auth`}
              className="inline-flex items-center gap-3 px-8 py-4 bg-primary-600 text-white rounded-2xl hover:bg-primary-700 transition-all font-semibold text-lg shadow-lg shadow-primary-200 hover:shadow-xl hover:scale-105"
            >
              <Sparkles className="w-5 h-5" />
              ابدأ مجاناً
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
