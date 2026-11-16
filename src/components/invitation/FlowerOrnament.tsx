type Props = {
  className?: string;
};

function FlowerCenter({ x, y, r = 9 }: { x: number; y: number; r?: number }) {
  const petals = Array.from({ length: 6 }, (_, i) => {
    const angle = (i * 60 * Math.PI) / 180;
    const px = x + Math.cos(angle) * r * 1.7;
    const py = y + Math.sin(angle) * r * 1.7;
    return <circle key={i} cx={px} cy={py} r={r} />;
  });
  return (
    <g fill="none" stroke="currentColor" strokeOpacity={0.75} strokeWidth={1.5}>
      {petals}
      <circle cx={x} cy={y} r={r * 0.42} fill="currentColor" fillOpacity={0.6} stroke="none" />
    </g>
  );
}

// Dipakai inline di dalam teks (mis. "Bpk. ... (salib)"):
// - `inline-block` WAJIB: preflight Tailwind memberi `svg { display: block }`,
//   yang di tengah alur teks akan memecah baris judul jadi beberapa baris.
// - `align-baseline` menimpa `vertical-align: middle` dari preflight tersebut.
// Ukuran dipasang lewat className dalam satuan em agar ikut skala font induknya.
export function LatinCross({ className = "" }: Props) {
  return (
    <svg
      role="img"
      aria-label="salib"
      viewBox="0 0 24 24"
      className={`inline-block align-baseline text-[var(--accent)] ${className}`}
      fill="none"
    >
      <g stroke="currentColor" strokeOpacity={0.8} strokeWidth={1.7} strokeLinecap="round">
        <path d="M 12 2.6 V 21.4" />
        <path d="M 4.6 9 H 19.4" />
      </g>
    </svg>
  );
}

export function FlowerDivider({ className = "" }: Props) {
  return (
    <div
      aria-hidden
      className={`flex items-center justify-center text-[var(--accent)] flower-sway ${className}`}
    >
      <svg viewBox="0 0 320 56" className="w-full max-w-sm" fill="none">
        <g stroke="currentColor" strokeOpacity={0.45} strokeWidth={1.5} strokeLinecap="round">
          <path d="M 20 30 C 60 16, 100 40, 152 28" />
          <path d="M 300 30 C 260 16, 220 40, 168 28" />
          <path d="M 52 22 c 8 -8 16 -10 24 -8 c 2 8 -6 14 -14 14 c -8 0 -12 -2 -10 -6 Z" />
          <path d="M 268 22 c -8 -8 -16 -10 -24 -8 c -2 8 6 14 14 14 c 8 0 12 -2 10 -6 Z" />
        </g>
        <g stroke="currentColor" strokeOpacity={0.75} strokeWidth={1.5} fill="none">
          <circle cx={56} cy={26} r={5} />
          <circle cx={264} cy={26} r={5} />
        </g>
        <FlowerCenter x={160} y={28} />
      </svg>
    </div>
  );
}

export function CornerFlower({ className = "" }: Props) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 120 120"
      className={`text-[var(--accent)] flower-sway ${className}`}
      fill="none"
    >
      <g stroke="currentColor" strokeOpacity={0.5} strokeWidth={1.5} strokeLinecap="round">
        <path d="M 8 120 C 14 60, 40 26, 112 12" />
        <path d="M 120 8 C 60 14, 26 40, 12 112" />
        <path d="M 30 96 c -6 -12 -4 -22 4 -30" strokeOpacity={0.35} />
        <path d="M 96 30 c -12 -6 -22 -4 -30 4" strokeOpacity={0.35} />
      </g>
      <g stroke="currentColor" strokeOpacity={0.75} strokeWidth={1.5} fill="none">
        <circle cx={96} cy={16} r={6} />
        <circle cx={16} cy={96} r={6} />
      </g>
      <g transform="translate(96 16)">
        <g fill="none" stroke="currentColor" strokeOpacity={0.75} strokeWidth={1.5}>
          <circle cx={0} cy={-7} r={3.5} />
          <circle cx={7} cy={0} r={3.5} />
          <circle cx={0} cy={7} r={3.5} />
          <circle cx={-7} cy={0} r={3.5} />
          <circle r={1.8} fill="currentColor" fillOpacity={0.6} stroke="none" />
        </g>
      </g>
    </svg>
  );
}

