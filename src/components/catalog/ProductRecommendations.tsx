import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ArrowRight, Zap, TrendingUp, Users } from 'lucide-react';

interface RecommendedProduct {
  id: string;
  name: string;
  brand: string;
  price: number;
  oldPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  reason: 'similar' | 'popular' | 'cheaper' | 'premium' | 'frequently_bought';
  category: string;
}

interface ProductRecommendationsProps {
  currentProductId?: string;
  category?: string;
  userBehavior?: {
    viewedProducts: string[];
    searchQueries: string[];
    priceRange: [number, number];
  };
}

const mockRecommendations: RecommendedProduct[] = [
  {
    id: 'mitsubishi-msz-ln25vg',
    name: 'Кондиционер Mitsubishi MSZ-LN25VG',
    brand: 'Mitsubishi',
    price: 45600,
    image: 'https://images.pexels.com/photos/4489794/pexels-photo-4489794.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.9,
    reviewCount: 18,
    reason: 'similar',
    category: 'air-conditioning'
  },
  {
    id: 'carrier-42qhc012ds',
    name: 'Кондиционер Carrier 42QHC012DS',
    brand: 'Carrier',
    price: 67800,
    image: 'https://images.pexels.com/photos/7191981/pexels-photo-7191981.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.7,
    reviewCount: 12,
    reason: 'premium',
    category: 'air-conditioning'
  },
  {
    id: 'panasonic-cs-tz25tkew',
    name: 'Кондиционер Panasonic CS-TZ25TKEW',
    brand: 'Panasonic',
    price: 32900,
    oldPrice: 36500,
    image: 'https://images.pexels.com/photos/4270511/pexels-photo-4270511.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.6,
    reviewCount: 24,
    reason: 'cheaper',
    category: 'air-conditioning'
  },
  {
    id: 'installation-service',
    name: 'Услуга установки кондиционера',
    brand: 'НОРДИНЖИНИРИНГ',
    price: 8500,
    image: 'https://images.pexels.com/photos/8961214/pexels-photo-8961214.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.8,
    reviewCount: 156,
    reason: 'frequently_bought',
    category: 'services'
  }
];

const ProductRecommendations: React.FC<ProductRecommendationsProps> = ({
  currentProductId,
  category,
  userBehavior
}) => {
  const getReasonIcon = (reason: string) => {
    switch (reason) {
      case 'similar':
        return <Star className="h-4 w-4" />;
      case 'popular':
        return <TrendingUp className="h-4 w-4" />;
      case 'cheaper':
        return <ArrowRight className="h-4 w-4 rotate-180" />;
      case 'premium':
        return <Zap className="h-4 w-4" />;
      case 'frequently_bought':
        return <Users className="h-4 w-4" />;
      default:
        return <Star className="h-4 w-4" />;
    }
  };

  const getReasonText = (reason: string) => {
    switch (reason) {
      case 'similar':
        return 'Похожий товар';
      case 'popular':
        return 'Популярный выбор';
      case 'cheaper':
        return 'Более доступный';
      case 'premium':
        return 'Премиум вариант';
      case 'frequently_bought':
        return 'Часто покупают вместе';
      default:
        return 'Рекомендуем';
    }
  };

  const getReasonColor = (reason: string) => {
    switch (reason) {
      case 'similar':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      case 'popular':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'cheaper':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300';
      case 'premium':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300';
      case 'frequently_bought':
        return 'bg-pink-100 text-pink-800 dark:bg-pink-900/20 dark:text-pink-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
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

  // Filter recommendations based on current product
  const filteredRecommendations = mockRecommendations.filter(
    product => product.id !== currentProductId
  );

  if (filteredRecommendations.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-lightBg dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-primary dark:text-white">
            Рекомендуем для вас
          </h2>
          <Link 
            to="/catalog"
            className="text-secondary hover:text-primary dark:hover:text-white transition-colors flex items-center"
          >
            <span>Все товары</span>
            <ArrowRight className="h-5 w-5 ml-2" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredRecommendations.map((product) => (
            <div 
              key={product.id}
              className="bg-white dark:bg-gray-900 rounded-lg shadow-card overflow-hidden group hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 flex flex-col h-full"
            >
              {/* Recommendation Badge */}
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${getReasonColor(product.reason)}`}>
                    {getReasonIcon(product.reason)}
                    <span className="ml-1">{getReasonText(product.reason)}</span>
                  </span>
                </div>
                {product.oldPrice && (
                  <div className="absolute top-3 right-3">
                    <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                      -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                    </span>
                  </div>
                )}
              </div>

              <div className="p-4 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500 dark:text-gray-400">{product.brand}</span>
                  <div className="flex items-center">
                    {renderStars(product.rating)}
                    <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                      ({product.reviewCount})
                    </span>
                  </div>
                </div>

                <h3 className="font-heading font-semibold text-primary dark:text-white mb-3 line-clamp-2 group-hover:text-secondary transition-colors">
                  {product.name}
                </h3>

                <div className="flex items-center justify-between mt-auto">
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
                    to={product.category === 'services' ? '/services' : `/catalog/${product.category}/product/${product.id}`}
                    className="bg-primary hover:bg-opacity-90 text-white font-semibold py-2 px-4 rounded-md transition-colors text-sm"
                  >
                    {product.category === 'services' ? 'Заказать' : 'Подробнее'}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Personalization Notice */}
        <div className="mt-8 bg-white dark:bg-gray-900 rounded-lg p-6 text-center">
          <h3 className="font-heading font-semibold text-primary dark:text-white mb-2">
            Персональные рекомендации
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Рекомендации основаны на ваших просмотрах, поисковых запросах и предпочтениях других покупателей
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProductRecommendations;