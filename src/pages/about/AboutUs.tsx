import React from 'react';
import Header from '../../components/home/Header';
import Footer from '../../components/home/Footer';
import Breadcrumbs from '../../components/shared/Breadcrumbs';
import { Clock, Users, Award, Target } from 'lucide-react';

const milestones = [
  {
    year: 2005,
    title: 'Основание компании',
    description: 'Компания НОРДИНЖИНИРИНГ начала свою деятельность в области вентиляции и кондиционирования.'
  },
  {
    year: 2010,
    title: 'Расширение деятельности',
    description: 'Открытие собственного проектного отдела и расширение спектра предоставляемых услуг.'
  },
  {
    year: 2015,
    title: '10 лет успеха',
    description: 'Реализовано более 500 проектов. Получение статуса официального дилера ведущих производителей.'
  },
  {
    year: 2020,
    title: 'Технологический прорыв',
    description: 'Внедрение современных технологий проектирования и монтажа систем вентиляции.'
  },
  {
    year: 2025,
    title: 'Лидер отрасли',
    description: 'Признание одним из ведущих предприятий в области климатического оборудования.'
  }
];

const AboutUs: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main className="pb-12">
        <Breadcrumbs />
        
        {/* Hero Section */}
        <section className="bg-primary py-12">
          <div className="container mx-auto px-4">
            <h1 className="font-heading font-bold text-h1-mobile md:text-h1-desktop text-white text-center mb-6">
              О компании НОРДИНЖИНИРИНГ
            </h1>
            <p className="text-white/90 text-center max-w-2xl mx-auto">
              Профессиональные решения в области вентиляции и климатического оборудования с 2005 года
            </p>
          </div>
        </section>

        {/* Company Overview */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-primary dark:text-white mb-6">
                  Ведущий поставщик климатических решений
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  НОРДИНЖИНИРИНГ специализируется на комплексных решениях в области вентиляции, кондиционирования и отопления. За 18 лет работы мы накопили богатый опыт в реализации проектов любой сложности - от небольших частных объектов до крупных промышленных комплексов.
                </p>
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="text-center p-4 bg-lightBg dark:bg-gray-800 rounded-lg">
                    <div className="text-3xl font-bold text-primary dark:text-white mb-2">18+</div>
                    <div className="text-gray-600 dark:text-gray-400">лет опыта</div>
                  </div>
                  <div className="text-center p-4 bg-lightBg dark:bg-gray-800 rounded-lg">
                    <div className="text-3xl font-bold text-primary dark:text-white mb-2">1000+</div>
                    <div className="text-gray-600 dark:text-gray-400">проектов</div>
                  </div>
                  <div className="text-center p-4 bg-lightBg dark:bg-gray-800 rounded-lg">
                    <div className="text-3xl font-bold text-primary dark:text-white mb-2">50+</div>
                    <div className="text-gray-600 dark:text-gray-400">специалистов</div>
                  </div>
                  <div className="text-center p-4 bg-lightBg dark:bg-gray-800 rounded-lg">
                    <div className="text-3xl font-bold text-primary dark:text-white mb-2">30+</div>
                    <div className="text-gray-600 dark:text-gray-400">брендов</div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img 
                  src="https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Команда НОРДИНЖИНИРИНГ"
                  className="rounded-lg shadow-lg"
                />
                <div className="absolute -bottom-6 -left-6 bg-accent text-white p-4 rounded-lg shadow-lg hidden md:block">
                  <p className="text-lg font-semibold">5000+</p>
                  <p>довольных клиентов</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-12 bg-lightBg dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-primary dark:text-white text-center mb-12">
              Наши ценности
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-card">
                  <div className="flex justify-center mb-4">
                    <div className="bg-primary/10 rounded-full p-4">
                      <Clock className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="font-heading font-semibold text-h4-desktop text-primary dark:text-white mb-3">
                    Надежность
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Гарантируем качество и долговечность наших решений
                  </p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-card">
                  <div className="flex justify-center mb-4">
                    <div className="bg-primary/10 rounded-full p-4">
                      <Users className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="font-heading font-semibold text-h4-desktop text-primary dark:text-white mb-3">
                    Профессионализм
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Команда сертифицированных специалистов
                  </p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-card">
                  <div className="flex justify-center mb-4">
                    <div className="bg-primary/10 rounded-full p-4">
                      <Award className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="font-heading font-semibold text-h4-desktop text-primary dark:text-white mb-3">
                    Качество
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Только проверенное оборудование от ведущих производителей
                  </p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-card">
                  <div className="flex justify-center mb-4">
                    <div className="bg-primary/10 rounded-full p-4">
                      <Target className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="font-heading font-semibold text-h4-desktop text-primary dark:text-white mb-3">
                    Инновации
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Применяем современные технологии и решения
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-primary dark:text-white text-center mb-12">
              История компании
            </h2>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/20"></div>
              
              {/* Timeline items */}
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div key={index} className={`relative flex items-center ${
                    index % 2 === 0 ? 'justify-start' : 'justify-end'
                  }`}>
                    {/* Content */}
                    <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-card">
                        <div className="text-2xl font-bold text-primary dark:text-white mb-2">
                          {milestone.year}
                        </div>
                        <h3 className="font-heading font-semibold text-h4-desktop text-primary dark:text-white mb-2">
                          {milestone.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          {milestone.description}
                        </p>
                      </div>
                    </div>
                    
                    {/* Dot */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;