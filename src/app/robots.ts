import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/dashboard", "/auth"],
      },
    ],
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL || "https://contentalchemy.com"}/sitemap.xml`,
  }
}
