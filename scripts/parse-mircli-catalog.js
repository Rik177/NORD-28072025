const fs = require('fs');
const path = require('path');

// Читаем исходный файл
const rawData = fs.readFileSync('MIRCLI_CATALOGUE_results.json', 'utf8');
const data = JSON.parse(rawData);

// Структура для хранения категорий и товаров
const categoriesStructure = {
  categories: [],
  products: []
};

// Функция для создания уникального ID
function createId(name) {
  return name
    .toLowerCase()
    .replace(/[^а-яa-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

// Функция для извлечения цены из строки
function extractPrice(priceStr) {
  if (!priceStr) return 0;
  const match = priceStr.match(/(\d+(?:\s\d+)*)/);
  if (match) {
    return parseInt(match[1].replace(/\s/g, ''));
  }
  return 0;
}

// Функция для извлечения характеристик
function extractSpecifications(characteristics) {
  const specs = {};
  if (characteristics && Array.isArray(characteristics)) {
    characteristics.forEach(char => {
      if (char.name) {
        const [key, value] = char.name.split('\n');
        if (key && value) {
          specs[key.trim()] = value.trim();
        }
      }
    });
  }
  return specs;
}

// Функция для извлечения бренда из названия товара
function extractBrand(productName) {
  if (!productName) return 'Неизвестный бренд';
  const lines = productName.split('\n');
  if (lines.length > 1) {
    const secondLine = String(lines[1] || '').trim();
    const cleaned = secondLine.replace(/^бренд[:\s-]*/i, '');
    const firstToken = cleaned.split(/\s+/)[0];
    return firstToken && firstToken.length > 0 ? firstToken.trim() : 'Неизвестный бренд';
  }
  return 'Неизвестный бренд';
}

// Функция для извлечения модели из названия товара
function extractModel(productName) {
  if (!productName) return '';
  const lines = productName.split('\n');
  if (lines.length > 1) {
    const secondLine = String(lines[1] || '').trim();
    const cleaned = secondLine.replace(/^бренд[:\s-]*/i, '');
    const parts = cleaned.split(/\s+/);
    if (parts.length > 1) {
      const rest = cleaned.slice(parts[0].length).trim();
      return rest.replace(/арт[:\s].*$/i, '').trim();
    }
  }
  return '';
}

// Функция для рекурсивного обхода категорий
function processCategories(items, parentPath = '', parentId = '') {
  const result = [];
  
  items.forEach((item, index) => {
    const categoryId = createId(item.name);
    const fullPath = parentPath ? `${parentPath}/${categoryId}` : categoryId;
    
    const category = {
      id: categoryId,
      name: item.name,
      path: fullPath,
      url: item.url,
      parentId: parentId,
      level: parentPath.split('/').length,
      subcategories: []
    };
    
    // Обрабатываем подкатегории
    if (item.selection1) {
      category.subcategories = processCategories(item.selection1, fullPath, categoryId);
    } else if (item.selection2) {
      category.subcategories = processCategories(item.selection2, fullPath, categoryId);
    } else if (item.selection3) {
      category.subcategories = processCategories(item.selection3, fullPath, categoryId);
    }
    
    result.push(category);
  });
  
  return result;
}

// Функция для обработки товаров
function processProducts(items, categoryPath = '') {
  const products = [];
  
  items.forEach((item, index) => {
    if (item.products && Array.isArray(item.products)) {
      item.products.forEach((product, productIndex) => {
        const productId = createId(product.name);
        const brand = extractBrand(product.name);
        const model = extractModel(product.name);
        const price = extractPrice(product.price);
        const specifications = extractSpecifications(product.characteristics);
        
        const enhancedProduct = {
          id: productId,
          name: product.name.split('\n')[0], // Берем только первую строку как название
          brand: brand,
          model: model,
          category: categoryPath,
          price: price,
          currency: 'RUB',
          availability: 'В наличии',
          image: product.image || product.image_url || '',
          specifications: specifications,
          url: product.image_url || '',
          rating: 0,
          reviewCount: 0,
          isNew: false,
          isSale: false,
          isPopular: false,
          isBestseller: false
        };
        
        products.push(enhancedProduct);
      });
    }
  });
  
  return products;
}

// Обрабатываем навигационную структуру
if (data.dropdown__nav) {
  categoriesStructure.categories = processCategories(data.dropdown__nav);
  
  // Теперь обрабатываем товары для каждой категории
  const allProducts = [];
  
  function extractProductsFromCategories(categories, categoryPath = '') {
    categories.forEach(category => {
      const currentPath = categoryPath ? `${categoryPath}/${category.id}` : category.id;
      
      // Ищем товары в текущей категории
      const categoryProducts = processProducts([category], currentPath);
      allProducts.push(...categoryProducts);
      
      // Рекурсивно обрабатываем подкатегории
      if (category.subcategories && category.subcategories.length > 0) {
        extractProductsFromCategories(category.subcategories, currentPath);
      }
    });
  }
  
  extractProductsFromCategories(categoriesStructure.categories);
  categoriesStructure.products = allProducts;
}

// Создаем TypeScript файл с категориями
const categoriesTsContent = `// Автоматически сгенерировано на основе MIRCLI_CATALOGUE_results.json

export interface Subcategory {
  id: string;
  name: string;
  path: string;
  url: string;
  parentId: string;
  level: number;
  subcategories?: Subcategory[];
}

export interface Category {
  id: string;
  name: string;
  path: string;
  url: string;
  parentId: string;
  level: number;
  subcategories?: Subcategory[];
}

export interface ProductSpecification {
  [key: string]: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  model: string;
  category: string;
  price: number;
  currency: string;
  availability: string;
  image: string;
  specifications: ProductSpecification;
  url: string;
  rating: number;
  reviewCount: number;
  isNew: boolean;
  isSale: boolean;
  isPopular: boolean;
  isBestseller: boolean;
}

export const categories: Category[] = ${JSON.stringify(categoriesStructure.categories, null, 2)};

export const products: Product[] = ${JSON.stringify(categoriesStructure.products, null, 2)};

// Функции для работы с данными
const findCategoryRecursive = (cats: Category[], predicate: (c: Category) => boolean): Category | undefined => {
  for (const cat of cats) {
    if (predicate(cat)) return cat;
    const found = cat.subcategories ? findCategoryRecursive(cat.subcategories, predicate) : undefined;
    if (found) return found;
  }
  return undefined;
};

export const getCategoryById = (id: string): Category | undefined => {
  return findCategoryRecursive(categories, (cat) => cat.id === id);
};

export const getCategoryByPath = (path: string): Category | undefined => {
  return findCategoryRecursive(categories, (cat) => cat.path === path);
};

export const getProductsByCategory = (categoryPath: string): Product[] => {
  return products.filter(product => product.category === categoryPath);
};

export const getProductsByBrand = (brand: string): Product[] => {
  return products.filter(product => product.brand.toLowerCase().includes(brand.toLowerCase()));
};

export const searchProducts = (query: string): Product[] => {
  const lowerQuery = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(lowerQuery) ||
    product.brand.toLowerCase().includes(lowerQuery) ||
    product.model.toLowerCase().includes(lowerQuery)
  );
};

export const getCategoryHierarchy = (categoryId: string): Category[] => {
  const hierarchy: Category[] = [];
  let currentCategory = categories.find(cat => cat.id === categoryId);
  
  while (currentCategory) {
    hierarchy.unshift(currentCategory);
    if (currentCategory.parentId) {
      currentCategory = categories.find(cat => cat.id === currentCategory.parentId);
    } else {
      break;
    }
  }
  
  return hierarchy;
};

export const getSubcategories = (categoryId: string): Category[] => {
  const category = getCategoryById(categoryId);
  return category?.subcategories || [];
};

export const getAllProducts = (): Product[] => {
  return products;
};

export const getProductsBySubcategory = (subcategoryPath: string): Product[] => {
  return products.filter(product => product.category === subcategoryPath);
};
`;

// Создаем JSON файл с данными
const jsonContent = JSON.stringify(categoriesStructure, null, 2);

// Записываем файлы
fs.writeFileSync('src/data/enhanced-categories.ts', categoriesTsContent);
fs.writeFileSync('src/data/enhanced-catalog-data.json', jsonContent);

console.log('✅ Каталог успешно обработан!');
console.log(`📊 Найдено категорий: ${categoriesStructure.categories.length}`);
console.log(`📦 Найдено товаров: ${categoriesStructure.products.length}`);
console.log('📁 Файлы созданы:');
console.log('  - src/data/enhanced-categories.ts');
console.log('  - src/data/enhanced-catalog-data.json'); 