import { useEffect, useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { AuthedContext } from "../components/ProtectedRoute";

export default function AppPage() {
  const { user } = useOutletContext<AuthedContext>();
  const navigate = useNavigate();
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    document.title = "Dashboard — Video Speed Reader";
  }, []);

  async function handleSignOut() {
    setSigningOut(true);
    await supabase.auth.signOut();
    navigate("/", { replace: true });
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="border-b border-border/60">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link to="/" className="text-base font-semibold tracking-tight">
            Video Speed Reader
          </Link>
          <button
            onClick={handleSignOut}
            disabled={signingOut}
            className="rounded-lg border border-border bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition hover:bg-accent disabled:opacity-50"
          >
            {signingOut ? "Signing out…" : "Sign out"}
          </button>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="w-full max-w-lg animate-fade-in-up rounded-2xl border border-border bg-card p-10 text-center glow-card">
          <h1 className="text-2xl font-semibold">Hi {user.email}</h1>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Your dashboard is coming soon. Upload functionality will be added in
            the next milestone.
          </p>
        </div>
      </main>
    </div>
  );
}
