import { test, expect } from "@playwright/test"

test.describe("Landing Page", () => {
  test("Hero section has title and subtitle", async ({ page }) => {
    await page.goto("/ar")
    await expect(page.locator("h1")).toBeVisible()
    await expect(page.locator("h1")).not.toBeEmpty()
  })

  test("Features section is visible", async ({ page }) => {
    await page.goto("/ar")
    await page.evaluate(() => window.scrollTo(0, 600))
    const featuresSection = page.locator("section#features")
    await expect(featuresSection).toBeVisible()
  })

  test("How it works section is visible", async ({ page }) => {
    await page.goto("/ar")
    await page.locator("a[href='#how-it-works']").click()
    await expect(page.locator("text=كيف يعمل")).toBeVisible()
  })

  test("CTA buttons link to auth", async ({ page }) => {
    await page.goto("/ar")
    const ctaButton = page.locator("a[href='/ar/auth']").first()
    await expect(ctaButton).toBeVisible()
    await expect(ctaButton).toHaveAttribute("href", "/ar/auth")
  })

  test("All feature cards render", async ({ page }) => {
    await page.goto("/ar")
    await page.evaluate(() => window.scrollTo(0, 600))
    const featureCards = page.locator("section#features .group")
    const count = await featureCards.count()
    expect(count).toBe(4)
  })
})
