import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { existsSync } from "node:fs";
import path from "node:path";
import { createServerSupabase } from "@/lib/supabase";
import {
  mapWedding,
  mapEnvelopeAccount,
  mapGalleryPhoto,
  mapLoveStory,
  mapWish,
  mapRows,
} from "@/lib/mappers";
import { MotionRoot, Reveal } from "@/components/invitation/motion";
import { formatShortDate } from "@/lib/format";
import { OG_BANNER } from "@/lib/og";
import { themeVars } from "@/lib/themes";
import OpenGate from "@/components/invitation/OpenGate";
import HeroSection from "@/components/invitation/HeroSection";
import QuoteSection from "@/components/invitation/QuoteSection";
import CoupleSection from "@/components/invitation/CoupleSection";
import LoveStorySection from "@/components/invitation/LoveStorySection";
import EventSection from "@/components/invitation/EventSection";
import Countdown from "@/components/invitation/Countdown";
import GallerySection from "@/components/invitation/GallerySection";
import SectionHeading from "@/components/invitation/SectionHeading";
import EnvelopeSection from "@/components/invitation/EnvelopeSection";
import MapSection from "@/components/invitation/MapSection";
import RsvpSection from "@/components/invitation/RsvpSection";
import WishesSection from "@/components/invitation/WishesSection";
import ClosingSection from "@/components/invitation/ClosingSection";
import LiveStreamingSection from "@/components/invitation/LiveStreamingSection";
import FloatingNav from "@/components/invitation/FloatingNav";
import MusicPlayer from "@/components/invitation/MusicPlayer";
import DemoBanner from "@/components/invitation/DemoBanner";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ to?: string | string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = createServerSupabase();
  if (!supabase) return { title: "Undangan Tidak Ditemukan" };

  const { data } = await supabase
    .from("wedding")
    .select("groom_name, bride_name, event_date, venue_name")
    .eq("slug", slug)
    .maybeSingle();

  if (!data) return { title: "Undangan Tidak Ditemukan" };

  const title = `${data.groom_name} & ${data.bride_name}`;
  const description = `${formatShortDate(new Date(data.event_date))} · ${data.venue_name}. Kami menantikan kehadiran Anda.`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: OG_BANNER.path,
          width: OG_BANNER.width,
          height: OG_BANNER.height,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_BANNER.path],
    },
  };
}

export default async function InvitationPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { to } = await searchParams;

  const supabase = createServerSupabase();
  if (!supabase) notFound();

  const { data: weddingRow, error: weddingError } = await supabase
    .from("wedding")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (weddingError || !weddingRow) notFound();

  const weddingId = weddingRow.id;
  const [{ data: galleryRows }, { data: wishRows }, { data: storyRows }, { data: envelopeRows }] =
    await Promise.all([
      supabase
        .from("gallery_photo")
        .select("*")
        .eq("wedding_id", weddingId)
        .order("order", { ascending: true }),
      supabase
        .from("wish")
        .select("*")
        .eq("wedding_id", weddingId)
        .eq("status", "APPROVED")
        .order("created_at", { ascending: false }),
      supabase
        .from("love_story_item")
        .select("*")
        .eq("wedding_id", weddingId)
        .order("order", { ascending: true }),
      supabase
        .from("envelope_account")
        .select("*")
        .eq("wedding_id", weddingId)
        .order("order", { ascending: true }),
    ]);

  const wedding = mapWedding(weddingRow);
  const galleryPhotos = mapRows(galleryRows, mapGalleryPhoto);
  const wishes = mapRows(wishRows, mapWish);
  const loveStories = mapRows(storyRows, mapLoveStory);
  const envelopeAccounts = mapRows(envelopeRows, mapEnvelopeAccount);

  const guestName = Array.isArray(to) ? to[0] : to;

  const heroPhoto = path.join(process.cwd(), "public", "photos", "hero_img.jpeg");
  const backgroundImage = existsSync(heroPhoto)
    ? "/photos/hero_img.jpeg"
    : `/covers/cover-${wedding.themeColor}.svg`;

  const gatePhoto = path.join(process.cwd(), "public", "photos", "opengate_img.jpeg");
  const gateImage = existsSync(gatePhoto)
    ? "/photos/opengate_img.jpeg"
    : `/covers/cover-${wedding.themeColor}.svg`;

  return (
    <MotionRoot>
      <div aria-hidden className="fixed inset-0 z-0 bg-[#1e1b16]" />

      <div
        style={themeVars(wedding.themeColor)}
        className="relative z-10 mx-auto flex min-h-[100dvh] w-full max-w-[430px] flex-col bg-[var(--paper)] shadow-2xl ring-1 ring-black/10"
      >
        <OpenGate
          guestName={guestName ?? null}
          groomName={wedding.groomName}
          brideName={wedding.brideName}
          dateLabel={formatShortDate(wedding.eventDate)}
          themeColor={wedding.themeColor}
          gateImage={gateImage}
        >
        <main className="relative w-full flex-1 bg-[var(--paper)] text-[var(--ink)]">
        <HeroSection
          groomName={wedding.groomName}
          brideName={wedding.brideName}
          dateLabel={formatShortDate(wedding.eventDate)}
          backgroundImage={backgroundImage}
          themeColor={wedding.themeColor}
        />

        <QuoteSection />

        <CoupleSection
          groom={{
            name: wedding.groomName,
            fullName: wedding.groomFullName,
            parents: wedding.groomParents,
            instagram: wedding.groomInstagram,
            photo: wedding.groomPhoto,
          }}
          bride={{
            name: wedding.brideName,
            fullName: wedding.brideFullName,
            parents: wedding.brideParents,
            instagram: wedding.brideInstagram,
            photo: wedding.bridePhoto,
          }}
        />

        <LoveStorySection items={loveStories} />

        <section
          id="tanggal"
          className="scroll-mt-6 border-t border-[var(--accent)]/20 px-6 py-16 sm:px-10 sm:py-20"
        >
          <Reveal>
            <SectionHeading eyebrow="Menanti Hari Bahagia" title="Menuju Hari Bahagia" />
            <Countdown target={wedding.eventDate} />
          </Reveal>
        </section>

        <EventSection
          eventDate={wedding.eventDate}
          ceremonyTime={wedding.ceremonyTime}
          ceremonyEndTime={new Date(wedding.ceremonyTime.getTime() + 90 * 60_000)}
          receptionTime={wedding.receptionTime}
          receptionEndTime={new Date(wedding.receptionTime.getTime() + 3 * 60 * 60_000)}
        />

        <GallerySection photos={galleryPhotos} />

        <LiveStreamingSection liveStreamUrl={wedding.liveStreamUrl} />

        <EnvelopeSection accounts={envelopeAccounts} />

        <MapSection
          mapsQuery={wedding.mapsQuery}
          venueName={wedding.venueName}
          venueAddress={wedding.venueAddress}
        />

        <RsvpSection slug={slug} guestName={guestName} />

        <WishesSection slug={slug} wishes={wishes} />

        <ClosingSection
          groomName={wedding.groomName}
          brideName={wedding.brideName}
        />

        </main>
        </OpenGate>

        {wedding.musicUrl && (
          <div className="pointer-events-none fixed inset-x-0 top-0 z-40 mx-auto h-0 w-full max-w-[430px]">
            <MusicPlayer src={wedding.musicUrl} />
          </div>
        )}
        <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 mx-auto h-0 w-full max-w-[430px]">
          <FloatingNav />
        </div>
      </div>

      <DemoBanner />
    </MotionRoot>
  );
}
