import React from 'react';
import Header from '../../components/home/Header';
import Footer from '../../components/home/Footer';
import Breadcrumbs from '../../components/shared/Breadcrumbs';
import ServicesSidebar from '../../components/services/ServicesSidebar';
import { CheckCircle, Shield, Clock, Users, FileCheck, AlertTriangle, Award, Wrench } from 'lucide-react';

const installationSteps = [
  {
    step: 1,
    title: 'Подготовительные работы',
    description: 'Доставка оборудования, подготовка инструмента, разметка мест установки',
    duration: '1 день',
    details: ['Приемка оборудования', 'Проверка комплектности', 'Подготовка рабочих мест']
  },
  {
    step: 2,
    title: 'Монтаж воздуховодов',
    description: 'Установка воздуховодов, крепежных элементов, изоляция',
    duration: '2-5 дней',
    details: ['Монтаж магистральных воздуховодов', 'Установка ответвлений', 'Теплоизоляция']
  },
  {
    step: 3,
    title: 'Установка оборудования',
    description: 'Монтаж вентиляционных установок, кондиционеров, автоматики',
    duration: '1-3 дня',
    details: ['Установка вентагрегатов', 'Монтаж внутренних блоков', 'Подключение автоматики']
  },
  {
    step: 4,
    title: 'Пусконаладочные работы',
    description: 'Настройка оборудования, балансировка системы, тестирование',
    duration: '1-2 дня',
    details: ['Настройка параметров', 'Балансировка воздухообмена', 'Проверка автоматики']
  },
  {
    step: 5,
    title: 'Сдача объекта',
    description: 'Оформление документации, обучение персонала, гарантийные обязательства',
    duration: '1 день',
    details: ['Составление актов', 'Обучение эксплуатации', 'Передача документации']
  }
];

const guaranteeTypes = [
  {
    icon: <Shield className="h-8 w-8 text-secondary" />,
    title: 'Гарантия на оборудование',
    period: 'до 5 лет',
    description: 'Полная гарантия производителя на все установленное оборудование'
  },
  {
    icon: <Wrench className="h-8 w-8 text-secondary" />,
    title: 'Гарантия на монтажные работы',
    period: '3 года',
    description: 'Гарантируем качество всех выполненных монтажных работ'
  },
  {
    icon: <FileCheck className="h-8 w-8 text-secondary" />,
    title: 'Гарантия на пусконаладку',
    period: '2 года',
    description: 'Гарантия на правильность настройки и балансировки системы'
  }
];

