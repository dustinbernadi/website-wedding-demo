"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { themeVars } from "@/lib/themes";
import { Entrance } from "./motion";
import { GoldDivider } from "./FlowerOrnament";

type Props = {
  guestName: string | null;
  groomName: string;
  brideName: string;
  dateLabel: string;
  themeColor: string;
  gateImage?: string | null;
  children: React.ReactNode;
};

export default function OpenGate({
  guestName,
  groomName,
  brideName,
  dateLabel,
  themeColor,
  gateImage,
  children,
}: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = "hidden";
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <AnimatePresence>
        {!open && (
          <motion.div
            key="gate"
            style={themeVars(themeColor)}
            className="relative z-50 flex h-[100dvh] flex-col overflow-hidden bg-[var(--paper)]"
            exit={{
              opacity: 0,
              scale: 1.04,
              filter: "blur(6px)",
              transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
            }}
          >
            {gateImage && (
              <div aria-hidden className="absolute inset-0">
                <img
                  src={gateImage}
                  alt=""
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/25" />
                <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black/60 via-black/20 to-transparent sm:h-96" />
              </div>
            )}

            <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-4 pt-16 pb-32 text-center sm:px-8">
              <div className="flex w-full max-w-md flex-col items-center text-center">
                <Entrance>
                  <img
                    src="/logo/logo.png"
                    alt={`Logo ${groomName} & ${brideName}`}
                    width={500}
                    height={500}
                    className="mx-auto mb-5 block w-20 object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] sm:w-28"
                  />
                  <p className="mb-5 text-[11px] font-semibold tracking-[0.45em] text-[#E5C158] uppercase [text-shadow:0_1px_2px_rgba(0,0,0,0.8)]">
                    The Wedding Of
                  </p>
                  <h1 className="font-headline text-3xl leading-tight tracking-wide text-[#FAFAFA] [text-shadow:0_1px_3px_rgba(0,0,0,0.85)] sm:text-5xl">
                    {groomName}
                  </h1>
                  <GoldDivider className="my-4 !text-[#E5C158]" />
                  <h2 className="font-headline text-3xl leading-tight tracking-wide text-[#FAFAFA] [text-shadow:0_1px_3px_rgba(0,0,0,0.85)] sm:text-5xl">
                    {brideName}
                  </h2>
                  <p className="mt-5 font-display text-base font-medium tracking-wide text-[#E5C158] italic [text-shadow:0_1px_2px_rgba(0,0,0,0.8)] sm:text-lg">
                    {dateLabel}
                  </p>
                </Entrance>
              </div>
            </div>

            <div className="absolute inset-x-0 bottom-0 z-20 px-4 pb-6 sm:px-8 sm:pb-8">
              <div className="mx-auto w-full max-w-md">
                <div className="mb-3 w-full border border-white/25 bg-white/15 px-4 py-3 shadow-[0_8px_24px_rgba(0,0,0,0.35)] backdrop-blur-md">
                  <p className="text-[10px] tracking-[0.3em] text-[#E5C158] uppercase">
                    Kepada Yth. Bapak/Ibu/Saudara/i
                  </p>
                  <p className="mt-1 font-display text-lg text-[#FAFAFA] italic">
                    {guestName ?? "Tamu Undangan"}
                  </p>
                </div>
                <motion.button
                  type="button"
                  onClick={() => {
                    setOpen(true);
                    window.dispatchEvent(new CustomEvent("gate:open"));
                  }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full border border-[#E5C158] bg-white/10 px-6 py-3 font-display text-lg italic text-[#E5C158] backdrop-blur-sm transition-colors hover:bg-[#E5C158] hover:text-[#201810] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E5C158]"
                >
                  Buka Undangan
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="flex flex-1 flex-col"
        >
          {children}
        </motion.div>
      )}
    </>
  );
}
