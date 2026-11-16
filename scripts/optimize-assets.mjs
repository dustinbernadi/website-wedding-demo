import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp"]);

function parseArgs(argv) {
  const opts = { width: 1600, quality: 82, outExt: null, removeSource: false };
  const inputs = [];

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--width") opts.width = Number(argv[++i]);
    else if (arg === "--quality") opts.quality = Number(argv[++i]);
    else if (arg === "--out-ext") opts.outExt = argv[++i].replace(/^\./, "").toLowerCase();
    else if (arg === "--keep-source") opts.removeSource = false;
    else if (arg === "--remove-source") opts.removeSource = true;
    else if (arg.startsWith("--")) throw new Error(`Opsi tidak dikenal: ${arg}`);
    else inputs.push(arg);
  }

  if (inputs.length === 0) {
    throw new Error(
      "Pemakaian: node scripts/optimize-assets.mjs [--width N] [--quality N] [--out-ext jpg] [--remove-source] <file|dir ...>",
    );
  }
  if (!Number.isFinite(opts.width) || opts.width <= 0) throw new Error("--width harus angka positif");
  if (!Number.isFinite(opts.quality) || opts.quality < 1 || opts.quality > 100) {
    throw new Error("--quality harus 1-100");
  }
  if (opts.outExt && !IMAGE_EXT.has(`.${opts.outExt}`)) {
    throw new Error(`--out-ext tidak didukung: ${opts.outExt}`);
  }
  if (opts.outExt === "png") throw new Error("Keluaran PNG tidak lewat mozjpeg; pilih jpg atau webp");

  return { ...opts, inputs };
}

function expandInputs(inputs) {
  const files = [];
  for (const input of inputs) {
    const abs = path.resolve(process.cwd(), input);
    const stat = fs.statSync(abs);
    if (stat.isDirectory()) {
      for (const name of fs.readdirSync(abs).sort()) {
        const child = path.join(abs, name);
        if (fs.statSync(child).isFile() && IMAGE_EXT.has(path.extname(name).toLowerCase())) {
          files.push(child);
        }
      }
    } else if (IMAGE_EXT.has(path.extname(abs).toLowerCase())) {
      files.push(abs);
    }
  }
  return files;
}

const { width, quality, outExt, removeSource, inputs } = parseArgs(process.argv.slice(2));
const files = expandInputs(inputs);
if (files.length === 0) throw new Error("Tidak ada gambar ditemukan dari input tersebut");

let totalBefore = 0;
let totalAfter = 0;
const rows = [];

for (const file of files) {
  const rel = path.relative(process.cwd(), file);
  const ext = path.extname(file).toLowerCase();
  const sourceFormat = ext === ".jpg" || ext === ".jpeg" ? "jpeg" : ext.replace(".", "");

  if (outExt && outExt === sourceFormat) {
    throw new Error(
      `${rel}: menolak encode ulang ke format yang sama (${outExt}). ` +
        `Hapus --out-ext untuk optimasi in-place.`,
    );
  }

  const before = fs.statSync(file).size;
  const target = outExt
    ? path.join(path.dirname(file), `${path.basename(file, ext)}.${outExt}`)
    : file;

  if (outExt && fs.existsSync(target) && path.resolve(target) !== path.resolve(file)) {
    throw new Error(`${rel}: target sudah ada (${path.basename(target)}). Hapus dulu atau pakai nama lain.`);
  }

  const tmp = `${target}.opt.tmp`;
  let pipeline = sharp(file).rotate();
  pipeline =
    outExt === "webp"
      ? pipeline.resize({ width, height: width, fit: "inside", withoutEnlargement: true }).webp({ quality })
      : pipeline
          .resize({ width, height: width, fit: "inside", withoutEnlargement: true })
          .jpeg({ quality, mozjpeg: true });

  const meta = await sharp(file).metadata();
  await pipeline.toFile(tmp);
  const after = fs.statSync(tmp).size;
  fs.renameSync(tmp, target);

  if (outExt && removeSource && path.resolve(target) !== path.resolve(file)) {
    fs.unlinkSync(file);
  }

  const outMeta = await sharp(target).metadata();
  totalBefore += before;
  totalAfter += after;
  rows.push(
    `  ${rel} → ${path.relative(process.cwd(), target)}  ` +
      `${meta.width}x${meta.height} → ${outMeta.width}x${outMeta.height}  ` +
      `${(before / 1024).toFixed(0)} KB → ${(after / 1024).toFixed(0)} KB ` +
      `(${((1 - after / before) * 100).toFixed(1)}% lebih kecil)`,
  );
}

console.log(rows.join("\n"));
console.log(
  `Total: ${(totalBefore / 1024).toFixed(0)} KB → ${(totalAfter / 1024).toFixed(0)} KB ` +
    `(width=${width}, quality=${quality}${outExt ? `, out=${outExt}` : ", in-place"})`,
);
