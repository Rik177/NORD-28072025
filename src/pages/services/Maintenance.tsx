import React from 'react';
import Header from '../../components/home/Header';
import Footer from '../../components/home/Footer';
import Breadcrumbs from '../../components/shared/Breadcrumbs';
import ServicesSidebar from '../../components/services/ServicesSidebar';
import { CheckCircle, Calendar, Settings, Filter, Thermometer, Zap, Clock, Shield } from 'lucide-react';

const maintenanceTypes = [
  {
    icon: <Calendar className="h-8 w-8 text-secondary" />,
    title: 'Плановое ТО',
    frequency: 'Каждые 6 месяцев',
    description: 'Регулярное техническое обслуживание для поддержания оптимальной работы системы',
    includes: [
      'Визуальный осмотр оборудования',
      'Проверка креплений и соединений',
      'Измерение параметров работы',
      'Смазка подвижных частей',
      'Проверка автоматики'
    ]
  },
  {
    icon: <Filter className="h-8 w-8 text-secondary" />,
    title: 'Чистка и дезинфекция',
    frequency: 'По необходимости',
    description: 'Очистка воздуховодов, фильтров и теплообменников от загрязнений',
    includes: [
      'Замена воздушных фильтров',
      'Чистка теплообменников',
      'Дезинфекция воздуховодов',
      'Очистка дренажной системы',
      'Промывка внутренних блоков'
    ]
  },
  {
    icon: <Settings className="h-8 w-8 text-secondary" />,
    title: 'Диагностика и настройка',
    frequency: 'При необходимости',
    description: 'Комплексная диагностика с настройкой параметров работы системы',
    includes: [
      'Диагностика всех узлов',
      'Настройка автоматики',
      'Балансировка системы',
      'Проверка датчиков',
      'Калибровка приборов'
    ]
  }
];

const seasonalMaintenance = [
  {
    season: 'Весна',
    icon: <Thermometer className="h-6 w-6 text-green-500" />,
    tasks: [
      'Подготовка к летнему сезону',
      'Проверка системы охлаждения',
      'Замена фильтров',
      'Чистка наружных блоков'
    ]
  },
  {
    season: 'Лето',
    icon: <Zap className="h-6 w-6 text-yellow-500" />,
    tasks: [
      'Контроль работы в пиковые нагрузки',
      'Проверка хладагента',
      'Очистка конденсаторов',
      'Мониторинг энергопотребления'
    ]
  },
  {
    season: 'Осень',
    icon: <Filter className="h-6 w-6 text-orange-500" />,
    tasks: [
      'Подготовка к отопительному сезону',
      'Проверка системы обогрева',
      'Консервация неиспользуемого оборудования',
      'Профилактика автоматики'
    ]
  },
  {
    season: 'Зима',
    icon: <Shield className="h-6 w-6 text-blue-500" />,
    tasks: [
      'Защита от замерзания',
      'Контроль работы в холодное время',
      'Проверка теплообменников',
      'Мониторинг дренажной системы'
    ]
  }
];

const servicePackages = [
  {
    name: 'Базовый',
    price: 'от 5 000 ₽',
    frequency: '2 раза в год',
    features: [
      'Визуальный осмотр',
      'Замена фильтров',
      'Проверка основных параметров',
      'Смазка подвижных частей',
      'Отчет о состоянии'
    ]
  },
  {
    name: 'Стандартный',
    price: 'от 8 000 ₽',
    frequency: '4 раза в год',
    features: [
      'Все из базового пакета',
      'Чистка теплообменников',
      'Проверка автоматики',
      'Измерение параметров',
      'Мелкий ремонт',
      'Приоритетный вызов'
    ],
    popular: true
  },
  {
    name: 'Премиум',
    price: 'от 12 000 ₽',
    frequency: '6 раз в год',
    features: [
      'Все из стандартного пакета',
      'Дезинфекция системы',
      'Балансировка воздухообмена',
      'Энергоаудит',
      'Экстренный выезд 24/7',
      'Скидка на запчасти 15%'
    ]
  }
];