export function GoldDivider({ className = "" }: Props) {
  return (
    <div
      aria-hidden
      className={`flex items-center justify-center text-[var(--accent)] ${className}`}
    >
      <svg viewBox="0 0 400 32" className="w-full max-w-md" fill="none">
        <line x1="0" y1="16" x2="180" y2="16" stroke="currentColor" strokeOpacity={0.4} strokeWidth={0.5} />
        <line x1="220" y1="16" x2="400" y2="16" stroke="currentColor" strokeOpacity={0.4} strokeWidth={0.5} />
        <line x1="160" y1="16" x2="180" y2="16" stroke="currentColor" strokeOpacity={0.7} strokeWidth={1} />
        <line x1="220" y1="16" x2="240" y2="16" stroke="currentColor" strokeOpacity={0.7} strokeWidth={1} />
        <g transform="translate(200 16)">
          <rect
            x="-7"
            y="-7"
            width="14"
            height="14"
            transform="rotate(45)"
            stroke="currentColor"
            strokeWidth={1}
            fill="none"
          />
          <rect
            x="-3.5"
            y="-3.5"
            width="7"
            height="7"
            transform="rotate(45)"
            fill="currentColor"
            fillOpacity={0.3}
            stroke="none"
          />
        </g>
        <g stroke="currentColor" strokeOpacity={0.5} strokeWidth={1} strokeLinecap="round">
          <circle cx={80} cy={16} r={1.5} fill="currentColor" fillOpacity={0.3} />
          <circle cx={320} cy={16} r={1.5} fill="currentColor" fillOpacity={0.3} />
        </g>
        <g stroke="currentColor" strokeOpacity={0.35} strokeWidth={0.8} strokeLinecap="round">
          <path d="M 170 10 C 175 6, 182 8, 180 16" />
          <path d="M 170 22 C 175 26, 182 24, 180 16" />
          <path d="M 230 10 C 225 6, 218 8, 220 16" />
          <path d="M 230 22 C 225 26, 218 24, 220 16" />
        </g>
      </svg>
    </div>
  );
}

export function VintageCornerFlower({ className = "" }: Props) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 160 160"
      className={`text-[var(--accent)] flower-sway ${className}`}
      fill="none"
    >
      <g stroke="currentColor" strokeOpacity={0.5} strokeWidth={1.2} strokeLinecap="round">
        <path d="M 10 160 C 16 90, 45 40, 150 10" />
        <path d="M 160 10 C 90 16, 40 45, 10 150" />
        <path d="M 40 120 C 30 100, 34 80, 50 68" strokeOpacity={0.3} />
        <path d="M 120 40 C 100 30, 80 34, 68 50" strokeOpacity={0.3} />
        <path d="M 55 130 C 60 115, 72 105, 85 100" strokeOpacity={0.25} />
        <path d="M 130 55 C 115 60, 105 72, 100 85" strokeOpacity={0.25} />
      </g>
      <g stroke="currentColor" strokeOpacity={0.4} strokeWidth={0.8}>
        <path d="M 45 110 c -4 -8 -2 -16 4 -20 c 6 2 8 10 4 16 c -2 3 -5 5 -8 4 Z" fill="currentColor" fillOpacity={0.08} />
        <path d="M 70 95 c -6 -4 -8 -12 -4 -18 c 6 -2 12 2 12 8 c 0 4 -3 8 -8 10 Z" fill="currentColor" fillOpacity={0.08} />
        <path d="M 110 45 c -8 -4 -16 -2 -20 4 c 2 6 10 8 16 4 c 3 -2 5 -5 4 -8 Z" fill="currentColor" fillOpacity={0.08} />
      </g>
      <g transform="translate(140 20)">
        <g fill="none" stroke="currentColor" strokeOpacity={0.7} strokeWidth={1.2}>
          <circle cx={0} cy={-9} r={4} />
          <circle cx={7.8} cy={-4.5} r={4} />
          <circle cx={7.8} cy={4.5} r={4} />
          <circle cx={0} cy={9} r={4} />
          <circle cx={-7.8} cy={4.5} r={4} />
          <circle cx={-7.8} cy={-4.5} r={4} />
          <circle r={3} fill="currentColor" fillOpacity={0.35} stroke="none" />
        </g>
      </g>
      <g transform="translate(20 140)">
        <g fill="none" stroke="currentColor" strokeOpacity={0.7} strokeWidth={1.2}>
          <circle cx={0} cy={-7} r={3.5} />
          <circle cx={6} cy={-3.5} r={3.5} />
          <circle cx={6} cy={3.5} r={3.5} />
          <circle cx={0} cy={7} r={3.5} />
          <circle cx={-6} cy={3.5} r={3.5} />
          <circle cx={-6} cy={-3.5} r={3.5} />
          <circle r={2.2} fill="currentColor" fillOpacity={0.35} stroke="none" />
        </g>
      </g>
      <g stroke="currentColor" strokeOpacity={0.6} strokeWidth={1} fill="none">
        <circle cx={90} cy={75} r={2.5} />
        <circle cx={75} cy={90} r={2.5} />
      </g>
      <g stroke="currentColor" strokeOpacity={0.3} strokeWidth={0.8} strokeLinecap="round">
        <path d="M 100 65 C 95 70, 92 78, 95 85" />
        <path d="M 65 100 C 70 95, 78 92, 85 95" />
      </g>
    </svg>
  );
}

