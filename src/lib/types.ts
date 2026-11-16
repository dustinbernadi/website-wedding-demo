export type Wedding = {
  id: string;
  slug: string;
  groomName: string;
  brideName: string;
  eventDate: Date;
  ceremonyTime: Date;
  receptionTime: Date;
  venueName: string;
  venueAddress: string;
  mapsQuery: string;
  themeColor: string;
  musicUrl: string | null;
  groomFullName: string | null;
  brideFullName: string | null;
  groomParents: string | null;
  brideParents: string | null;
  groomInstagram: string | null;
  brideInstagram: string | null;
  groomPhoto: string | null;
  bridePhoto: string | null;
  liveStreamUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type LoveStoryItem = {
  id: string;
  weddingId: string;
  order: number;
  title: string;
  dateLabel: string | null;
  description: string;
  photo: string | null;
  createdAt: Date;
};

export type EnvelopeAccount = {
  id: string;
  weddingId: string;
  type: string;
  label: string;
  holder: string;
  number: string;
  order: number;
  createdAt: Date;
};

export type GalleryPhoto = {
  id: string;
  weddingId: string;
  url: string;
  alt: string | null;
  order: number;
  createdAt: Date;
};

export type Rsvp = {
  id: string;
  weddingId: string;
  name: string;
  attendance: string;
  guestCount: number;
  phone: string | null;
  note: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type Wish = {
  id: string;
  weddingId: string;
  name: string;
  message: string;
  emoji: string | null;
  status: string;
  createdAt: Date;
};

export type Guest = {
  id: string;
  weddingId: string;
  name: string;
  relation: string | null;
  createdAt: Date;
};
