import React, { useState } from 'react';
import { X, Plus, Minus, Check, AlertCircle } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  specifications: Record<string, string>;
  rating: number;
  features: string[];
}

interface ProductComparisonProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onRemoveProduct: (productId: string) => void;
  onAddProduct: () => void;
}

const ProductComparison: React.FC<ProductComparisonProps> = ({
  isOpen,
  onClose,
  products,
  onRemoveProduct,
  onAddProduct
}) => {
  const [activeTab, setActiveTab] = useState<'specs' | 'features' | 'prices'>('specs');

  if (!isOpen) return null;

  const maxProducts = 4;
  const canAddMore = products.length < maxProducts;

  // Get all unique specification keys
  const allSpecKeys = Array.from(
    new Set(products.flatMap(product => Object.keys(product.specifications)))
  );

  // Get all unique features
  const allFeatures = Array.from(
    new Set(products.flatMap(product => product.features))
  );

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span
          key={i}
          className={`text-lg ${i < Math.floor(rating) ? 'text-accent' : 'text-gray-300'}`}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b dark:border-gray-700 flex items-center justify-between">
          <h2 className="font-heading font-bold text-h3-desktop text-primary dark:text-white">
            Сравнение товаров ({products.length}/{maxProducts})
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {products.length === 0 ? (
          <div className="p-12 text-center">
            <AlertCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">
              Нет товаров для сравнения
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Добавьте товары в сравнение, чтобы увидеть их характеристики рядом
            </p>
            <button
              onClick={onAddProduct}
              className="bg-primary text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition-colors"
            >
              Добавить товары
            </button>
          </div>
        ) : (
          <>
            {/* Tabs */}
            <div className="border-b dark:border-gray-700">
              <nav className="flex">
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`px-6 py-3 font-semibold ${
                    activeTab === 'specs'
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-gray-600 dark:text-gray-400 hover:text-primary'
                  }`}
                >
                  Характеристики
                </button>
                <button
                  onClick={() => setActiveTab('features')}
                  className={`px-6 py-3 font-semibold ${
                    activeTab === 'features'
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-gray-600 dark:text-gray-400 hover:text-primary'
                  }`}
                >
                  Функции
                </button>
                <button
                  onClick={() => setActiveTab('prices')}
                  className={`px-6 py-3 font-semibold ${
                    activeTab === 'prices'
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-gray-600 dark:text-gray-400 hover:text-primary'
                  }`}
                >
                  Цены
                </button>
              </nav>
            </div>

            {/* Content */}
            <div className="overflow-auto max-h-[60vh]">
              {/* Product Headers */}
              <div className="sticky top-0 bg-white dark:bg-gray-900 border-b dark:border-gray-700 z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
                  {products.map((product) => (
                    <div key={product.id} className="text-center">
                      <div className="relative mb-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <button
                          onClick={() => onRemoveProduct(product.id)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      <h3 className="font-semibold text-sm text-primary dark:text-white mb-1 line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                        {product.brand}
                      </p>
                      <div className="flex justify-center mb-2">
                        {renderStars(product.rating)}
                      </div>
                      <p className="font-bold text-primary dark:text-white">
                        {product.price.toLocaleString()} ₽
                      </p>
                    </div>
                  ))}
                  
                  {canAddMore && (
                    <div className="text-center">
                      <button
                        onClick={onAddProduct}
                        className="w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg flex items-center justify-center hover:border-primary hover:bg-primary/5 transition-colors"
                      >
                        <Plus className="h-8 w-8 text-gray-400" />
                      </button>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                        Добавить товар
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Comparison Content */}
              <div className="p-4">
                {activeTab === 'specs' && (
                  <div className="space-y-4">
                    {allSpecKeys.map((specKey) => (
                      <div key={specKey} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-3 border-b border-gray-200 dark:border-gray-700">
                        <div className="font-semibold text-gray-900 dark:text-white mb-2 md:mb-0">
                          {specKey}
                        </div>
                        {products.map((product) => (
                          <div key={product.id} className="text-gray-600 dark:text-gray-300">
                            {product.specifications[specKey] || '—'}
                          </div>
                        ))}
                        {canAddMore && <div></div>}
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'features' && (
                  <div className="space-y-4">
                    {allFeatures.map((feature) => (
                      <div key={feature} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-3 border-b border-gray-200 dark:border-gray-700">
                        <div className="font-semibold text-gray-900 dark:text-white mb-2 md:mb-0">
                          {feature}
                        </div>
                        {products.map((product) => (
                          <div key={product.id} className="text-center">
                            {product.features.includes(feature) ? (
                              <Check className="h-5 w-5 text-green-500 mx-auto" />
                            ) : (
                              <X className="h-5 w-5 text-red-500 mx-auto" />
                            )}
                          </div>
                        ))}
                        {canAddMore && <div></div>}
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'prices' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {products.map((product) => (
                        <div key={product.id} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-center">
                          <h4 className="font-semibold text-primary dark:text-white mb-2">
                            {product.name}
                          </h4>
                          <p className="text-2xl font-bold text-primary dark:text-white mb-4">
                            {product.price.toLocaleString()} ₽
                          </p>
                          <button className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors">
                            Купить
                          </button>
                        </div>
                      ))}
                      {canAddMore && <div></div>}
                    </div>
                    
                    {/* Price Analysis */}
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                      <h4 className="font-semibold text-primary dark:text-white mb-3">
                        Анализ цен
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Самый дешевый:</span>
                          <p className="font-semibold">
                            {Math.min(...products.map(p => p.price)).toLocaleString()} ₽
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Самый дорогой:</span>
                          <p className="font-semibold">
                            {Math.max(...products.map(p => p.price)).toLocaleString()} ₽
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Разница:</span>
                          <p className="font-semibold">
                            {(Math.max(...products.map(p => p.price)) - Math.min(...products.map(p => p.price))).toLocaleString()} ₽
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductComparison;