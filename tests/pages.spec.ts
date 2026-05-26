import { test, expect } from "@playwright/test"

test.describe("Contact page", () => {
  test("should render contact page in Arabic", async ({ page }) => {
    await page.goto("/ar/contact")
    await expect(page.locator("h1")).toContainText("تواصل معنا")
    await expect(page.locator("button[type='submit']")).toBeVisible()
  })

  test("should render contact page in English", async ({ page }) => {
    await page.goto("/en/contact")
    await expect(page.locator("h1")).toContainText("Contact Us")
    await expect(page.locator("button[type='submit']")).toBeVisible()
  })

  test("should show success message on form submit", async ({ page }) => {
    await page.goto("/ar/contact")
    await page.fill("input[type='text']", "أحمد")
    await page.fill("input[type='email']", "ahmed@test.com")
    await page.fill("textarea", "رسالة اختبار")
    await page.click("button[type='submit']")
    await expect(page.locator("text=تم إرسال رسالتك")).toBeVisible({ timeout: 5000 })
  })

  test("should have WhatsApp link", async ({ page }) => {
    await page.goto("/ar/contact")
    const waLink = page.locator("a[href*='wa.me']")
    await expect(waLink).toBeVisible()
  })

  test("should have email link", async ({ page }) => {
    await page.goto("/ar/contact")
    const emailLink = page.locator("a[href^='mailto']")
    await expect(emailLink).toBeVisible()
  })
})

test.describe("Features page", () => {
  test("should render features page in Arabic", async ({ page }) => {
    await page.goto("/ar/features")
    await expect(page.locator("h1")).toContainText("ميزات")
  })

  test("should render features page in English", async ({ page }) => {
    await page.goto("/en/features")
    await expect(page.locator("h1")).toContainText("Features")
  })

  test("should show feature cards", async ({ page }) => {
    await page.goto("/ar/features")
    const cards = page.locator("h3")
    await expect(cards.first()).toBeVisible()
    // Should have multiple feature cards
    await expect(cards).toHaveCount(10)
  })

  test("should have pricing CTA", async ({ page }) => {
    await page.goto("/en/features")
    const cta = page.locator("a[href*='/en/pricing']").first()
    await expect(cta).toBeVisible()
  })
})

test.describe("404 page", () => {
  test("should show 404 page for invalid route", async ({ page }) => {
    await page.goto("/ar/some-nonexistent-page")
    // Root not-found page renders standalone HTML without client-side routing
    await expect(page.locator("text=404")).toBeVisible({ timeout: 10000 })
    await expect(page.locator("text=الصفحة مش موجودة").or(page.locator("text=Page Not Found"))).toBeVisible()
  })

  test("should have go home button on 404", async ({ page }) => {
    await page.goto("/en/some-nonexistent-page")
    await expect(page.locator("text=Go Home")).toBeVisible({ timeout: 10000 })
  })
})

test.describe("Terms & Privacy pages", () => {
  test("terms page renders in Arabic", async ({ page }) => {
    await page.goto("/ar/terms")
    await expect(page.locator("h1")).toContainText("الشروط والأحكام")
  })

  test("privacy page renders in Arabic", async ({ page }) => {
    await page.goto("/ar/privacy")
    await expect(page.locator("h1")).toContainText("سياسة الخصوصية")
  })

  test("terms page renders in English", async ({ page }) => {
    await page.goto("/en/terms")
    await expect(page.locator("h1")).toContainText("Terms")
  })

  test("privacy page renders in English", async ({ page }) => {
    await page.goto("/en/privacy")
    await expect(page.locator("h1")).toContainText("Privacy Policy")
  })
})

test.describe("Referral page", () => {
  test("should render referral page in Arabic", async ({ page }) => {
    await page.goto("/ar/refer")
    await expect(page.locator("h1")).toContainText("برنامج الدعوة")
  })

  test("should render referral page in English", async ({ page }) => {
    await page.goto("/en/refer")
    await expect(page.locator("h1")).toContainText("Referral Program")
  })

  test("should have copy button", async ({ page }) => {
    await page.goto("/ar/refer")
    await expect(page.locator("button", { hasText: "نسخ" })).toBeVisible()
  })

  test("should have WhatsApp share CTA", async ({ page }) => {
    await page.goto("/ar/refer")
    await expect(page.locator("button", { hasText: "شارك على واتساب" })).toBeVisible()
  })
})

test.describe("Footer navigation", () => {
  test("footer should have features link", async ({ page }) => {
    await page.goto("/ar")
    await expect(page.locator("footer a[href*='/ar/features']")).toBeVisible()
  })

  test("footer should have contact link", async ({ page }) => {
    await page.goto("/ar")
    await expect(page.locator("footer a[href*='/ar/contact']")).toBeVisible()
  })

  test("footer should have pricing link", async ({ page }) => {
    await page.goto("/ar")
    await expect(page.locator("footer a[href*='/ar/pricing']")).toBeVisible()
  })

  test("footer should have referral link", async ({ page }) => {
    await page.goto("/ar")
    await expect(page.locator("footer a[href*='/ar/refer']")).toBeVisible()
  })

  test("footer should have terms and privacy links", async ({ page }) => {
    await page.goto("/ar")
    await expect(page.locator("footer a[href*='/ar/terms']")).toBeVisible()
    await expect(page.locator("footer a[href*='/ar/privacy']")).toBeVisible()
  })

  test("footer should have blog link", async ({ page }) => {
    await page.goto("/ar")
    await expect(page.locator("footer a[href*='/ar/blog']")).toBeVisible()
  })
})

test.describe("Admin page", () => {
  test("should show unauthorized without auth", async ({ page }) => {
    await page.goto("/ar/admin")
    await expect(page.locator("h1")).toContainText("غير مصرح")
  })
})
