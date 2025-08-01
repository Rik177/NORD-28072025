import React, { useState, useMemo } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import SEOHelmet from '../../components/shared/SEOHelmet';
import Header from '../../components/home/Header';
import Footer from '../../components/home/Footer';
import Breadcrumbs from '../../components/shared/Breadcrumbs';
import ProductFilters from '../../components/catalog/ProductFilters';
import EnhancedProductCard from '../../components/catalog/EnhancedProductCard';
import ProductQuickView from '../../components/catalog/ProductQuickView';
import { Search, Filter, Grid, List, SlidersHorizontal, TrendingUp, Award, Zap, Shield } from 'lucide-react';
import { enhancedProductDatabase, getProductsByCategory, EnhancedProduct } from '../../data/enhancedProductData';

const categoryInfo = {
  'air-conditioning': {
    name: 'Кондиционеры и системы кондиционирования',
    description: 'Широкий выбор кондиционеров: настенные, кассетные, канальные, VRF системы. Профессиональный подбор и установка климатического оборудования от ведущих мировых производителей.',
    heroImage: 'https://images.pexels.com/photos/4270511/pexels-photo-4270511.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=2',
    benefits: [
      'Энергоэффективность класса A++ и выше',
      'Инверторные технологии для экономии',
      'Тихая работа от 19 дБ',
      'Умное управление и Wi-Fi'
    ]
  },
  'ventilation': {
    name: 'Вентиляционное оборудование',
    description: 'Профессиональные решения для вентиляции: приточно-вытяжные установки, канальные и осевые вентиляторы, воздуховоды и комплектующие от ведущих производителей.',
    heroImage: 'https://images.pexels.com/photos/8486972/pexels-photo-8486972.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=2',
    benefits: [
      'Высокая производительность',
      'Низкое энергопотребление',
      'Долгий срок службы',
      'Простое обслуживание'
    ]
  },
  'heating': {
    name: 'Отопительное оборудование',
    description: 'Современные решения для отопления: конвекторы, инфракрасные обогреватели, тепловые насосы. Энергоэффективные технологии для комфортного обогрева.',
    heroImage: 'https://images.pexels.com/photos/5490235/pexels-photo-5490235.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=2',
    benefits: [
      'Быстрый нагрев помещения',
      'Экономичное потребление',
      'Безопасная эксплуатация',
      'Автоматическое управление'
    ]
  },
  'curtains': {
    name: 'Тепловые завесы',
    description: 'Эффективная защита от холода: электрические и водяные тепловые завесы различной мощности. Надежная защита проемов от потерь тепла.',
    heroImage: 'https://images.pexels.com/photos/7109803/pexels-photo-7109803.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=2',
    benefits: [
      'Защита от потерь тепла',
      'Комфорт у входа',
      'Экономия энергии',
      'Простая установка'
    ]
  },
  'accessories': {
    name: 'Аксессуары и комплектующие',
    description: 'Полный спектр комплектующих для климатических систем: фильтры, решетки, диффузоры, автоматика управления и другие компоненты.',
    heroImage: 'https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=2',
    benefits: [
      'Совместимость с оборудованием',
      'Высокое качество материалов',
      'Простая установка',
      'Долгий срок службы'
    ]
  }
};

const EnhancedCategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [quickViewProduct, setQuickViewProduct] = useState<EnhancedProduct | null>(null);

  const categoryData = category ? categoryInfo[category as keyof typeof categoryInfo] : null;
  const products = category ? getProductsByCategory(category) : [];

  if (!categoryData) {
    return <Navigate to="/catalog" replace />;
  }

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.brand.toLowerCase().includes(searchQuery.toLowerCase());
      
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
      
      // Availability filter
      if (filters.availability && filters.availability.length > 0) {
        matchesFilters = matchesFilters && filters.availability.includes(product.availability);
      }
      
      // Energy class filter
      if (filters.energyClass && filters.energyClass.length > 0) {
        matchesFilters = matchesFilters && product.energyClass && filters.energyClass.includes(product.energyClass);
      }
      
      return matchesSearch && matchesFilters;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'newest':
          return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        case 'popular':
        default:
          return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0) || b.rating - a.rating;
      }
    });

    return filtered;
  }, [products, searchQuery, filters, sortBy]);

  const handleQuickView = (product: EnhancedProduct) => {
    setQuickViewProduct(product);
  };

  const handleAddToCart = (product: EnhancedProduct) => {
    console.log('Add to cart:', product);
    // Implement cart functionality
  };

  const getActiveFiltersCount = () => {
    return Object.keys(filters).length;
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": categoryData.name,
    "description": categoryData.description,
    "url": `https://nordengineering.ru/catalog/${category}`,
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": filteredAndSortedProducts.length,
      "itemListElement": filteredAndSortedProducts.slice(0, 10).map((product, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Product",
          "name": product.name,
          "description": product.shortDescription,
          "brand": product.brand,
          "offers": {
            "@type": "Offer",
            "price": product.price,
            "priceCurrency": "RUB",
            "availability": product.availability === 'В наличии' ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": product.rating,
            "reviewCount": product.reviewCount
          }
        }
      }))
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <SEOHelmet
        title={`${categoryData.name} - Каталог НОРДИНЖИНИРИНГ`}
        description={categoryData.description}
        keywords={`${categoryData.name.toLowerCase()}, каталог, климатическое оборудование, купить, цена, Москва`}
        canonical={`https://nordengineering.ru/catalog/${category}`}
        structuredData={structuredData}
      />
      <Header />
      <main className="pb-12">
        <Breadcrumbs />
        
        {/* Hero Section */}
        <section className="relative py-16 overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${categoryData.heroImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
          
          <div className="relative container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="font-heading font-bold text-h1-mobile md:text-h1-desktop text-white mb-6">
                {categoryData.name}
              </h1>
              <p className="text-white/90 text-lg mb-8 leading-relaxed">
                {categoryData.description}
              </p>
              
              {/* Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categoryData.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center text-white/90">
                    <div className="bg-accent rounded-full p-1 mr-3">
                      <Award className="h-4 w-4 text-white" />
                    </div>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Filters and Search */}
        <section className="py-8 bg-lightBg dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
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
                  <option value="newest">Новинки</option>
                  <option value="name">По названию</option>
                </select>
              </div>
              
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setIsFiltersOpen(true)}
                  className="flex items-center px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <SlidersHorizontal className="h-5 w-5 mr-2" />
                  Фильтры
                  {getActiveFiltersCount() > 0 && (
                    <span className="ml-2 bg-primary text-white text-xs px-2 py-1 rounded-full">
                      {getActiveFiltersCount()}
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

        {/* Results Summary */}
        <section className="py-6">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <p className="text-gray-600 dark:text-gray-400">
                Найдено товаров: <span className="font-semibold">{filteredAndSortedProducts.length}</span>
              </p>
              
              {/* Quick Stats */}
              <div className="hidden md:flex items-center space-x-6 text-sm">
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <TrendingUp className="h-4 w-4 mr-1 text-green-600" />
                  <span>{products.filter(p => p.isPopular).length} популярных</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <Zap className="h-4 w-4 mr-1 text-blue-600" />
                  <span>{products.filter(p => p.isNew).length} новинок</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <Award className="h-4 w-4 mr-1 text-purple-600" />
                  <span>{products.filter(p => p.isBestseller).length} хитов продаж</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="pb-12">
          <div className="container mx-auto px-4">
            {filteredAndSortedProducts.length === 0 ? (
              <div className="text-center py-16">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                  <Search className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="font-heading font-bold text-h3-desktop text-primary dark:text-white mb-4">
                  Товары не найдены
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                  По вашему запросу ничего не найдено. Попробуйте изменить параметры поиска или фильтры.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setFilters({});
                  }}
                  className="bg-primary hover:bg-opacity-90 text-white font-semibold py-3 px-6 rounded-md transition-colors"
                >
                  Сбросить фильтры
                </button>
              </div>
            ) : (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                  : 'grid-cols-1'
              }`}>
                {filteredAndSortedProducts.map((product) => (
                  <EnhancedProductCard
                    key={product.id}
                    product={product}
                    viewMode={viewMode}
                    onQuickView={handleQuickView}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Category Benefits */}
        <section className="py-12 bg-lightBg dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-primary dark:text-white text-center mb-8">
                Преимущества {categoryData.name.toLowerCase()}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {categoryData.benefits.map((benefit, index) => (
                  <div key={index} className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm">
                    <div className="flex items-start">
                      <div className="bg-primary/10 rounded-lg p-3 mr-4">
                        {index % 4 === 0 && <Award className="h-6 w-6 text-primary" />}
                        {index % 4 === 1 && <Zap className="h-6 w-6 text-primary" />}
                        {index % 4 === 2 && <TrendingUp className="h-6 w-6 text-primary" />}
                        {index % 4 === 3 && <Shield className="h-6 w-6 text-primary" />}
                      </div>
                      <div>
                        <h3 className="font-heading font-semibold text-primary dark:text-white mb-2">
                          {benefit}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          {index % 4 === 0 && 'Высокое качество и надежность оборудования от ведущих производителей.'}
                          {index % 4 === 1 && 'Современные технологии для максимальной эффективности и экономии.'}
                          {index % 4 === 2 && 'Оптимальное соотношение цены и качества для любого бюджета.'}
                          {index % 4 === 3 && 'Профессиональная установка и обслуживание с гарантией.'}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Filters Modal */}
      <ProductFilters
        isOpen={isFiltersOpen}
        onClose={() => setIsFiltersOpen(false)}
        onFiltersChange={setFilters}
        category={category}
      />
      
      {/* Quick View Modal */}
      {quickViewProduct && (
        <ProductQuickView
          product={quickViewProduct}
          isOpen={!!quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}
      
      <Footer />
    </div>
  );
};

export default EnhancedCategoryPage;