import React from 'react';
import SEOHelmet from '../components/shared/SEOHelmet';
import Header from '../components/home/Header';
import Footer from '../components/home/Footer';
import Breadcrumbs from '../components/shared/Breadcrumbs';
import { Star, ExternalLink, Award, CheckCircle } from 'lucide-react';

interface Brand {
  id: string;
  name: string;
  logo: string;
  description: string;
  country: string;
  founded: string;
  specialization: string[];
  rating: number;
  productsCount: number;
  website: string;
  isPartner: boolean;
  certifications: string[];
}

const brands: Brand[] = [
  {
    id: 'daikin',
    name: 'Daikin',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/c/ce/Daikin-logo-png-transparent.png',
    description: 'Мировой лидер в области климатических технологий с более чем 90-летним опытом.',
    country: 'Япония',
    founded: '1924',
    specialization: ['Кондиционеры', 'Тепловые насосы', 'Холодильное оборудование'],
    rating: 4.9,
    productsCount: 156,
    website: 'https://www.daikin.ru',
    isPartner: true,
    certifications: ['ISO 9001', 'ISO 14001', 'EUROVENT']
  },
  {
    id: 'mitsubishi',
    name: 'Mitsubishi Electric',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/Mitsubishi_Electric_logo.svg',
    description: 'Инновационные решения в области климатического оборудования и автоматизации.',
    country: 'Япония',
    founded: '1921',
    specialization: ['VRF системы', 'Кондиционеры', 'Вентиляция'],
    rating: 4.8,
    productsCount: 124,
    website: 'https://www.mitsubishielectric.ru',
    isPartner: true,
    certifications: ['ISO 9001', 'AHRI', 'CE']
  },
  {
    id: 'carrier',
    name: 'Carrier',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Carrier_Corporation_logo.svg',
    description: 'Изобретатель современного кондиционирования воздуха, лидер инноваций.',
    country: 'США',
    founded: '1915',
    specialization: ['Чиллеры', 'Кондиционеры', 'Холодильное оборудование'],
    rating: 4.7,
    productsCount: 98,
    website: 'https://www.carrier.com',
    isPartner: true,
    certifications: ['AHRI', 'UL', 'ENERGY STAR']
  },
  {
    id: 'toshiba',
    name: 'Toshiba',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2b/Toshiba_logo.svg',
    description: 'Передовые технологии и высокое качество японского производства.',
    country: 'Япония',
    founded: '1875',
    specialization: ['Кондиционеры', 'VRF системы', 'Тепловые насосы'],
    rating: 4.6,
    productsCount: 87,
    website: 'https://www.toshiba-aircon.ru',
    isPartner: false,
    certifications: ['ISO 9001', 'JIS', 'CE']
  },
  {
    id: 'panasonic',
    name: 'Panasonic',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/9/9e/Panasonic_logo.svg',
    description: 'Экологичные и энергоэффективные решения для комфортного климата.',
    country: 'Япония',
    founded: '1918',
    specialization: ['Кондиционеры', 'Вентиляция', 'Очистители воздуха'],
    rating: 4.5,
    productsCount: 76,
    website: 'https://www.panasonic.ru',
    isPartner: false,
    certifications: ['ISO 14001', 'ENERGY STAR', 'EUROVENT']
  },
  {
    id: 'lg',
    name: 'LG Electronics',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/3/36/LG_logo_%282015%29.svg',
    description: 'Инновационные технологии и стильный дизайн в климатическом оборудовании.',
    country: 'Южная Корея',
    founded: '1958',
    specialization: ['Кондиционеры', 'VRF системы', 'Чиллеры'],
    rating: 4.4,
    productsCount: 65,
    website: 'https://www.lg.com',
    isPartner: false,
    certifications: ['ISO 9001', 'AHRI', 'CE']
  }
];

