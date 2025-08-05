import React, { useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import SEOHelmet from '../../components/shared/SEOHelmet';
import Header from '../../components/home/Header';
import Footer from '../../components/home/Footer';
import Breadcrumbs from '../../components/shared/Breadcrumbs';
import { Search, Filter, Grid, List, Star, Heart, BarChart2 } from 'lucide-react';
import { useComparison } from '../../hooks/useComparison';
import { getProductsByCategory, getCategoryByPath, getAllProducts, categories, Product } from './Categories';

const CategoryPage: React.FC = () => {
  const { categoryPath } = useParams<{ categoryPath: string }>();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<Record<string, any>>({});
  const { addToComparison, isInComparison } = useComparison();

  // Находим данные категории
  const categoryData = categoryPath ? getCategoryByPath(categoryPath) : null;
  
  // Получаем товары только для текущей категории (без подкатегорий)
  const getProductsForCategory = (categoryPath: string): Product[] => {
    const allProducts = getAllProducts();
    const categoryProducts = allProducts.filter((product: Product) => 
      product.category === categoryPath
    );
    
    return categoryProducts;
  };
  
  const products = categoryPath ? getProductsForCategory(categoryPath) : [];

  // Отладочная информация
  console.log('CategoryPage: CategoryPath:', categoryPath);
  console.log('CategoryPage: CategoryData:', categoryData);
  console.log('CategoryPage: Products found:', products.length);
  console.log('CategoryPage: First few products:', products.slice(0, 3));
  console.log('CategoryPage: All products count:', getAllProducts().length);
  console.log('CategoryPage: Sample product categories:', getAllProducts().slice(0, 5).map(p => p.category));
  console.log('CategoryPage: Subcategories:', categoryData?.subcategories?.map(sub => ({ name: sub.name, path: sub.path })));
  console.log('CategoryPage: URL pathname:', window.location.pathname);

  if (!categoryData) {
    return <Navigate to="/catalog" replace />;
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": categoryData.name,
    "description": `Каталог ${categoryData.name.toLowerCase()}`,
    "url": `https://nordengineering.ru/catalog/${categoryPath}`,
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": products.length,
      "itemListElement": products.map((product, index) => ({
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

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Apply filters
    let matchesFilters = true;
    
    // Brand filter
    if (filters.brand && filters.brand.length > 0) {
      matchesFilters = matchesFilters && filters.brand.includes(product.brand.toLowerCase());
    }
    
    // Price filter
    if (filters.minPrice && product.price < filters.minPrice) {
      matchesFilters = false;
    }
    if (filters.maxPrice && product.price > filters.maxPrice) {
      matchesFilters = false;
    }
    
    return matchesSearch && matchesFilters;
  });

  const handleAddToComparison = (product: Product) => {
    const comparisonProduct = {
      id: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      image: product.image,
      category: product.category,
      specifications: product.specifications,
      rating: product.rating,
      features: []
    };
    addToComparison(comparisonProduct);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
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

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <SEOHelmet
        title={`${categoryData.name} - Каталог оборудования`}
        description={`Каталог ${categoryData.name.toLowerCase()} с полным ассортиментом товаров`}
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
              Каталог {categoryData.name.toLowerCase()} с полным ассортиментом товаров от ведущих производителей
            </p>
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
                        value={filters.minPrice || ''}
                        onChange={(e) => setFilters({ ...filters, minPrice: Number(e.target.value) })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                      <input
                        type="number"
                        placeholder="До"
                        value={filters.maxPrice || ''}
                        onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
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
                {categoryData.subcategories.map((subcat) => (
                  <Link
                    key={subcat.id}
                    to={`/catalog/${subcat.path}`}
                    className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-card hover:shadow-card-hover transition-all duration-300"
                  >
                    <h3 className="font-semibold text-lg text-primary dark:text-white mb-2">
                      {subcat.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {subcat.subcategories?.length || 0} подкатегорий
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Products Grid - показываем только если нет подкатегорий */}
        {(!categoryData?.subcategories || categoryData.subcategories.length === 0) && (
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="flex justify-between items-center mb-8">
                <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-primary dark:text-white">
                  Найдено товаров: {filteredProducts.length}
                </h2>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-600 dark:text-gray-400 text-lg">
                    По вашему запросу ничего не найдено. Попробуйте изменить параметры поиска.
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
                {filteredProducts.map((product) => (
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
                      <button
                        onClick={() => handleAddToComparison(product)}
                        className={`absolute top-2 right-2 p-2 rounded-full ${
                          isInComparison(product.id)
                            ? 'bg-secondary text-white'
                            : 'bg-white/90 text-gray-600 hover:bg-secondary hover:text-white'
                        } transition-colors`}
                      >
                        <BarChart2 className="h-5 w-5" />
                      </button>
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
                          {renderStars(product.rating)}
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

export default CategoryPage;