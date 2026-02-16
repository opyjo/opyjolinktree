# Firebase Setup Guide

Follow these steps to set up Firebase for your linktree app.

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or "Create a project"
3. Enter a project name (e.g., "opyjo-linktree")
4. Continue through the setup wizard
5. You can disable Google Analytics if you don't need it

## Step 2: Enable Firestore Database

1. In your Firebase project, go to "Firestore Database" in the left sidebar
2. Click "Create database"
3. Choose "Start in production mode"
4. Select a location closest to your users (e.g., `us-central`)
5. Click "Enable"

## Step 3: Enable Authentication

1. Go to "Authentication" in the left sidebar
2. Click "Get started"
3. Click on "Google" under "Sign-in providers"
4. Toggle "Enable"
5. Enter your project support email
6. Click "Save"

## Step 4: Get Web App Credentials

1. Go to Project Settings (gear icon in left sidebar)
2. Scroll down to "Your apps"
3. Click the web icon `</>` to add a web app
4. Register your app with a nickname (e.g., "Linktree Web")
5. Copy the `firebaseConfig` object - you'll need these values for `.env.local`

## Step 5: Get Admin SDK Credentials

1. Still in Project Settings, go to "Service accounts" tab
2. Click "Generate new private key"
3. Click "Generate key" - a JSON file will download
4. Keep this file secure! Do not commit it to Git.

## Step 6: Create .env.local File

1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Fill in the values from Steps 4 and 5:

### From Step 4 (firebaseConfig):
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef
```

### From Step 5 (service account JSON):
```env
FIREBASE_ADMIN_PROJECT_ID=your-project-id
FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here (keep the \n)\n-----END PRIVATE KEY-----\n"
```

### Your Admin Email:
```env
NEXT_PUBLIC_ADMIN_EMAIL=youremail@gmail.com
```

### Base URL:
```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## Step 7: Deploy Firestore Security Rules

1. Install Firebase CLI if you haven't:
   ```bash
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```bash
   firebase login
   ```

3. Initialize Firebase in your project:
   ```bash
   firebase init firestore
   ```
   - Select your project
   - Accept the default `firestore.rules` file
   - Accept the default `firestore.indexes.json` file

4. **Update firestore.rules** with your admin email:
   - Open `firestore.rules`
   - Replace `YOUR_ADMIN_EMAIL@gmail.com` with your actual email

5. Deploy the rules:
   ```bash
   firebase deploy --only firestore:rules
   ```

## Step 8: Run Migration Script

Now migrate your existing links to Firestore:

```bash
npx ts-node scripts/migrate-links.ts
```

You should see output confirming the migration was successful.

## Step 9: Test Your Setup

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open http://localhost:3000

3. You should see your migrated links

4. Click "Sign In" and sign in with your admin Google account

5. You should see an "Admin" badge and "Edit Links" button

6. Test adding, editing, and deleting links

## Step 10: Deploy to Production

### If using Vercel:

1. Go to your Vercel project settings

2. Add all environment variables from `.env.local` to Vercel

3. Update `NEXT_PUBLIC_BASE_URL` to your production URL

4. In Firebase Console, add your Vercel domain to authorized domains:
   - Go to Authentication → Settings → Authorized domains
   - Add your Vercel domain (e.g., `your-app.vercel.app`)

5. Deploy:
   ```bash
   git add .
   git commit -m "Add Firebase integration"
   git push
   ```

## Troubleshooting

### "Failed to initialize Firebase Admin SDK"
- Check that your `FIREBASE_ADMIN_PRIVATE_KEY` is properly formatted with `\n` for newlines
- Ensure all environment variables are set correctly

### "Unauthorized" when trying to edit
- Verify you're signed in with the Google account matching `NEXT_PUBLIC_ADMIN_EMAIL`
- Check that Firestore rules are deployed correctly

### Links not appearing
- Run the migration script if you haven't: `npx ts-node scripts/migrate-links.ts`
- Check Firestore Console to verify documents exist
- Check browser console for any API errors

### Firebase Auth errors in production
- Ensure your production domain is added to Firebase authorized domains
- Verify all environment variables are set in Vercel/your hosting platform

## Security Notes

- **Never commit `.env.local`** to Git (it's already in `.gitignore`)
- **Never commit the service account JSON file**
- Keep your Firebase Admin SDK credentials secure
- Only share environment variables through secure channels
- Consider rotating service account keys periodically
