"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import SectionHeading from "./SectionHeading";
import { LayeredRose } from "./FlowerOrnament";
import { EASE, Reveal } from "./motion";

export type EnvelopeAccountItem = {
  type: string;
  label: string;
  holder: string;
  number: string;
};

type Props = {
  accounts: EnvelopeAccountItem[];
};

const TYPE_LABELS: Record<string, string> = {
  BANK: "Rekening Bank",
  EWALLET: "Dompet Digital",
};

function EnvelopeSeal() {
  return (
    <svg viewBox="0 0 48 48" className="mx-auto size-10 text-[var(--accent)]" fill="none">
      <circle cx={24} cy={24} r={20} stroke="currentColor" strokeWidth={1.5} />
      <circle cx={24} cy={24} r={16} stroke="currentColor" strokeWidth={0.8} strokeOpacity={0.5} />
      <g transform="translate(24 24)">
        <circle cx={0} cy={-8} r={3} stroke="currentColor" strokeWidth={1} fill="none" />
        <circle cx={6.9} cy={-4} r={3} stroke="currentColor" strokeWidth={1} fill="none" />
        <circle cx={6.9} cy={4} r={3} stroke="currentColor" strokeWidth={1} fill="none" />
        <circle cx={0} cy={8} r={3} stroke="currentColor" strokeWidth={1} fill="none" />
        <circle cx={-6.9} cy={4} r={3} stroke="currentColor" strokeWidth={1} fill="none" />
        <circle cx={-6.9} cy={-4} r={3} stroke="currentColor" strokeWidth={1} fill="none" />
        <circle r={2} fill="currentColor" fillOpacity={0.3} stroke="none" />
      </g>
    </svg>
  );
}

export default function EnvelopeSection({ accounts }: Props) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  if (accounts.length === 0) return null;

  async function copy(account: EnvelopeAccountItem) {
    const key = `${account.type}-${account.number}`;
    try {
      await navigator.clipboard.writeText(account.number);
      setCopiedId(key);
      window.setTimeout(() => setCopiedId((current) => (current === key ? null : current)), 1800);
    } catch {
      setCopiedId(null);
    }
  }

  return (
    <section className="relative border-t border-[var(--accent)]/15 px-6 py-16 sm:px-10 sm:py-24">
      <LayeredRose className="pointer-events-none absolute -left-4 top-8 hidden w-20 opacity-20 sm:block" />
      <LayeredRose className="pointer-events-none absolute -right-4 top-8 hidden w-20 opacity-20 sm:block" />
      <Reveal>
        <SectionHeading
          eyebrow="Tanda Kasih"
          title="Amplop Digital"
          subtitle="Doa restu Anda adalah hadiah terbaik bagi kami. Namun apabila ingin memberi tanda kasih, Anda dapat membuka amplop untuk melihat rekening kami."
        />
      </Reveal>

      <motion.button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        whileTap={{ scale: 0.97 }}
        className="mx-auto mb-10 flex items-center justify-center gap-3 border border-[var(--accent)] px-8 py-4 font-display text-lg italic text-[var(--accent)] transition-all hover:bg-[var(--accent)] hover:text-[var(--paper)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
      >
        <EnvelopeSeal />
        {open ? "Tutup Amplop" : "Buka Amplop"}
        <motion.span
          aria-hidden
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          className="inline-flex"
        >
          <svg
            className="size-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </motion.span>
      </motion.button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="envelope-accounts"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="overflow-hidden"
          >
            <ul className="mx-auto max-w-md space-y-4 pb-1">
              {accounts.map((account) => {
                const key = `${account.type}-${account.number}`;
                const copied = copiedId === key;
                return (
                  <li key={key} className="border border-[var(--accent)]/30 p-1">
                    <div className="border border-[var(--accent)]/15 px-5 py-5">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-[10px] tracking-[0.25em] text-[var(--accent)] uppercase">
                            {TYPE_LABELS[account.type] ?? account.type}
                          </p>
                          <p className="mt-1 font-display text-xl font-medium italic">
                            {account.label}
                          </p>
                        </div>
                        <motion.button
                          type="button"
                          onClick={() => copy(account)}
                          aria-live="polite"
                          whileTap={{ scale: 0.96 }}
                          className="shrink-0 border border-[var(--accent)] px-4 py-2 text-sm text-[var(--accent)] transition-all hover:bg-[var(--accent)] hover:text-[var(--paper)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                        >
                          {copied ? "Disalin!" : "Salin"}
                        </motion.button>
                      </div>
                      <p className="mt-3 text-sm text-[var(--ink-muted)]">
                        {account.holder}
                      </p>
                      <p className="mt-1 font-mono text-base tracking-wider text-[var(--ink)]">
                        {account.number}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
