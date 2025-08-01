import React from 'react';
import { Home, Building, Factory, Store, Hotel, Guitar as Hospital, School, ShoppingCart, Zap, Shield, Snowflake, Wind, Thermometer, Volume2, Wifi, Timer, Filter, Droplets, Sun, Moon } from 'lucide-react';

export interface ProductSpecification {
  category: string;
  specifications: Record<string, string>;
}

export interface ProductFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface ProductImage {
  url: string;
  alt: string;
  type: 'main' | 'gallery' | 'technical' | 'installation';
  caption?: string;
}

export interface ProductApplication {
  icon: React.ReactNode;
  title: string;
  description: string;
  benefits: string[];
  recommendedFor: string[];
}

export interface ProductInstallation {
  complexity: 'Простая' | 'Средняя' | 'Сложная';
  time: string;
  team: string;
  requirements: string[];
  steps: string[];
  warranty: string;
  maintenance: string;
  tools: string[];
  materials: string[];
}

export interface EnhancedProduct {
  id: string;
  name: string;
  brand: string;
  model: string;
  category: string;
  subcategory: string;
  
  // Описания
  shortDescription: string;
  fullDescription: string;
  technicalDescription: string;
  
  // Цены и наличие
  price: number;
  oldPrice?: number;
  currency: string;
  availability: 'В наличии' | 'Под заказ' | 'Нет в наличии';
  deliveryTime: string;
  
  // Изображения
  images: ProductImage[];
  
  // Рейтинг и отзывы
  rating: number;
  reviewCount: number;
  
  // Характеристики
  specifications: ProductSpecification[];
  
  // Особенности
  features: ProductFeature[];
  
  // Применение
  applications: ProductApplication[];
  
  // Установка
  installation: ProductInstallation;
  
  // SEO и метаданные
  seoTitle?: string;
  seoDescription?: string;
  keywords: string[];
  
  // Дополнительная информация
  certifications: string[];
  energyClass?: string;
  noiseLevel?: string;
  dimensions: {
    length: number;
    width: number;
    height: number;
    weight: number;
  };
  
  // Связанные товары
  relatedProducts: string[];
  accessories: string[];
  
  // Статусы
  isNew?: boolean;
  isSale?: boolean;
  isPopular?: boolean;
  isBestseller?: boolean;
}

// Высококачественные изображения для демонстрации
const highQualityImages = {
  daikinAC: [
    {
      url: 'https://images.pexels.com/photos/4270511/pexels-photo-4270511.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&dpr=2',
      alt: 'Кондиционер Daikin FTXB25C - вид спереди',
      type: 'main' as const,
      caption: 'Элегантный дизайн внутреннего блока'
    },
    {
      url: 'https://images.pexels.com/photos/4489794/pexels-photo-4489794.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&dpr=2',
      alt: 'Кондиционер Daikin FTXB25C - наружный блок',
      type: 'gallery' as const,
      caption: 'Компактный наружный блок с инверторным компрессором'
    },
    {
      url: 'https://images.pexels.com/photos/7191981/pexels-photo-7191981.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&dpr=2',
      alt: 'Кондиционер Daikin FTXB25C - пульт управления',
      type: 'gallery' as const,
      caption: 'Интуитивно понятный пульт дистанционного управления'
    },
    {
      url: 'https://images.pexels.com/photos/8961214/pexels-photo-8961214.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&dpr=2',
      alt: 'Установка кондиционера Daikin FTXB25C',
      type: 'installation' as const,
      caption: 'Профессиональная установка специалистами'
    }
  ],
  mitsubishiAC: [
    {
      url: 'https://images.pexels.com/photos/4489794/pexels-photo-4489794.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&dpr=2',
      alt: 'Кондиционер Mitsubishi MSZ-LN25VG - премиальный дизайн',
      type: 'main' as const,
      caption: 'Премиальный дизайн с Wi-Fi модулем'
    },
    {
      url: 'https://images.pexels.com/photos/7191981/pexels-photo-7191981.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&dpr=2',
      alt: 'Mitsubishi MSZ-LN25VG - система фильтрации',
      type: 'technical' as const,
      caption: 'Многоступенчатая система фильтрации воздуха'
    }
  ],
  ventilationFan: [
    {
      url: 'https://images.pexels.com/photos/8486972/pexels-photo-8486972.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&dpr=2',
      alt: 'Канальный вентилятор RK 125 - общий вид',
      type: 'main' as const,
      caption: 'Компактный канальный вентилятор'
    },
    {
      url: 'https://images.pexels.com/photos/6444/pencil-typography-black-design.jpg?auto=compress&cs=tinysrgb&w=1920&h=1280&dpr=2',
      alt: 'Вентилятор RK 125 - технические детали',
      type: 'technical' as const,
      caption: 'Высококачественные материалы и компоненты'
    }
  ],
  heatCurtain: [
    {
      url: 'https://images.pexels.com/photos/7109803/pexels-photo-7109803.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&dpr=2',
      alt: 'Тепловая завеса Тепломаш КЭВ-6П',
      type: 'main' as const,
      caption: 'Эффективная защита от холода'
    }
  ]
};

