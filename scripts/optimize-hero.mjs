// Generate optimized WebP versions of the hero photo at multiple widths.
// Run: node scripts/optimize-hero.mjs
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const src = resolve(root, 'public/images/heri-atelier.png');

const targets = [
  { width: 768, name: 'hero-768.webp' },
  { width: 1280, name: 'hero-1280.webp' },
  { width: 1920, name: 'hero-1920.webp' },
  { width: 2560, name: 'hero-2560.webp' },
];

async function run() {
  console.log(`Source: ${src}`);
  for (const t of targets) {
    const out = resolve(root, 'public/images', t.name);
    await sharp(src)
      .rotate() // honor EXIF orientation tag before resize
      .resize({ width: t.width, withoutEnlargement: true })
      .webp({ quality: 80, effort: 5 })
      .toFile(out);
    const meta = await sharp(out).metadata();
    const size = (await sharp(out).toBuffer()).length;
    console.log(`  ${t.name}  ${meta.width}x${meta.height}  ${(size/1024).toFixed(1)} KB`);
  }
  console.log('Done.');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
