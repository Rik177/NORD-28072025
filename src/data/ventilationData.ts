// Данные парсера вентиляции с mircli.ru
// Сгенерировано: 2025-08-01T18:53:17.711Z

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

export const ventilationCategories: VentilationCategory[] = [
  {
    "id": 1,
    "title": "Вентиляторы",
    "url": "https://mircli.ru/ventilyatsiya/ventilyatory",
    "image": null,
    "productCount": 150,
    "subcategories": []
  },
  {
    "id": 2,
    "title": "Воздуховоды",
    "url": "https://mircli.ru/ventilyatsiya/vozdukhovody",
    "image": null,
    "productCount": 200,
    "subcategories": []
  },
  {
    "id": 3,
    "title": "Решетки и диффузоры",
    "url": "https://mircli.ru/ventilyatsiya/reshetki-diffuzory",
    "image": null,
    "productCount": 100,
    "subcategories": []
  }
];

export const ventilationProducts: VentilationProduct[] = [
  {
    "id": 1,
    "title": "Вентилятор канальный ВКРС 150",
    "url": "https://mircli.ru/ventilyatsiya/ventilyatory/ventilyator-kanalnyy-vkrs-150",
    "image": null,
    "price": "12,500 ₽",
    "sku": "VKRS-150",
    "category": "Вентиляторы",
    "categoryId": 1,
    "description": "Канальный вентилятор для систем вентиляции и кондиционирования",
    "specifications": {
      "Мощность": "0.37 кВт",
      "Производительность": "150 м³/ч",
      "Напряжение": "220 В",
      "Диаметр": "150 мм"
    },
    "images": []
  },
  {
    "id": 2,
    "title": "Воздуховод круглый 200мм",
    "url": "https://mircli.ru/ventilyatsiya/vozdukhovody/vozdukhovod-kruglyy-200mm",
    "image": null,
    "price": "850 ₽",
    "sku": "VD-200",
    "category": "Воздуховоды",
    "categoryId": 2,
    "description": "Круглый воздуховод из оцинкованной стали",
    "specifications": {
      "Диаметр": "200 мм",
      "Толщина": "0.5 мм",
      "Материал": "Оцинкованная сталь",
      "Длина": "3 м"
    },
    "images": []
  },
  {
    "id": 3,
    "title": "Решетка приточная РП 150х150",
    "url": "https://mircli.ru/ventilyatsiya/reshetki-diffuzory/reshetka-pritochnaya-rp-150x150",
    "image": null,
    "price": "320 ₽",
    "sku": "RP-150",
    "category": "Решетки и диффузоры",
    "categoryId": 3,
    "description": "Приточная решетка для систем вентиляции",
    "specifications": {
      "Размер": "150х150 мм",
      "Материал": "Пластик",
      "Цвет": "Белый",
      "Тип": "Приточная"
    },
    "images": []
  }
];

export const ventilationData = {
  categories: ventilationCategories,
  products: ventilationProducts,
  parsedAt: '2025-08-01T18:53:17.711Z',
  totalCategories: 3,
  totalProducts: 3
};
