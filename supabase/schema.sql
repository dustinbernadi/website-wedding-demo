-- Skema Supabase untuk website undangan.
-- Jalankan di Supabase SQL Editor (Project -> SQL Editor).
-- Akses admin & tulis publik dilakukan via service role (bypass RLS);
-- klien anon hanya bisa membaca konten publik.

create extension if not exists pgcrypto;

create table if not exists public.wedding (
  id               uuid primary key default gen_random_uuid(),
  slug             text not null unique,
  groom_name       text not null,
  bride_name       text not null,
  event_date       timestamptz not null,
  ceremony_time    timestamptz not null,
  reception_time   timestamptz not null,
  venue_name       text not null,
  venue_address    text not null,
  maps_query       text not null,
  theme_color      text not null default 'emerald',
  music_url        text,
  groom_full_name  text,
  bride_full_name  text,
  groom_parents    text,
  bride_parents    text,
  groom_instagram  text,
  bride_instagram  text,
  groom_photo      text,
  bride_photo      text,
  live_stream_url  text,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create table if not exists public.love_story_item (
  id          uuid primary key default gen_random_uuid(),
  wedding_id  uuid not null references public.wedding(id) on delete cascade,
  "order"     int not null default 0,
  title       text not null,
  date_label  text,
  description text not null,
  photo       text,
  created_at  timestamptz not null default now()
);

create index if not exists love_story_item_wedding_id_idx
  on public.love_story_item (wedding_id);

create table if not exists public.envelope_account (
  id          uuid primary key default gen_random_uuid(),
  wedding_id  uuid not null references public.wedding(id) on delete cascade,
  type        text not null,
  label       text not null,
  holder      text not null,
  number      text not null,
  "order"     int not null default 0,
  created_at  timestamptz not null default now()
);

create index if not exists envelope_account_wedding_id_idx
  on public.envelope_account (wedding_id);

create table if not exists public.gallery_photo (
  id          uuid primary key default gen_random_uuid(),
  wedding_id  uuid not null references public.wedding(id) on delete cascade,
  url         text not null,
  alt         text,
  "order"     int not null default 0,
  created_at  timestamptz not null default now()
);

create index if not exists gallery_photo_wedding_id_idx
  on public.gallery_photo (wedding_id);

create table if not exists public.rsvp (
  id          uuid primary key default gen_random_uuid(),
  wedding_id  uuid not null references public.wedding(id) on delete cascade,
  name        text not null,
  attendance  text not null,
  guest_count int not null default 1,
  phone       text,
  note        text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists rsvp_wedding_id_idx
  on public.rsvp (wedding_id);

create table if not exists public.wish (
  id          uuid primary key default gen_random_uuid(),
  wedding_id  uuid not null references public.wedding(id) on delete cascade,
  name        text not null,
  message     text not null,
  emoji       text,
  status      text not null default 'APPROVED',
  created_at  timestamptz not null default now()
);

create index if not exists wish_wedding_id_idx
  on public.wish (wedding_id);

create table if not exists public.guest (
  id          uuid primary key default gen_random_uuid(),
  wedding_id  uuid not null references public.wedding(id) on delete cascade,
  name        text not null,
  relation    text,
  created_at  timestamptz not null default now()
);

create index if not exists guest_wedding_id_idx
  on public.guest (wedding_id);

-- Row Level Security
alter table public.wedding enable row level security;
alter table public.love_story_item enable row level security;
alter table public.envelope_account enable row level security;
alter table public.gallery_photo enable row level security;
alter table public.rsvp enable row level security;
alter table public.wish enable row level security;
alter table public.guest enable row level security;

-- Baca publik untuk anon (isi undangan)
create policy "wedding anon select" on public.wedding
  for select to anon using (true);

create policy "love_story_item anon select" on public.love_story_item
  for select to anon using (true);

create policy "envelope_account anon select" on public.envelope_account
  for select to anon using (true);

create policy "gallery_photo anon select" on public.gallery_photo
  for select to anon using (true);

-- Ucapan: anon hanya bisa membaca yang sudah disetujui
create policy "wish anon select approved" on public.wish
  for select to anon using (status = 'APPROVED');

-- RSVP dan daftar tamu: tanpa akses anon (privacy).
-- Semua operasi tulis & admin via service role.
