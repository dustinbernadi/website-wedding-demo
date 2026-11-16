import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public", "lovestory");

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

const COUNT = 3;

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
  return `<path transform="translate(${x} ${y}) rotate(${rot}) scale(${s})" d="M0 0 C 15 -9 26 -5 28 6 C 15 11 5 9 0 0 Z" fill="currentColor" fill-opacity="0.42" stroke="none"/>`;
}

function stem(x1, y1, x2, y2, cx1, cy1) {
  return `<path d="M ${x1} ${y1} Q ${cx1} ${cy1} ${x2} ${y2}" fill="none" stroke="currentColor" stroke-width="2.5" stroke-opacity="0.55" stroke-linecap="round"/>`;
}

const FLOATERS = [
  [110, 260, 7, 15, 18],
  [700, 210, 8, 16, -26],
  [620, 470, 7, 14, 30],
  [180, 460, 8, 17, -12],
  [400, 120, 6, 13, 40],
];

function scene(name, p, index) {
  const cx = 400;
  const anchor = [
    [46, 300, 0],
    [46 + 120 * index, 262, 12],
    [-46, 300, 0],
  ][index % 3];

  const couple = [
    stem(anchor[0], anchor[1], cx, 350, (anchor[0] + cx) / 2, 300),
    stem(cx, 350, anchor[2], anchor[1], (cx + anchor[2]) / 2, 300),
    blossom(anchor[0], anchor[1], 1.05, anchor[2] + 26),
    blossom(cx, 340, 0.95, anchor[2] + 96),
    blossom(anchor[2], anchor[1] + 4, 0.85, anchor[2] + 150),
    leaf((anchor[0] + cx) / 2, 306, -14, 0.9),
    leaf((cx + anchor[2]) / 2, 306, 14, 0.9),
  ].join("");

  const bokeh = [
    [120, 150, 40],
    [680, 120, 30],
    [640, 420, 26],
    [140, 420, 22],
  ]
    .map(
      ([x, y, rad]) =>
        `<circle cx="${x}" cy="${y}" r="${rad}" fill="#FFFFFF" opacity="0.35" filter="url(#blurSoft)"/>`,
    )
    .join("");

  const floaters = FLOATERS.map(
    ([x, y, rx, ry, a]) =>
      `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" transform="rotate(${a} ${x} ${y})" fill="none" stroke="${p.accent}" stroke-opacity="0.5" stroke-width="2"/>`,
  ).join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600" role="img" aria-label="${name}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${p.paper}"/>
      <stop offset="52%" stop-color="${p.soft}"/>
      <stop offset="100%" stop-color="${p.deep}"/>
    </linearGradient>
    <radialGradient id="halo" cx="0.5" cy="0.45" r="0.5">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.65"/>
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="vignette" cx="0.5" cy="0.5" r="0.78">
      <stop offset="0%" stop-color="${p.ink}" stop-opacity="0"/>
      <stop offset="100%" stop-color="${p.ink}" stop-opacity="0.18"/>
    </radialGradient>
    <filter id="blurSoft" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="10"/>
    </filter>
  </defs>
  <rect width="800" height="600" fill="url(#bg)"/>
  <rect width="800" height="600" fill="url(#halo)"/>
  ${bokeh}
  <g color="${p.accent}">${couple}</g>
  <g color="${p.accent}">${floaters}</g>
  <rect x="34" y="34" width="732" height="532" rx="9" fill="none" stroke="${p.accent}" stroke-opacity="0.3" stroke-width="1.5"/>
  <rect x="46" y="46" width="708" height="508" rx="7" fill="none" stroke="${p.accent}" stroke-opacity="0.15" stroke-width="1"/>
  <rect width="800" height="600" fill="url(#vignette)"/>
</svg>
`;
}

mkdirSync(outDir, { recursive: true });
Object.entries(palettes).forEach(([name, palette]) => {
  for (let i = 1; i <= COUNT; i += 1) {
    const file = join(outDir, `lovestory-${name}-${i}.svg`);
    writeFileSync(file, scene(`${name}-${i}`, palette, i));
    console.log(`wrote ${file}`);
  }
});