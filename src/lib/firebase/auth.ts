import { auth } from "./clientApp";
import { adminAuth } from "./adminApp";

/**
 * Get the current user's ID token (client-side)
 */
export async function getAuthToken(): Promise<string | null> {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) return null;

    const token = await currentUser.getIdToken();
    return token;
  } catch (error) {
    console.error("Error getting auth token:", error);
    return null;
  }
}

/**
 * Verify Firebase ID token (server-side)
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
