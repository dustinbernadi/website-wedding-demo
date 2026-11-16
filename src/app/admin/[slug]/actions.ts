"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createAdminSupabase } from "@/lib/supabase-admin";
import { requireAdmin } from "@/lib/auth";
import { deleteSession } from "@/lib/session";
import { ATTENDANCE_VALUES, WISH_STATUS_VALUES } from "@/lib/admin-labels";

export async function logout(): Promise<void> {
  await deleteSession();
  redirect("/admin/login");
}

async function readContext(formData: FormData): Promise<{
  slug: string;
  weddingId: string;
} | null> {
  const slug = String(formData.get("slug") ?? "").trim();
  if (!slug) return null;
  const supabase = createAdminSupabase();
  if (!supabase) return null;
  const { data } = await supabase
    .from("wedding")
    .select("id")
    .eq("slug", slug)
    .maybeSingle();
  return data ? { slug, weddingId: data.id } : null;
}

export async function updateRsvpStatus(formData: FormData): Promise<void> {
  if (!(await requireAdmin())) return;
  const context = await readContext(formData);
  if (!context) return;
  const { slug, weddingId } = context;

  const id = String(formData.get("id") ?? "").trim();
  const attendance = String(formData.get("attendance") ?? "").trim();
  if (!id || !ATTENDANCE_VALUES.includes(attendance as (typeof ATTENDANCE_VALUES)[number])) {
    return;
  }

  const supabase = createAdminSupabase();
  if (!supabase) return;
  await supabase
    .from("rsvp")
    .update({ attendance, updated_at: new Date().toISOString() })
    .eq("id", id)
    .eq("wedding_id", weddingId);
  revalidatePath(`/admin/${slug}`);
}

export async function setWishStatus(formData: FormData): Promise<void> {
  if (!(await requireAdmin())) return;
  const context = await readContext(formData);
  if (!context) return;
  const { slug, weddingId } = context;

  const id = String(formData.get("id") ?? "").trim();
  const status = String(formData.get("status") ?? "").trim();
  if (!id || !WISH_STATUS_VALUES.includes(status as (typeof WISH_STATUS_VALUES)[number])) {
    return;
  }

  const supabase = createAdminSupabase();
  if (!supabase) return;
  await supabase
    .from("wish")
    .update({ status })
    .eq("id", id)
    .eq("wedding_id", weddingId);
  revalidatePath(`/admin/${slug}`);
}

export async function deleteWish(formData: FormData): Promise<void> {
  if (!(await requireAdmin())) return;
  const context = await readContext(formData);
  if (!context) return;
  const { slug, weddingId } = context;

  const id = String(formData.get("id") ?? "").trim();
  if (!id) return;

  const supabase = createAdminSupabase();
  if (!supabase) return;
  await supabase
    .from("wish")
    .delete()
    .eq("id", id)
    .eq("wedding_id", weddingId);
  revalidatePath(`/admin/${slug}`);
}

export async function addGuest(formData: FormData): Promise<void> {
  if (!(await requireAdmin())) return;
  const context = await readContext(formData);
  if (!context) return;
  const { slug, weddingId } = context;

  const name = String(formData.get("name") ?? "").trim();
  const relation = String(formData.get("relation") ?? "").trim();
  if (!name || name.length > 200 || relation.length > 200) return;

  const supabase = createAdminSupabase();
  if (!supabase) return;
  await supabase
    .from("guest")
    .insert({ wedding_id: weddingId, name, relation: relation || null });
  revalidatePath(`/admin/${slug}`);
}

export async function deleteGuest(formData: FormData): Promise<void> {
  if (!(await requireAdmin())) return;
  const context = await readContext(formData);
  if (!context) return;
  const { slug, weddingId } = context;

  const id = String(formData.get("id") ?? "").trim();
  if (!id) return;

  const supabase = createAdminSupabase();
  if (!supabase) return;
  await supabase
    .from("guest")
    .delete()
    .eq("id", id)
    .eq("wedding_id", weddingId);
  revalidatePath(`/admin/${slug}`);
}
