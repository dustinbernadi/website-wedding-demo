import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public", "portraits");

const palettes = {
  rose: { paper: "#FDF6F3", soft: "#F2DCE3", deep: "#DCAEBD", accent: "#B0536B", ink: "#8E4054" },
  emerald: { paper: "#FBFDF9", soft: "#DCE8E0", deep: "#B4CDBF", accent: "#2E6B4F", ink: "#23543D" },
  gold: { paper: "#FDFBF4", soft: "#EDE0C2", deep: "#D8C08F", accent: "#A9802F", ink: "#8A6622" },
  sapphire: { paper: "#F8FAFD", soft: "#D7E3EF", deep: "#AFC5DC", accent: "#3E6B9E", ink: "#2F527C" },
  lavender: { paper: "#FBFAFD", soft: "#E2D8EF", deep: "#C5B4DC", accent: "#7A5C9E", ink: "#5F4780" },
  terracotta: { paper: "#FDFAF6", soft: "#EEDDD0", deep: "#DCBBA4", accent: "#B0662E", ink: "#93511F" },
  champagne: { paper: "#FBF7EF", soft: "#E9D8B3", deep: "#CFB47E", accent: "#B5905B", ink: "#96763F" },
  "vintage-gold": { paper: "#FDFBF7", soft: "#F3EAD3", deep: "#C9A96B", accent: "#B87018", ink: "#88480C" },
};

const r = (n) => Number(n.toFixed(1));

function blossom(cx, cy, s = 1, rot = 0) {
  const petals = Array.from({ length: 6 }, (_, k) => {
    const a = ((k * 60 + rot) * Math.PI) / 180;
    const px = cx + Math.cos(a) * 16 * s;
    const py = cy + Math.sin(a) * 16 * s;
    return `<circle cx="${r(px)}" cy="${r(py)}" r="${r(8.5 * s)}"/>`;
  }).join("");
  return `<g fill="none" stroke="currentColor" stroke-opacity="0.8" stroke-width="2">
    ${petals}
    <circle cx="${cx}" cy="${cy}" r="${r(3.6 * s)}" fill="currentColor" fill-opacity="0.6" stroke="none"/>
  </g>`;
}

function leaf(x, y, rot, s = 1) {
  return `<path transform="translate(${x} ${y}) rotate(${rot}) scale(${s})" d="M0 0 C 14 -9 25 -5 27 5 C 14 10 4 8 0 0 Z" fill="currentColor" fill-opacity="0.45" stroke="none"/>`;
}

function stem(x1, y1, x2, y2, cx1, cy1) {
  return `<path d="M ${x1} ${y1} Q ${cx1} ${cy1} ${x2} ${y2}" fill="none" stroke="currentColor" stroke-width="2" stroke-opacity="0.5" stroke-linecap="round"/>`;
}

const BRIDE_FIGURE = `
  <circle cx="400" cy="298" r="38" fill="currentColor" fill-opacity="0.22"/>
  <path d="M 384 262
    C 380 280 342 290 342 306
    C 342 348 360 388 396 430
    C 340 460 330 490 330 508
    L 470 508
    C 470 490 460 460 404 430
    C 440 388 458 348 458 306
    C 458 290 420 280 416 262 Z"
    fill="currentColor" fill-opacity="0.22" stroke="none"/>
`;

const GROOM_FIGURE = `
  <circle cx="400" cy="300" r="36" fill="currentColor" fill-opacity="0.2"/>
  <path d="M 384 268
    C 382 282 352 290 352 304
    C 352 362 368 400 376 442
    C 364 462 360 484 360 502
    L 440 502
    C 440 484 436 462 424 442
    C 432 400 448 362 448 304
    C 448 290 418 282 416 268 Z"
    fill="currentColor" fill-opacity="0.2" stroke="none"/>
`;

