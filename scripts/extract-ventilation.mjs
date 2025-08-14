import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');
const sourcePath = path.resolve(root, 'src/data/enhanced-catalog-data.json');
const outPath = path.resolve(root, 'src/data/ventilation-data.json');

// Top-level category ids that constitute the "Вентиляция" section on mircli.ru
// e.g., https://mircli.ru/ventilyatory/, https://mircli.ru/ventilyatsionnye-ustanovki/, etc.
const VENTILATION_ROOT_IDS = new Set([
  'ventilyatory',
  'ventilyatsionnye-ustanovki',
  'setevye-elementy',
  'avtomatika',
  'ventilyatsionnye-reshetki',
  'diffuzory',
  'anemostaty',
  'vozduhovody',
]);

function isVentilationCategoryPath(categoryPath) {
  if (typeof categoryPath !== 'string' || categoryPath.length === 0) return false;
  const [rootId] = categoryPath.split('/');
  return VENTILATION_ROOT_IDS.has(rootId);
}

function buildVentilationCategoryTree(allCategories) {
  // Filter only categories belonging to ventilation roots
  const ventilationCategories = allCategories.filter((c) => isVentilationCategoryPath(c.path));

  // Build a quick lookup by id
  const byId = new Map(ventilationCategories.map((c) => [c.id, { ...c, subcategories: [] }]));

  // Attach children to parents within the filtered set
  const roots = [];
  for (const cat of byId.values()) {
    if (cat.parentId && byId.has(cat.parentId)) {
      byId.get(cat.parentId).subcategories.push(cat);
    } else {
      // Keep only the true roots that are part of the ventilation roots
      if (VENTILATION_ROOT_IDS.has(cat.id)) roots.push(cat);
    }
  }
  return roots;
}

function main() {
  if (!fs.existsSync(sourcePath)) {
    console.error('Source not found:', sourcePath);
    process.exit(1);
  }

  const raw = fs.readFileSync(sourcePath, 'utf-8');
  const data = JSON.parse(raw);

  const categories = Array.isArray(data.categories) ? data.categories : [];
  const products = Array.isArray(data.products) ? data.products : [];

  const ventilationCategories = buildVentilationCategoryTree(categories);
  const ventilationProducts = products.filter((p) => isVentilationCategoryPath(p.category)).map((p) => ({
    id: p.id,
    name: p.name,
    brand: p.brand,
    price: p.price,
    image: p.image,
    specifications: p.specifications || {},
    category: p.category,
    url: p.url || '',
    currency: p.currency || 'RUB',
    availability: p.availability || '',
  }));

  const out = {
    categories: ventilationCategories,
    products: ventilationProducts,
    meta: {
      source: 'mircli.ru',
      generatedAt: new Date().toISOString(),
      roots: Array.from(VENTILATION_ROOT_IDS),
      totals: {
        categories: ventilationCategories.length,
        products: ventilationProducts.length,
      },
    },
  };

  fs.writeFileSync(outPath, JSON.stringify(out, null, 2), 'utf-8');
  console.log('✅ Ventilation data written to', outPath);
  console.log('📊 Categories:', out.meta.totals.categories, 'Products:', out.meta.totals.products);
}

main();


