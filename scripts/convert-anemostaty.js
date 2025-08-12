import fs from 'fs';
import path from 'path';

// Читаем исходные данные анемостатов
const anemostsData = JSON.parse(fs.readFileSync('anemostaty_results.json', 'utf-8'));

// Читаем существующий каталог
const catalogPath = 'src/data/enhanced-catalog-data.json';
const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf-8'));

// Функция для генерации ID из названия
function generateId(name) {
  return name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]/g, '')
    .replace(/--+/g, '-')
    .replace(/^-|-$/g, '');
}

// Функция для извлечения цены
function extractPrice(priceStr) {
  const match = priceStr.match(/(\d+(?:\s*\d+)*)/);
  return match ? parseInt(match[1].replace(/\s/g, '')) : 0;
}

// Функция для определения категории по типу
function categorizeProduct(characteristics) {
  const typeChar = characteristics.find(char => char.name.includes('Тип'));
  if (!typeChar) return 'anemostaty';
  
  const type = typeChar.name.split('\n')[1];
  if (type === 'Приточный') return 'anemostaty/pritochnye';
  if (type === 'Вытяжной') return 'anemostaty/vytyazhnye';
  if (type === 'Универсальный' || type === 'Приточно-вытяжной') return 'anemostaty/pritochno-vytyazhnye';
  
  return 'anemostaty';
}

// Функция для извлечения характеристик
function extractSpecifications(characteristics) {
  const specs = {};
  characteristics.forEach(char => {
    const parts = char.name.split('\n');
    if (parts.length === 2) {
      specs[parts[0]] = parts[1];
    }
  });
  return specs;
}

// Функция для извлечения бренда и модели из названия
function extractBrandAndModel(name) {
  const lines = name.split('\n');
  if (lines.length >= 2) {
    const secondLine = lines[1];
    const parts = secondLine.split(' ');
    return {
      brand: parts[0] || 'Неизвестный бренд',
      model: parts.slice(1).join(' ') || secondLine
    };
  }
  return {
    brand: 'Неизвестный бренд',
    model: name.split('\n')[0] || name
  };
}

// Преобразуем данные анемостатов
const convertedProducts = [];

// Обрабатываем основную страницу
if (anemostsData.product_card) {
  anemostsData.product_card.forEach(product => {
    const { brand, model } = extractBrandAndModel(product.name);
    const specifications = extractSpecifications(product.product_characteristics);
    const price = extractPrice(product.product_price);
    const category = categorizeProduct(product.product_characteristics);
    
    const convertedProduct = {
      id: generateId(product.name),
      name: product.product_model.replace(/\n/g, ' '),
      brand: brand,
      model: model,
      category: category,
      price: price,
      currency: "RUB",
      availability: "В наличии",
      image: product.product_model_url,
      specifications: specifications,
      url: product.product_model_url,
      rating: 0,
      reviewCount: 0,
      isNew: false,
      isSale: false,
      isPopular: false
    };
    
    convertedProducts.push(convertedProduct);
  });
}

// Обрабатываем дополнительные страницы из пагинации
if (anemostsData.pagination) {
  anemostsData.pagination.forEach(page => {
    if (page.product_card) {
      page.product_card.forEach(product => {
        const { brand, model } = extractBrandAndModel(product.name);
        const specifications = extractSpecifications(product.product_characteristics);
        const price = extractPrice(product.product_price);
        const category = categorizeProduct(product.product_characteristics);
        
        const convertedProduct = {
          id: generateId(product.name),
          name: product.product_model.replace(/\n/g, ' '),
          brand: brand,
          model: model,
          category: category,
          price: price,
          currency: "RUB",
          availability: "В наличии",
          image: product.product_model_url,
          specifications: specifications,
          url: product.product_model_url,
          rating: 0,
          reviewCount: 0,
          isNew: false,
          isSale: false,
          isPopular: false
        };
        
        convertedProducts.push(convertedProduct);
      });
    }
  });
}

// Удаляем существующие анемостаты из каталога (если есть)
catalog.products = catalog.products.filter(product => 
  !product.category.includes('anemostaty')
);

// Добавляем новые товары анемостатов
catalog.products.push(...convertedProducts);

// Сохраняем обновленный каталог
fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 2), 'utf-8');

console.log(`✅ Успешно добавлено ${convertedProducts.length} анемостатов в каталог`);
console.log(`📊 Статистика по категориям:`);

const categoryStats = {};
convertedProducts.forEach(product => {
  categoryStats[product.category] = (categoryStats[product.category] || 0) + 1;
});

Object.entries(categoryStats).forEach(([category, count]) => {
  console.log(`   - ${category}: ${count} товаров`);
});

console.log(`💾 Каталог сохранен в: ${catalogPath}`);
