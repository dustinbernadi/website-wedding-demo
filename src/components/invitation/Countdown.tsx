"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { LayeredRose } from "./FlowerOrnament";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

/**
 * Demo portofolio: hitung mundur selalu menunjukkan 20 hari.
 *
 * Deadline dihitung ulang di klien setiap detik dari tengah malam hari ini
 * ditambah 21 hari, sehingga sisa waktunya selalu "20 hari + jam berjalan"
 * dan otomatis kembali ke 20 hari saat melewati tengah malam. Tanggal acara
 * pada undangan tetap 12 Juni 2027; ini murni tampilan demo.
 */
const DEMO_DAYS = 20;

const INITIAL_TIME: TimeLeft = {
  days: DEMO_DAYS,
  hours: 0,
  minutes: 0,
  seconds: 0,
};

function demoDeadline(now: Date): Date {
  const deadline = new Date(now);
  deadline.setHours(0, 0, 0, 0);
  deadline.setDate(deadline.getDate() + DEMO_DAYS + 1);
  return deadline;
}

function calculate(target: Date): TimeLeft {
  const diff = Math.max(0, target.getTime() - Date.now());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor(diff / 3_600_000) % 24,
    minutes: Math.floor(diff / 60_000) % 60,
    seconds: Math.floor(diff / 1_000) % 60,
  };
}

export default function Countdown() {
  const [time, setTime] = useState<TimeLeft>(INITIAL_TIME);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const tick = () => setTime(calculate(demoDeadline(new Date())));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

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
        <div className="border border-[var(--accent)]/15 p-3 sm:p-6">
          <div
            role="group"
            aria-label={`Hitung mundur ${DEMO_DAYS} hari menuju hari bahagia`}
            aria-live="off"
            className="grid grid-cols-4 gap-1.5 sm:gap-4"
          >
            {items.map((item) => (
              <div
                key={item.label}
                className="relative min-w-0 border border-[var(--accent)]/25 bg-[var(--accent-soft)]/30 px-1 py-4 text-center sm:px-2 sm:py-6"
              >
                <div className="absolute inset-x-0 top-1/2 h-px bg-[var(--accent)]/10" />
                <motion.p
                  key={item.value}
                  initial={{ scale: 1.3, opacity: 0.3 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 280, damping: 18 }
                  }
                  className="font-headline text-[26px] leading-none tracking-wide tabular-nums min-[360px]:text-3xl"
                >
                  {String(item.value).padStart(2, "0")}
                </motion.p>
                <p className="mt-2 text-[8.5px] tracking-[0.14em] text-[var(--accent)] uppercase sm:text-[10px] sm:tracking-[0.25em]">
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
