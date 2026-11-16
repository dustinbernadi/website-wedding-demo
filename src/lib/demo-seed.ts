import type { SupabaseClient } from "@supabase/supabase-js";

export const DEMO_SLUG = "demo-raka-nadia";

const CHILD_TABLES = [
  "gallery_photo",
  "love_story_item",
  "envelope_account",
  "guest",
  "rsvp",
  "wish",
] as const;

const GALLERY = [
  { url: "/gallery/gallery1.jpeg", alt: "Momen prewedding Raka & Nadia", order: 1 },
  { url: "/gallery/gallery2.jpeg", alt: "Kebersamaan di kota tua", order: 2 },
  { url: "/gallery/gallery3.jpeg", alt: "Upacara di tepi pantai", order: 3 },
  { url: "/gallery/gallery4.jpeg", alt: "Dekorasi meja resepsi", order: 4 },
  { url: "/gallery/gallery5.jpeg", alt: "Cincin dan buket pengantin", order: 5 },
  { url: "/gallery/gallery6.jpeg", alt: "Buket bunga pengantin", order: 6 },
];

const LOVE_STORIES = [
  {
    order: 1,
    title: "Pertemuan Pertama",
    date_label: "2019",
    description:
      "Semua dimulai dari sebuah acara kampus yang sederhana.\n\nKami bertemu tanpa rencana, hanya dua orang yang kebetulan duduk di barisan yang sama. Percakapan kecil tentang tugas dan kopi ternyata menjadi awal dari cerita yang jauh lebih panjang.\n\nSaat itu kami belum tahu bahwa pertemuan biasa itu akan menjadi bab pertama dari kisah kami.",
    photo: "/lovestory/love_story_1.jpeg",
  },
  {
    order: 2,
    title: "Menjalin Komitmen",
    date_label: "2023",
    description:
      "Setelah bertahun-tahun saling mengenal, kami memilih untuk melangkah lebih serius.\n\nAda jarak, ada perbedaan, dan ada banyak proses yang membuat kami belajar memahami satu sama lain. Kami tumbuh bersama, saling menguatkan, dan belajar bahwa cinta bukan hanya tentang rasa, tetapi juga tentang kesetiaan dan komitmen.\n\nDi tahun 2023, kami memutuskan untuk berjalan bersama menuju masa depan.",
    photo: "/lovestory/love_story_2.jpeg",
  },
  {
    order: 3,
    title: "Menuju Pelaminan",
    date_label: "2027",
    description:
      "Dengan memohon restu keluarga dan kasih Tuhan, kami melangkah ke babak baru.\n\nBukan perjalanan yang selalu mudah, tetapi setiap proses membawa kami pada keyakinan bahwa ini adalah jalan yang ingin kami tempuh bersama.\n\nDi tahun 2027, kami mengucapkan janji suci dan memulai cerita kami sebagai satu keluarga.",
    photo: "/lovestory/love_story_3.jpeg",
  },
];

const ENVELOPE_ACCOUNTS = [
  {
    type: "BANK",
    label: "BCA (Demo)",
    holder: "Raka Pratama",
    number: "0000000001",
    order: 1,
  },
  {
    type: "EWALLET",
    label: "DANA (Demo)",
    holder: "Nadia Putri",
    number: "0000000002",
    order: 2,
  },
];

const GUESTS = [
  { name: "Andi Saputra", relation: "Teman kantor" },
  { name: "Bella Kartika", relation: "Sahabat Nadia" },
  { name: "Chandra Wijaya", relation: "Teman kuliah" },
  { name: "Dinda Maharani", relation: "Sepupu Raka" },
  { name: "Eko Prasetyo", relation: "Rekan kerja" },
  { name: "Fina Lestari", relation: "Teman SMA" },
  { name: "Gilang Ramadhan", relation: "Sepupu Nadia" },
  { name: "Hana Permata", relation: "Sahabat" },
  { name: "Irfan Hakim", relation: "Tetangga" },
  { name: "Jihan Aulia", relation: "Teman kantor" },
  { name: "Kevin Tanu", relation: "Teman komunitas" },
  { name: "Laras Ayu", relation: "Sepupu" },
  { name: "Made Bagus", relation: "Teman kuliah" },
  { name: "Nabila Zahra", relation: "Sahabat" },
];

