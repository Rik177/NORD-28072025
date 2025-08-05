import fs from 'fs';
import path from 'path';

// Интерфейсы как в Categories.ts
interface Subcategory {
  id: string;
  name: string;
  path: string;
  subcategories?: Subcategory[];
}

interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
  path: string;
  subcategories?: Subcategory[];
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  isSale?: boolean;
  brand: string;
  category: string;
}

// Утилиты
function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-zа-я0-9]+/gi, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-');
}

function extractIdFromUrl(url: string): string {
  // Пример: https://mircli.ru/napolnye-ventilyatory/ => napolnye-ventilyatory
  const parts = url.split('/').filter(Boolean);
  return parts[parts.length - 1] || slugify(url);
}

function parsePrice(priceStr: string): number {
  if (!priceStr) return 0;
  const match = priceStr.replace(/[^0-9]/g, '');
  return parseInt(match, 10) || 0;
}

// Рекурсивно строим дерево категорий
function buildSubcategories(obj: any, level = 1): Subcategory[] | undefined {
  const selKey = `selection${level}`;
  if (!obj[selKey]) return undefined;
  return obj[selKey].map((item: any) => {
    const id = extractIdFromUrl(item.url);
    return {
      id,
      name: item.name,
      path: `/catalog/${id}`,
      subcategories: buildSubcategories(item, level + 1),
    };
  });
}

// Собираем все товары из products (вложенных в selectionX/pagination)
function collectProducts(obj: any, parentCategoryId: string, products: Product[]) {
  // Ищем products в selection4 -> pagination -> products
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
  // Рекурсивно по selection1/2/3
  for (let i = 1; i <= 4; i++) {
    const selKey = `selection${i}`;
    if (obj[selKey]) {
      for (const sub of obj[selKey]) {
        collectProducts(sub, extractIdFromUrl(sub.url) || parentCategoryId, products);
      }
    }
  }
}

function productFromRaw(prod: any, categoryId: string): Product {
  // id: slug по имени + hash
  const id = slugify(prod.name) + '-' + Math.random().toString(36).slice(2, 8);
  // brand: ищем в name (если есть)
  let brand = '';
  const brandMatch = prod.name.match(/([A-ZА-Я][A-Za-zА-ЯёЁ0-9\- ]+)/);
  if (brandMatch) brand = brandMatch[1].trim();
  return {
    id,
    name: prod.name.replace(/\n/g, ' '),
    description: prod.characteristics?.map((c: any) => c.name.replace(/\n/g, ': ')).join('; ') || '',
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

function buildCategories(nav: any[]): Category[] {
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

  // Категории
  const categories = buildCategories(data.dropdown__nav);

  // Товары
  const products: Product[] = [];
  for (const cat of data.dropdown__nav) {
    collectProducts(cat, extractIdFromUrl(cat.url), products);
  }

  // Генерируем TypeScript-файл
  const header = `// Автоматически сгенерировано скриптом generate-catalog.ts\n`;
  const interfaces = `\nexport interface Subcategory ${JSON.stringify({id:'',name:'',path:'',subcategories:[]},null,2).replace(/"/g,'').replace(/: /g,': ').replace(/\n/g,'\n  ').replace(/,$/m,'')}
\nexport interface Category ${JSON.stringify({id:'',name:'',description:'',image:'',productCount:0,path:'',subcategories:[]},null,2).replace(/"/g,'').replace(/: /g,': ').replace(/\n/g,'\n  ').replace(/,$/m,'')}
\nexport interface Product ${JSON.stringify({id:'',name:'',description:'',price:0,oldPrice:0,image:'',rating:0,reviewCount:0,isNew:false,isSale:false,brand:'',category:''},null,2).replace(/"/g,'').replace(/: /g,': ').replace(/\n/g,'\n  ').replace(/,$/m,'')}
`;
  const categoriesStr = 'export const categories: Category[] = ' + JSON.stringify(categories, null, 2) + ';\n';
  const productsStr = 'export const products: Product[] = ' + JSON.stringify(products, null, 2) + ';\n';

  fs.writeFileSync(outPath, `${header}\n${interfaces}\n${categoriesStr}\n${productsStr}`);
  console.log('Каталог и товары успешно сгенерированы!');
}

main(); 