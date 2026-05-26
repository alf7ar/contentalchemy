/**
 * Admin utilities for ContentAlchemy
 *
 * The admin email is configured via ADMIN_EMAIL env variable.
 * If not set, defaults to "karimalfhar@gmail.com"
 */

export function getAdminEmail(): string {
  return process.env.ADMIN_EMAIL || "karimalfhar@gmail.com"
}

export function isAdmin(email: string | undefined | null): boolean {
  if (!email) return false
  return email.toLowerCase() === getAdminEmail().toLowerCase()
}
