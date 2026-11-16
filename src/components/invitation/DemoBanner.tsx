"use client";

import { useState } from "react";

/**
 * Penanda kecil di bagian atas undangan bahwa ini adalah demo portofolio.
 * Bisa ditutup dan tidak mengganggu isi undangan saat di-screenshot.
 */
export default function DemoBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] mx-auto w-full max-w-[430px] px-2 pt-2">
      <div className="pointer-events-auto flex items-center justify-between gap-2 border border-[#E5C158]/40 bg-[#1e1b16]/85 px-3 py-1.5 text-[9px] tracking-[0.22em] text-[#E5C158] uppercase backdrop-blur-sm">
        <span className="truncate">Demo Portofolio · Data Fiktif</span>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Tutup pemberitahuan demo"
          className="-mr-1 shrink-0 px-1 text-base leading-none text-[#E5C158]/80 transition-colors hover:text-[#E5C158] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E5C158]"
        >
          ×
        </button>
      </div>
    </div>
  );
}
