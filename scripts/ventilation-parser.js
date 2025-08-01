const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');

class MircliVentilationParser {
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
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    this.page = await this.browser.newPage();
    
    // Устанавливаем user-agent для избежания блокировки
    await this.page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    
    // Устанавливаем задержки между запросами
    await this.page.setDefaultNavigationTimeout(30000);
  }

  async delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async parseCategories() {
    console.log('Начинаем парсинг категорий вентиляции...');
    
    try {
      await this.page.goto(this.ventilationUrl, { waitUntil: 'networkidle2' });
      await this.delay(3000);

      // Проверяем наличие капчи
      const captchaExists = await this.page.$('.captcha-form');
      if (captchaExists) {
        console.log('Обнаружена капча. Ожидаем ручного ввода...');
        await this.page.waitForSelector('.captcha-form', { hidden: true, timeout: 60000 });
      }

      // Получаем все категории
      const categories = await this.page.evaluate(() => {
        const categoryElements = document.querySelectorAll('.catalog-section, .catalog-item');
        const cats = [];
        
        categoryElements.forEach((element, index) => {
          const link = element.querySelector('a');
          const title = element.querySelector('.catalog-section__title, .catalog-item__title');
          const image = element.querySelector('img');
          
          if (link && title) {
            cats.push({
              id: index + 1,
              title: title.textContent.trim(),
              url: link.href,
              image: image ? image.src : null,
              subcategories: []
            });
          }
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
          await this.page.goto(category.url, { waitUntil: 'networkidle2' });
          await this.delay(2000);

          const subcategories = await this.page.evaluate(() => {
            const subElements = document.querySelectorAll('.catalog-section, .catalog-item');
            const subs = [];
            
            subElements.forEach((element, index) => {
              const link = element.querySelector('a');
              const title = element.querySelector('.catalog-section__title, .catalog-item__title');
              const image = element.querySelector('img');
              
              if (link && title) {
                subs.push({
                  id: index + 1,
                  title: title.textContent.trim(),
                  url: link.href,
                  image: image ? image.src : null,
                  subcategories: []
                });
              }
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
        await this.page.goto(category.url, { waitUntil: 'networkidle2' });
        await this.delay(2000);

        // Проверяем, есть ли пагинация
        const hasPagination = await this.page.$('.pagination');
        let currentPage = 1;
        let hasNextPage = true;

        while (hasNextPage) {
          console.log(`Страница ${currentPage} для ${category.title}`);
          
          const products = await this.page.evaluate(() => {
            const productElements = document.querySelectorAll('.catalog-item, .product-item');
            const prods = [];
            
            productElements.forEach((element, index) => {
              const link = element.querySelector('a');
              const title = element.querySelector('.catalog-item__title, .product-item__title');
              const image = element.querySelector('img');
              const price = element.querySelector('.price, .catalog-item__price');
              const sku = element.querySelector('.sku, .catalog-item__sku');
              
              if (link && title) {
                prods.push({
                  id: Date.now() + index,
                  title: title.textContent.trim(),
                  url: link.href,
                  image: image ? image.src : null,
                  price: price ? price.textContent.trim() : null,
                  sku: sku ? sku.textContent.trim() : null,
                  category: category.title,
                  categoryId: category.id
                });
              }
            });
            
            return prods;
          });

          this.products.push(...products);
          console.log(`Найдено ${products.length} товаров на странице ${currentPage}`);

          // Проверяем следующую страницу
          if (hasPagination) {
            const nextButton = await this.page.$('.pagination__next:not(.disabled)');
            if (nextButton) {
              await nextButton.click();
              await this.delay(2000);
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
        await this.page.goto(product.url, { waitUntil: 'networkidle2' });
        await this.delay(2000);

        const details = await this.page.evaluate(() => {
          const description = document.querySelector('.product-description, .description');
          const characteristics = document.querySelector('.product-characteristics, .characteristics');
          const images = document.querySelectorAll('.product-gallery img, .product-images img');
          
          const specs = {};
          if (characteristics) {
            const rows = characteristics.querySelectorAll('tr, .characteristic-row');
            rows.forEach(row => {
              const name = row.querySelector('td:first-child, .characteristic-name');
              const value = row.querySelector('td:last-child, .characteristic-value');
              if (name && value) {
                specs[name.textContent.trim()] = value.textContent.trim();
              }
            });
          }
          
          const imageUrls = Array.from(images).map(img => img.src).filter(src => src);
          
          return {
            description: description ? description.textContent.trim() : null,
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
  const parser = new MircliVentilationParser();
  parser.run();
}

module.exports = MircliVentilationParser; 