import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { Download } from "lucide-react";
import { createClient as createServerSupabaseClient } from "@/lib/supabase/server";
import SignOutButton from "../_components/SignOutButton";
import UploadForm from "./_components/UploadForm";

export const metadata: Metadata = {
  title: "Upload — Video Speed Reader",
};

type JobRow = {
  id: string;
  created_at: string;
  video_source_url: string;
  status: "pending" | "downloading" | "transcribe" | "done";
};

function statusClasses(status: JobRow["status"]): string {
  switch (status) {
    case "done":
      return "bg-emerald-500/20 text-emerald-400";
    case "transcribe":
      return "bg-primary/20 text-primary";
    case "downloading":
    case "pending":
    default:
      return "bg-secondary text-secondary-foreground";
  }
}

function truncate(url: string, max = 50): string {
  if (url.length <= max) return url;
  return url.slice(0, max - 1) + "…";
}

export default async function UploadPage() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/sign-in");

  const { data: jobs } = await supabase
    .from("jobs")
    .select("id, created_at, video_source_url, status")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(20);

  const jobRows = (jobs ?? []) as JobRow[];

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
                aria-current="page"
                className="text-sm font-semibold text-foreground underline underline-offset-4"
              >
                Upload
              </Link>
            </nav>
          </div>
          <SignOutButton />
        </div>
      </header>

      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-10 sm:px-6">
        <h1 className="text-2xl font-semibold tracking-tight">Your transcriptions</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          The 20 most recent jobs submitted from this account.
        </p>

        <section className="mt-6 animate-fade-in-up rounded-2xl border border-border bg-card glow-card">
          {jobRows.length === 0 ? (
            <div className="px-6 py-12 text-center text-sm text-muted-foreground">
              No transcriptions yet. Submit your first video below.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
                    <th className="px-4 py-3 font-medium">Created</th>
                    <th className="px-4 py-3 font-medium">URL</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium">Transcript</th>
                  </tr>
                </thead>
                <tbody>
                  {jobRows.map((job) => (
                    <tr
                      key={job.id}
                      className="border-b border-border/40 last:border-0"
                    >
                      <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">
                        {formatDistanceToNow(new Date(job.created_at), {
                          addSuffix: true,
                        })}
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-mono text-xs">
                          {truncate(job.video_source_url)}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${statusClasses(job.status)}`}
                        >
                          {job.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {job.status === "done" ? (
                          <a
                            href={`/api/jobs/${job.id}/transcript`}
                            download={`transcript-${job.id.slice(0, 8)}.txt`}
                            className="inline-flex items-center gap-1 text-primary hover:underline"
                          >
                            .txt <Download className="h-3 w-3" />
                          </a>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section className="mt-8 animate-fade-in-up rounded-2xl border border-border bg-card p-6 glow-card sm:p-8">
          <h2 className="text-lg font-semibold">Submit a new video</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Paste a direct media URL. The worker will transcribe it in the background.
          </p>
          <div className="mt-6">
            <UploadForm />
          </div>
        </section>
      </main>
    </div>
  );
}
