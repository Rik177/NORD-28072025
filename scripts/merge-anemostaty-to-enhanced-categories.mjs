import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');
const anemostatyPath = path.resolve(root, 'anemostaty_results.json');
const enhancedCategoriesPath = path.resolve(root, 'src/data/enhanced-categories.ts');

// Helpers
function generateId(name) {
  return name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]/g, '')
    .replace(/--+/g, '-')
    .replace(/^-|-$/g, '');
}

function extractPrice(priceStr) {
  if (!priceStr || typeof priceStr !== 'string') return 0;
  const match = priceStr.match(/(\d+(?:\s*\d+)*)/);
  return match ? parseInt(match[1].replace(/\s/g, ''), 10) : 0;
}

function categorizeProduct(characteristics) {
  const typeChar = Array.isArray(characteristics)
    ? characteristics.find((char) => typeof char.name === 'string' && char.name.includes('Тип'))
    : undefined;
  if (!typeChar || typeof typeChar.name !== 'string') return 'anemostaty';
  const parts = typeChar.name.split('\n');
  const type = parts[1] || '';
  if (/Приточный/i.test(type)) return 'anemostaty/pritochnye';
  if (/Вытяжной/i.test(type)) return 'anemostaty/vytyazhnye';
  if (/Универсальный|Приточно-вытяжной/i.test(type)) return 'anemostaty/pritochno-vytyazhnye';
  return 'anemostaty';
}

function extractSpecifications(characteristics) {
  const specs = {};
  if (!Array.isArray(characteristics)) return specs;
  characteristics.forEach((char) => {
    if (!char || typeof char.name !== 'string') return;
    const parts = char.name.split('\n');
    if (parts.length === 2) {
      specs[parts[0]] = parts[1];
    }
  });
  return specs;
}

function extractBrandAndModel(name) {
  if (!name || typeof name !== 'string') return { brand: 'Неизвестный бренд', model: '' };
  const lines = name.split('\n');
  if (lines.length >= 2) {
    const secondLine = lines[1];
    const tokens = secondLine.trim().split(/\s+/);
    return {
      brand: tokens[0] || 'Неизвестный бренд',
      model: tokens.slice(1).join(' ') || secondLine,
    };
  }
  return {
    brand: 'Неизвестный бренд',
    model: lines[0] || name,
  };
}

function convertAnemostatProduct(product) {
  const { brand, model } = extractBrandAndModel(product.name);
  const specifications = extractSpecifications(product.product_characteristics);
  const price = extractPrice(product.product_price);
  const category = categorizeProduct(product.product_characteristics);
  return {
    id: generateId(product.name),
    name: (product.product_model || '').replace(/\n/g, ' '),
    brand,
    model,
    category,
    price,
    currency: 'RUB',
    availability: 'В наличии',
    image: product.product_model_url || '',
    specifications,
    url: product.product_model_url || '',
    rating: 0,
    reviewCount: 0,
    isNew: false,
    isSale: false,
    isPopular: false,
    isBestseller: false,
  };
}

function loadAnemostaty() {
  const raw = fs.readFileSync(anemostatyPath, 'utf-8');
  const data = JSON.parse(raw);
  const all = [];
  if (Array.isArray(data.product_card)) {
    data.product_card.forEach((p) => all.push(convertAnemostatProduct(p)));
  }
  if (Array.isArray(data.pagination)) {
    data.pagination.forEach((page) => {
      if (Array.isArray(page.product_card)) {
        page.product_card.forEach((p) => all.push(convertAnemostatProduct(p)));
      }
    });
  }
  // Оставляем только анемостаты (на всякий случай)
  return all.filter((p) => typeof p.category === 'string' && p.category.startsWith('anemostaty'));
}

function injectIntoEnhancedCategories(converted) {
  let content = fs.readFileSync(enhancedCategoriesPath, 'utf-8');

  const marker = 'export const products: Product[] = [';
  const startIdx = content.indexOf(marker);
  if (startIdx === -1) {
    throw new Error('Не найден массив products в src/data/enhanced-categories.ts');
  }

  // Отсеиваем дубли по id, уже присутствующие в файле
  const existingIds = new Set();
  const idRegex = /\"id\"\s*:\s*\"([^\"]+)\"/g;
  let m;
  while ((m = idRegex.exec(content)) !== null) {
    existingIds.add(m[1]);
  }
  const unique = converted.filter((p) => !existingIds.has(p.id));

  if (unique.length === 0) {
    console.log('Новых анемостатов для добавления не найдено.');
    return false;
  }

  const insertionPos = startIdx + marker.length; // прямо после '[', вставим блок и запятую

  const block = '\n' + unique.map((p) => JSON.stringify(p, null, 2)).join(',\n') + ',\n';

  const updated = content.slice(0, insertionPos) + block + content.slice(insertionPos);
  fs.writeFileSync(enhancedCategoriesPath, updated, 'utf-8');
  console.log(`✅ Добавлено ${unique.length} товаров анемостатов в enhanced-categories.ts`);
  return true;
}

(function main() {
  try {
    console.log('🔄 Загружаю данные анемостатов...');
    const products = loadAnemostaty();
    console.log(`📦 Найдено товаров: ${products.length}`);
    const changed = injectIntoEnhancedCategories(products);
    if (changed) {
      console.log('💾 Файл обновлен:', enhancedCategoriesPath);
    }
  } catch (err) {
    console.error('❌ Ошибка при обновлении enhanced-categories.ts');
    console.error(err);
    process.exit(1);
  }
})();
