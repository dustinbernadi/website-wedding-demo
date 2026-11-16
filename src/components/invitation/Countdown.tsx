"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { LayeredRose } from "./FlowerOrnament";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function calculate(target: Date): TimeLeft {
  const now = new Date();
  const endOfCountdown = new Date(
    target.getFullYear(),
    target.getMonth(),
    target.getDate(),
  );
  const diff = Math.max(0, endOfCountdown.getTime() - now.getTime());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor(diff / 3_600_000) % 24,
    minutes: Math.floor(diff / 60_000) % 60,
    seconds: Math.floor(diff / 1_000) % 60,
  };
}

export default function Countdown({ target }: { target: Date }) {
  const [time, setTime] = useState<TimeLeft>(() => calculate(target));

  useEffect(() => {
    const id = window.setInterval(() => setTime(calculate(target)), 1000);
    return () => window.clearInterval(id);
  }, [target]);

  const isOver =
    time.days === 0 &&
    time.hours === 0 &&
    time.minutes === 0 &&
    time.seconds === 0;

  if (isOver) {
    return (
      <p className="text-center font-display text-xl italic text-[var(--ink-muted)]">
        Acara telah berlangsung.
      </p>
    );
  }

  const items = [
    { label: "Hari", value: time.days },
    { label: "Jam", value: time.hours },
    { label: "Menit", value: time.minutes },
    { label: "Detik", value: time.seconds },
  ];

  return (
    <div className="relative">
      <LayeredRose className="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 w-12 opacity-30" />
      <div className="border border-[var(--accent)]/30 p-1">
      <div className="border border-[var(--accent)]/15 p-4 sm:p-6">
        <div className="grid grid-cols-4 gap-2 sm:gap-4">
          {items.map((item) => (
            <div
              key={item.label}
              className="relative border border-[var(--accent)]/25 bg-[var(--accent-soft)]/30 px-2 py-5 text-center sm:py-6"
            >
              <div className="absolute inset-x-0 top-1/2 h-px bg-[var(--accent)]/10" />
              <motion.p
                key={item.value}
                initial={{ scale: 1.3, opacity: 0.3 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 280, damping: 18 }}
                className="font-headline text-3xl tracking-wider tabular-nums sm:text-5xl"
              >
                {String(item.value).padStart(2, "0")}
              </motion.p>
              <p className="mt-2 text-[10px] tracking-[0.25em] text-[var(--accent)] uppercase">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
}