const RSVPS = [
  { name: "Andi Saputra", attendance: "HADIR", guestCount: 2, note: "Mohon kursi dekat lorong." },
  { name: "Bella Kartika", attendance: "HADIR", guestCount: 1, note: null },
  { name: "Chandra Wijaya", attendance: "HADIR", guestCount: 2, note: null },
  { name: "Dinda Maharani", attendance: "HADIR", guestCount: 3, note: "Datang bersama keluarga." },
  { name: "Eko Prasetyo", attendance: "TIDAK_HADIR", guestCount: 1, note: "Berhalangan hadir, doa terbaik." },
  { name: "Fina Lestari", attendance: "HADIR", guestCount: 2, note: null },
  { name: "Gilang Ramadhan", attendance: "RAFGU", guestCount: 1, note: "Masih menunggu jadwal cuti." },
  { name: "Hana Permata", attendance: "HADIR", guestCount: 1, note: null },
  { name: "Irfan Hakim", attendance: "HADIR", guestCount: 2, note: null },
  { name: "Jihan Aulia", attendance: "TIDAK_HADIR", guestCount: 1, note: null },
  { name: "Kevin Tanu", attendance: "HADIR", guestCount: 2, note: "Tolong menu tanpa seafood." },
  { name: "Laras Ayu", attendance: "HADIR", guestCount: 1, note: null },
  { name: "Made Bagus", attendance: "RAFGU", guestCount: 2, note: null },
  { name: "Nabila Zahra", attendance: "HADIR", guestCount: 2, note: null },
  { name: "Oscar Simbolon", attendance: "HADIR", guestCount: 1, note: null },
  { name: "Putri Anjani", attendance: "TIDAK_HADIR", guestCount: 1, note: "Semoga lancar sampai hari H." },
  { name: "Qori Ramadan", attendance: "HADIR", guestCount: 2, note: null },
  { name: "Rina Melati", attendance: "HADIR", guestCount: 1, note: null },
];

const WISHES = [
  { name: "Andi Saputra", message: "Selamat menempuh hidup baru, Raka & Nadia! Semoga menjadi keluarga yang penuh kasih dan sukacita.", emoji: "🎉", status: "APPROVED" },
  { name: "Bella Kartika", message: "Akhirnya! Turut berbahagia untuk kalian berdua. Semoga pernikahannya lancar sampai hari H. 🤍", emoji: "❤️", status: "APPROVED" },
  { name: "Chandra Wijaya", message: "God bless you both. Semoga selalu diberi kesehatan, kesabaran, dan kebahagiaan.", emoji: "🙏", status: "APPROVED" },
  { name: "Dinda Maharani", message: "Selamat menikah, sepupuku! Semoga rumah tangganya penuh tawa dan berkah.", emoji: "✨", status: "APPROVED" },
  { name: "Eko Prasetyo", message: "Maaf tidak bisa hadir, tapi doa terbaik selalu untuk kalian. Selamat ya!", emoji: "🙏", status: "APPROVED" },
  { name: "Fina Lestari", message: "Sahabatku tersayang, semoga bahagia selamanya. Sampai jumpa di hari bahagia kalian!", emoji: "🥂", status: "APPROVED" },
  { name: "Hana Permata", message: "Semoga menjadi pasangan yang saling menguatkan dan saling mengasihi sampai tua.", emoji: "🌿", status: "APPROVED" },
  { name: "Irfan Hakim", message: "Selamat ya Kang Raka dan Teh Nadia. Semoga menjadi keluarga sakinah dan penuh berkah.", emoji: "🎉", status: "APPROVED" },
  { name: "Kevin Tanu", message: "Congrats kalian! Akhirnya cerita panjangnya sampai di titik ini. Bahagia selalu ya.", emoji: "✨", status: "APPROVED" },
  { name: "Laras Ayu", message: "Selamat menempuh hidup baru. Semoga Tuhan selalu menyertai langkah kalian.", emoji: "🙏", status: "APPROVED" },
  { name: "Nabila Zahra", message: "Nadia, kamu pasti jadi pengantin yang cantik. Selamat ya, semoga langgeng!", emoji: "❤️", status: "APPROVED" },
  { name: "Oscar Simbolon", message: "Selamat berbahagia. Semoga pernikahan kalian menjadi berkat bagi banyak orang.", emoji: "🎉", status: "APPROVED" },
  { name: "Qori Ramadan", message: "Barakallahu lakuma wa baraka alaikuma. Selamat menempuh hidup baru!", emoji: "🙏", status: "APPROVED" },
  { name: "Rina Melati", message: "Semoga cinta kalian terus tumbuh setiap hari. Selamat menikah!", emoji: "🌿", status: "APPROVED" },
  { name: "Sinta Dewi", message: "Turut berbahagia untuk Raka & Nadia. Semoga hari besarnya berjalan lancar.", emoji: "🥂", status: "APPROVED" },
  { name: "Taufik Hidayat", message: "Selamat ya! Semoga menjadi keluarga yang saling mendukung dan membahagiakan.", emoji: "🙏", status: "APPROVED" },
  { name: "Umi Kalsum", message: "Doa terbaik dari kami sekeluarga. Semoga pernikahannya penuh berkah.", emoji: "❤️", status: "PENDING" },
  { name: "Vina Oktaviani", message: "Selamat menikah! Semoga bahagia selalu sampai akhir hayat.", emoji: "✨", status: "PENDING" },
  { name: "Wahyu Setiawan", message: "Promo pinjaman cepat cair, hubungi nomor berikut...", emoji: null, status: "REJECTED" },
  { name: "Xena Lim", message: "Selamat ya! Semoga semua rencana berjalan sesuai harapan.", emoji: "🎉", status: "APPROVED" },
];

