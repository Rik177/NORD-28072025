# Парсер товаров Mircli

Этот проект включает в себя парсер для загрузки товаров с сайта mircli.ru и их интеграцию в React-приложение.

## Структура проекта

### Файлы парсера
- `scripts/mircli-products-parser.js` - Основной парсер для загрузки товаров
- `scripts/run-mircli-parser.js` - Скрипт для запуска парсера
- `src/data/enhancedProductData.generated.tsx` - Сгенерированные данные товаров

### Компоненты React
- `src/components/catalog/MircliProductCard.tsx` - Карточка товара
- `src/components/catalog/MircliCatalog.tsx` - Каталог товаров с фильтрацией
- `src/components/catalog/MircliProductDetail.tsx` - Детальная страница товара
- `src/pages/catalog/MircliCatalogPage.tsx` - Страница каталога
- `src/pages/catalog/MircliProductPage.tsx` - Страница товара

## Запуск парсера

### Установка зависимостей
```bash
npm install
```

### Запуск парсера в тестовом режиме
```bash
node scripts/run-mircli-parser.js
```

### Настройка парсера
В файле `scripts/run-mircli-parser.js` можно настроить параметры:

```javascript
const parser = new MircliProductsParser({
  delay: 3000,           // Задержка между запросами (мс)
  captchaTimeout: 60000,  // Таймаут для решения CAPTCHA (мс)
  testMode: false         // Тестовый режим (ограничивает количество страниц)
});
```

## Функциональность парсера

### Парсинг категорий
- Автоматическое обнаружение категорий на сайте mircli.ru
- Извлечение названий, URL и количества товаров
- Создание иерархии категорий и подкатегорий

### Парсинг товаров
- Извлечение основной информации о товарах
- Парсинг цен, изображений, характеристик
- Обработка скидок и акций
- Извлечение отзывов и рейтингов

### Обработка CAPTCHA
- Автоматическое обнаружение CAPTCHA
- Ожидание ручного решения
- Продолжение парсинга после решения

### Генерация данных
- Сохранение в JSON формате
- Создание TypeScript модулей
- Интеграция с существующей структурой данных

## Структура данных товара

```typescript
interface MircliProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  images: Array<{ url: string; alt: string }>;
  rating: number;
  reviewCount: number;
  brand: string;
  category: string;
  sku: string;
  availability: string;
  specifications: Record<string, string>;
  features: string[];
  isNew: boolean;
  isSale: boolean;
  isBestseller: boolean;
  url: string;
  shortDescription?: string;
  deliveryTime?: string;
  energyClass?: string;
  certifications?: string[];
}
```

## Интеграция с React-приложением

### Маршруты
- `/ventilation` - Главная страница каталога
- `/ventilation/:category` - Страница категории
- `/ventilation/:category/:productId` - Страница товара

### Компоненты
- **MircliProductCard** - Карточка товара с поддержкой сетки и списка
- **MircliCatalog** - Каталог с фильтрацией и сортировкой
- **MircliProductDetail** - Детальная страница товара с табами

### Функциональность
- Фильтрация по брендам, ценам, характеристикам
- Сортировка по цене, названию, рейтингу
- Поиск по названию и описанию
- Сравнение товаров
- Адаптивный дизайн
- Поддержка темной темы

## Особенности реализации

### Обработка ошибок
- Автоматическое создание тестовых данных при ошибках
- Graceful fallback для отсутствующих данных
- Информативные сообщения об ошибках

### Производительность
- Ленивая загрузка изображений
- Оптимизация запросов
- Кэширование данных

### SEO
- Мета-теги для каждой страницы
- Структурированные данные
- Оптимизированные URL

## Настройка и кастомизация

### Изменение стилей
Все компоненты используют Tailwind CSS и могут быть легко кастомизированы через классы.

### Добавление новых полей
Для добавления новых полей в структуру товара:
1. Обновите интерфейс `MircliProduct`
2. Измените парсер для извлечения новых данных
3. Обновите компоненты для отображения

### Интеграция с API
Для интеграции с реальным API замените импорт данных в компонентах:

```javascript
// Вместо импорта из файла
const response = await import('../../data/enhancedProductData.generated');

// Используйте API запрос
const response = await fetch('/api/mircli/products');
const data = await response.json();
```

## Устранение неполадок

### Парсер не запускается
1. Проверьте установку Puppeteer: `npm install puppeteer`
2. Убедитесь, что Chrome доступен в системе
3. Проверьте права доступа к файловой системе

### Ошибки CAPTCHA
1. Увеличьте `captchaTimeout` в настройках
2. Запустите в режиме `headless: false` для ручного решения
3. Используйте прокси-серверы при необходимости

### Проблемы с данными
1. Проверьте структуру HTML на сайте mircli.ru
2. Обновите селекторы в парсере
3. Добавьте обработку новых элементов

## Лицензия

Этот проект предназначен для образовательных целей. Убедитесь, что вы соблюдаете условия использования сайта mircli.ru при использовании парсера. 