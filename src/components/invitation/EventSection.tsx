import { formatDate, formatTime } from "@/lib/format";
import { GoldDivider, FloralSpray } from "./FlowerOrnament";
import SectionHeading from "./SectionHeading";
import { Reveal } from "./motion";

type Props = {
  eventDate: Date;
  ceremonyTime: Date;
  ceremonyEndTime: Date;
  receptionTime: Date;
  receptionEndTime: Date;
};

export default function EventSection({
  eventDate,
  ceremonyTime,
  ceremonyEndTime,
  receptionTime,
  receptionEndTime,
}: Props) {
  const dateLabel = formatDate(eventDate);
  const events = [
    {
      label: "Pemberkatan",
      time: `${formatTime(ceremonyTime)} - ${formatTime(ceremonyEndTime)}`,
    },
    {
      label: "Resepsi",
      time: `${formatTime(receptionTime)} - ${formatTime(receptionEndTime)}`,
    },
  ];

  return (
    <section className="relative border-t border-[var(--accent)]/15 px-6 py-16 sm:px-10 sm:py-24">
      <FloralSpray className="pointer-events-none absolute -left-6 top-12 hidden w-28 opacity-25 sm:block" />
      <FloralSpray className="pointer-events-none absolute -right-6 top-12 hidden w-28 opacity-25 -scale-x-100 sm:block" />
      <Reveal>
        <SectionHeading eyebrow="Susunan Acara" title="Rangkaian Acara" />

        <p className="mb-10 text-center font-display text-lg font-semibold tracking-wide text-[var(--ink-muted)] italic">
          {dateLabel}
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          {events.map((event) => (
            <div
              key={event.label}
              className="border border-[var(--accent)]/30 p-1"
            >
              <div className="border border-[var(--accent)]/15 px-6 py-8 text-center">
                <p className="text-[11px] tracking-[0.3em] text-[var(--accent)] uppercase">
                  {event.label}
                </p>
                <GoldDivider className="my-4" />
                <p className="font-headline text-2xl tracking-wider tabular-nums sm:text-3xl">
                  {event.time}
                </p>
                <p className="mt-2 text-xs tracking-[0.2em] text-[var(--ink-muted)] uppercase">
                  WIB
                </p>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
