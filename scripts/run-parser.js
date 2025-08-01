const EnhancedMircliVentilationParser = require('./ventilation-parser-enhanced');

async function main() {
  console.log('🚀 Запуск парсера вентиляции с сайта mircli.ru');
  console.log('📋 Парсер будет собирать:');
  console.log('   - Все категории и подкатегории вентиляции');
  console.log('   - Все товары с изображениями и характеристиками');
  console.log('   - Детальную информацию о каждом товаре');
  console.log('');
  console.log('⚠️  Внимание: Если появится капча, пожалуйста, решите её в браузере');
  console.log('⏱️  Парсинг может занять от 30 минут до 2 часов в зависимости от количества товаров');
  console.log('');

  const parser = new EnhancedMircliVentilationParser();
  
  try {
    await parser.run();
    console.log('');
    console.log('✅ Парсинг завершен успешно!');
    console.log('📁 Данные сохранены в:');
    console.log('   - src/data/mircli-ventilation-data.json');
    console.log('   - src/data/ventilationData.ts');
    console.log('');
    console.log('🔄 Теперь можно интегрировать данные в ваш проект');
  } catch (error) {
    console.error('❌ Ошибка при парсинге:', error);
    process.exit(1);
  }
}

main(); 