export function LayeredRose({ className = "" }: Props) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 200 200"
      className={`text-[var(--accent)] ${className}`}
      fill="none"
    >
      <g className="bloom-layer bloom-layer-1">
        <path d="M 100 30 C 130 30, 165 50, 170 90 C 175 130, 150 165, 100 170 C 50 165, 25 130, 30 90 C 35 50, 70 30, 100 30 Z" fill="currentColor" fillOpacity={0.06} stroke="currentColor" strokeOpacity={0.15} strokeWidth={0.8} />
        <path d="M 60 55 C 75 35, 110 28, 140 50 C 160 65, 168 95, 155 125" fill="none" stroke="currentColor" strokeOpacity={0.12} strokeWidth={0.5} />
        <path d="M 140 55 C 125 35, 90 28, 60 50 C 40 65, 32 95, 45 125" fill="none" stroke="currentColor" strokeOpacity={0.12} strokeWidth={0.5} />
      </g>
      <g className="bloom-layer bloom-layer-2">
        <path d="M 100 50 C 125 48, 150 65, 152 95 C 154 120, 135 145, 100 148 C 65 145, 46 120, 48 95 C 50 65, 75 48, 100 50 Z" fill="currentColor" fillOpacity={0.1} stroke="currentColor" strokeOpacity={0.25} strokeWidth={0.8} />
        <path d="M 72 70 C 85 55, 108 50, 128 65 C 142 76, 148 98, 140 118" fill="none" stroke="currentColor" strokeOpacity={0.15} strokeWidth={0.5} />
        <path d="M 128 70 C 115 55, 92 50, 72 65 C 58 76, 52 98, 60 118" fill="none" stroke="currentColor" strokeOpacity={0.15} strokeWidth={0.5} />
      </g>
      <g className="bloom-layer bloom-layer-3">
        <path d="M 100 65 C 118 63, 135 75, 136 95 C 137 112, 122 130, 100 132 C 78 130, 63 112, 64 95 C 65 75, 82 63, 100 65 Z" fill="currentColor" fillOpacity={0.15} stroke="currentColor" strokeOpacity={0.35} strokeWidth={1} />
        <path d="M 80 82 C 88 70, 105 67, 118 78 C 128 87, 130 100, 124 112" fill="none" stroke="currentColor" strokeOpacity={0.2} strokeWidth={0.6} />
        <path d="M 120 82 C 112 70, 95 67, 82 78 C 72 87, 70 100, 76 112" fill="none" stroke="currentColor" strokeOpacity={0.2} strokeWidth={0.6} />
      </g>
      <g className="bloom-layer bloom-layer-4">
        <path d="M 100 78 C 112 77, 122 85, 122 98 C 122 108, 113 118, 100 119 C 87 118, 78 108, 78 98 C 78 85, 88 77, 100 78 Z" fill="currentColor" fillOpacity={0.2} stroke="currentColor" strokeOpacity={0.5} strokeWidth={1} />
        <circle cx={100} cy={98} r={8} fill="currentColor" fillOpacity={0.3} stroke="currentColor" strokeOpacity={0.5} strokeWidth={0.8} />
        <circle cx={100} cy={98} r={3.5} fill="currentColor" fillOpacity={0.45} stroke="none" />
        <g fill="none" stroke="currentColor" strokeOpacity={0.2} strokeWidth={0.4}>
          <path d="M 96 95 C 98 92, 102 92, 104 95" />
          <path d="M 94 100 C 96 97, 100 97, 102 100" />
          <path d="M 98 103 C 100 100, 104 100, 106 103" />
        </g>
      </g>
    </svg>
  );
}

