import type { ReactNode } from "react";
import { GoldDivider } from "./FlowerOrnament";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
};

export default function SectionHeading({ eyebrow, title, subtitle }: Props) {
  return (
    <div className="mb-12 text-center">
      {eyebrow && (
        <p className="mb-3 text-[11px] tracking-[0.35em] text-[var(--accent)] uppercase">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl font-medium italic sm:text-4xl">
        {title}
      </h2>
      <GoldDivider className="my-6" />
      {subtitle && (
        <p className="mx-auto max-w-md text-sm leading-relaxed text-[var(--ink-muted)]">
          {subtitle}
        </p>
      )}
    </div>
  );
}
