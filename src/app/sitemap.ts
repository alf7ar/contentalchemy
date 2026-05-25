import { MetadataRoute } from "next"
import seoPages from "@/lib/seo-pages"

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
  ]

  const seoEntries = seoPages.flatMap((page) => [
    { url: `${baseUrl}/ar/seo/${page.slug}`, lastModified: new Date() },
    { url: `${baseUrl}/en/seo/${page.slug}`, lastModified: new Date() },
  ])

  return [...localePages, ...seoEntries] as MetadataRoute.Sitemap
}
