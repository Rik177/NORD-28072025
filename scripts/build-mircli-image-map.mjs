import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');

const sourcePath = path.resolve(root, 'products with images.json');
const outPath = path.resolve(root, 'src/data/mircli-image-map.json');

function tailFromUrl(url) {
  if (!url || typeof url !== 'string') return '';
  return url.replace(/https?:\/\/[^/]+\//, '').replace(/\/$/, '');
}

function walkCategories(node, map) {
  if (!node) return;
  if (Array.isArray(node.products)) {
    node.products.forEach((p) => {
      const tail = tailFromUrl(p.url || '');
      const images = Array.isArray(p.product_image) ? p.product_image.map(img => String(img.image || '')).filter(Boolean) : [];
      if (tail && images.length > 0) {
        map[tail] = images;
      }
    });
  }
  const children = node.subcategories || node.sub_categories || node.sub_categories || [];
  if (Array.isArray(children)) {
    children.forEach((child) => walkCategories(child, map));
  }
}

function main() {
  if (!fs.existsSync(sourcePath)) {
    console.error('Source not found:', sourcePath);
    process.exit(1);
  }
  const raw = fs.readFileSync(sourcePath, 'utf-8');
  const data = JSON.parse(raw);
  const map = {};
  const cats = Array.isArray(data.categories) ? data.categories : [];
  cats.forEach((c) => walkCategories(c, map));
  fs.writeFileSync(outPath, JSON.stringify(map, null, 2), 'utf-8');
  console.log('✅ Built image map with entries:', Object.keys(map).length);
  console.log('→', outPath);
}

main();


