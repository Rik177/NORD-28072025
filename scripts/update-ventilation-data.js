import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface VentilationCategory {
  id: number;
  title: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
  parentId: number | null;
  subcategories: VentilationCategory[];
}

interface VentilationProduct {
  id: number;
  title: string;
  description: string;
  price: string;
  image: string;
  category: string;
  brand: string;
  characteristics: Record<string, string>;
  sku: string;
  rating: string | number;
  reviewCount: number;
}

interface VentilationData {
  categories: VentilationCategory[];
  products: VentilationProduct[];
}

class VentilationDataUpdater {
  async update() {
    try {
      console.log('🔄 Обновляем ventilationData.ts...');

      // Читаем JSON файл
      const jsonPath = path.join(__dirname, '..', 'src', 'data', 'ventilationData.json');
      const jsonData: VentilationData = JSON.parse(await fs.readFile(jsonPath, 'utf8'));

      // Создаем TypeScript файл
      const tsContent = this.generateTypeScriptContent(jsonData);

      // Сохраняем TypeScript файл
      const tsPath = path.join(__dirname, '..', 'src', 'data', 'ventilationData.ts');
      await fs.writeFile(tsPath, tsContent, 'utf8');

      console.log('✅ ventilationData.ts обновлен успешно!');
      console.log(`📊 Результаты:`);
      console.log(`   - Категорий: ${jsonData.categories.length}`);
      console.log(`   - Товаров: ${jsonData.products.length}`);

    } catch (error) {
      console.error('❌ Ошибка при обновлении:', error.message);
      throw error;
    }
  }

  generateTypeScriptContent(data: VentilationData): string {
    const timestamp = new Date().toISOString();
    
    let content = `// Данные парсера вентиляции с mircli.ru
// Сгенерировано: ${timestamp}

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
  name: string;
  category: string;
  price: string;
  image?: string;
  characteristics: string[];
  rating?: number;
  brand: string;
  description?: string;
}

// Полная структура категорий на основе mircli.ru
export const ventilationCategories: VentilationCategory[] = [
`;

    // Добавляем категории
    data.categories.forEach((category, index) => {
      content += `  {
    id: ${category.id},
    title: '${category.title}',
    url: 'https://mircli.ru/${category.slug}/',
    image: '${category.image}',
    productCount: ${category.productCount},
    subcategories: []
  }${index < data.categories.length - 1 ? ',' : ''}
`;
    });

    content += `];

// Товары вентиляционного оборудования
export const ventilationProducts: VentilationProduct[] = [
`;

    // Добавляем товары
    data.products.forEach((product, index) => {
      const characteristics = Object.entries(product.characteristics)
        .map(([key, value]) => `'${key}: ${value}'`)
        .join(',\n      ');

      content += `  {
    id: ${product.id},
    name: '${product.title}',
    category: '${product.category}',
    price: '${product.price} руб',
    image: '${product.image}',
    characteristics: [
      ${characteristics}
    ],
    rating: ${typeof product.rating === 'string' ? parseFloat(product.rating) : product.rating},
    brand: '${product.brand}',
    description: '${product.description}'
  }${index < data.products.length - 1 ? ',' : ''}
`;
    });

    content += `];

export const ventilationData = {
  categories: ventilationCategories,
  products: ventilationProducts,
  parsedAt: '${timestamp}',
  totalCategories: ${data.categories.length},
  totalProducts: ${data.products.length}
};
`;

    return content;
  }
}

// Запуск обновления
async function main() {
  const updater = new VentilationDataUpdater();
  await updater.update();
}

main().catch(console.error); 