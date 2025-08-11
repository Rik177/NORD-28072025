const fs = require('fs');
const path = require('path');

console.log('🔍 Начинаю обработку каталога...');

// Читаем исходный файл
const rawData = fs.readFileSync('MIRCLI_CATALOGUE_results.json', 'utf8');
console.log('📖 Файл прочитан, размер:', (rawData.length / 1024 / 1024).toFixed(2), 'MB');

const data = JSON.parse(rawData);
console.log('✅ JSON успешно распарсен');

// Структура для хранения категорий и товаров
const categoriesStructure = {
  categories: [],
  products: []
};

// Функция для конвертации кириллицы в латиницу
function transliterate(text) {
  const cyrillicToLatin = {
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo',
    'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm',
    'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
    'ф': 'f', 'х': 'h', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'sch',
    'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya',
    'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D', 'Е': 'E', 'Ё': 'Yo',
    'Ж': 'Zh', 'З': 'Z', 'И': 'I', 'Й': 'Y', 'К': 'K', 'Л': 'L', 'М': 'M',
    'Н': 'N', 'О': 'O', 'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T', 'У': 'U',
    'Ф': 'F', 'Х': 'H', 'Ц': 'Ts', 'Ч': 'Ch', 'Ш': 'Sh', 'Щ': 'Sch',
    'Ъ': '', 'Ы': 'Y', 'Ь': '', 'Э': 'E', 'Ю': 'Yu', 'Я': 'Ya'
  };
  
  return text.split('').map(char => cyrillicToLatin[char] || char).join('');
}

