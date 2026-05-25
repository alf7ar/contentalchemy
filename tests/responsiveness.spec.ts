import { test, expect } from "@playwright/test"

test.describe("Mobile Responsiveness", () => {
  test.use({ viewport: { width: 375, height: 812 } })

  test("Landing page is usable on mobile", async ({ page }) => {
    await page.goto("/ar")
    await expect(page.locator("h1")).toBeVisible()
    await page.locator('[class*="md:hidden"]').first().click()
    await expect(page.getByRole("link", { name: "الباقات" })).toBeVisible()
  })

  test("Pricing page stacks properly on mobile", async ({ page }) => {
    await page.goto("/ar/pricing")
    const planCards = page.locator(".rounded-3xl").filter({ has: page.locator("h3") })
    const count = await planCards.count()
    expect(count).toBe(4)
    await expect(planCards.first()).toBeVisible()
  })

  test("Dashboard fits mobile viewport", async ({ page }) => {
    await page.goto("/ar/dashboard")
    await expect(page.locator("textarea")).toBeVisible()
    await page.evaluate(() => {
      const body = document.body
      const html = document.documentElement
      const height = Math.max(body.scrollHeight, html.scrollHeight)
      const width = Math.max(body.scrollWidth, html.scrollWidth)
      return { width, height }
    })
  })
})

test.describe("Tablet Responsiveness", () => {
  test.use({ viewport: { width: 768, height: 1024 } })

  test("All pages render correctly on tablet", async ({ page }) => {
    await page.goto("/ar")
    await expect(page.locator("h1")).toBeVisible()
    await page.goto("/ar/pricing")
    await expect(page.locator("h1")).toBeVisible()
    await page.goto("/ar/dashboard")
    await expect(page.locator("h1")).toBeVisible()
  })
})