export function LeafCluster({ className = "" }: Props) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 180 200"
      className={`text-[var(--accent)] leaf-breathe ${className}`}
      fill="none"
    >
      <g stroke="currentColor" strokeOpacity={0.35} strokeWidth={0.9} strokeLinecap="round">
        <path d="M 90 190 C 88 160, 85 120, 90 60 C 92 40, 95 25, 100 15" />
        <path d="M 90 160 C 75 145, 50 135, 35 140 C 25 143, 22 152, 30 158 C 42 166, 65 162, 90 160" fill="currentColor" fillOpacity={0.06} />
        <path d="M 50 148 C 55 152, 68 155, 80 158" strokeOpacity={0.18} strokeWidth={0.5} />
        <path d="M 90 130 C 110 115, 140 108, 155 115 C 165 120, 166 130, 158 135 C 145 142, 118 138, 90 130" fill="currentColor" fillOpacity={0.06} />
        <path d="M 135 120 C 128 124, 112 128, 100 130" strokeOpacity={0.18} strokeWidth={0.5} />
        <path d="M 90 100 C 70 85, 45 78, 30 82 C 18 86, 16 96, 25 100 C 40 108, 68 104, 90 100" fill="currentColor" fillOpacity={0.06} />
        <path d="M 45 90 C 52 94, 68 98, 82 100" strokeOpacity={0.18} strokeWidth={0.5} />
        <path d="M 92 70 C 112 55, 138 48, 150 55 C 160 60, 160 70, 152 74 C 140 80, 115 76, 92 70" fill="currentColor" fillOpacity={0.06} />
        <path d="M 130 60 C 122 64, 108 68, 96 70" strokeOpacity={0.18} strokeWidth={0.5} />
      </g>
      <g fill="currentColor" fillOpacity={0.05} stroke="currentColor" strokeOpacity={0.4} strokeWidth={0.7}>
        <path d="M 90 55 C 88 48, 82 40, 78 35 C 74 30, 78 24, 84 28 C 90 32, 92 42, 90 55 Z" />
        <path d="M 92 55 C 94 48, 100 40, 104 35 C 108 30, 104 24, 98 28 C 92 32, 90 42, 92 55 Z" />
        <circle cx={91} cy={52} r={2} fillOpacity={0.3} stroke="none" />
      </g>
    </svg>
  );
}

