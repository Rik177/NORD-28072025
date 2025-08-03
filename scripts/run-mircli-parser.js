import { MircliProductsParser } from './mircli-products-parser.js';

async function main() {
  console.log('🚀 Запуск парсера товаров mircli...');
  
  const parser = new MircliProductsParser({
    delay: 3000,
    captchaTimeout: 60000,
    testMode: false // Установите true для тестового режима
  });

  try {
    await parser.run();
    console.log('✅ Парсинг завершен успешно!');
    console.log(`📊 Результаты:`);
    console.log(`   - Категорий: ${parser.categories.length}`);
    console.log(`   - Товаров: ${parser.products.length}`);
    console.log(`   - Время: ${new Date().toISOString()}`);
  } catch (error) {
    console.error('❌ Ошибка при парсинге:', error.message);
    process.exit(1);
  }
}

main(); 