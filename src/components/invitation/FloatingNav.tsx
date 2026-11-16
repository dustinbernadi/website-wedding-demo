"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { EASE } from "./motion";

const ITEMS = [
  { id: "beranda", label: "Beranda", icon: "home" },
  { id: "mempelai", label: "Mempelai", icon: "heart" },
  { id: "tanggal", label: "Tanggal", icon: "calendar" },
  { id: "galeri", label: "Galeri", icon: "image" },
  { id: "ucapan", label: "Ucapan", icon: "comment" },
] as const;

function Icon({ name }: { name: (typeof ITEMS)[number]["icon"] }) {
  const common = {
    "aria-hidden": true,
    className: "size-4 sm:size-5",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (name) {
    case "home":
      return (
        <svg {...common}>
          <path d="M3 10.5 12 3l9 7.5" />
          <path d="M5 9.5V21h14V9.5" />
        </svg>
      );
    case "heart":
      return (
        <svg {...common}>
          <path d="M12 20.5s-7.5-4.7-9.3-9.2C1.5 7.9 3.9 4.7 7.2 4.7c1.9 0 3.5 1 4.8 2.7 1.3-1.7 2.9-2.7 4.8-2.7 3.3 0 5.7 3.2 4.5 6.6-1.8 4.5-9.3 9.2-9.3 9.2Z" />
        </svg>
      );
    case "calendar":
      return (
        <svg {...common}>
          <rect x="4" y="5" width="16" height="16" rx="2" />
          <path d="M8 3v4M16 3v4M4 11h16" />
        </svg>
      );
    case "image":
      return (
        <svg {...common}>
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <circle cx="9" cy="9" r="1.6" />
          <path d="m5 17 5-4 3 2 4-4 3 3" />
        </svg>
      );
    case "comment":
      return (
        <svg {...common}>
          <path d="M21 12a8 8 0 0 1-8 8H4l2-3a8 8 0 1 1 15-5Z" />
          <path d="M8.5 10h7M8.5 13.5h4" />
        </svg>
      );
  }
}

export default function FloatingNav() {
  const [active, setActive] = useState<string>("beranda");
  const [entered, setEntered] = useState(false);
  const lockRef = useRef(false);
  const unlockTimerRef = useRef<number | null>(null);

  useEffect(() => {
    function onOpen() {
      setEntered(true);
    }
    window.addEventListener("gate:open", onOpen);
    return () => window.removeEventListener("gate:open", onOpen);
  }, []);

  useEffect(() => {
    if (!entered) return;
    const sections = ITEMS
      .map((item) => document.getElementById(item.id))
      .filter((element): element is HTMLElement => element !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (lockRef.current) return;
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => ({
            id: entry.target.id,
            top: entry.boundingClientRect.top,
          }))
          .sort((a, b) => a.top - b.top);
        if (visible.length > 0) setActive(visible[0].id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => {
      observer.disconnect();
      if (unlockTimerRef.current !== null) {
        window.clearTimeout(unlockTimerRef.current);
      }
    };
  }, [entered]);

  if (!entered) return null;

  function goTo(id: string) {
    setActive(id);
    lockRef.current = true;
    if (unlockTimerRef.current !== null) {
      window.clearTimeout(unlockTimerRef.current);
    }
    unlockTimerRef.current = window.setTimeout(() => {
      lockRef.current = false;
    }, 900);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <motion.nav
      aria-label="Navigasi undangan"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: EASE, delay: 0.35 }}
      className="pointer-events-auto absolute bottom-3 left-1/2 z-40 -translate-x-1/2 sm:bottom-4"
    >
      <ul className="flex items-center gap-0 rounded-2xl border border-[var(--accent)]/40 bg-[var(--paper)]/95 px-1.5 py-1 shadow-lg backdrop-blur sm:gap-0.5 sm:px-2 sm:py-1.5">
        {ITEMS.map((item) => {
          const isActive = active === item.id;
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => goTo(item.id)}
                aria-current={isActive ? "page" : undefined}
                className={[
                  "relative flex flex-col items-center gap-0.5 rounded-2xl px-2 py-1.5 transition-colors sm:px-3 sm:py-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]",
                  isActive
                    ? "text-[var(--accent)]"
                    : "text-[var(--ink-muted)] hover:text-[var(--accent)]",
                ].join(" ")}
              >
                {isActive && (
                  <motion.span
                    layoutId="active-nav-pill"
                    className="absolute inset-0 rounded-2xl bg-[var(--accent-soft)]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">
                  <Icon name={item.icon} />
                </span>
                <span className="relative text-[8px] tracking-[0.18em] uppercase sm:text-[9px] sm:tracking-[0.2em]">
                  {item.label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </motion.nav>
  );
}
