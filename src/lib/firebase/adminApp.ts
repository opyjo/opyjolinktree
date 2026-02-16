import { initializeApp, getApps, cert, App } from "firebase-admin/app";
import { getAuth, Auth } from "firebase-admin/auth";
import { getFirestore, Firestore } from "firebase-admin/firestore";

let app: App;
let adminAuth: Auth;
let adminDb: Firestore;

// Singleton pattern - initialize only once
if (getApps().length === 0) {
  try {
    // Get private key and handle formatting
    let privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY || "";

    // Remove surrounding quotes if they exist
    privateKey = privateKey.replace(/^["']|["']$/g, "");

    // Replace literal \n with actual newlines
    privateKey = privateKey.replace(/\\n/g, "\n");

    app = initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
        clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
        privateKey: privateKey,
      }),
    });

    adminAuth = getAuth(app);
    adminDb = getFirestore(app);
  } catch (error) {
    console.error("Error initializing Firebase Admin:", error);
    throw new Error("Failed to initialize Firebase Admin SDK");
  }
} else {
  app = getApps()[0];
  adminAuth = getAuth(app);
  adminDb = getFirestore(app);
}

export { app, adminAuth, adminDb };
