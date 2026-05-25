import { test, expect } from "@playwright/test"

test.describe("Auth Page", () => {
  test("Auth page loads with signup form", async ({ page }) => {
    await page.goto("/ar/auth")
    await expect(page.locator("h1")).toBeVisible()
    await expect(page.locator("input[type='email']")).toBeVisible()
    await expect(page.locator("input[type='tel']")).toBeVisible()
    await expect(page.locator("input[type='password']")).toBeVisible()
  })

  test("Google sign-in button is visible", async ({ page }) => {
    await page.goto("/ar/auth")
    await expect(page.locator("text=Google")).toBeVisible()
  })

  test("Toggle between login and signup", async ({ page }) => {
    await page.goto("/ar/auth")
    const toggleButton = page.locator("button", { hasText: "تسجيل الدخول" })
    await expect(toggleButton).toBeVisible()
  })

  test("Form inputs are functional", async ({ page }) => {
    await page.goto("/ar/auth")
    const emailInput = page.locator("input[type='email']")
    await emailInput.fill("test@example.com")
    await expect(emailInput).toHaveValue("test@example.com")

    const phoneInput = page.locator("input[type='tel']")
    await phoneInput.fill("01001234567")
    await expect(phoneInput).toHaveValue("01001234567")
  })
})
