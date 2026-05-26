"use client"

import { useEffect } from "react"
import { useParams } from "next/navigation"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export default function TermsPage() {
  const params = useParams()
  const locale = params.locale as string
  const isAr = locale === "ar"

  useEffect(() => {
    document.title = isAr ? "الشروط والأحكام - ContentAlchemy" : "Terms & Conditions - ContentAlchemy"
  }, [isAr])

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-white">
        <section className="py-20 md:py-28 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {isAr ? "الشروط والأحكام" : "Terms & Conditions"}
          </h1>
          <p className="text-gray-500 text-sm mb-10">آخر تحديث: مايو 2026</p>

          <div className="prose prose-gray max-w-none space-y-6 text-gray-700 leading-relaxed">
            {isAr ? (
              <>
                <h2 className="text-xl font-bold text-gray-900 mt-8">1. مقدمة</h2>
                <p>مرحباً بك في ContentAlchemy. باستخدامك للخدمة، أنت توافق على هذه الشروط والأحكام. لو مش موافق، مينفعش تستخدم الخدمة.</p>

                <h2 className="text-xl font-bold text-gray-900 mt-8">2. وصف الخدمة</h2>
                <p>ContentAlchemy هي خدمة لإنشاء محتوى السوشيال ميديا باستخدام الذكاء الاصطناعي. بنوفر محتوى بالعربية الفصحى والمصرية الدارجة لمنصات متعددة.</p>

                <h2 className="text-xl font-bold text-gray-900 mt-8">3. الحسابات والباقات</h2>
                <p>لازم تعمل حساب عشان تستخدم الخدمة. أنت مسؤول عن الحفاظ على سرية بيانات حسابك. الباقات مدفوعة مسبقاً ومش قابلة للاسترداد إلا في حالات استثنائية.</p>

                <h2 className="text-xl font-bold text-gray-900 mt-8">4. الدفع</h2>
                <p>الدفع يتم عبر Instapay أو Vodafone Cash. بعد تأكيد الدفع، بتتفعل الباقة فوراً. لو حصلت مشكلة في الدفع، تواصل معانا على support@contentalchemy.com</p>

                <h2 className="text-xl font-bold text-gray-900 mt-8">5. حقوق الملكية الفكرية</h2>
                <p>المحتوى اللي بتولده باستخدام الخدمة هو ملكك بالكامل. ContentAlchemy مش ليها أي حقوق على المحتوى اللي بتعمله.</p>

                <h2 className="text-xl font-bold text-gray-900 mt-8">6. استخدام مقبول</h2>
                <p>ممنوع استخدام الخدمة في إنشاء محتوى مخالف للقانون أو مسيء أو ينتهك حقوق الآخرين. احنا بنحتفظ بالحق في إلغاء حساب أي مستخدم بينتهك هذه السياسة.</p>

                <h2 className="text-xl font-bold text-gray-900 mt-8">7. إخلاء مسؤولية</h2>
                <p>الخدمة متوفرة &ldquo;كما هي&rdquo; بدون أي ضمانات. ContentAlchemy مش مسؤولة عن أي أضرار تنتج عن استخدام الخدمة.</p>

                <h2 className="text-xl font-bold text-gray-900 mt-8">8. تغيير الشروط</h2>
                <p>احنا بنحتفظ بالحق في تغيير هذه الشروط في أي وقت. هنانشر التغييرات على الصفحة دي وهنوافيك عبر الإيميل لو فيه تغييرات جوهرية.</p>

                <h2 className="text-xl font-bold text-gray-900 mt-8">9. تواصل معانا</h2>
                <p>لو عندك أي استفسار بخصوص الشروط دي، تواصل معانا على support@contentalchemy.com أو عبر واتساب على 01111143036.</p>
              </>
            ) : (
              <>
                <h2 className="text-xl font-bold text-gray-900 mt-8">1. Introduction</h2>
                <p>Welcome to ContentAlchemy. By using our service, you agree to these terms. If you do not agree, you may not use the service.</p>

                <h2 className="text-xl font-bold text-gray-900 mt-8">2. Service Description</h2>
                <p>ContentAlchemy is an AI-powered social media content generation service. We provide content in both formal Arabic and Egyptian dialect for multiple platforms.</p>

                <h2 className="text-xl font-bold text-gray-900 mt-8">3. Accounts & Plans</h2>
                <p>You must create an account to use the service. You are responsible for maintaining your account credentials. Plans are prepaid and non-refundable except in exceptional circumstances.</p>

                <h2 className="text-xl font-bold text-gray-900 mt-8">4. Payment</h2>
                <p>Payment is processed via Instapay or Vodafone Cash. Plans are activated immediately upon payment confirmation. For payment issues, contact support@contentalchemy.com</p>

                <h2 className="text-xl font-bold text-gray-900 mt-8">5. Intellectual Property</h2>
                <p>Content generated using our service is entirely your property. ContentAlchemy claims no rights to the content you create.</p>

                <h2 className="text-xl font-bold text-gray-900 mt-8">6. Acceptable Use</h2>
                <p>You may not use the service to create illegal, offensive, or infringing content. We reserve the right to terminate accounts that violate this policy.</p>

                <h2 className="text-xl font-bold text-gray-900 mt-8">7. Disclaimer</h2>
                <p>The service is provided &ldquo;as is&rdquo; without warranties of any kind. ContentAlchemy is not liable for any damages arising from the use of the service.</p>

                <h2 className="text-xl font-bold text-gray-900 mt-8">8. Changes to Terms</h2>
                <p>We reserve the right to modify these terms at any time. Changes will be posted on this page and notified via email for material changes.</p>

                <h2 className="text-xl font-bold text-gray-900 mt-8">9. Contact Us</h2>
                <p>For questions about these terms, contact us at support@contentalchemy.com or via WhatsApp at 01111143036.</p>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
