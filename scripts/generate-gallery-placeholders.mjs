import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public", "gallery");

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
    const px = cx + Math.cos(a) * 20 * s;
    const py = cy + Math.sin(a) * 20 * s;
    return `<circle cx="${r(px)}" cy="${r(py)}" r="${r(11 * s)}"/>`;
  }).join("");
  return `<g fill="none" stroke="currentColor" stroke-opacity="0.8" stroke-width="2">
    ${petals}
    <circle cx="${cx}" cy="${cy}" r="${r(4.5 * s)}" fill="currentColor" fill-opacity="0.6" stroke="none"/>
  </g>`;
}

function leaf(x, y, rot, s = 1) {
  return `<path transform="translate(${x} ${y}) rotate(${rot}) scale(${s})" d="M0 0 C 16 -10 28 -5 30 6 C 16 12 5 9 0 0 Z" fill="currentColor" fill-opacity="0.45" stroke="none"/>`;
}

function stem(x1, y1, x2, y2, cx1, cy1) {
  return `<path d="M ${x1} ${y1} Q ${cx1} ${cy1} ${x2} ${y2}" fill="none" stroke="currentColor" stroke-width="2.5" stroke-opacity="0.55" stroke-linecap="round"/>`;
}

const WASH = [
  [168, 216, 150, 95, -26],
  [736, 704, 170, 105, 34],
  [560, 148, 128, 82, 58],
  [96, 640, 110, 78, 18],
];

const FLOATERS = [
  [132, 318, 9, 20, 14],
  [252, 486, 11, 23, 42],
  [664, 262, 8, 17, -32],
  [622, 616, 10, 21, 22],
  [372, 768, 9, 18, -14],
  [700, 432, 7, 15, 8],
];

const BOKEH = [
  [210, 150, 46],
  [700, 240, 34],
  [150, 720, 40],
  [760, 700, 26],
  [520, 820, 30],
  [320, 120, 22],
];

const ROTATIONS = [0, 90, 180, 270, 90, 270];

function scene(name, p, index) {
  const wash = WASH.map(
    ([x, y, rx, ry, a]) =>
      `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" transform="rotate(${a} ${x} ${y})" fill="${p.soft}" opacity="0.5" filter="url(#blurWash)"/>`,
  ).join("");
  const bokeh = BOKEH.map(
    ([x, y, rad]) =>
      `<circle cx="${x}" cy="${y}" r="${rad}" fill="#FFFFFF" opacity="0.35" filter="url(#blurSoft)"/>`,
  ).join("");
  const floaters = FLOATERS.map(
    ([x, y, rx, ry, a]) =>
      `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" transform="rotate(${a} ${x} ${y})" fill="none" stroke="${p.accent}" stroke-opacity="0.55" stroke-width="2"/>`,
  ).join("");

  const corner = [
    stem(120, 220, 46, 150, 110, 160),
    blossom(46, 146, 1, 12),
    blossom(118, 210, 0.62, 78),
    leaf(96, 170, -38, 1),
    leaf(74, 128, 24, 0.8),
  ].join("");

  const sprig = [
    stem(720, 760, 806, 692, 756, 706),
    blossom(806, 686, 0.7, 40),
    leaf(762, 720, 30, 0.8),
    leaf(748, 754, -28, 0.9),
  ].join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="900" viewBox="0 0 900 900" role="img" aria-label="${name}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${p.paper}"/>
      <stop offset="52%" stop-color="${p.soft}"/>
      <stop offset="100%" stop-color="${p.deep}"/>
    </linearGradient>
    <radialGradient id="halo" cx="0.5" cy="0.42" r="0.5">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.65"/>
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="vignette" cx="0.5" cy="0.5" r="0.75">
      <stop offset="0%" stop-color="${p.ink}" stop-opacity="0"/>
      <stop offset="100%" stop-color="${p.ink}" stop-opacity="0.18"/>
    </radialGradient>
    <filter id="blurWash" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="26"/>
    </filter>
    <filter id="blurSoft" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="10"/>
    </filter>
  </defs>
  <rect width="900" height="900" fill="url(#bg)"/>
  <rect width="900" height="900" fill="url(#halo)"/>
  ${bokeh}
  ${wash}
  <g color="${p.accent}" transform="rotate(${ROTATIONS[index]} 450 450)">
    ${corner}
    ${sprig}
  </g>
  <g color="${p.accent}">${floaters}</g>
  <rect x="40" y="40" width="820" height="820" rx="10" fill="none" stroke="${p.accent}" stroke-opacity="0.3" stroke-width="1.5"/>
  <rect x="52" y="52" width="796" height="796" rx="8" fill="none" stroke="${p.accent}" stroke-opacity="0.16" stroke-width="1"/>
  <rect width="900" height="900" fill="url(#vignette)"/>
</svg>
`;
}

mkdirSync(outDir, { recursive: true });
Object.entries(palettes).forEach(([name, palette], index) => {
  const file = join(outDir, `${name}.svg`);
  writeFileSync(file, scene(name, palette, index));
  console.log(`wrote ${file}`);
});