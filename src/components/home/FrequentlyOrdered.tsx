import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import { Star, Info, X, TrendingUp } from 'lucide-react';
import ConsultationForm, { ConsultationFormData } from '../catalog/ConsultationForm';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface PopularItem {
  id: number;
  name: string;
  category: string;
  price: string;
  originalPrice?: string;
  image: string;
  rating: number;
  orderCount: number;
  description: string;
  features: string[];
  isHot?: boolean;
  discount?: string;
}

const popularItems: PopularItem[] = [
  {
    id: 1,
    name: 'Настенный кондиционер Daikin FTXB25C',
    category: 'Кондиционеры',
    price: 'от 38 900 ₽',
    originalPrice: '42 500 ₽',
    image: 'https://images.pexels.com/photos/4270511/pexels-photo-4270511.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.8,
    orderCount: 156,
    description: 'Инверторная сплит-система для помещений до 25 м²',
    features: ['Энергоэффективность A++', 'Низкий уровень шума', 'Wi-Fi управление'],
    isHot: true,
    discount: '15%'
  },
  {
    id: 2,
    name: 'Приточно-вытяжная установка ПВУ-350',
    category: 'Вентиляция',
    price: 'от 67 900 ₽',
    image: 'https://images.pexels.com/photos/8486972/pexels-photo-8486972.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.7,
    orderCount: 89,
    description: 'Компактная установка с рекуперацией тепла',
    features: ['Рекуперация до 85%', 'Автоматическое управление', 'Компактные размеры']
  },
  {
    id: 3,
    name: 'Тепловая завеса Тепломаш КЭВ-6П',
    category: 'Отопление',
    price: 'от 15 600 ₽',
    image: 'https://images.pexels.com/photos/7109803/pexels-photo-7109803.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.6,
    orderCount: 124,
    description: 'Электрическая завеса для проемов до 2.2 м',
    features: ['Быстрый нагрев', 'Защита от холода', 'Простой монтаж'],
    isHot: true
  },
  {
    id: 4,
    name: 'VRF система Mitsubishi City Multi',
    category: 'Кондиционеры',
    price: 'от 185 000 ₽',
    image: 'https://images.pexels.com/photos/4489794/pexels-photo-4489794.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.9,
    orderCount: 45,
    description: 'Мультизональная система для больших объектов',
    features: ['До 50 внутренних блоков', 'Индивидуальное управление', 'Высокая эффективность']
  },
  {
    id: 5,
    name: 'Канальный вентилятор ВЕНТС ВКП',
    category: 'Вентиляция',
    price: 'от 4 590 ₽',
    image: 'https://images.pexels.com/photos/7191981/pexels-photo-7191981.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.5,
    orderCount: 203,
    description: 'Надежный канальный вентилятор',
    features: ['Низкий уровень шума', 'Долгий срок службы', 'Простое обслуживание']
  },
  {
    id: 6,
    name: 'Увлажнитель воздуха Venta LW45',
    category: 'Климат',
    price: 'от 25 900 ₽',
    originalPrice: '28 700 ₽',
    image: 'https://images.pexels.com/photos/9799818/pexels-photo-9799818.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.7,
    orderCount: 78,
    description: 'Мойка воздуха для помещений до 80 м²',
    features: ['Без сменных фильтров', 'Естественное увлажнение', 'Очистка воздуха'],
    discount: '10%'
  }
];

const FrequentlyOrdered: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [showDetails, setShowDetails] = useState<number | null>(null);
  const [showConsultationForm, setShowConsultationForm] = useState(false);
  const [formData, setFormData] = useState<ConsultationFormData>({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  const categories = ['Все', 'Кондиционеры', 'Вентиляция', 'Отопление', 'Климат'];

  const filteredItems = selectedCategory === 'Все' 
    ? popularItems 
    : popularItems.filter(item => item.category === selectedCategory);

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

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Consultation form submitted:', formData);
    setShowConsultationForm(false);
    setFormData({ name: '', phone: '', email: '', message: '' });
    alert('Спасибо! Мы свяжемся с вами в ближайшее время.');
  };

  return (
    <section className="py-16 bg-lightBg dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <TrendingUp className="h-8 w-8 text-accent mr-3" />
            <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-primary dark:text-white">
              Часто заказывают
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-lg">
            Самые популярные решения среди наших клиентов — проверенное качество и оптимальное соотношение цена-качество
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 hover:bg-primary/10 hover:text-primary'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Swiper */}
        <Swiper
          modules={[Navigation, Pagination, A11y]}
          spaceBetween={32}
          slidesPerView={1}
          navigation={{
            nextEl: '.frequently-swiper-button-next',
            prevEl: '.frequently-swiper-button-prev',
          }}
          pagination={{ 
            clickable: true, 
            dynamicBullets: true,
            el: '.frequently-swiper-pagination',
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 32,
            },
          }}
          className="frequently-swiper mb-12"
          grabCursor={true}
          touchRatio={1}
          touchAngle={45}
          a11y={{
            prevSlideMessage: 'Предыдущий товар',
            nextSlideMessage: 'Следующий товар',
            firstSlideMessage: 'Это первый товар',
            lastSlideMessage: 'Это последний товар',
            paginationBulletMessage: 'Перейти к товару {{index}}'
          }}
        >
          {filteredItems.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-card overflow-hidden group hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between h-full">
                {/* Image and Badges */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {item.isHot && (
                      <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        ХИТ
                      </span>
                    )}
                    {item.discount && (
                      <span className="bg-accent text-white px-2 py-1 rounded-full text-xs font-bold">
                        -{item.discount}
                      </span>
                    )}
                  </div>
                  <div className="absolute top-3 right-3 bg-white/90 dark:bg-gray-800/90 px-2 py-1 rounded-full">
                    <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                      {item.orderCount} заказов
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-grow">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-secondary font-semibold">{item.category}</span>
                    <div className="flex items-center">
                      {renderStars(item.rating)}
                      <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                        {item.rating}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-heading font-semibold text-primary dark:text-white mb-2 line-clamp-2 group-hover:text-secondary transition-colors">
                    {item.name}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                    {item.description}
                  </p>

                  {/* Features */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {item.features.slice(0, 2).map((feature, index) => (
                        <span 
                          key={index}
                          className="text-xs bg-lightBg dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-1 rounded"
                        >
                          {feature}
                        </span>
                      ))}
                      {item.features.length > 2 && (
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          +{item.features.length - 2} еще
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Price and Actions */}
                <div className="flex items-center justify-between p-6 pt-0">
                  <div>
                    <div className="text-xl font-bold text-primary dark:text-white">
                      {item.price}
                    </div>
                    {item.originalPrice && (
                      <div className="text-sm text-gray-500 line-through">
                        {item.originalPrice}
                      </div>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setShowDetails(item.id)}
                      className="p-2 bg-lightBg dark:bg-gray-800 hover:bg-primary hover:text-white rounded-lg transition-colors"
                      title="Подробнее"
                      aria-label="Подробнее о товаре"
                    >
                      <Info className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
          
          {/* Custom Navigation */}
          <div className="frequently-swiper-button-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </div>
          <div className="frequently-swiper-button-next absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
          
          {/* Custom Pagination */}
          <div className="frequently-swiper-pagination mt-8 text-center"></div>
        </Swiper>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <div className="bg-primary rounded-2xl p-8 md:p-12">
            <h3 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-white mb-4">
              Не нашли подходящее решение?
            </h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Наши специалисты помогут подобрать оптимальное оборудование под ваши задачи и бюджет
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                className="bg-accent hover:bg-opacity-90 text-white font-semibold py-3 px-8 rounded-md transition-colors"
                onClick={() => setShowConsultationForm(true)}
              >
                Получить консультацию
              </button>
              <a 
                href="/catalog" 
                className="bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-8 rounded-md transition-colors flex items-center justify-center"
              >
                Весь каталог
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Details Modal */}
      {showDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {(() => {
              const item = popularItems.find(p => p.id === showDetails);
              if (!item) return null;
              
              return (
                <div className="p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="font-heading font-bold text-h3-mobile md:text-h3-desktop text-primary dark:text-white">
                        {item.name}
                      </h3>
                      <p className="text-secondary">{item.category}</p>
                    </div>
                    <button
                      onClick={() => setShowDetails(null)}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      aria-label="Закрыть"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>
                  
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-64 object-cover rounded-lg mb-6"
                  />
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {item.description}
                  </p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-primary dark:text-white mb-3">Особенности:</h4>
                    <ul className="space-y-2">
                      {item.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-gray-600 dark:text-gray-300">
                          <div className="w-2 h-2 bg-secondary rounded-full mr-3" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-primary dark:text-white">
                        {item.price}
                      </div>
                      {item.originalPrice && (
                        <div className="text-gray-500 line-through">
                          {item.originalPrice}
                        </div>
                      )}
                    </div>
                    <button 
                      className="bg-accent hover:bg-opacity-90 text-white font-semibold py-3 px-6 rounded-md transition-colors"
                      onClick={() => {
                        setShowDetails(null);
                        setShowConsultationForm(true);
                      }}
                    >
                      Заказать консультацию
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {showConsultationForm && (
        <ConsultationForm
          onClose={() => setShowConsultationForm(false)}
          onSubmit={handleFormSubmit}
          value={formData}
          setValue={setFormData}
        />
      )}
    </section>
  );
};

export default FrequentlyOrdered;