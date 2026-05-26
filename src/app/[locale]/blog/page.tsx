"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { blogPosts } from "@/lib/blog-posts"
import { Calendar, Clock, ArrowLeft, Sparkles } from "lucide-react"

export default function BlogListPage() {
  const params = useParams()
  const locale = params.locale as string
  const isAr = locale === "ar"

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-gradient-to-b from-white to-gray-50">
        <section className="py-20 md:py-28">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {isAr ? "مدونة ContentAlchemy" : "ContentAlchemy Blog"}
              </h1>
              <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                {isAr
                  ? "نصائح وحيل واحترافية لتسويق السوشيال ميديا في مصر"
                  : "Tips, tricks and professional advice for social media marketing in Egypt"}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/${locale}/blog/${post.slug}`}
                  className="group bg-white rounded-3xl border border-gray-200 p-6 hover:border-primary-200 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.date}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                    {isAr ? post.title : post.titleEn}
                  </h2>
                  <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">
                    {isAr ? post.description : post.descriptionEn}
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-primary-600 text-sm font-medium group-hover:gap-2 transition-all">
                    <span>{isAr ? "اقرأ المزيد" : "Read more"}</span>
                    <ArrowLeft className={`w-4 h-4 ${isAr ? '' : 'rotate-180'}`} />
                  </div>
                </Link>
              ))}
            </div>

            {/* CTA Section */}
            <div className="mt-16 bg-gradient-to-br from-primary-600 to-primary-800 rounded-3xl p-10 text-center text-white">
              <Sparkles className="w-10 h-10 mx-auto mb-4 text-primary-200" />
              <h2 className="text-2xl font-bold mb-2">
                {isAr ? "جهز تنشئ محتوى احترافي؟" : "Ready to create professional content?"}
              </h2>
              <p className="text-primary-100 mb-6 max-w-xl mx-auto">
                {isAr
                  ? "جرب ContentAlchemy مجاناً وأنشئ محتوى سوشيال ميديا باللهجة المصرية في ثواني"
                  : "Try ContentAlchemy for free and create social media content in Egyptian dialect in seconds"}
              </p>
              <Link
                href={`/${locale}/auth`}
                className="inline-flex items-center px-8 py-3 bg-white text-primary-700 rounded-2xl hover:bg-primary-50 font-semibold transition-colors"
              >
                {isAr ? "ابدأ مجاناً" : "Start Free"}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
