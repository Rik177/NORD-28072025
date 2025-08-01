// Данные парсера вентиляции с mircli.ru
// Сгенерировано: 2025-08-01T19:14:39.100Z

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
  subcategory?: string;
  subcategoryId?: number;
  description?: string;
  specifications?: Record<string, string>;
  images?: string[];
}

export const ventilationCategories: VentilationCategory[] = [
  {
    id: 1,
    title: 'Вентиляторы',
    url: 'https://mircli.ru/ventilyatsiya/ventilyatory',
    image: undefined,
    productCount: 150,
    subcategories: [
      {
        id: 11,
        title: 'Канальные вентиляторы',
        url: 'https://mircli.ru/ventilyatsiya/ventilyatory/kanalnye-ventilyatory',
        image: undefined,
        productCount: 45,
        subcategories: [
          {
            id: 111,
            title: 'Круглые канальные',
            url: 'https://mircli.ru/ventilyatsiya/ventilyatory/kanalnye-ventilyatory/kruglye-kanalnye',
            image: undefined,
            productCount: 25,
            subcategories: []
          },
          {
            id: 112,
            title: 'Прямоугольные канальные',
            url: 'https://mircli.ru/ventilyatsiya/ventilyatory/kanalnye-ventilyatory/pryamougolnye-kanalnye',
            image: undefined,
            productCount: 20,
            subcategories: []
          }
        ]
      },
      {
        id: 12,
        title: 'Осевые вентиляторы',
        url: 'https://mircli.ru/ventilyatsiya/ventilyatory/osevye-ventilyatory',
        image: undefined,
        productCount: 35,
        subcategories: [
          {
            id: 121,
            title: 'Настенные осевые',
            url: 'https://mircli.ru/ventilyatsiya/ventilyatory/osevye-ventilyatory/nastennye-osevye',
            image: undefined,
            productCount: 15,
            subcategories: []
          },
          {
            id: 122,
            title: 'Потолочные осевые',
            url: 'https://mircli.ru/ventilyatsiya/ventilyatory/osevye-ventilyatory/potolochnye-osevye',
            image: undefined,
            productCount: 20,
            subcategories: []
          }
        ]
      },
      {
        id: 13,
        title: 'Крышные вентиляторы',
        url: 'https://mircli.ru/ventilyatsiya/ventilyatory/kryshnye-ventilyatory',
        image: undefined,
        productCount: 30,
        subcategories: []
      },
      {
        id: 14,
        title: 'Центробежные вентиляторы',
        url: 'https://mircli.ru/ventilyatsiya/ventilyatory/tsentrobezhnye-ventilyatory',
        image: undefined,
        productCount: 40,
        subcategories: []
      }
    ]
  },
  {
    id: 2,
    title: 'Вентиляционные установки',
    url: 'https://mircli.ru/ventilyatsiya/ventilyatsionnye-ustanovki',
    image: undefined,
    productCount: 80,
    subcategories: [
      {
        id: 21,
        title: 'Приточно-вытяжные установки',
        url: 'https://mircli.ru/ventilyatsiya/ventilyatsionnye-ustanovki/pritochno-vytyazhnye-ustanovki',
        image: undefined,
        productCount: 50,
        subcategories: [
          {
            id: 211,
            title: 'Компактные ПВУ',
            url: 'https://mircli.ru/ventilyatsiya/ventilyatsionnye-ustanovki/pritochno-vytyazhnye-ustanovki/kompaktnye-pvu',
            image: undefined,
            productCount: 25,
            subcategories: []
          },
          {
            id: 212,
            title: 'Наборные ПВУ',
            url: 'https://mircli.ru/ventilyatsiya/ventilyatsionnye-ustanovki/pritochno-vytyazhnye-ustanovki/nabornye-pvu',
            image: undefined,
            productCount: 25,
            subcategories: []
          }
        ]
      },
      {
        id: 22,
        title: 'Приточные установки',
        url: 'https://mircli.ru/ventilyatsiya/ventilyatsionnye-ustanovki/pritochnye-ustanovki',
        image: undefined,
        productCount: 30,
        subcategories: []
      }
    ]
  },
  {
    id: 3,
    title: 'Сетевые элементы',
    url: 'https://mircli.ru/ventilyatsiya/setevye-elementy',
    image: undefined,
    productCount: 120,
    subcategories: [
      {
        id: 31,
        title: 'Фасонные изделия',
        url: 'https://mircli.ru/ventilyatsiya/setevye-elementy/fasonnye-izdeliya',
        image: undefined,
        productCount: 60,
        subcategories: [
          {
            id: 311,
            title: 'Отводы',
            url: 'https://mircli.ru/ventilyatsiya/setevye-elementy/fasonnye-izdeliya/otvody',
            image: undefined,
            productCount: 20,
            subcategories: []
          },
          {
            id: 312,
            title: 'Тройники',
            url: 'https://mircli.ru/ventilyatsiya/setevye-elementy/fasonnye-izdeliya/troyniki',
            image: undefined,
            productCount: 15,
            subcategories: []
          },
          {
            id: 313,
            title: 'Переходы',
            url: 'https://mircli.ru/ventilyatsiya/setevye-elementy/fasonnye-izdeliya/perekhody',
            image: undefined,
            productCount: 25,
            subcategories: []
          }
        ]
      },
      {
        id: 32,
        title: 'Крепления',
        url: 'https://mircli.ru/ventilyatsiya/setevye-elementy/krepleniya',
        image: undefined,
        productCount: 30,
        subcategories: []
      },
      {
        id: 33,
        title: 'Изоляция',
        url: 'https://mircli.ru/ventilyatsiya/setevye-elementy/izolyatsiya',
        image: undefined,
        productCount: 30,
        subcategories: []
      }
    ]
  },
  {
    id: 4,
    title: 'Автоматика',
    url: 'https://mircli.ru/ventilyatsiya/avtomatika',
    image: undefined,
    productCount: 90,
    subcategories: [
      {
        id: 41,
        title: 'Датчики',
        url: 'https://mircli.ru/ventilyatsiya/avtomatika/datchiki',
        image: undefined,
        productCount: 40,
        subcategories: [
          {
            id: 411,
            title: 'Датчики температуры',
            url: 'https://mircli.ru/ventilyatsiya/avtomatika/datchiki/datchiki-temperatury',
            image: undefined,
            productCount: 15,
            subcategories: []
          },
          {
            id: 412,
            title: 'Датчики влажности',
            url: 'https://mircli.ru/ventilyatsiya/avtomatika/datchiki/datchiki-vlazhnosti',
            image: undefined,
            productCount: 10,
            subcategories: []
          },
          {
            id: 413,
            title: 'Датчики давления',
            url: 'https://mircli.ru/ventilyatsiya/avtomatika/datchiki/datchiki-davleniya',
            image: undefined,
            productCount: 15,
            subcategories: []
          }
        ]
      },
      {
        id: 42,
        title: 'Контроллеры',
        url: 'https://mircli.ru/ventilyatsiya/avtomatika/kontrollery',
        image: undefined,
        productCount: 30,
        subcategories: []
      },
      {
        id: 43,
        title: 'Приводы',
        url: 'https://mircli.ru/ventilyatsiya/avtomatika/privody',
        image: undefined,
        productCount: 20,
        subcategories: []
      }
    ]
  },
  {
    id: 5,
    title: 'Вентиляционные решетки',
    url: 'https://mircli.ru/ventilyatsiya/ventilyatsionnye-reshetki',
    image: undefined,
    productCount: 200,
    subcategories: [
      {
        id: 51,
        title: 'Приточные решетки',
        url: 'https://mircli.ru/ventilyatsiya/ventilyatsionnye-reshetki/pritochnye-reshetki',
        image: undefined,
        productCount: 80,
        subcategories: []
      },
      {
        id: 52,
        title: 'Вытяжные решетки',
        url: 'https://mircli.ru/ventilyatsiya/ventilyatsionnye-reshetki/vytyazhnye-reshetki',
        image: undefined,
        productCount: 70,
        subcategories: []
      },
      {
        id: 53,
        title: 'Универсальные решетки',
        url: 'https://mircli.ru/ventilyatsiya/ventilyatsionnye-reshetki/universalnye-reshetki',
        image: undefined,
        productCount: 50,
        subcategories: []
      }
    ]
  },
  {
    id: 6,
    title: 'Диффузоры',
    url: 'https://mircli.ru/ventilyatsiya/diffuzory',
    image: undefined,
    productCount: 150,
    subcategories: [
      {
        id: 61,
        title: 'Круглые диффузоры',
        url: 'https://mircli.ru/ventilyatsiya/diffuzory/kruglye-diffuzory',
        image: undefined,
        productCount: 60,
        subcategories: []
      },
      {
        id: 62,
        title: 'Прямоугольные диффузоры',
        url: 'https://mircli.ru/ventilyatsiya/diffuzory/pryamougolnye-diffuzory',
        image: undefined,
        productCount: 50,
        subcategories: []
      },
      {
        id: 63,
        title: 'Линейные диффузоры',
        url: 'https://mircli.ru/ventilyatsiya/diffuzory/lineynye-diffuzory',
        image: undefined,
        productCount: 40,
        subcategories: []
      }
    ]
  },
  {
    id: 7,
    title: 'Анемостаты',
    url: 'https://mircli.ru/ventilyatsiya/anemostaty',
    image: undefined,
    productCount: 100,
    subcategories: [
      {
        id: 71,
        title: 'Приточные анемостаты',
        url: 'https://mircli.ru/ventilyatsiya/anemostaty/pritochnye-anemostaty',
        image: undefined,
        productCount: 40,
        subcategories: []
      },
      {
        id: 72,
        title: 'Вытяжные анемостаты',
        url: 'https://mircli.ru/ventilyatsiya/anemostaty/vytyazhnye-anemostaty',
        image: undefined,
        productCount: 35,
        subcategories: []
      },
      {
        id: 73,
        title: 'Универсальные анемостаты',
        url: 'https://mircli.ru/ventilyatsiya/anemostaty/universalnye-anemostaty',
        image: undefined,
        productCount: 25,
        subcategories: []
      }
    ]
  },
  {
    id: 8,
    title: 'Воздуховоды',
    url: 'https://mircli.ru/ventilyatsiya/vozdukhovody',
    image: undefined,
    productCount: 180,
    subcategories: [
      {
        id: 81,
        title: 'Круглые воздуховоды',
        url: 'https://mircli.ru/ventilyatsiya/vozdukhovody/kruglye-vozdukhovody',
        image: undefined,
        productCount: 90,
        subcategories: [
          {
            id: 811,
            title: 'Оцинкованные круглые',
            url: 'https://mircli.ru/ventilyatsiya/vozdukhovody/kruglye-vozdukhovody/otsinkovannye-kruglye',
            image: undefined,
            productCount: 45,
            subcategories: []
          },
          {
            id: 812,
            title: 'Пластиковые круглые',
            url: 'https://mircli.ru/ventilyatsiya/vozdukhovody/kruglye-vozdukhovody/plastikovye-kruglye',
            image: undefined,
            productCount: 45,
            subcategories: []
          }
        ]
      },
      {
        id: 82,
        title: 'Прямоугольные воздуховоды',
        url: 'https://mircli.ru/ventilyatsiya/vozdukhovody/pryamougolnye-vozdukhovody',
        image: undefined,
        productCount: 90,
        subcategories: [
          {
            id: 821,
            title: 'Оцинкованные прямоугольные',
            url: 'https://mircli.ru/ventilyatsiya/vozdukhovody/pryamougolnye-vozdukhovody/otsinkovannye-pryamougolnye',
            image: undefined,
            productCount: 50,
            subcategories: []
          },
          {
            id: 822,
            title: 'Пластиковые прямоугольные',
            url: 'https://mircli.ru/ventilyatsiya/vozdukhovody/pryamougolnye-vozdukhovody/plastikovye-pryamougolnye',
            image: undefined,
            productCount: 40,
            subcategories: []
          }
        ]
      }
    ]
  }
];

export const ventilationProducts: VentilationProduct[] = [
  {
    "id": 1,
    "title": "Вентилятор канальный ВКРС 150",
    "url": "https://mircli.ru/ventilyatsiya/ventilyatory/ventilyator-kanalnyy-vkrs-150",
    "image": undefined,
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
    "image": undefined,
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
    "image": undefined,
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
  parsedAt: '2025-08-01T19:14:39.100Z',
  totalCategories: 0,
  totalProducts: 3
};
