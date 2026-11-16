import type {
  EnvelopeAccount,
  GalleryPhoto,
  Guest,
  LoveStoryItem,
  Rsvp,
  Wedding,
  Wish,
} from "@/lib/types";

/**
 * Seluruh data undangan demo. Tidak ada database: halaman undangan dirender
 * dari data statis ini, dan form publik hanya menyimulasikan interaksi.
 *
 * Tanggal relatif (created_at) dihitung saat modul dimuat, sehingga daftar
 * RSVP/ucapan terlihat "baru" setiap kali situs di-build ulang.
 */
export const DEMO_SLUG = "demo-raka-nadia";
export const DEMO_WEDDING_ID = "demo-raka-nadia";

const now = Date.now();
const daysAgo = (days: number) => new Date(now - days * 86_400_000);
const hoursAgo = (hours: number) => new Date(now - hours * 3_600_000);

export const demoWedding: Wedding = {
  id: DEMO_WEDDING_ID,
  slug: DEMO_SLUG,
  groomName: "Raka",
  brideName: "Nadia",
  eventDate: new Date("2027-06-12T08:00:00+07:00"),
  ceremonyTime: new Date("2027-06-12T09:00:00+07:00"),
  receptionTime: new Date("2027-06-12T11:30:00+07:00"),
  venueName: "The Lumina Hall",
  venueAddress: "Jl. Melati Indah No. 12, Kebayoran Baru\nJakarta Selatan 12130",
  mapsQuery: "Kebayoran Baru, Jakarta Selatan",
  themeColor: "vintage-gold",
  musicUrl: null,
  groomFullName: "Raka Pratama, S.Kom.",
  brideFullName: "Nadia Putri, S.Ds.",
  groomParents: "Putra dari\nBpk. Hendra Pratama\nIbu Sari Dewi",
  brideParents: "Putri dari\nBpk. Ahmad Wijaya\nIbu Ratna Sari",
  groomInstagram: null,
  brideInstagram: null,
  groomPhoto: "/portraits/groom.jpg",
  bridePhoto: "/portraits/bride.jpg",
  liveStreamUrl: null,
  createdAt: new Date("2026-01-05T10:00:00+07:00"),
  updatedAt: new Date("2026-01-05T10:00:00+07:00"),
};

export const demoGallery: GalleryPhoto[] = [
  { url: "/gallery/gallery1.jpeg", alt: "Momen prewedding Raka & Nadia" },
  { url: "/gallery/gallery2.jpeg", alt: "Kebersamaan di kota tua" },
  { url: "/gallery/gallery3.jpeg", alt: "Upacara di tepi pantai" },
  { url: "/gallery/gallery4.jpeg", alt: "Dekorasi meja resepsi" },
  { url: "/gallery/gallery5.jpeg", alt: "Cincin dan buket pengantin" },
  { url: "/gallery/gallery6.jpeg", alt: "Buket bunga pengantin" },
].map((item, index) => ({
  id: `demo-gallery-${index + 1}`,
  weddingId: DEMO_WEDDING_ID,
  url: item.url,
  alt: item.alt,
  order: index + 1,
  createdAt: demoWedding.createdAt,
}));

export const demoLoveStories: LoveStoryItem[] = [
  {
    order: 1,
    title: "Pertemuan Pertama",
    dateLabel: "2019",
    description:
      "Semua dimulai dari sebuah acara kampus yang sederhana.\n\nKami bertemu tanpa rencana, hanya dua orang yang kebetulan duduk di barisan yang sama. Percakapan kecil tentang tugas dan kopi ternyata menjadi awal dari cerita yang jauh lebih panjang.\n\nSaat itu kami belum tahu bahwa pertemuan biasa itu akan menjadi bab pertama dari kisah kami.",
    photo: "/lovestory/love_story_1.jpeg",
  },
  {
    order: 2,
    title: "Menjalin Komitmen",
    dateLabel: "2023",
    description:
      "Setelah bertahun-tahun saling mengenal, kami memilih untuk melangkah lebih serius.\n\nAda jarak, ada perbedaan, dan ada banyak proses yang membuat kami belajar memahami satu sama lain. Kami tumbuh bersama, saling menguatkan, dan belajar bahwa cinta bukan hanya tentang rasa, tetapi juga tentang kesetiaan dan komitmen.\n\nDi tahun 2023, kami memutuskan untuk berjalan bersama menuju masa depan.",
    photo: "/lovestory/love_story_2.jpeg",
  },
  {
    order: 3,
    title: "Menuju Pelaminan",
    dateLabel: "2027",
    description:
      "Dengan memohon restu keluarga dan kasih Tuhan, kami melangkah ke babak baru.\n\nBukan perjalanan yang selalu mudah, tetapi setiap proses membawa kami pada keyakinan bahwa ini adalah jalan yang ingin kami tempuh bersama.\n\nDi tahun 2027, kami mengucapkan janji suci dan memulai cerita kami sebagai satu keluarga.",
    photo: "/lovestory/love_story_3.jpeg",
  },
].map((item, index) => ({
  ...item,
  id: `demo-story-${index + 1}`,
  weddingId: DEMO_WEDDING_ID,
  createdAt: demoWedding.createdAt,
}));

export const demoEnvelopeAccounts: EnvelopeAccount[] = [
  { type: "BANK", label: "BCA (Demo)", holder: "Raka Pratama", number: "0000000001" },
  { type: "EWALLET", label: "DANA (Demo)", holder: "Nadia Putri", number: "0000000002" },
].map((item, index) => ({
  ...item,
  id: `demo-envelope-${index + 1}`,
  weddingId: DEMO_WEDDING_ID,
  order: index + 1,
  createdAt: demoWedding.createdAt,
}));

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

export const demoGuests: Guest[] = GUESTS.map((item, index) => ({
  id: `demo-guest-${index + 1}`,
  weddingId: DEMO_WEDDING_ID,
  name: item.name,
  relation: item.relation,
  createdAt: daysAgo(GUESTS.length - index),
}));

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

export const demoRsvps: Rsvp[] = RSVPS.map((item, index) => {
  const createdAt = hoursAgo((RSVPS.length - index) * 2);
  return {
    id: `demo-rsvp-${index + 1}`,
    weddingId: DEMO_WEDDING_ID,
    name: item.name,
    attendance: item.attendance,
    guestCount: item.guestCount,
    phone: `08120000${String(index + 1).padStart(4, "0")}`,
    note: item.note,
    createdAt,
    updatedAt: createdAt,
  };
});

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

export const demoWishes: Wish[] = WISHES.map((item, index) => ({
  id: `demo-wish-${index + 1}`,
  weddingId: DEMO_WEDDING_ID,
  name: item.name,
  message: item.message,
  emoji: item.emoji,
  status: item.status,
  createdAt: hoursAgo((WISHES.length - index) * 1.5),
}));

/** Ucapan yang boleh tampil di undangan publik. */
export const demoPublicWishes = demoWishes
  .filter((wish) => wish.status === "APPROVED")
  .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
