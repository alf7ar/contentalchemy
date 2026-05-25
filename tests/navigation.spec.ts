import { test, expect } from "@playwright/test"

test.describe("Navigation", () => {
  test("Arabic landing page loads correctly", async ({ page }) => {
    await page.goto("/ar")
    await expect(page.locator("h1")).toBeVisible()
    await expect(page).toHaveURL(/\/ar/)
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl")
    await expect(page.locator("html")).toHaveAttribute("lang", "ar")
  })

  test("English landing page loads correctly", async ({ page }) => {
    await page.goto("/en")
    await expect(page.locator("h1")).toBeVisible()
    await expect(page).toHaveURL(/\/en/)
    await expect(page.locator("html")).toHaveAttribute("dir", "ltr")
    await expect(page.locator("html")).toHaveAttribute("lang", "en")
  })

  test("Navbar is present and has all links", async ({ page }) => {
    await page.goto("/ar")
    await expect(page.locator("nav")).toBeVisible()
    await expect(page.locator("nav")).toContainText("ContentAlchemy")
    await expect(page.locator("nav a[href='/ar/pricing']")).toBeVisible()
    await expect(page.locator("nav a[href='/ar/dashboard']")).toBeVisible()
    await expect(page.locator("nav a[href='/ar/auth']")).toBeVisible()
  })

  test("Footer is present", async ({ page }) => {
    await page.goto("/ar")
    await expect(page.locator("footer")).toBeVisible()
  })

  test("Language switch button works", async ({ page }) => {
    await page.goto("/ar")
    const langButton = page.locator("button", { hasText: "English" })
    await expect(langButton).toBeVisible()
  })
})
