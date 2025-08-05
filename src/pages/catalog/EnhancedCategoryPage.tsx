import React, { useState, useMemo } from 'react';
import { useLocation, Navigate, Link, useParams } from 'react-router-dom';
import SEOHelmet from '../../components/shared/SEOHelmet';
import Header from '../../components/home/Header';
import Footer from '../../components/home/Footer';
import Breadcrumbs from '../../components/shared/Breadcrumbs';
import { Search, Filter, Grid, List, SlidersHorizontal, TrendingUp, Award, Zap, Shield, Heart } from 'lucide-react';
import { getProductsByCategory, getCategoryByPath, getAllProducts, categories, Product } from './Categories';

const EnhancedCategoryPage: React.FC = () => {
  console.log('EnhancedCategoryPage: Component mounted');
  console.log('EnhancedCategoryPage: Window location:', window.location.href);
  const location = useLocation();
  const params = useParams();
  
  // Извлекаем путь из параметров
  const { category, subcategory, subsubcategory } = params;
  const categoryPath = [category, subcategory, subsubcategory].filter(Boolean).join('/');
  
  console.log('EnhancedCategoryPage: Initial categoryPath:', categoryPath);
  console.log('EnhancedCategoryPage: Params:', params);
  console.log('EnhancedCategoryPage: Category:', category);
  console.log('EnhancedCategoryPage: Subcategory:', subcategory);
  console.log('EnhancedCategoryPage: Subsubcategory:', subsubcategory);
  console.log('EnhancedCategoryPage: Full pathname:', location.pathname);
  console.log('EnhancedCategoryPage: Window location:', window.location.href);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<Record<string, any>>({});

  // Находим данные категории
  const categoryData = categoryPath ? getCategoryByPath(categoryPath) : null;
  
  // Отладочная информация
  console.log('EnhancedCategoryPage: CategoryPath:', categoryPath);
  console.log('EnhancedCategoryPage: Location pathname:', location.pathname);
  console.log('EnhancedCategoryPage: CategoryData:', categoryData);
  
  // Проверяем функцию getCategoryByPath
  if (categoryPath) {
    console.log('EnhancedCategoryPage: Testing getCategoryByPath for:', categoryPath);
    const testResult = getCategoryByPath(categoryPath);
    console.log('EnhancedCategoryPage: getCategoryByPath result:', testResult);
    
    // Проверяем все возможные пути
    console.log('EnhancedCategoryPage: All possible paths:');
    function logAllPaths(cats: any[], level = 0) {
      cats.forEach(cat => {
        console.log('  '.repeat(level) + `- ${cat.path}`);
        if (cat.subcategories) {
          logAllPaths(cat.subcategories, level + 1);
        }
      });
    }
    logAllPaths(categories);
  }
  
  // Получаем товары для текущей категории и всех её подкатегорий
  const getProductsForCategory = (categoryPath: string): Product[] => {
    const allProducts = getAllProducts();
    console.log('EnhancedCategoryPage: Getting products for categoryPath:', categoryPath);
    console.log('EnhancedCategoryPage: Total products available:', allProducts.length);
    
    // Показываем первые несколько продуктов для отладки
    console.log('EnhancedCategoryPage: Sample products:');
    allProducts.slice(0, 5).forEach((product, index) => {
      console.log(`  ${index + 1}. ${product.name} - category: "${product.category}"`);
    });
    
    const categoryProducts = allProducts.filter((product: Product) => {
      // Проверяем точное совпадение категории
      const exactMatch = product.category === categoryPath;
      // Проверяем, начинается ли категория товара с искомого пути
      const startsWithMatch = product.category.startsWith(categoryPath + '/');
      // Проверяем, является ли категория товара подкатегорией
      const isSubcategory = product.category.includes(categoryPath + '/');
      
      const matches = exactMatch || startsWithMatch || isSubcategory;
      
      if (matches) {
        console.log('EnhancedCategoryPage: Found product:', product.name, 'with category:', product.category);
      }
      
      return matches;
    });
    
    console.log('EnhancedCategoryPage: Found', categoryProducts.length, 'products for category:', categoryPath);
    
    // Если продуктов не найдено, показываем все категории продуктов
    if (categoryProducts.length === 0) {
      console.log('EnhancedCategoryPage: No products found. All product categories:');
      const allCategories = [...new Set(allProducts.map(p => p.category))].sort();
      allCategories.forEach(cat => {
        console.log(`  - "${cat}"`);
      });
    }
    
    return categoryProducts;
  };
  
  const products = categoryPath ? getProductsForCategory(categoryPath) : [];
  console.log('EnhancedCategoryPage: Products for category:', products.length);
  console.log('EnhancedCategoryPage: First few products:', products.slice(0, 3).map(p => ({ name: p.name, category: p.category })));

  // Создаем динамическую информацию о категории
  const categoryInfo = {
    name: categoryData?.name || 'Категория',
    description: `Каталог ${categoryData?.name?.toLowerCase() || 'товаров'} с полным ассортиментом товаров`,
    heroImage: 'https://via.placeholder.com/1200x400?text=Категория',
    benefits: [
      'Высокое качество продукции',
      'Профессиональная установка',
      'Гарантийное обслуживание',
      'Техническая поддержка'
    ]
  };

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
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

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.brand && filters.brand.length > 0) count++;
    if (filters.price) count++;
    if (filters.availability && filters.availability.length > 0) count++;
    return count;
  };

  const getBrands = () => {
    const brands = new Set(products.map(p => p.brand));
    return Array.from(brands).sort();
  };

  const getPriceRange = () => {
    const prices = products.map(p => p.price).filter(p => p > 0);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices)
    };
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": categoryInfo.name,
    "description": categoryInfo.description,
    "url": `https://nordengineering.ru/catalog/${categoryPath}`,
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": filteredAndSortedProducts.length,
      "itemListElement": filteredAndSortedProducts.map((product, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Product",
          "name": product.name,
          "description": product.name,
          "offers": {
            "@type": "Offer",
            "price": product.price,
            "priceCurrency": "RUB"
          }
        }
      }))
    }
  };

  // Проверяем, что путь категории существует, если нет - показываем продукты без категории
  if (!categoryPath) {
    return <Navigate to="/catalog" replace />;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <SEOHelmet
        title={`${categoryInfo.name} - Каталог оборудования`}
        description={categoryInfo.description}
        structuredData={structuredData}
      />
      <Header />
      <main className="pb-12">
        <Breadcrumbs />

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-secondary py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h1 className="font-heading font-bold text-h1-mobile md:text-h1-desktop text-white mb-6">
                  {categoryInfo.name}
                </h1>
                <p className="text-white/90 text-lg mb-8">
                  {categoryInfo.description}
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {categoryInfo.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center text-white/90">
                      <Shield className="h-5 w-5 mr-2 text-white" />
                      <span className="text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="hidden lg:block">
                <img
                  src={categoryInfo.heroImage}
                  alt={categoryInfo.name}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="py-8 border-b border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
              {/* Search */}
              <div className="relative w-full lg:w-1/3">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Поиск по товарам..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary focus:border-transparent"
                />
              </div>

              {/* Filters and View Mode */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <Filter className="h-5 w-5" />
                  Фильтры
                  {getActiveFiltersCount() > 0 && (
                    <span className="bg-secondary text-white text-xs px-2 py-1 rounded-full">
                      {getActiveFiltersCount()}
                    </span>
                  )}
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded ${viewMode === "grid" ? "bg-secondary text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"}`}
                  >
                    <Grid className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded ${viewMode === "list" ? "bg-secondary text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"}`}
                  >
                    <List className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Filters Panel */}
            {isFiltersOpen && (
              <div className="mt-6 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Brand Filter */}
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Бренд</h3>
                    <div className="space-y-2">
                      {getBrands().map(brand => (
                        <label key={brand} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={filters.brand?.includes(brand.toLowerCase()) || false}
                            onChange={(e) => {
                              const currentBrands = filters.brand || [];
                              const newBrands = e.target.checked
                                ? [...currentBrands, brand.toLowerCase()]
                                : currentBrands.filter((b: string) => b !== brand.toLowerCase());
                              setFilters({ ...filters, brand: newBrands });
                            }}
                            className="rounded border-gray-300 text-secondary focus:ring-secondary"
                          />
                          <span className="ml-2 text-gray-700 dark:text-gray-300">{brand}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Price Filter */}
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Цена</h3>
                    <div className="space-y-2">
                      <input
                        type="number"
                        placeholder="От"
                        value={filters.price?.[0] || ''}
                        onChange={(e) => {
                          const currentPrice = filters.price || [0, 0];
                          setFilters({ ...filters, price: [Number(e.target.value), currentPrice[1]] });
                        }}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                      <input
                        type="number"
                        placeholder="До"
                        value={filters.price?.[1] || ''}
                        onChange={(e) => {
                          const currentPrice = filters.price || [0, 0];
                          setFilters({ ...filters, price: [currentPrice[0], Number(e.target.value)] });
                        }}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>

                  {/* Sort */}
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Сортировка</h3>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    >
                      <option value="popular">По популярности</option>
                      <option value="price-asc">По цене (возрастание)</option>
                      <option value="price-desc">По цене (убывание)</option>
                      <option value="name">По названию</option>
                      <option value="rating">По рейтингу</option>
                      <option value="newest">По новизне</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Subcategories */}
        {categoryData?.subcategories && categoryData.subcategories.length > 0 && (
          <section className="py-8 border-b border-gray-200 dark:border-gray-700">
            <div className="container mx-auto px-4">
              <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-primary dark:text-white mb-6">
                Подкатегории
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryData.subcategories.map((subcat) => {
                  console.log('EnhancedCategoryPage: Subcategory link:', { name: subcat.name, path: subcat.path, fullUrl: `/catalog/${subcat.path}` });
                  return (
                    <Link
                      key={subcat.id}
                      to={`/catalog/${subcat.path}`}
                      className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-card hover:shadow-card-hover transition-all duration-300"
                      onClick={() => {
                        console.log('EnhancedCategoryPage: Clicked on subcategory:', subcat.name);
                        console.log('EnhancedCategoryPage: Navigating to:', `/catalog/${subcat.path}`);
                      }}
                    >
                      <h3 className="font-semibold text-lg text-primary dark:text-white mb-2">
                        {subcat.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {subcat.subcategories?.length || 0} подкатегорий
                      </p>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Products Grid - показываем товары всегда */}
        {filteredAndSortedProducts.length > 0 && (
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="flex justify-between items-center mb-8">
                <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-primary dark:text-white">
                  {categoryData?.subcategories && categoryData.subcategories.length > 0 
                    ? `Товары в категории "${categoryData.name}" (${filteredAndSortedProducts.length})`
                    : `Найдено товаров: ${filteredAndSortedProducts.length}`
                  }
                </h2>
              </div>

            {filteredAndSortedProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  {categoryData?.subcategories && categoryData.subcategories.length > 0 
                    ? `В данной категории пока нет товаров. Перейдите в подкатегории для просмотра товаров.`
                    : `По вашему запросу ничего не найдено. Попробуйте изменить параметры поиска.`
                  }
                </p>
              </div>
            ) : (
              <div
                className={`grid gap-6 ${
                  viewMode === "grid"
                    ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                    : "grid-cols-1"
                }`}
              >
                {filteredAndSortedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-card overflow-hidden hover:shadow-card-hover transition-all duration-300"
                  >
                    <div className="relative">
                      <img
                        src={product.image || 'https://via.placeholder.com/300x200?text=Нет+изображения'}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                      />
                      {product.isNew && (
                        <span className="absolute top-2 left-2 bg-secondary text-white text-xs font-semibold px-2 py-1 rounded">
                          Новинка
                        </span>
                      )}
                      {product.isSale && (
                        <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                          Скидка
                        </span>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="font-semibold text-lg text-primary dark:text-white mb-2">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                        {product.brand}
                      </p>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }, (_, i) => (
                            <span
                              key={i}
                              className={`text-sm ${i < product.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                            >
                              ★
                            </span>
                          ))}
                          <span className="text-sm text-gray-500 ml-1">
                            ({product.reviewCount})
                          </span>
                        </div>
                        <span className="text-lg font-bold text-primary dark:text-white">
                          {product.price.toLocaleString()} ₽
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Link 
                          to={`/catalog/${categoryPath}/${product.id}`}
                          className="flex-1 bg-secondary text-white py-2 px-4 rounded-lg hover:bg-secondary-dark transition-colors text-center"
                        >
                          Подробнее
                        </Link>
                        <button className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                          <Heart className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default EnhancedCategoryPage;