const Maintenance: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main className="pb-12">
        <Breadcrumbs />
        
        {/* Hero Section */}
        <section className="bg-primary py-12">
          <div className="container mx-auto px-4">
            <h1 className="font-heading font-bold text-h1-mobile md:text-h1-desktop text-white text-center mb-6">
              Сервисное обслуживание климатических систем
            </h1>
            <p className="text-white/90 text-center max-w-3xl mx-auto">
              Профессиональное техническое обслуживание для продления срока службы оборудования и поддержания оптимальных параметров работы
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <ServicesSidebar />
              </div>

              {/* Content */}
              <div className="lg:col-span-3 space-y-12">
                {/* Overview */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-card p-8">
                  <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-primary dark:text-white mb-6">
                    Зачем нужно сервисное обслуживание?
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    Регулярное техническое обслуживание климатических систем позволяет поддерживать их эффективную работу, предотвращать поломки и продлевать срок службы оборудования. Наши специалисты обеспечивают комплексный уход за вашими системами.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="text-center p-4 bg-lightBg dark:bg-gray-700 rounded-lg">
                      <div className="text-3xl font-bold text-primary dark:text-white mb-2">+40%</div>
                      <div className="text-gray-600 dark:text-gray-400">срок службы</div>
                    </div>
                    <div className="text-center p-4 bg-lightBg dark:bg-gray-700 rounded-lg">
                      <div className="text-3xl font-bold text-primary dark:text-white mb-2">-30%</div>
                      <div className="text-gray-600 dark:text-gray-400">энергопотребление</div>
                    </div>
                    <div className="text-center p-4 bg-lightBg dark:bg-gray-700 rounded-lg">
                      <div className="text-3xl font-bold text-primary dark:text-white mb-2">-80%</div>
                      <div className="text-gray-600 dark:text-gray-400">поломок</div>
                    </div>
                    <div className="text-center p-4 bg-lightBg dark:bg-gray-700 rounded-lg">
                      <div className="text-3xl font-bold text-primary dark:text-white mb-2">24/7</div>
                      <div className="text-gray-600 dark:text-gray-400">поддержка</div>
                    </div>
                  </div>
                </div>

                {/* Maintenance Types */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-card p-8">
                  <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-primary dark:text-white mb-8">
                    Виды технического обслуживания
                  </h2>
                  
                  <div className="space-y-8">
                    {maintenanceTypes.map((type, index) => (
                      <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                        <div className="flex items-start mb-4">
                          <div className="bg-primary/10 rounded-lg p-3 mr-4">
                            {type.icon}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-heading font-semibold text-h4-desktop text-primary dark:text-white">
                                {type.title}
                              </h3>
                              <span className="text-sm text-gray-500 dark:text-gray-400 bg-lightBg dark:bg-gray-700 px-3 py-1 rounded-full">
                                {type.frequency}
                              </span>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                              {type.description}
                            </p>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {type.includes.map((item, itemIndex) => (
                            <div key={itemIndex} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                              <CheckCircle className="h-4 w-4 text-secondary mr-2 flex-shrink-0" />
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Seasonal Maintenance */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-card p-8">
                  <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-primary dark:text-white mb-8">
                    Сезонное обслуживание
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {seasonalMaintenance.map((season, index) => (
                      <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                        <div className="flex items-center mb-4">
                          {season.icon}
                          <h3 className="font-heading font-semibold text-primary dark:text-white ml-3">
                            {season.season}
                          </h3>
                        </div>
                        <ul className="space-y-2">
                          {season.tasks.map((task, taskIndex) => (
                            <li key={taskIndex} className="flex items-start text-sm text-gray-600 dark:text-gray-300">
                              <CheckCircle className="h-4 w-4 text-secondary mr-2 flex-shrink-0 mt-0.5" />
                              {task}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Service Packages */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-card p-8">
                  <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-primary dark:text-white mb-8">
                    Пакеты обслуживания
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {servicePackages.map((pkg, index) => (
                      <div key={index} className={`border rounded-lg p-6 relative flex flex-col justify-between ${
                        pkg.popular 
                          ? 'border-primary bg-primary/5 dark:bg-primary/10' 
                          : 'border-gray-200 dark:border-gray-700'
                      }`}>
                        {pkg.popular && (
                          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                            <span className="bg-accent text-white px-4 py-1 rounded-full text-sm font-semibold">
                              Популярный
                            </span>
                          </div>
                        )}
                        <div className="text-center mb-6">
                          <h3 className="font-heading font-bold text-h4-desktop text-primary dark:text-white mb-2">
                            {pkg.name}
                          </h3>
                          <div className="text-2xl font-bold text-accent mb-1">
                            {pkg.price}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {pkg.frequency}
                          </div>
                        </div>
                        <ul className="space-y-3 mb-6">
                          {pkg.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-start text-sm text-gray-600 dark:text-gray-300">
                              <CheckCircle className="h-4 w-4 text-secondary mr-2 flex-shrink-0 mt-0.5" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                        <button className={`w-full py-3 px-6 rounded-md font-semibold transition-colors ${
                          pkg.popular
                            ? 'bg-primary hover:bg-opacity-90 text-white'
                            : 'bg-lightBg dark:bg-gray-700 text-primary dark:text-white hover:bg-primary hover:text-white'
                        }`}>
                          Выбрать пакет
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Benefits */}
                <div className="bg-lightBg dark:bg-gray-700 rounded-lg p-8">
                  <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-primary dark:text-white mb-8">
                    Преимущества регулярного обслуживания
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-heading font-semibold text-h4-desktop text-primary dark:text-white mb-4">
                        Экономические выгоды:
                      </h3>
                      <ul className="space-y-3">
                        {[
                          'Снижение энергопотребления до 30%',
                          'Предотвращение дорогостоящих поломок',
                          'Продление срока службы оборудования',
                          'Сохранение гарантийных обязательств',
                          'Скидки на запчасти и ремонт'
                        ].map((item, index) => (
                          <li key={index} className="flex items-center text-gray-600 dark:text-gray-300">
                            <CheckCircle className="h-5 w-5 text-secondary mr-3 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="font-heading font-semibold text-h4-desktop text-primary dark:text-white mb-4">
                        Комфорт и безопасность:
                      </h3>
                      <ul className="space-y-3">
                        {[
                          'Стабильная температура и влажность',
                          'Чистый и свежий воздух',
                          'Отсутствие неприятных запахов',
                          'Низкий уровень шума',
                          'Предотвращение аварийных ситуаций'
                        ].map((item, index) => (
                          <li key={index} className="flex items-center text-gray-600 dark:text-gray-300">
                            <CheckCircle className="h-5 w-5 text-secondary mr-3 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Emergency Service */}
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
                  <div className="flex items-start">
                    <Clock className="h-6 w-6 text-red-600 dark:text-red-400 mr-3 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-heading font-semibold text-red-800 dark:text-red-200 mb-2">
                        Экстренный вызов 24/7
                      </h3>
                      <p className="text-red-700 dark:text-red-300 mb-4">
                        Для клиентов с договором обслуживания доступен круглосуточный экстренный вызов специалиста при аварийных ситуациях.
                      </p>
                      <div className="flex items-center text-red-700 dark:text-red-300">
                        <span className="font-semibold mr-2">Телефон экстренной службы:</span>
                        <a href="tel:+71234567890" className="font-bold hover:underline">
                          +7 (123) 456-78-90
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="bg-primary rounded-lg p-8 text-center">
                  <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-white mb-4">
                    Заключите договор на обслуживание
                  </h2>
                  <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                    Обеспечьте надежную работу ваших климатических систем. Выберите подходящий пакет обслуживания и получите профессиональный уход за оборудованием.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="bg-accent hover:bg-opacity-90 text-white font-semibold py-3 px-8 rounded-md transition-colors">
                      Заключить договор
                    </button>
                    <button className="bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-8 rounded-md transition-colors">
                      Вызвать специалиста
                    </button>
                  </div>
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

export default Maintenance;