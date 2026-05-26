"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Shield, Check, Clock, Smartphone, Wallet, RefreshCw, AlertTriangle } from "lucide-react"

interface Transaction {
  id: string
  user_id: string
  plan_id: string
  amount_egp: number
  payment_method: string
  transaction_ref: string
  phone_number: string | null
  status: string
  created_at: string
}

interface Subscription {
  id: string
  user_id: string
  plan_id: string
  status: string
  posts_limit: number
  current_period_start: string
  current_period_end: string | null
  created_at: string
}

export default function AdminPage() {
  const params = useParams()
  const locale = params.locale as string
  const isAr = locale === "ar"
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [unauthorized, setUnauthorized] = useState(false)
  const [dbNotReady, setDbNotReady] = useState(false)
  const [verifyingId, setVerifyingId] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      const res = await fetch("/api/admin/payments")
      if (res.status === 403) {
        setUnauthorized(true)
        return
      }
      if (res.status === 503) {
        setDbNotReady(true)
        return
      }
      const data = await res.json()
      setTransactions(data.transactions || [])
      setSubscriptions(data.subscriptions || [])
    } catch {
      setDbNotReady(true)
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData()
  }, [])

  const verifyTransaction = async (transactionId: string) => {
    setVerifyingId(transactionId)
    try {
      const res = await fetch("/api/admin/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "verify_transaction", transactionId }),
      })
      const data = await res.json()
      if (data.success) {
        setMessage(isAr ? "تم التحقق وتفعيل الاشتراك ✅" : "Verified and activated ✅")
        fetchData()
      } else {
        setMessage(data.error || "Error")
      }
    } catch {
      setMessage("Error verifying transaction")
    } finally {
      setVerifyingId(null)
    }
  }

  if (unauthorized) {
    return (
      <>
        <Navbar />
        <main className="flex-1 flex items-center justify-center py-20">
          <div className="text-center max-w-md">
            <Shield className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {isAr ? "غير مصرح" : "Unauthorized"}
            </h1>
            <p className="text-gray-500 mb-6">
              {isAr ? "أنت لست مشرفاً على هذا الموقع." : "You are not an admin of this site."}
            </p>
            <Link href={`/${locale}`} className="text-primary-600 hover:text-primary-700">
              {isAr ? "العودة للرئيسية" : "Back to home"}
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  if (dbNotReady) {
    return (
      <>
        <Navbar />
        <main className="flex-1 flex items-center justify-center py-20">
          <div className="text-center max-w-md">
            <AlertTriangle className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {isAr ? "قاعدة البيانات مش جاهزة" : "Database Not Ready"}
            </h1>
            <p className="text-gray-500 mb-4">
              {isAr
                ? "شغّل SQL Migration أولاً في Supabase SQL Editor."
                : "Run the SQL migration first in Supabase SQL Editor."}
            </p>
            <code className="block bg-gray-100 rounded-xl p-4 text-sm text-left mb-6" dir="ltr">
              supabase/migrations/001_init.sql
            </code>
            <Link href={`/${locale}/setup`} className="text-primary-600 hover:text-primary-700 font-medium">
              {isAr ? "فتح دليل الإعداد" : "Open setup guide"}
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const pendingTransactions = transactions.filter(t => t.status === "pending")
  const verifiedTransactions = transactions.filter(t => t.status === "verified")

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <Shield className="w-6 h-6 text-primary-600" />
                <h1 className="text-3xl font-bold text-gray-900">
                  {isAr ? "لوحة التحكم - المشرف" : "Admin Dashboard"}
                </h1>
              </div>
              <p className="text-gray-500">
                {isAr ? "إدارة المدفوعات والاشتراكات" : "Manage payments and subscriptions"}
              </p>
            </div>
            <button
              onClick={fetchData}
              className="px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm"
            >
              <RefreshCw className="w-4 h-4" />
              {isAr ? "تحديث" : "Refresh"}
            </button>
          </div>

          {message && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-2xl text-green-700 text-sm flex items-center justify-between">
              <span>{message}</span>
              <button onClick={() => setMessage(null)} className="text-green-500 hover:text-green-700">✕</button>
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-2xl border border-gray-200 p-5">
              <p className="text-sm text-gray-500 mb-1">{isAr ? "معلقة" : "Pending"}</p>
              <p className="text-3xl font-bold text-yellow-600">{pendingTransactions.length}</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-5">
              <p className="text-sm text-gray-500 mb-1">{isAr ? "تم التحقق" : "Verified"}</p>
              <p className="text-3xl font-bold text-green-600">{verifiedTransactions.length}</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-5">
              <p className="text-sm text-gray-500 mb-1">{isAr ? "اشتراكات نشطة" : "Active Subs"}</p>
              <p className="text-3xl font-bold text-primary-600">
                {subscriptions.filter(s => s.status === "active").length}
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-5">
              <p className="text-sm text-gray-500 mb-1">{isAr ? "إجمالي" : "Total"}</p>
              <p className="text-3xl font-bold text-gray-900">{transactions.length}</p>
            </div>
          </div>

          {/* Pending Transactions */}
          <div className="bg-white rounded-3xl border border-gray-200 p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-yellow-500" />
              {isAr ? "معاملات معلقة" : "Pending Transactions"}
              {pendingTransactions.length > 0 && (
                <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                  {pendingTransactions.length}
                </span>
              )}
            </h2>

            {pendingTransactions.length === 0 ? (
              <p className="text-gray-400 text-center py-8">
                {isAr ? "لا توجد معاملات معلقة" : "No pending transactions"}
              </p>
            ) : (
              <div className="space-y-4">
                {pendingTransactions.map((tx) => (
                  <div key={tx.id} className="p-4 bg-yellow-50 border border-yellow-200 rounded-2xl">
                    <div className="flex items-start justify-between flex-wrap gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {tx.payment_method === "instapay" ? (
                            <Smartphone className="w-4 h-4 text-primary-600" />
                          ) : (
                            <Wallet className="w-4 h-4 text-red-600" />
                          )}
                          <span className="font-semibold text-gray-900">{tx.plan_id.toUpperCase()}</span>
                          <span className="text-sm text-gray-500">
                            {tx.amount_egp} EGP
                          </span>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            tx.payment_method === "instapay" ? "bg-primary-100 text-primary-700" : "bg-red-100 text-red-700"
                          }`}>
                            {tx.payment_method === "instapay" ? "Instapay" : "Vodafone Cash"}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p><span className="text-gray-400">User:</span> {tx.user_id}</p>
                          <p><span className="text-gray-400">Ref:</span> {tx.transaction_ref}</p>
                          {tx.phone_number && <p><span className="text-gray-400">Phone:</span> {tx.phone_number}</p>}
                          <p><span className="text-gray-400">Date:</span> {new Date(tx.created_at).toLocaleString()}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => verifyTransaction(tx.id)}
                        disabled={verifyingId === tx.id}
                        className="px-5 py-2.5 bg-green-600 text-white rounded-xl hover:bg-green-700 disabled:opacity-50 font-medium text-sm transition-colors flex items-center gap-2"
                      >
                        {verifyingId === tx.id ? (
                          <RefreshCw className="w-4 h-4 animate-spin" />
                        ) : (
                          <Check className="w-4 h-4" />
                        )}
                        {isAr ? "تحقق وتفعيل" : "Verify & Activate"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Verified */}
          {verifiedTransactions.length > 0 && (
            <div className="bg-white rounded-3xl border border-gray-200 p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                {isAr ? "آخر المعاملات المؤكدة" : "Recent Verified Transactions"}
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-right py-3 px-4 text-gray-500 font-medium">الخطة</th>
                      <th className="text-right py-3 px-4 text-gray-500 font-medium">المبلغ</th>
                      <th className="text-right py-3 px-4 text-gray-500 font-medium">الطريقة</th>
                      <th className="text-right py-3 px-4 text-gray-500 font-medium">المرجع</th>
                      <th className="text-right py-3 px-4 text-gray-500 font-medium">التاريخ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {verifiedTransactions.slice(0, 10).map((tx) => (
                      <tr key={tx.id} className="border-b border-gray-50 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium text-gray-900">{tx.plan_id}</td>
                        <td className="py-3 px-4">{tx.amount_egp} EGP</td>
                        <td className="py-3 px-4">{tx.payment_method}</td>
                        <td className="py-3 px-4 text-gray-500 font-mono text-xs">{tx.transaction_ref}</td>
                        <td className="py-3 px-4 text-gray-500">{new Date(tx.created_at).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Active Subscriptions */}
          <div className="bg-white rounded-3xl border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary-500" />
              {isAr ? "الاشتراكات النشطة" : "Active Subscriptions"}
            </h2>
            {subscriptions.filter(s => s.status === "active").length === 0 ? (
              <p className="text-gray-400 text-center py-8">
                {isAr ? "لا توجد اشتراكات نشطة" : "No active subscriptions"}
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-right py-3 px-4 text-gray-500 font-medium">المستخدم</th>
                      <th className="text-right py-3 px-4 text-gray-500 font-medium">الخطة</th>
                      <th className="text-right py-3 px-4 text-gray-500 font-medium">مؤكد</th>
                      <th className="text-right py-3 px-4 text-gray-500 font-medium">منذ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscriptions.filter(s => s.status === "active").map((sub) => (
                      <tr key={sub.id} className="border-b border-gray-50 hover:bg-gray-50">
                        <td className="py-3 px-4 font-mono text-xs text-gray-600">{sub.user_id}</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 bg-primary-50 text-primary-700 rounded-lg text-xs font-medium">
                            {sub.plan_id}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          {sub.posts_limit > 3 ? (
                            <Check className="w-4 h-4 text-green-500" />
                          ) : (
                            <span className="text-xs text-gray-400">free</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-gray-500">{new Date(sub.current_period_start).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
