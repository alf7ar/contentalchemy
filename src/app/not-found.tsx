"use client"

import { usePathname } from "next/navigation"

export default function NotFoundPage() {
  const pathname = usePathname()
  const locale = pathname?.startsWith("/en") ? "en" : "ar"
  const isAr = locale === "ar"

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "system-ui, -apple-system, sans-serif",
        background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
        color: "#1e293b",
        padding: "24px",
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: "120px", fontWeight: 900, color: "#ddd6fe", marginBottom: "16px", lineHeight: 1 }}>
        404
      </div>
      <h1 style={{ fontSize: "36px", fontWeight: 700, margin: "0 0 12px" }}>
        {isAr ? "الصفحة مش موجودة" : "Page Not Found"}
      </h1>
      <p style={{ fontSize: "18px", color: "#64748b", margin: "0 0 32px", maxWidth: "480px" }}>
        {isAr
          ? "معذرة، الصفحة اللي بتدور عليها مش موجودة. يمكن تكون اتحذفت أو اتغير عنوانها."
          : "Sorry, the page you&apos;re looking for doesn&apos;t exist. It may have been moved or deleted."}
      </p>
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
        <a
          href={`/${locale}`}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "14px 28px",
            background: "#7c3aed",
            color: "#fff",
            borderRadius: "12px",
            textDecoration: "none",
            fontWeight: 600,
            fontSize: "16px",
          }}
        >
          {isAr ? "الرجوع للرئيسية" : "Go Home"}
        </a>
        <a
          href={`/${locale}/contact`}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "14px 28px",
            background: "#fff",
            color: "#475569",
            borderRadius: "12px",
            textDecoration: "none",
            fontWeight: 600,
            fontSize: "16px",
            border: "1px solid #e2e8f0",
          }}
        >
          {isAr ? "تواصل معنا" : "Contact Us"}
        </a>
      </div>
    </div>
  )
}
