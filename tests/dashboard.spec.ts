import { test, expect } from "@playwright/test"

test.describe("Dashboard (Content Generator)", () => {
  test("Dashboard page loads with all elements", async ({ page }) => {
    await page.goto("/ar/dashboard")
    await expect(page.locator("h1")).toBeVisible()
    await expect(page.locator("text=إنشاء محتوى جديد")).toBeVisible()
    await expect(page.locator("text=استخدامك")).toBeVisible()
  })

  test("Dashboard has input form", async ({ page }) => {
    await page.goto("/ar/dashboard")
    await expect(page.locator("textarea")).toBeVisible()
    await expect(page.locator("button", { hasText: "إنشاء المحتوى" })).toBeVisible()
  })

  test("Business name input works", async ({ page }) => {
    await page.goto("/ar/dashboard")
    const businessInput = page.locator("input[placeholder*='مطعم']")
    await businessInput.fill("مطعم الأول")
    await expect(businessInput).toHaveValue("مطعم الأول")
  })

  test("Platform selector buttons are present", async ({ page }) => {
    await page.goto("/ar/dashboard")
    const platformButtons = page.locator("button").filter({ hasText: /الكل|إنستغرام|فيسبوك|تيك توك|لينكد إن|إعلانات/ })
    const count = await platformButtons.count()
    expect(count).toBeGreaterThanOrEqual(3)
  })

  test("Tone selector is present", async ({ page }) => {
    await page.goto("/ar/dashboard")
    await expect(page.locator("select")).toBeVisible()
  })

  test("Usage bar shows progress", async ({ page }) => {
    await page.goto("/ar/dashboard")
    await expect(page.locator("text=تم استخدام")).toBeVisible()
  })
})
