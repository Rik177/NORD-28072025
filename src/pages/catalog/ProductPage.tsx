import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import SEOHelmet from '../../components/shared/SEOHelmet';
import Header from '../../components/home/Header';
import Footer from '../../components/home/Footer';
import Breadcrumbs from '../../components/shared/Breadcrumbs';
import ProductApplications from '../../components/catalog/ProductApplications';
import ProductInstallation from '../../components/catalog/ProductInstallation';
import ProductRecommendations from '../../components/catalog/ProductRecommendations';
import { extendedProductData } from '../../data/productData';
import { Star, Heart, Share2, ChevronLeft, ChevronRight, Check, X, Phone, Mail } from 'lucide-react';
import { useComparison } from '../../hooks/useComparison';
import ConsultationForm from '../../components/catalog/ConsultationForm';
import { ConsultationFormData } from '../../components/catalog/ConsultationForm';

const relatedProductsData = [
  {
    id: 'mitsubishi-msz-ln25vg',
    name: 'Кондиционер Mitsubishi MSZ-LN25VG',
    price: 45600,
    image: 'https://images.pexels.com/photos/4489794/pexels-photo-4489794.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.9
  },
  {
    id: 'carrier-42qhc012ds',
    name: 'Кондиционер Carrier 42QHC012DS',
    price: 67800,
    image: 'https://images.pexels.com/photos/7191981/pexels-photo-7191981.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.7
  }
];

