import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Star, Heart, BarChart2, ShoppingCart, Check, Zap, Shield } from 'lucide-react';
import { EnhancedProduct } from '../../data/enhancedProductData';
import OptimizedImage from '../shared/OptimizedImage';
import { useComparison } from '../../hooks/useComparison';

interface ProductQuickViewProps {
  product: EnhancedProduct;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart?: (product: EnhancedProduct) => void;
}

const ProductQuickView: React.FC<ProductQuickViewProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'specs' | 'features'>('overview');
  const { addToComparison, isInComparison } = useComparison();

  if (!isOpen) return null;

  const handleAddToComparison = () => {
    const comparisonProduct = {
      id: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      image: product.images[0]?.url || '',
      specifications: product.specifications.reduce((acc, spec) => ({
        ...acc,
        ...spec.specifications
      }), {}),
      rating: product.rating,
      features: product.features.map(f => f.title),
      category: product.category
    };
    addToComparison(comparisonProduct);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
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

  const getDiscountPercentage = () => {
    if (!product.oldPrice) return 0;
    return Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
  };

  const getAvailabilityColor = () => {
    switch (product.availability) {
      case 'В наличии': return 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-300';
      case 'Под заказ': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'Нет в наличии': return 'text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-300';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b dark:border-gray-700">
          <h2 className="font-heading font-bold text-h3-desktop text-primary dark:text-white">
            Быстрый просмотр
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-2"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Image Gallery */}
          <div>
            <div className="relative mb-4">
              <OptimizedImage
                src={product.images[currentImageIndex]?.url || product.images[0]?.url || ''}
                alt={product.images[currentImageIndex]?.alt || product.name}
                className="w-full h-96 object-cover rounded-lg"
              />
              
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNew && (
                  <span className="bg-secondary text-white px-2 py-1 rounded-full text-xs font-bold">
                    Новинка
                  </span>
                )}
                {product.isSale && (
                  <span className="bg-accent text-white px-2 py-1 rounded-full text-xs font-bold">
                    -{getDiscountPercentage()}%
                  </span>
                )}
                {product.isBestseller && (
                  <span className="bg-purple-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    Хит
                  </span>
                )}
              </div>

              {/* Energy Class */}
              {product.energyClass && (
                <div className="absolute bottom-4 right-4">
                  <span className="bg-green-500 text-white px-3 py-1 rounded text-sm font-bold">
                    {product.energyClass}
                  </span>
                </div>
              )}
            </div>
            
            {/* Thumbnail Gallery */}
            {product.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      index === currentImageIndex ? 'border-primary' : 'border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <OptimizedImage
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-secondary font-semibold">{product.brand}</span>
                <div className="flex items-center">
                  {renderStars(product.rating)}
                  <span className="text-gray-500 dark:text-gray-400 ml-2 text-sm">
                    {product.rating} ({product.reviewCount} отзывов)
                  </span>
                </div>
              </div>
              
              <h1 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-primary dark:text-white">
                {product.name}
              </h1>
              
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                {product.shortDescription}
              </p>
            </div>

            {/* Price */}
            <div>
              <div className="flex items-center mb-2">
                <span className="text-3xl font-bold text-primary dark:text-white">
                  {product.price.toLocaleString()} ₽
                </span>
                {product.oldPrice && (
                  <span className="text-xl text-gray-500 line-through ml-3">
                    {product.oldPrice.toLocaleString()} ₽
                  </span>
                )}
              </div>
              {product.oldPrice && (
                <span className="text-accent font-semibold">
                  Экономия: {(product.oldPrice - product.price).toLocaleString()} ₽
                </span>
              )}
            </div>

            {/* Availability */}
            <div>
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getAvailabilityColor()}`}>
                {product.availability}
              </span>
              {product.availability !== 'Нет в наличии' && (
                <span className="text-gray-500 dark:text-gray-400 ml-3 text-sm">
                  Доставка: {product.deliveryTime}
                </span>
              )}
            </div>

            {/* Tabs */}
            <div>
              <div className="flex border-b dark:border-gray-700 mb-4">
                <button
                  onClick={() => setSelectedTab('overview')}
                  className={`px-4 py-2 font-semibold ${
                    selectedTab === 'overview'
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-gray-600 dark:text-gray-400 hover:text-primary'
                  }`}
                >
                  Обзор
                </button>
                <button
                  onClick={() => setSelectedTab('specs')}
                  className={`px-4 py-2 font-semibold ${
                    selectedTab === 'specs'
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-gray-600 dark:text-gray-400 hover:text-primary'
                  }`}
                >
                  Характеристики
                </button>
                <button
                  onClick={() => setSelectedTab('features')}
                  className={`px-4 py-2 font-semibold ${
                    selectedTab === 'features'
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-gray-600 dark:text-gray-400 hover:text-primary'
                  }`}
                >
                  Особенности
                </button>
              </div>

              {/* Tab Content */}
              <div className="min-h-[200px]">
                {selectedTab === 'overview' && (
                  <div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                      {product.fullDescription}
                    </p>
                    
                    {/* Key Specs */}
                    <div className="grid grid-cols-2 gap-3">
                      {Object.entries(product.specifications[0]?.specifications || {}).slice(0, 6).map(([key, value]) => (
                        <div key={key} className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">{key}:</span>
                          <span className="font-semibold">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedTab === 'specs' && (
                  <div className="space-y-4">
                    {product.specifications.map((specGroup, index) => (
                      <div key={index}>
                        <h4 className="font-semibold text-primary dark:text-white mb-2">
                          {specGroup.category}
                        </h4>
                        <div className="grid grid-cols-1 gap-2">
                          {Object.entries(specGroup.specifications).map(([key, value]) => (
                            <div key={key} className="flex justify-between py-1 border-b border-gray-100 dark:border-gray-700">
                              <span className="text-gray-600 dark:text-gray-400 text-sm">{key}:</span>
                              <span className="font-semibold text-sm">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {selectedTab === 'features' && (
                  <div className="grid grid-cols-1 gap-3">
                    {product.features.map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <div className="bg-primary/10 rounded-lg p-2 mr-3 flex-shrink-0">
                          <div className="text-primary">
                            {feature.icon}
                          </div>
                        </div>
                        <div>
                          <h5 className="font-semibold text-primary dark:text-white mb-1">
                            {feature.title}
                          </h5>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Certifications */}
            {product.certifications.length > 0 && (
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-green-600 mr-2" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Сертификаты: {product.certifications.join(', ')}
                </span>
              </div>
            )}

            {/* Actions */}
            <div className="space-y-4">
              <div className="flex space-x-3">
                <button className="flex-1 flex items-center justify-center py-3 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <Heart className="h-5 w-5 mr-2" />
                  В избранное
                </button>
                <button 
                  onClick={handleAddToComparison}
                  className={`flex-1 flex items-center justify-center py-3 border rounded-md transition-colors ${
                    isInComparison(product.id)
                      ? 'border-secondary bg-secondary text-white'
                      : 'border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <BarChart2 className="h-5 w-5 mr-2" />
                  {isInComparison(product.id) ? 'В сравнении' : 'Сравнить'}
                </button>
              </div>
              
              <div className="flex space-x-3">
                <a
                  href={`/catalog/${product.category}/${product.id}`}
                  className="flex-1 bg-primary hover:bg-opacity-90 text-white font-semibold py-3 px-6 rounded-md transition-colors text-center"
                >
                  Подробнее
                </a>
                {onAddToCart && (
                  <button
                    onClick={() => onAddToCart(product)}
                    className="flex items-center justify-center bg-accent hover:bg-opacity-90 text-white font-semibold py-3 px-6 rounded-md transition-colors"
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    В корзину
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductQuickView;