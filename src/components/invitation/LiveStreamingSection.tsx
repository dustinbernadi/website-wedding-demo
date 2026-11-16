import { GoldDivider, LeafCluster } from "./FlowerOrnament";
import SectionHeading from "./SectionHeading";
import { Reveal } from "./motion";

type Props = {
  liveStreamUrl: string | null;
};

export default function LiveStreamingSection({ liveStreamUrl }: Props) {
  if (!liveStreamUrl) return null;

  return (
    <section className="relative border-t border-[var(--accent)]/15 px-6 py-16 sm:px-10 sm:py-24">
      <LeafCluster className="pointer-events-none absolute -left-4 top-4 hidden w-16 opacity-20 sm:block" />
      <LeafCluster className="pointer-events-none absolute -right-4 top-4 hidden w-16 opacity-20 rotate-180 sm:block" />
      <Reveal>
        <SectionHeading
          eyebrow="Siaran Langsung"
          title="Live Streaming"
          subtitle="Kami mengundang Bapak/Ibu/Saudara/i untuk menyaksikan pernikahan kami secara virtual yang disiarkan langsung melalui media sosial di bawah ini"
        />

        <div className="mx-auto max-w-md">
          <div className="border border-[var(--accent)]/30 p-1">
            <div className="border border-[var(--accent)]/15 px-6 py-8 text-center">
              <svg
                aria-hidden
                className="mx-auto mb-4 size-10 text-[var(--accent)]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 10 5-3v10l-5-3" />
                <rect x="2" y="6" width="13" height="12" rx="1.5" />
              </svg>
              <GoldDivider className="my-4" />
              <a
                href={liveStreamUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block border border-[var(--accent)] px-8 py-3 font-display text-base italic text-[var(--accent)] transition-all hover:bg-[var(--accent)] hover:text-[var(--paper)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
              >
                Tonton Siaran Langsung
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
