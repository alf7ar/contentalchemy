import { test, expect } from "@playwright/test"

test.describe("Blog", () => {
  test("Blog listing page loads", async ({ page }) => {
    await page.goto("/ar/blog")
    await expect(page.locator("h1")).toBeVisible()
    await expect(page.locator("h1")).toContainText("مدونة")
  })

  test("Blog listing shows posts", async ({ page }) => {
    await page.goto("/ar/blog")
    const posts = page.locator("a[href*='/ar/blog/']")
    const count = await posts.count()
    expect(count).toBeGreaterThanOrEqual(10)
  })

  test("Blog post page loads", async ({ page }) => {
    await page.goto("/ar/blog/ازاي-تكتب-محتوى-سوشيال-ميديا-يجذب-عملاء")
    const headings = page.locator("h1")
    await expect(headings.first()).toBeVisible()
    await expect(headings.first()).toContainText("محتوى")
  })

  test("Blog post has sharing buttons", async ({ page }) => {
    await page.goto("/ar/blog/ازاي-تكتب-محتوى-سوشيال-ميديا-يجذب-عملاء")
    await expect(page.getByRole("button", { name: "WhatsApp" })).toBeVisible()
    await expect(page.getByRole("button", { name: /نسخ/ })).toBeVisible()
  })

  test("Blog post has related posts", async ({ page }) => {
    await page.goto("/ar/blog/ازاي-تكتب-محتوى-سوشيال-ميديا-يجذب-عملاء")
    await expect(page.getByRole("heading", { name: "مقالات ذات صلة" })).toBeVisible()
  })

  test("Blog post has CTA", async ({ page }) => {
    await page.goto("/ar/blog/ازاي-تكتب-محتوى-سوشيال-ميديا-يجذب-عملاء")
    await expect(page.locator("a[href*='/auth']").first()).toBeVisible()
  })

  test("Blog non-existent post shows 404", async ({ page }) => {
    await page.goto("/ar/blog/غير-موجود")
    await expect(page.locator("h1")).toContainText("غير موجود")
  })
})
