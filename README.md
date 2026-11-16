# Undangan Digital — Demo Portofolio

Demo portofolio undangan pernikahan digital: satu halaman interaktif berbahasa Indonesia
yang dibuka tamu lewat tautan, lengkap dengan konfirmasi kehadiran dan buku ucapan.

> **Semua data pada demo ini fiktif.** Pasangan, venue, nomor rekening, tamu, RSVP, dan
> ucapan hanyalah contoh. Foto yang dipakai adalah stok foto gratis, bukan foto orang
> sungguhan yang terkait dengan data demo. Panel admin tidak ditampilkan ke publik.

- **Pasangan demo:** Raka & Nadia
- **Tanggal:** Sabtu, 12 Juni 2027
- **Slug undangan:** `/undangan/demo-raka-nadia`
- **Tema:** `vintage-gold`

## Fitur

- Halaman pembuka (gate) dengan nama tamu dari query `?to=Nama`
- Hero, ayat, profil kedua mempelai, dan love story
- Hitung mundur menuju hari acara
- Detail acara + tombol simpan ke kalender
- Galeri foto dengan lightbox
- Peta lokasi acara
- Amplop digital (rekening bank / dompet digital) dengan salin nomor
- Form konfirmasi kehadiran (RSVP)
- Buku ucapan dengan moderasi admin
- Live streaming opsional
- Musik latar opsional (diisi lewat `music_url` pada data undangan)
- 7 pilihan tema warna
- Layout mobile-first yang juga nyaman di desktop

## Teknologi

| Lapisan | Teknologi |
| --- | --- |
| Framework | Next.js 16 (App Router, Server Actions, Proxy) |
| UI | React 19, Tailwind CSS v4, Motion |
| Database | Supabase (PostgreSQL + Row Level Security) |
| Deployment | Vercel (termasuk Cron Job) |
| Bahasa | TypeScript |

## Menjalankan Secara Lokal

Prasyarat: Node.js 20+ dan npm.

1. Install dependency:

   ```bash
   npm install
   ```

2. Buat project Supabase **baru dan terpisah** untuk demo ini, lalu jalankan
   `supabase/schema.sql` di SQL Editor project tersebut.

3. Salin `.env.example` menjadi `.env` dan isi nilainya:

   ```bash
   cp .env.example .env
   ```

4. Isi data demo:

   ```bash
   npm run db:seed
   ```

   Seed bersifat idempotent: menjalankannya lagi akan mengembalikan data demo ke
   kondisi awal tanpa menyentuh undangan lain di database yang sama.

5. Jalankan aplikasi:

   ```bash
   npm run dev
   ```

   Buka <http://localhost:3000/undangan/demo-raka-nadia>.
   Tambahkan `?to=Nama%20Tamu` untuk mencoba sapaan tamu.

## Variabel Lingkungan

| Variabel | Wajib | Keterangan |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Ya | URL project Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Ya | Anon key (hanya baca konten publik via RLS) |
| `SUPABASE_SERVICE_ROLE_KEY` | Ya | Service role key; hanya dipakai di server |
| `SESSION_SECRET` | Ya (produksi) | Secret untuk cookie sesi admin |
| `ADMIN_PASSWORD` | Ya (produksi) | Password panel admin |
| `DEMO_ADMIN_HIDDEN` | Tidak | Default `true`. Set `false` untuk membuka `/admin` secara lokal |
| `NEXT_PUBLIC_SITE_URL` | Ya (deploy) | URL publik, dipakai untuk metadata dan Open Graph |
| `CRON_SECRET` | Ya (deploy) | Secret untuk endpoint reset data demo |

## Panel Admin

Panel admin **disembunyikan dari publik** oleh `src/proxy.ts`. Selama
`DEMO_ADMIN_HIDDEN` bukan `false`, semua request ke `/admin` dan turunannya dijawab
sebagai `404` — termasuk halaman login dan server action-nya.

Untuk mengelola undangan secara lokal:

```env
DEMO_ADMIN_HIDDEN="false"
```

Lalu restart `npm run dev` dan buka `/admin`. Pada deployment demo publik, biarkan
`DEMO_ADMIN_HIDDEN="true"` (atau kosongkan) agar panel tetap tidak terlihat.

## Reset Data Demo

Data demo di-reset otomatis setiap hari agar tetap bersih setelah dikunjungi publik.

- **Cron Vercel:** `vercel.json` memanggil `GET /api/demo/reset` setiap `0 17 * * *` UTC
  (00:00 WIB). Vercel mengirim header `Authorization: Bearer <CRON_SECRET>`.
- **Manual:**

  ```bash
  curl -H "Authorization: Bearer $CRON_SECRET" https://domain-demo.vercel.app/api/demo/reset
  ```

  atau `GET /api/demo/reset?secret=<CRON_SECRET>`.

Endpoint ini menolak request tanpa secret yang benar dan tidak menyentuh undangan lain
di database yang sama.

## Perlindungan Form Publik

- **Honeypot** pada form RSVP dan ucapan; isian bot dibalas seolah berhasil tanpa disimpan.
- **Rate limit** 5 kiriman / 10 menit per IP (in-memory, best effort per instance).
- **Batas per jam** 25 kiriman per undangan, dihitung dari database sehingga tetap
  berlaku antar instance serverless.
- **Validasi panjang** dan nilai pada setiap field di server action.
- Ucapan baru masuk sebagai `PENDING` dan hanya tampil setelah disetujui admin.
- RLS: anon hanya dapat membaca konten publik; RSVP dan daftar tamu tidak dapat dibaca publik.

## Deployment

1. Buat project Vercel baru dari repository ini (terpisah dari project undangan asli).
2. Tambahkan seluruh variabel lingkungan di atas. Set `DEMO_ADMIN_HIDDEN="true"`.
3. Deploy. Setelah domain didapat, perbarui `NEXT_PUBLIC_SITE_URL` dan deploy ulang.
4. Pastikan `CRON_SECRET` sama dengan yang dikirim Vercel Cron.
   Pada paket Hobby, cron hanya boleh berjalan sekali sehari — jadwal di `vercel.json`
   sudah disesuaikan.
5. Jalankan seed sekali dari mesin lokal yang memiliki `.env` produksi:

   ```bash
   npm run db:seed
   ```

## Struktur Proyek

```
src/
  app/
    undangan/[slug]/     # halaman undangan + server actions RSVP & ucapan
    admin/               # panel admin (disembunyikan oleh proxy di demo)
    api/demo/reset/      # endpoint reset data demo (dilindungi CRON_SECRET)
  components/invitation/ # komponen UI undangan
  lib/                   # mapper data, tema, seed demo, rate limit, Supabase
  proxy.ts               # menyembunyikan /admin saat DEMO_ADMIN_HIDDEN aktif
scripts/
  seed-demo.ts           # seed/reset data demo
  generate-logo.ps1      # membuat monogram demo
  generate-og-banner.ps1 # membuat banner Open Graph demo
supabase/schema.sql      # skema database
```

## Kredit & Lisensi Aset

Sumber foto stok, font, dan catatan lisensi ada di [CREDITS.md](./CREDITS.md).
Seluruh foto hanya ilustrasi dan tidak menggambarkan orang yang disebut dalam data demo.
