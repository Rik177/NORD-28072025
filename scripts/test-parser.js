import { EnhancedMircliVentilationParser } from './ventilation-parser-enhanced.js';

async function main() {
  console.log('🧪 Тестовый запуск парсера...');
  
  const parser = new EnhancedMircliVentilationParser({
    delay: 3000,
    captchaTimeout: 60000,
    testMode: true
  });
  
  try {
    console.log('🚀 Инициализация...');
    await parser.init();
    
    console.log('📂 Парсинг категорий...');
    await parser.parseCategories();
    
    console.log('📦 Парсинг товаров...');
    await parser.parseProducts();
    
    console.log('💾 Сохранение данных...');
    await parser.saveData();
    
    console.log('✅ Тестовый парсинг завершен!');
    console.log(`📊 Результаты:`);
    console.log(`   - Категорий: ${parser.categories.length}`);
    console.log(`   - Товаров: ${parser.products.length}`);
    
  } catch (error) {
    console.error('❌ Ошибка при тестовом парсинге:', error.message);
  } finally {
    await parser.close();
  }
}

main(); 