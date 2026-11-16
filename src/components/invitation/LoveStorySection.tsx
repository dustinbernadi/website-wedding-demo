import { LayeredRose, LeafCluster } from "./FlowerOrnament";
import SectionHeading from "./SectionHeading";
import { Reveal } from "./motion";

export type LoveStoryItem = {
  title: string;
  dateLabel: string | null;
  description: string;
  photo: string | null;
  order?: number;
};

type Props = {
  items: LoveStoryItem[];
};

function TimelineFlowerDot() {
  return (
    <span className="absolute top-1 left-0 flex size-10 items-center justify-center">
      <svg viewBox="0 0 32 32" className="size-8 text-[var(--accent)]" fill="none">
        <g stroke="currentColor" strokeWidth={1.2} strokeOpacity={0.6}>
          <circle cx={16} cy={16} r={10} />
          <circle cx={16} cy={6} r={3.5} />
          <circle cx={16} cy={26} r={3.5} />
          <circle cx={6} cy={16} r={3.5} />
          <circle cx={26} cy={16} r={3.5} />
          <circle
            cx={9.5}
            cy={9.5}
            r={3}
          />
          <circle cx={22.5} cy={9.5} r={3} />
          <circle cx={9.5} cy={22.5} r={3} />
          <circle cx={22.5} cy={22.5} r={3} />
        </g>
        <circle cx={16} cy={16} r={3} fill="currentColor" fillOpacity={0.4} stroke="none" />
      </svg>
    </span>
  );
}

function renderDescription(text: string) {
  const parts = text.split(/(\*[^*]+\*)/g);
  return parts.map((part, i) =>
    part.startsWith("*") && part.endsWith("*") && part.length > 2 ? (
      <em key={i} className="italic">
        {part.slice(1, -1)}
      </em>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

export default function LoveStorySection({ items }: Props) {
  return (
    <section className="relative border-t border-[var(--accent)]/15 px-6 py-16 sm:px-10 sm:py-24">
      <LeafCluster className="pointer-events-none absolute -left-2 top-4 hidden w-20 opacity-30 sm:block" />
      <LeafCluster className="pointer-events-none absolute -right-2 top-4 hidden w-20 opacity-30 rotate-180 sm:block" />
      <LayeredRose className="pointer-events-none absolute right-4 top-16 hidden w-16 opacity-20 sm:block" />
      <Reveal>
        <SectionHeading eyebrow="Kisah Kami" title="Love Story" />
        {items.length === 0 ? (
          <p className="text-center text-sm text-[var(--ink-muted)]">
            Kisah kami akan segera hadir.
          </p>
        ) : (
          <ol className="relative mx-auto max-w-lg space-y-12">
            <span
              aria-hidden
              className="absolute top-1 bottom-0 left-[19px] w-px bg-[var(--accent)]/20"
            />
            {items.map((item, index) => (
              <li key={item.title} className="relative pl-14">
                <TimelineFlowerDot />
                <Reveal delay={0.1 * index}>
                  {item.photo && (
                    <div className="mb-6 border border-[var(--accent)]/30 p-1.5">
                      <div className="border border-[var(--accent)]/15 p-1">
                        <div className="aspect-[4/3] overflow-hidden bg-[var(--accent-soft)]">
                          <img
                            src={item.photo}
                            alt={`Foto ${item.title}`}
                            loading="lazy"
                            decoding="async"
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  {item.dateLabel && (
                    <p className="text-[11px] tracking-[0.25em] text-[var(--accent)] uppercase">
                      {item.dateLabel}
                    </p>
                  )}
                  <h3 className="mt-2 font-display text-2xl font-medium italic">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed whitespace-pre-line text-[var(--ink-muted)]">
                    {renderDescription(item.description)}
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>
        )}
      </Reveal>
    </section>
  );
}
