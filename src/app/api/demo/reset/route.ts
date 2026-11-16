import { NextResponse, type NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { createClient } from "@supabase/supabase-js";
import { DEMO_SLUG, seedDemo } from "@/lib/demo-seed";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

/**
 * Reset data demo ke kondisi awal. Dipanggil oleh Vercel Cron setiap hari
 * (lihat vercel.json) dengan header `Authorization: Bearer <CRON_SECRET>`.
 *
 * Manual: GET /api/demo/reset?secret=<CRON_SECRET>
 */
export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: "CRON_SECRET belum dikonfigurasi." },
      { status: 503 },
    );
  }

  const authorization = request.headers.get("authorization");
  const querySecret = request.nextUrl.searchParams.get("secret");
  const authorized =
    authorization === `Bearer ${secret}` || querySecret === secret;

  if (!authorized) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) {
    return NextResponse.json(
      { error: "Supabase belum dikonfigurasi." },
      { status: 503 },
    );
  }

  const supabase = createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  try {
    const result = await seedDemo(supabase);
    revalidatePath(`/undangan/${DEMO_SLUG}`);
    revalidatePath("/");

    return NextResponse.json({
      ok: true,
      slug: DEMO_SLUG,
      gallery: result.gallery,
      loveStories: result.loveStories,
      envelopeAccounts: result.envelopeAccounts,
      guests: result.guests,
      rsvps: result.rsvps,
      wishes: result.wishes,
      resetAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[demo/reset]", error);
    return NextResponse.json(
      { error: "Gagal mereset data demo." },
      { status: 500 },
    );
  }
}
