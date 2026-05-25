import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
})

const SYSTEM_PROMPTS: Record<string, string> = {
  instagram: `أنت خبير في إنشاء محتوى إنستغرام باللغة العربية للسوق المصري.
قم بإنشاء منشور إنستغرام جذاب بالعربية مناسب للسوق المصري.
يشمل: عنوان جذاب، نص المنشور (150-200 كلمة)، 5-10 هاشتاجات ذات صلة.
يجب أن يكون المحتوى ملائماً للجمهور المصري مع استخدام كلمات وعبارات محلية.`,

  facebook: `أنت خبير في إنشاء محتوى فيسبوك باللغة العربية للسوق المصري.
قم بإنشاء منشور فيسبوك احترافي وجذاب.
يشمل: عنوان رئيسي، نص المنشور (200-300 كلمة)، سؤال للتفاعل، 3-5 هاشتاجات.
استخدم لغة عربية فصيحة مع لمسات من اللهجة المصرية عند الحاجة.`,

  tiktok: `أنت خبير في إنشاء محتوى تيك توك بالعربية للسوق المصري.
قم بإنشاء سكريبت فيديو تيك توك قصير وجذاب (30-60 ثانية).
يشمل: عنوان الفيديو، السكريبت كاملاً مع التوقيت، وصف الفيديو، هاشتاجات.
يجب أن يكون المحتوى سريع الخطى ومثير للاهتمام.`,

  linkedin: `أنت خبير في إنشاء محتوى لينكد إن بالعربية للمحترفين في مصر.
قم بإنشاء منشور احترافي بالعربية.
يشمل: عنوان قوي، نص المنشور (200-300 كلمة)، 3-5 هاشتاجات مهنية.
يجب أن يكون المحتوى مفيداً وقيماً للمحترفين في السوق المصري.`,

  ads: `أنت خبير في كتابة الإعلانات بالعربية للسوق المصري.
قم بإنشاء إعلان تسويقي مقنع.
يشمل: عنوان الإعلان، نص الإعلان، دعوة لاتخاذ إجراء (CTA)، 3 هاشتاجات.
يجب أن يكون الإعلان مقنعاً ومحفزاً للشراء.`,
}

export type Platform = keyof typeof SYSTEM_PROMPTS

export interface GenerateOptions {
  platform: Platform
  topic: string
  businessName?: string
  businessType?: string
  tone?: "professional" | "casual" | "luxury" | "funny"
  targetAudience?: string
}

export interface GenerateResult {
  title: string
  content: string
  hashtags: string[]
  platform: Platform
}

export async function generateContent(options: GenerateOptions): Promise<GenerateResult> {
  const systemPrompt = SYSTEM_PROMPTS[options.platform]

  const userPrompt = `معلومات النشاط التجاري:
- اسم النشاط: ${options.businessName || ""}
- نوع النشاط: ${options.businessType || ""}
- الموضوع: ${options.topic}
- النغمة: ${options.tone || "professional"}
- الجمهور المستهدف: ${options.targetAudience || "عام"}

يرجى إنشاء المحتوى بالعربية الفصحى مع لمسات مصرية.
يجب أن يكون المحتوى أصلياً وجذاباً ومناسباً للسوق المصري.`

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    temperature: 0.7,
    max_tokens: 1500,
  })

  const text = completion.choices[0]?.message?.content || ""

  const hashtagRegex = /#[\u0621-\u064A\w\u0660-\u0669]+/g
  const hashtags = text.match(hashtagRegex) || []
  const contentWithoutHashtags = text.replace(hashtagRegex, "").trim()

  const lines = contentWithoutHashtags.split("\n").filter(l => l.trim())
  const title = lines[0]?.replace(/^[*#]+\s*/, "").trim() || options.topic
  const content = lines.slice(1).join("\n").trim()

  return {
    title,
    content,
    hashtags: hashtags.slice(0, 10),
    platform: options.platform,
  }
}

export async function generateMultiPlatform(options: Omit<GenerateOptions, "platform">) {
  const platforms: Platform[] = ["instagram", "facebook", "tiktok", "linkedin", "ads"]
  const results = await Promise.all(
    platforms.map(platform => generateContent({ ...options, platform }))
  )
  return results
}
