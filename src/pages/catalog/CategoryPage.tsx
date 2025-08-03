import React, { useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import SEOHelmet from '../../components/shared/SEOHelmet';
import Header from '../../components/home/Header';
import Footer from '../../components/home/Footer';
import Breadcrumbs from '../../components/shared/Breadcrumbs';
import ProductFilters from '../../components/catalog/ProductFilters';
import ProductRecommendations from '../../components/catalog/ProductRecommendations';
import { Search, Filter, Grid, List, Star, Heart, BarChart2, ArrowRight } from 'lucide-react';
import { useComparison } from '../../hooks/useComparison';
import { ventilationProducts, ventilationCategories, VentilationCategory } from '../../data/ventilationData';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  isSale?: boolean;
  brand: string;
  category: string;
}

// Функция для преобразования данных вентиляции в формат для отображения
const createProducts = (): Product[] => {
  return ventilationProducts.map((product, index) => ({
    id: product.id.toString(),
    name: product.name,
    description: product.description || 'Оборудование для систем вентиляции и кондиционирования',
    price: product.price ? parseInt(product.price.replace(/[^\d]/g, '')) : Math.floor(Math.random() * 50000) + 5000,
    oldPrice: Math.random() > 0.7 ? Math.floor(Math.random() * 50000) + 5000 : undefined,
    image: product.image || `https://picsum.photos/400/300?random=${product.id}`,
    rating: 4.0 + Math.random() * 1.0,
    reviewCount: Math.floor(Math.random() * 50) + 5,
    isNew: Math.random() > 0.8,
    isSale: Math.random() > 0.7,
    brand: getBrandFromCategory(product.category),
    category: product.category
  }));
};

// Функция для получения бренда из категории
function getBrandFromCategory(category: string): string {
  const brands: { [key: string]: string } = {
    "Вентиляторы": "Вентс",
    "Вентиляционные установки": "Вентмашина",
    "Сетевые элементы": "Вентс",
    "Автоматика": "Вентс",
    "Вентиляционные решетки": "Вентс",
    "Диффузоры": "Вентс",
    "Анемостаты": "Вентс",
    "Воздуховоды": "Вентмашина",
    "Канальные вентиляторы": "Вентс",
    "Осевые вентиляторы": "Вентс",
    "Крышные вентиляторы": "Вентс",
    "Центробежные вентиляторы": "Вентс",
    "Приточно-вытяжные установки": "Вентмашина",
    "Приточные установки": "Вентмашина",
    "Фасонные изделия": "Вентс",
    "Крепления": "Вентс",
    "Изоляция": "Вентс",
    "Датчики": "Вентс",
    "Контроллеры": "Вентс",
    "Приводы": "Вентс",
    "Приточные решетки": "Вентс",
    "Вытяжные решетки": "Вентс",
    "Универсальные решетки": "Вентс",
    "Круглые диффузоры": "Вентс",
    "Прямоугольные диффузоры": "Вентс",
    "Линейные диффузоры": "Вентс",
    "Приточные анемостаты": "Вентс",
    "Вытяжные анемостаты": "Вентс",
    "Универсальные анемостаты": "Вентс",
    "Круглые воздуховоды": "Вентмашина",
    "Прямоугольные воздуховоды": "Вентмашина",
    "Круглые канальные": "Вентс",
    "Прямоугольные канальные": "Вентс",
    "Настенные осевые": "Вентс",
    "Потолочные осевые": "Вентс",
    "Компактные ПВУ": "Вентмашина",
    "Наборные ПВУ": "Вентмашина",
    "Отводы": "Вентс",
    "Тройники": "Вентс",
    "Переходы": "Вентс",
    "Датчики температуры": "Вентс",
    "Датчики влажности": "Вентс",
    "Датчики давления": "Вентс",
    "Оцинкованные круглые": "Вентмашина",
    "Пластиковые круглые": "Вентмашина",
    "Оцинкованные прямоугольные": "Вентмашина",
    "Пластиковые прямоугольные": "Вентмашина"
  };
  
  return brands[category] || "Вентс";
}

