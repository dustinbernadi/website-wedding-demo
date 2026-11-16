import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { createServerSupabase } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Undangan Digital",
};

export const revalidate = 0;

export default async function HomePage() {
  const supabase = createServerSupabase();
  if (!supabase) notFound();

  const { data } = await supabase
    .from("wedding")
    .select("slug")
    .order("event_date", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (!data?.slug) notFound();

  redirect(`/undangan/${data.slug}`);
}
