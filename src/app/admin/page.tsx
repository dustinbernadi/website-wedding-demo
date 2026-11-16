import { redirect } from "next/navigation";
import { createAdminSupabase } from "@/lib/supabase-admin";
import { verifySession } from "@/lib/auth";

export default async function AdminIndexPage() {
  await verifySession();

  const supabase = createAdminSupabase();
  let slug: string | null = null;

  if (supabase) {
    const { data } = await supabase
      .from("wedding")
      .select("slug")
      .order("created_at", { ascending: true })
      .limit(1)
      .maybeSingle();
    slug = data?.slug ?? null;
  }

  if (!slug) {
    return (
      <main className="flex flex-1 items-center justify-center px-6 py-16">
        <p className="font-display text-2xl italic text-stone-600">
          Belum ada undangan. Jalankan{" "}
          <code className="font-mono text-base not-italic">npm run db:seed</code>.
        </p>
      </main>
    );
  }

  redirect(`/admin/${slug}`);
}
