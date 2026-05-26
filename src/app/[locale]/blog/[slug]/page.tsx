"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { getBlogPost, getRelatedPosts } from "@/lib/blog-posts"
import { Calendar, Clock, ArrowLeft, Sparkles, Share2, MessageCircle } from "lucide-react"
import { useState } from "react"

export default function BlogPostPage() {
  const params = useParams()
  const locale = params.locale as string
  const slug = params.slug as string
  const isAr = locale === "ar"
  const decodedSlug = decodeURIComponent(slug)
  const post = getBlogPost(decodedSlug)
  const relatedPosts = getRelatedPosts(slug, 3)
  const [copied, setCopied] = useState(false)

  if (!post) {
    return (
      <>
        <Navbar />
        <main className="flex-1 flex items-center justify-center py-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {isAr ? "المقال غير موجود" : "Post not found"}
            </h1>
            <Link href={`/${locale}/blog`} className="text-primary-600 hover:text-primary-700">
              {isAr ? "عودة للمدونة" : "Back to blog"}
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const shareUrl = typeof window !== "undefined" ? window.location.href : ""
  const shareText = isAr ? post.title : post.titleEn

  const shareOnWhatsApp = () => {
    const url = encodeURIComponent(shareUrl)
    const text = encodeURIComponent(shareText)
    window.open(`https://wa.me/?text=${text}%20${url}`, "_blank")
  }

  const copyLink = async () => {
    await navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-gradient-to-b from-white to-gray-50">
        <article className="py-16 md:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Back link */}
            <Link
              href={`/${locale}/blog`}
              className="inline-flex items-center gap-2 text-gray-500 hover:text-primary-600 mb-8 transition-colors"
            >
              <ArrowLeft className={`w-4 h-4 ${isAr ? '' : 'rotate-180'}`} />
              {isAr ? "عودة للمدونة" : "Back to blog"}
            </Link>

            {/* Meta */}
            <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {post.date}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
              <span>·</span>
              <span>{post.author}</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {isAr ? post.title : post.titleEn}
            </h1>
            <p className="text-lg text-gray-500 mb-8">
              {isAr ? post.description : post.descriptionEn}
            </p>

            {/* Share buttons */}
            <div className="flex items-center gap-3 mb-10 pb-8 border-b border-gray-200">
              <span className="text-sm text-gray-400">
                {isAr ? "شارك:" : "Share:"}
              </span>
              <button
                onClick={shareOnWhatsApp}
                className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-xl hover:bg-green-100 transition-colors text-sm font-medium"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </button>
              <button
                onClick={copyLink}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors text-sm font-medium"
              >
                <Share2 className="w-4 h-4" />
                {copied ? (isAr ? "تم النسخ" : "Copied!") : (isAr ? "نسخ الرابط" : "Copy link")}
              </button>
            </div>

            {/* Content */}
            <div
              className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
              dir={isAr ? "rtl" : "ltr"}
            >
              {(isAr ? post.content : post.contentEn).split("\n").map((line, i) => {
                if (line.startsWith("# ")) {
                  return <h1 key={i} className="text-2xl font-bold text-gray-900 mt-8 mb-4">{line.replace("# ", "")}</h1>
                }
                if (line.startsWith("## ")) {
                  return <h2 key={i} className="text-xl font-bold text-gray-800 mt-6 mb-3">{line.replace("## ", "")}</h2>
                }
                if (line.startsWith("### ")) {
                  return <h3 key={i} className="text-lg font-bold text-gray-800 mt-5 mb-2">{line.replace("### ", "")}</h3>
                }
                if (line.trim() === "") return <div key={i} className="h-4" />
                return <p key={i} className="mb-3">{line}</p>
              })}
            </div>

            {/* Author */}
            <div className="mt-10 p-6 bg-gray-50 rounded-2xl border border-gray-100">
              <p className="font-semibold text-gray-900">{post.author}</p>
              <p className="text-sm text-gray-500 mt-1">
                {isAr ? "فريق ContentAlchemy متخصص في التسويق الرقمي والمحتوى العربي للسوق المصري" : "ContentAlchemy team specializes in digital marketing and Arabic content for the Egyptian market"}
              </p>
            </div>

            {/* CTA */}
            <div className="mt-10 bg-gradient-to-br from-primary-600 to-primary-800 rounded-3xl p-8 text-center text-white">
              <Sparkles className="w-8 h-8 mx-auto mb-3 text-primary-200" />
              <h3 className="text-xl font-bold mb-2">
                {isAr ? "أنشئ محتوى احترافي في ثواني" : "Create professional content in seconds"}
              </h3>
              <p className="text-primary-100 mb-5 text-sm">
                {isAr ? "جرب ContentAlchemy مجاناً - أول أداة محتوى باللهجة المصرية" : "Try ContentAlchemy for free - the first content tool in Egyptian dialect"}
              </p>
              <Link
                href={`/${locale}/auth`}
                className="inline-flex items-center px-6 py-2.5 bg-white text-primary-700 rounded-xl hover:bg-primary-50 font-semibold transition-colors text-sm"
              >
                {isAr ? "ابدأ مجاناً" : "Start Free"}
              </Link>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="pb-20">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                {isAr ? "مقالات ذات صلة" : "Related Posts"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((rp) => (
                  <Link
                    key={rp.slug}
                    href={`/${locale}/blog/${rp.slug}`}
                    className="group bg-white rounded-2xl border border-gray-200 p-5 hover:border-primary-200 hover:shadow-md transition-all"
                  >
                    <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                      <Calendar className="w-3 h-3" />
                      {rp.date}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors line-clamp-2 text-sm">
                      {isAr ? rp.title : rp.titleEn}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-2">
                      {isAr ? rp.description : rp.descriptionEn}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  )
}
