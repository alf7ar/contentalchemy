import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "ContentAlchemy - إنشاء محتوى تسويقي بالذكاء الاصطناعي",
  description: "أداة متكاملة لإنشاء محتوى السوشيال ميديا بالعربية والإنجليزية",
  keywords: ["تسويق", "محتوى", "ذكاء اصطناعي", "سوشيال ميديا", "مصر"],
  openGraph: {
    title: "ContentAlchemy",
    description: "أنشئ محتوى تسويقي احترافي بالذكاء الاصطناعي",
    locale: "ar_EG",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children
}
