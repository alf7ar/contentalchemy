import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"
import { routing } from "@/i18n/routing"

type Locale = "ar" | "en"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "hero" })
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://contentalchemy.vercel.app"
  return {
    title: t("title"),
    description: t("subtitle"),
    metadataBase: new URL(baseUrl),
    openGraph: {
      title: t("title"),
      description: t("subtitle"),
      locale: locale === "ar" ? "ar_EG" : "en_US",
      type: "website",
      siteName: "ContentAlchemy",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("subtitle"),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!routing.locales.includes(locale as Locale)) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@200..1000&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "ContentAlchemy",
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web",
              description: locale === "ar"
                ? "أداة متكاملة لإنشاء محتوى السوشيال ميديا بالعربية والإنجليزية باستخدام الذكاء الاصطناعي"
                : "AI-powered social media content generator for Arabic and English content",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "EGP",
                availability: "https://schema.org/InStock",
              },
              author: {
                "@type": "Organization",
                name: "ContentAlchemy",
              },
            }),
          }}
        />
      </head>
      <body className={`min-h-screen flex flex-col font-sans antialiased page-enter`}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