function arch(x, top, base, inset) {
  const w = 210;
  const topY = top + inset;
  const baseY = base - inset * 2;
  const wx = w - inset;
  return `<path d="M ${r(x - wx)} ${r(baseY)}
    L ${r(x - wx)} ${r(topY)}
    Q ${x} ${r(topY - wx)} ${r(x + wx)} ${r(topY)}
    L ${r(x + wx)} ${r(baseY)}" fill="none" stroke="currentColor" stroke-width="1.5" stroke-opacity="0.5" stroke-linecap="round"/>`;
}

function portrait(name, p, figure, accentTop) {
  const floaters = [
    [180, 300, 9, 19, 26],
    [640, 260, 8, 17, -34],
    [230, 720, 10, 20, -12],
    [640, 640, 9, 18, 20],
    [470, 150, 7, 14, 44],
  ]
    .map(
      ([x, y, rx, ry, a]) =>
        `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" transform="rotate(${a} ${x} ${y})" fill="none" stroke="${p.accent}" stroke-opacity="0.5" stroke-width="2"/>`,
    )
    .join("");

  const cornerTL = [
    stem(96, 250, 40, 170, 78, 190),
    blossom(40, 166, 0.85, 16),
    blossom(94, 238, 0.5, 60),
    leaf(70, 196, -38, 0.9),
  ].join("");
  const cornerBR = [
    stem(706, 748, 762, 826, 716, 806),
    blossom(766, 830, 0.85, 50),
    leaf(736, 798, 38, 0.9),
  ].join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" viewBox="0 0 800 1000" role="img" aria-label="${name}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0.4" y2="1">
      <stop offset="0%" stop-color="${p.paper}"/>
      <stop offset="55%" stop-color="${p.soft}"/>
      <stop offset="100%" stop-color="${p.deep}"/>
    </linearGradient>
    <radialGradient id="halo" cx="0.5" cy="0.4" r="0.55">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.7"/>
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="vignette" cx="0.5" cy="0.5" r="0.78">
      <stop offset="0%" stop-color="${p.ink}" stop-opacity="0"/>
      <stop offset="100%" stop-color="${p.ink}" stop-opacity="0.18"/>
    </radialGradient>
  </defs>
  <rect width="800" height="1000" fill="url(#bg)"/>
  <rect width="800" height="1000" fill="url(#halo)"/>
  <g color="${p.accent}">
    ${cornerTL}
    ${cornerBR}
  </g>
  <g color="${p.accent}">${floaters}</g>
  <g color="${p.accent}" aria-hidden="true">
    ${arch(400, 300, 840, 0)}
    ${arch(400, 300, 840, 14)}
  </g>
  <g color="${p.ink}" aria-hidden="true">${figure}</g>
  <g color="${p.accent}">${accentTop}</g>
  <rect x="40" y="40" width="720" height="920" rx="10" fill="none" stroke="${p.accent}" stroke-opacity="0.28" stroke-width="1.5"/>
  <rect x="52" y="52" width="696" height="896" rx="8" fill="none" stroke="${p.accent}" stroke-opacity="0.14" stroke-width="1"/>
  <rect width="800" height="1000" fill="url(#vignette)"/>
</svg>
`;
}

const BRIDE_ACCENT = blossom(250, 870, 0.75, 20) + blossom(550, 800, 0.5, 70);
const GROOM_ACCENT = blossom(550, 870, 0.75, 40) + blossom(250, 800, 0.5, 100);

mkdirSync(outDir, { recursive: true });
Object.entries(palettes).forEach(([name, palette]) => {
  writeFileSync(
    join(outDir, `groom-${name}.svg`),
    portrait(name, palette, GROOM_FIGURE, GROOM_ACCENT),
  );
  writeFileSync(
    join(outDir, `bride-${name}.svg`),
    portrait(name, palette, BRIDE_FIGURE, BRIDE_ACCENT),
  );
  console.log(`wrote groom-${name}.svg, bride-${name}.svg`);
});