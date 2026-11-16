import type { NextRequest } from "next/server";
import { createAdminSupabase } from "@/lib/supabase-admin";
import { getSession } from "@/lib/session";
import { mapRsvp, mapRows } from "@/lib/mappers";
import { ATTENDANCE_LABELS, csvEscape } from "@/lib/admin-labels";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const session = await getSession();
  if (!session) {
    return new Response("Tidak terautentikasi.", { status: 401 });
  }

  const { slug } = await params;
  const supabase = createAdminSupabase();
  if (!supabase) {
    return new Response("Database belum dikonfigurasi.", { status: 500 });
  }

  const { data: wedding } = await supabase
    .from("wedding")
    .select("id")
    .eq("slug", slug)
    .maybeSingle();
  if (!wedding) {
    return new Response("Undangan tidak ditemukan.", { status: 404 });
  }

  const { data: rsvpRows } = await supabase
    .from("rsvp")
    .select("*")
    .eq("wedding_id", wedding.id)
    .order("created_at", { ascending: false });

  const rsvps = mapRows(rsvpRows, mapRsvp);

  const header = ["Nama", "Kehadiran", "Jumlah Tamu", "No. HP", "Catatan", "Dibuat", "Diperbarui"];
  const rows = rsvps.map((item) => [
    item.name,
    ATTENDANCE_LABELS[item.attendance] ?? item.attendance,
    String(item.guestCount),
    item.phone ?? "",
    item.note ?? "",
    item.createdAt.toISOString(),
    item.updatedAt.toISOString(),
  ]);

  const csv = [header, ...rows]
    .map((row) => row.map(csvEscape).join(","))
    .join("\r\n");

  return new Response(`\uFEFF${csv}`, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="rsvp-${slug}.csv"`,
    },
  });
}
