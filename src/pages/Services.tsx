import React from 'react';
import SEOHelmet from '../components/shared/SEOHelmet';
import { Link } from 'react-router-dom';
import Header from '../components/home/Header';
import Footer from '../components/home/Footer';
import Breadcrumbs from '../components/shared/Breadcrumbs';
import { Ruler, PenTool as Tools, Wrench, FileCheck, Shield, Clock, Settings, RefreshCw, ArrowRight } from 'lucide-react';

interface ServiceCategory {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  image: string;
  link: string;
}

const serviceCategories: ServiceCategory[] = [
  {
    icon: <Ruler className="h-12 w-12 text-secondary" />,
    title: 'Проектирование',
    description: 'Профессиональное проектирование систем вентиляции и кондиционирования для объектов любой сложности.',
    features: [
      'Разработка проектной документации',
      'Расчет воздухообмена',
      'Подбор оборудования',
      'Согласование проекта'
    ],
    image: 'https://images.pexels.com/photos/834892/pexels-photo-834892.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    link: '/services/design'
  },
  {
    icon: <Tools className="h-12 w-12 text-secondary" />,
    title: 'Монтаж',
    description: 'Профессиональный монтаж систем вентиляции и кондиционирования с соблюдением всех технических норм.',
    features: [
      'Монтаж вентиляционных систем',
      'Установка кондиционеров',
      'Пусконаладочные работы',
      'Паспортизация систем'
    ],
    image: 'https://images.pexels.com/photos/8961214/pexels-photo-8961214.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    link: '/services/installation'
  },
  {
    icon: <Settings className="h-12 w-12 text-secondary" />,
    title: 'Сервисное обслуживание',
    description: 'Регулярное техническое обслуживание и ремонт систем вентиляции и кондиционирования.',
    features: [
      'Диагностика оборудования',
      'Чистка и дезинфекция',
      'Замена расходных материалов',
      'Ремонт неисправностей'
    ],
    image: 'https://images.pexels.com/photos/8486972/pexels-photo-8486972.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    link: '/services/maintenance'
  },
  {
    icon: <Shield className="h-12 w-12 text-secondary" />,
    title: 'Гарантийный ремонт',
    description: 'Полная гарантийная поддержка на все виды оборудования и выполненных работ.',
    features: [
      'Гарантия до 5 лет',
      'Бесплатная диагностика',
      'Оригинальные запчасти',
      'Экстренный вызов 24/7'
    ],
    image: 'https://images.pexels.com/photos/5490235/pexels-photo-5490235.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    link: '/services/warranty'
  }
];

const advantages = [
  {
    icon: <Shield className="h-8 w-8 text-secondary" />,
    title: 'Гарантия качества',
    description: 'Предоставляем гарантию на все виды работ до 5 лет'
  },
  {
    icon: <Clock className="h-8 w-8 text-secondary" />,
    title: 'Оперативность',
    description: 'Выполняем работы точно в согласованные сроки'
  },
  {
    icon: <Wrench className="h-8 w-8 text-secondary" />,
    title: 'Профессионализм',
    description: 'Команда сертифицированных специалистов'
  },
  {
    icon: <FileCheck className="h-8 w-8 text-secondary" />,
    title: 'Официально',
    description: 'Работаем по договору с полной документацией'
  }
];

const Services: React.FC = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Услуги по климатическому оборудованию",
    "description": "Полный спектр услуг: проектирование, монтаж, сервисное обслуживание и гарантийный ремонт климатических систем",
    "provider": {
      "@type": "Organization",
      "name": "НОРДИНЖИНИРИНГ"
    },
    "serviceType": "Климатические услуги",
    "areaServed": "Москва и Московская область"
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <SEOHelmet
        title="Услуги по климатическому оборудованию"
        description="Полный спектр услуг: проектирование, монтаж, сервисное обслуживание и гарантийный ремонт климатических систем. 18+ лет опыта, профессиональная команда."
        keywords="услуги, проектирование, монтаж, обслуживание, ремонт, климатическое оборудование"
        canonical="https://nordengineering.ru/services"
        structuredData={structuredData}
      />
      <Header />
      <main className="pb-12">
        <Breadcrumbs />
        {/* Hero Section */}
        <section className="bg-primary py-12">
          <div className="container mx-auto px-4">
            <h1 className="font-heading font-bold text-h1-mobile md:text-h1-desktop text-white text-center mb-6">
              Услуги компании
            </h1>
            <p className="text-white/90 text-center max-w-2xl mx-auto">
              Полный комплекс услуг по проектированию, монтажу и обслуживанию систем вентиляции и кондиционирования
            </p>
          </div>
        </section>

        {/* Service Categories */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {serviceCategories.map((category, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-card overflow-hidden group transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1">
                  <div className="aspect-w-16 aspect-h-9">
                    <img 
                      src={category.image} 
                      alt={category.title}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      {category.icon}
                      <h2 className="font-heading font-bold text-h3-mobile md:text-h3-desktop text-primary dark:text-white ml-4">
                        {category.title}
                      </h2>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      {category.description}
                    </p>
                    <ul className="space-y-3">
                      {category.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-gray-700 dark:text-gray-300">
                          <RefreshCw className="h-5 w-5 text-secondary mr-3" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Link 
                      to={category.link}
                      className="mt-6 w-full bg-primary hover:bg-opacity-90 text-white font-semibold py-3 px-6 rounded-md transition-colors flex items-center justify-center group"
                    >
                      <span>Подробнее</span>
                      <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Advantages */}
        <section className="py-12 bg-lightBg dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-primary dark:text-white text-center mb-10">
              Наши преимущества
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {advantages.map((advantage, index) => (
                <div key={index} className="bg-white dark:bg-gray-900 rounded-lg p-6 text-center shadow-card">
                  <div className="flex justify-center mb-4">
                    <div className="bg-primary/10 rounded-full p-4">
                      {advantage.icon}
                    </div>
                  </div>
                  <h3 className="font-heading font-semibold text-h4-desktop text-primary dark:text-white mb-2">
                    {advantage.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {advantage.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-white mb-6">
              Нужна консультация специалиста?
            </h2>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              Оставьте заявку, и наш специалист свяжется с вами в ближайшее время для обсуждения вашего проекта
            </p>
            <button className="bg-accent hover:bg-opacity-90 text-white font-semibold py-3 px-8 rounded-md transition-colors">
              Получить консультацию
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;