import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public", "covers");

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
    const px = cx + Math.cos(a) * 22 * s;
    const py = cy + Math.sin(a) * 22 * s;
    return `<circle cx="${r(px)}" cy="${r(py)}" r="${r(12 * s)}"/>`;
  }).join("");
  return `<g fill="none" stroke="currentColor" stroke-opacity="0.8" stroke-width="2">
    ${petals}
    <circle cx="${cx}" cy="${cy}" r="${r(5 * s)}" fill="currentColor" fill-opacity="0.6" stroke="none"/>
  </g>`;
}

function leaf(x, y, rot, s = 1) {
  return `<path transform="translate(${x} ${y}) rotate(${rot}) scale(${s})" d="M0 0 C 17 -11 30 -6 32 7 C 17 13 5 10 0 0 Z" fill="currentColor" fill-opacity="0.42" stroke="none"/>`;
}

function stem(x1, y1, x2, y2, cx1, cy1) {
  return `<path d="M ${x1} ${y1} Q ${cx1} ${cy1} ${x2} ${y2}" fill="none" stroke="currentColor" stroke-width="2.5" stroke-opacity="0.55" stroke-linecap="round"/>`;
}

const FLOATERS = [
  [170, 540, 9, 20, 14],
  [1010, 610, 11, 23, -24],
  [860, 360, 8, 17, 32],
  [330, 200, 9, 18, -16],
  [1040, 760, 7, 15, 10],
];

function cover(name, p) {
  const cornerTL = [
    stem(120, 300, 52, 210, 96, 236),
    blossom(52, 206, 0.9, 10),
    blossom(118, 288, 0.55, 70),
    leaf(88, 244, -38, 1),
    leaf(66, 196, 22, 0.8),
  ].join("");
  const cornerTR = [
    stem(1080, 300, 1148, 210, 1104, 236),
    blossom(1148, 206, 0.9, 40),
    leaf(1112, 244, 38, 1),
    leaf(1134, 196, -22, 0.8),
  ].join("");

  const garland = [
    stem(360, 1520, 600, 1410, 470, 1500),
    stem(840, 1520, 600, 1410, 730, 1500),
    blossom(360, 1526, 0.6, 20),
    blossom(840, 1526, 0.6, 60),
    blossom(600, 1404, 0.95, 40),
    blossom(470, 1466, 0.5, 80),
    blossom(730, 1466, 0.5, 0),
    leaf(520, 1478, -12, 0.9),
    leaf(680, 1478, 12, 0.9),
  ].join("");

  const floaters = FLOATERS.map(
    ([x, y, rx, ry, a]) =>
      `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" transform="rotate(${a} ${x} ${y})" fill="none" stroke="${p.accent}" stroke-opacity="0.5" stroke-width="2"/>`,
  ).join("");

  const petals = [
    [150, 620, 170, 240],
    [1050, 900, 130, 210],
    [220, 1240, 140, 200],
    [980, 330, 90, 150],
  ]
    .map(
      ([x, y, rx, ry]) =>
        `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${p.soft}" opacity="0.5" filter="url(#blurWash)"/>`,
    )
    .join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1600" viewBox="0 0 1200 1600" role="img" aria-label="${name}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0.35" y2="1">
      <stop offset="0%" stop-color="${p.paper}"/>
      <stop offset="55%" stop-color="${p.soft}"/>
      <stop offset="100%" stop-color="${p.deep}"/>
    </linearGradient>
    <radialGradient id="halo" cx="0.5" cy="0.4" r="0.5">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.7"/>
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="vignette" cx="0.5" cy="0.48" r="0.78">
      <stop offset="0%" stop-color="${p.ink}" stop-opacity="0"/>
      <stop offset="100%" stop-color="${p.ink}" stop-opacity="0.22"/>
    </radialGradient>
    <filter id="blurWash" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="30"/>
    </filter>
  </defs>
  <rect width="1200" height="1600" fill="url(#bg)"/>
  <rect width="1200" height="1600" fill="url(#halo)"/>
  ${petals}
  <g color="${p.accent}">
    ${cornerTL}
    ${cornerTR}
    ${garland}
  </g>
  <g color="${p.accent}">${floaters}</g>
  <rect x="44" y="44" width="1112" height="1512" rx="14" fill="none" stroke="${p.accent}" stroke-opacity="0.3" stroke-width="1.5"/>
  <rect x="58" y="58" width="1084" height="1484" rx="10" fill="none" stroke="${p.accent}" stroke-opacity="0.15" stroke-width="1"/>
  <rect width="1200" height="1600" fill="url(#vignette)"/>
</svg>
`;
}

mkdirSync(outDir, { recursive: true });
Object.entries(palettes).forEach(([name, palette]) => {
  const file = join(outDir, `cover-${name}.svg`);
  writeFileSync(file, cover(name, palette));
  console.log(`wrote ${file}`);
});