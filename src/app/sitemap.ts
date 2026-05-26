import { MetadataRoute } from "next"
import seoPages from "@/lib/seo-pages"
import { blogPosts } from "@/lib/blog-posts"

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://contentalchemy.com"

export default function sitemap(): MetadataRoute.Sitemap {
  const localePages = [
    { url: `${baseUrl}/ar`, lastModified: new Date() },
    { url: `${baseUrl}/en`, lastModified: new Date() },
    { url: `${baseUrl}/ar/pricing`, lastModified: new Date() },
    { url: `${baseUrl}/en/pricing`, lastModified: new Date() },
    { url: `${baseUrl}/ar/dashboard`, lastModified: new Date() },
    { url: `${baseUrl}/en/dashboard`, lastModified: new Date() },
    { url: `${baseUrl}/ar/auth`, lastModified: new Date() },
    { url: `${baseUrl}/en/auth`, lastModified: new Date() },
    { url: `${baseUrl}/ar/features`, lastModified: new Date() },
    { url: `${baseUrl}/en/features`, lastModified: new Date() },
    { url: `${baseUrl}/ar/contact`, lastModified: new Date() },
    { url: `${baseUrl}/en/contact`, lastModified: new Date() },
    { url: `${baseUrl}/ar/refer`, lastModified: new Date() },
    { url: `${baseUrl}/en/refer`, lastModified: new Date() },
    { url: `${baseUrl}/ar/terms`, lastModified: new Date() },
    { url: `${baseUrl}/en/terms`, lastModified: new Date() },
    { url: `${baseUrl}/ar/privacy`, lastModified: new Date() },
    { url: `${baseUrl}/ar/blog`, lastModified: new Date() },
    { url: `${baseUrl}/en/blog`, lastModified: new Date() },
  ]

  const seoEntries = seoPages.flatMap((page) => [
    { url: `${baseUrl}/ar/seo/${page.slug}`, lastModified: new Date() },
    { url: `${baseUrl}/en/seo/${page.slug}`, lastModified: new Date() },
  ])

  const blogEntries = blogPosts.flatMap((post) => [
    { url: `${baseUrl}/ar/blog/${post.slug}`, lastModified: new Date(post.date) },
    { url: `${baseUrl}/en/blog/${post.slug}`, lastModified: new Date(post.date) },
  ])

  return [...localePages, ...seoEntries, ...blogEntries] as MetadataRoute.Sitemap
}
