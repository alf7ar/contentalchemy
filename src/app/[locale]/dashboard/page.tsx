"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
type Platform = "instagram" | "facebook" | "tiktok" | "linkedin" | "ads"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import {
  Sparkles, Copy, Check, RefreshCw,
  Camera, Share2, Video, Users, Megaphone, LoaderCircle, BarChart3,
} from "lucide-react"

const platformIcons: Record<Platform, React.ReactNode> = {
  instagram: <Camera className="w-5 h-5" />,
  facebook: <Share2 className="w-5 h-5" />,
  tiktok: <Video className="w-5 h-5" />,
  linkedin: <Users className="w-5 h-5" />,
  ads: <Megaphone className="w-5 h-5" />,
}

const platformColors: Record<Platform, string> = {
  instagram: "text-pink-600 bg-pink-50 border-pink-200",
  facebook: "text-blue-600 bg-blue-50 border-blue-200",
  tiktok: "text-gray-900 bg-gray-50 border-gray-200",
  linkedin: "text-blue-700 bg-blue-50 border-blue-200",
  ads: "text-orange-600 bg-orange-50 border-orange-200",
}

interface GeneratedContent {
  platform: Platform
  title: string
  content: string
  hashtags: string[]
}

export default function DashboardPage() {
  const t = useTranslations("dashboard")
  const [topic, setTopic] = useState("")
  const [businessName, setBusinessName] = useState("")
  const [businessType, setBusinessType] = useState("")
  const [tone, setTone] = useState<"professional" | "casual" | "luxury" | "funny">("professional")
  const [generating, setGenerating] = useState(false)
  const [results, setResults] = useState<GeneratedContent[]>([])
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | "all">("all")

  const usageStats = {
    used: 3,
    total: 50,
    plan: "Starter",
  }

  const copyToClipboard = async (text: string, index: number) => {
    await navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  // Save to history when results come in
  const [history, setHistory] = useState<{ platform: string; title: string; content: string; hashtags: string[]; date: string }[]>([])
  const [showHistory, setShowHistory] = useState(false)

  // Load history from localStorage on mount
  useState(() => {
    try {
      const saved = localStorage.getItem("contentalchemy_history")
      if (saved) setHistory(JSON.parse(saved))
    } catch {}
  })

  // Save results to history
  const saveToHistory = (newResults: GeneratedContent[]) => {
    const entries = newResults.map(r => ({
      platform: r.platform,
      title: r.title,
      content: r.content,
      hashtags: r.hashtags,
      date: new Date().toISOString(),
    }))
    const updated = [...entries, ...history].slice(0, 50)
    setHistory(updated)
    localStorage.setItem("contentalchemy_history", JSON.stringify(updated))
  }

  // Generate content and save to history
  const handleGenerateWithHistory = async () => {
    if (!topic.trim()) return
    setGenerating(true)
    setResults([])

    const callApi = async (platform: Platform) => {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ platform, topic, businessName, businessType, tone }),
      })
      if (!res.ok) throw new Error("API error")
      return res.json() as Promise<{ title: string; content: string; hashtags: string[] }>
    }

    try {
      let newResults: GeneratedContent[]
      if (selectedPlatform === "all") {
        const platforms: Platform[] = ["instagram", "facebook", "tiktok", "linkedin", "ads"]
        newResults = await Promise.all(
          platforms.map(platform =>
            callApi(platform).then(r => ({ platform, title: r.title, content: r.content, hashtags: r.hashtags }))
          )
        )
      } else {
        const result = await callApi(selectedPlatform)
        newResults = [{ platform: selectedPlatform, title: result.title, content: result.content, hashtags: result.hashtags }]
      }
      setResults(newResults)
      saveToHistory(newResults)
    } catch (error) {
      console.error("Generation error:", error)
    } finally {
      setGenerating(false)
    }
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{t("title")}</h1>
              <p className="text-gray-500 mt-1">مرحباً بك في لوحة التحكم</p>
            </div>
            <div className="flex items-center gap-3">
              {history.length > 0 && (
                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border ${
                    showHistory
                      ? "bg-primary-600 text-white border-primary-600"
                      : "bg-white text-gray-600 border-gray-200 hover:border-primary-200"
                  }`}
                >
                  {t("history")} ({history.length})
                </button>
              )}
            </div>
          </div>

          {/* Usage Stats */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{t("usage")}</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {t("posts_used")} {usageStats.used} {t("out_of")} {usageStats.total} {t("posts")}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-2 w-32 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary-600 rounded-full transition-all"
                    style={{ width: `${(usageStats.used / usageStats.total) * 100}%` }}
                  />
                </div>
                <button className="px-4 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 text-sm font-medium transition-colors">
                  {t("upgrade")}
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Input Sidebar */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded-2xl border border-gray-200 p-6 sticky top-24">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">{t("generate")}</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t("business_name")}</label>
                    <input
                      type="text"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                      placeholder="مثلاً: مطعم الأول"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t("business_type")}</label>
                    <input
                      type="text"
                      value={businessType}
                      onChange={(e) => setBusinessType(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                      placeholder="مثلاً: مطاعم"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t("tone")}</label>
                    <select
                      value={tone}
                      onChange={(e) => setTone(e.target.value as typeof tone)}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                    >
                      <option value="professional">{t("tone_professional")}</option>
                      <option value="casual">{t("tone_casual")}</option>
                      <option value="luxury">{t("tone_luxury")}</option>
                      <option value="funny">{t("tone_funny")}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t("platform_all")}</label>
                    <div className="flex flex-wrap gap-2">
                      {(["all", "instagram", "facebook", "tiktok", "linkedin", "ads"] as const).map((p) => (
                        <button
                          key={p}
                          onClick={() => setSelectedPlatform(p)}
                          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border ${
                            selectedPlatform === p
                              ? "bg-primary-600 text-white border-primary-600"
                              : "bg-white text-gray-600 border-gray-200 hover:border-primary-200"
                          }`}
                        >
                          {p === "all" ? "الكل" : t(`platform_${p}`)}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">الموضوع</label>
                    <textarea
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      rows={3}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all resize-none"
                      placeholder={t("input_placeholder")}
                    />
                  </div>

                  <button
                    onClick={handleGenerateWithHistory}
                    disabled={generating || !topic.trim()}
                    className="w-full py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition-all flex items-center justify-center gap-2"
                  >
                    {generating ? (
                      <>
                        <LoaderCircle className="w-5 h-5 animate-spin" />
                        {t("generating")}
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5" />
                        {t("generate_btn")}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="lg:col-span-8">
              {results.length === 0 && !generating ? (
                <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl flex items-center justify-center mb-6">
                    <Sparkles className="w-10 h-10 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t("no_content")}</h3>
                  <p className="text-gray-500">اكتب موضوعاً في الجهة اليسرى وانقر على &ldquo;{t("generate_btn")}&rdquo;</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {generating && (
                    <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
                      <LoaderCircle className="w-12 h-12 animate-spin text-primary-600 mx-auto mb-4" />
                      <p className="text-gray-500">{t("generating")}</p>
                      <p className="text-sm text-gray-400 mt-2">يتم إنشاء محتوى مخصص لكل منصة...</p>
                    </div>
                  )}

                  {results.map((result, index) => (
                    <div
                      key={index}
                      className={`bg-white rounded-2xl border-2 p-6 transition-all ${platformColors[result.platform]}`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                            {platformIcons[result.platform]}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 text-lg">{result.title}</h3>
                            <p className="text-sm text-gray-500 capitalize">{result.platform}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => copyToClipboard(result.content + "\n\n" + result.hashtags.join(" "), index)}
                            className="p-2 rounded-lg hover:bg-white/50 transition-colors"
                          >
                            {copiedIndex === index ? (
                              <Check className="w-5 h-5 text-green-600" />
                            ) : (
                              <Copy className="w-5 h-5 text-gray-500" />
                            )}
                          </button>
                          <button className="p-2 rounded-lg hover:bg-white/50 transition-colors">
                            <RefreshCw className="w-5 h-5 text-gray-500" />
                          </button>
                        </div>
                      </div>

                      <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-line leading-relaxed mb-4">
                        {result.content}
                      </div>

                      {result.hashtags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {result.hashtags.map((tag, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 bg-white/80 rounded-full text-sm text-gray-600 border border-gray-200"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {copiedIndex === index && (
                        <div className="mt-3 px-4 py-2 bg-green-50 text-green-700 rounded-xl text-sm font-medium text-center">
                          {t("copied")}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* History Section */}
              {showHistory && history.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">{t("history")}</h3>
                  <div className="space-y-4">
                    {history.map((entry, i) => (
                      <div key={i} className="bg-white rounded-2xl border border-gray-200 p-4 hover:border-primary-200 transition-all">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-900">{entry.title}</span>
                            <span className="text-xs text-gray-400 capitalize">({entry.platform})</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-400">
                              {new Date(entry.date).toLocaleDateString("ar-EG")}
                            </span>
                            <button
                              onClick={() => copyToClipboard(entry.content + "\n\n" + entry.hashtags.join(" "), 999 + i)}
                              className="p-1.5 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                              {copiedIndex === 999 + i ? (
                                <Check className="w-4 h-4 text-green-600" />
                              ) : (
                                <Copy className="w-4 h-4 text-gray-400" />
                              )}
                            </button>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-2">{entry.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
