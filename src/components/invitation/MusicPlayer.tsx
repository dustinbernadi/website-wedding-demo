"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { EASE } from "./motion";

type Props = {
  src: string;
};

export default function MusicPlayer({ src }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    function startAudio() {
      window.removeEventListener("gate:open", startAudio);
      setEntered(true);
      const audio = new Audio(src);
      audio.loop = true;
      audio.volume = 0.5;
      audio.addEventListener("error", () => setHidden(true));
      audioRef.current = audio;
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => {});
    }

    window.addEventListener("gate:open", startAudio);
    return () => {
      window.removeEventListener("gate:open", startAudio);
      const audio = audioRef.current;
      if (audio) {
        audio.pause();
        audio.src = "";
        audioRef.current = null;
      }
    };
  }, [src]);

  if (hidden || !entered) return null;

  function toggle() {
    let audio = audioRef.current;
    if (!audio) {
      audio = new Audio(src);
      audio.loop = true;
      audio.volume = 0.5;
      audio.addEventListener("error", () => setHidden(true));
      audioRef.current = audio;
    }
    if (audio.paused) {
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => {});
    } else {
      audio.pause();
      setPlaying(false);
    }
  }

  return (
    <motion.button
      type="button"
      onClick={toggle}
      aria-label={playing ? "Jeda musik" : "Putar musik"}
      aria-pressed={playing}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: EASE, delay: 0.35 }}
      className="pointer-events-auto absolute top-5 right-5 z-40 flex size-14 items-center justify-center rounded-full border border-[var(--accent)] bg-[var(--paper)] text-[var(--accent)] shadow-lg transition-all hover:bg-[var(--accent)] hover:text-[var(--paper)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
    >
      {playing ? (
        <span className="flex h-5 items-center gap-[3px]" aria-hidden>
          <span className="eq-bar h-4 w-[3px] bg-current" />
          <span className="eq-bar h-4 w-[3px] bg-current" />
          <span className="eq-bar h-4 w-[3px] bg-current" />
        </span>
      ) : (
        <svg
          aria-hidden
          className="ml-0.5 size-5"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6.5 4.5 15 10 6.5 15.5v-11Z" />
        </svg>
      )}
    </motion.button>
  );
}
