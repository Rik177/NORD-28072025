#!/usr/bin/env node

import readline from 'readline';
import { EnhancedMircliVentilationParser } from './ventilation-parser-enhanced.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🚀 Парсер вентиляции mircli.ru');
console.log('================================');

async function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

async function main() {
  try {
    console.log('\nВыберите режим парсинга:');
    console.log('1. Полный парсинг (категории + товары + детали)');
    console.log('2. Только категории');
    console.log('3. Только товары (если категории уже есть)');
    console.log('4. Только детали товаров (если товары уже есть)');
    console.log('5. Тестовый режим (1 категория, 1 товар)');
    
    const mode = await askQuestion('\nВведите номер режима (1-5): ');
    
    console.log('\nНастройки:');
    const delay = await askQuestion('Задержка между запросами (мс, по умолчанию 2000): ') || '2000';
    const captchaTimeout = await askQuestion('Таймаут для CAPTCHA (сек, по умолчанию 60): ') || '60';
    
    const parser = new EnhancedMircliVentilationParser({
      delay: parseInt(delay),
      captchaTimeout: parseInt(captchaTimeout) * 1000
    });
    
    console.log('\n⏳ Запуск парсера...');
    
    switch (mode) {
      case '1':
        console.log('Режим: Полный парсинг');
        await parser.init();
        await parser.parseCategories();
        await parser.parseProducts();
        await parser.saveData();
        break;
      case '2':
        console.log('Режим: Только категории');
        await parser.init();
        await parser.parseCategories();
        await parser.saveData();
        break;
      case '3':
        console.log('Режим: Только товары');
        await parser.init();
        await parser.parseProducts();
        await parser.saveData();
        break;
      case '4':
        console.log('Режим: Только детали товаров');
        await parser.init();
        await parser.parseProductDetails();
        await parser.saveData();
        break;
      case '5':
        console.log('Режим: Тестовый');
        parser.testMode = true;
        await parser.init();
        await parser.parseCategories();
        await parser.parseProducts();
        await parser.saveData();
        break;
      default:
        console.log('❌ Неверный режим');
        return;
    }
    
    console.log('✅ Парсинг завершен!');
    console.log('📁 Данные сохранены в:');
    console.log('   - src/data/mircli-ventilation-data.json');
    console.log('   - src/data/ventilationData.ts');
    
  } catch (error) {
    console.error('❌ Ошибка:', error.message);
  } finally {
    rl.close();
  }
}

main(); 