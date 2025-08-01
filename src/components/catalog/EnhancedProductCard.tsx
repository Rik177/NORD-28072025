import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, BarChart2, Eye, ShoppingCart, Zap, Shield, Award } from 'lucide-react';
import { EnhancedProduct } from '../../data/enhancedProductData';
import OptimizedImage from '../shared/OptimizedImage';
import { useComparison } from '../../hooks/useComparison';

interface EnhancedProductCardProps {
  product: EnhancedProduct;
  viewMode?: 'grid' | 'list';
  showQuickView?: boolean;
  onQuickView?: (product: EnhancedProduct) => void;
  onAddToCart?: (product: EnhancedProduct) => void;
}

const EnhancedProductCard: React.FC<EnhancedProductCardProps> = ({
  product,
  viewMode = 'grid',
  showQuickView = true,
  onQuickView,
  onAddToCart
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addToComparison, isInComparison } = useComparison();

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

  if (viewMode === 'list') {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-card overflow-hidden hover:shadow-card-hover transition-all duration-300 flex">
        {/* Image Section */}
        <div className="relative w-1/4 min-h-[200px]">
          <OptimizedImage
            src={product.images[0]?.url || ''}
            alt={product.images[0]?.alt || product.name}
            className="w-full h-full object-cover"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
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
        </div>

        {/* Content Section */}
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div>
                <span className="text-sm text-secondary font-semibold">{product.brand}</span>
                <Link 
                  to={`/catalog/${product.category}/${product.id}`}
                  className="block hover:text-primary dark:hover:text-white transition-colors"
                >
                  <h3 className="font-heading font-semibold text-lg text-primary dark:text-white line-clamp-2">
                    {product.name}
                  </h3>
                </Link>
              </div>
              <div className="flex items-center">
                {renderStars(product.rating)}
                <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                  ({product.reviewCount})
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
              {product.shortDescription}
            </p>

            {/* Key Features */}
            <div className="flex flex-wrap gap-2 mb-4">
              {product.features.slice(0, 3).map((feature, index) => (
                <span 
                  key={index}
                  className="inline-flex items-center bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs"
                >
                  <span className="mr-1">{feature.icon}</span>
                  {feature.title}
                </span>
              ))}
            </div>

            {/* Availability */}
            <div className="mb-4">
              <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${getAvailabilityColor()}`}>
                {product.availability}
              </span>
              {product.availability !== 'Нет в наличии' && (
                <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                  Доставка: {product.deliveryTime}
                </span>
              )}
            </div>
          </div>

          {/* Price and Actions */}
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center mb-1">
                <span className="text-2xl font-bold text-primary dark:text-white">
                  {product.price.toLocaleString()} ₽
                </span>
                {product.oldPrice && (
                  <span className="text-lg text-gray-500 line-through ml-2">
                    {product.oldPrice.toLocaleString()} ₽
                  </span>
                )}
              </div>
              {product.oldPrice && (
                <span className="text-accent font-semibold text-sm">
                  Экономия: {(product.oldPrice - product.price).toLocaleString()} ₽
                </span>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleAddToComparison()}
                className={`p-2 rounded-lg transition-colors ${
                  isInComparison(product.id)
                    ? 'bg-secondary text-white'
                    : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
                title="Сравнить"
              >
                <BarChart2 className="h-4 w-4" />
              </button>
              <button className="p-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors">
                <Heart className="h-4 w-4" />
              </button>
              <Link
                to={`/catalog/${product.category}/${product.id}`}
                className="bg-primary hover:bg-opacity-90 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                Подробнее
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid view
  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-lg shadow-card overflow-hidden group hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 flex flex-col h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <OptimizedImage
          src={product.images[currentImageIndex]?.url || product.images[0]?.url || ''}
          alt={product.images[currentImageIndex]?.alt || product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Image Navigation */}
        {product.images.length > 1 && isHovered && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {product.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
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

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {showQuickView && onQuickView && (
            <button 
              onClick={() => onQuickView(product)}
              className="p-2 bg-white/90 hover:bg-white rounded-full shadow-md transition-colors"
              title="Быстрый просмотр"
            >
              <Eye className="h-4 w-4 text-gray-600" />
            </button>
          )}
          <button className="p-2 bg-white/90 hover:bg-white rounded-full shadow-md transition-colors">
            <Heart className="h-4 w-4 text-gray-600" />
          </button>
          <button 
            onClick={handleAddToComparison}
            className={`p-2 rounded-full shadow-md transition-colors ${
              isInComparison(product.id) 
                ? 'bg-secondary text-white' 
                : 'bg-white/90 hover:bg-white text-gray-600'
            }`}
            title={isInComparison(product.id) ? 'В сравнении' : 'Добавить к сравнению'}
          >
            <BarChart2 className="h-4 w-4" />
          </button>
        </div>

        {/* Energy Class Badge */}
        {product.energyClass && (
          <div className="absolute bottom-3 right-3">
            <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-bold">
              {product.energyClass}
            </span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-secondary font-semibold">{product.brand}</span>
          <div className="flex items-center">
            {renderStars(product.rating)}
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
              ({product.reviewCount})
            </span>
          </div>
        </div>

        {/* Title */}
        <Link 
          to={`/catalog/${product.category}/${product.id}`}
          className="block hover:text-primary dark:hover:text-white transition-colors mb-2"
        >
          <h3 className="font-heading font-semibold text-primary dark:text-white line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2 flex-1">
          {product.shortDescription}
        </p>

        {/* Key Features */}
        <div className="flex flex-wrap gap-1 mb-3">
          {product.features.slice(0, 2).map((feature, index) => (
            <span 
              key={index}
              className="inline-flex items-center bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded text-xs"
            >
              <span className="mr-1">{feature.icon}</span>
              {feature.title}
            </span>
          ))}
          {product.features.length > 2 && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              +{product.features.length - 2} еще
            </span>
          )}
        </div>

        {/* Certifications */}
        {product.certifications.length > 0 && (
          <div className="flex items-center mb-3">
            <Shield className="h-4 w-4 text-green-600 mr-1" />
            <span className="text-xs text-gray-600 dark:text-gray-400">
              {product.certifications.slice(0, 3).join(', ')}
            </span>
          </div>
        )}

        {/* Availability */}
        <div className="mb-3">
          <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${getAvailabilityColor()}`}>
            {product.availability}
          </span>
          {product.availability !== 'Нет в наличии' && (
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Доставка: {product.deliveryTime}
            </div>
          )}
        </div>

        {/* Price */}
        <div className="mb-4">
          <div className="flex items-center">
            <span className="text-xl font-bold text-primary dark:text-white">
              {product.price.toLocaleString()} ₽
            </span>
            {product.oldPrice && (
              <span className="text-sm text-gray-500 line-through ml-2">
                {product.oldPrice.toLocaleString()} ₽
              </span>
            )}
          </div>
          {product.oldPrice && (
            <span className="text-accent font-semibold text-sm">
              Экономия: {(product.oldPrice - product.price).toLocaleString()} ₽
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex space-x-2 mt-auto">
          <Link
            to={`/catalog/${product.category}/${product.id}`}
            className="flex-1 bg-primary hover:bg-opacity-90 text-white font-semibold py-2 px-4 rounded-md transition-colors text-center text-sm"
          >
            Подробнее
          </Link>
          {onAddToCart && (
            <button
              onClick={() => onAddToCart(product)}
              className="p-2 bg-accent hover:bg-opacity-90 text-white rounded-md transition-colors"
              title="В корзину"
            >
              <ShoppingCart className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnhancedProductCard;