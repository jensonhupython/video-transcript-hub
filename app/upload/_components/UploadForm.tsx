"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

type Language = "zh" | "en" | "ja";

export default function UploadForm() {
  const router = useRouter();
  const [videoUrl, setVideoUrl] = useState("");
  const [topic, setTopic] = useState("");
  const [language, setLanguage] = useState<Language>("zh");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          video_source_url: videoUrl,
          topic: topic || null,
          language,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error ?? "Failed to submit job.");
      }
      setVideoUrl("");
      setTopic("");
      setLanguage("zh");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <div className="flex items-baseline justify-between gap-4">
          <label htmlFor="video_source_url" className="text-sm font-medium">
            Video URL
          </label>
          <p className="text-xs text-muted-foreground">
            YouTube URLs are not supported in M1.
          </p>
        </div>
        <input
          id="video_source_url"
          type="url"
          required
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          placeholder="Direct mp4 / mp3 URL (e.g. CloudFront, Vimeo, Internet Archive)"
          className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/30"
        />
      </div>

      <div>
        <label htmlFor="topic" className="text-sm font-medium">
          Topic <span className="text-xs font-normal text-muted-foreground">(optional)</span>
        </label>
        <input
          id="topic"
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g. Tech podcast — useful context for the model"
          className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/30"
        />
      </div>

      <div>
        <label htmlFor="language" className="text-sm font-medium">
          Language
        </label>
        <select
          id="language"
          value={language}
          onChange={(e) => setLanguage(e.target.value as Language)}
          className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/30"
        >
          <option value="zh">中文</option>
          <option value="en">English</option>
          <option value="ja">日本語</option>
        </select>
      </div>

      {error && (
        <p className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
      >
        {loading ? "Please wait…" : "Transcribe"}
      </button>
    </form>
  );
}