const ProductPage: React.FC = () => {
  const { category, productId } = useParams<{ category: string; productId: string }>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'applications' | 'installation' | 'reviews'>('description');
  const [showPriceForm, setShowPriceForm] = useState(false);
  const [showConsultationForm, setShowConsultationForm] = useState(false);
  const [showInstallationForm, setShowInstallationForm] = useState(false);
  const [formData, setFormData] = useState<ConsultationFormData>({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  
  const { addToComparison, isInComparison } = useComparison();

  const product = extendedProductData[productId || ''];

  if (!product) {
    return <Navigate to="/catalog\" replace />;
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.fullDescription,
    "image": product.images,
    "brand": {
      "@type": "Brand",
      "name": product.brand
    },
    "model": product.model,
    "offers": {
      "@type": "Offer",
      "price": product.price,
      "priceCurrency": "RUB",
      "availability": "https://schema.org/InStock",
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
    console.log('Order installation for:', product.name);
  };
  
  const handleAddToComparison = () => {
    const comparisonProduct = {
      id: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      image: product.images[0],
      specifications: product.specifications,
      rating: product.rating,
      features: product.features,
      category: product.category
    };
    addToComparison(comparisonProduct);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ name: '', phone: '', email: '', message: '' });
    setShowPriceForm(false);
    setShowConsultationForm(false);
    setShowInstallationForm(false);
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

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <SEOHelmet
        title={`${product.name} - ${product.brand} | НОРДИНЖИНИРИНГ`}
        description={`${product.fullDescription} Цена: ${product.price.toLocaleString()} ₽. Профессиональная установка и гарантия. Заказать в НОРДИНЖИНИРИНГ.`}
        keywords={`${product.name}, ${product.brand}, ${product.model}, купить, цена, установка, ${product.category}`}
        canonical={`https://nordengineering.ru/catalog/${product.category}/${product.id}`}
        ogTitle={`${product.name} - Купить с установкой`}
        ogDescription={`${product.description} Цена: ${product.price.toLocaleString()} ₽. Профессиональная установка и гарантия.`}
        ogImage={product.images[0]}
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
                <div className="relative mb-4">
                  <img
                    src={product.images[currentImageIndex]}
                    alt={product.name}
                    className="w-full h-96 object-cover rounded-lg"
                  />
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
                </div>
                
                {/* Thumbnail Gallery */}
                <div className="flex space-x-2 overflow-x-auto">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                        index === currentImageIndex ? 'border-primary' : 'border-gray-200 dark:border-gray-700'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div>
                <div className="mb-4">
                  <span className="text-secondary font-semibold">{product.brand}</span>
                  <h1 className="font-heading font-bold text-h1-mobile md:text-h1-desktop text-primary dark:text-white mt-2">
                    {product.name}
                  </h1>
                  <div className="flex items-center mt-2">
                    {renderStars(product.rating)}
                    <span className="text-gray-500 dark:text-gray-400 ml-2">
                      {product.rating} ({product.reviewCount} отзывов)
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {product.description}
                </p>

                {/* Price */}
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
                    <span className="text-accent font-semibold">
                      Экономия: {(product.oldPrice - product.price).toLocaleString()} ₽
                    </span>
                  )}
                </div>

                {/* Key Features */}
                <div className="mb-6">
                  <h3 className="font-heading font-semibold text-h4-desktop text-primary dark:text-white mb-3">
                    Основные характеристики:
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Тип:</span>
                      <span className="font-semibold">{product.specifications['Тип']}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Площадь:</span>
                      <span className="font-semibold">{product.specifications['Площадь охлаждения']}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Мощность:</span>
                      <span className="font-semibold">{product.specifications['Мощность охлаждения']}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Класс:</span>
                      <span className="font-semibold">{product.specifications['Энергоэффективность']}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4">
                  <button
                    onClick={() => setShowPriceForm(true)}
                    className="w-full bg-primary hover:bg-opacity-90 text-white font-semibold py-3 px-6 rounded-md transition-colors"
                  >
                    Узнать цену
                  </button>
                  <button
                    onClick={() => setShowConsultationForm(true)}
                    className="w-full bg-accent hover:bg-opacity-90 text-white font-semibold py-3 px-6 rounded-md transition-colors"
                  >
                    Заказать консультацию
                  </button>
                  <div className="flex space-x-4">
                    <button className="flex-1 flex items-center justify-center py-2 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800">
                      <Heart className="h-5 w-5 mr-2" />
                      В избранное
                    </button>
                    <button 
                      onClick={handleAddToComparison}
                      className={`flex-1 flex items-center justify-center py-2 border rounded-md transition-colors ${
                        isInComparison(product.id)
                          ? 'border-secondary bg-secondary text-white'
                          : 'border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                    >
                      <Share2 className="h-5 w-5 mr-2" />
                      {isInComparison(product.id) ? 'В сравнении' : 'Сравнить'}
                    </button>
                  </div>
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
              <div className="border-b dark:border-gray-700">
                <nav className="flex">
                  <button
                    onClick={() => setActiveTab('description')}
                    className={`px-6 py-4 font-semibold ${
                      activeTab === 'description'
                        ? 'text-primary border-b-2 border-primary'
                        : 'text-gray-600 dark:text-gray-400 hover:text-primary'
                    }`}
                  >
                    Описание
                  </button>
                  <button
                    onClick={() => setActiveTab('specifications')}
                    className={`px-6 py-4 font-semibold ${
                      activeTab === 'specifications'
                        ? 'text-primary border-b-2 border-primary'
                        : 'text-gray-600 dark:text-gray-400 hover:text-primary'
                    }`}
                  >
                    Характеристики
                  </button>
                  <button
                    onClick={() => setActiveTab('applications')}
                    className={`px-6 py-4 font-semibold ${
                      activeTab === 'applications'
                        ? 'text-primary border-b-2 border-primary'
                        : 'text-gray-600 dark:text-gray-400 hover:text-primary'
                    }`}
                  >
                    Применение
                  </button>
                  <button
                    onClick={() => setActiveTab('installation')}
                    className={`px-6 py-4 font-semibold ${
                      activeTab === 'installation'
                        ? 'text-primary border-b-2 border-primary'
                        : 'text-gray-600 dark:text-gray-400 hover:text-primary'
                    }`}
                  >
                    Установка
                  </button>
                  <button
                    onClick={() => setActiveTab('reviews')}
                    className={`px-6 py-4 font-semibold ${
                      activeTab === 'reviews'
                        ? 'text-primary border-b-2 border-primary'
                        : 'text-gray-600 dark:text-gray-400 hover:text-primary'
                    }`}
                  >
                    Отзывы ({product.reviewCount})
                  </button>
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'description' && (
                  <div>
                    <h3 className="font-heading font-bold text-h3-desktop text-primary dark:text-white mb-4">
                      Подробное описание
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                      {product.fullDescription}
                    </p>
                    
                    <h4 className="font-heading font-semibold text-h4-desktop text-primary dark:text-white mb-3">
                      Особенности и преимущества:
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {product.features.map((feature, index) => (
                        <div key={index} className="flex items-center">
                          <Check className="h-5 w-5 text-secondary mr-3 flex-shrink-0" />
                          <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'specifications' && (
                  <div>
                    <h3 className="font-heading font-bold text-h3-desktop text-primary dark:text-white mb-4">
                      Технические характеристики
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {Object.entries(product.specifications).map(([key, value]) => (
                        <div key={key} className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                          <span className="text-gray-600 dark:text-gray-400">{key}:</span>
                          <span className="font-semibold text-primary dark:text-white">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'applications' && (
                  <ProductApplications 
                    applications={product.applications}
                    productName={product.name}
                  />
                )}

                {activeTab === 'installation' && (
                  <ProductInstallation 
                    installation={product.installation}
                    productName={product.name}
                    onOrderInstallation={() => setShowInstallationForm(true)}
                  />
                )}

                {activeTab === 'reviews' && (
                  <div>
                    <h3 className="font-heading font-bold text-h3-desktop text-primary dark:text-white mb-4">
                      Отзывы покупателей
                    </h3>
                    <div className="text-center py-12">
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Отзывы появятся после первых покупок
                      </p>
                      <button className="bg-primary hover:bg-opacity-90 text-white font-semibold py-2 px-6 rounded-md">
                        Оставить отзыв
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Related Products */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-primary dark:text-white mb-8">
              Сопутствующие товары
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProductsData.map((relatedProduct) => (
                <div key={relatedProduct.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-card overflow-hidden">
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-heading font-semibold text-primary dark:text-white mb-2">
                      {relatedProduct.name}
                    </h3>
                    <div className="flex items-center mb-3">
                      {renderStars(relatedProduct.rating)}
                      <span className="text-gray-500 dark:text-gray-400 ml-2 text-sm">
                        {relatedProduct.rating}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-primary dark:text-white">
                        {relatedProduct.price.toLocaleString()} ₽
                      </span>
                      <button
                        onClick={() => setShowPriceForm(true)}
                        className="bg-primary hover:bg-opacity-90 text-white font-semibold py-2 px-4 rounded-md transition-colors text-sm"
                      >
                        Подробнее
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Recommendations */}
        <ProductRecommendations 
          currentProductId={product.id}
          category={product.category}
        />

        {/* Price Form Modal */}
        {showPriceForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-lg w-full">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="font-heading font-bold text-h3-mobile md:text-h3-desktop text-primary dark:text-white">
                      Узнать цену
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      {product.name}
                    </p>
                  </div>
                  <button 
                    onClick={() => setShowPriceForm(false)}
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
                      Email*
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full p-3 rounded-md bg-lightBg dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-primary hover:bg-opacity-90 text-white font-semibold py-3 px-6 rounded-md transition-colors"
                  >
                    Отправить заявку
                  </button>
                </form>
              </div>
            </div>
          </div>
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
                      {product.name}
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

        {/* Consultation Form Modal */}
        {showConsultationForm && (
          <ConsultationForm
            onClose={() => setShowConsultationForm(false)}
            onSubmit={handleFormSubmit}
            value={formData}
            setValue={setFormData}
          />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ProductPage;