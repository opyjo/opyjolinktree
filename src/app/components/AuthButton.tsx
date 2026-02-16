"use client";

import { useAuth } from "@/lib/context/AuthContext";

export default function AuthButton() {
  const { user, loading, isAdmin, signInWithGoogle, signOut } = useAuth();

  if (loading) {
    return (
      <div className="h-8 w-8 animate-pulse rounded-full bg-ink/5" />
    );
  }

  if (!user) {
    return (
      <button
        onClick={signInWithGoogle}
        className="rounded-full bg-white/80 px-3.5 py-1.5 text-xs font-medium text-slate shadow-sm backdrop-blur-sm transition-all duration-200 hover:bg-white hover:text-ink hover:shadow"
      >
        Sign in
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {isAdmin && (
        <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-medium text-accent">
          Admin
        </span>
      )}
      <button
        onClick={signOut}
        className="group flex items-center gap-1.5 rounded-full bg-white/80 py-1 pl-1 pr-3 shadow-sm backdrop-blur-sm transition-all duration-200 hover:bg-white hover:shadow"
      >
        {user.photoURL ? (
          <img
            src={user.photoURL}
            alt={user.displayName || "User"}
            className="h-6 w-6 rounded-full"
          />
        ) : (
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/10 text-[10px] font-semibold text-accent">
            {user.displayName?.charAt(0) || "U"}
          </div>
        )}
        <span className="text-xs text-slate group-hover:text-ink">
          Sign out
        </span>
      </button>
    </div>
  );
}
