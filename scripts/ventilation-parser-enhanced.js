const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');

class EnhancedMircliVentilationParser {
  constructor() {
    this.baseUrl = 'https://mircli.ru';
    this.ventilationUrl = 'https://mircli.ru/ventilyatsiya';
    this.categories = [];
    this.products = [];
  }

  async init() {
    this.browser = await puppeteer.launch({
      headless: false,
      defaultViewport: { width: 1920, height: 1080 },
      args: [
        '--no-sandbox', 
        '--disable-setuid-sandbox',
        '--disable-web-security',
        '--disable-features=VizDisplayCompositor'
      ]
    });
    this.page = await this.browser.newPage();
    
    // Устанавливаем user-agent для избежания блокировки
    await this.page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    
    // Устанавливаем задержки между запросами
    await this.page.setDefaultNavigationTimeout(60000);
    
    // Перехватываем запросы для оптимизации
    await this.page.setRequestInterception(true);
    this.page.on('request', (req) => {
      if (['image', 'stylesheet', 'font'].includes(req.resourceType())) {
        req.abort();
      } else {
        req.continue();
      }
    });
  }

  async delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
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
        console.log(`Обнаружена капча (${selector}). Ожидаем ручного ввода...`);
        console.log('Пожалуйста, решите капчу в браузере и нажмите Enter в консоли');
        