function buildWeddingPayload() {
  return {
    slug: DEMO_SLUG,
    groom_name: "Raka",
    bride_name: "Nadia",
    event_date: new Date("2027-06-12T08:00:00+07:00").toISOString(),
    ceremony_time: new Date("2027-06-12T09:00:00+07:00").toISOString(),
    reception_time: new Date("2027-06-12T11:30:00+07:00").toISOString(),
    venue_name: "The Lumina Hall",
    venue_address:
      "Jl. Melati Indah No. 12, Kebayoran Baru\nJakarta Selatan 12130",
    maps_query: "Kebayoran Baru, Jakarta Selatan",
    theme_color: "vintage-gold",
    music_url: null,
    groom_full_name: "Raka Pratama, S.Kom.",
    bride_full_name: "Nadia Putri, S.Ds.",
    groom_parents: "Putra dari\nBpk. Hendra Pratama\nIbu Sari Dewi",
    bride_parents: "Putri dari\nBpk. Ahmad Wijaya\nIbu Ratna Sari",
    groom_instagram: null,
    bride_instagram: null,
    groom_photo: "/portraits/groom.jpg",
    bride_photo: "/portraits/bride.jpg",
    live_stream_url: null,
  };
}

export type DemoSeedResult = {
  weddingId: string;
  gallery: number;
  loveStories: number;
  envelopeAccounts: number;
  guests: number;
  rsvps: number;
  wishes: number;
};

/**
 * Seed (atau reset) data undangan demo. Hanya menyentuh wedding dengan slug
 * demo — wedding lain di database yang sama tidak akan tersentuh.
 */
export async function seedDemo(supabase: SupabaseClient): Promise<DemoSeedResult> {
  const now = Date.now();
  const payload = buildWeddingPayload();

  const { data: existing, error: findError } = await supabase
    .from("wedding")
    .select("id")
    .eq("slug", DEMO_SLUG)
    .maybeSingle();
  if (findError) throw findError;

  let weddingId: string;

  if (existing) {
    weddingId = existing.id;
    const { error } = await supabase
      .from("wedding")
      .update({ ...payload, updated_at: new Date().toISOString() })
      .eq("id", weddingId);
    if (error) throw error;

    for (const table of CHILD_TABLES) {
      const { error: deleteError } = await supabase
        .from(table)
        .delete()
        .eq("wedding_id", weddingId);
      if (deleteError) throw deleteError;
    }
  } else {
    const { data, error } = await supabase
      .from("wedding")
      .insert(payload)
      .select("id")
      .single();
    if (error || !data) throw error ?? new Error("Gagal membuat wedding demo.");
    weddingId = data.id;
  }

  const galleryRows = GALLERY.map((item) => ({ ...item, wedding_id: weddingId }));
  const storyRows = LOVE_STORIES.map((item) => ({ ...item, wedding_id: weddingId }));
  const envelopeRows = ENVELOPE_ACCOUNTS.map((item) => ({ ...item, wedding_id: weddingId }));
  const guestRows = GUESTS.map((item, index) => ({
    ...item,
    wedding_id: weddingId,
    created_at: new Date(now - (GUESTS.length - index) * 86_400_000).toISOString(),
  }));
  const rsvpRows = RSVPS.map((item, index) => ({
    ...item,
    wedding_id: weddingId,
    phone: `08120000${String(index + 1).padStart(4, "0")}`,
    created_at: new Date(now - (RSVPS.length - index) * 7_200_000).toISOString(),
    updated_at: new Date(now - (RSVPS.length - index) * 7_200_000).toISOString(),
  }));
  const wishRows = WISHES.map((item, index) => ({
    ...item,
    wedding_id: weddingId,
    created_at: new Date(now - (WISHES.length - index) * 5_400_000).toISOString(),
  }));

  const inserts = [
    {
      table: "gallery_photo",
      run: () => supabase.from("gallery_photo").insert(galleryRows),
    },
    {
      table: "love_story_item",
      run: () => supabase.from("love_story_item").insert(storyRows),
    },
    {
      table: "envelope_account",
      run: () => supabase.from("envelope_account").insert(envelopeRows),
    },
    { table: "guest", run: () => supabase.from("guest").insert(guestRows) },
    { table: "rsvp", run: () => supabase.from("rsvp").insert(rsvpRows) },
    { table: "wish", run: () => supabase.from("wish").insert(wishRows) },
  ];

  for (const { table, run } of inserts) {
    const { error } = await run();
    if (error) throw new Error(`Gagal mengisi ${table}: ${error.message}`);
  }

  return {
    weddingId,
    gallery: galleryRows.length,
    loveStories: storyRows.length,
    envelopeAccounts: envelopeRows.length,
    guests: guestRows.length,
    rsvps: rsvpRows.length,
    wishes: wishRows.length,
  };
}