// Функция для создания уникального ID
function createId(name) {
  const transliterated = transliterate(name);
  return transliterated
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
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

// Функция для создания пути категории (такая же логика как в processCategories)
function createCategoryPath(item, parentPath = '') {
  const categoryId = createId(item.name);
  return parentPath ? `${parentPath}/${categoryId}` : categoryId;
}

// Функция для маппинга старых путей к новым
function mapOldPathToNewPath(oldPath) {
  // Маппинг старых путей к новым
  const pathMapping = {
    'napol-nye': 'napol-nye-ventilyatory',
    'nastennye': 'nastennye-ventilyatory', 
    'nastol-nye': 'nastol-nye-ventilyatory',
    'potolochnye': 'potolochnye-ventilyatory',
    'vytyazhki-dlya-vannoy': 'vytyazhki-dlya-vannoy',
    'promyshlennye': 'promyshlennye'
  };
  
  // Разбиваем путь на части
  const pathParts = oldPath.split('/');
  const mappedParts = pathParts.map(part => pathMapping[part] || part);
  let mapped = mappedParts.join('/');
  // Специальное правило: diffuzory должны быть на верхнем уровне, а не под ventilyatsionnye-reshetki
  if (/^ventilyatsionnye-reshetki\/diffuzory/.test(mapped)) {
    mapped = mapped.replace(/^ventilyatsionnye-reshetki\/diffuzory/, 'diffuzory');
  }
  return mapped;
}

// Функция для поиска товаров во всей структуре данных
function findProducts(data) {
  const products = [];
  let productCount = 0;

  // Определяем материал для решеток и маппим подкатегорию
  function mapVentGrilleMaterialCategory(originalPath, specs) {
    if (typeof originalPath !== 'string') return originalPath;
    if (!/^ventilyatsionnye-reshetki(\/|$)/.test(originalPath)) return originalPath;
    if (!specs || typeof specs !== 'object') return originalPath;

    const materialValueRaw = specs['Материал'] || specs['Материал корпуса'] || specs['Материал решетки'];
    if (!materialValueRaw) return originalPath;
    const material = String(materialValueRaw).toLowerCase();

    // Простая эвристика по материалам
    if (/(пласт|abs)/.test(material)) {
      return 'ventilyatsionnye-reshetki/plastikovye';
    }
    if (/(дерев|мдф|mdf|бук|дуб)/.test(material)) {
      return 'ventilyatsionnye-reshetki/derevyannye';
    }
    if (/(сталь|металл|алюм|нержав)/.test(material)) {
      return 'ventilyatsionnye-reshetki/metallicheskie';
    }
    return originalPath;
  }
  
  // Рекурсивная функция для поиска товаров в любом объекте
  function searchForProductsRecursively(obj, path = '') {
    if (!obj || typeof obj !== 'object') return;

    // 1) Прямые товары на этом уровне
    if (Array.isArray(obj.products)) {
      console.log(`📦 Найдены товары в: ${path}`);
      obj.products.forEach((product) => {
        productCount++;
        if (productCount % 100 === 0) console.log(`   Обработано товаров: ${productCount}`);

        const productId = createId(product.name || `product-${productCount}`);
        const brand = extractBrand(product.name || '');
        const model = extractModel(product.name || '');
        const price = extractPrice(product.price);
        const specifications = extractSpecifications(product.characteristics);

        let categoryPath = mapOldPathToNewPath(path);
        // Для решеток уточняем подкатегорию по материалу
        categoryPath = mapVentGrilleMaterialCategory(categoryPath, specifications);

        const enhancedProduct = {
          id: productId,
          name: String(product.name || '').split('\n')[0],
          brand,
          model,
          category: categoryPath,
          price,
          currency: 'RUB',
          availability: 'В наличии',
          image: product.image || product.image_url || '',
          specifications,
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

    // 2) Пагинация с товарами
    if (Array.isArray(obj.pagination)) {
      obj.pagination.forEach((page) => {
        if (Array.isArray(page.products)) {
          console.log(`📦 Найдены товары (pagination) в: ${path}`);
          page.products.forEach((product) => {
            productCount++;
            if (productCount % 100 === 0) console.log(`   Обработано товаров: ${productCount}`);

            const productId = createId(product.name || `product-${productCount}`);
            const brand = extractBrand(product.name || '');
            const model = extractModel(product.name || '');
            const price = extractPrice(product.price);
            const specifications = extractSpecifications(product.characteristics);

          let categoryPath = mapOldPathToNewPath(path);
          categoryPath = mapVentGrilleMaterialCategory(categoryPath, specifications);

            const enhancedProduct = {
              id: productId,
              name: String(product.name || '').split('\n')[0],
              brand,
              model,
              category: categoryPath,
              price,
              currency: 'RUB',
              availability: 'В наличии',
              image: product.image || product.image_url || '',
              specifications,
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
        // На случай, если внутри страницы тоже есть вложенные уровни
        searchForProductsRecursively(page, path);
      });
    }

    // 3) Любые selectionN ключи (selection1..selectionX)
    Object.keys(obj).forEach((key) => {
      const value = obj[key];
      if (/^selection\d+$/.test(key) && Array.isArray(value)) {
        value.forEach((item) => {
          const newPath = createCategoryPath(item, path);
          searchForProductsRecursively(item, newPath);
        });
      }
    });
  }
  
  // Ищем товары во всех ключах объекта data
  Object.keys(data).forEach(key => {
    console.log(`🔍 Проверяю ключ: ${key}`);
    if (Array.isArray(data[key])) {
      data[key].forEach((item, index) => {
        const itemPath = item.name ? createCategoryPath(item) : `item-${index}`;
        searchForProductsRecursively(item, itemPath);
      });
    } else if (typeof data[key] === 'object' && data[key] !== null) {
      searchForProductsRecursively(data[key], key);
    }
  });
  
  console.log(`✅ Всего найдено товаров: ${productCount}`);
  return products;
}

console.log('🏗️ Обрабатываю структуру категорий...');

// Обрабатываем навигационную структуру
if (data.dropdown__nav) {
  categoriesStructure.categories = processCategories(data.dropdown__nav);
  console.log(`📊 Обработано категорий: ${categoriesStructure.categories.length}`);
  
  console.log('🔍 Ищу товары в структуре данных...');
  categoriesStructure.products = findProducts(data);
}

// Создаем TypeScript файл с категориями
console.log('📝 Создаю TypeScript файл...');

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
console.log('📄 Создаю JSON файл...');
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