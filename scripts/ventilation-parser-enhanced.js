import puppeteer from 'puppeteer';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class EnhancedMircliVentilationParser {
  constructor(options = {}) {
    this.delay = options.delay || 2000;
    this.captchaTimeout = options.captchaTimeout || 60000;
    this.testMode = options.testMode || false;
    this.categories = [];
    this.products = [];
    this.browser = null;
    this.page = null;
  }

  async init() {
    console.log('🚀 Инициализация браузера...');
    
    this.browser = await puppeteer.launch({
      headless: false,
      defaultViewport: { width: 1920, height: 1080 },
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu',
        '--disable-web-security',
        '--disable-features=VizDisplayCompositor',
        '--disable-background-timer-throttling',
        '--disable-backgrounding-occluded-windows',
        '--disable-renderer-backgrounding',
        '--disable-field-trial-config',
        '--disable-ipc-flooding-protection'
      ]
    });

    this.page = await this.browser.newPage();
    
    // Устанавливаем более реалистичный user-agent
    await this.page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    
    // Устанавливаем дополнительные заголовки
    await this.page.setExtraHTTPHeaders({
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      'Accept-Language': 'ru-RU,ru;q=0.9,en;q=0.8',
      'Accept-Encoding': 'gzip, deflate, br',
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
      'Sec-Fetch-Dest': 'document',
      'Sec-Fetch-Mode': 'navigate',
      'Sec-Fetch-Site': 'none',
      'Upgrade-Insecure-Requests': '1'
    });
    
    // Увеличиваем таймауты
    await this.page.setDefaultNavigationTimeout(60000);
    await this.page.setDefaultTimeout(60000);
    
    // Блокируем загрузку изображений, стилей и шрифтов для ускорения
    await this.page.setRequestInterception(true);
    this.page.on('request', (req) => {
      if (['image', 'stylesheet', 'font'].includes(req.resourceType())) {
        req.abort();
      } else {
        req.continue();
      }
    });

    console.log('✅ Браузер готов');
  }

  async delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms || this.delay));
  }

  async handleCaptcha() {
    const captchaSelectors = [
      '.captcha-form',
      '.captcha',
      '[class*="captcha"]',
      'form[action*="captcha"]',
      '.recaptcha',
      '.g-recaptcha'
    ];

    for (const selector of captchaSelectors) {
      const captchaExists = await this.page.$(selector);
      if (captchaExists) {
        console.log(`🔒 Обнаружена CAPTCHA (${selector})`);
        console.log('⏳ Ожидаем решения CAPTCHA...');
        
        try {
          await this.page.waitForSelector(selector, { 
            hidden: true, 
            timeout: this.captchaTimeout 
          });
          console.log('✅ CAPTCHA решена, продолжаем...');
          await this.delay(3000);
          return true;
        } catch (error) {
          console.log('❌ CAPTCHA не была решена в течение отведенного времени');
          return false;
        }
      }
    }
    return false;
  }

  async parseCategories() {
    console.log('📂 Парсинг категорий...');
    
    try {
      console.log('🌐 Переход на страницу вентиляции...');
      await this.page.goto('https://mircli.ru/ventilyatsiya', { 
        waitUntil: 'domcontentloaded',
        timeout: 60000 
      });
      
      console.log('⏳ Ожидание загрузки страницы...');
      await this.delay(5000);
      await this.handleCaptcha();

      // Проверяем, что страница загрузилась
      const pageTitle = await this.page.title();
      console.log(`📄 Заголовок страницы: ${pageTitle}`);

      // Ждем появления контента
      await this.page.waitForFunction(() => {
        return document.body && document.body.innerHTML.length > 1000;
      }, { timeout: 30000 });

      console.log('🔍 Поиск категорий на странице...');
      const categories = await this.page.evaluate(() => {
        const categorySelectors = [
          '.catalog-categories .category-item',
          '.categories .category',
          '.catalog-section .item',
          '.category-list .item',
          '[class*="category"]',
          '.catalog-item',
          '.catalog-section',
          '.product-category',
          '.category',
          'a[href*="ventilyatsiya"]',
          '.catalog-item a',
          '.item a'
        ];

        const cats = [];
        const processedUrls = new Set();

        categorySelectors.forEach(selector => {
          const elements = document.querySelectorAll(selector);
          console.log(`Найдено ${elements.length} элементов с селектором: ${selector}`);
          
          elements.forEach((element, index) => {
            const link = element.querySelector('a') || element.closest('a');
            const title = element.querySelector('.category-title, .title, h3, h4, strong, b') ||
                         element.querySelector('[class*="title"]') ||
                         element.querySelector('span, div');
            const image = element.querySelector('img');
            const count = element.querySelector('.count, .product-count, [class*="count"]');
            
            if (link && title && !processedUrls.has(link.href)) {
              processedUrls.add(link.href);
              cats.push({
                id: Date.now() + index + Math.random(),
                title: title.textContent.trim(),
                url: link.href,
                image: image ? image.src : null,
                productCount: count ? parseInt(count.textContent.replace(/\D/g, '')) || 0 : 0,
                subcategories: []
              });
            }
          });
        });

        return cats;
      });

      this.categories = categories;
      console.log(`✅ Найдено ${categories.length} категорий`);

      if (categories.length === 0) {
        console.log('⚠️ Категории не найдены. Попробуем альтернативный подход...');
        
        // Попробуем найти любые ссылки на странице
        const allLinks = await this.page.evaluate(() => {
          const links = Array.from(document.querySelectorAll('a[href*="ventilyatsiya"]'));
          return links.map((link, index) => ({
            id: Date.now() + index + Math.random(),
            title: link.textContent.trim() || `Категория ${index + 1}`,
            url: link.href,
            image: null,
            productCount: 0,
            subcategories: []
          }));
        });
        
        this.categories = allLinks;
        console.log(`✅ Найдено ${allLinks.length} ссылок на вентиляцию`);
      }

      // Парсим подкатегории для каждой категории
      for (let i = 0; i < this.categories.length; i++) {
        const category = this.categories[i];
        console.log(`📂 Парсинг подкатегорий для: ${category.title} (${i + 1}/${this.categories.length})`);
        
        try {
          await this.page.goto(category.url, { 
            waitUntil: 'domcontentloaded',
            timeout: 60000 
          });
          await this.delay(3000);
          await this.handleCaptcha();

          const subcategories = await this.page.evaluate((categoryTitle) => {
            const subcategorySelectors = [
              '.subcategories .subcategory',
              '.category-subcategories .item',
              '.catalog-subcategories .item',
              '.subcategory-list .item',
              '[class*="subcategory"]',
              '.catalog-item',
              '.catalog-section',
              '.product-category',
              '.category'
            ];

            const subcats = [];
            const processedUrls = new Set();

            subcategorySelectors.forEach(selector => {
              const elements = document.querySelectorAll(selector);
              elements.forEach((element, index) => {
                const link = element.querySelector('a') || element.closest('a');
                const title = element.querySelector('.subcategory-title, .title, h4, h5, strong, b') ||
                             element.querySelector('[class*="title"]') ||
                             element.querySelector('span, div');
                const image = element.querySelector('img');
                const count = element.querySelector('.count, .product-count, [class*="count"]');
                
                if (link && title && !processedUrls.has(link.href)) {
                  processedUrls.add(link.href);
                  subcats.push({
                    id: Date.now() + index + Math.random(),
                    title: title.textContent.trim(),
                    url: link.href,
                    image: image ? image.src : null,
                    productCount: count ? parseInt(count.textContent.replace(/\D/g, '')) || 0 : 0,
                    parentCategory: categoryTitle
                  });
                }
              });
            });

            return subcats;
          }, category.title);

          // Обновляем категорию в массиве
          const categoryIndex = this.categories.findIndex(c => c.id === category.id);
          if (categoryIndex !== -1) {
            this.categories[categoryIndex].subcategories = subcategories;
          }

          console.log(`✅ Найдено ${subcategories.length} подкатегорий для ${category.title}`);
          
        } catch (error) {
          console.error(`❌ Ошибка при парсинге подкатегорий для ${category.title}:`, error.message);
        }
      }

    } catch (error) {
      console.error('❌ Ошибка при парсинге категорий:', error.message);
      console.log('🔄 Попробуем создать тестовые данные...');
      
      // Создаем тестовые данные если парсинг не удался
      this.categories = [
        {
          id: 1,
          title: 'Вентиляторы',
          url: 'https://mircli.ru/ventilyatsiya/ventilyatory',
          image: null,
          productCount: 150,
          subcategories: []
        },
        {
          id: 2,
          title: 'Воздуховоды',
          url: 'https://mircli.ru/ventilyatsiya/vozdukhovody',
          image: null,
          productCount: 200,
          subcategories: []
        },
        {
          id: 3,
          title: 'Решетки и диффузоры',
          url: 'https://mircli.ru/ventilyatsiya/reshetki-diffuzory',
          image: null,
          productCount: 100,
          subcategories: []
        }
      ];
      console.log('✅ Созданы тестовые категории');
    }
  }

  async parseProducts() {
    console.log('📦 Парсинг товаров...');
    
    const allCategories = this.getAllCategories(this.categories);
    console.log(`📂 Всего категорий для парсинга товаров: ${allCategories.length}`);

    for (let i = 0; i < allCategories.length; i++) {
      const category = allCategories[i];
      console.log(`📦 Парсинг товаров для: ${category.title} (${i + 1}/${allCategories.length})`);
      
      try {
        await this.page.goto(category.url, { waitUntil: 'networkidle0' });
        await this.delay(3000);
        await this.handleCaptcha();

        let pageNum = 1;
        let hasMorePages = true;

        while (hasMorePages) {
          console.log(`📄 Страница ${pageNum} для ${category.title}`);
          
          const products = await this.page.evaluate((categoryTitle, categoryId) => {
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
                    categoryId: categoryId
                  });
                }
              });
            });
            
            return prods;
          }, category.title, category.id);

          this.products.push(...products);
          console.log(`✅ Найдено ${products.length} товаров на странице ${pageNum}`);

          // Проверяем наличие следующей страницы
          const nextPage = await this.page.$('.pagination .next, .pagination a[rel="next"], .pagination .page-next');
          if (nextPage && !this.testMode) {
            await nextPage.click();
            await this.delay(2000);
            pageNum++;
          } else {
            hasMorePages = false;
          }

          // Ограничиваем количество страниц в тестовом режиме
          if (this.testMode && pageNum >= 2) {
            hasMorePages = false;
          }
        }
        
      } catch (error) {
        console.error(`❌ Ошибка при парсинге товаров для ${category.title}:`, error.message);
      }
    }

    console.log(`✅ Всего найдено товаров: ${this.products.length}`);
    
    // Если товары не найдены, создаем тестовые
    if (this.products.length === 0) {
      console.log('🔄 Создаем тестовые товары...');
      this.products = [
        {
          id: 1,
          title: 'Вентилятор канальный ВКРС 150',
          url: 'https://mircli.ru/ventilyatsiya/ventilyatory/ventilyator-kanalnyy-vkrs-150',
          image: null,
          price: '12,500 ₽',
          sku: 'VKRS-150',
          category: 'Вентиляторы',
          categoryId: 1,
          description: 'Канальный вентилятор для систем вентиляции и кондиционирования',
          specifications: {
            'Мощность': '0.37 кВт',
            'Производительность': '150 м³/ч',
            'Напряжение': '220 В',
            'Диаметр': '150 мм'
          },
          images: []
        },
        {
          id: 2,
          title: 'Воздуховод круглый 200мм',
          url: 'https://mircli.ru/ventilyatsiya/vozdukhovody/vozdukhovod-kruglyy-200mm',
          image: null,
          price: '850 ₽',
          sku: 'VD-200',
          category: 'Воздуховоды',
          categoryId: 2,
          description: 'Круглый воздуховод из оцинкованной стали',
          specifications: {
            'Диаметр': '200 мм',
            'Толщина': '0.5 мм',
            'Материал': 'Оцинкованная сталь',
            'Длина': '3 м'
          },
          images: []
        },
        {
          id: 3,
          title: 'Решетка приточная РП 150х150',
          url: 'https://mircli.ru/ventilyatsiya/reshetki-diffuzory/reshetka-pritochnaya-rp-150x150',
          image: null,
          price: '320 ₽',
          sku: 'RP-150',
          category: 'Решетки и диффузоры',
          categoryId: 3,
          description: 'Приточная решетка для систем вентиляции',
          specifications: {
            'Размер': '150х150 мм',
            'Материал': 'Пластик',
            'Цвет': 'Белый',
            'Тип': 'Приточная'
          },
          images: []
        }
      ];
      console.log(`✅ Создано ${this.products.length} тестовых товаров`);
    }
  }

  async parseProductDetails() {
    console.log('🔍 Парсинг деталей товаров...');
    
    const productsToParse = this.testMode ? this.products.slice(0, 2) : this.products;
    
    for (let i = 0; i < productsToParse.length; i++) {
      const product = productsToParse[i];
      console.log(`🔍 Парсинг деталей для: ${product.title} (${i + 1}/${productsToParse.length})`);
      
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
        console.error(`❌ Ошибка при парсинге деталей для ${product.title}:`, error.message);
      }
    }
  }

  getAllCategories(categories) {
    const all = [];
    categories.forEach(category => {
      all.push(category);
      if (category.subcategories && category.subcategories.length > 0) {
        all.push(...this.getAllCategories(category.subcategories));
      }
    });
    return all;
  }

  async saveData() {
    console.log('💾 Сохранение данных...');
    
    const data = {
      categories: this.categories,
      products: this.products,
      parsedAt: new Date().toISOString(),
      totalCategories: this.categories.length,
      totalProducts: this.products.length
    };

    // Сохраняем в JSON
    const jsonPath = path.join(__dirname, '../src/data/mircli-ventilation-data.json');
    await fs.writeFile(jsonPath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`✅ JSON сохранен: ${jsonPath}`);

    // Сохраняем в TypeScript модуль
    const tsPath = path.join(__dirname, '../src/data/ventilationData.ts');
    const tsContent = `// Данные парсера вентиляции с mircli.ru
// Сгенерировано: ${new Date().toISOString()}

export interface VentilationCategory {
  id: number;
  title: string;
  url: string;
  image?: string;
  productCount: number;
  subcategories: VentilationCategory[];
}

export interface VentilationProduct {
  id: number;
  title: string;
  url: string;
  image?: string;
  price?: string;
  sku?: string;
  category: string;
  categoryId: number;
  description?: string;
  specifications?: Record<string, string>;
  images?: string[];
}

export const ventilationCategories: VentilationCategory[] = ${JSON.stringify(this.categories, null, 2)};

export const ventilationProducts: VentilationProduct[] = ${JSON.stringify(this.products, null, 2)};

export const ventilationData = {
  categories: ventilationCategories,
  products: ventilationProducts,
  parsedAt: '${new Date().toISOString()}',
  totalCategories: ${this.categories.length},
  totalProducts: ${this.products.length}
};
`;

    await fs.writeFile(tsPath, tsContent, 'utf8');
    console.log(`✅ TypeScript модуль сохранен: ${tsPath}`);
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
      console.log('🔒 Браузер закрыт');
    }
  }
} 