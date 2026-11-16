"use client";

import { useState } from "react";
import { deleteGuest } from "@/app/admin/[slug]/actions";

type GuestRow = {
  id: string;
  name: string;
  relation: string | null;
};

type Props = {
  slug: string;
  guests: GuestRow[];
};

const buttonClass =
  "border px-3 py-1.5 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2";

export default function GuestLinkList({ slug, guests }: Props) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  function buildLink(name: string): string {
    return `${window.location.origin}/undangan/${slug}?to=${encodeURIComponent(name)}`;
  }

  function flash(key: string) {
    window.setTimeout(() => {
      setCopiedId((current) => (current === key ? null : current));
      setCopiedAll(false);
    }, 1800);
  }

  async function copyLink(guest: GuestRow) {
    try {
      await navigator.clipboard.writeText(buildLink(guest.name));
      setCopiedId(guest.id);
      flash(guest.id);
    } catch {
      setCopiedId(null);
    }
  }

  async function copyAll() {
    const lines = guests.map((guest) => `${guest.name} — ${buildLink(guest.name)}`);
    try {
      await navigator.clipboard.writeText(lines.join("\n"));
      setCopiedAll(true);
      flash("all");
    } catch {
      setCopiedAll(false);
    }
  }

  return (
    <section>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-display text-2xl font-medium italic text-stone-800">
          Tamu &amp; Link Undangan
        </h2>
        {guests.length > 0 && (
          <button
            type="button"
            onClick={copyAll}
            className={`${buttonClass} border-emerald-700 bg-emerald-800 text-emerald-50 hover:bg-emerald-900`}
          >
            {copiedAll ? "Disalin!" : "Salin Semua Link"}
          </button>
        )}
      </div>

      {guests.length === 0 ? (
        <p className="rounded-lg border border-dashed border-stone-300 bg-white px-6 py-12 text-center text-sm text-stone-500">
          Belum ada daftar tamu.
        </p>
      ) : (
        <ul className="divide-y divide-stone-100 rounded-lg border border-stone-200 bg-white">
          {guests.map((guest) => (
            <li
              key={guest.id}
              className="flex flex-wrap items-center justify-between gap-3 px-4 py-3"
            >
              <div className="min-w-0">
                <p className="font-medium text-stone-800">{guest.name}</p>
                {guest.relation && (
                  <p className="text-xs text-stone-500">{guest.relation}</p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => copyLink(guest)}
                  className={`${buttonClass} border-emerald-700 text-emerald-700 hover:bg-emerald-50`}
                >
                  {copiedId === guest.id ? "Disalin!" : "Salin Link"}
                </button>
                <form action={deleteGuest}>
                  <input type="hidden" name="slug" value={slug} />
                  <input type="hidden" name="id" value={guest.id} />
                  <button
                    type="submit"
                    className={`${buttonClass} border-rose-200 text-rose-700 hover:bg-rose-50`}
                    aria-label={`Hapus ${guest.name}`}
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
  );
}