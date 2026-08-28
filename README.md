# Video Transcript Hub

Build a SaaS landing page + authenticated app shell for Video Speed Reader, a product that turns any video into an accurate transcript in three minutes, targeted at content creators, educators, and engineers who record long-form video and need a fast, clean transcript to repurpose into blog posts, course notes, or searchable archives.

The site must include:

1. A public landing page (`/`) with:

   - Hero section: product name "Video Speed Reader" prominently displayed, value prop "上傳影片，三分鐘內拿到逐字稿。" (English subtitle: "Upload your video, get a clean transcript in three minutes."), and a primary CTA button labeled "Sign in / 登入" in the top-right header

   - Features section with exactly 3 feature cards:

     * Card 1: "高準確度逐字稿 (High-accuracy transcripts)" — powered by OpenAI Whisper, supports Chinese and English

     * Card 2: "三分鐘交付 (Three-minute turnaround)" — processed in the background, you get an email when it's ready

     * Card 3: "可商用授權 (Commercial-use ready)" — you own the output, use it however you like

   - Footer with copyright "© 2026 Video Speed Reader"

2. Authentication using Supabase Auth, backed by your own Supabase project (see "Environment variables" below):

   - Sign Up page with email + password

   - Sign In page with email + password

   - Sign Out functionality

   - Email confirmation can be disabled for simplicity in this v1

3. An authenticated app shell at `/app` that the user lands on after signing in:

   - Greets the signed-in user by email: "Hi {user.email}"

   - A placeholder message: "Your dashboard is coming soon. Upload functionality will be added in the next milestone."

   - A Sign Out button in the header

Design requirements:

- Modern, professional dark theme (purple/violet accent on a near-black background)

- Use Inter or a similar sans-serif font

- Mobile responsive

- Tasteful subtle animations (fade-in on scroll is fine; don't overdo it)

Out of scope for this v1: video upload widget, transcript display, payment, custom database tables (do NOT create a `profiles` or `videos` table — only use Supabase's default `auth.users`). 

Those come in later milestones. Stick to landing page + auth + placeholder dashboard.

## Tech stack

Plain Vite + React single-page app (React Router) with Supabase Auth. Builds to
a static SPA (`vite build` → `dist/`) suitable for static hosting on Vercel.

## Environment variables

The app reads its Supabase configuration from Vite env vars at build time — no
values are hardcoded. Create a `.env` (already present in this repo) with your
own Supabase project's credentials:

```sh
VITE_SUPABASE_URL=https://<your-project-ref>.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxxxxxxxxxxxxxxxxxxxx
```

`VITE_SUPABASE_PUBLISHABLE_KEY` is Supabase's browser-safe publishable key (the
successor to the old "anon key"); it is RLS-gated and safe to ship to the client.

When deploying to Vercel, add these same two variables under
**Project → Settings → Environment Variables** so the production build picks them
up.

## Development

You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
