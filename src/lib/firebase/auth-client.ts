/**
 * Client-side auth helpers
 * Safe to import in client components
 */

import { auth } from "./clientApp";

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
