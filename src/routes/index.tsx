import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, type ReactNode } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Video Speed Reader — 上傳影片，三分鐘內拿到逐字稿" },
      {
        name: "description",
        content:
          "Upload your video, get a clean transcript in three minutes. High-accuracy, commercial-use ready transcripts for creators, educators, and engineers.",
      },
      { property: "og:title", content: "Video Speed Reader" },
      {
        property: "og:description",
        content: "上傳影片，三分鐘內拿到逐字稿。 Upload your video, get a clean transcript in three minutes.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LandingPage,
});

function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("animate-fade-in-up");
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity: 0, animationDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

const features = [
  {
    icon: "🎯",
    title: "高準確度逐字稿",
    subtitle: "High-accuracy transcripts",
    body: "Powered by OpenAI Whisper with full support for Chinese and English, so your words come out right the first time.",
  },
  {
    icon: "⚡",
    title: "三分鐘交付",
    subtitle: "Three-minute turnaround",
    body: "Everything is processed in the background. Grab a coffee — you get an email the moment your transcript is ready.",
  },
  {
    icon: "💼",
    title: "可商用授權",
    subtitle: "Commercial-use ready",
    body: "You own the output completely. Repurpose it into blog posts, course notes, or archives — however you like.",
  },
];

function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-border/60 bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <span className="text-base font-semibold tracking-tight">
            Video Speed Reader
          </span>
          <Link
            to="/auth"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
          >
            Sign in / 登入
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-primary/20 blur-[140px]"
        />
        <div className="relative mx-auto max-w-4xl px-4 pb-24 pt-24 text-center sm:px-6 sm:pt-32">
          <Reveal>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Video Speed Reader
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-6 text-2xl font-semibold text-gradient sm:text-3xl">
              上傳影片，三分鐘內拿到逐字稿。
            </p>
            <p className="mt-3 text-base text-muted-foreground sm:text-lg">
              Upload your video, get a clean transcript in three minutes.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-10">
              <Link
                to="/auth"
                className="inline-flex items-center justify-center rounded-xl bg-primary px-8 py-3 text-base font-semibold text-primary-foreground transition hover:opacity-90 glow-card"
              >
                Sign in / 登入
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        <Reveal>
          <h2 className="text-center text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Why Video Speed Reader
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 120}>
              <article className="h-full rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40">
                <div className="text-3xl" aria-hidden>
                  {f.icon}
                </div>
                <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
                <p className="text-sm font-medium text-primary">
                  {f.subtitle}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {f.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/60">
        <div className="mx-auto max-w-6xl px-4 py-8 text-center text-sm text-muted-foreground sm:px-6">
          © 2026 Video Speed Reader
        </div>
      </footer>
    </div>
  );
}
