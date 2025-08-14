import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');

const mapPath = path.resolve(root, 'src/data/mircli-image-map.json');
const outDir = path.resolve(root, 'public/mircli-images');
const maxPerProduct = Number(process.env.MAX_IMAGES_PER_PRODUCT || 1);
const concurrency = Number(process.env.CONCURRENCY || 8);

function ensureDirSync(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function extFromUrl(u) {
  try {
    const url = new URL(u);
    const base = path.basename(url.pathname);
    const ext = path.extname(base).toLowerCase().replace(/^\./, '');
    return ext || 'jpg';
  } catch {
    return 'jpg';
  }
}

function safeKey(key) {
  return String(key).replace(/[^a-z0-9\-_/]/gi, '-');
}

async function fetchWithReferer(url, referer) {
  const headers = {
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123 Safari/537.36',
    'accept': 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
    'referer': referer,
  };
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const ct = res.headers.get('content-type') || '';
  if (!/image\//i.test(ct)) {
    throw new Error(`Non-image content-type: ${ct}`);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 200) {
    throw new Error('Suspiciously small image');
  }
  return buf;
}

async function downloadImage(url, destFile, productKey) {
  const productUrl = `https://mircli.ru/${productKey}`;
  let buf;
  try {
    buf = await fetchWithReferer(url, productUrl);
  } catch {
    buf = await fetchWithReferer(url, 'https://mircli.ru/');
  }
  ensureDirSync(path.dirname(destFile));
  fs.writeFileSync(destFile, buf);
}

async function main() {
  if (!fs.existsSync(mapPath)) {
    console.error('Map not found:', mapPath);
    process.exit(1);
  }
  const map = JSON.parse(fs.readFileSync(mapPath, 'utf-8'));
  ensureDirSync(outDir);

  const entries = Object.entries(map);
  let processed = 0;
  let saved = 0;
  const newMap = {};

  const queue = entries.slice();
  const workers = Array.from({ length: concurrency }).map(async () => {
    while (queue.length) {
      const [key, urls] = queue.shift();
      const cleanKey = safeKey(key);
      const list = Array.isArray(urls) ? urls.slice(0, maxPerProduct) : [];
      const localUrls = [];
      for (let i = 0; i < list.length; i++) {
        const u = String(list[i] || '');
        if (!u) continue;
        const ext = extFromUrl(u);
        const destFile = path.resolve(outDir, cleanKey, `img-${i + 1}.${ext}`);
        const destPublic = `/mircli-images/${cleanKey}/img-${i + 1}.${ext}`;
        try {
          if (!fs.existsSync(destFile)) {
            await downloadImage(u, destFile, cleanKey);
            saved++;
          }
          localUrls.push(destPublic);
        } catch (e) {
          // Skip on error; do not include in local map
        }
      }
      if (localUrls.length > 0) {
        newMap[key] = localUrls;
      } else {
        // Fallback to original URLs if download failed
        newMap[key] = Array.isArray(urls) ? urls : [];
      }
      processed++;
      if (processed % 100 === 0) {
        console.log('Progress:', processed, '/', entries.length);
      }
    }
  });
  await Promise.all(workers);

  fs.writeFileSync(mapPath, JSON.stringify(newMap, null, 2), 'utf-8');
  console.log('✅ Cached images. Products:', entries.length, 'Images saved:', saved);
  console.log('→ Updated map:', mapPath);
}

main().catch((e) => {
  console.error('Fatal:', e);
  process.exit(1);
});


