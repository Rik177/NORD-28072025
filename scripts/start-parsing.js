#!/usr/bin/env node

const readline = require('readline');
const EnhancedMircliVentilationParser = require('./ventilation-parser-enhanced');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function main() {
  console.log('🎯 Парсер каталога вентиляции с сайта mircli.ru');
  console.log('=' .repeat(60));
  console.log('');
  
  console.log('📋 Выберите режим парсинга:');
  console.log('1. Полный парсинг (категории + товары + детали)');
  console.log('2. Только категории');
  console.log('3. Только товары (если категории уже есть)');
  console.log('4. Только детали товаров (если товары уже есть)');
  console.log('5. Тестовый режим (1-2 товара для проверки)');
  console.log('');

  const mode = await question('Введите номер режима (1-5): ');
  
  console.log('');
  console.log('⚙️  Настройки парсера:');
  
  const delay = await question('Задержка между запросами в секундах (по умолчанию 3): ') || '3';
  const timeout = await question('Таймаут для капчи в минутах (по умолчанию 2): ') || '2';
  
  console.log('');
  console.log('⚠️  Важные предупреждения:');
  console.log('• Парсер откроет браузер автоматически');
  console.log('• Если появится капча, решите её в браузере');
  console.log('• Не закрывайте терминал во время работы');
  console.log('• Полный парсинг может занять 2-3 часа');
  console.log('');

  const confirm = await question('Продолжить? (y/N): ');
  
  if (confirm.toLowerCase() !== 'y' && confirm.toLowerCase() !== 'yes') {
    console.log('❌ Парсинг отменен');
    rl.close();
    return;
  }

  console.log('');
  console.log('🚀 Запуск парсера...');
  console.log('');

  // Создаем кастомный парсер с настройками
  class CustomParser extends EnhancedMircliVentilationParser {
    constructor() {
      super();
      this.delayMs = parseInt(delay) * 1000;
      this.captchaTimeout = parseInt(timeout) * 60 * 1000;
      this.testMode = mode === '5';
    }

    async delay(ms) {
      return new Promise(resolve => setTimeout(resolve, this.delayMs));
    }

    async handleCaptcha() {
      const captchaSelectors = [
        '.captcha-form',
        '.captcha',
        '[class*="captcha"]',
        'form[action*="captcha"]'
      ];

      for (const selector of captchaSelectors) {
        const captchaExists = await this.page.$(selector);
        if (captchaExists) {
          console.log(`🔒 Обнаружена капча (${selector})`);
          console.log('⏳ Ожидаем решения капчи...');
          
          try {
            await this.page.waitForSelector(selector, { 
              hidden: true, 
              timeout: this.captchaTimeout 
            });
            console.log('✅ Капча решена, продолжаем...');
            await this.delay(3000);
            return true;
          } catch (error) {
            console.log('❌ Капча не была решена в течение отведенного времени');
            return false;
          }
        }
      }
      return false;
    }

    async parseProducts() {
      if (this.testMode) {
        console.log('🧪 Тестовый режим: парсим только первые 2 товара');
        const allCategories = this.getAllCategories(this.categories);
        
        if (allCategories.length > 0) {
          const category = allCategories[0];
          console.log(`Парсинг товаров для: ${category.title}`);
          
          try {
            await this.page.goto(category.url, { waitUntil: 'networkidle0' });
            await this.delay(3000);
            await this.handleCaptcha();

            const products = await this.page.evaluate((categoryTitle) => {
              const productSelectors = [
                '.catalog-item',
                '.product-item',
                '.product-card',
                '.item',
                '[class*="product"]',
                '[class*="item"]'
              ];

              const prods = [];
              const processedUrls = new Set();

              productSelectors.forEach(selector => {
                const elements = document.querySelectorAll(selector);
                elements.forEach((element, index) => {
                  if (prods.length >= 2) return; // Ограничиваем 2 товарами
                  
                  const link = element.querySelector('a') || element.closest('a');
                  const title = element.querySelector('.catalog-item__title, .product-item__title, .product-title, .title, h3, h4') || 
                               element.querySelector('[class*="title"]') ||
                               element.querySelector('strong, b');
                  const image = element.querySelector('img');
                  const price = element.querySelector('.price, .catalog-item__price, .product-price, [class*="price"]');
                  const sku = element.querySelector('.sku, .catalog-item__sku, .product-sku, [class*="sku"]');
                  
                  if (link && title && !processedUrls.has(link.href)) {
                    processedUrls.add(link.href);
                    prods.push({
                      id: Date.now() + index + Math.random(),
                      title: title.textContent.trim(),
                      url: link.href,
                      image: image ? image.src : null,
                      price: price ? price.textContent.trim() : null,
                      sku: sku ? sku.textContent.trim() : null,
                      category: categoryTitle,
                      categoryId: category.id
                    });
                  }
                });
              });
              
              return prods;
            }, category.title);

            this.products.push(...products);
            console.log(`Найдено ${products.length} товаров (тестовый режим)`);
          } catch (error) {
            console.error(`Ошибка при парсинге товаров для ${category.title}:`, error.message);
          }
        }
      } else {
        await super.parseProducts();
      }
    }

    async parseProductDetails() {
      if (this.testMode) {
        console.log('🧪 Тестовый режим: парсим детали только для первых 2 товаров');
        const productsToParse = this.products.slice(0, 2);
        
        for (let i = 0; i < productsToParse.length; i++) {
          const product = productsToParse[i];
          console.log(`Парсинг деталей для: ${product.title} (${i + 1}/${productsToParse.length})`);
          
          try {
            await this.page.goto(product.url, { waitUntil: 'networkidle0' });
            await this.delay(3000);
            await this.handleCaptcha();

            const details = await this.page.evaluate(() => {
              const descriptionSelectors = [
                '.product-description',
                '.description',
                '.product-info',
                '.product-details',
                '[class*="description"]',
                '[class*="info"]'
              ];

              const characteristicsSelectors = [
                '.product-characteristics',
                '.characteristics',
                '.specifications',
                '.product-specs',
                '[class*="characteristics"]',
                '[class*="specs"]'
              ];

              const imageSelectors = [
                '.product-gallery img',
                '.product-images img',
                '.gallery img',
                '.images img',
                '[class*="gallery"] img',
                '[class*="images"] img'
              ];

              let description = null;
              for (const selector of descriptionSelectors) {
                const element = document.querySelector(selector);
                if (element) {
                  description = element.textContent.trim();
                  break;
                }
              }

              const specs = {};
              for (const selector of characteristicsSelectors) {
                const element = document.querySelector(selector);
                if (element) {
                  const rows = element.querySelectorAll('tr, .characteristic-row, .spec-row, .row');
                  rows.forEach(row => {
                    const name = row.querySelector('td:first-child, .characteristic-name, .spec-name, .name') ||
                               row.querySelector('th, strong, b');
                    const value = row.querySelector('td:last-child, .characteristic-value, .spec-value, .value') ||
                                row.querySelector('td:nth-child(2)');
                    if (name && value) {
                      specs[name.textContent.trim()] = value.textContent.trim();
                    }
                  });
                  break;
                }
              }
              
              const imageUrls = [];
              for (const selector of imageSelectors) {
                const images = document.querySelectorAll(selector);
                if (images.length > 0) {
                  images.forEach(img => {
                    if (img.src && !imageUrls.includes(img.src)) {
                      imageUrls.push(img.src);
                    }
                  });
                  break;
                }
              }
              
              return {
                description,
                specifications: specs,
                images: imageUrls
              };
            });

            // Обновляем продукт в массиве
            const productIndex = this.products.findIndex(p => p.id === product.id);
            if (productIndex !== -1) {
              this.products[productIndex] = { ...product, ...details };
            }
            
          } catch (error) {
            console.error(`Ошибка при парсинге деталей для ${product.title}:`, error.message);
          }
        }
      } else {
        await super.parseProductDetails();
      }
    }

    async run() {
      try {
        await this.init();
        
        if (mode === '1' || mode === '2') {
          await this.parseCategories();
        }
        
        if (mode === '1' || mode === '3') {
          await this.parseProducts();
        }
        
        if (mode === '1' || mode === '4') {
          await this.parseProductDetails();
        }
        
        await this.saveData();
        console.log('✅ Парсинг завершен успешно!');
      } catch (error) {
        console.error('❌ Ошибка при парсинге:', error);
      } finally {
        await this.close();
      }
    }
  }

  const parser = new CustomParser();
  await parser.run();
  
  rl.close();
}

main().catch(console.error); 