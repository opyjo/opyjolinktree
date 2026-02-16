/**
 * Migration script to move static links from src/data/links.ts to Firestore
 *
 * Usage: npx tsx scripts/migrate-links.ts
 */

// Load environment variables FIRST
import { config } from "dotenv";
import { resolve } from "path";
config({ path: resolve(process.cwd(), ".env.local") });

// Now import Firebase Admin
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// Import the links data
import { appLinks } from "../src/data/links.ts";

async function migrateLinks() {
  console.log("Starting migration...");
  console.log(`Found ${appLinks.length} links to migrate`);

  try {
    // Initialize Firebase Admin directly in the script
    let adminDb;
    if (getApps().length === 0) {
      // Remove quotes if present and handle newlines
      let privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY || "";

      // Remove surrounding quotes if they exist
      privateKey = privateKey.replace(/^["']|["']$/g, "");

      // Replace literal \n with actual newlines
      privateKey = privateKey.replace(/\\n/g, "\n");

      console.log("Initializing Firebase Admin...");

      const app = initializeApp({
        credential: cert({
          projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
          clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
          privateKey: privateKey,
        }),
      });

      adminDb = getFirestore(app);
      console.log("Firebase Admin initialized successfully!\n");
    } else {
      adminDb = getFirestore();
    }

    const batch = adminDb.batch();
    const linksRef = adminDb.collection("links");

    appLinks.forEach((link, index) => {
      const docRef = linksRef.doc();
      const linkData = {
        name: link.name,
        url: link.url,
        description: link.description,
        tag: link.tag || null,
        order: index,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      console.log(`  Preparing to add: ${link.name}`);
      batch.set(docRef, linkData);
    });

    console.log("\nCommitting to Firestore...");
    await batch.commit();
    console.log("\n✅ Migration complete!");
    console.log(`Successfully migrated ${appLinks.length} links to Firestore`);

    // Verify by reading back
    const snapshot = await linksRef.get();
    console.log(`\n📊 Total links in Firestore: ${snapshot.size}`);

    process.exit(0);
  } catch (error) {
    console.error("\n❌ Migration failed:");
    console.error(error);
    process.exit(1);
  }
}

migrateLinks();
