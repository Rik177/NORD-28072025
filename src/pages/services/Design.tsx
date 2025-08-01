import React from 'react';
import Header from '../../components/home/Header';
import Footer from '../../components/home/Footer';
import Breadcrumbs from '../../components/shared/Breadcrumbs';
import ServicesSidebar from '../../components/services/ServicesSidebar';
import { CheckCircle, FileText, Calculator, Users, Clock, Award } from 'lucide-react';

const designSteps = [
  {
    step: 1,
    title: 'Техническое задание',
    description: 'Анализ объекта, определение требований к микроклимату, изучение архитектурных особенностей',
    duration: '1-2 дня'
  },
  {
    step: 2,
    title: 'Расчеты и подбор оборудования',
    description: 'Теплотехнические расчеты, расчет воздухообмена, подбор оптимального оборудования',
    duration: '3-5 дней'
  },
  {
    step: 3,
    title: 'Разработка проекта',
    description: 'Создание чертежей, схем, спецификаций оборудования и материалов',
    duration: '7-14 дней'
  },
  {
    step: 4,
    title: 'Согласование',
    description: 'Согласование проекта с заказчиком, внесение корректировок при необходимости',
    duration: '2-3 дня'
  }
];

const projectTypes = [
  {
    icon: <FileText className="h-8 w-8 text-secondary" />,
    title: 'Жилые помещения',
    description: 'Квартиры, частные дома, коттеджи',
    features: ['Приточно-вытяжная вентиляция', 'Кондиционирование', 'Рекуперация тепла']
  },
  {
    icon: <Calculator className="h-8 w-8 text-secondary" />,
    title: 'Коммерческие объекты',
    description: 'Офисы, магазины, рестораны',
    features: ['Центральные системы', 'Зональное управление', 'Энергоэффективность']
  },
  {
    icon: <Users className="h-8 w-8 text-secondary" />,
    title: 'Промышленные объекты',
    description: 'Производственные цеха, склады',
    features: ['Промышленная вентиляция', 'Очистка воздуха', 'Взрывозащищенность']
  }
];

