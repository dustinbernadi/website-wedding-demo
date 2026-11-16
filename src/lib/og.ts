/**
 * Banner Open Graph untuk social link preview (1200x630).
 *
 * PENTING: naikkan nomor versi di `path` (lalu regenerate gambarnya dengan
 * scripts/generate-og-banner.ps1) setiap kali isi banner berubah.
 * WhatsApp/Instagram/X meng-cache gambar OG berdasarkan URL, jadi selama URL-nya
 * tetap sama, preview versi lama akan tetap tampil sampai cache-nya expired —
 * walaupun file gambarnya sudah diganti di server.
 */
export const OG_BANNER = {
  path: "/og/banner-v3.png",
  width: 1200,
  height: 630,
} as const;
