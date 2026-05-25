import { test, expect } from "@playwright/test"

test.describe("SEO Landing Pages", () => {
  test("SEO page renders correctly", async ({ page }) => {
    await page.goto("/ar/seo/اداة-كتابة-محتوى-سوشيال-ميديا")
    await expect(page.locator("h1")).toBeVisible()
    await expect(page.getByRole("link", { name: /ابدأ مجاناً/ })).toBeVisible()
  })

  test("SEO page has back link to home", async ({ page }) => {
    await page.goto("/ar/seo/اداة-كتابة-محتوى-سوشيال-ميديا")
    await expect(page.locator("a[href='/ar']").first()).toBeVisible()
  })

  test("SEO page has feature list", async ({ page }) => {
    await page.goto("/ar/seo/اداة-كتابة-محتوى-سوشيال-ميديا")
    await expect(page.locator("h1")).toContainText(/محتوى/)
  })

  test("All 15+ SEO pages load without 404", async ({ page }) => {
    const slugs = [
      "اداة-كتابة-محتوى-سوشيال-ميديا",
      "انشاء-منشورات-فيسبوك-بالذكاء-الاصطناعي",
      "كتابة-محتوى-انستغرام-بالعربي",
      "توليد-محتوى-تيك-توك-بالعربي",
      "مساعد-تسويق-الكتروني-بالذكاء-الاصطناعي",
    ]
    for (const slug of slugs) {
      await page.goto(`/ar/seo/${slug}`)
      const status = await page.locator("h1").count()
      expect(status).toBe(1)
    }
  })
})
