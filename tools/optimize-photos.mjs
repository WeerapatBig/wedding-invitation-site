/* Optimize every JPG in images/Pre-Wedding/ (and flim-photo/) into webp variants
 * at 800w / 1200w / 2400w in images/opt/. Re-run any time you drop new photos.
 *
 *   npm run optimize
 */
import sharp from 'sharp';
import { readdir, mkdir, stat } from 'node:fs/promises';
import { dirname, resolve, join, basename, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const SRC_DIRS = [
  resolve(ROOT, 'public/images/Pre-Wedding'),
  resolve(ROOT, 'images/Pre-Wedding'),
];
const FLIM = 'flim-photo';
const DEST = resolve(ROOT, 'images/opt');
const WIDTHS = [800, 1200, 2400];
const QUALITY = 82;

async function ensureDir(p) { await mkdir(p, { recursive: true }); }

function outName(srcFile, width) {
  const base = basename(srcFile, extname(srcFile)).toLowerCase();
  return `${base}-${width}.webp`;
}

async function pickSrcDir() {
  for (const d of SRC_DIRS) {
    try { await stat(d); return d; } catch {}
  }
  throw new Error(`No source dir found. Tried: ${SRC_DIRS.join(', ')}`);
}

async function process(srcPath, widths) {
  for (const w of widths) {
    const destPath = join(DEST, outName(srcPath, w));
    try { await stat(destPath); continue; } catch {}
    await sharp(srcPath)
      .rotate()
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: QUALITY, effort: 5 })
      .toFile(destPath);
    const { size } = await stat(destPath);
    console.log(`  · ${basename(destPath)}  ${(size / 1024).toFixed(0)}kb`);
  }
}

(async () => {
  await ensureDir(DEST);
  const srcDir = await pickSrcDir();
  console.log(`source: ${srcDir}`);
  console.log(`dest:   ${DEST}\n`);

  const entries = await readdir(srcDir);
  const jpgs = entries.filter((f) => /\.(jpe?g|png)$/i.test(f));
  console.log(`JPG files: ${jpgs.length}`);
  for (const file of jpgs) {
    console.log(`  ${file}`);
    await process(join(srcDir, file), WIDTHS);
  }

  // Optional: flim-photo subfolder
  try {
    const flimDir = join(srcDir, FLIM);
    await stat(flimDir);
    const flimEntries = await readdir(flimDir);
    const flimJpgs = flimEntries.filter((f) => /\.(jpe?g|png)$/i.test(f));
    if (flimJpgs.length) console.log(`\n${FLIM}/ (${flimJpgs.length} files)`);
    for (const file of flimJpgs) {
      console.log(`  ${file}`);
      await process(join(flimDir, file), [800, 1200]);
    }
  } catch {}

  console.log('\ndone.');
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
