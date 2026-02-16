/**
 * Server-side auth helpers
 * DO NOT import in client components!
 * Only use in API routes and server components
 */

import { adminAuth } from "./adminApp";

/**
 * Verify Firebase ID token (server-side only)
 */
export async function verifyAuthToken(token: string) {
  try {
    const decodedToken = await adminAuth.verifyIdToken(token);
    return decodedToken;
  } catch (error) {
    console.error("Error verifying auth token:", error);
    throw new Error("Invalid or expired token");
  }
}

/**
 * Check if user is admin based on email
 */
export function isAdmin(email: string | undefined): boolean {
  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
  return email === adminEmail;
}
