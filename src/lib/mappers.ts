import type {
  EnvelopeAccount,
  GalleryPhoto,
  Guest,
  LoveStoryItem,
  Rsvp,
  Wedding,
  Wish,
} from "@/lib/types";

type Row = Record<string, unknown>;

function toDate(value: unknown): Date {
  if (value instanceof Date) return value;
  if (typeof value === "string" || typeof value === "number") return new Date(value);
  return new Date(0);
}

function toString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function toNullableString(value: unknown): string | null {
  return value == null || value === "" ? null : String(value);
}

function toNumber(value: unknown): number {
  return typeof value === "number" ? value : Number(value ?? 0);
}

export function mapWedding(row: Row): Wedding {
  return {
    id: toString(row.id),
    slug: toString(row.slug),
    groomName: toString(row.groom_name),
    brideName: toString(row.bride_name),
    eventDate: toDate(row.event_date),
    ceremonyTime: toDate(row.ceremony_time),
    receptionTime: toDate(row.reception_time),
    venueName: toString(row.venue_name),
    venueAddress: toString(row.venue_address),
    mapsQuery: toString(row.maps_query),
    themeColor: toString(row.theme_color),
    musicUrl: toNullableString(row.music_url),
    groomFullName: toNullableString(row.groom_full_name),
    brideFullName: toNullableString(row.bride_full_name),
    groomParents: toNullableString(row.groom_parents),
    brideParents: toNullableString(row.bride_parents),
    groomInstagram: toNullableString(row.groom_instagram),
    brideInstagram: toNullableString(row.bride_instagram),
    groomPhoto: toNullableString(row.groom_photo),
    bridePhoto: toNullableString(row.bride_photo),
    liveStreamUrl: toNullableString(row.live_stream_url),
    createdAt: toDate(row.created_at),
    updatedAt: toDate(row.updated_at),
  };
}

export function mapLoveStory(row: Row): LoveStoryItem {
  return {
    id: toString(row.id),
    weddingId: toString(row.wedding_id),
    order: toNumber(row.order),
    title: toString(row.title),
    dateLabel: toNullableString(row.date_label),
    description: toString(row.description),
    photo: toNullableString(row.photo),
    createdAt: toDate(row.created_at),
  };
}

export function mapEnvelopeAccount(row: Row): EnvelopeAccount {
  return {
    id: toString(row.id),
    weddingId: toString(row.wedding_id),
    type: toString(row.type),
    label: toString(row.label),
    holder: toString(row.holder),
    number: toString(row.number),
    order: toNumber(row.order),
    createdAt: toDate(row.created_at),
  };
}

export function mapGalleryPhoto(row: Row): GalleryPhoto {
  return {
    id: toString(row.id),
    weddingId: toString(row.wedding_id),
    url: toString(row.url),
    alt: toNullableString(row.alt),
    order: toNumber(row.order),
    createdAt: toDate(row.created_at),
  };
}

export function mapRsvp(row: Row): Rsvp {
  return {
    id: toString(row.id),
    weddingId: toString(row.wedding_id),
    name: toString(row.name),
    attendance: toString(row.attendance),
    guestCount: toNumber(row.guest_count),
    phone: toNullableString(row.phone),
    note: toNullableString(row.note),
    createdAt: toDate(row.created_at),
    updatedAt: toDate(row.updated_at),
  };
}

export function mapWish(row: Row): Wish {
  return {
    id: toString(row.id),
    weddingId: toString(row.wedding_id),
    name: toString(row.name),
    message: toString(row.message),
    emoji: toNullableString(row.emoji),
    status: toString(row.status),
    createdAt: toDate(row.created_at),
  };
}

export function mapGuest(row: Row): Guest {
  return {
    id: toString(row.id),
    weddingId: toString(row.wedding_id),
    name: toString(row.name),
    relation: toNullableString(row.relation),
    createdAt: toDate(row.created_at),
  };
}

export function mapRows<T>(rows: Row[] | null, mapper: (row: Row) => T): T[] {
  return (rows ?? []).map(mapper);
}
