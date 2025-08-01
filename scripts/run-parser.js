import { EnhancedMircliVentilationParser } from './ventilation-parser-enhanced.js';

async function main() {
  console.log('🚀 Запуск парсера вентиляции...');
  
  const parser = new EnhancedMircliVentilationParser();
  
  try {
    await parser.init();
    await parser.parseCategories();
    await parser.parseProducts();
    await parser.parseProductDetails();
    await parser.saveData();
    console.log('✅ Парсинг завершен успешно!');
  } catch (error) {
    console.error('❌ Ошибка при парсинге:', error);
  } finally {
    await parser.close();
  }
}

main(); 