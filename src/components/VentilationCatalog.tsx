import React, { useState, useEffect } from 'react';
import { ventilationData } from '../data/ventilationData';

interface Category {
  id: number;
  title: string;
  url: string;
  image: string | null;
  subcategories: Category[];
}

interface Product {
  id: number;
  title: string;
  url: string;
  image: string | null;
  price: string | null;
  sku: string | null;
  category: string;
  categoryId: number;
  description?: string;
  specifications?: Record<string, string>;
  images?: string[];
}

interface VentilationCatalogProps {
  className?: string;
}

const VentilationCatalog: React.FC<VentilationCatalogProps> = ({ className = '' }) => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (selectedSubcategory) {
      setLoading(true);
      const filteredProducts = ventilationData.products.filter(
        product => product.category === selectedSubcategory.title
      );
      setProducts(filteredProducts);
      setLoading(false);
    } else if (selectedCategory) {
      setLoading(true);
      const categoryProducts = ventilationData.products.filter(
        product => product.category === selectedCategory.title
      );
      setProducts(categoryProducts);
      setLoading(false);
    } else {
      setProducts([]);
    }
  }, [selectedCategory, selectedSubcategory]);

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderCategoryTree = (categories: Category[], level: number = 0) => {
    return (
      <div className={`space-y-2 ${level > 0 ? 'ml-4' : ''}`}>
        {categories.map((category) => (
          <div key={category.id} className="border-l-2 border-gray-200 pl-4">
            <button
              onClick={() => {
                if (level === 0) {
                  setSelectedCategory(category);
                  setSelectedSubcategory(null);
                } else {
                  setSelectedSubcategory(category);
                }
              }}
              className={`w-full text-left p-2 rounded hover:bg-gray-100 transition-colors ${
                (selectedCategory?.id === category.id && level === 0) ||
                (selectedSubcategory?.id === category.id && level > 0)
                  ? 'bg-blue-50 border-blue-200'
                  : ''
              }`}
            >
              <div className="flex items-center space-x-2">
                {category.image && (
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-8 h-8 object-cover rounded"
                  />
                )}
                <span className="font-medium">{category.title}</span>
              </div>
            </button>
            {category.subcategories && category.subcategories.length > 0 && (
              <div className="mt-2">
                {renderCategoryTree(category.subcategories, level + 1)}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderProductCard = (product: Product) => (
    <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-w-1 aspect-h-1 w-full">
        {product.image ? (
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-48 object-cover"
            onError={(e) => {
              e.currentTarget.src = '/placeholder-image.jpg';
            }}
          />
        ) : (
          <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">Нет изображения</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.title}
        </h3>
        {product.price && (
          <p className="text-xl font-bold text-blue-600 mb-2">{product.price}</p>
        )}
        {product.sku && (
          <p className="text-sm text-gray-500 mb-2">Артикул: {product.sku}</p>
        )}
        {product.description && (
          <p className="text-sm text-gray-600 line-clamp-3 mb-3">
            {product.description}
          </p>
        )}
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">{product.category}</span>
          <a
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Подробнее →
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Каталог вентиляции
        </h1>
        <p className="text-gray-600">
          Найдено {ventilationData.totalProducts} товаров в {ventilationData.totalCategories} категориях
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Данные обновлены: {new Date(ventilationData.parsedAt).toLocaleDateString('ru-RU')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Боковая панель с категориями */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Категории</h2>
            <div className="space-y-4">
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setSelectedSubcategory(null);
                }}
                className={`w-full text-left p-2 rounded hover:bg-gray-100 transition-colors ${
                  !selectedCategory && !selectedSubcategory
                    ? 'bg-blue-50 border-blue-200'
                    : ''
                }`}
              >
                Все категории
              </button>
              {renderCategoryTree(ventilationData.categories)}
            </div>
          </div>
        </div>

        {/* Основная область с товарами */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-md p-6">
            {/* Поиск */}
            <div className="mb-6">
              <input
                type="text"
                placeholder="Поиск товаров..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Заголовок с информацией о выбранной категории */}
            {(selectedCategory || selectedSubcategory) && (
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {selectedSubcategory?.title || selectedCategory?.title}
                </h2>
                <p className="text-gray-600">
                  Найдено {filteredProducts.length} товаров
                </p>
              </div>
            )}

            {/* Список товаров */}
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map(renderProductCard)}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  {searchTerm ? 'Товары не найдены' : 'Выберите категорию для просмотра товаров'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VentilationCatalog; 