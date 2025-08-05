const fs = require('fs');
const path = require('path');

// Интерфейсы для справки (не используются в JS)
// interface Subcategory { id: string; name: string; path: string; subcategories?: Subcategory[]; }
// interface Category { id: string; name: string; description: string; image: string; productCount: number; path: string; subcategories?: Subcategory[]; }
// interface Product { id: string; name: string; description: string; price: number; oldPrice?: number; image: string; rating: number; reviewCount: number; isNew?: boolean; isSale?: boolean; brand: string; category: string; }

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-zа-я0-9]+/gi, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-');
}

function extractIdFromUrl(url) {
  const parts = url.split('/').filter(Boolean);
  return parts[parts.length - 1] || slugify(url);
}

function parsePrice(priceStr) {
  if (!priceStr) return 0;
  const match = priceStr.replace(/[^0-9]/g, '');
  return parseInt(match, 10) || 0;
}

function buildSubcategories(obj, level = 1) {
  const selKey = `selection${level}`;
  if (!obj[selKey]) return undefined;
  return obj[selKey].map((item) => {
    const id = extractIdFromUrl(item.url);
    return {
      id,
      name: item.name,
      path: `/catalog/${id}`,
      subcategories: buildSubcategories(item, level + 1),
    };
  });
}

function collectProducts(obj, parentCategoryId, products) {
  if (obj.selection4) {
    for (const sel of obj.selection4) {
      if (sel.pagination) {
        for (const page of sel.pagination) {
          if (page.products) {
            for (const prod of page.products) {
              products.push(productFromRaw(prod, parentCategoryId));
            }
          }
        }
      }
    }
  }
  for (let i = 1; i <= 4; i++) {
    const selKey = `selection${i}`;
    if (obj[selKey]) {
      for (const sub of obj[selKey]) {
        collectProducts(sub, extractIdFromUrl(sub.url) || parentCategoryId, products);
      }
    }
  }
}

function productFromRaw(prod, categoryId) {
  const id = slugify(prod.name) + '-' + Math.random().toString(36).slice(2, 8);
  let brand = '';
  const brandMatch = prod.name.match(/([A-ZА-Я][A-Za-zА-ЯёЁ0-9\- ]+)/);
  if (brandMatch) brand = brandMatch[1].trim();
  return {
    id,
    name: prod.name.replace(/\n/g, ' '),
    description: prod.characteristics?.map((c) => c.name.replace(/\n/g, ': ')).join('; ') || '',
    price: parsePrice(prod.price),
    image: prod.image_url || prod.image || '',
    rating: 4.5,
    reviewCount: 10,
    isNew: false,
    isSale: false,
    brand,
    category: categoryId,
  };
}

function buildCategories(nav) {
  return nav.map((cat) => {
    const id = extractIdFromUrl(cat.url);
    return {
      id,
      name: cat.name,
      description: `Описание категории ${cat.name}`,
      image: `https://via.placeholder.com/300x200?text=${encodeURIComponent(cat.name)}`,
      productCount: 0,
      path: `/catalog/${id}`,
      subcategories: buildSubcategories(cat, 1),
    };
  });
}

function main() {
  const jsonPath = path.resolve(__dirname, '../MIRCLI_CATALOGUE_results.json');
  const outPath = path.resolve(__dirname, '../src/pages/catalog/Categories.ts');
  const raw = fs.readFileSync(jsonPath, 'utf-8');
  const data = JSON.parse(raw);

  const categories = buildCategories(data.dropdown__nav);
  const products = [];
  for (const cat of data.dropdown__nav) {
    collectProducts(cat, extractIdFromUrl(cat.url), products);
  }

  const header = `// Автоматически сгенерировано скриптом generate-catalog.js\n`;
  const interfaces = `\nexport interface Subcategory {\n  id: string;\n  name: string;\n  path: string;\n  subcategories?: Subcategory[];\n}\n\nexport interface Category {\n  id: string;\n  name: string;\n  description: string;\n  image: string;\n  productCount: number;\n  path: string;\n  subcategories?: Subcategory[];\n}\n\nexport interface Product {\n  id: string;\n  name: string;\n  description: string;\n  price: number;\n  oldPrice?: number;\n  image: string;\n  rating: number;\n  reviewCount: number;\n  isNew?: boolean;\n  isSale?: boolean;\n  brand: string;\n  category: string;\n}\n`;
  const categoriesStr = 'export const categories: Category[] = ' + JSON.stringify(categories, null, 2) + ';\n';
  const productsStr = 'export const products: Product[] = ' + JSON.stringify(products, null, 2) + ';\n';

  fs.writeFileSync(outPath, `${header}\n${interfaces}\n${categoriesStr}\n${productsStr}`);
  console.log('Каталог и товары успешно сгенерированы!');
}

main(); 