// Функция для получения slug категории
function getCategorySlug(category: string): string {
  const slugs: { [key: string]: string } = {
    // Основные категории
    "Вентиляторы": "ventilyatory",
    "Вентиляционные установки": "ventilyatsionnye-ustanovki",
    "Сетевые элементы": "setevye-elementy",
    "Автоматика": "avtomatika",
    "Вентиляционные решетки": "ventilyatsionnye-reshetki",
    "Диффузоры": "diffuzory",
    "Анемостаты": "anemostaty",
    "Воздуховоды": "vozdukhovody",
    
    // Подкатегории вентиляторов
    "Напольные вентиляторы": "napolnye-ventilyatory",
    "Настенные вентиляторы": "nastennye-ventilyatory",
    "Настольные вентиляторы": "nastolnye-ventilyatory",
    "Потолочные вентиляторы": "potolochnye-ventilyatory",
    "Вытяжки для ванной": "vytyazhki-dlya-vannoj",
    "Промышленные": "promyshlennye",
    "Аксессуары": "aksessuary",
    
    // Подкатегории напольных вентиляторов
    "Лопастные напольные": "lopastnye",
    "Безлопастные": "bezlopastnye",
    "Колонные": "kolonnye",
    
    // Подкатегории настольных вентиляторов
    "Лопастные настольные": "lopastnie",
    
    // Подкатегории потолочных вентиляторов
    "С подсветкой": "s-podsvetkoj",
    "Без подсветки": "bez-podsvetki",
    
    // Подкатегории вытяжек для ванной
    "100 мм": "100-mm",
    "120 мм": "120-mm",
    "125 мм": "125-mm",
    "150 мм": "150-mm",
    "свыше 150 мм": "svyshe-150-mm",
    
    // Подкатегории промышленных вентиляторов
    "Канальные круглые": "kruglyye-kanalnye",
    "Канальные прямоугольные": "pryamougolnye-kanalnye",
    "Крышные": "kryshnye",
    "Осевые": "osevye",
    "Центробежные": "centrobezhnye",
    "Дестратификаторы": "destratifikatory",
    "Дымоудаления": "dymoudaleniya",
    "Кухонные": "zharostojkie",
    "Каминные": "kaminnye",
    
    // Подкатегории канальных прямоугольных
    "300x150 мм": "300x150-mm",
    "400x200 мм": "400x200-mm",
    "400x420 мм": "400x420-mm",
    "500x250 мм": "500x250-mm",
    "500x300 мм": "500x300-mm",
    "590х590 мм": "590h590-mm",
    "600х300 мм": "600h300-mm",
    "600x350 мм": "600x350-mm",
    "700x400 мм": "700x400-mm",
    "720x720 мм": "720x720-mm",
    "800x500 мм": "800x500-mm",
    "900x500 мм": "900x500-mm",
    "920x920 мм": "920x920-mm",
    "1000x500 мм": "1000x500-mm",
    
    // Подкатегории крышных
    "190 мм": "190-mm",
    "225 мм": "225-mm",
    "280 мм": "280-mm",
    "310 мм": "310-mm",
    "355 мм": "355-mm",
    "≥ 860 мм": "-860-mm",
    
    // Подкатегории осевых
    "≤ 150 мм": "-150mm",
    "550 мм": "550-mm",
    "≥ 1000 мм": "-1000-mm",
    
    // Подкатегории центробежных
    "≤500 м³ч": "-500m-ch",
    "501-700 м³ч": "501-700m-ch",
    "701-1000 м³ч": "701-1000m-ch",
    "1001-1500 м³ч": "1001-1500m-ch",
    "1501-2000 м³ч": "1501-2000m-ch",
    "2001-3000 м³ч": "2001-3000m-ch",
    "3001-5000 м³ч": "3001-5000m-ch",
    "5001-7000 м³ч": "5001-7000m-ch",
    "7001-10000 м³ч": "7001-10000m-ch",
    ">10000 м³ч": "10000m-ch"
  };
  
  return slugs[category] || category.toLowerCase().replace(/\s+/g, '-');
}

