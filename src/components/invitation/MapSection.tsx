import {
  mapsDirectionsUrl,
  mapsEmbedUrl,
} from "@/lib/maps";
import SectionHeading from "./SectionHeading";
import { LeafCluster } from "./FlowerOrnament";
import { Reveal } from "./motion";

type Props = {
  mapsQuery: string;
  venueName: string;
  venueAddress: string;
};

export default function MapSection({
  mapsQuery,
  venueName,
  venueAddress,
}: Props) {
  return (
    <section className="relative border-t border-[var(--accent)]/15 px-6 py-16 sm:px-10 sm:py-24">
      <LeafCluster className="pointer-events-none absolute -left-4 top-6 hidden w-16 opacity-20 sm:block" />
      <LeafCluster className="pointer-events-none absolute -right-4 top-6 hidden w-16 opacity-20 rotate-180 sm:block" />
      <Reveal>
        <SectionHeading eyebrow="Petunjuk Jalan" title="Lokasi Acara" />

        <p className="mb-8 text-center text-sm leading-relaxed whitespace-pre-line text-[var(--ink-muted)]">
          {venueName}
          <br />
          {venueAddress}
        </p>

        <div className="border border-[var(--accent)]/30 p-1">
          <div className="border border-[var(--accent)]/15 overflow-hidden">
            <iframe
              src={mapsEmbedUrl(mapsQuery)}
              title={`Peta lokasi ${venueName}`}
              width="100%"
              height="320"
              style={{ border: 0, display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <div className="mt-4 grid gap-3">
          <a
            href={mapsDirectionsUrl(mapsQuery)}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[var(--accent)] px-6 py-4 text-center font-display text-lg italic text-[var(--accent)] transition-all hover:bg-[var(--accent)] hover:text-[var(--paper)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
          >
            Buka di Google Maps
          </a>
        </div>
      </Reveal>
    </section>
  );
}