const Installation: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main className="pb-12">
        <Breadcrumbs />
        
        {/* Hero Section */}
        <section className="bg-primary py-12">
          <div className="container mx-auto px-4">
            <h1 className="font-heading font-bold text-h1-mobile md:text-h1-desktop text-white text-center mb-6">
              Монтаж систем вентиляции и кондиционирования
            </h1>
            <p className="text-white/90 text-center max-w-3xl mx-auto">
              Профессиональный монтаж климатических систем с соблюдением всех технических норм и гарантией качества
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
                    Качественный монтаж - основа надежной работы
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    Наша команда сертифицированных монтажников выполняет установку климатических систем любой сложности. Мы строго соблюдаем технологические процессы и используем только качественные материалы и комплектующие.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="text-center p-4 bg-lightBg dark:bg-gray-700 rounded-lg">
                      <div className="text-3xl font-bold text-primary dark:text-white mb-2">800+</div>
                      <div className="text-gray-600 dark:text-gray-400">объектов</div>
                    </div>
                    <div className="text-center p-4 bg-lightBg dark:bg-gray-700 rounded-lg">
                      <div className="text-3xl font-bold text-primary dark:text-white mb-2">20</div>
                      <div className="text-gray-600 dark:text-gray-400">монтажников</div>
                    </div>
                    <div className="text-center p-4 bg-lightBg dark:bg-gray-700 rounded-lg">
                      <div className="text-3xl font-bold text-primary dark:text-white mb-2">3</div>
                      <div className="text-gray-600 dark:text-gray-400">года гарантии</div>
                    </div>
                    <div className="text-center p-4 bg-lightBg dark:bg-gray-700 rounded-lg">
                      <div className="text-3xl font-bold text-primary dark:text-white mb-2">99%</div>
                      <div className="text-gray-600 dark:text-gray-400">без рекламаций</div>
                    </div>
                  </div>
                </div>

                {/* Installation Steps */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-card p-8">
                  <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-primary dark:text-white mb-8">
                    Этапы монтажных работ
                  </h2>
                  
                  <div className="space-y-8">
                    {installationSteps.map((step, index) => (
                      <div key={index} className="border-l-4 border-primary pl-6 relative">
                        <div className="absolute -left-3 top-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {step.step}
                        </div>
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-heading font-semibold text-h4-desktop text-primary dark:text-white">
                            {step.title}
                          </h3>
                          <div className="flex items-center text-gray-500 dark:text-gray-400">
                            <Clock className="h-4 w-4 mr-1" />
                            <span className="text-sm">{step.duration}</span>
                          </div>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                          {step.description}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {step.details.map((detail, detailIndex) => (
                            <div key={detailIndex} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                              <CheckCircle className="h-4 w-4 text-secondary mr-2 flex-shrink-0" />
                              {detail}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Guarantee Types */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-card p-8">
                  <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-primary dark:text-white mb-8">
                    Гарантийные обязательства
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {guaranteeTypes.map((guarantee, index) => (
                      <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 text-center">
                        <div className="flex justify-center mb-4">
                          <div className="bg-primary/10 rounded-lg p-3">
                            {guarantee.icon}
                          </div>
                        </div>
                        <h3 className="font-heading font-semibold text-primary dark:text-white mb-2">
                          {guarantee.title}
                        </h3>
                        <div className="text-2xl font-bold text-accent mb-3">
                          {guarantee.period}
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                          {guarantee.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Safety and Quality */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-card p-8">
                  <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-primary dark:text-white mb-8">
                    Безопасность и качество работ
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-heading font-semibold text-h4-desktop text-primary dark:text-white mb-4 flex items-center">
                        <Shield className="h-6 w-6 text-secondary mr-3" />
                        Меры безопасности
                      </h3>
                      <ul className="space-y-3">
                        {[
                          'Соблюдение техники безопасности',
                          'Использование сертифицированного инструмента',
                          'Страхование ответственности',
                          'Контроль качества на каждом этапе',
                          'Уборка рабочих мест'
                        ].map((item, index) => (
                          <li key={index} className="flex items-center text-gray-600 dark:text-gray-300">
                            <CheckCircle className="h-5 w-5 text-secondary mr-3 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="font-heading font-semibold text-h4-desktop text-primary dark:text-white mb-4 flex items-center">
                        <Award className="h-6 w-6 text-secondary mr-3" />
                        Контроль качества
                      </h3>
                      <ul className="space-y-3">
                        {[
                          'Проверка каждого соединения',
                          'Испытания на герметичность',
                          'Измерение параметров системы',
                          'Фотофиксация скрытых работ',
                          'Приемочные испытания'
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

                {/* What's Included */}
                <div className="bg-lightBg dark:bg-gray-700 rounded-lg p-8">
                  <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-primary dark:text-white mb-8">
                    Что входит в стоимость монтажа
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-heading font-semibold text-h4-desktop text-primary dark:text-white mb-4">
                        Монтажные работы:
                      </h3>
                      <ul className="space-y-3">
                        {[
                          'Установка всего оборудования',
                          'Монтаж воздуховодов',
                          'Электрические подключения',
                          'Теплоизоляция системы',
                          'Установка решеток и диффузоров',
                          'Пусконаладочные работы'
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
                        Дополнительно:
                      </h3>
                      <ul className="space-y-3">
                        {[
                          'Доставка оборудования',
                          'Подъем на этаж',
                          'Расходные материалы',
                          'Уборка после работ',
                          'Исполнительная документация',
                          'Обучение эксплуатации'
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

                {/* Important Notes */}
                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-6">
                  <div className="flex items-start">
                    <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-400 mr-3 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-heading font-semibold text-amber-800 dark:text-amber-200 mb-2">
                        Важная информация
                      </h3>
                      <ul className="space-y-2 text-amber-700 dark:text-amber-300 text-sm">
                        <li>• Монтаж выполняется только при наличии проектной документации</li>
                        <li>• Необходимо обеспечить доступ к местам установки оборудования</li>
                        <li>• Электрические работы выполняются при наличии технических условий</li>
                        <li>• Гарантия действует при соблюдении правил эксплуатации</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="bg-primary rounded-lg p-8 text-center">
                  <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-white mb-4">
                    Готовы начать монтаж?
                  </h2>
                  <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                    Свяжитесь с нами для составления сметы и планирования монтажных работ. Мы выполним все работы качественно и в срок.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="bg-accent hover:bg-opacity-90 text-white font-semibold py-3 px-8 rounded-md transition-colors">
                      Заказать монтаж
                    </button>
                    <button className="bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-8 rounded-md transition-colors">
                      Рассчитать стоимость
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

export default Installation;