const categoryInfo = {
  'ventilyatory': {
    title: 'Вентиляторы',
    description: 'Канальные, осевые, крышные вентиляторы для систем вентиляции и кондиционирования',
    image: 'https://picsum.photos/800/400?random=1',
    productCount: 150
  },
  'ventilyatsionnye-ustanovki': {
    title: 'Вентиляционные установки',
    description: 'Компактные и наборные вентиляционные установки',
    image: 'https://picsum.photos/800/400?random=2',
    productCount: 80
  },
  'setevye-elementy': {
    title: 'Сетевые элементы',
    description: 'Фасонные изделия, отводы, тройники для воздуховодов',
    image: 'https://picsum.photos/800/400?random=3',
    productCount: 120
  },
  'avtomatika': {
    title: 'Автоматика',
    description: 'Системы автоматизации и управления вентиляцией',
    image: 'https://picsum.photos/800/400?random=4',
    productCount: 90
  },
  'ventilyatsionnye-reshetki': {
    title: 'Вентиляционные решетки',
    description: 'Приточные и вытяжные решетки для систем вентиляции',
    image: 'https://picsum.photos/800/400?random=5',
    productCount: 200
  },
  'diffuzory': {
    title: 'Диффузоры',
    description: 'Диффузоры и распределители воздуха для равномерного распределения',
    image: 'https://picsum.photos/800/400?random=6',
    productCount: 150
  },
  'anemostaty': {
    title: 'Анемостаты',
    description: 'Анемостаты для регулировки воздушного потока',
    image: 'https://picsum.photos/800/400?random=7',
    productCount: 100
  },
  'vozdukhovody': {
    title: 'Воздуховоды',
    description: 'Круглые и прямоугольные воздуховоды из оцинкованной стали',
    image: 'https://picsum.photos/800/400?random=8',
    productCount: 180
  }
};

// Функция для получения описания категории
const getCategoryDescription = (cat: string) => {
  const descriptions: Record<string, string> = {
    'Вентиляторы': 'Широкий выбор вентиляционного оборудования: канальные, осевые, крышные и центробежные вентиляторы для систем вентиляции и кондиционирования.',
    'Вентиляционные установки': 'Компактные и наборные вентиляционные установки для эффективной обработки воздуха.',
    'Сетевые элементы': 'Фасонные изделия, крепления и изоляция для воздуховодов.',
    'Автоматика': 'Системы автоматизации и управления вентиляцией, датчики, контроллеры и приводы.',
    'Вентиляционные решетки': 'Приточные, вытяжные и универсальные решетки для систем вентиляции.',
    'Диффузоры': 'Круглые, прямоугольные и линейные диффузоры для равномерного распределения воздуха.',
    'Анемостаты': 'Приточные, вытяжные и универсальные анемостаты для регулировки воздушного потока.',
    'Воздуховоды': 'Круглые и прямоугольные воздуховоды из оцинкованной стали и пластика.',
    'Канальные вентиляторы': 'Круглые и прямоугольные канальные вентиляторы для систем вентиляции.',
    'Осевые вентиляторы': 'Настенные и потолочные осевые вентиляторы.',
    'Крышные вентиляторы': 'Крышные вентиляторы для вытяжки воздуха.',
    'Центробежные вентиляторы': 'Центробежные вентиляторы для высоконапорных систем.',
    'Приточно-вытяжные установки': 'Компактные и наборные приточно-вытяжные установки.',
    'Приточные установки': 'Приточные установки для подачи свежего воздуха.',
    'Фасонные изделия': 'Отводы, тройники и переходы для воздуховодов.',
    'Крепления': 'Крепления для воздуховодов и оборудования.',
    'Изоляция': 'Теплоизоляция и звукоизоляция для воздуховодов.',
    'Датчики': 'Датчики температуры, влажности и давления.',
    'Контроллеры': 'Контроллеры для управления вентиляционными системами.',
    'Приводы': 'Приводы для клапанов и заслонок.',
    'Приточные решетки': 'Решетки для подачи воздуха в помещение.',
    'Вытяжные решетки': 'Решетки для удаления воздуха из помещения.',
    'Универсальные решетки': 'Универсальные решетки для притока и вытяжки.',
    'Круглые диффузоры': 'Круглые диффузоры для равномерного распределения воздуха.',
    'Прямоугольные диффузоры': 'Прямоугольные диффузоры для распределения воздуха.',
    'Линейные диффузоры': 'Линейные диффузоры для создания воздушной завесы.',
    'Приточные анемостаты': 'Анемостаты для подачи воздуха.',
    'Вытяжные анемостаты': 'Анемостаты для удаления воздуха.',
    'Универсальные анемостаты': 'Универсальные анемостаты для притока и вытяжки.',
    'Круглые воздуховоды': 'Круглые воздуховоды из оцинкованной стали и пластика.',
    'Прямоугольные воздуховоды': 'Прямоугольные воздуховоды из оцинкованной стали и пластика.',
    'Круглые канальные': 'Круглые канальные вентиляторы.',
    'Прямоугольные канальные': 'Прямоугольные канальные вентиляторы.',
    'Настенные осевые': 'Настенные осевые вентиляторы.',
    'Потолочные осевые': 'Потолочные осевые вентиляторы.',
    'Компактные ПВУ': 'Компактные приточно-вытяжные установки.',
    'Наборные ПВУ': 'Наборные приточно-вытяжные установки.',
    'Отводы': 'Отводы для изменения направления воздуховодов.',
    'Тройники': 'Тройники для разветвления воздуховодов.',
    'Переходы': 'Переходы между воздуховодами разного сечения.',
    'Датчики температуры': 'Датчики для измерения температуры воздуха.',
    'Датчики влажности': 'Датчики для измерения влажности воздуха.',
    'Датчики давления': 'Датчики для измерения давления в воздуховодах.',
    'Оцинкованные круглые': 'Круглые воздуховоды из оцинкованной стали.',
    'Пластиковые круглые': 'Круглые воздуховоды из пластика.',
    'Оцинкованные прямоугольные': 'Прямоугольные воздуховоды из оцинкованной стали.',
    'Пластиковые прямоугольные': 'Прямоугольные воздуховоды из пластика.'
  };
  return descriptions[cat] || 'Качественное оборудование для климатических систем';
};

