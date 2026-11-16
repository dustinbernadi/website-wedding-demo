"use client";

import { useState } from "react";

type Props = {
  src: string;
  alt?: string;
  className?: string;
  loading?: "eager" | "lazy";
  decoding?: "async" | "sync" | "auto";
  fetchPriority?: "high" | "low" | "auto";
};

export default function FadeImage({
  src,
  alt = "",
  className = "",
  loading = "lazy",
  decoding = "async",
  fetchPriority,
}: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      decoding={decoding}
      fetchPriority={fetchPriority}
      ref={(el) => {
        if (el?.complete) setLoaded(true);
      }}
      onLoad={() => setLoaded(true)}
      className={[
        className,
        "transition-opacity duration-700 ease-out",
        loaded ? "opacity-100" : "opacity-0",
      ].join(" ")}
    />
  );
}
