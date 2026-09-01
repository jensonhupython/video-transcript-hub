"use client";

import Link from "next/link";
import SignOutButton from "./SignOutButton";

export default function AppShell({ email }: { email: string }) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="border-b border-border/60">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-base font-semibold tracking-tight">
              Video Speed Reader
            </Link>
            <nav className="flex items-center gap-4">
              <Link
                href="/app"
                className="text-sm font-medium text-muted-foreground transition hover:text-foreground"
              >
                Dashboard
              </Link>
              <Link
                href="/upload"
                className="text-sm font-medium text-muted-foreground transition hover:text-foreground"
              >
                Upload
              </Link>
            </nav>
          </div>
          <SignOutButton />
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="w-full max-w-lg animate-fade-in-up rounded-2xl border border-border bg-card p-10 text-center glow-card">
          <h1 className="text-2xl font-semibold">Hi {email}</h1>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Your dashboard is coming soon. Upload functionality will be added in
            the next milestone.
          </p>
        </div>
      </main>
    </div>
  );
}
