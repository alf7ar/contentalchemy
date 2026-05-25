import { test, expect } from "@playwright/test"

test.describe("Pricing Page", () => {
  test("Pricing page loads with 4 plans", async ({ page }) => {
    await page.goto("/ar/pricing")
    await expect(page.locator("h1")).toBeVisible()
    const planCards = page.locator(".rounded-3xl").filter({ has: page.locator("h3") })
    const count = await planCards.count()
    expect(count).toBe(4)
  })

  test("Free plan link goes to auth", async ({ page }) => {
    await page.goto("/ar/pricing")
    const freePlanLink = page.locator("a[href='/ar/auth']").first()
    await expect(freePlanLink).toBeVisible()
  })

  test("Paid plans show Instapay modal on click", async ({ page }) => {
    await page.goto("/ar/pricing")
    const subscribeButtons = page.locator("button", { hasText: "اشترك الآن" })
    await expect(subscribeButtons.first()).toBeVisible()
    await subscribeButtons.first().click()
    await expect(page.getByRole("heading", { name: "الدفع عبر Instapay" })).toBeVisible()
  })

  test("Instapay modal shows payment details", async ({ page }) => {
    await page.goto("/ar/pricing")
    await page.locator("button", { hasText: "اشترك الآن" }).first().click()
    await expect(page.getByText("رقم Instapay:").first()).toBeVisible()
    await expect(page.getByText("المبلغ:").first()).toBeVisible()
    await expect(page.getByText("كود التحويل:").first()).toBeVisible()
  })

  test("Instapay modal can be closed", async ({ page }) => {
    await page.goto("/ar/pricing")
    await page.locator("button", { hasText: "اشترك الآن" }).first().click()
    const modal = page.getByRole("heading", { name: "الدفع عبر Instapay" })
    await expect(modal).toBeVisible()
    await page.locator("button", { hasText: "تم الدفع" }).click()
    await expect(modal).not.toBeVisible()
  })

  test("Most popular badge is shown on Pro plan", async ({ page }) => {
    await page.goto("/ar/pricing")
    await expect(page.locator("text=الأكثر طلباً")).toBeVisible()
  })
})
