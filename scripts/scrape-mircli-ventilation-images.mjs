import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');

const sourceVentPath = path.resolve(root, 'src/data/ventilation-data.json');
const outMapPath = path.resolve(root, 'src/data/mircli-image-map.json');

// Very lightweight HTML fetcher + image extractor for mircli.ru product pages
async function fetchHtml(url) {
  const res = await fetch(url, { headers: { 'user-agent': 'Mozilla/5.0' } });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return await res.text();
}

function extractImages(html) {
  const urls = new Set();
  // Match common image URL patterns in mircli markup (png/jpg/jpeg/webp) and skip certificates
  const re = /https?:\/\/[^\"'\s)]+\.(?:png|jpe?g|webp)/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    const u = m[0];
    if (/cert\//i.test(u) || /sertifikat/i.test(u)) continue;
    urls.add(u);
  }
  return Array.from(urls);
}

function tailFromUrl(url) {
  return String(url).replace(/https?:\/\/[^/]+\//, '').replace(/\/$/, '');
}

async function main() {
  const raw = fs.readFileSync(sourceVentPath, 'utf-8');
  const data = JSON.parse(raw);
  const products = Array.isArray(data.products) ? data.products : [];

  const existing = fs.existsSync(outMapPath) ? JSON.parse(fs.readFileSync(outMapPath, 'utf-8')) : {};
  let updated = 0;

  // Limit concurrent fetches
  const queue = [...products];
  const concurrency = 4;
  const workers = Array.from({ length: concurrency }).map(async () => {
    while (queue.length) {
      const p = queue.shift();
      if (!p || !p.url) continue;
      const key = tailFromUrl(p.url);
      if (existing[key] && Array.isArray(existing[key]) && existing[key].length > 0) continue;
      try {
        const html = await fetchHtml(p.url);
        const imgs = extractImages(html);
        if (imgs.length > 0) {
          existing[key] = imgs;
          updated++;
          console.log('✔', key, imgs.length);
        } else {
          console.log('✖ no images', key);
        }
      } catch (e) {
        console.log('⚠ failed', key);
      }
    }
  });
  await Promise.all(workers);

  fs.writeFileSync(outMapPath, JSON.stringify(existing, null, 2), 'utf-8');
  console.log('✅ Image map updated:', updated, 'new entries');
}

main().catch((e) => {
  console.error('Fatal:', e);
  process.exit(1);
});


