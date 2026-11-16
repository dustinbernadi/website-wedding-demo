"use client";

import { useSyncExternalStore } from "react";

/**
 * Membaca nama tamu dari query `?to=Nama` di sisi klien. Dengan begitu halaman
 * undangan tetap bisa dirender statis tanpa bergantung pada searchParams server.
 */
function subscribe(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  return () => window.removeEventListener("popstate", onChange);
}

function getSnapshot(): string {
  const value = new URLSearchParams(window.location.search).get("to");
  return value?.trim() || "";
}

function getServerSnapshot(): string {
  return "";
}

export function useGuestName(): string | null {
  const name = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return name || null;
}
