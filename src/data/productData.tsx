import React from 'react';
import { Home, Building, Factory, Store, Hotel, Guitar as Hospital, School, ShoppingCart } from 'lucide-react';

export interface ProductApplication {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface ProductInstallation {
  complexity: 'Простая' | 'Средняя' | 'Сложная';
  time: string;
  requirements: string[];
  steps: string[];
  warranty: string;
  maintenance: string;
  team: string;
}

export interface ExtendedProduct {
  id: string;
  name: string;
  description: string;
  fullDescription: string;
  price: number;
  oldPrice?: number;
  images: string[];
  rating: number;
  reviewCount: number;
  brand: string;
  model: string;
  category: string;
  specifications: Record<string, string>;
  features: string[];
  applications: ProductApplication[];
  installation: ProductInstallation;
  relatedProducts: string[];
}

export const productApplications = {
  residential: {
    icon: <Home className="h-6 w-6 text-secondary" />,
    title: 'Жилые помещения',
    description: 'Квартиры, дома, коттеджи. Обеспечивает комфортный микроклимат для всей семьи.'
  },
  office: {
    icon: <Building className="h-6 w-6 text-secondary" />,
    title: 'Офисные помещения',
    description: 'Офисы, кабинеты, переговорные комнаты. Создает продуктивную рабочую атмосферу.'
  },
  commercial: {
    icon: <Store className="h-6 w-6 text-secondary" />,
    title: 'Коммерческие объекты',
    description: 'Магазины, салоны, кафе, рестораны. Обеспечивает комфорт для клиентов.'
  },
  industrial: {
    icon: <Factory className="h-6 w-6 text-secondary" />,
    title: 'Промышленные объекты',
    description: 'Производственные помещения, склады, цеха. Поддерживает технологические процессы.'
  },
  hotel: {
    icon: <Hotel className="h-6 w-6 text-secondary" />,
    title: 'Гостиничные комплексы',
    description: 'Отели, гостиницы, хостелы. Гарантирует комфорт для гостей.'
  },
  medical: {
    icon: <Hospital className="h-6 w-6 text-secondary" />,
    title: 'Медицинские учреждения',
    description: 'Больницы, клиники, лаборатории. Соответствует медицинским стандартам.'
  },
  education: {
    icon: <School className="h-6 w-6 text-secondary" />,
    title: 'Образовательные учреждения',
    description: 'Школы, университеты, детские сады. Создает здоровую среду для обучения.'
  },
  retail: {
    icon: <ShoppingCart className="h-6 w-6 text-secondary" />,
    title: 'Торговые центры',
    description: 'ТЦ, супермаркеты, торговые павильоны. Обеспечивает комфорт покупателей.'
  }
};

export const installationComplexity = {
  simple: {
    level: 'Простая' as const,
    description: 'Стандартная установка без дополнительных сложностей',
    time: '2-3 часа',
    team: '1-2 специалиста'
  },
  medium: {
    level: 'Средняя' as const,
    description: 'Требует дополнительных работ или специального оборудования',
    time: '3-5 часов',
    team: '2 специалиста'
  },
  complex: {
    level: 'Сложная' as const,
    description: 'Сложная установка с особыми требованиями',
    time: '5-8 часов',
    team: '2-3 специалиста'
  }
};

// Расширенные данные о продуктах
export const extendedProductData: Record<string, ExtendedProduct> = {
  'daikin-ftxb25c': {
    id: 'daikin-ftxb25c',
    name: 'Кондиционер Daikin FTXB25C',
    description: 'Настенная сплит-система с инверторным управлением, класс энергоэффективности A++',
    fullDescription: 'Настенная сплит-система Daikin FTXB25C представляет собой современное решение для кондиционирования жилых и коммерческих помещений площадью до 25 м². Оснащена инверторным компрессором, который обеспечивает высокую энергоэффективность и точное поддержание заданной температуры. Система оборудована многоступенчатой фильтрацией воздуха и функцией самоочистки.',
    price: 38900,
    oldPrice: 42500,
    images: [
      'https://images.pexels.com/photos/4270511/pexels-photo-4270511.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/4489794/pexels-photo-4489794.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/7191981/pexels-photo-7191981.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    rating: 4.8,
    reviewCount: 24,
    brand: 'Daikin',
    model: 'FTXB25C',
    category: 'air-conditioning',
    specifications: {
      'Тип': 'Настенная сплит-система',
      'Площадь охлаждения': 'до 25 м²',
      'Мощность охлаждения': '2.5 кВт',
      'Мощность обогрева': '3.2 кВт',
      'Энергоэффективность': 'A++',
      'Уровень шума (внутр. блок)': '19 дБ',
      'Хладагент': 'R32',
      'Размеры внутреннего блока': '770×285×225 мм',
      'Размеры наружного блока': '675×550×289 мм',
      'Вес внутреннего блока': '8.5 кг',
      'Вес наружного блока': '26 кг'
    },
    features: [
      'Инверторное управление',
      'Функция самоочистки',
      'Многоступенчатая фильтрация',
      'Режим "Комфортный сон"',
      'Таймер включения/выключения',
      'Пульт ДУ в комплекте',
      'Защита от перепадов напряжения',
      'Автоматическое размораживание'
    ],
    applications: [
      productApplications.residential,
      productApplications.office,
      productApplications.commercial
    ],
    installation: {
      complexity: 'Средняя',
      time: '3-4 часа',
      team: '2 монтажника',
      requirements: [
        'Электропитание 220В',
        'Возможность вывода дренажа',
        'Доступ к наружной стене',
        'Расстояние между блоками не более 15 м'
      ],
      steps: [
        'Выбор места установки внутреннего и наружного блоков',
        'Монтаж кронштейнов и установка блоков',
        'Прокладка межблочных коммуникаций',
        'Подключение электропитания и дренажа',
        'Вакуумирование системы и заправка хладагентом',
        'Пусконаладочные работы и тестирование'
      ],
      warranty: '5 лет на оборудование, 3 года на монтажные работы',
      maintenance: 'Рекомендуется профилактическое обслуживание 2 раза в год'
    },
    relatedProducts: ['mitsubishi-msz-ln25vg', 'carrier-42qhc012ds']
  },
  'rk-125': {
    id: 'rk-125',
    name: 'Канальный вентилятор RK 125',
    description: 'Мощный канальный вентилятор для вытяжной вентиляции',
    fullDescription: 'Канальный вентилятор RK 125 предназначен для установки в вентиляционные каналы диаметром 125 мм. Обеспечивает эффективную вытяжную вентиляцию в жилых и коммерческих помещениях. Корпус изготовлен из высококачественного пластика, устойчивого к воздействию влаги и химических веществ.',
    price: 4590,
    images: [
      'https://images.pexels.com/photos/8486972/pexels-photo-8486972.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/7191981/pexels-photo-7191981.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    rating: 4.6,
    reviewCount: 35,
    brand: 'Вентс',
    model: 'RK 125',
    category: 'ventilation',
    specifications: {
      'Диаметр': '125 мм',
      'Производительность': '185 м³/ч',
      'Мощность': '16 Вт',
      'Уровень шума': '26 дБ',
      'Напряжение': '220-240 В',
      'Частота': '50 Гц',
      'Класс защиты': 'IP44',
      'Материал корпуса': 'ABS пластик',
      'Рабочая температура': '-10°C до +40°C',
      'Вес': '0.4 кг'
    },
    features: [
      'Низкий уровень шума',
      'Долгий срок службы',
      'Простое обслуживание',
      'Защита от влаги IP44',
      'Энергоэффективный двигатель',
      'Обратный клапан в комплекте'
    ],
    applications: [
      {
        icon: <Home className="h-6 w-6 text-secondary" />,
        title: 'Ванные комнаты',
        description: 'Эффективное удаление влаги и запахов из ванных комнат и санузлов.'
      },
      {
        icon: <Building className="h-6 w-6 text-secondary" />,
        title: 'Кухни',
        description: 'Вытяжка кухонных запахов и избыточной влажности при готовке.'
      },
      {
        icon: <Store className="h-6 w-6 text-secondary" />,
        title: 'Подсобные помещения',
        description: 'Вентиляция кладовых, гардеробных, технических помещений.'
      }
    ],
    installation: {
      complexity: 'Простая',
      time: '1-2 часа',
      team: '1 специалист',
      requirements: [
        'Вентиляционный канал диаметром 125 мм',
        'Электропитание 220В',
        'Доступ к месту установки',
        'Возможность крепления к стене или потолку'
      ],
      steps: [
        'Подготовка места установки и проверка канала',
        'Установка вентилятора в канал',
        'Подключение к электросети',
        'Установка декоративной решетки',
        'Проверка работоспособности и настройка'
      ],
      warranty: '2 года на оборудование, 1 год на монтажные работы',
      maintenance: 'Очистка решетки и проверка работы 1 раз в 6 месяцев'
    },
    relatedProducts: ['pvu-350']
  },
  'pvu-350': {
    id: 'pvu-350',
    name: 'Приточная установка ПВУ-350',
    description: 'Компактная приточная установка с функцией подогрева',
    fullDescription: 'Приточная вентиляционная установка ПВУ-350 предназначена для подачи свежего воздуха в помещения с одновременной фильтрацией и подогревом. Оснащена рекуператором тепла для повышения энергоэффективности. Компактные размеры позволяют установку в ограниченном пространстве.',
    price: 67900,
    images: [
      'https://images.pexels.com/photos/6444/pencil-typography-black-design.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/8486972/pexels-photo-8486972.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    rating: 4.5,
    reviewCount: 8,
    brand: 'Вентмашина',
    model: 'ПВУ-350',
    category: 'ventilation',
    specifications: {
      'Производительность': '350 м³/ч',
      'Мощность нагревателя': '1.5 кВт',
      'Мощность вентилятора': '120 Вт',
      'Эффективность рекуперации': '85%',
      'Уровень шума': '35 дБ',
      'Напряжение': '220 В',
      'Класс фильтрации': 'G4/F7',
      'Размеры': '600×400×300 мм',
      'Вес': '18 кг',
      'Рабочая температура': '-25°C до +50°C'
    },
    features: [
      'Рекуперация тепла до 85%',
      'Автоматическое управление',
      'Компактные размеры',
      'Двухступенчатая фильтрация',
      'Защита от замерзания',
      'Байпас рекуператора'
    ],
    applications: [
      {
        icon: <Home className="h-6 w-6 text-secondary" />,
        title: 'Квартиры и дома',
        description: 'Обеспечение свежим воздухом жилых помещений с экономией тепла.'
      },
      {
        icon: <Building className="h-6 w-6 text-secondary" />,
        title: 'Офисы',
        description: 'Создание комфортного микроклимата в рабочих помещениях.'
      },
      {
        icon: <School className="h-6 w-6 text-secondary" />,
        title: 'Образовательные учреждения',
        description: 'Вентиляция классов, аудиторий, детских комнат.'
      }
    ],
    installation: {
      complexity: 'Сложная',
      time: '6-8 часов',
      team: '2-3 специалиста',
      requirements: [
        'Электропитание 220В',
        'Место для установки агрегата',
        'Возможность прокладки воздуховодов',
        'Доступ к наружной стене для воздухозабора',
        'Дренаж для отвода конденсата'
      ],
      steps: [
        'Выбор места установки и подготовка основания',
        'Монтаж приточной установки',
        'Прокладка воздуховодов и установка решеток',
        'Подключение электропитания и автоматики',
        'Пусконаладочные работы и настройка параметров',
        'Обучение персонала эксплуатации'
      ],
      warranty: '3 года на оборудование, 2 года на монтажные работы',
      maintenance: 'Замена фильтров каждые 3-6 месяцев, техобслуживание 2 раза в год'
    },
    relatedProducts: ['rk-125']
  },
  'kev-6p': {
    id: 'kev-6p',
    name: 'Тепловая завеса Тепломаш КЭВ-6П',
    description: 'Тепловая завеса для проемов до 2.2 метров',
    fullDescription: 'Электрическая тепловая завеса Тепломаш КЭВ-6П предназначена для защиты помещений от проникновения холодного воздуха через дверные проемы. Создает невидимый воздушный барьер, который предотвращает потери тепла и проникновение пыли, насекомых и неприятных запахов.',
    price: 15600,
    images: [
      'https://images.pexels.com/photos/7109803/pexels-photo-7109803.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    rating: 4.4,
    reviewCount: 16,
    brand: 'Тепломаш',
    model: 'КЭВ-6П',
    category: 'curtains',
    specifications: {
      'Тепловая мощность': '6 кВт',
      'Расход воздуха': '450 м³/ч',
      'Высота установки': 'до 2.2 м',
      'Напряжение': '220 В',
      'Потребляемый ток': '27.3 А',
      'Уровень шума': '45 дБ',
      'Размеры': '665×200×245 мм',
      'Вес': '8.5 кг',
      'Класс защиты': 'IP21',
      'Управление': 'Пульт ДУ'
    },
    features: [
      'Быстрый нагрев',
      'Защита от холода',
      'Простой монтаж',
      'Пульт дистанционного управления',
      'Регулировка мощности',
      'Защита от перегрева'
    ],
    applications: [
      {
        icon: <Store className="h-6 w-6 text-secondary" />,
        title: 'Магазины и торговые центры',
        description: 'Защита торговых залов от потерь тепла при открывании входных дверей.'
      },
      {
        icon: <Building className="h-6 w-6 text-secondary" />,
        title: 'Офисные здания',
        description: 'Поддержание комфортной температуры в вестибюлях и холлах.'
      },
      {
        icon: <Factory className="h-6 w-6 text-secondary" />,
        title: 'Склады и производства',
        description: 'Защита рабочих зон от холодного воздуха при открытии ворот.'
      }
    ],
    installation: {
      complexity: 'Средняя',
      time: '2-3 часа',
      team: '2 специалиста',
      requirements: [
        'Электропитание 220В, 30А',
        'Прочное крепление над проемом',
        'Высота установки не более 2.2 м',
        'Доступ для обслуживания'
      ],
      steps: [
        'Разметка места установки над проемом',
        'Монтаж кронштейнов крепления',
        'Установка тепловой завесы',
        'Подключение к электросети',
        'Настройка и проверка работы'
      ],
      warranty: '2 года на оборудование, 1 год на монтажные работы',
      maintenance: 'Очистка фильтров и проверка нагревательных элементов 1 раз в год'
    },
    relatedProducts: ['daikin-ftxb25c']
  }
};