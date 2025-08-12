import React, { useState, useMemo, useEffect } from 'react';
import { useLocation, Navigate, Link } from 'react-router-dom';
import SEOHelmet from '../../components/shared/SEOHelmet';
import Header from '../../components/home/Header';
import Footer from '../../components/home/Footer';
import Breadcrumbs from '../../components/shared/Breadcrumbs';
import { Search, Filter, Grid, List, Shield, Heart } from 'lucide-react';
import { getCategoryByPath, getAllProducts, Product } from './Categories';
import { getAllProducts as getAllProductsFromMircli, EnhancedProduct as MircliEnhancedProduct } from '../../data/mircliProductData';

const EnhancedCategoryPage: React.FC = () => {
  // Debug logs removed for production
  const location = useLocation();
  
  // Поддержка произвольной глубины: извлекаем путь категории из URL после /catalog
  const pathAfterCatalog = location.pathname.replace(/^\/?catalog\/?/, '');
  // Если вдруг в пути встретится product, обрезаем после него (на всякий случай)
  const categoryPath = pathAfterCatalog.split('/product')[0].replace(/\/$/, '');
  
  
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<Record<string, any>>({});

  // Находим данные категории
  const categoryData = categoryPath ? getCategoryByPath(categoryPath) : null;
  
  // Отладочная информация
  
  
  // Проверяем функцию getCategoryByPath
  // Removed verbose debug tracing
  
  // Адаптация товара из mircliProductData к типу Product (каталога)
  const mapMircliToCatalogProduct = (p: MircliEnhancedProduct): Product => {
    // Формируем полное название товара как в анемостатах: Бренд + Модель
    const fullName = p.brand && p.model ? `${p.brand} ${p.model}` : p.name;
    
    return {
      id: p.id,
      name: fullName,
      brand: p.brand,
      model: p.model,
      category: p.category,
      price: p.price,
      currency: p.currency,
      availability: p.availability,
      image: p.images?.[0]?.url || '',
      specifications: {},
      url: '',
      rating: p.rating || 0,
      reviewCount: p.reviewCount || 0,
      isNew: Boolean(p.isNew),
      isSale: Boolean(p.isSale),
      isPopular: Boolean(p.isPopular),
      isBestseller: Boolean(p.isBestseller)
    };
  };

  const mergeById = (primary: Product[], secondary: Product[]): Product[] => {
    const map = new Map<string, Product>();
    primary.forEach(p => map.set(p.id, p));
    secondary.forEach(p => {
      if (!map.has(p.id)) map.set(p.id, p);
    });
    return Array.from(map.values());
  };

  // Получаем товары для текущей категории и всех её подкатегорий
  const getProductsForCategory = (categoryPath: string): Product[] => {
    const baseProducts = getAllProducts();
    const mircliProductsMapped = getAllProductsFromMircli().map(mapMircliToCatalogProduct);
    const allProducts = mergeById(baseProducts, mircliProductsMapped);
    
    
    const categoryProducts = allProducts.filter((product: Product) => {
      const productCat = product.category;
      const exactMatch = productCat === categoryPath;
      // Потомки: товары лежат глубже текущей категории
      const descendantMatch = productCat.startsWith(categoryPath + '/');
      // Родители: товары лежат на уровне выше текущей категории (частый кейс в источнике)
      const ancestorMatch = categoryPath.startsWith(productCat + '/');

      const matches = exactMatch || descendantMatch || ancestorMatch;

      

      return matches;
    });
    
    
    
    return categoryProducts;
  };
  
  const products = categoryPath ? getProductsForCategory(categoryPath) : [];
  

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
                           product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           (product.model && product.model.toLowerCase().includes(searchQuery.toLowerCase()));
      
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
        case 'brand':
          return a.brand.localeCompare(b.brand);
        case 'newest':
          return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        case 'popular':
        default:
          return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0) || b.rating - a.rating;
      }
    });

    return filtered;
  }, [products, searchQuery, filters, sortBy]);

  // Pagination state
  const [pageSize, setPageSize] = useState<number>(20);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Reset to first page when filters, search, sort or page size change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, JSON.stringify(filters), sortBy, pageSize, categoryPath]);

  const totalItems = filteredAndSortedProducts.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedProducts = filteredAndSortedProducts.slice(startIndex, startIndex + pageSize);

  const goToPage = (page: number) => {
    const clamped = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(clamped);
    // Scroll to top of product grid for better UX
    try {
      const el = document.getElementById('category-products-top');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } catch {}
  };

  const renderPageNumbers = () => {
    const pages: (number | '…')[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      const add = (n: number) => pages.push(n);
      add(1);
      const left = Math.max(2, currentPage - 2);
      const right = Math.min(totalPages - 1, currentPage + 2);
      if (left > 2) pages.push('…');
      for (let i = left; i <= right; i++) add(i);
      if (right < totalPages - 1) pages.push('…');
      add(totalPages);
    }
    return (
      <div className="flex items-center gap-2">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded disabled:opacity-50"
        >
          Назад
        </button>
        {pages.map((p, idx) => (
          p === '…' ? (
            <span key={`ellipsis-${idx}`} className="px-2 text-gray-500">…</span>
          ) : (
            <button
              key={p}
              onClick={() => goToPage(p)}
              className={`px-3 py-2 rounded border ${p === currentPage ? 'bg-secondary text-white border-secondary' : 'border-gray-300 dark:border-gray-600'}`}
            >
              {p}
            </button>
          )
        ))}
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded disabled:opacity-50"
        >
          Вперёд
        </button>
      </div>
    );
  };

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
          "description": `${product.brand} ${product.model || ''}`.trim(),
          "brand": {
            "@type": "Brand",
            "name": product.brand
          },
          "model": product.model,
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
          title={`${categoryInfo.name} - Каталог оборудования ${categoryData?.name || ''}`}
          description={`Каталог ${categoryData?.name?.toLowerCase() || 'товаров'} с полным ассортиментом. ${filteredAndSortedProducts.length > 0 ? `Найдено товаров: ${filteredAndSortedProducts.length}` : ''}`}
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
                  {categoryInfo.description} Все товары отображаются с полными названиями, включающими бренд и модель.
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
                  placeholder="Поиск по названию, бренду или модели..."
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
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      Выберите производителей для фильтрации товаров
                    </p>
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
                      <option value="brand">По бренду</option>
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryData.subcategories.map((subcat) => {
                  
                  return (
                    <Link
                      key={subcat.id}
                      to={`/catalog/${subcat.path}`}
                      className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-card hover:shadow-card-hover transition-all duration-300"
                      onClick={() => {
                        
                      }}
                    >
                      <h3 className="font-semibold text-lg text-primary dark:text-white mb-3">
                        {subcat.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                        {subcat.subcategories?.length || 0} подкатегорий
                      </p>
                      <p className="text-gray-500 dark:text-gray-500 text-xs">
                        Перейти к товарам
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
              <div id="category-products-top" className="flex justify-between items-center mb-8">
                <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-primary dark:text-white">
                  {categoryData?.subcategories && categoryData.subcategories.length > 0
                    ? `Товары в категории "${categoryData.name}" (${filteredAndSortedProducts.length})`
                    : `Каталог товаров: ${filteredAndSortedProducts.length} позиций`}
                </h2>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Показывать:</span>
                  {[20, 40, 60].map((size) => (
                    <button
                      key={size}
                      onClick={() => setPageSize(size)}
                      className={`px-3 py-1 rounded border ${pageSize === size ? 'bg-secondary text-white border-secondary' : 'border-gray-300 dark:border-gray-600'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

            {filteredAndSortedProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  {categoryData?.subcategories && categoryData.subcategories.length > 0
                    ? `В данной категории пока нет товаров. Перейдите в подкатегории для просмотра товаров.`
                    : `По вашему запросу ничего не найдено. Попробуйте изменить параметры поиска или просмотрите подкатегории.`}
                </p>
                <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">
                  Совет: используйте поиск по бренду или модели для более точных результатов
                </p>
              </div>
            ) : (
              <div
                className={`gap-6 ${
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                    : "flex flex-col"
                }`}
              >
                {paginatedProducts.map((product) => (
                  <div
                    key={product.id}
                    className={`bg-white dark:bg-gray-800 rounded-lg shadow-card overflow-hidden hover:shadow-card-hover transition-all duration-300 flex flex-col ${
                      viewMode === "list" ? "flex-row" : ""
                    }`}
                  >
                    <div className={`relative ${viewMode === "list" ? "w-1/3 flex-shrink-0" : ""}`}>
                      <img
                        src={product.image || 'https://via.placeholder.com/300x200?text=Нет+изображения'}
                        alt={product.name}
                        className={`${viewMode === "list" ? "h-full" : "w-full h-48"} object-cover`}
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
                    <div className={`p-6 flex flex-col flex-1 ${viewMode === "list" ? "justify-center" : ""}`}>
                      <h3 className="font-semibold text-lg text-primary dark:text-white mb-2">
                        {product.name}
                      </h3>
                      {product.model && product.model !== product.name && (
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                          Модель: {product.model}
                        </p>
                      )}
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
                      <div className="flex gap-2 mt-auto">
                        <Link 
                          to={`/catalog/${categoryPath}/product/${product.id}`}
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
            {/* Pagination controls */}
            {totalPages > 1 && (
              <div className="mt-10 flex items-center justify-between">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Показаны {startIndex + 1}-{Math.min(startIndex + pageSize, totalItems)} из {totalItems} товаров
                </div>
                {renderPageNumbers()}
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