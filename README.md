# Undangan Digital — Demo Portofolio (Statis)

Demo portofolio undangan pernikahan digital: satu halaman interaktif berbahasa Indonesia
yang dibuka tamu lewat tautan, lengkap dengan konfirmasi kehadiran dan buku ucapan.

> **Semua data pada demo ini fiktif.** Pasangan, venue, nomor rekening, tamu, RSVP, dan
> ucapan hanyalah contoh. Foto yang dipakai adalah stok foto gratis, bukan foto orang
> sungguhan yang terkait dengan data demo. Panel admin tidak ditampilkan ke publik.

- **Pasangan demo:** Raka & Nadia
- **Tanggal:** Sabtu, 12 Juni 2027
- **Slug undangan:** `/undangan/demo-raka-nadia`
- **Tema:** `vintage-gold`

Demo ini **tidak memakai database**. Seluruh konten undangan dibaca dari
`src/lib/demo-data.ts`, sehingga halaman bisa dirender statis dan tidak memerlukan
Supabase atau layanan backend lain.

## Fitur

- Halaman pembuka (gate) dengan nama tamu dari query `?to=Nama`
- Hero, ayat, profil kedua mempelai, dan love story
- Hitung mundur menuju hari acara
- Detail acara + tombol simpan ke kalender
- Galeri foto dengan lightbox
- Peta lokasi acara
- Amplop digital (rekening bank / dompet digital) dengan salin nomor
- Form konfirmasi kehadiran (simulasi di browser)
- Buku ucapan (simulasi di browser)
- Live streaming opsional
- Musik latar opsional (diisi lewat `musicUrl` pada data undangan)
- 7 pilihan tema warna
- Layout mobile-first yang juga nyaman di desktop
- Pratinjau panel admin read-only (disembunyikan dari publik)

## Teknologi

| Lapisan | Teknologi |
| --- | --- |
| Framework | Next.js 16 (App Router, Proxy) |
| UI | React 19, Tailwind CSS v4, Motion |
| Data | Data statis di `src/lib/demo-data.ts` |
| Deployment | Vercel (atau hosting Next.js lainnya) |
| Bahasa | TypeScript |

## Menjalankan Secara Lokal

Prasyarat: Node.js 20+ dan npm.

1. Install dependency:

   ```bash
   npm install
   ```

2. Jalankan aplikasi:

   ```bash
   npm run dev
   ```

   Buka <http://localhost:3000>. Tambahkan `?to=Nama%20Tamu` untuk mencoba sapaan tamu:

   <http://localhost:3000/undangan/demo-raka-nadia?to=Budi%20Santoso>

Tidak ada langkah seed atau konfigurasi database.

## Form Publik

Karena situs ini statis:

- **RSVP** memvalidasi isian lalu menampilkan pesan sukses. Data tidak dikirim ke server.
- **Ucapan** ditambahkan ke daftar di halaman selama sesi berlangsung, lalu hilang saat
  halaman dimuat ulang.

Perilaku ini disengaja agar demo tetap bisa dicoba tanpa backend. Jika nanti ingin
menyimpan data sungguhan, form dapat dihubungkan kembali ke API/database.

## Panel Admin (Pratinjau)

Panel admin disertakan sebagai **pratinjau read-only** untuk keperluan screenshot
portofolio. Datanya berasal dari data demo yang sama; tombol perubahan dinonaktifkan.

Panel ini **disembunyikan dari publik** oleh `src/proxy.ts`. Selama
`DEMO_ADMIN_HIDDEN` bukan `false`, semua request ke `/admin` dan turunannya dijawab
sebagai `404` — termasuk halaman login.

Untuk membukanya secara lokal:

1. Salin `.env.example` menjadi `.env`.
2. Isi `ADMIN_PASSWORD` dan `SESSION_SECRET` (string acak yang panjang).
3. Set `DEMO_ADMIN_HIDDEN="false"`.
4. Restart `npm run dev`, lalu buka `/admin`.

Pada deployment demo publik, biarkan `DEMO_ADMIN_HIDDEN="true"` (atau kosong) agar panel
tetap tidak terlihat.

## Variabel Lingkungan

| Variabel | Wajib | Keterangan |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Ya (deploy) | URL publik, dipakai untuk metadata dan Open Graph |
| `SESSION_SECRET` | Hanya untuk admin | Secret cookie sesi admin |
| `ADMIN_PASSWORD` | Hanya untuk admin | Password login panel admin |
| `DEMO_ADMIN_HIDDEN` | Tidak | Default `true`; set `false` untuk membuka `/admin` secara lokal |

## Deployment

1. Buat project Vercel baru dari repository ini (terpisah dari project undangan asli).
2. Tambahkan `NEXT_PUBLIC_SITE_URL` sesuai domain yang akan dipakai.
3. Biarkan `DEMO_ADMIN_HIDDEN="true"` dan jangan isi kredensial admin di deployment publik.
4. Deploy. Halaman undangan akan dirender statis saat build.

## Struktur Proyek

```
src/
  app/
    undangan/[slug]/     # halaman undangan (dirender dari data statis)
    admin/               # pratinjau admin read-only (disembunyikan oleh proxy)
  components/invitation/ # komponen UI undangan
  components/admin/      # komponen UI admin
  lib/demo-data.ts       # seluruh data demo (fiktif)
  lib/use-guest-name.ts  # membaca ?to=Nama di sisi klien
  proxy.ts               # menyembunyikan /admin saat DEMO_ADMIN_HIDDEN aktif
scripts/
  generate-logo.ps1      # membuat monogram demo
  generate-og-banner.ps1 # membuat banner Open Graph demo
```

## Kredit & Lisensi Aset

Sumber foto stok, font, dan catatan lisensi ada di [CREDITS.md](./CREDITS.md).
Seluruh foto hanya ilustrasi dan tidak menggambarkan orang yang disebut dalam data demo.
