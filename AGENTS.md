# Agent notes

Plain Vite + React SPA (React Router) with Supabase Auth, deployed as a static
site on Vercel.

- Supabase config comes from `VITE_SUPABASE_URL` and
  `VITE_SUPABASE_PUBLISHABLE_KEY` (see `.env` and the README). Do not hardcode
  Supabase URLs or keys.
- The Supabase client is created once in `src/integrations/supabase/client.ts`;
  import `{ supabase }` from there rather than calling `createClient` elsewhere.
- `main` on GitHub is the source of truth; keep it in a working, buildable state.
