# Opyjo Linktree

A dynamic linktree application built with Next.js, Firebase, and Tailwind CSS. Manage your links through an authenticated admin interface with real-time updates.

## Features

- 🔐 **Google Authentication** - Secure admin access with Firebase Auth
- 🎨 **Beautiful UI** - Clean, modern design with Tailwind CSS
- ⚡ **Real-time Updates** - Changes reflect immediately
- 📱 **Responsive** - Works on all devices
- 🔒 **Secure** - Multi-layer security with API routes and Firestore rules
- 🚀 **Fast** - Server-side rendering for optimal performance

## Tech Stack

- **Framework**: Next.js 16.1.6 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Firebase Auth (Google Sign-In)
- **Database**: Firestore
- **Hosting**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 20+ installed
- A Google account
- A Firebase project (follow setup guide below)

### Installation

1. **Clone the repository** (or you're already here!)

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up Firebase**:
   Follow the detailed guide in [FIREBASE_SETUP.md](./FIREBASE_SETUP.md)

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)**

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── links/
│   │       └── route.ts          # API routes for CRUD operations
│   ├── components/
│   │   ├── AuthButton.tsx        # Login/logout button
│   │   ├── EditLinkForm.tsx      # Form for add/edit operations
│   │   ├── EditModeToggle.tsx    # Toggle edit mode button
│   │   ├── LinkCard.tsx          # Individual link display
│   │   └── LinkList.tsx          # Main list component
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout with AuthProvider
│   └── page.tsx                  # Home page
├── lib/
│   ├── context/
│   │   └── AuthContext.tsx       # Auth state management
│   └── firebase/
│       ├── adminApp.ts           # Firebase Admin SDK
│       ├── auth.ts               # Auth helper functions
│       └── clientApp.ts          # Firebase Client SDK
└── types/
    └── link.ts                   # TypeScript type definitions

scripts/
└── migrate-links.ts              # Data migration script

firestore.rules                   # Firestore security rules
```

## Usage

### For Public Users

Simply visit the site to see all published links. Click any link to navigate to it.

### For Admins

1. **Sign In**: Click "Sign In" button and authenticate with your admin Google account
2. **Edit Mode**: Click "Edit Links" button to enter edit mode
3. **Add Link**: Click "+ Add Link" button and fill in the form
4. **Edit Link**: Click "Edit" on any link card to modify it
5. **Delete Link**: Click "Delete" on any link card (click twice to confirm)
6. **Done**: Click "Done Editing" to exit edit mode

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Environment Variables

Required environment variables (see `.env.local.example`):

```env
# Firebase Client SDK (public)
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Firebase Admin SDK (private)
FIREBASE_ADMIN_PROJECT_ID=
FIREBASE_ADMIN_CLIENT_EMAIL=
FIREBASE_ADMIN_PRIVATE_KEY=

# Admin Configuration
NEXT_PUBLIC_ADMIN_EMAIL=

# Base URL
NEXT_PUBLIC_BASE_URL=
```

## Security

This application implements multiple layers of security:

1. **Authentication**: Only authenticated users can attempt to modify data
2. **Authorization**: Only the configured admin email can actually modify data
3. **API Routes**: Server-side validation and token verification
4. **Firestore Rules**: Database-level security rules as a second line of defense
5. **Environment Variables**: Sensitive credentials stored securely

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add all environment variables from `.env.local`
4. Update `NEXT_PUBLIC_BASE_URL` to your Vercel URL
5. Deploy!

Don't forget to:
- Add your Vercel domain to Firebase Auth authorized domains
- Deploy Firestore security rules: `firebase deploy --only firestore:rules`

## Troubleshooting

See [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) for common issues and solutions.

## License

MIT

## Support

For issues or questions, please open an issue on GitHub.

---

Built with ❤️ using Next.js and Firebase