const CategoryPage: React.FC = () => {
  const { category, subcategory, subsubcategory } = useParams<{ 
    category: string; 
    subcategory?: string; 
    subsubcategory?: string; 
  }>();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<Record<string, any>>({});
  
  const { addToComparison, isInComparison } = useComparison();

  // Get category data based on the category parameter
  const getCategoryData = (cat: string, subcat?: string, subsubcat?: string) => {
    // Find the main category
    const mainCategory = ventilationCategories.find(c => getCategorySlug(c.title) === cat);
    if (!mainCategory) return null;

    let targetCategory = mainCategory;
    let targetSubcategory = null;
    let targetSubsubcategory = null;

    // Find subcategory if specified
    if (subcat && mainCategory.subcategories) {
      targetSubcategory = mainCategory.subcategories.find(sc => getCategorySlug(sc.title) === subcat);
      if (targetSubcategory) {
        targetCategory = targetSubcategory;
      }
    }

    // Find sub-subcategory if specified
    if (subsubcat && targetSubcategory && targetSubcategory.subcategories) {
      targetSubsubcategory = targetSubcategory.subcategories.find(ssc => getCategorySlug(ssc.title) === subsubcat);
      if (targetSubsubcategory) {
        targetCategory = targetSubsubcategory;
      }
    }

    // Create products and filter based on the target category
    const allProducts = createProducts();
    const categoryProducts = allProducts.filter(product => {
      const productCategorySlug = getCategorySlug(product.category);
      if (subsubcat) {
        return productCategorySlug === subsubcat;
      } else if (subcat) {
        return productCategorySlug === subcat;
      } else {
        return productCategorySlug === cat;
      }
    });

    return {
      name: targetCategory.title,
      description: getCategoryDescription(targetCategory.title),
      products: categoryProducts,
      subcategories: targetCategory.subcategories || []
    };
  };

  const categoryData = getCategoryData(category || '', subcategory, subsubcategory);
  
  if (!categoryData) {
    return <Navigate to="/catalog" replace />;
  }

  const getCategoryTitle = (cat: string) => {
    const titles: Record<string, string> = {
      'ventilators': 'Вентиляторы',
      'air-ducts': 'Воздуховоды',
      'grilles-diffusers': 'Решетки и диффузоры',
      'air-handling-units': 'Приточно-вытяжные установки',
      'filters': 'Фильтры',
      'valves': 'Клапаны',
      'silencers': 'Шумоглушители',
      'heat-exchangers': 'Теплообменники',
      'automation': 'Автоматика',
      'accessories': 'Комплектующие'
    };
    return titles[cat] || 'Каталог оборудования';
  };



  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": getCategoryTitle(category || ''),
    "description": getCategoryDescription(category || ''),
    "url": `https://nordengineering.ru/catalog/${category}`,
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": categoryData.products.length,
      "itemListElement": categoryData.products.map((product, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Product",
          "name": product.name,
          "description": product.description,
          "offers": {
            "@type": "Offer",
            "price": product.price,
            "priceCurrency": "RUB"
          }
        }
      }))
    }
  };

  const filteredProducts = categoryData.products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Apply filters
    let matchesFilters = true;
    
    // Brand filter
    if (filters.brand && filters.brand.length > 0) {
      matchesFilters = matchesFilters && filters.brand.includes(product.brand.toLowerCase());
    }
    
    // Price filter
    if (filters.price) {
      const [minPrice, maxPrice] = filters.price;
      matchesFilters = matchesFilters && product.price >= minPrice && product.price <= maxPrice;
    }
    
    return matchesSearch && matchesFilters;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'popular':
        return b.reviewCount - a.reviewCount;
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const handleAddToComparison = (product: Product) => {
    const comparisonProduct = {
      id: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      image: product.image,
      specifications: {
        'Тип': 'Настенная сплит-система',
        'Мощность': '2.5 кВт',
        'Энергоэффективность': 'A++',
        'Уровень шума': '19 дБ'
      },
      rating: product.rating,
      features: ['Инверторное управление', 'Wi-Fi', 'Самоочистка'],
      category: product.category
    };
    addToComparison(comparisonProduct);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star 
          key={i} 
          className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-accent fill-accent' : 'text-gray-300'}`} 
        />
      );
    }
    return stars;
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <SEOHelmet
        title={`${getCategoryTitle(category || '')} - Каталог НОРДИНЖИНИРИНГ`}
        description={getCategoryDescription(category || '')}
        keywords={`${getCategoryTitle(category || '').toLowerCase()}, каталог, климатическое оборудование, купить, цена, Москва`}
        canonical={`https://nordengineering.ru/catalog/${category}`}
        structuredData={structuredData}
      />
      <Header />
      <main className="pb-12">
        <Breadcrumbs />
        
        {/* Hero Section */}
        <section className="bg-primary py-12">
          <div className="container mx-auto px-4">
            <h1 className="font-heading font-bold text-h1-mobile md:text-h1-desktop text-white text-center mb-6">
              {categoryData.name}
            </h1>
            <p className="text-white/90 text-center max-w-2xl mx-auto">
              {categoryData.description}
            </p>
          </div>
        </section>

        {/* Filters and Search */}
        <section className="py-8 bg-lightBg dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">
              <div className="flex flex-col md:flex-row gap-4 flex-1">
                <div className="relative w-full md:w-96">
                  <input
                    type="text"
                    placeholder="Поиск товаров..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full py-3 px-4 pr-12 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="popular">По популярности</option>
                  <option value="price-asc">По цене (возрастание)</option>
                  <option value="price-desc">По цене (убывание)</option>
                  <option value="rating">По рейтингу</option>
                </select>
              </div>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setIsFiltersOpen(true)}
                  className="flex items-center px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <Filter className="h-5 w-5 mr-2" />
                  Фильтры
                  {Object.keys(filters).length > 0 && (
                    <span className="ml-2 bg-primary text-white text-xs px-2 py-1 rounded-full">
                      {Object.keys(filters).length}
                    </span>
                  )}
                </button>
                <div className="flex border border-gray-300 dark:border-gray-700 rounded-md overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-3 ${viewMode === 'grid' ? 'bg-primary text-white' : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300'}`}
                  >
                    <Grid className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-3 ${viewMode === 'list' ? 'bg-primary text-white' : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300'}`}
                  >
                    <List className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Subcategories */}
        {categoryData.subcategories && categoryData.subcategories.length > 0 && (
          <section className="py-8 bg-gray-50 dark:bg-gray-800">
            <div className="container mx-auto px-4">
              <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-primary dark:text-white mb-6">
                Подкатегории
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryData.subcategories.map((subcat) => (
                  <Link
                    key={subcat.id}
                    to={`/catalog/${category}/${getCategorySlug(subcat.title)}`}
                    className="group bg-white dark:bg-gray-900 rounded-lg shadow-card overflow-hidden hover:shadow-card-hover transition-all duration-300"
                  >
                    <div className="p-6">
                      <h3 className="font-heading font-semibold text-primary dark:text-white mb-2">
                        {subcat.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                        {getCategoryDescription(subcat.title)}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {subcat.productCount} товаров
                        </span>
                        <ArrowRight className="h-4 w-4 text-secondary group-hover:text-primary transition-colors" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Products Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div>
              <p className="text-gray-600 dark:text-gray-400 mb-0">
                Найдено товаров: {sortedProducts.length}
              </p>
            </div>
            
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1'
            }`}>
              {sortedProducts.map((product) => (
                <div
                  key={product.id}
                  className={`bg-white dark:bg-gray-800 rounded-lg shadow-card overflow-hidden group transition-all duration-300 hover:shadow-card-hover ${
                    viewMode === 'list' ? 'flex' : ''
                  }`}
                >
                  {/* Product badges */}
                  <div className="absolute">
                    {product.isNew && (
                      <span className="absolute top-2 left-2 bg-secondary text-white text-xs font-semibold px-2 py-1 rounded z-10">
                        Новинка
                      </span>
                    )}
                    {product.isSale && (
                      <span className="absolute top-2 left-2 bg-accent text-white text-xs font-semibold px-2 py-1 rounded z-10">
                        Скидка
                      </span>
                    )}
                  </div>

                  {/* Product image */}
                  <section>
                    <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-1/4' : 'aspect-w-16 aspect-h-9'}`}>
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className={`object-cover transition-transform duration-300 group-hover:scale-105 ${
                          viewMode === 'list' ? 'w-full h-full' : 'w-full h-48'
                        }`}
                      />
                      <div className="absolute top-2 right-2 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
                          <Heart className="h-4 w-4 text-gray-600" />
                        </button>
                        <button 
                          onClick={() => handleAddToComparison(product)}
                          className={`p-2 rounded-full shadow-md transition-colors ${
                            isInComparison(product.id) 
                              ? 'bg-secondary text-white' 
                              : 'bg-white hover:bg-gray-100 text-gray-600'
                          }`}
                          title={isInComparison(product.id) ? 'В сравнении' : 'Добавить к сравнению'}
                        >
                          <BarChart2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    {/* Product info */}
                    <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-500 dark:text-gray-400">{product.brand}</span>
                        <div className="flex items-center">
                          {renderStars(product.rating)}
                          <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                            ({product.reviewCount})
                          </span>
                        </div>
                      </div>
                      
                      <Link 
                        to={`/catalog/${category}/${product.id}`}
                        className="block hover:text-primary dark:hover:text-white transition-colors"
                      >
                        <h3 className="font-heading font-semibold text-primary dark:text-white mb-2 line-clamp-2">
                          {product.name}
                        </h3>
                      </Link>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                        {product.description}
                      </p>
                    </div>
                  </section>

                  <div className="flex items-center justify-between p-4 pt-0">
                    <div>
                      <span className="text-lg font-bold text-primary dark:text-white">
                        {product.price.toLocaleString()} ₽
                      </span>
                      {product.oldPrice && (
                        <span className="text-sm text-gray-500 line-through ml-2">
                          {product.oldPrice.toLocaleString()} ₽
                        </span>
                      )}
                    </div>
                    <Link
                      to={`/catalog/${category}/${product.id}`}
                      className="bg-primary hover:bg-opacity-90 text-white font-semibold py-2 px-4 rounded-md transition-colors text-sm"
                    >
                      Подробнее
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Recommendations */}
        <ProductRecommendations 
          category={category}
          userBehavior={{
            viewedProducts: [],
            searchQueries: [searchQuery],
            priceRange: [0, 200000]
          }}
        />
      </main>
      
      <ProductFilters
        isOpen={isFiltersOpen}
        onClose={() => setIsFiltersOpen(false)}
        onFiltersChange={setFilters}
        category={category}
      />
      
      <Footer />
    </div>
  );
};

export default CategoryPage;