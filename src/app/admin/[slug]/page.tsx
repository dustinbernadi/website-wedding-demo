import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createAdminSupabase } from "@/lib/supabase-admin";
import { verifySession } from "@/lib/auth";
import { formatRelative, formatShortDate } from "@/lib/format";
import {
  mapWedding,
  mapGuest,
  mapRsvp,
  mapWish,
  mapRows,
} from "@/lib/mappers";
import {
  ATTENDANCE_LABELS,
  ATTENDANCE_VALUES,
  WISH_STATUS_LABELS,
  WISH_STATUS_VALUES,
} from "@/lib/admin-labels";
import {
  addGuest,
  deleteWish,
  logout,
  setWishStatus,
  updateRsvpStatus,
} from "@/app/admin/[slug]/actions";
import GuestLinkList from "@/components/admin/GuestLinkList";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ rsvp?: string; wishes?: string; q?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = createAdminSupabase();
  let weddingTitle = "Dashboard";
  if (supabase) {
    const { data } = await supabase
      .from("wedding")
      .select("groom_name, bride_name")
      .eq("slug", slug)
      .maybeSingle();
    if (data) weddingTitle = `${data.groom_name} & ${data.bride_name}`;
  }
  return { title: weddingTitle };
}

const badgeTones: Record<string, string> = {
  green: "bg-emerald-100 text-emerald-800",
  red: "bg-red-100 text-red-700",
  amber: "bg-amber-100 text-amber-800",
  stone: "bg-stone-100 text-stone-600",
};

