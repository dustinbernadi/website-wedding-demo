import { GoldDivider } from "./FlowerOrnament";
import { Reveal } from "./motion";

export default function QuoteSection() {
  return (
    <section className="relative border-t border-[var(--accent)]/15 px-6 py-16 text-center sm:px-10 sm:py-24">
      <Reveal>
        <div className="relative mx-auto max-w-xl border border-[var(--accent)]/25 p-8 sm:p-12">
          <p className="mb-4 font-display text-xl text-[var(--ink-muted)] italic sm:text-2xl">
            Dalam Nama Tuhan
          </p>
          <p className="mb-2 text-sm text-[var(--ink-muted)]">
            Shalom
          </p>

          <GoldDivider className="my-8" />

          <p className="mx-auto max-w-lg font-display text-lg leading-relaxed text-[var(--ink)] italic sm:text-xl">
            &quot;TUHAN Allah berfirman: Tidak baik, kalau manusia itu seorang
            diri saja. Aku akan menjadikan penolong baginya, yang sepadan
            dengan dia.&quot;
          </p>
          <p className="mt-5 text-[11px] tracking-[0.25em] text-[var(--accent)] uppercase">
            (Kejadian 2:18)
          </p>

          <GoldDivider className="my-8" />

          <p className="mx-auto max-w-md text-sm leading-relaxed text-[var(--ink-muted)]">
            Tanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara/i
            serta kerabat sekalian untuk menghadiri acara pernikahan kami.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
