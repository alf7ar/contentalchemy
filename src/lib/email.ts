/**
 * Transactional email service for ContentAlchemy
 *
 * Supports SendGrid and Resend via environment variables:
 * - SENDGRID_API_KEY (recommended)
 * - RESEND_API_KEY (alternative)
 *
 * If neither is set, emails are silently skipped (graceful fallback).
 */

interface EmailOptions {
  to: string
  subject: string
  html: string
  from?: string
}

const FROM_EMAIL = process.env.FROM_EMAIL || "noreply@contentalchemy.com"
const FROM_NAME = "ContentAlchemy"

async function sendViaSendGrid(options: EmailOptions): Promise<boolean> {
  const apiKey = process.env.SENDGRID_API_KEY
  if (!apiKey) return false

  try {
    const res = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: options.to }] }],
        from: { email: options.from || FROM_EMAIL, name: FROM_NAME },
        subject: options.subject,
        content: [{ type: "text/html", value: options.html }],
      }),
    })
    return res.ok
  } catch {
    return false
  }
}

async function sendViaResend(options: EmailOptions): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return false

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `${FROM_NAME} <${options.from || FROM_EMAIL}>`,
        to: [options.to],
        subject: options.subject,
        html: options.html,
      }),
    })
    return res.ok
  } catch {
    return false
  }
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  // Try SendGrid first, then Resend, then silent fallback
  if (process.env.SENDGRID_API_KEY) {
    return sendViaSendGrid(options)
  }
  if (process.env.RESEND_API_KEY) {
    return sendViaResend(options)
  }
  // No email service configured
  console.warn("No email service configured. Set SENDGRID_API_KEY or RESEND_API_KEY.")
  return false
}

export function getWelcomeEmailHtml(name: string, locale: string): string {
  const isAr = locale === "ar"
  const loginUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "https://contentalchemy.vercel.app"}/${locale}/dashboard`

  if (isAr) {
    return `
      <div style="font-family: 'Cairo', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #7c3aed; font-size: 28px;">✨ ContentAlchemy</h1>
        </div>
        <h2 style="color: #1f2937;">مرحباً ${name} 👋</h2>
        <p style="color: #6b7280; font-size: 16px; line-height: 1.6;">
          شكراً لانضمامك إلى ContentAlchemy! احنا هنا عشان نساعدك تنشئ محتوى سوشيال ميديا احترافي باللهجة المصرية.
        </p>
        <div style="background: #f5f3ff; border-radius: 16px; padding: 24px; margin: 24px 0;">
          <h3 style="color: #7c3aed; margin-top: 0;">إيه اللي تقدر تعمله؟</h3>
          <ul style="color: #6b7280; line-height: 2;">
            <li>✅ توليد محتوى لـ 6 منصات مختلفة</li>
            <li>✅ 7 نغمات محتوى تناسب علامتك</li>
            <li>✅ هاشتاجات ذكية ومناسبة</li>
            <li>✅ مشاركة مباشرة على واتساب</li>
            <li>✅ محتوى باللهجة المصرية الأصيلة</li>
          </ul>
        </div>
        <div style="text-align: center; margin: 32px 0;">
          <a href="${loginUrl}" style="background: #7c3aed; color: white; padding: 14px 32px; border-radius: 12px; text-decoration: none; font-size: 16px; font-weight: 600;">
            ابدأ في إنشاء المحتوى
          </a>
        </div>
        <p style="color: #9ca3af; font-size: 14px; text-align: center; margin-top: 40px;">
          مع تحيات، فريق ContentAlchemy 💜
        </p>
      </div>
    `
  }

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #7c3aed; font-size: 28px;">✨ ContentAlchemy</h1>
      </div>
      <h2 style="color: #1f2937;">Welcome ${name} 👋</h2>
      <p style="color: #6b7280; font-size: 16px; line-height: 1.6;">
        Thanks for joining ContentAlchemy! We're here to help you create professional social media content.
      </p>
      <div style="background: #f5f3ff; border-radius: 16px; padding: 24px; margin: 24px 0;">
        <h3 style="color: #7c3aed; margin-top: 0;">What you can do:</h3>
        <ul style="color: #6b7280; line-height: 2;">
          <li>✅ Generate content for 6 platforms</li>
          <li>✅ 7 different content tones</li>
          <li>✅ Smart hashtag suggestions</li>
          <li>✅ Direct WhatsApp sharing</li>
          <li>✅ Egyptian dialect content</li>
        </ul>
      </div>
      <div style="text-align: center; margin: 32px 0;">
        <a href="${loginUrl}" style="background: #7c3aed; color: white; padding: 14px 32px; border-radius: 12px; text-decoration: none; font-size: 16px; font-weight: 600;">
          Start Creating Content
        </a>
      </div>
      <p style="color: #9ca3af; font-size: 14px; text-align: center; margin-top: 40px;">
        Best regards, The ContentAlchemy Team 💜
      </p>
    </div>
  `
}

export function getPaymentConfirmedEmailHtml(planName: string, locale: string): string {
  const isAr = locale === "ar"
  const dashboardUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "https://contentalchemy.vercel.app"}/${locale}/dashboard`

  if (isAr) {
    return `
      <div style="font-family: 'Cairo', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #1f2937;">تم تفعيل باقتك! 🎉</h2>
        <p style="color: #6b7280;">باقة ${planName} مفعلة الآن. استمتع بالمحتوى غير المحدود!</p>
        <a href="${dashboardUrl}" style="background: #7c3aed; color: white; padding: 12px 28px; border-radius: 12px; text-decoration: none;">افتح لوحة التحكم</a>
      </div>
    `
  }

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #1f2937;">Your plan is active! 🎉</h2>
      <p style="color: #6b7280;">Your ${planName} plan is now active. Enjoy unlimited content generation!</p>
      <a href="${dashboardUrl}" style="background: #7c3aed; color: white; padding: 12px 28px; border-radius: 12px; text-decoration: none;">Open Dashboard</a>
    </div>
  `
}
