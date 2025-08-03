import { MircliProductsParser } from './mircli-products-parser.js';

async function main() {
  console.log('🧪 Запуск тестового парсера товаров mircli...');
  
  const parser = new MircliProductsParser({
    delay: 2000,
    captchaTimeout: 30000,
    testMode: true // Тестовый режим
  });

  try {
    await parser.run();
    console.log('✅ Тестовый парсинг завершен успешно!');
    console.log(`📊 Результаты:`);
    console.log(`   - Категорий: ${parser.categories.length}`);
    console.log(`   - Товаров: ${parser.products.length}`);
    console.log(`   - Время: ${new Date().toISOString()}`);
    
    // Показываем примеры данных
    if (parser.products.length > 0) {
      console.log('\n📦 Примеры товаров:');
      parser.products.slice(0, 3).forEach((product, index) => {
        console.log(`   ${index + 1}. ${product.name} - ${product.price} ₽`);
      });
    }
    
    if (parser.categories.length > 0) {
      console.log('\n📂 Категории:');
      parser.categories.forEach((category, index) => {
        console.log(`   ${index + 1}. ${category.title} (${category.productCount} товаров)`);
      });
    }
    
  } catch (error) {
    console.error('❌ Ошибка при тестовом парсинге:', error.message);
    process.exit(1);
  }
}

main(); 