export const enhancedProductDatabase: Record<string, EnhancedProduct> = {
  'daikin-ftxb25c': {
    id: 'daikin-ftxb25c',
    name: 'Кондиционер Daikin FTXB25C',
    brand: 'Daikin',
    model: 'FTXB25C',
    category: 'air-conditioning',
    subcategory: 'split-systems',
    
    shortDescription: 'Инверторная настенная сплит-система с высокой энергоэффективностью класса A++',
    fullDescription: `Настенная сплит-система Daikin FTXB25C представляет собой современное решение для кондиционирования жилых и коммерческих помещений площадью до 25 м². 

Оснащена передовым инверторным компрессором Swing, который обеспечивает исключительную энергоэффективность класса A++ и точное поддержание заданной температуры с минимальными колебаниями.

Система оборудована многоступенчатой фильтрацией воздуха, включающей фотокаталитический фильтр и фильтр с активированным углем, что обеспечивает не только комфортную температуру, но и высокое качество воздуха в помещении.

Функция самоочистки автоматически удаляет влагу и предотвращает образование плесени и бактерий внутри блока, что значительно упрощает обслуживание и продлевает срок службы оборудования.`,
    
    technicalDescription: `Кондиционер использует экологически безопасный хладагент R32, который имеет нулевой потенциал разрушения озонового слоя и на 68% меньший потенциал глобального потепления по сравнению с R410A.

Инверторная технология позволяет плавно регулировать производительность компрессора в диапазоне от 20% до 100%, что обеспечивает:
- Снижение энергопотребления до 30%
- Минимальный уровень шума (от 19 дБ)
- Быстрое достижение заданной температуры
- Стабильное поддержание микроклимата

Система оснащена интеллектуальным датчиком движения, который автоматически переключает режимы работы в зависимости от присутствия людей в помещении.`,
    
    price: 38900,
    oldPrice: 42500,
    currency: 'RUB',
    availability: 'В наличии',
    deliveryTime: '1-2 дня',
    
    images: highQualityImages.daikinAC,
    
    rating: 4.8,
    reviewCount: 24,
    
    specifications: [
      {
        category: 'Основные характеристики',
        specifications: {
          'Тип': 'Настенная сплит-система',
          'Площадь охлаждения': 'до 25 м²',
          'Мощность охлаждения': '2.5 кВт',
          'Мощность обогрева': '3.2 кВт',
          'Потребляемая мощность (охлаждение)': '0.77 кВт',
          'Потребляемая мощность (обогрев)': '0.85 кВт',
          'Энергоэффективность (охлаждение)': 'A++',
          'Энергоэффективность (обогрев)': 'A+',
          'SEER': '6.1',
          'SCOP': '4.0'
        }
      },
      {
        category: 'Технические параметры',
        specifications: {
          'Хладагент': 'R32',
          'Количество хладагента': '0.58 кг',
          'Диапазон рабочих температур (охлаждение)': '-10°C до +46°C',
          'Диапазон рабочих температур (обогрев)': '-15°C до +24°C',
          'Производительность воздуха': '450 м³/ч',
          'Максимальная длина трассы': '20 м',
          'Максимальный перепад высот': '12 м',
          'Диаметр жидкостной трубы': '6.35 мм',
          'Диаметр газовой трубы': '12.7 мм'
        }
      },
      {
        category: 'Внутренний блок',
        specifications: {
          'Размеры (Ш×В×Г)': '770×285×225 мм',
          'Вес': '8.5 кг',
          'Уровень шума': '19/22/26/29/33/36 дБ',
          'Количество скоростей вентилятора': '6',
          'Тип дисплея': 'LED',
          'Материал корпуса': 'ABS пластик'
        }
      },
      {
        category: 'Наружный блок',
        specifications: {
          'Размеры (Ш×В×Г)': '675×550×289 мм',
          'Вес': '26 кг',
          'Уровень шума': '46 дБ',
          'Тип компрессора': 'Инверторный ротационный',
          'Количество вентиляторов': '1',
          'Диаметр вентилятора': '400 мм',
          'Материал теплообменника': 'Медь с алюминиевыми ребрами'
        }
      },
      {
        category: 'Электрические характеристики',
        specifications: {
          'Напряжение питания': '220-240 В / 50 Гц',
          'Максимальный потребляемый ток': '4.2 А',
          'Класс электрозащиты': 'I',
          'Степень защиты': 'IPX4',
          'Пусковой ток': '8 А'
        }
      }
    ],
    
    features: [
      {
        icon: <Zap className="h-6 w-6" />,
        title: 'Инверторная технология',
        description: 'Плавное регулирование мощности компрессора обеспечивает экономию энергии до 30% и стабильную температуру'
      },
      {
        icon: <Shield className="h-6 w-6" />,
        title: 'Функция самоочистки',
        description: 'Автоматическая очистка внутреннего блока предотвращает образование плесени и бактерий'
      },
      {
        icon: <Filter className="h-6 w-6" />,
        title: 'Многоступенчатая фильтрация',
        description: 'Фотокаталитический фильтр и фильтр с активированным углем обеспечивают чистоту воздуха'
      },
      {
        icon: <Volume2 className="h-6 w-6" />,
        title: 'Ультратихая работа',
        description: 'Минимальный уровень шума от 19 дБ для комфортного сна и отдыха'
      },
      {
        icon: <Wifi className="h-6 w-6" />,
        title: 'Умное управление',
        description: 'Интеллектуальные датчики и возможность подключения Wi-Fi модуля для дистанционного управления'
      },
      {
        icon: <Timer className="h-6 w-6" />,
        title: 'Программируемый таймер',
        description: 'Гибкие настройки включения и выключения для максимального комфорта и экономии'
      },
      {
        icon: <Snowflake className="h-6 w-6" />,
        title: 'Быстрое охлаждение',
        description: 'Режим Powerful обеспечивает быстрое достижение заданной температуры'
      },
      {
        icon: <Sun className="h-6 w-6" />,
        title: 'Эффективный обогрев',
        description: 'Стабильная работа при температуре до -15°C с высокой эффективностью'
      }
    ],
    
    applications: [
      {
        icon: <Home className="h-6 w-6" />,
        title: 'Жилые помещения',
        description: 'Идеальное решение для квартир, домов и коттеджей',
        benefits: [
          'Комфортная температура круглый год',
          'Очистка и увлажнение воздуха',
          'Экономия на отоплении',
          'Тихая работа для спокойного сна'
        ],
        recommendedFor: [
          'Спальни до 25 м²',
          'Гостиные до 20 м²',
          'Детские комнаты',
          'Кабинеты и рабочие зоны'
        ]
      },
      {
        icon: <Building className="h-6 w-6" />,
        title: 'Офисные помещения',
        description: 'Создание продуктивной рабочей атмосферы',
        benefits: [
          'Повышение работоспособности',
          'Снижение заболеваемости',
          'Экономия электроэнергии',
          'Простое управление'
        ],
        recommendedFor: [
          'Кабинеты руководителей',
          'Переговорные комнаты',
          'Приемные',
          'Небольшие офисы'
        ]
      },
      {
        icon: <Store className="h-6 w-6" />,
        title: 'Коммерческие объекты',
        description: 'Комфорт для клиентов и персонала',
        benefits: [
          'Привлечение клиентов',
          'Сохранность товаров',
          'Комфорт персонала',
          'Надежная работа'
        ],
        recommendedFor: [
          'Небольшие магазины',
          'Салоны красоты',
          'Кафе и рестораны',
          'Медицинские кабинеты'
        ]
      }
    ],
    
    installation: {
      complexity: 'Средняя',
      time: '3-4 часа',
      team: '2 монтажника',
      requirements: [
        'Электропитание 220В с заземлением',
        'Возможность вывода дренажа',
        'Доступ к наружной стене для установки внешнего блока',
        'Расстояние между блоками не более 15 м',
        'Прочная стена для крепления внутреннего блока',
        'Свободное пространство вокруг наружного блока (50 см со всех сторон)'
      ],
      steps: [
        'Осмотр объекта и выбор оптимального места установки блоков',
        'Разметка и подготовка мест крепления',
        'Сверление отверстий в стене для межблочных коммуникаций',
        'Установка кронштейнов и монтаж внутреннего блока',
        'Установка наружного блока на подготовленную площадку',
        'Прокладка медных трубопроводов и электрического кабеля',
        'Подключение дренажной системы',
        'Вакуумирование системы и проверка герметичности',
        'Заправка системы хладагентом',
        'Подключение электропитания и настройка автоматики',
        'Пусконаладочные работы и тестирование всех режимов',
        'Инструктаж пользователя по эксплуатации'
      ],
      warranty: '5 лет на оборудование, 3 года на монтажные работы',
      maintenance: 'Рекомендуется профилактическое обслуживание 2 раза в год (весной и осенью)',
      tools: [
        'Перфоратор с коронками',
        'Вакуумный насос',
        'Манометрический коллектор',
        'Труборез и развальцовка',
        'Электроинструмент',
        'Измерительные приборы'
      ],
      materials: [
        'Медные трубы 6.35 и 12.7 мм',
        'Теплоизоляция для труб',
        'Электрический кабель',
        'Дренажная трубка',
        'Крепежные элементы',
        'Герметики и изоляционные материалы'
      ]
    },
    
    seoTitle: 'Кондиционер Daikin FTXB25C - купить с установкой в Москве',
    seoDescription: 'Инверторный кондиционер Daikin FTXB25C класса A++ для помещений до 25 м². Цена 38,900 ₽. Профессиональная установка, гарантия 5 лет. Заказать в НОРДИНЖИНИРИНГ.',
    keywords: [
      'кондиционер Daikin',
      'FTXB25C',
      'инверторный кондиционер',
      'сплит-система',
      'класс A++',
      'R32',
      'тихий кондиционер',
      'энергоэффективный',
      'самоочистка',
      'установка кондиционера'
    ],
    
    certifications: [
      'CE',
      'EAC',
      'ISO 9001',
      'ISO 14001',
      'EUROVENT',
      'Energy Star'
    ],
    energyClass: 'A++',
    noiseLevel: '19 дБ',
    
    dimensions: {
      length: 770,
      width: 285,
      height: 225,
      weight: 8.5
    },
    
    relatedProducts: [
      'mitsubishi-msz-ln25vg',
      'carrier-42qhc012ds',
      'panasonic-cs-tz25tkew'
    ],
    accessories: [
      'wifi-module-daikin',
      'decorative-panel-daikin',
      'drain-pump-daikin'
    ],
    
    isSale: true,
    isPopular: true
  },

  'mitsubishi-msz-ln25vg': {
    id: 'mitsubishi-msz-ln25vg',
    name: 'Кондиционер Mitsubishi Electric MSZ-LN25VG',
    brand: 'Mitsubishi Electric',
    model: 'MSZ-LN25VG',
    category: 'air-conditioning',
    subcategory: 'split-systems',
    
    shortDescription: 'Премиальная инверторная сплит-система с Wi-Fi управлением и технологией 3D i-see Sensor',
    fullDescription: `Mitsubishi Electric MSZ-LN25VG представляет собой флагманскую модель премиум-класса с революционной технологией 3D i-see Sensor, которая сканирует помещение в 752 точках и создает индивидуальные зоны комфорта для каждого человека.

Система оснащена передовым инверторным компрессором с технологией Hyper-Inverter, обеспечивающим исключительную энергоэффективность и способность работать при экстремально низких температурах до -25°C.

Встроенный Wi-Fi модуль позволяет управлять кондиционером через мобильное приложение MELCloud из любой точки мира, а также интегрировать его в системы "умного дома".

Уникальная система фильтрации включает плазменный фильтр Plasma Quad Plus, который эффективно удаляет вирусы, бактерии, аллергены и неприятные запахи, создавая здоровую атмосферу в помещении.`,
    
    technicalDescription: `Кондиционер использует экологически чистый хладагент R32 и оснащен двухроторным компрессором с технологией Jet Towel, обеспечивающей быстрое и равномерное распределение воздуха.

Технология 3D i-see Sensor включает:
- Инфракрасное сканирование помещения
- Определение количества и расположения людей
- Автоматическую настройку направления воздушного потока
- Индивидуальные зоны комфорта для каждого человека
- Функцию отсутствия для экономии энергии

Система Dual Barrier Coating защищает теплообменник от коррозии и загрязнений, значительно продлевая срок службы оборудования.`,
    
    price: 45600,
    currency: 'RUB',
    availability: 'В наличии',
    deliveryTime: '1-3 дня',
    
    images: highQualityImages.mitsubishiAC,
    
    rating: 4.9,
    reviewCount: 18,
    
    specifications: [
      {
        category: 'Основные характеристики',
        specifications: {
          'Тип': 'Настенная сплит-система премиум-класса',
          'Площадь охлаждения': 'до 25 м²',
          'Мощность охлаждения': '2.5 кВт',
          'Мощность обогрева': '3.2 кВт',
          'Потребляемая мощность (охлаждение)': '0.69 кВт',
          'Потребляемая мощность (обогрев)': '0.78 кВт',
          'Энергоэффективность (охлаждение)': 'A+++',
          'Энергоэффективность (обогрев)': 'A++',
          'SEER': '8.1',
          'SCOP': '5.1'
        }
      },
      {
        category: 'Технические параметры',
        specifications: {
          'Хладагент': 'R32',
          'Количество хладагента': '0.65 кг',
          'Диапазон рабочих температур (охлаждение)': '-10°C до +46°C',
          'Диапазон рабочих температур (обогрев)': '-25°C до +24°C',
          'Производительность воздуха': '516 м³/ч',
          'Максимальная длина трассы': '30 м',
          'Максимальный перепад высот': '20 м',
          'Диаметр жидкостной трубы': '6.35 мм',
          'Диаметр газовой трубы': '12.7 мм'
        }
      },
      {
        category: 'Внутренний блок',
        specifications: {
          'Размеры (Ш×В×Г)': '799×295×225 мм',
          'Вес': '10.5 кг',
          'Уровень шума': '19/21/24/28/32/38 дБ',
          'Количество скоростей вентилятора': '6 + AUTO',
          'Тип дисплея': 'LED с Wi-Fi индикатором',
          'Материал корпуса': 'Высококачественный ABS с антибактериальным покрытием'
        }
      },
      {
        category: 'Умные функции',
        specifications: {
          '3D i-see Sensor': '752 точки сканирования',
          'Wi-Fi модуль': 'Встроенный',
          'Мобильное приложение': 'MELCloud',
          'Голосовое управление': 'Amazon Alexa, Google Assistant',
          'Геолокация': 'Автоматическое включение/выключение',
          'Еженедельный таймер': '4 программы в день'
        }
      }
    ],
    
    features: [
      {
        icon: <Zap className="h-6 w-6" />,
        title: '3D i-see Sensor',
        description: 'Революционная технология сканирования помещения в 752 точках для создания индивидуальных зон комфорта'
      },
      {
        icon: <Wifi className="h-6 w-6" />,
        title: 'Wi-Fi управление',
        description: 'Встроенный Wi-Fi модуль и приложение MELCloud для управления из любой точки мира'
      },
      {
        icon: <Filter className="h-6 w-6" />,
        title: 'Plasma Quad Plus',
        description: 'Плазменный фильтр четвертого поколения удаляет 99% вирусов, бактерий и аллергенов'
      },
      {
        icon: <Thermometer className="h-6 w-6" />,
        title: 'Hyper-Inverter',
        description: 'Передовая инверторная технология с работой при температуре до -25°C'
      },
      {
        icon: <Wind className="h-6 w-6" />,
        title: 'Jet Towel',
        description: 'Технология быстрого и равномерного распределения воздуха по всему помещению'
      },
      {
        icon: <Shield className="h-6 w-6" />,
        title: 'Dual Barrier Coating',
        description: 'Двойное защитное покрытие теплообменника от коррозии и загрязнений'
      }
    ],
    
    applications: [
      {
        icon: <Home className="h-6 w-6" />,
        title: 'Премиальные жилые помещения',
        description: 'Идеальное решение для требовательных пользователей',
        benefits: [
          'Индивидуальные зоны комфорта',
          'Максимальная энергоэффективность',
          'Здоровый микроклимат',
          'Интеллектуальное управление'
        ],
        recommendedFor: [
          'Элитные квартиры',
          'Загородные дома',
          'Мастер-спальни',
          'Домашние кинотеатры'
        ]
      },
      {
        icon: <Building className="h-6 w-6" />,
        title: 'Представительские офисы',
        description: 'Создание престижной рабочей атмосферы',
        benefits: [
          'Имиджевое решение',
          'Максимальный комфорт',
          'Умное управление',
          'Экономия энергии'
        ],
        recommendedFor: [
          'Кабинеты топ-менеджеров',
          'VIP переговорные',
          'Приемные премиум-класса',
          'Представительства'
        ]
      }
    ],
    
    installation: {
      complexity: 'Сложная',
      time: '4-5 часов',
      team: '2 сертифицированных монтажника',
      requirements: [
        'Электропитание 220В с качественным заземлением',
        'Стабильное интернет-соединение для Wi-Fi',
        'Возможность вывода дренажа с уклоном',
        'Доступ к наружной стене',
        'Расстояние между блоками не более 25 м',
        'Прочная стена для крепления (нагрузка до 15 кг)'
      ],
      steps: [
        'Детальный осмотр объекта и планирование установки',
        'Настройка Wi-Fi соединения и тестирование сети',
        'Прецизионная разметка мест установки',
        'Аккуратное сверление отверстий с пылеудалением',
        'Установка усиленных кронштейнов',
        'Монтаж внутреннего блока с точной горизонтальной установкой',
        'Установка наружного блока с виброизоляцией',
        'Прокладка медных трубопроводов с качественной изоляцией',
        'Подключение дренажной системы с проверкой уклонов',
        'Вакуумирование системы до глубокого вакуума',
        'Заправка хладагентом с контролем давления',
        'Подключение и настройка электрических соединений',
        'Конфигурация Wi-Fi модуля и приложения',
        'Калибровка 3D i-see Sensor',
        'Полное тестирование всех функций',
        'Обучение пользователя работе с приложением'
      ],
      warranty: '7 лет на оборудование, 5 лет на монтажные работы',
      maintenance: 'Профилактическое обслуживание 2 раза в год с диагностикой умных функций',
      tools: [
        'Профессиональный перфоратор с пылесосом',
        'Высокопроизводительный вакуумный насос',
        'Цифровой манометрический коллектор',
        'Прецизионный труборез и развальцовка',
        'Мультиметр и тестеры',
        'Специальные ключи Mitsubishi'
      ],
      materials: [
        'Медные трубы высокого качества',
        'Премиальная теплоизоляция',
        'Экранированный кабель',
        'Конденсатная помпа (при необходимости)',
        'Виброизоляционные прокладки',
        'Профессиональные герметики'
      ]
    },
    
    seoTitle: 'Mitsubishi Electric MSZ-LN25VG с Wi-Fi - премиум кондиционер',
    seoDescription: 'Премиальный кондиционер Mitsubishi MSZ-LN25VG с 3D i-see Sensor и Wi-Fi. Цена 45,600 ₽. Технология индивидуальных зон комфорта. Установка в Москве.',
    keywords: [
      'Mitsubishi Electric',
      'MSZ-LN25VG',
      'премиум кондиционер',
      '3D i-see Sensor',
      'Wi-Fi кондиционер',
      'MELCloud',
      'плазменный фильтр',
      'умный дом',
      'энергоэффективность A+++'
    ],
    
    certifications: [
      'CE',
      'EAC',
      'ISO 9001',
      'ISO 14001',
      'EUROVENT',
      'Wi-Fi Alliance',
      'Energy Star'
    ],
    energyClass: 'A+++',
    noiseLevel: '19 дБ',
    
    dimensions: {
      length: 799,
      width: 295,
      height: 225,
      weight: 10.5
    },
    
    relatedProducts: [
      'daikin-ftxb25c',
      'panasonic-cs-tz25tkew',
      'lg-artcool-gallery'
    ],
    accessories: [
      'decorative-panel-mitsubishi',
      'external-sensor-mitsubishi',
      'smart-home-gateway'
    ],
    
    isNew: true,
    isPopular: true,
    isBestseller: true
  },

  'rk-125': {
    id: 'rk-125',
    name: 'Канальный вентилятор ВЕНТС RK 125',
    brand: 'ВЕНТС',
    model: 'RK 125',
    category: 'ventilation',
    subcategory: 'duct-fans',
    
    shortDescription: 'Высокоэффективный канальный вентилятор с низким энергопотреблением для круглых воздуховодов',
    fullDescription: `Канальный вентилятор ВЕНТС RK 125 представляет собой современное решение для эффективной вентиляции жилых и коммерческих помещений. Предназначен для установки в круглые воздуховоды диаметром 125 мм.

Оснащен высокоэффективным электродвигателем с внешним ротором и аэродинамически оптимизированным рабочим колесом, что обеспечивает максимальную производительность при минимальном энергопотреблении.

Корпус изготовлен из высококачественного ABS пластика, устойчивого к воздействию влаги, химических веществ и ультрафиолетового излучения. Специальное покрытие предотвращает накопление пыли и облегчает обслуживание.

Встроенная система виброизоляции и аэродинамический дизайн обеспечивают исключительно тихую работу, что делает вентилятор идеальным для использования в жилых помещениях.`,
    
    technicalDescription: `Вентилятор оснащен однофазным асинхронным двигателем с внешним ротором, который обеспечивает:
- Высокий КПД до 85%
- Низкое энергопотребление
- Долгий срок службы (более 40,000 часов)
- Минимальный уровень шума

Рабочее колесо изготовлено из высокопрочного пластика с аэродинамическим профилем лопастей, оптимизированным для максимальной эффективности и минимального шума.

Система защиты включает:
- Термозащиту двигателя
- Защиту от перегрузки
- Влагозащиту IP44
- Защиту от обратного потока воздуха`,
    
    price: 4590,
    currency: 'RUB',
    availability: 'В наличии',
    deliveryTime: 'В день заказа',
    
    images: highQualityImages.ventilationFan,
    
    rating: 4.6,
    reviewCount: 35,
    
    specifications: [
      {
        category: 'Основные характеристики',
        specifications: {
          'Диаметр воздуховода': '125 мм',
          'Производительность': '185 м³/ч',
          'Статическое давление': '105 Па',
          'Мощность': '16 Вт',
          'Потребляемый ток': '0.08 А',
          'КПД': '85%',
          'Уровень шума': '26 дБ(А)',
          'Класс защиты': 'IP44'
        }
      },
      {
        category: 'Технические параметры',
        specifications: {
          'Напряжение питания': '220-240 В',
          'Частота': '50/60 Гц',
          'Тип двигателя': 'Асинхронный с внешним ротором',
          'Количество оборотов': '2550 об/мин',
          'Тип подшипников': 'Шариковые, необслуживаемые',
          'Класс изоляции': 'B',
          'Рабочая температура': '-10°C до +40°C',
          'Относительная влажность': 'до 95%'
        }
      },
      {
        category: 'Конструкция',
        specifications: {
          'Материал корпуса': 'ABS пластик',
          'Материал рабочего колеса': 'Высокопрочный пластик',
          'Цвет корпуса': 'Белый RAL 9003',
          'Тип соединения': 'Фланцевое',
          'Направление вращения': 'По часовой стрелке',
          'Способ монтажа': 'Горизонтальный/вертикальный'
        }
      },
      {
        category: 'Габариты и вес',
        specifications: {
          'Длина': '190 мм',
          'Диаметр': '125 мм',
          'Вес': '0.4 кг',
          'Диаметр фланца': '125 мм',
          'Глубина посадки': '25 мм'
        }
      }
    ],
    
    features: [
      {
        icon: <Volume2 className="h-6 w-6" />,
        title: 'Ультратихая работа',
        description: 'Уровень шума всего 26 дБ благодаря аэродинамическому дизайну и виброизоляции'
      },
      {
        icon: <Zap className="h-6 w-6" />,
        title: 'Энергоэффективность',
        description: 'Потребление всего 16 Вт при высокой производительности 185 м³/ч'
      },
      {
        icon: <Shield className="h-6 w-6" />,
        title: 'Защита IP44',
        description: 'Надежная защита от влаги и пыли для долговечной работы'
      },
      {
        icon: <Wind className="h-6 w-6" />,
        title: 'Обратный клапан',
        description: 'Встроенный обратный клапан предотвращает обратный поток воздуха'
      },
      {
        icon: <Thermometer className="h-6 w-6" />,
        title: 'Широкий температурный диапазон',
        description: 'Стабильная работа при температуре от -10°C до +40°C'
      },
      {
        icon: <Timer className="h-6 w-6" />,
        title: 'Долгий срок службы',
        description: 'Ресурс работы более 40,000 часов благодаря качественным подшипникам'
      }
    ],
    
    applications: [
      {
        icon: <Home className="h-6 w-6" />,
        title: 'Ванные комнаты и санузлы',
        description: 'Эффективное удаление влаги и запахов',
        benefits: [
          'Предотвращение плесени',
          'Быстрое удаление влаги',
          'Тихая работа',
          'Простая установка'
        ],
        recommendedFor: [
          'Ванные комнаты до 8 м²',
          'Туалеты',
          'Совмещенные санузлы',
          'Душевые кабины'
        ]
      },
      {
        icon: <Building className="h-6 w-6" />,
        title: 'Кухни и кладовые',
        description: 'Удаление кухонных запахов и избыточной влажности',
        benefits: [
          'Устранение запахов готовки',
          'Защита от конденсата',
          'Сохранность продуктов',
          'Комфортная атмосфера'
        ],
        recommendedFor: [
          'Кухни до 12 м²',
          'Кладовые',
          'Гардеробные',
          'Подсобные помещения'
        ]
      },
      {
        icon: <Store className="h-6 w-6" />,
        title: 'Коммерческие помещения',
        description: 'Поддержание качества воздуха в рабочих зонах',
        benefits: [
          'Соответствие санитарным нормам',
          'Комфорт персонала',
          'Экономия электроэнергии',
          'Надежная работа'
        ],
        recommendedFor: [
          'Офисные туалеты',
          'Подсобки магазинов',
          'Серверные комнаты',
          'Архивы и склады'
        ]
      }
    ],
    
    installation: {
      complexity: 'Простая',
      time: '1-2 часа',
      team: '1 специалист',
      requirements: [
        'Круглый воздуховод диаметром 125 мм',
        'Электропитание 220В',
        'Доступ к месту установки',
        'Возможность крепления к стене или потолку',
        'Выход наружу или в вентиляционную шахту'
      ],
      steps: [
        'Определение оптимального места установки',
        'Проверка диаметра и состояния воздуховода',
        'Подготовка электрического подключения',
        'Установка вентилятора в воздуховод',
        'Герметизация соединений',
        'Подключение к электросети',
        'Проверка направления вращения',
        'Тестирование работы и измерение шума',
        'Установка декоративной решетки (при необходимости)'
      ],
      warranty: '2 года на оборудование, 1 год на монтажные работы',
      maintenance: 'Очистка решетки и проверка работы каждые 6 месяцев',
      tools: [
        'Отвертки',
        'Мультиметр',
        'Герметик',
        'Хомуты или фланцы',
        'Уровень'
      ],
      materials: [
        'Электрический кабель',
        'Автоматический выключатель',
        'Герметизирующая лента',
        'Крепежные элементы',
        'Декоративная решетка'
      ]
    },
    
    seoTitle: 'Канальный вентилятор ВЕНТС RK 125 - купить в Москве',
    seoDescription: 'Тихий канальный вентилятор ВЕНТС RK 125 для воздуховодов 125 мм. Производительность 185 м³/ч, шум 26 дБ. Цена 4,590 ₽. Установка и гарантия.',
    keywords: [
      'канальный вентилятор',
      'ВЕНТС RK 125',
      'вентилятор 125 мм',
      'тихий вентилятор',
      'вытяжной вентилятор',
      'вентиляция ванной',
      'энергоэффективный',
      'IP44'
    ],
    
    certifications: [
      'CE',
      'EAC',
      'ISO 9001',
      'RoHS'
    ],
    energyClass: 'A',
    noiseLevel: '26 дБ',
    
    dimensions: {
      length: 190,
      width: 125,
      height: 125,
      weight: 0.4
    },
    
    relatedProducts: [
      'vents-rk-100',
      'vents-rk-150',
      'pvu-350'
    ],
    accessories: [
      'decorative-grille-125',
      'duct-connector-125',
      'speed-controller'
    ],
    
    isPopular: true
  }
};