export function FloralSpray({ className = "" }: Props) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 240 160"
      className={`text-[var(--accent)] ${className}`}
      fill="none"
    >
      <g stroke="currentColor" strokeOpacity={0.35} strokeWidth={0.8} strokeLinecap="round">
        <path d="M 10 150 C 30 130, 60 100, 90 80 C 120 60, 155 45, 190 35 C 210 30, 225 28, 235 25" className="vine-draw" />
        <path d="M 40 140 C 50 125, 65 115, 80 108" strokeOpacity={0.25} strokeWidth={0.6} />
        <path d="M 130 68 C 140 55, 155 48, 168 42" strokeOpacity={0.25} strokeWidth={0.6} />
      </g>
      <g stroke="currentColor" strokeOpacity={0.3} strokeWidth={0.6}>
        <path d="M 55 120 c -8 -10 -5 -20 3 -24 c 8 -2 14 6 12 14 c -1 4 -4 7 -8 8 c -3 1 -5 2 -7 2 Z" fill="currentColor" fillOpacity={0.05} />
        <path d="M 140 62 c -10 -5 -12 -16 -5 -22 c 6 -5 15 -2 16 6 c 0 4 -2 8 -5 10 c -2 2 -4 4 -6 6 Z" fill="currentColor" fillOpacity={0.05} />
      </g>
      <g fill="none" stroke="currentColor" strokeOpacity={0.5} strokeWidth={0.9}>
        <g transform="translate(95 78)">
          <path d="M 0 -11 C 4 -9, 7 -5, 5 0 C 3 4, -1 7, -4 4 C -8 1, -9 -3, -5 -7 C -2 -10, 1 -12, 0 -11 Z" fill="currentColor" fillOpacity={0.08} />
          <path d="M 0 -11 C -4 -9, -7 -5, -5 0 C -3 4, 1 7, 4 4 C 8 1, 9 -3, 5 -7 C 2 -10, -1 -12, 0 -11 Z" fill="currentColor" fillOpacity={0.08} />
          <path d="M -11 0 C -9 4, -5 7, 0 5 C 4 3, 7 -1, 4 -4 C 1 -8, -3 -9, -7 -5 C -10 -2, -12 1, -11 0 Z" fill="currentColor" fillOpacity={0.08} />
          <path d="M 11 0 C 9 -4, 5 -7, 0 -5 C -4 -3, -7 1, -4 4 C -1 8, 3 9, 7 5 C 10 2, 12 -1, 11 0 Z" fill="currentColor" fillOpacity={0.08} />
          <circle r={3} fill="currentColor" fillOpacity={0.25} />
          <circle r={1.3} fill="currentColor" fillOpacity={0.4} stroke="none" />
        </g>
      </g>
      <g fill="none" stroke="currentColor" strokeOpacity={0.45} strokeWidth={0.8}>
        <g transform="translate(190 33)">
          <circle cx={0} cy={-5.5} r={2.8} />
          <circle cx={4.8} cy={-2.8} r={2.8} />
          <circle cx={4.8} cy={2.8} r={2.8} />
          <circle cx={0} cy={5.5} r={2.8} />
          <circle cx={-4.8} cy={2.8} r={2.8} />
          <circle cx={-4.8} cy={-2.8} r={2.8} />
          <circle r={1.8} fill="currentColor" fillOpacity={0.25} stroke="none" />
        </g>
        <g transform="translate(30 142)">
          <circle cx={0} cy={-4.5} r={2.2} />
          <circle cx={3.9} cy={-2.3} r={2.2} />
          <circle cx={3.9} cy={2.3} r={2.2} />
          <circle cx={0} cy={4.5} r={2.2} />
          <circle cx={-3.9} cy={2.3} r={2.2} />
          <circle cx={-3.9} cy={-2.3} r={2.2} />
          <circle r={1.3} fill="currentColor" fillOpacity={0.2} stroke="none" />
        </g>
      </g>
    </svg>
  );
}

type VineRunnerProps = {
  className?: string;
  orientation?: "horizontal" | "vertical";
};

export function VineRunner({
  className = "",
  orientation = "horizontal",
}: VineRunnerProps) {
  const isVertical = orientation === "vertical";
  return (
    <svg
      aria-hidden
      viewBox={isVertical ? "0 0 40 400" : "0 0 400 40"}
      className={`text-[var(--accent)] ${className}`}
      fill="none"
      preserveAspectRatio="none"
    >
      <path
        d={
          isVertical
            ? "M 20 0 C 25 40, 15 80, 20 120 C 25 160, 15 200, 20 240 C 25 280, 15 320, 20 360 C 22 380, 20 400, 20 400"
            : "M 0 20 C 40 15, 80 25, 120 20 C 160 15, 200 25, 240 20 C 280 15, 320 25, 360 20 C 380 18, 400 20, 400 20"
        }
        stroke="currentColor"
        strokeOpacity={0.25}
        strokeWidth={0.7}
        strokeLinecap="round"
        className="vine-draw"
      />
      {isVertical ? (
        <g fill="currentColor" fillOpacity={0.05} stroke="currentColor" strokeOpacity={0.25} strokeWidth={0.5}>
          <path d="M 20 60 C 30 50, 35 45, 32 55 C 29 62, 22 62, 20 60 Z" />
          <path d="M 20 140 C 10 130, 5 125, 8 135 C 11 142, 18 142, 20 140 Z" />
          <path d="M 20 220 C 30 210, 35 205, 32 215 C 29 222, 22 222, 20 220 Z" />
          <path d="M 20 300 C 10 290, 5 285, 8 295 C 11 302, 18 302, 20 300 Z" />
          <circle cx={20} cy={100} r={1.3} fillOpacity={0.2} stroke="none" />
          <circle cx={20} cy={180} r={1.3} fillOpacity={0.2} stroke="none" />
          <circle cx={20} cy={260} r={1.3} fillOpacity={0.2} stroke="none" />
          <circle cx={20} cy={340} r={1.3} fillOpacity={0.2} stroke="none" />
        </g>
      ) : (
        <g fill="currentColor" fillOpacity={0.05} stroke="currentColor" strokeOpacity={0.25} strokeWidth={0.5}>
          <path d="M 60 20 C 50 10, 45 5, 55 8 C 62 11, 62 18, 60 20 Z" />
          <path d="M 140 20 C 130 30, 125 35, 135 32 C 142 29, 142 22, 140 20 Z" />
          <path d="M 220 20 C 210 10, 205 5, 215 8 C 222 11, 222 18, 220 20 Z" />
          <path d="M 300 20 C 290 30, 285 35, 295 32 C 302 29, 302 22, 300 20 Z" />
          <circle cx={100} cy={20} r={1.3} fillOpacity={0.2} stroke="none" />
          <circle cx={180} cy={20} r={1.3} fillOpacity={0.2} stroke="none" />
          <circle cx={260} cy={20} r={1.3} fillOpacity={0.2} stroke="none" />
          <circle cx={340} cy={20} r={1.3} fillOpacity={0.2} stroke="none" />
        </g>
      )}
    </svg>
  );
}