const Brands: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = React.useState('Все бренды');
  const [filteredBrands, setFilteredBrands] = React.useState(brands);

  const categories = ['Все бренды', 'Партнеры', 'Японские', 'Европейские', 'Американские'];

  React.useEffect(() => {
    let filtered = brands;

    switch (selectedCategory) {
      case 'Партнеры':
        filtered = brands.filter(brand => brand.isPartner);
        break;
      case 'Японские':
        filtered = brands.filter(brand => brand.country === 'Япония');
        break;
      case 'Европейские':
        filtered = brands.filter(brand => brand.country === 'Германия' || brand.country === 'Италия');
        break;
      case 'Американские':
        filtered = brands.filter(brand => brand.country === 'США');
        break;
      default:
        filtered = brands;
    }

    setFilteredBrands(filtered);
  }, [selectedCategory]);

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

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Бренды климатического оборудования",
    "description": "Официальные партнеры и поставщики климатического оборудования НОРДИНЖИНИРИНГ",
    "url": "https://nordengineering.ru/brands"
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <SEOHelmet
        title="Бренды климатического оборудования - НОРДИНЖИНИРИНГ"
        description="Официальные партнеры и поставщики: Daikin, Mitsubishi, Carrier, Toshiba, Panasonic. Качественное климатическое оборудование от ведущих мировых производителей."
        keywords="бренды кондиционеров, Daikin, Mitsubishi, Carrier, производители климатического оборудования"
        canonical="https://nordengineering.ru/brands"
        structuredData={structuredData}
      />
      <Header />
      <main className="pb-12">
        <Breadcrumbs />
        
        {/* Hero Section */}
        <section className="bg-primary py-12">
          <div className="container mx-auto px-4">
            <h1 className="font-heading font-bold text-h1-mobile md:text-h1-desktop text-white text-center mb-6">
              Бренды оборудования
            </h1>
            <p className="text-white/90 text-center max-w-2xl mx-auto">
              Мы работаем только с проверенными производителями климатического оборудования, 
              которые зарекомендовали себя на мировом рынке
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 border-b border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-primary text-white shadow-lg'
                      : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-primary/10 hover:text-primary border border-gray-200 dark:border-gray-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Brands Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBrands.map((brand) => (
                <div
                  key={brand.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-card overflow-hidden hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
                >
                  {/* Brand Header */}
                  <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                      <img
                        src={brand.logo}
                        alt={`Логотип ${brand.name}`}
                        className="h-12 w-auto object-contain"
                      />
                      {brand.isPartner && (
                        <span className="bg-accent text-white px-3 py-1 rounded-full text-sm font-semibold">
                          Партнер
                        </span>
                      )}
                    </div>
                    
                    <h3 className="font-heading font-bold text-xl text-primary dark:text-white mb-2">
                      {brand.name}
                    </h3>
                    
                    <div className="flex items-center mb-3">
                      {renderStars(brand.rating)}
                      <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                        {brand.rating} / 5.0
                      </span>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {brand.description}
                    </p>
                  </div>

                  {/* Brand Info */}
                  <div className="p-6">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">Страна:</span>
                        <p className="font-semibold text-gray-900 dark:text-white">{brand.country}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">Основан:</span>
                        <p className="font-semibold text-gray-900 dark:text-white">{brand.founded}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">Товаров:</span>
                        <p className="font-semibold text-gray-900 dark:text-white">{brand.productsCount}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">Рейтинг:</span>
                        <p className="font-semibold text-gray-900 dark:text-white">{brand.rating}/5</p>
                      </div>
                    </div>

                    {/* Specialization */}
                    <div className="mb-4">
                      <span className="text-sm text-gray-500 dark:text-gray-400 mb-2 block">Специализация:</span>
                      <div className="flex flex-wrap gap-2">
                        {brand.specialization.map((spec, index) => (
                          <span
                            key={index}
                            className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Certifications */}
                    <div className="mb-6">
                      <span className="text-sm text-gray-500 dark:text-gray-400 mb-2 block">Сертификации:</span>
                      <div className="flex flex-wrap gap-2">
                        {brand.certifications.map((cert, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 px-2 py-1 rounded text-xs"
                          >
                            <CheckCircle className="h-3 w-3 mr-1" />
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-3">
                      <a
                        href={`/catalog?brand=${brand.id}`}
                        className="flex-1 bg-primary hover:bg-opacity-90 text-white font-semibold py-2 px-4 rounded-md transition-colors text-center"
                      >
                        Товары бренда
                      </a>
                      <a
                        href={brand.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        title="Официальный сайт"
                      >
                        <ExternalLink className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Partnership Section */}
        <section className="py-12 bg-lightBg dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-primary dark:text-white mb-6">
                Официальное партнерство
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Мы являемся официальными партнерами ведущих производителей климатического оборудования, 
                что гарантирует подлинность продукции и полную техническую поддержку
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-gray-900 rounded-lg p-6">
                  <Award className="h-12 w-12 text-accent mx-auto mb-4" />
                  <h3 className="font-semibold text-primary dark:text-white mb-2">
                    Официальная гарантия
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Полная заводская гарантия на все оборудование
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-900 rounded-lg p-6">
                  <CheckCircle className="h-12 w-12 text-accent mx-auto mb-4" />
                  <h3 className="font-semibold text-primary dark:text-white mb-2">
                    Подлинность товаров
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    100% оригинальное оборудование от производителя
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-900 rounded-lg p-6">
                  <Star className="h-12 w-12 text-accent mx-auto mb-4" />
                  <h3 className="font-semibold text-primary dark:text-white mb-2">
                    Техническая поддержка
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Полная техническая поддержка от производителей
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Brands;