"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { createAdminSupabase } from "@/lib/supabase-admin";
import { rateLimit } from "@/lib/rate-limit";

export type ActionState = {
  ok: boolean;
  message?: string;
  fieldErrors?: Record<string, string>;
};

const ATTENDANCE_VALUES = ["HADIR", "TIDAK_HADIR", "RAFGU"];
const WISH_EMOJIS = ["🙏", "❤️", "🥂", "🎉", "✨", "🌿"];

// Form publik demo: maksimal 5 kiriman / 10 menit per IP, dan 25 kiriman / jam
// per undangan (dihitung dari database sehingga tetap berlaku antar instance).
const SUBMIT_LIMIT = 5;
const SUBMIT_WINDOW_MS = 10 * 60_000;
const HOURLY_CAP = 25;

const TOO_MANY_MESSAGE =
  "Terlalu banyak kiriman dalam waktu singkat. Silakan coba lagi beberapa menit lagi.";

async function clientIp(): Promise<string> {
  const store = await headers();
  const forwarded = store.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return store.get("x-real-ip") ?? "unknown";
}

/** Bot biasanya mengisi semua field, termasuk field jebakan yang tersembunyi. */
function honeypotFilled(formData: FormData): boolean {
  return String(formData.get("website") ?? "").trim().length > 0;
}

async function recentCount(
  table: "rsvp" | "wish",
  weddingId: string,
): Promise<number> {
  const supabase = createAdminSupabase();
  if (!supabase) return 0;
  const since = new Date(Date.now() - 60 * 60_000).toISOString();
  const { count } = await supabase
    .from(table)
    .select("id", { count: "exact", head: true })
    .eq("wedding_id", weddingId)
    .gte("created_at", since);
  return count ?? 0;
}

function fieldErrors(
  prev: ActionState,
  errors: Record<string, string>,
): ActionState {
  return { ok: false, fieldErrors: { ...prev.fieldErrors, ...errors } };
}

export async function submitRsvp(
  prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const slug = String(formData.get("slug") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const attendance = String(formData.get("attendance") ?? "");
  const guestCountRaw = Number(formData.get("guestCount") ?? "1");
  const phone = String(formData.get("phone") ?? "").trim();
  const note = String(formData.get("note") ?? "").trim();

  // Jebakan bot: balas seolah berhasil tanpa menyimpan apa pun.
  if (honeypotFilled(formData)) {
    return { ok: true, message: "Konfirmasi kehadiran tersimpan. Terima kasih!" };
  }

  const errors: Record<string, string> = {};
  if (!slug) errors.slug = "Undangan tidak valid.";
  if (!name) errors.name = "Nama wajib diisi.";
  else if (name.length > 100) errors.name = "Nama maksimal 100 karakter.";
  if (!ATTENDANCE_VALUES.includes(attendance))
    errors.attendance = "Pilih konfirmasi kehadiran.";
  const guestCount = Number.isInteger(guestCountRaw) ? guestCountRaw : 1;
  if (guestCount < 1 || guestCount > 20)
    errors.guestCount = "Jumlah tamu antara 1–20.";
  if (phone.length > 20) errors.phone = "Nomor maksimal 20 digit.";
  if (note.length > 500) errors.note = "Catatan maksimal 500 karakter.";
  if (Object.keys(errors).length > 0) return fieldErrors(prev, errors);

  const ip = await clientIp();
  if (!rateLimit(`rsvp:${ip}`, SUBMIT_LIMIT, SUBMIT_WINDOW_MS).ok) {
    return { ok: false, message: TOO_MANY_MESSAGE };
  }

  const supabase = createAdminSupabase();
  if (!supabase) return { ok: false, message: "Database belum dikonfigurasi." };

  const { data: wedding } = await supabase
    .from("wedding")
    .select("id")
    .eq("slug", slug)
    .maybeSingle();
  if (!wedding) return { ok: false, message: "Undangan tidak ditemukan." };

  if ((await recentCount("rsvp", wedding.id)) >= HOURLY_CAP) {
    return { ok: false, message: TOO_MANY_MESSAGE };
  }

  const data = {
    name,
    attendance,
    guest_count: guestCount,
    phone: phone || null,
    note: note || null,
  };

  if (phone) {
    const { data: existing } = await supabase
      .from("rsvp")
      .select("id")
      .eq("wedding_id", wedding.id)
      .eq("phone", phone)
      .maybeSingle();

    if (existing) {
      const { error } = await supabase
        .from("rsvp")
        .update({ ...data, updated_at: new Date().toISOString() })
        .eq("id", existing.id);
      if (error) return { ok: false, message: "Gagal memperbarui konfirmasi." };
      revalidatePath(`/undangan/${slug}`);
      return {
        ok: true,
        message: "Konfirmasi Anda telah diperbarui. Terima kasih!",
      };
    }
  }

  const { error } = await supabase
    .from("rsvp")
    .insert({ wedding_id: wedding.id, ...data });
  if (error) return { ok: false, message: "Gagal menyimpan konfirmasi." };

  revalidatePath(`/undangan/${slug}`);
  return { ok: true, message: "Konfirmasi kehadiran tersimpan. Terima kasih!" };
}

export async function submitWish(
  prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const slug = String(formData.get("slug") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const emoji = String(formData.get("emoji") ?? "").trim();

  // Jebakan bot: balas seolah berhasil tanpa menyimpan apa pun.
  if (honeypotFilled(formData)) {
    return {
      ok: true,
      message: "Ucapan terkirim dan menunggu persetujuan. Terima kasih!",
    };
  }

  const errors: Record<string, string> = {};
  if (!slug) errors.slug = "Undangan tidak valid.";
  if (!name) errors.name = "Nama wajib diisi.";
  else if (name.length > 100) errors.name = "Nama maksimal 100 karakter.";
  if (!message) errors.message = "Ucapan tidak boleh kosong.";
  else if (message.length > 500) errors.message = "Ucapan maksimal 500 karakter.";
  if (emoji && !WISH_EMOJIS.includes(emoji)) errors.emoji = "Emoji tidak valid.";
  if (Object.keys(errors).length > 0) return fieldErrors(prev, errors);

  const ip = await clientIp();
  if (!rateLimit(`wish:${ip}`, SUBMIT_LIMIT, SUBMIT_WINDOW_MS).ok) {
    return { ok: false, message: TOO_MANY_MESSAGE };
  }

  const supabase = createAdminSupabase();
  if (!supabase) return { ok: false, message: "Database belum dikonfigurasi." };

  const { data: wedding } = await supabase
    .from("wedding")
    .select("id")
    .eq("slug", slug)
    .maybeSingle();
  if (!wedding) return { ok: false, message: "Undangan tidak ditemukan." };

  if ((await recentCount("wish", wedding.id)) >= HOURLY_CAP) {
    return { ok: false, message: TOO_MANY_MESSAGE };
  }

  const { error } = await supabase.from("wish").insert({
    wedding_id: wedding.id,
    name,
    message,
    emoji: emoji || null,
    status: "PENDING",
  });
  if (error) return { ok: false, message: "Gagal mengirim ucapan." };

  revalidatePath(`/undangan/${slug}`);
  return {
    ok: true,
    message: "Ucapan terkirim dan menunggu persetujuan. Terima kasih!",
  };
}