function Badge({ tone, children }: { tone: keyof typeof badgeTones; children: React.ReactNode }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${badgeTones[tone]}`}
    >
      {children}
    </span>
  );
}

function attendanceTone(value: string): keyof typeof badgeTones {
  if (value === "HADIR") return "green";
  if (value === "TIDAK_HADIR") return "red";
  return "amber";
}

function wishStatusTone(value: string): keyof typeof badgeTones {
  if (value === "APPROVED") return "green";
  if (value === "REJECTED") return "red";
  return "amber";
}

function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string | number;
  hint?: string;
}) {
  return (
    <div className="rounded-lg border border-stone-200 bg-white p-5">
      <p className="text-xs tracking-wide text-stone-500 uppercase">{label}</p>
      <p className="mt-2 font-display text-3xl font-medium italic text-stone-800">{value}</p>
      {hint && <p className="mt-1 text-sm text-stone-500">{hint}</p>}
    </div>
  );
}

const inputClass =
  "border border-stone-300 bg-white px-3 py-1.5 text-sm text-stone-800 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600";

const buttonClass =
  "border px-3 py-1.5 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2";

export default async function AdminDashboardPage({ params, searchParams }: Props) {
  const { slug } = await params;
  await verifySession();
  const { rsvp, wishes, q } = await searchParams;

  const supabase = createAdminSupabase();
  if (!supabase) notFound();

  const { data: weddingRow, error: weddingError } = await supabase
    .from("wedding")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (weddingError || !weddingRow) notFound();

  const wedding = mapWedding(weddingRow);

  const [{ data: guestRows }, { data: rsvpRows }, { data: wishRows }] = await Promise.all([
    supabase
      .from("guest")
      .select("*")
      .eq("wedding_id", wedding.id)
      .order("created_at", { ascending: true }),
    supabase
      .from("rsvp")
      .select("*")
      .eq("wedding_id", wedding.id)
      .order("created_at", { ascending: false }),
    supabase
      .from("wish")
      .select("*")
      .eq("wedding_id", wedding.id)
      .order("created_at", { ascending: false }),
  ]);

  const guests = mapRows(guestRows, mapGuest);
  const rsvps = mapRows(rsvpRows, mapRsvp);
  const wishesAll = mapRows(wishRows, mapWish);

  const rsvpFilter = rsvp && ATTENDANCE_VALUES.includes(rsvp as (typeof ATTENDANCE_VALUES)[number])
    ? rsvp
    : undefined;
  const wishFilter =
    wishes && WISH_STATUS_VALUES.includes(wishes as (typeof WISH_STATUS_VALUES)[number])
      ? wishes
      : undefined;
  const query = q?.trim() ?? "";

  const filteredRsvps = rsvpFilter ? rsvps.filter((item) => item.attendance === rsvpFilter) : rsvps;

  const filteredWishes = wishesAll.filter((item) => {
    if (wishFilter && item.status !== wishFilter) return false;
    if (query && !item.name.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  const hadir = rsvps.filter((item) => item.attendance === "HADIR");
  const tidakHadir = rsvps.filter((item) => item.attendance === "TIDAK_HADIR");
  const ragu = rsvps.filter((item) => item.attendance === "RAFGU");
  const hadirPax = hadir.reduce((sum, item) => sum + item.guestCount, 0);

  const rsvpNames = new Set(rsvps.map((item) => item.name.toLowerCase()));
  const belumKonfirmasi = guests.filter(
    (guest) => !rsvpNames.has(guest.name.toLowerCase()),
  ).length;

  const wishStatusCounts = WISH_STATUS_VALUES.reduce<Record<string, number>>((acc, status) => {
    acc[status] = wishesAll.filter((item) => item.status === status).length;
    return acc;
  }, {});

  return (
    <main className="min-h-full">
      <header className="bg-emerald-950 text-emerald-50">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-6">
          <div className="flex items-center gap-4">
            <img
              src="/logo/logo.png"
              alt="Logo Undangan Digital"
              width={500}
              height={500}
              className="w-14 shrink-0 object-contain sm:w-16"
            />
            <div>
              <p className="text-[11px] tracking-[0.35em] text-emerald-200/60 uppercase">
                Panel Admin · Undangan Digital
              </p>
              <h1 className="mt-1 font-display text-3xl font-medium italic">
                {wedding.groomName} &amp; {wedding.brideName}
              </h1>
              <p className="mt-1 text-sm text-emerald-100/70">
                {formatShortDate(wedding.eventDate)} · /undangan/{slug}
              </p>
            </div>
          </div>
          <nav className="flex items-center gap-3">
            <Link
              href={`/undangan/${slug}`}
              target="_blank"
              className={`${buttonClass} border-emerald-300/40 text-emerald-100 hover:bg-emerald-900`}
            >
              Buka Undangan ↗
            </Link>
            <form action={logout}>
              <button
                type="submit"
                className={`${buttonClass} border-red-300/40 text-red-100 hover:bg-red-900/40`}
              >
                Keluar
              </button>
            </form>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-6xl space-y-14 px-6 py-10">
        <section>
          <h2 className="mb-4 font-display text-2xl font-medium italic text-stone-800">
            Ringkasan
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <StatCard label="Total Tamu" value={guests.length} />
            <StatCard label="Konfirmasi Diterima" value={rsvps.length} />
            <StatCard label="Hadir" value={hadir.length} hint={`${hadirPax} tamu hadir`} />
            <StatCard label="Tidak Hadir" value={tidakHadir.length} />
            <StatCard label="Ragu-ragu" value={ragu.length} />
            <StatCard label="Belum Konfirmasi" value={belumKonfirmasi} hint="dari daftar tamu" />
          </div>
        </section>

        <section>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-display text-2xl font-medium italic text-stone-800">
              Rekap RSVP
            </h2>
            <div className="flex flex-wrap items-center gap-3">
              <form method="get" className="flex items-center gap-2">
                <select
                  name="rsvp"
                  defaultValue={rsvpFilter ?? ""}
                  className={inputClass}
                  aria-label="Filter status kehadiran"
                >
                  <option value="">Semua status</option>
                  {ATTENDANCE_VALUES.map((value) => (
                    <option key={value} value={value}>
                      {ATTENDANCE_LABELS[value]}
                    </option>
                  ))}
                </select>
                <button
                  type="submit"
                  className={`${buttonClass} border-stone-300 text-stone-700 hover:bg-stone-200`}
                >
                  Filter
                </button>
              </form>
              <Link
                href={`/admin/${slug}/rsvp.csv`}
                className={`${buttonClass} border-emerald-700 bg-emerald-800 text-emerald-50 hover:bg-emerald-900`}
              >
                Export CSV
              </Link>
            </div>
          </div>

          {filteredRsvps.length === 0 ? (
            <p className="rounded-lg border border-dashed border-stone-300 bg-white px-6 py-12 text-center text-sm text-stone-500">
              Belum ada konfirmasi kehadiran.
            </p>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-stone-200 bg-white">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead>
                  <tr className="border-b border-stone-200 bg-stone-50 text-xs text-stone-500 uppercase">
                    <th className="px-4 py-3 font-medium">Nama</th>
                    <th className="px-4 py-3 font-medium">Kehadiran</th>
                    <th className="px-4 py-3 font-medium">Jml. Tamu</th>
                    <th className="px-4 py-3 font-medium">No. HP</th>
                    <th className="px-4 py-3 font-medium">Catatan</th>
                    <th className="px-4 py-3 font-medium">Waktu</th>
                    <th className="px-4 py-3 font-medium">Ubah Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRsvps.map((item) => (
                    <tr key={item.id} className="border-b border-stone-100 last:border-0">
                      <td className="px-4 py-3 font-medium text-stone-800">{item.name}</td>
                      <td className="px-4 py-3">
                        <Badge tone={attendanceTone(item.attendance)}>
                          {ATTENDANCE_LABELS[item.attendance] ?? item.attendance}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-stone-700">{item.guestCount}</td>
                      <td className="px-4 py-3 text-stone-600">{item.phone ?? "—"}</td>
                      <td className="max-w-[200px] truncate px-4 py-3 text-stone-600">
                        {item.note ?? "—"}
                      </td>
                      <td className="px-4 py-3 text-stone-500">{formatRelative(item.createdAt)}</td>
                      <td className="px-4 py-3">
                        <form action={updateRsvpStatus} className="flex items-center gap-2">
                          <input type="hidden" name="slug" value={slug} />
                          <input type="hidden" name="id" value={item.id} />
                          <select
                            name="attendance"
                            defaultValue={item.attendance}
                            className={inputClass}
                            aria-label={`Status kehadiran ${item.name}`}
                          >
                            {ATTENDANCE_VALUES.map((value) => (
                              <option key={value} value={value}>
                                {ATTENDANCE_LABELS[value]}
                              </option>
                            ))}
                          </select>
                          <button
                            type="submit"
                            className={`${buttonClass} border-emerald-700 text-emerald-700 hover:bg-emerald-50`}
                          >
                            Simpan
                          </button>
                        </form>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section>
          <form
            action={addGuest}
            className="mb-4 flex flex-wrap items-end gap-3 rounded-lg border border-stone-200 bg-white p-3"
          >
            <input type="hidden" name="slug" value={slug} />
            <div className="min-w-[180px] flex-1">
              <label
                htmlFor="guest-name"
                className="mb-1 block text-xs font-medium text-stone-600"
              >
                Nama tamu
              </label>
              <input
                id="guest-name"
                name="name"
                required
                maxLength={200}
                placeholder="cth. Budi Santoso"
                className={inputClass}
              />
            </div>
            <div className="min-w-[160px] flex-1">
              <label
                htmlFor="guest-relation"
                className="mb-1 block text-xs font-medium text-stone-600"
              >
                Relasi (opsional)
              </label>
              <input
                id="guest-relation"
                name="relation"
                maxLength={200}
                placeholder="cth. Teman kantor"
                className={inputClass}
              />
            </div>
            <button
              type="submit"
              className={`${buttonClass} border-emerald-700 bg-emerald-800 text-emerald-50 hover:bg-emerald-900`}
            >
              Tambah Tamu
            </button>
          </form>
          <GuestLinkList slug={slug} guests={guests} />
        </section>

        <section>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-display text-2xl font-medium italic text-stone-800">
              Ucapan &amp; Doa
            </h2>
            <div className="flex items-center gap-3">
              <span className="text-sm text-stone-500">
                {wishesAll.length} total ·{" "}
                <span className="text-amber-700">{wishStatusCounts.PENDING} menunggu</span>
              </span>
            </div>
          </div>

          <form
            method="get"
            className="mb-6 flex flex-wrap items-center gap-2 rounded-lg border border-stone-200 bg-white p-3"
          >
            <select
              name="wishes"
              defaultValue={wishFilter ?? ""}
              className={inputClass}
              aria-label="Filter status ucapan"
            >
              <option value="">Semua status</option>
              {WISH_STATUS_VALUES.map((value) => (
                <option key={value} value={value}>
                  {WISH_STATUS_LABELS[value]}
                </option>
              ))}
            </select>
            <input
              type="search"
              name="q"
              defaultValue={query}
              placeholder="Cari nama..."
              className={`${inputClass} min-w-[200px]`}
            />
            <button
              type="submit"
              className={`${buttonClass} border-stone-300 text-stone-700 hover:bg-stone-200`}
            >
              Terapkan
            </button>
            {(wishFilter || query) && (
              <Link
                href={`/admin/${slug}`}
                className={`${buttonClass} border-stone-300 text-stone-500 hover:bg-stone-200`}
              >
                Reset
              </Link>
            )}
          </form>

          {filteredWishes.length === 0 ? (
            <p className="rounded-lg border border-dashed border-stone-300 bg-white px-6 py-12 text-center text-sm text-stone-500">
              Tidak ada ucapan yang cocok.
            </p>
          ) : (
            <ul className="space-y-3">
              {filteredWishes.map((wish) => (
                <li
                  key={wish.id}
                  className="rounded-lg border border-stone-200 bg-white px-5 py-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="font-display text-lg italic text-stone-800">
                      {wish.emoji ? `${wish.emoji} ` : ""}
                      {wish.name}
                      <span className="ml-3 text-sm font-normal not-italic text-stone-400">
                        {formatRelative(wish.createdAt)}
                      </span>
                    </p>
                    <Badge tone={wishStatusTone(wish.status)}>
                      {WISH_STATUS_LABELS[wish.status] ?? wish.status}
                    </Badge>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-stone-700">{wish.message}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {wish.status !== "APPROVED" && (
                      <form action={setWishStatus}>
                        <input type="hidden" name="slug" value={slug} />
                        <input type="hidden" name="id" value={wish.id} />
                        <input type="hidden" name="status" value="APPROVED" />
                        <button
                          type="submit"
                          className={`${buttonClass} border-emerald-700 text-emerald-700 hover:bg-emerald-50`}
                        >
                          Setujui
                        </button>
                      </form>
                    )}
                    {wish.status !== "REJECTED" && (
                      <form action={setWishStatus}>
                        <input type="hidden" name="slug" value={slug} />
                        <input type="hidden" name="id" value={wish.id} />
                        <input type="hidden" name="status" value="REJECTED" />
                        <button
                          type="submit"
                          className={`${buttonClass} border-amber-600 text-amber-700 hover:bg-amber-50`}
                        >
                          Tolak
                        </button>
                      </form>
                    )}
                    <form action={deleteWish}>
                      <input type="hidden" name="slug" value={slug} />
                      <input type="hidden" name="id" value={wish.id} />
                      <button
                        type="submit"
                        className={`${buttonClass} border-red-600 text-red-700 hover:bg-red-50`}
                      >
                        Hapus
                      </button>
                    </form>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
