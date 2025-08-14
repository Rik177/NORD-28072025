import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');

const sourceVentPath = path.resolve(root, 'src/data/ventilation-data.json');
const outMapPath = path.resolve(root, 'src/data/mircli-image-map-remote.json');

async function fetchHtml(url) {
  const res = await fetch(url, {
    headers: {
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123 Safari/537.36',
      'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
      'accept-language': 'ru-RU,ru;q=0.9,en;q=0.8',
      'upgrade-insecure-requests': '1',
      'referer': 'https://mircli.ru/',
    }
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return await res.text();
}

function extractImages(html) {
  const urls = new Set();
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

  const out = {};
  let updated = 0;

  const queue = products.filter(p => p && p.url);
  const concurrency = 6;
  const workers = Array.from({ length: concurrency }).map(async () => {
    while (queue.length) {
      const p = queue.shift();
      const key = tailFromUrl(p.url);
      try {
        const html = await fetchHtml(p.url);
        const imgs = extractImages(html);
        if (imgs.length > 0) {
          out[key] = imgs;
          updated++;
          if (updated % 50 === 0) console.log('Fetched', updated);
        }
      } catch (e) {
        // ignore
      }
    }
  });
  await Promise.all(workers);

  fs.writeFileSync(outMapPath, JSON.stringify(out, null, 2), 'utf-8');
  console.log('✅ Remote image map rebuilt:', Object.keys(out).length, 'entries');
  console.log('→', outMapPath);
}

main().catch((e) => {
  console.error('Fatal:', e);
  process.exit(1);
});


