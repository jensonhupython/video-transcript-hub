import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export type AuthedContext = { user: User };

type Status = "loading" | "authed" | "guest";

/**
 * Client-side replacement for the TanStack `_authenticated` layout route.
 * Checks the Supabase session on mount; unauthenticated visitors are sent to
 * /auth, authenticated ones get the child routes with `{ user }` available via
 * `useOutletContext()`.
 */
export function ProtectedRoute() {
  const [status, setStatus] = useState<Status>("loading");
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    let active = true;
    supabase.auth.getUser().then(({ data, error }) => {
      if (!active) return;
      if (error || !data.user) {
        setStatus("guest");
      } else {
        setUser(data.user);
        setStatus("authed");
      }
    });
    return () => {
      active = false;
    };
  }, []);

  if (status === "loading") {
    return <div className="min-h-screen bg-background" />;
  }

  if (status === "guest" || !user) {
    return <Navigate to="/auth" replace />;
  }

  return <Outlet context={{ user } satisfies AuthedContext} />;
}