// Функции для работы с базой данных
export const getEnhancedProduct = (id: string): EnhancedProduct | undefined => {
  return enhancedProductDatabase[id];
};

export const getProductsByCategory = (category: string): EnhancedProduct[] => {
  return Object.values(enhancedProductDatabase).filter(
    product => product.category === category
  );
};

export const getProductsByBrand = (brand: string): EnhancedProduct[] => {
  return Object.values(enhancedProductDatabase).filter(
    product => product.brand.toLowerCase() === brand.toLowerCase()
  );
};

export const searchProducts = (query: string): EnhancedProduct[] => {
  const searchTerm = query.toLowerCase();
  return Object.values(enhancedProductDatabase).filter(product =>
    product.name.toLowerCase().includes(searchTerm) ||
    product.brand.toLowerCase().includes(searchTerm) ||
    product.shortDescription.toLowerCase().includes(searchTerm) ||
    product.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm))
  );
};

export const getRelatedProducts = (productId: string): EnhancedProduct[] => {
  const product = getEnhancedProduct(productId);
  if (!product) return [];
  
  return product.relatedProducts
    .map(id => getEnhancedProduct(id))
    .filter((p): p is EnhancedProduct => p !== undefined);
};

export const getProductAccessories = (productId: string): EnhancedProduct[] => {
  const product = getEnhancedProduct(productId);
  if (!product) return [];
  
  return product.accessories
    .map(id => getEnhancedProduct(id))
    .filter((p): p is EnhancedProduct => p !== undefined);
};

export const getPopularProducts = (limit: number = 10): EnhancedProduct[] => {
  return Object.values(enhancedProductDatabase)
    .filter(product => product.isPopular)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
};

export const getNewProducts = (limit: number = 10): EnhancedProduct[] => {
  return Object.values(enhancedProductDatabase)
    .filter(product => product.isNew)
    .slice(0, limit);
};

export const getSaleProducts = (limit: number = 10): EnhancedProduct[] => {
  return Object.values(enhancedProductDatabase)
    .filter(product => product.isSale)
    .slice(0, limit);
};