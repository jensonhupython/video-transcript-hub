import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient as createServerSupabaseClient } from "@/lib/supabase/server";
import AppShell from "../_components/AppShell";

export const metadata: Metadata = {
  title: "Dashboard — Video Speed Reader",
};

export default async function AppPage() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/sign-in");

  return <AppShell email={user.email ?? ""} />;
}
