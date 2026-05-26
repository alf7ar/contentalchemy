"use client"

import { useParams } from "next/navigation"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export default function PrivacyPage() {
  const params = useParams()
  const locale = params.locale as string
  const isAr = locale === "ar"

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-white">
        <section className="py-20 md:py-28 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {isAr ? "سياسة الخصوصية" : "Privacy Policy"}
          </h1>
          <p className="text-gray-500 text-sm mb-10">آخر تحديث: مايو 2026</p>

          <div className="prose prose-gray max-w-none space-y-6 text-gray-700 leading-relaxed">
            {isAr ? (
              <>
                <h2 className="text-xl font-bold text-gray-900 mt-8">1. المقدمة</h2>
                <p>في ContentAlchemy، خصوصيتك مهمة بالنسبة لنا. سياسة الخصوصية دي بتوضح إحنا بنجمع إيه من بياناتك وازاي بنستخدمها.</p>

                <h2 className="text-xl font-bold text-gray-900 mt-8">2. البيانات اللي بنجمعها</h2>
                <p>بنحصل على البيانات التالية:</p>
                <ul className="list-disc pr-6 space-y-1">
                  <li>معلومات الحساب: الاسم، البريد الإلكتروني، رقم الهاتف</li>
                  <li>بيانات الاستخدام: المحتوى البتولده، الباقة اللي مشترك فيها</li>
                  <li>البيانات التقنية: عنوان IP، نوع المتصفح، نظام التشغيل</li>
                </ul>

                <h2 className="text-xl font-bold text-gray-900 mt-8">3. إحنا بنستخدم بياناتك إزاي؟</h2>
                <ul className="list-disc pr-6 space-y-1">
                  <li>عشان نقدملك الخدمة ونحسنها</li>
                  <li>عشان نتواصل معاك بخصوص حسابك</li>
                  <li>عشان نبعتلك عروض وتحديثات (لو وافقت)</li>
                  <li>عشان نحسن المحتوى اللي بنولده بناءً على استخدامك</li>
                </ul>

                <h2 className="text-xl font-bold text-gray-900 mt-8">4. مشاركة البيانات</h2>
                <p>مش بنشارك بياناتك الشخصية مع أطراف تانية إلا في الحالات دي:</p>
                <ul className="list-disc pr-6 space-y-1">
                  <li>مع مزودي الخدمة اللي بيساعدونا في تشغيل المنصة (زي Supabase وOpenAI)</li>
                  <li>حسب ما يقتضيه القانون</li>
                  <li>بحصول على موافقتك</li>
                </ul>

                <h2 className="text-xl font-bold text-gray-900 mt-8">5. تخزين البيانات</h2>
                <p>بنخزن بياناتك على خوادم آمنة باستخدام تشفير متقدم. بنحتفظ ببياناتك طول ما حسابك نشط، وبعد كده بنحذفها خلال 30 يوم.</p>

                <h2 className="text-xl font-bold text-gray-900 mt-8">6. حقوقك</h2>
                <p>لك الحق في:</p>
                <ul className="list-disc pr-6 space-y-1">
                  <li>طلب نسخة من بياناتك</li>
                  <li>طلب تصحيح أو حذف بياناتك</li>
                  <li>إلغاء الاشتراك في الرسائل التسويقية</li>
                  <li>سحب موافقتك في أي وقت</li>
                </ul>

                <h2 className="text-xl font-bold text-gray-900 mt-8">7. الكوكيز</h2>
                <p>بنستخدم الكوكيز عشان نحسن تجربتك على الموقع. تقدر تتحكم في إعدادات الكوكيز من المتصفح بتاعك.</p>

                <h2 className="text-xl font-bold text-gray-900 mt-8">8. التغييرات في السياسة</h2>
                <p>احنا بنحتفظ بالحق في تغيير سياسة الخصوصية دي. أي تغييرات هاننشرها على الصفحة دي.</p>

                <h2 className="text-xl font-bold text-gray-900 mt-8">9. تواصل معانا</h2>
                <p>لو عندك أي استفسار بخصوص الخصوصية، تواصل معانا على support@contentalchemy.com أو عبر واتساب على 01111143036.</p>
              </>
            ) : (
              <>
                <h2 className="text-xl font-bold text-gray-900 mt-8">1. Introduction</h2>
                <p>At ContentAlchemy, your privacy matters to us. This policy explains what data we collect and how we use it.</p>

                <h2 className="text-xl font-bold text-gray-900 mt-8">2. Information We Collect</h2>
                <p>We collect the following information:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Account information: name, email, phone number</li>
                  <li>Usage data: generated content, subscribed plan</li>
                  <li>Technical data: IP address, browser type, OS</li>
                </ul>

                <h2 className="text-xl font-bold text-gray-900 mt-8">3. How We Use Your Data</h2>
                <ul className="list-disc pl-6 space-y-1">
                  <li>To provide and improve our service</li>
                  <li>To communicate about your account</li>
                  <li>To send offers and updates (with consent)</li>
                  <li>To improve generated content based on usage</li>
                </ul>

                <h2 className="text-xl font-bold text-gray-900 mt-8">4. Data Sharing</h2>
                <p>We do not share your personal data with third parties except:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>With service providers helping us operate (e.g. Supabase, OpenAI)</li>
                  <li>As required by law</li>
                  <li>With your consent</li>
                </ul>

                <h2 className="text-xl font-bold text-gray-900 mt-8">5. Data Storage</h2>
                <p>Your data is stored on secure servers with advanced encryption. We retain data while your account is active and delete it within 30 days after deletion.</p>

                <h2 className="text-xl font-bold text-gray-900 mt-8">6. Your Rights</h2>
                <p>You have the right to:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Request a copy of your data</li>
                  <li>Request correction or deletion</li>
                  <li>Unsubscribe from marketing</li>
                  <li>Withdraw consent at any time</li>
                </ul>

                <h2 className="text-xl font-bold text-gray-900 mt-8">7. Cookies</h2>
                <p>We use cookies to improve your experience. You can control cookie settings in your browser.</p>

                <h2 className="text-xl font-bold text-gray-900 mt-8">8. Policy Changes</h2>
                <p>We may update this policy. Changes will be posted on this page.</p>

                <h2 className="text-xl font-bold text-gray-900 mt-8">9. Contact Us</h2>
                <p>For privacy questions, contact us at support@contentalchemy.com or via WhatsApp at 01111143036.</p>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
