import React, { useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import SEOHelmet from '../../components/shared/SEOHelmet';
import Header from '../../components/home/Header';
import Footer from '../../components/home/Footer';
import Breadcrumbs from '../../components/shared/Breadcrumbs';
import ProductFilters from '../../components/catalog/ProductFilters';
import ProductRecommendations from '../../components/catalog/ProductRecommendations';
import { Search, Filter, Grid, List, Star, Heart, BarChart2 } from 'lucide-react';
import { useComparison } from '../../hooks/useComparison';

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

const products: Product[] = [
  {
    id: 'daikin-ftxb25c',
    name: 'Кондиционер Daikin FTXB25C',
    description: 'Настенная сплит-система с инверторным управлением, класс энергоэффективности A++',
    price: 38900,
    oldPrice: 42500,
    image: 'https://images.pexels.com/photos/4270511/pexels-photo-4270511.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.8,
    reviewCount: 24,
    isSale: true,
    brand: 'Daikin',
    category: 'air-conditioning'
  },
  {
    id: 'mitsubishi-msz-ln25vg',
    name: 'Кондиционер Mitsubishi MSZ-LN25VG',
    description: 'Премиальная настенная сплит-система с Wi-Fi управлением',
    price: 45600,
    image: 'https://images.pexels.com/photos/4489794/pexels-photo-4489794.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.9,
    reviewCount: 18,
    isNew: true,
    brand: 'Mitsubishi',
    category: 'air-conditioning'
  },
  {
    id: 'carrier-42qhc012ds',
    name: 'Кондиционер Carrier 42QHC012DS',
    description: 'Кассетная сплит-система для коммерческих помещений',
    price: 67800,
    image: 'https://images.pexels.com/photos/7191981/pexels-photo-7191981.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.7,
    reviewCount: 12,
    brand: 'Carrier',
    category: 'air-conditioning'
  },
  {
    id: 'rk-125',
    name: 'Канальный вентилятор RK 125',
    description: 'Мощный канальный вентилятор для вытяжной вентиляции',
    price: 4590,
    image: 'https://images.pexels.com/photos/8486972/pexels-photo-8486972.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.6,
    reviewCount: 35,
    brand: 'Вентс',
    category: 'ventilation'
  },
  {
    id: 'pvu-350',
    name: 'Приточная установка ПВУ-350',
    description: 'Компактная приточная установка с функцией подогрева',
    price: 67900,
    image: 'https://images.pexels.com/photos/6444/pencil-typography-black-design.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.5,
    reviewCount: 8,
    brand: 'Вентмашина',
    category: 'ventilation'
  },
  {
    id: 'kev-6p',
    name: 'Тепловая завеса Тепломаш КЭВ-6П',
    description: 'Тепловая завеса для проемов до 2.2 метров',
    price: 15600,
    image: 'https://images.pexels.com/photos/7109803/pexels-photo-7109803.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.4,
    reviewCount: 16,
    brand: 'Тепломаш',
    category: 'curtains'
  }
];

const categoryInfo = {
  'air-conditioning': {
    name: 'Кондиционеры',
    description: 'Настенные, кассетные, канальные кондиционеры и мульти-сплит системы'
  },
  'ventilation': {
    name: 'Вентиляционное оборудование',
    description: 'Канальные и осевые вентиляторы, приточно-вытяжные установки'
  },
  'heating': {
    name: 'Отопительное оборудование',
    description: 'Котлы, радиаторы, теплые полы, насосы и автоматика'
  },
  'curtains': {
    name: 'Тепловые завесы',
    description: 'Электрические и водяные тепловые завесы для входных групп'
  },
  'accessories': {
    name: 'Аксессуары и комплектующие',
    description: 'Решетки, диффузоры, клапаны, фильтры и другие комплектующие'
  }
};

const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<Record<string, any>>({});
  
  const { addToComparison, isInComparison } = useComparison();

  // Get category data based on the category parameter
  const getCategoryData = (cat: string) => {
    const info = categoryInfo[cat as keyof typeof categoryInfo];
    if (!info) return null;
    
    const categoryProducts = products.filter(product => product.category === cat);
    return {
      name: info.name,
      description: info.description,
      products: categoryProducts
    };
  };

  const categoryData = getCategoryData(category || '');
  
  if (!categoryData) {
    return <Navigate to="/catalog\" replace />;
  }

  const getCategoryTitle = (cat: string) => {
    const titles: Record<string, string> = {
      'ventilation': 'Вентиляционное оборудование',
      'air-conditioning': 'Кондиционеры и системы кондиционирования',
      'heating': 'Отопительное оборудование',
      'curtains': 'Тепловые завесы',
      'accessories': 'Аксессуары и комплектующие'
    };
    return titles[cat] || 'Каталог оборудования';
  };

  const getCategoryDescription = (cat: string) => {
    const descriptions: Record<string, string> = {
      'ventilation': 'Широкий выбор вентиляционного оборудования: приточно-вытяжные установки, канальные и осевые вентиляторы, воздуховоды и комплектующие от ведущих производителей.',
      'air-conditioning': 'Кондиционеры всех типов: настенные, кассетные, канальные, VRF системы. Профессиональный подбор и установка климатического оборудования.',
      'heating': 'Отопительное оборудование для любых задач: конвекторы, инфракрасные обогреватели, тепловые насосы. Энергоэффективные решения для обогрева.',
      'curtains': 'Тепловые завесы для защиты от холода: электрические и водяные модели различной мощности. Эффективная защита проемов от потерь тепла.',
      'accessories': 'Комплектующие и аксессуары для климатических систем: фильтры, решетки, диффузоры, автоматика управления и другие компоненты.'
    };
    return descriptions[cat] || 'Качественное оборудование для климатических систем';
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