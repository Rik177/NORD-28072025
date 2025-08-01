import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Читаем данные из MIRCLI_CATALOGUE_results.json
const rawData = JSON.parse(fs.readFileSync(path.join(__dirname, '../MIRCLI_CATALOGUE_results.json'), 'utf8'));

// Функция для создания slug из названия
function createSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^а-яёa-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Функция для извлечения бренда из названия товара
function extractBrand(productName) {
  const brands = ['SONNEN', 'BRAYER', 'Electrolux', 'Ballu', 'VENTS', 'Systemair', 'Wolf', 'Maico', 'Rosenberg', 'Ostberg'];
  for (const brand of brands) {
    if (productName.toUpperCase().includes(brand)) {
      return brand;
    }
  }
  return 'Вентс';
}

// Функция для извлечения цены
function extractPrice(priceString) {
  if (!priceString) return Math.floor(Math.random() * 50000) + 5000;
  const price = priceString.replace(/[^\d]/g, '');
  return parseInt(price) || Math.floor(Math.random() * 50000) + 5000;
}

// Функция для извлечения характеристик
function extractCharacteristics(characteristics) {
  if (!characteristics || !Array.isArray(characteristics)) return {};
  
  const specs = {};
  characteristics.forEach(char => {
    if (char.name) {
      const [key, value] = char.name.split('\n');
      if (key && value) {
        specs[key.trim()] = value.trim();
      }
    }
  });
  return specs;
}

// Создаем структуру категорий
const categories = [];
const products = [];
let productId = 1;

// Обрабатываем данные из dropdown__nav
function processCategories(navItems, parentId = null) {
  navItems.forEach((item, index) => {
    const category = {
      id: categories.length + 1,
      title: item.name,
      slug: createSlug(item.name),
      description: `Описание для ${item.name}`,
      image: `https://picsum.photos/800/400?random=${categories.length + 1}`,
      productCount: 0,
      parentId: parentId,
      subcategories: []
    };
    
    categories.push(category);
    
    // Обрабатываем подкатегории
    if (item.selection1) {
      processCategories(item.selection1, category.id);
    }
    if (item.selection2) {
      processCategories(item.selection2, category.id);
    }
    if (item.selection3) {
      processCategories(item.selection3, category.id);
    }
  });
}

// Обрабатываем товары
function processProducts() {
  // Ищем все секции с товарами
  const productSections = [];
  
  function findProductSections(obj) {
    if (obj.products && Array.isArray(obj.products)) {
      productSections.push({
        category: obj.name || 'Неизвестная категория',
        products: obj.products
      });
    }
    
    // Рекурсивно ищем в других объектах
    Object.values(obj).forEach(value => {
      if (typeof value === 'object' && value !== null) {
        findProductSections(value);
      }
    });
  }
  
  findProductSections(rawData);
  
  // Обрабатываем товары
  productSections.forEach(section => {
    section.products.forEach(product => {
      if (product.name) {
        const productName = product.name.split('\n')[0]; // Берем только название
        const brand = extractBrand(productName);
        const price = extractPrice(product.price);
        const characteristics = extractCharacteristics(product.characteristics);
        
        const productObj = {
          id: productId++,
          title: productName,
          description: `Качественный товар ${productName} для систем вентиляции`,
          price: price.toString(),
          image: product.image_url || `https://picsum.photos/400/300?random=${productId}`,
          category: section.category,
          brand: brand,
          characteristics: characteristics,
          sku: product.name.includes('арт:') ? 
            product.name.split('арт:')[1]?.trim() : 
            `SKU-${productId}`,
          rating: (4.0 + Math.random() * 1.0).toFixed(1),
          reviewCount: Math.floor(Math.random() * 50) + 5
        };
        
        products.push(productObj);
      }
    });
  });
}

// Запускаем обработку
processCategories(rawData.dropdown__nav);
processProducts();

// Создаем финальную структуру данных
const ventilationData = {
  categories: categories,
  products: products,
  totalCategories: categories.length,
  totalProducts: products.length,
  lastUpdated: new Date().toISOString()
};

// Сохраняем в файл
const outputPath = path.join(__dirname, '../src/data/ventilationData.json');
fs.writeFileSync(outputPath, JSON.stringify(ventilationData, null, 2), 'utf8');

// Создаем TypeScript файл
const tsContent = `// Данные о вентиляционном оборудовании
export interface VentilationProduct {
  id: number;
  title: string;
  description: string;
  price: string;
  image?: string;
  category: string;
  brand: string;
  characteristics: Record<string, string>;
  sku: string;
  rating: string;
  reviewCount: number;
  subcategory?: string;
  subcategoryId?: number;
}

export interface VentilationCategory {
  id: number;
  title: string;
  slug: string;
  description: string;
  image?: string;
  productCount: number;
  parentId?: number;
  subcategories?: VentilationCategory[];
}

export interface VentilationData {
  categories: VentilationCategory[];
  products: VentilationProduct[];
  totalCategories: number;
  totalProducts: number;
  lastUpdated: string;
}

export const ventilationCategories: VentilationCategory[] = ${JSON.stringify(categories, null, 2)};

export const ventilationProducts: VentilationProduct[] = ${JSON.stringify(products, null, 2)};

export const ventilationData: VentilationData = {
  categories: ventilationCategories,
  products: ventilationProducts,
  totalCategories: ${categories.length},
  totalProducts: ${products.length},
  lastUpdated: "${new Date().toISOString()}"
};
`;

const tsOutputPath = path.join(__dirname, '../src/data/ventilationData.ts');
fs.writeFileSync(tsOutputPath, tsContent, 'utf8');

console.log(`✅ Обработано ${categories.length} категорий и ${products.length} товаров`);
console.log(`📁 Данные сохранены в:`);
console.log(`   - ${outputPath}`);
console.log(`   - ${tsOutputPath}`); 