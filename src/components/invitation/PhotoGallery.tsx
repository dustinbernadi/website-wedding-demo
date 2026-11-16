"use client";

import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "motion/react";
import { EASE } from "./motion";

type Photo = { id: string; url: string; alt: string | null };

export default function PhotoGallery({ photos }: { photos: Photo[] }) {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const next = useCallback(() => {
    setLightbox((c) => (c !== null ? (c + 1) % photos.length : null));
  }, [photos.length]);

  const prev = useCallback(() => {
    setLightbox((c) =>
      c !== null ? (c - 1 + photos.length) % photos.length : null,
    );
  }, [photos.length]);

  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [lightbox, next, prev]);

  return (
    <>
      <motion.div
        className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.06 } },
        }}
      >
        {photos.map((photo, i) => {
          return (
            <motion.button
              key={photo.id}
              type="button"
              onClick={() => setLightbox(i)}
              className="group relative aspect-square overflow-hidden border border-[var(--accent)]/20 bg-[var(--accent-soft)]/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
              }}
              whileTap={{ scale: 0.97 }}
            >
              <img
                src={photo.url}
                alt={photo.alt ?? `Foto galeri ${i + 1}`}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover object-[50%_25%] transition-transform duration-500 group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 border border-[var(--accent)]/10 opacity-0 transition-opacity group-hover:opacity-100" style={{ margin: 4 }} />
            </motion.button>
          );
        })}
      </motion.div>

      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            key="lightbox"
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#FDFBF7]/95 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setLightbox(null)}
          >
            <motion.button
              type="button"
              className="absolute top-4 right-4 z-10 border border-[var(--accent)]/30 bg-[var(--paper)] p-3 text-[var(--accent)] transition-colors hover:bg-[var(--accent)] hover:text-[var(--paper)]"
              onClick={(e) => {
                e.stopPropagation();
                setLightbox(null);
              }}
            >
              <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path d="M6 6l12 12M6 18L18 6" />
              </svg>
            </motion.button>

            {photos.length > 1 && (
              <>
                <button
                  type="button"
                  className="absolute left-3 z-10 border border-[var(--accent)]/30 bg-[var(--paper)] p-3 text-[var(--accent)] transition-colors hover:bg-[var(--accent)] hover:text-[var(--paper)] sm:left-6"
                  onClick={(e) => {
                    e.stopPropagation();
                    prev();
                  }}
                >
                  <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="absolute right-3 z-10 border border-[var(--accent)]/30 bg-[var(--paper)] p-3 text-[var(--accent)] transition-colors hover:bg-[var(--accent)] hover:text-[var(--paper)] sm:right-6"
                  onClick={(e) => {
                    e.stopPropagation();
                    next();
                  }}
                >
                  <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </>
            )}

            <motion.img
              key={lightbox}
              src={photos[lightbox].url}
              alt={photos[lightbox].alt ?? `Foto galeri ${lightbox + 1}`}
              className="max-h-[85vh] max-w-[90vw] border border-[var(--accent)]/20 object-contain"
              initial={{ scale: 0.96, opacity: 0.5 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
            />

            <div className="absolute bottom-6 text-center">
              <p className="text-xs tracking-[0.3em] text-[var(--accent)] uppercase">
                {lightbox + 1} / {photos.length}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