const Design: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main className="pb-12">
        <Breadcrumbs />
        
        {/* Hero Section */}
        <section className="bg-primary py-12">
          <div className="container mx-auto px-4">
            <h1 className="font-heading font-bold text-h1-mobile md:text-h1-desktop text-white text-center mb-6">
              Проектирование систем вентиляции и кондиционирования
            </h1>
            <p className="text-white/90 text-center max-w-3xl mx-auto">
              Профессиональное проектирование климатических систем с учетом всех технических требований и нормативов
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
                    Комплексное проектирование
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    Наша команда инженеров-проектировщиков разрабатывает эффективные решения для создания комфортного микроклимата в помещениях любого назначения. Мы учитываем все особенности объекта, требования заказчика и действующие нормативы.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-lightBg dark:bg-gray-700 rounded-lg">
                      <div className="text-3xl font-bold text-primary dark:text-white mb-2">500+</div>
                      <div className="text-gray-600 dark:text-gray-400">проектов</div>
                    </div>
                    <div className="text-center p-4 bg-lightBg dark:bg-gray-700 rounded-lg">
                      <div className="text-3xl font-bold text-primary dark:text-white mb-2">15</div>
                      <div className="text-gray-600 dark:text-gray-400">лет опыта</div>
                    </div>
                    <div className="text-center p-4 bg-lightBg dark:bg-gray-700 rounded-lg">
                      <div className="text-3xl font-bold text-primary dark:text-white mb-2">100%</div>
                      <div className="text-gray-600 dark:text-gray-400">согласований</div>
                    </div>
                  </div>
                </div>

                {/* Design Process */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-card p-8">
                  <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-primary dark:text-white mb-8">
                    Этапы проектирования
                  </h2>
                  
                  <div className="space-y-8">
                    {designSteps.map((step, index) => (
                      <div key={index} className="flex items-start">
                        <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg mr-6">
                          {step.step}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-heading font-semibold text-h4-desktop text-primary dark:text-white">
                              {step.title}
                            </h3>
                            <div className="flex items-center text-gray-500 dark:text-gray-400">
                              <Clock className="h-4 w-4 mr-1" />
                              <span className="text-sm">{step.duration}</span>
                            </div>
                          </div>
                          <p className="text-gray-600 dark:text-gray-300">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Project Types */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-card p-8">
                  <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-primary dark:text-white mb-8">
                    Типы проектов
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {projectTypes.map((type, index) => (
                      <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                        <div className="flex items-center mb-4">
                          <div className="bg-primary/10 rounded-lg p-3 mr-4 md:hidden xl:block">
                            {type.icon}
                          </div>
                          <div>
                            <h3 className="font-heading font-semibold text-primary dark:text-white">
                              {type.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {type.description}
                            </p>
                          </div>
                        </div>
                        <ul className="space-y-2">
                          {type.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-center text-gray-600 dark:text-gray-300">
                              <CheckCircle className="h-4 w-4 text-secondary mr-2 flex-shrink-0" />
                              <span className="text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* What's Included */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-card p-8">
                  <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-primary dark:text-white mb-8">
                    Что входит в проект
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-heading font-semibold text-h4-desktop text-primary dark:text-white mb-4">
                        Проектная документация:
                      </h3>
                      <ul className="space-y-3">
                        {[
                          'Пояснительная записка',
                          'Планы расположения оборудования',
                          'Схемы воздуховодов',
                          'Аксонометрические схемы',
                          'Спецификация оборудования',
                          'Узлы и детали'
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
                        Расчеты и обоснования:
                      </h3>
                      <ul className="space-y-3">
                        {[
                          'Теплотехнические расчеты',
                          'Расчет воздухообмена',
                          'Аэродинамические расчеты',
                          'Акустические расчеты',
                          'Энергетические расчеты',
                          'Экономическое обоснование'
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

                {/* Advantages */}
                <div className="bg-lightBg dark:bg-gray-700 rounded-lg p-8">
                  <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-primary dark:text-white mb-8">
                    Преимущества нашего проектирования
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      {
                        icon: <Award className="h-6 w-6 text-secondary" />,
                        title: 'Сертифицированные специалисты',
                        description: 'Команда инженеров с профильным образованием и опытом работы'
                      },
                      {
                        icon: <Calculator className="h-6 w-6 text-secondary" />,
                        title: 'Точные расчеты',
                        description: 'Используем современное ПО для максимально точных расчетов'
                      },
                      {
                        icon: <FileText className="h-6 w-6 text-secondary" />,
                        title: 'Полная документация',
                        description: 'Предоставляем весь комплект документов для согласования'
                      },
                      {
                        icon: <CheckCircle className="h-6 w-6 text-secondary" />,
                        title: 'Соответствие нормам',
                        description: 'Проекты соответствуют всем действующим СНиП и ГОСТ'
                      },
                      {
                        icon: <Clock className="h-6 w-6 text-secondary" />,
                        title: 'Соблюдение сроков',
                        description: 'Выполняем проекты точно в согласованные сроки'
                      },
                      {
                        icon: <Users className="h-6 w-6 text-secondary" />,
                        title: 'Авторский надзор',
                        description: 'Сопровождаем проект на всех этапах реализации'
                      }
                    ].map((advantage, index) => (
                      <div key={index} className="flex items-start">
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-3 mr-4">
                          {advantage.icon}
                        </div>
                        <div>
                          <h3 className="font-heading font-semibold text-primary dark:text-white mb-2">
                            {advantage.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {advantage.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="bg-primary rounded-lg p-8 text-center">
                  <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-white mb-4">
                    Готовы начать проектирование?
                  </h2>
                  <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                    Свяжитесь с нами для обсуждения вашего проекта. Мы предоставим техническую консультацию и рассчитаем стоимость работ.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="bg-accent hover:bg-opacity-90 text-white font-semibold py-3 px-8 rounded-md transition-colors">
                      Заказать проект
                    </button>
                    <button className="bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-8 rounded-md transition-colors">
                      Получить консультацию
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

export default Design;