export function VintageFlowerDivider({ className = "" }: Props) {
  return (
    <div
      aria-hidden
      className={`flex items-center justify-center text-[var(--accent)] flower-sway ${className}`}
    >
      <svg viewBox="0 0 480 64" className="w-full max-w-lg" fill="none">
        <g stroke="currentColor" strokeOpacity={0.35} strokeWidth={0.8} strokeLinecap="round">
          <path d="M 20 34 C 60 18, 110 44, 170 32" />
          <path d="M 310 32 C 370 44, 420 18, 460 34" />
        </g>
        <g stroke="currentColor" strokeOpacity={0.4} strokeWidth={0.8}>
          <path d="M 60 26 c 6 -6 14 -8 20 -4 c 2 6 -4 12 -12 10 c -4 -1 -7 -3 -8 -6 Z" fill="currentColor" fillOpacity={0.06} />
          <path d="M 120 22 c 8 -4 16 -2 18 4 c -2 6 -10 8 -16 4 c -3 -2 -4 -5 -2 -8 Z" fill="currentColor" fillOpacity={0.06} />
          <path d="M 340 22 c -8 -4 -16 -2 -18 4 c 2 6 10 8 16 4 c 3 -2 4 -5 2 -8 Z" fill="currentColor" fillOpacity={0.06} />
          <path d="M 400 26 c -6 -6 -14 -8 -20 -4 c -2 6 4 12 12 10 c 4 -1 7 -3 8 -6 Z" fill="currentColor" fillOpacity={0.06} />
        </g>
        <line x1="170" y1="32" x2="205" y2="32" stroke="currentColor" strokeOpacity={0.5} strokeWidth={0.8} />
        <line x1="275" y1="32" x2="310" y2="32" stroke="currentColor" strokeOpacity={0.5} strokeWidth={0.8} />
        <g transform="translate(240 32)">
          <g fill="none" stroke="currentColor" strokeOpacity={0.65} strokeWidth={1.2}>
            <circle cx={0} cy={-10} r={5} />
            <circle cx={8.7} cy={-5} r={5} />
            <circle cx={8.7} cy={5} r={5} />
            <circle cx={0} cy={10} r={5} />
            <circle cx={-8.7} cy={5} r={5} />
            <circle cx={-8.7} cy={-5} r={5} />
            <circle r={3.5} fill="currentColor" fillOpacity={0.25} stroke="none" />
          </g>
        </g>
        <g stroke="currentColor" strokeOpacity={0.45} strokeWidth={1} fill="none">
          <circle cx={195} cy={32} r={2} fill="currentColor" fillOpacity={0.2} />
          <circle cx={285} cy={32} r={2} fill="currentColor" fillOpacity={0.2} />
        </g>
      </svg>
    </div>
  );
}