        // Ждем пока капча исчезнет или страница перезагрузится
        try {
          await this.page.waitForSelector(selector, { hidden: true, timeout: 120000 });
          console.log('Капча решена, продолжаем парсинг...');
          await this.delay(3000);
          return true;
        } catch (error) {
          console.log('Капча не была решена в течение 2 минут');
          return false;
        }
      }
    }
    return false;
  }

  async parseCategories() {
    console.log('Начинаем парсинг категорий вентиляции...');
    
    try {
      await this.page.goto(this.ventilationUrl, { waitUntil: 'networkidle0' });
      await this.delay(5000);

      // Обрабатываем капчу если есть
      await this.handleCaptcha();

      // Получаем все категории с различными селекторами
      const categories = await this.page.evaluate(() => {
        const selectors = [
          '.catalog-section',
          '.catalog-item',
          '.category-item',
          '.catalog-category',
          '[class*="catalog"]',
          '.product-category',
          '.category'
        ];

        const cats = [];
        const processedUrls = new Set();

        selectors.forEach(selector => {
          const elements = document.querySelectorAll(selector);
          elements.forEach((element, index) => {
            const link = element.querySelector('a') || element.closest('a');
            const title = element.querySelector('.catalog-section__title, .catalog-item__title, .category-title, h3, h4, .title') || 
                         element.querySelector('[class*="title"]') ||
                         element.querySelector('strong, b');
            const image = element.querySelector('img');
            
            if (link && title && !processedUrls.has(link.href)) {
              processedUrls.add(link.href);
              cats.push({
                id: cats.length + 1,
                title: title.textContent.trim(),
                url: link.href,
                image: image ? image.src : null,
                subcategories: []
              });
            }
          });
        });
        
        return cats;
      });

      this.categories = categories;
      console.log(`Найдено ${categories.length} основных категорий`);

      // Парсим подкатегории для каждой категории
      for (let i = 0; i < this.categories.length; i++) {
        const category = this.categories[i];
        console.log(`Парсинг подкатегорий для: ${category.title}`);
        
        try {
          await this.page.goto(category.url, { waitUntil: 'networkidle0' });
          await this.delay(3000);

          await this.handleCaptcha();

          const subcategories = await this.page.evaluate(() => {
            const selectors = [
              '.catalog-section',
              '.catalog-item',
              '.category-item',
              '.catalog-category',
              '[class*="catalog"]',
              '.product-category',
              '.category'
            ];

            const subs = [];
            const processedUrls = new Set();

            selectors.forEach(selector => {
              const elements = document.querySelectorAll(selector);
              elements.forEach((element, index) => {
                const link = element.querySelector('a') || element.closest('a');
                const title = element.querySelector('.catalog-section__title, .catalog-item__title, .category-title, h3, h4, .title') || 
                             element.querySelector('[class*="title"]') ||
                             element.querySelector('strong, b');
                const image = element.querySelector('img');
                
                if (link && title && !processedUrls.has(link.href)) {
                  processedUrls.add(link.href);
                  subs.push({
                    id: subs.length + 1,
                    title: title.textContent.trim(),
                    url: link.href,
                    image: image ? image.src : null,
                    subcategories: []
                  });
                }
              });
            });
            
            return subs;
          });

          this.categories[i].subcategories = subcategories;
          console.log(`Найдено ${subcategories.length} подкатегорий для ${category.title}`);
          
        } catch (error) {
          console.error(`Ошибка при парсинге подкатегорий для ${category.title}:`, error.message);
        }
      }

    } catch (error) {
      console.error('Ошибка при парсинге категорий:', error);
    }
  }

  async parseProducts() {
    console.log('Начинаем парсинг товаров...');
    
    const allCategories = this.getAllCategories(this.categories);
    
    for (let i = 0; i < allCategories.length; i++) {
      const category = allCategories[i];
      console.log(`Парсинг товаров для: ${category.title} (${i + 1}/${allCategories.length})`);
      
      try {
        await this.page.goto(category.url, { waitUntil: 'networkidle0' });
        await this.delay(3000);

        await this.handleCaptcha();

        // Проверяем, есть ли пагинация
        const hasPagination = await this.page.$('.pagination, .pager, [class*="pagination"], [class*="pager"]');
        let currentPage = 1;
        let hasNextPage = true;

        while (hasNextPage) {
          console.log(`Страница ${currentPage} для ${category.title}`);
          
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
          console.log(`Найдено ${products.length} товаров на странице ${currentPage}`);

          // Проверяем следующую страницу
          if (hasPagination) {
            const nextSelectors = [
              '.pagination__next:not(.disabled)',
              '.pager__next:not(.disabled)',
              '[class*="next"]:not([class*="disabled"])',
              'a[href*="page"]',
              '.next'
            ];

            let nextButton = null;
            for (const selector of nextSelectors) {
              nextButton = await this.page.$(selector);
              if (nextButton) break;
            }

            if (nextButton) {
              await nextButton.click();
              await this.delay(3000);
              currentPage++;
            } else {
              hasNextPage = false;
            }
          } else {
            hasNextPage = false;
          }
        }
        
      } catch (error) {
        console.error(`Ошибка при парсинге товаров для ${category.title}:`, error.message);
      }
    }
  }

  getAllCategories(categories) {
    let allCategories = [];
    
    categories.forEach(category => {
      allCategories.push(category);
      if (category.subcategories && category.subcategories.length > 0) {
        allCategories = allCategories.concat(this.getAllCategories(category.subcategories));
      }
    });
    
    return allCategories;
  }

  async parseProductDetails() {
    console.log('Начинаем парсинг детальной информации о товарах...');
    
    for (let i = 0; i < this.products.length; i++) {
      const product = this.products[i];
      console.log(`Парсинг деталей для: ${product.title} (${i + 1}/${this.products.length})`);
      
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

        this.products[i] = { ...product, ...details };
        
      } catch (error) {
        console.error(`Ошибка при парсинге деталей для ${product.title}:`, error.message);
      }
    }
  }

  async saveData() {
    console.log('Сохраняем данные...');
    
    const data = {
      categories: this.categories,
      products: this.products,
      totalProducts: this.products.length,
      totalCategories: this.categories.length,
      parsedAt: new Date().toISOString()
    };

    // Создаем директорию если её нет
    await fs.mkdir('src/data', { recursive: true });
    
    // Сохраняем в JSON
    await fs.writeFile(
      'src/data/mircli-ventilation-data.json',
      JSON.stringify(data, null, 2),
      'utf8'
    );

    // Создаем TypeScript файл для интеграции
    const tsContent = `// Данные парсинга вентиляции с mircli.ru
export const ventilationCategories = ${JSON.stringify(this.categories, null, 2)};

export const ventilationProducts = ${JSON.stringify(this.products, null, 2)};

export const ventilationData = {
  categories: ventilationCategories,
  products: ventilationProducts,
  totalProducts: ${this.products.length},
  totalCategories: ${this.categories.length},
  parsedAt: "${new Date().toISOString()}"
};
`;

    await fs.writeFile('src/data/ventilationData.ts', tsContent, 'utf8');
    
    console.log('Данные сохранены в src/data/mircli-ventilation-data.json и src/data/ventilationData.ts');
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
    }
  }

  async run() {
    try {
      await this.init();
      await this.parseCategories();
      await this.parseProducts();
      await this.parseProductDetails();
      await this.saveData();
      console.log('Парсинг завершен успешно!');
    } catch (error) {
      console.error('Ошибка при парсинге:', error);
    } finally {
      await this.close();
    }
  }
}

// Запуск парсера
if (require.main === module) {
  const parser = new EnhancedMircliVentilationParser();
  parser.run();
}

module.exports = EnhancedMircliVentilationParser; 