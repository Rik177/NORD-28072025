import React, { useState, useEffect } from 'react';
import { useParams, Navigate, Link, useLocation } from 'react-router-dom';
import SEOHelmet from '../../components/shared/SEOHelmet';
import Header from '../../components/home/Header';
import Footer from '../../components/home/Footer';
import Breadcrumbs from '../../components/shared/Breadcrumbs';
// Removed unused imports
import EnhancedProductCard from '../../components/catalog/EnhancedProductCard';
import { Star, Heart, ChevronLeft, ChevronRight, Check, X, Download, Printer, ArrowLeft, ArrowRight, BarChart2, Info, Shield, Award, Truck, Clock, Zap } from 'lucide-react';
import { useComparison } from '../../hooks/useComparison';
import { getEnhancedProduct, getRelatedProducts, EnhancedProduct } from '../../data/mircliProductData';
import ConsultationForm, { ConsultationFormData } from '../../components/catalog/ConsultationForm';
import OptimizedImage from '../../components/shared/OptimizedImage';
import { getAllProducts, Product as BasicCatalogProduct } from './Categories';

const EnhancedProductPage: React.FC = () => {
  const { productId } = useParams<{ category: string; subcategory?: string; subsubcategory?: string; productId: string }>();
  const location = useLocation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'applications' | 'installation' | 'reviews'>('description');
  const [showConsultationForm, setShowConsultationForm] = useState(false);
  const [showInstallationForm, setShowInstallationForm] = useState(false);
  const [formData, setFormData] = useState<ConsultationFormData>({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [selectedSpecCategory, setSelectedSpecCategory] = useState<string | null>(null);
  const [relatedProductsList, setRelatedProductsList] = useState<EnhancedProduct[]>([]);
  
  const { addToComparison, isInComparison } = useComparison();

  // Fallback: если товар не найден в базе расширенных товаров, пробуем взять его из каталога
  function mapBasicProductToEnhanced(basic: BasicCatalogProduct): EnhancedProduct {
    return {
      id: basic.id,
      name: basic.name,
      brand: basic.brand,
      model: basic.model,
      category: basic.category,
      subcategory: basic.category.split('/').slice(-1)[0] || basic.category,
      shortDescription: basic.name,
      fullDescription: basic.name,
      technicalDescription: 'Характеристики товара доступны по запросу.',
      price: Number(basic.price) || 0,
      currency: basic.currency || 'RUB',
      availability: (basic.availability as any) || 'В наличии',
      deliveryTime: 'Уточняйте у менеджера',
      images: [
        {
          url: basic.image || '',
          alt: basic.name,
          type: 'main',
        },
      ],
      rating: Number(basic.rating) || 0,
      reviewCount: Number(basic.reviewCount) || 0,
      specifications: [
        {
          category: 'Характеристики',
          specifications: basic.specifications || {},
        },
      ],
      features: [],
      applications: [],
      installation: {
        complexity: 'Средняя',
        time: 'Уточняйте у менеджера',
        team: 'Сертифицированные специалисты',
        requirements: [],
        steps: [],
        warranty: 'Гарантия по условиям производителя',
        maintenance: 'Сервисное обслуживание по договору',
        tools: [],
        materials: [],
      },
      seoTitle: undefined,
      seoDescription: undefined,
      keywords: [basic.name, basic.brand, basic.model, basic.category].filter(Boolean) as string[],
      certifications: [],
      dimensions: { length: 0, width: 0, height: 0, weight: 0 },
      relatedProducts: [],
      accessories: [],
      isNew: basic.isNew,
      isSale: basic.isSale,
      isPopular: basic.isPopular,
      isBestseller: basic.isBestseller,
    };
  }

  const primaryProduct = productId ? getEnhancedProduct(productId) : undefined;
  const fallbackBasic = productId ? getAllProducts().find(p => p.id === productId) : undefined;
  
  // Debug logs removed for production
  
  const product: EnhancedProduct | undefined = primaryProduct ?? (fallbackBasic ? mapBasicProductToEnhanced(fallbackBasic) : undefined);

  // Формируем путь категории из фактического URL, поддерживая произвольную глубину
  const pathAfterCatalog = location.pathname.replace(/^\/?catalog\/?/, '');
  const currentCategoryPath = pathAfterCatalog.split('/product')[0].replace(/\/$/, '');

  useEffect(() => {
    if (product) {
      // Set the first specification category as selected by default
      if (product.specifications.length > 0) {
        setSelectedSpecCategory(product.specifications[0].category);
      }
      
      // Load related products
      const related = getRelatedProducts(product.id);
      setRelatedProductsList(related);
    }
  }, [product]);

  if (!product) {
    return <Navigate to="/catalog" replace />;
  }

  const fullName = (product.brand && product.model)
    ? `${product.brand} ${product.model}`
    : product.name;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": fullName,
    "description": product.fullDescription,
    "image": product.images.map(img => img.url),
    "brand": {
      "@type": "Brand",
      "name": product.brand
    },
    "model": product.model,
    "offers": {
      "@type": "Offer",
      "price": product.price,
      "priceCurrency": product.currency,
      "availability": product.availability === 'В наличии' 
        ? "https://schema.org/InStock" 
        : product.availability === 'Под заказ'
          ? "https://schema.org/PreOrder"
          : "https://schema.org/OutOfStock",
      "seller": {
        "@type": "Organization",
        "name": "НОРДИНЖИНИРИНГ"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": product.rating,
      "reviewCount": product.reviewCount
    },
    "category": product.category
  };

  const handleOrderInstallation = () => {
    setShowInstallationForm(true);
  };
  
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

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    setFormData({ name: '', phone: '', email: '', message: '' });
    setShowConsultationForm(false);
    setShowInstallationForm(false);
    alert('Спасибо! Мы свяжемся с вами в ближайшее время.');
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

  const getAvailabilityColor = () => {
    switch (product.availability) {
      case 'В наличии': return 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-300';
      case 'Под заказ': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'Нет в наличии': return 'text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-300';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  const getDiscountPercentage = () => {
    if (!product.oldPrice) return 0;
    return Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <SEOHelmet
        title={product.seoTitle || `${fullName} | НОРДИНЖИНИРИНГ`}
        description={product.seoDescription || `${product.shortDescription} Цена: ${product.price.toLocaleString()} ₽. Профессиональная установка и гарантия. Заказать в НОРДИНЖИНИРИНГ.`}
        keywords={product.keywords.join(', ')}
        canonical={`https://nordengineering.ru/catalog/${currentCategoryPath}/product/${product.id}`}
        ogTitle={`${fullName} - Купить с установкой`}
        ogDescription={`${product.shortDescription} Цена: ${product.price.toLocaleString()} ₽. Профессиональная установка и гарантия.`}
        ogImage={product.images[0]?.url}
        structuredData={structuredData}
      />
      <Header />
      <main className="pb-12">
        <Breadcrumbs />
        
        {/* Product Details */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Image Gallery */}
              <div>
                <div className="relative mb-4 bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm">
                  <OptimizedImage
                    src={product.images[currentImageIndex]?.url || ''}
                    alt={product.images[currentImageIndex]?.alt || fullName}
                    className="w-full h-96 object-contain"
                    priority={true}
                  />
                  
                  {/* Image Navigation */}
                  {product.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md"
                      >
                        <ChevronLeft className="h-6 w-6" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md"
                      >
                        <ChevronRight className="h-6 w-6" />
                      </button>
                    </>
                  )}

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.isNew && (
                      <span className="bg-secondary text-white px-3 py-1 rounded-full text-xs font-bold">
                        Новинка
                      </span>
                    )}
                    {product.isSale && product.oldPrice && (
                      <span className="bg-accent text-white px-3 py-1 rounded-full text-xs font-bold">
                        -{getDiscountPercentage()}%
                      </span>
                    )}
                    {product.isBestseller && (
                      <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                        Хит продаж
                      </span>
                    )}
                  </div>

                  {/* Caption */}
                  {product.images[currentImageIndex]?.caption && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 text-sm text-center">
                      {product.images[currentImageIndex].caption}
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

                {/* Certifications */}
                {product.certifications.length > 0 && (
                  <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center mb-3">
                      <Shield className="h-5 w-5 text-primary mr-2" />
                      <h3 className="font-semibold text-primary dark:text-white">
                        Сертификаты и стандарты
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {product.certifications.map((cert, index) => (
                        <span 
                          key={index}
                          className="inline-flex items-center bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm"
                        >
                          <Award className="h-4 w-4 mr-1 text-green-600" />
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div>
                <div className="mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-secondary font-semibold">{product.brand}</span>
                    <div className="flex items-center">
                      {renderStars(product.rating)}
                      <span className="text-gray-500 dark:text-gray-400 ml-2">
                        {product.rating} ({product.reviewCount} отзывов)
                      </span>
                    </div>
                  </div>
                  
                  <h1 className="font-heading font-bold text-h1-mobile md:text-h1-desktop text-primary dark:text-white mt-2">
                    {fullName}
                  </h1>
                  {product.model && (
                    <div className="mt-1 text-gray-600 dark:text-gray-300">
                      Модель: <span className="font-semibold text-gray-900 dark:text-white">{product.model}</span>
                    </div>
                  )}
                  
                  <p className="text-gray-600 dark:text-gray-300 mt-3">
                    {product.shortDescription}
                  </p>
                </div>

                {/* Key Specifications */}
                <div className="mb-6 bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <h3 className="font-heading font-semibold text-primary dark:text-white mb-3">
                    Основные характеристики:
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {Object.entries(product.specifications[0]?.specifications || {}).slice(0, 6).map(([key, value]) => (
                      <div key={key} className="flex items-center">
                        <Check className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                        <div>
                          <span className="text-gray-600 dark:text-gray-400 text-sm">{key}:</span>
                          <span className="font-semibold text-gray-900 dark:text-white ml-1">{value}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price and Availability */}
                <div className="mb-6">
                  <div className="flex items-center mb-2">
                    <span className="text-3xl font-bold text-primary dark:text-white">
                      {product.price.toLocaleString()} ₽
                    </span>
                    {product.oldPrice && (
                      <span className="text-xl text-gray-500 line-through ml-4">
                        {product.oldPrice.toLocaleString()} ₽
                      </span>
                    )}
                  </div>
                  
                  {product.oldPrice && (
                    <div className="mb-3">
                      <span className="text-accent font-semibold">
                        Экономия: {(product.oldPrice - product.price).toLocaleString()} ₽ ({getDiscountPercentage()}%)
                      </span>
                    </div>
                  )}
                  
                  <div className="flex items-center">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getAvailabilityColor()}`}>
                      {product.availability}
                    </span>
                    {product.availability !== 'Нет в наличии' && (
                      <div className="flex items-center ml-4 text-gray-600 dark:text-gray-400">
                        <Truck className="h-4 w-4 mr-1" />
                        <span>Доставка: {product.deliveryTime}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Key Features */}
                <div className="mb-6">
                  <h3 className="font-heading font-semibold text-primary dark:text-white mb-3">
                    Ключевые особенности:
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {product.features.slice(0, 4).map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <div className="bg-primary/10 rounded-lg p-2 mr-3 flex-shrink-0">
                          <div className="text-primary">
                            {feature.icon}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-primary dark:text-white text-sm">
                            {feature.title}
                          </h4>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => setShowConsultationForm(true)}
                      className="flex-1 bg-primary hover:bg-opacity-90 text-white font-semibold py-3 px-6 rounded-md transition-colors"
                    >
                      Заказать консультацию
                    </button>
                    <button
                      onClick={handleOrderInstallation}
                      className="flex-1 bg-accent hover:bg-opacity-90 text-white font-semibold py-3 px-6 rounded-md transition-colors"
                    >
                      Заказать с установкой
                    </button>
                  </div>
                  
                  <div className="flex space-x-4">
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
                </div>

                {/* Additional Info */}
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <Shield className="h-4 w-4 text-green-600 mr-2" />
                      <span>Гарантия: {product.installation.warranty ? product.installation.warranty.split(', ')[0] : 'По запросу'}</span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <Clock className="h-4 w-4 text-blue-600 mr-2" />
                      <span>Установка: {product.installation.timeRequired || product.installation.time || 'По запросу'}</span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <Zap className="h-4 w-4 text-yellow-600 mr-2" />
                      <span>Класс: {product.energyClass || 'A'}</span>
                    </div>
                  </div>
                </div>

                {/* Document Links */}
                <div className="mt-6 flex flex-wrap gap-3">
                  <a href="#" className="inline-flex items-center text-primary hover:text-secondary">
                    <Download className="h-4 w-4 mr-1" />
                    <span>Инструкция</span>
                  </a>
                  <a href="#" className="inline-flex items-center text-primary hover:text-secondary">
                    <Download className="h-4 w-4 mr-1" />
                    <span>Технический паспорт</span>
                  </a>
                  <a href="#" className="inline-flex items-center text-primary hover:text-secondary">
                    <Printer className="h-4 w-4 mr-1" />
                    <span>Распечатать</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Details Tabs */}
        <section className="py-12 bg-lightBg dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-card overflow-hidden">
              {/* Tab Navigation */}
              <div className="border-b dark:border-gray-700 overflow-x-auto">
                <div className="flex">
                  <button
                    onClick={() => setActiveTab('description')}
                    className={`px-6 py-4 font-semibold whitespace-nowrap ${
                      activeTab === 'description'
                        ? 'text-primary border-b-2 border-primary'
                        : 'text-gray-600 dark:text-gray-400 hover:text-primary'
                    }`}
                  >
                    Описание
                  </button>
                  <button
                    onClick={() => setActiveTab('specifications')}
                    className={`px-6 py-4 font-semibold whitespace-nowrap ${
                      activeTab === 'specifications'
                        ? 'text-primary border-b-2 border-primary'
                        : 'text-gray-600 dark:text-gray-400 hover:text-primary'
                    }`}
                  >
                    Характеристики
                  </button>
                  <button
                    onClick={() => setActiveTab('applications')}
                    className={`px-6 py-4 font-semibold whitespace-nowrap ${
                      activeTab === 'applications'
                        ? 'text-primary border-b-2 border-primary'
                        : 'text-gray-600 dark:text-gray-400 hover:text-primary'
                    }`}
                  >
                    Применение
                  </button>
                  <button
                    onClick={() => setActiveTab('installation')}
                    className={`px-6 py-4 font-semibold whitespace-nowrap ${
                      activeTab === 'installation'
                        ? 'text-primary border-b-2 border-primary'
                        : 'text-gray-600 dark:text-gray-400 hover:text-primary'
                    }`}
                  >
                    Установка
                  </button>
                  <button
                    onClick={() => setActiveTab('reviews')}
                    className={`px-6 py-4 font-semibold whitespace-nowrap ${
                      activeTab === 'reviews'
                        ? 'text-primary border-b-2 border-primary'
                        : 'text-gray-600 dark:text-gray-400 hover:text-primary'
                    }`}
                  >
                    Отзывы ({product.reviewCount})
                  </button>
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'description' && (
                  <div>
                    <h3 className="font-heading font-bold text-h3-desktop text-primary dark:text-white mb-6">
                      Подробное описание
                    </h3>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      <div className="lg:col-span-2">
                        <div className="prose prose-lg max-w-none dark:prose-invert mb-8">
                          {product.fullDescription.split('\n\n').map((paragraph, index) => (
                            <p key={index} className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                              {paragraph}
                            </p>
                          ))}
                        </div>
                        
                        <h4 className="font-heading font-semibold text-h4-desktop text-primary dark:text-white mb-4">
                          Технические особенности
                        </h4>
                        <div className="prose prose-lg max-w-none dark:prose-invert">
                          {product.technicalDescription.split('\n\n').map((paragraph, index) => (
                            <p key={index} className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                              {paragraph}
                            </p>
                          ))}
                        </div>
                      </div>
                      
                      <div className="lg:col-span-1">
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                          <h4 className="font-heading font-semibold text-primary dark:text-white mb-4">
                            Особенности и преимущества
                          </h4>
                          <div className="space-y-4">
                            {product.features.map((feature, index) => (
                              <div key={index} className="flex items-start">
                                <div className="bg-primary/10 rounded-lg p-2 mr-3 flex-shrink-0">
                                  <div className="text-primary">
                                    {feature.icon}
                                  </div>
                                </div>
                                <div>
                                  <h5 className="font-semibold text-primary dark:text-white text-sm mb-1">
                                    {feature.title}
                                  </h5>
                                  <p className="text-sm text-gray-600 dark:text-gray-300">
                                    {feature.description}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'specifications' && (
                  <div>
                    <h3 className="font-heading font-bold text-h3-desktop text-primary dark:text-white mb-6">
                      Технические характеристики
                    </h3>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                      {/* Categories Sidebar */}
                      <div className="lg:col-span-1">
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                          <h4 className="font-semibold text-primary dark:text-white mb-4">
                            Категории
                          </h4>
                          <div className="space-y-2">
                            {product.specifications.map((specGroup, index) => (
                              <button
                                key={index}
                                onClick={() => setSelectedSpecCategory(specGroup.category)}
                                className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                                  selectedSpecCategory === specGroup.category
                                    ? 'bg-primary text-white'
                                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                                }`}
                              >
                                {specGroup.category}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      {/* Specifications Content */}
                      <div className="lg:col-span-3">
                        {product.specifications.map((specGroup) => (
                          <div 
                            key={specGroup.category}
                            className={selectedSpecCategory === specGroup.category ? 'block' : 'hidden'}
                          >
                            <h4 className="font-heading font-semibold text-h4-desktop text-primary dark:text-white mb-4">
                              {specGroup.category}
                            </h4>
                            <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
                              <table className="w-full">
                                <tbody>
                                  {Object.entries(specGroup.specifications).map(([key, value], index) => (
                                    <tr 
                                      key={key}
                                      className={`${
                                        index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-700' : 'bg-white dark:bg-gray-800'
                                      }`}
                                    >
                                      <td className="py-3 px-4 border-b border-gray-100 dark:border-gray-700 text-gray-600 dark:text-gray-400 w-1/2">
                                        {key}
                                      </td>
                                      <td className="py-3 px-4 border-b border-gray-100 dark:border-gray-700 font-semibold text-gray-900 dark:text-white w-1/2">
                                        {value}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'applications' && (
                  <div>
                    <h3 className="font-heading font-bold text-h3-desktop text-primary dark:text-white mb-6">
                      Сферы применения
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                      {product.applications.map((application, index) => (
                        <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 hover:shadow-card transition-shadow">
                          <div className="flex items-center mb-4">
                            <div className="bg-primary/10 rounded-lg p-3 mr-4">
                              <div className="text-primary">
                                {application.icon}
                              </div>
                            </div>
                            <h4 className="font-heading font-semibold text-lg text-primary dark:text-white">
                              {application.title}
                            </h4>
                          </div>
                          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                            {application.description}
                          </p>
                          
                          <div className="space-y-3">
                            <div>
                              <h5 className="font-semibold text-primary dark:text-white mb-2 text-sm">
                                Преимущества:
                              </h5>
                              <ul className="space-y-1">
                                {application.benefits.map((benefit, idx) => (
                                  <li key={idx} className="flex items-start text-sm">
                                    <Check className="h-4 w-4 text-green-600 mr-2 mt-0.5" />
                                    <span className="text-gray-600 dark:text-gray-300">{benefit}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            <div>
                              <h5 className="font-semibold text-primary dark:text-white mb-2 text-sm">
                                Рекомендуется для:
                              </h5>
                              <ul className="space-y-1">
                                {application.recommendedFor.map((rec, idx) => (
                                  <li key={idx} className="flex items-start text-sm">
                                    <Check className="h-4 w-4 text-blue-600 mr-2 mt-0.5" />
                                    <span className="text-gray-600 dark:text-gray-300">{rec}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                      <h4 className="font-heading font-semibold text-lg text-primary dark:text-white mb-4">
                        Рекомендации по выбору
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <h5 className="font-semibold text-primary dark:text-white mb-2">
                              Правильный выбор оборудования:
                            </h5>
                            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                              <li className="flex items-start">
                                <Check className="h-4 w-4 text-green-600 mr-2 mt-1" />
                                <span>Учитывайте площадь и высоту помещения</span>
                              </li>
                              <li className="flex items-start">
                                <Check className="h-4 w-4 text-green-600 mr-2 mt-1" />
                                <span>Определите тепловые нагрузки</span>
                              </li>
                              <li className="flex items-start">
                                <Check className="h-4 w-4 text-green-600 mr-2 mt-1" />
                                <span>Рассмотрите режим эксплуатации</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <h5 className="font-semibold text-primary dark:text-white mb-2">
                              Дополнительные факторы:
                            </h5>
                            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                              <li className="flex items-start">
                                <Check className="h-4 w-4 text-green-600 mr-2 mt-1" />
                                <span>Количество людей в помещении</span>
                              </li>
                              <li className="flex items-start">
                                <Check className="h-4 w-4 text-green-600 mr-2 mt-1" />
                                <span>Наличие тепловыделяющего оборудования</span>
                              </li>
                              <li className="flex items-start">
                                <Check className="h-4 w-4 text-green-600 mr-2 mt-1" />
                                <span>Требования к уровню шума</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6 p-4 bg-white dark:bg-gray-700 rounded-lg">
                        <div className="flex items-start">
                          <Info className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            <strong className="text-primary dark:text-white">Совет эксперта:</strong> Для точного подбора оборудования рекомендуется провести 
                            теплотехнический расчет с учетом всех особенностей объекта. Наши специалисты помогут 
                            выбрать оптимальное решение для ваших задач.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'installation' && (
                  <div>
                    <h3 className="font-heading font-bold text-h3-desktop text-primary dark:text-white mb-6">
                      Информация об установке
                    </h3>
                    
                    {/* Installation Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center shadow-sm">
                        <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                          <Zap className="h-8 w-8 text-primary" />
                        </div>
                        <h4 className="font-semibold text-primary dark:text-white mb-2">Сложность</h4>
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                          product.installation.complexity === 'простая' 
                            ? 'text-green-600 bg-green-100 dark:bg-green-900/20' 
                            : product.installation.complexity === 'средняя'
                              ? 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20'
                              : 'text-red-600 bg-red-100 dark:bg-red-900/20'
                        }`}>
                          {product.installation.complexity}
                        </span>
                      </div>
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center shadow-sm">
                        <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                          <Clock className="h-8 w-8 text-primary" />
                        </div>
                        <h4 className="font-semibold text-primary dark:text-white mb-2">Время установки</h4>
                        <p className="text-gray-600 dark:text-gray-300">{product.installation.timeRequired || product.installation.time || 'По запросу'}</p>
                      </div>
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center shadow-sm">
                        <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                          <Shield className="h-8 w-8 text-primary" />
                        </div>
                        <h4 className="font-semibold text-primary dark:text-white mb-2">Гарантия</h4>
                        <p className="text-gray-600 dark:text-gray-300">{product.installation.warranty || 'По запросу'}</p>
                      </div>
                    </div>

                    {/* Requirements and Steps */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                      <div>
                        <h4 className="font-heading font-semibold text-h4-desktop text-primary dark:text-white mb-4">
                          Требования к установке
                        </h4>
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                          <ul className="space-y-3">
                            {product.installation.requirements ? product.installation.requirements.map((req, index) => (
                              <li key={index} className="flex items-start">
                                <Check className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
                                <span className="text-gray-600 dark:text-gray-300">{req}</span>
                              </li>
                            )) : (
                              <li className="flex items-start">
                                <Check className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
                                <span className="text-gray-600 dark:text-gray-300">Стандартные требования к монтажу</span>
                              </li>
                            )}
                          </ul>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-heading font-semibold text-h4-desktop text-primary dark:text-white mb-4">
                          Необходимые инструменты и материалы
                        </h4>
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                          <div className="mb-4">
                            <h5 className="font-semibold text-primary dark:text-white mb-2 text-sm">
                              Инструменты:
                            </h5>
                            <ul className="space-y-1">
                              {product.installation.tools.map((tool, idx) => (
                                <li key={idx} className="flex items-start text-sm">
                                  <Check className="h-4 w-4 text-blue-600 mr-2 mt-0.5" />
                                  <span className="text-gray-600 dark:text-gray-300">{tool}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h5 className="font-semibold text-primary dark:text-white mb-2 text-sm">
                              Материалы:
                            </h5>
                            <ul className="space-y-1">
                              {product.installation.materials.map((material, idx) => (
                                <li key={idx} className="flex items-start text-sm">
                                  <Check className="h-4 w-4 text-green-600 mr-2 mt-0.5" />
                                  <span className="text-gray-600 dark:text-gray-300">{material}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Installation Steps */}
                    <div className="mb-8">
                      <h4 className="font-heading font-semibold text-h4-desktop text-primary dark:text-white mb-4">
                        Этапы установки
                      </h4>
                      <div className="space-y-4">
                        {product.installation.steps.map((step, index) => (
                          <div key={index} className="flex items-start bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
                            <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold mr-4 flex-shrink-0 mt-1">
                              {index + 1}
                            </div>
                            <div className="flex-1">
                              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{step}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA for Installation */}
                    <div className="bg-primary rounded-lg p-6 text-center">
                      <h4 className="font-heading font-bold text-white mb-3">
                        Профессиональная установка {fullName}
                      </h4>
                      <p className="text-white/90 mb-6">
                        Наши сертифицированные специалисты выполнят монтаж с соблюдением всех технических требований 
                        и предоставят полную гарантию на выполненные работы
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button 
                          onClick={handleOrderInstallation}
                          className="bg-accent hover:bg-opacity-90 text-white font-semibold py-3 px-6 rounded-md transition-colors"
                        >
                          Заказать установку
                        </button>
                        <button className="bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-md transition-colors">
                          Рассчитать стоимость
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div>
                    <h3 className="font-heading font-bold text-h3-desktop text-primary dark:text-white mb-6">
                      Отзывы покупателей
                    </h3>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
                      {/* Rating Summary */}
                      <div className="lg:col-span-1">
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                          <div className="text-center mb-4">
                            <div className="text-5xl font-bold text-primary dark:text-white mb-2">
                              {product.rating}
                            </div>
                            <div className="flex justify-center mb-2">
                              {renderStars(product.rating)}
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                              На основе {product.reviewCount} отзывов
                            </p>
                          </div>
                          
                          <div className="space-y-2">
                            {[5, 4, 3, 2, 1].map((star) => {
                              // Simulate rating distribution
                              const percentage = star === 5 ? 70 : 
                                                star === 4 ? 20 : 
                                                star === 3 ? 7 : 
                                                star === 2 ? 2 : 1;
                              return (
                                <div key={star} className="flex items-center">
                                  <span className="text-sm text-gray-600 dark:text-gray-400 w-8">
                                    {star} <Star className="h-3 w-3 inline-block text-accent fill-accent" />
                                  </span>
                                  <div className="flex-1 mx-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                    <div 
                                      className="h-full bg-accent rounded-full"
                                      style={{ width: `${percentage}%` }}
                                    />
                                  </div>
                                  <span className="text-sm text-gray-600 dark:text-gray-400 w-8 text-right">
                                    {percentage}%
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                      
                      {/* Reviews List */}
                      <div className="lg:col-span-3">
                        {product.reviewCount > 0 ? (
                          <div className="space-y-6">
                            {/* Simulated reviews */}
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                              <div className="flex justify-between mb-3">
                                <div>
                                  <h4 className="font-semibold text-primary dark:text-white">
                                    Александр П.
                                  </h4>
                                  <div className="flex items-center mt-1">
                                    {renderStars(5)}
                                    <span className="text-gray-500 dark:text-gray-400 ml-2 text-sm">
                                      5.0
                                    </span>
                                  </div>
                                </div>
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                  12.03.2025
                                </span>
                              </div>
                              <p className="text-gray-600 dark:text-gray-300 mb-3">
                                Отличный кондиционер! Работает тихо, быстро охлаждает помещение. Установка прошла без проблем, 
                                мастера выполнили все аккуратно и профессионально. Рекомендую!
                              </p>
                              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                <Check className="h-4 w-4 text-green-600 mr-1" />
                                <span>Подтвержденная покупка</span>
                              </div>
                            </div>
                            
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                              <div className="flex justify-between mb-3">
                                <div>
                                  <h4 className="font-semibold text-primary dark:text-white">
                                    Елена С.
                                  </h4>
                                  <div className="flex items-center mt-1">
                                    {renderStars(4)}
                                    <span className="text-gray-500 dark:text-gray-400 ml-2 text-sm">
                                      4.0
                                    </span>
                                  </div>
                                </div>
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                  05.02.2025
                                </span>
                              </div>
                              <p className="text-gray-600 dark:text-gray-300 mb-3">
                                Хороший кондиционер за свои деньги. Немного шумноват на максимальной мощности, 
                                но в целом я довольна покупкой. Особенно радует экономичность и функция самоочистки.
                              </p>
                              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                <Check className="h-4 w-4 text-green-600 mr-1" />
                                <span>Подтвержденная покупка</span>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                            <div className="bg-gray-100 dark:bg-gray-700 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                              <Star className="h-10 w-10 text-gray-400" />
                            </div>
                            <h4 className="font-heading font-semibold text-primary dark:text-white mb-3">
                              Будьте первым, кто оставит отзыв
                            </h4>
                            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                              Поделитесь своим опытом использования этого товара и помогите другим покупателям сделать правильный выбор
                            </p>
                            <button className="bg-primary hover:bg-opacity-90 text-white font-semibold py-3 px-6 rounded-md transition-colors">
                              Написать отзыв
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Related Products */}
        {relatedProductsList.length > 0 && (
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-primary dark:text-white">
                  Похожие товары
                </h2>
                <Link 
                  to={`/catalog/${product.category}`}
                  className="text-secondary hover:text-primary dark:hover:text-white transition-colors flex items-center"
                >
                  <span>Все товары</span>
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProductsList.map((relatedProduct) => (
                  <EnhancedProductCard
                    key={relatedProduct.id}
                    product={relatedProduct}
                    showQuickView={false}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Navigation */}
        <section className="py-8 bg-lightBg dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
              <Link 
                to={`/catalog/${product.category}`}
                className="inline-flex items-center text-secondary hover:text-primary dark:hover:text-white"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Назад к каталогу
              </Link>
              
              <Link 
                to="/contacts"
                className="inline-flex items-center text-secondary hover:text-primary dark:hover:text-white"
              >
                Есть вопросы? Свяжитесь с нами
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </div>
          </div>
        </section>

        {/* Consultation Form Modal */}
        {showConsultationForm && (
          <ConsultationForm
            onClose={() => setShowConsultationForm(false)}
            onSubmit={handleFormSubmit}
            value={formData}
            setValue={setFormData}
          />
        )}

        {/* Installation Form Modal */}
        {showInstallationForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-lg w-full">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="font-heading font-bold text-h3-mobile md:text-h3-desktop text-primary dark:text-white">
                      Заказать установку
                    </h3>
                      <p className="text-gray-600 dark:text-gray-400 mt-1">
                        {fullName}
                    </p>
                  </div>
                  <button 
                    onClick={() => setShowInstallationForm(false)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
                      Ваше имя*
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full p-3 rounded-md bg-lightBg dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
                      Телефон*
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full p-3 rounded-md bg-lightBg dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full p-3 rounded-md bg-lightBg dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
                      Адрес установки*
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full p-3 rounded-md bg-lightBg dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Укажите адрес для выезда мастера"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-accent hover:bg-opacity-90 text-white font-semibold py-3 px-6 rounded-md transition-colors"
                  >
                    Заказать установку
                  </button>
                </form>
                
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <Check className="h-4 w-4 text-green-600 mr-2" />
                      Выезд мастера бесплатно
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <Check className="h-4 w-4 text-green-600 mr-2" />
                      Гарантия на работы
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default EnhancedProductPage;