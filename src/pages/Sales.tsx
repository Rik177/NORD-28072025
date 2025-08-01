import React from 'react';
import Header from '../components/home/Header';
import Footer from '../components/home/Footer';
import Breadcrumbs from '../components/shared/Breadcrumbs';
import { Tag, Clock, ArrowRight, Percent } from 'lucide-react';

interface Sale {
  id: number;
  title: string;
  description: string;
  image: string;
  discount: string;
  endDate: string;
  isHot?: boolean;
}

const sales: Sale[] = [
  {
    id: 1,
    title: 'Скидка 20% на кондиционеры Daikin',
    description: 'Успейте приобрести кондиционеры премиум-класса по выгодной цене. Акция распространяется на серии FTXB и FTXM.',
    image: 'https://images.pexels.com/photos/4270511/pexels-photo-4270511.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    discount: '20%',
    endDate: '31.03.2025',
    isHot: true
  },
  {
    id: 2,
    title: 'Комплект вентиляции со скидкой 15%',
    description: 'При заказе комплекта вентиляции (вентилятор + воздуховоды + решетки) получите скидку на всю систему.',
    image: 'https://images.pexels.com/photos/8486972/pexels-photo-8486972.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    discount: '15%',
    endDate: '15.04.2025'
  },
  {
    id: 3,
    title: 'Бесплатный монтаж тепловой завесы',
    description: 'При покупке тепловой завесы Тепломаш - монтаж в подарок. Акция действует при заказе от 50 000 рублей.',
    image: 'https://images.pexels.com/photos/7109803/pexels-photo-7109803.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    discount: 'Монтаж 0₽',
    endDate: '30.04.2025',
    isHot: true
  },
  {
    id: 4,
    title: 'Скидка на техобслуживание',
    description: 'Закажите годовое техническое обслуживание климатических систем и получите скидку 25% на все работы.',
    image: 'https://images.pexels.com/photos/8961214/pexels-photo-8961214.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    discount: '25%',
    endDate: '01.05.2025'
  }
];

const Sales: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main className="pb-12">
        <Breadcrumbs />
        
        {/* Hero Section */}
        <section className="bg-primary py-12">
          <div className="container mx-auto px-4">
            <h1 className="font-heading font-bold text-h1-mobile md:text-h1-desktop text-white text-center mb-6">
              Акции и спецпредложения
            </h1>
            <p className="text-white/90 text-center max-w-2xl mx-auto">
              Выгодные предложения на оборудование и услуги компании НОРДИНЖИНИРИНГ
            </p>
          </div>
        </section>

        {/* Sales Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {sales.map((sale) => (
                <div 
                  key={sale.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-card overflow-hidden group hover:shadow-card-hover transition-all duration-300"
                >
                  <div className="relative">
                    <img 
                      src={sale.image} 
                      alt={sale.title}
                      className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 flex space-x-2">
                      <div className="bg-accent text-white px-3 py-1 rounded-full flex items-center">
                        <Percent className="h-4 w-4 mr-1" />
                        <span className="font-semibold">{sale.discount}</span>
                      </div>
                      {sale.isHot && (
                        <div className="bg-red-500 text-white px-3 py-1 rounded-full flex items-center">
                          <Tag className="h-4 w-4 mr-1" />
                          <span className="font-semibold">Хит</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h2 className="font-heading font-bold text-h3-mobile md:text-h3-desktop text-primary dark:text-white mb-3">
                      {sale.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {sale.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-gray-500 dark:text-gray-400">
                        <Clock className="h-5 w-5 mr-2" />
                        <span>До {sale.endDate}</span>
                      </div>
                      <button className="flex items-center text-secondary hover:text-primary dark:hover:text-white transition-colors">
                        <span className="mr-2">Подробнее</span>
                        <ArrowRight className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 bg-lightBg dark:bg-gray-800">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-primary dark:text-white mb-6">
              Хотите узнавать о новых акциях первыми?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Подпишитесь на нашу рассылку и получайте информацию о специальных предложениях и скидках
            </p>
            <div className="max-w-md mx-auto">
              <div className="flex gap-4">
                <input
                  type="email"
                  placeholder="Ваш email"
                  className="flex-1 px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-900"
                />
                <button className="bg-accent hover:bg-opacity-90 text-white font-semibold px-6 py-3 rounded-md transition-colors">
                  Подписаться
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Sales;