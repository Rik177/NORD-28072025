import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Heart, BarChart2, ShoppingCart, Shield, Award, Truck, Clock, Share2, Download } from 'lucide-react';
import OptimizedImage from '../shared/OptimizedImage';
import { useComparison } from '../../hooks/useComparison';
import Breadcrumbs from '../shared/Breadcrumbs';

interface MircliProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  images: Array<{ url: string; alt: string }>;
  rating: number;
  reviewCount: number;
  brand: string;
  category: string;
  sku: string;
  availability: string;
  specifications: Record<string, string>;
  features: string[];
  isNew: boolean;
  isSale: boolean;
  isBestseller: boolean;
  url: string;
  shortDescription?: string;
  deliveryTime?: string;
  energyClass?: string;
  certifications?: string[];
}

interface MircliProductDetailProps {
  product: MircliProduct;
}

const MircliProductDetail: React.FC<MircliProductDetailProps> = ({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedTab, setSelectedTab] = useState<'description' | 'specifications' | 'reviews'>('description');
  const { addToComparison, isInComparison } = useComparison();

  const handleAddToComparison = () => {
    const comparisonProduct = {
      id: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      image: product.images[0]?.url || '',
      specifications: product.specifications,
      rating: product.rating,
      features: product.features,
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
          className={`h-5 w-5 ${i < Math.floor(rating) ? 'text-accent fill-accent' : 'text-gray-300'}`} 
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

  const formatPrice = (price: number) => {
    return price.toLocaleString('ru-RU');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <Breadcrumbs 
          items={[
            { label: 'Главная', href: '/' },
            { label: 'Вентиляция', href: '/ventilation' },
            { label: product.category, href: `/ventilation/${product.category}` },
            { label: product.name, href: '#' }
          ]} 
        />

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-card overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative h-96 overflow-hidden rounded-lg">
                <OptimizedImage
                  src={product.images[currentImageIndex]?.url || product.images[0]?.url || ''}
                  alt={product.images[currentImageIndex]?.alt || product.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.isNew && (
                    <span className="bg-secondary text-white px-3 py-1 rounded-full text-sm font-bold">
                      Новинка
                    </span>
                  )}
                  {product.isSale && (
                    <span className="bg-accent text-white px-3 py-1 rounded-full text-sm font-bold">
                      -{getDiscountPercentage()}%
                    </span>
                  )}
                  {product.isBestseller && (
                    <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      Хит
                    </span>
                  )}
                </div>

                {/* Energy Class Badge */}
                {product.energyClass && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-green-500 text-white px-3 py-1 rounded text-sm font-bold">
                      {product.energyClass}
                    </span>
                  </div>
                )}
              </div>

              {/* Thumbnail Images */}
              {product.images.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        index === currentImageIndex 
                          ? 'border-primary' 
                          : 'border-gray-200 dark:border-gray-600'
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
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm text-secondary font-semibold">{product.brand}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">•</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">SKU: {product.sku}</span>
                </div>
                
                <h1 className="text-3xl font-bold text-primary dark:text-white mb-4">
                  {product.name}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    {renderStars(product.rating)}
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {product.rating} ({product.reviewCount} отзывов)
                  </span>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-bold text-primary dark:text-white">
                      {formatPrice(product.price)} ₽
                    </span>
                    {product.oldPrice && (
                      <span className="text-xl text-gray-500 line-through">
                        {formatPrice(product.oldPrice)} ₽
                      </span>
                    )}
                  </div>
                  {product.oldPrice && (
                    <span className="text-accent font-semibold text-lg">
                      Экономия: {formatPrice(product.oldPrice - product.price)} ₽
                    </span>
                  )}
                </div>

                {/* Availability */}
                <div className="mb-6">
                  <span className={`inline-block px-3 py-2 rounded-full text-sm font-semibold ${getAvailabilityColor()}`}>
                    {product.availability}
                  </span>
                  {product.deliveryTime && (
                    <div className="flex items-center mt-2 text-sm text-gray-600 dark:text-gray-400">
                      <Clock className="h-4 w-4 mr-2" />
                      Доставка: {product.deliveryTime}
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="flex-1 bg-primary hover:bg-opacity-90 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  В корзину
                </button>
                <button className="p-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors">
                  <Heart className="h-5 w-5" />
                </button>
                <button 
                  onClick={handleAddToComparison}
                  className={`p-3 rounded-lg transition-colors ${
                    isInComparison(product.id) 
                      ? 'bg-secondary text-white' 
                      : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <BarChart2 className="h-5 w-5" />
                </button>
                <button className="p-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>

              {/* Features */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900 dark:text-white">Особенности:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Shield className="h-4 w-4 text-green-600" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              {product.certifications && product.certifications.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Сертификаты:</h3>
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-green-600" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {product.certifications.join(', ')}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Tabs */}
          <div className="border-t border-gray-200 dark:border-gray-700">
            <div className="flex border-b border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setSelectedTab('description')}
                className={`px-6 py-4 font-medium transition-colors ${
                  selectedTab === 'description'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                Описание
              </button>
              <button
                onClick={() => setSelectedTab('specifications')}
                className={`px-6 py-4 font-medium transition-colors ${
                  selectedTab === 'specifications'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                Характеристики
              </button>
              <button
                onClick={() => setSelectedTab('reviews')}
                className={`px-6 py-4 font-medium transition-colors ${
                  selectedTab === 'reviews'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                Отзывы ({product.reviewCount})
              </button>
            </div>

            <div className="p-6">
              {selectedTab === 'description' && (
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {product.description}
                  </p>
                  {product.shortDescription && (
                    <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Краткое описание:</h4>
                      <p className="text-gray-600 dark:text-gray-300">{product.shortDescription}</p>
                    </div>
                  )}
                </div>
              )}

              {selectedTab === 'specifications' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                      <span className="font-medium text-gray-900 dark:text-white">{key}:</span>
                      <span className="text-gray-600 dark:text-gray-400">{value}</span>
                    </div>
                  ))}
                </div>
              )}

              {selectedTab === 'reviews' && (
                <div className="text-center py-8">
                  <div className="text-gray-400 dark:text-gray-500 mb-4">
                    <Star className="h-12 w-12 mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Отзывы пока отсутствуют
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Будьте первым, кто оставит отзыв об этом товаре
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MircliProductDetail; 