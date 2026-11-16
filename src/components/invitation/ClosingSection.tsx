import { GoldDivider, VintageFlowerDivider } from "./FlowerOrnament";
import { Reveal } from "./motion";

type Props = {
  groomName: string;
  brideName: string;
};

export default function ClosingSection({ groomName, brideName }: Props) {
  return (
    <section className="relative flex min-h-dvh flex-col justify-center overflow-hidden border-t border-[var(--accent)]/15 px-6 py-16 text-center sm:px-10 sm:py-20">
      <Reveal>
        <VintageFlowerDivider className="mb-12" />
        <p className="mx-auto max-w-md font-display text-xl leading-relaxed italic text-[var(--ink-muted)] sm:text-2xl">
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila
          Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.
        </p>
        <p className="mt-8 text-sm leading-relaxed text-[var(--ink-muted)]">
          Atas kehadiran dan doa restunya, kami mengucapkan terima kasih.
        </p>

        <GoldDivider className="my-10" />

        <p className="text-[11px] tracking-[0.3em] text-[var(--accent)] uppercase">
          Tuhan Yesus Memberkati
        </p>

        <p className="mt-6 text-sm tracking-[0.25em] text-[var(--ink-muted)] uppercase">
          Kami yang berbahagia
        </p>
        <p className="mt-4 font-headline text-2xl tracking-wide leading-tight sm:text-3xl">
          {groomName}
          <br />
          &amp;
          <br />
          {brideName}
        </p>

        <GoldDivider className="my-10" />

        <p className="font-display text-2xl leading-relaxed italic text-[var(--ink-muted)] sm:text-3xl">
          Tuhan memberkati
          <br />
          dan menyertai kita semua
        </p>

        <VintageFlowerDivider className="mt-12" />
      </Reveal>
    </section>
  );
}
