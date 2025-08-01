import React from 'react';
import Header from '../../components/home/Header';
import Footer from '../../components/home/Footer';
import Breadcrumbs from '../../components/shared/Breadcrumbs';
import ServicesSidebar from '../../components/services/ServicesSidebar';
import { CheckCircle, Shield, Clock, FileText, AlertTriangle, Phone, Mail, Calendar } from 'lucide-react';

const warrantyTypes = [
  {
    icon: <Shield className="h-8 w-8 text-secondary" />,
    title: 'Гарантия на оборудование',
    period: 'до 5 лет',
    description: 'Полная гарантия производителя на все поставляемое оборудование',
    coverage: [
      'Заводские дефекты',
      'Неисправности компонентов',
      'Программные сбои',
      'Замена неисправных блоков'
    ]
  },
  {
    icon: <FileText className="h-8 w-8 text-secondary" />,
    title: 'Гарантия на монтаж',
    period: '3 года',
    description: 'Гарантия на качество выполненных монтажных и пусконаладочных работ',
    coverage: [
      'Качество соединений',
      'Герметичность системы',
      'Правильность монтажа',
      'Настройка параметров'
    ]
  },
  {
    icon: <Clock className="h-8 w-8 text-secondary" />,
    title: 'Расширенная гарантия',
    period: 'до 7 лет',
    description: 'Дополнительная гарантия при заключении договора на сервисное обслуживание',
    coverage: [
      'Все виды неисправностей',
      'Профилактическое обслуживание',
      'Приоритетный ремонт',
      'Скидки на запчасти'
    ]
  }
];

const warrantyProcess = [
  {
    step: 1,
    title: 'Обращение',
    description: 'Свяжитесь с нами по телефону или через сайт',
    details: 'Опишите проблему и предоставьте информацию об оборудовании'
  },
  {
    step: 2,
    title: 'Диагностика',
    description: 'Выезд специалиста для определения причины неисправности',
    details: 'Бесплатная диагностика в рамках гарантийного случая'
  },
  {
    step: 3,
    title: 'Ремонт',
    description: 'Устранение неисправности или замена оборудования',
    details: 'Все работы и запчасти предоставляются бесплатно'
  },
  {
    step: 4,
    title: 'Тестирование',
    description: 'Проверка работоспособности после ремонта',
    details: 'Контрольные измерения и настройка параметров'
  }
];

const warrantyConditions = [
  {
    category: 'Гарантия действует при:',
    items: [
      'Соблюдении правил эксплуатации',
      'Использовании оригинальных запчастей',
      'Проведении регулярного ТО',
      'Отсутствии механических повреждений',
      'Соблюдении условий окружающей среды'
    ],
    type: 'valid'
  },
  {
    category: 'Гарантия не распространяется на:',
    items: [
      'Повреждения от стихийных бедствий',
      'Неправильную эксплуатацию',
      'Самостоятельный ремонт',
      'Использование неоригинальных запчастей',
      'Превышение допустимых нагрузок'
    ],
    type: 'invalid'
  }
];

const Warranty: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main className="pb-12">
        <Breadcrumbs />
        
        {/* Hero Section */}
        <section className="bg-primary py-12">
          <div className="container mx-auto px-4">
            <h1 className="font-heading font-bold text-h1-mobile md:text-h1-desktop text-white text-center mb-6">
              Гарантийный ремонт и обслуживание
            </h1>
            <p className="text-white/90 text-center max-w-3xl mx-auto">
              Полная гарантийная поддержка на все виды оборудования и выполненных работ с быстрым реагированием на обращения
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
                    Надежная гарантийная поддержка
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    Мы предоставляем комплексные гарантийные обязательства на все поставляемое оборудование и выполняемые работы. Наша служба гарантийного обслуживания работает оперативно и профессионально, обеспечивая быстрое решение любых проблем.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="text-center p-4 bg-lightBg dark:bg-gray-700 rounded-lg">
                      <div className="text-3xl font-bold text-primary dark:text-white mb-2">24ч</div>
                      <div className="text-gray-600 dark:text-gray-400">время реакции</div>
                    </div>
                    <div className="text-center p-4 bg-lightBg dark:bg-gray-700 rounded-lg">
                      <div className="text-3xl font-bold text-primary dark:text-white mb-2">98%</div>
                      <div className="text-gray-600 dark:text-gray-400">решений с первого раза</div>
                    </div>
                    <div className="text-center p-4 bg-lightBg dark:bg-gray-700 rounded-lg">
                      <div className="text-3xl font-bold text-primary dark:text-white mb-2">5</div>
                      <div className="text-gray-600 dark:text-gray-400">лет максимальная гарантия</div>
                    </div>
                    <div className="text-center p-4 bg-lightBg dark:bg-gray-700 rounded-lg">
                      <div className="text-3xl font-bold text-primary dark:text-white mb-2">100%</div>
                      <div className="text-gray-600 dark:text-gray-400">оригинальные запчасти</div>
                    </div>
                  </div>
                </div>

                {/* Warranty Types */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-card p-8">
                  <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-primary dark:text-white mb-8">
                    Виды гарантийных обязательств
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {warrantyTypes.map((warranty, index) => (
                      <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                        <div className="flex items-center mb-4">
                          <div className="bg-primary/10 rounded-lg p-3 mr-4">
                            {warranty.icon}
                          </div>
                          <div>
                            <h3 className="font-heading font-semibold text-primary dark:text-white">
                              {warranty.title}
                            </h3>
                            <div className="text-2xl font-bold text-accent">
                              {warranty.period}
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                          {warranty.description}
                        </p>
                        <ul className="space-y-2">
                          {warranty.coverage.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                              <CheckCircle className="h-4 w-4 text-secondary mr-2 flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Warranty Process */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-card p-8">
                  <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-primary dark:text-white mb-8">
                    Процедура гарантийного обслуживания
                  </h2>
                  
                  <div className="space-y-8">
                    {warrantyProcess.map((step, index) => (
                      <div key={index} className="flex items-start">
                        <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg mr-6">
                          {step.step}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-heading font-semibold text-h4-desktop text-primary dark:text-white mb-2">
                            {step.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 mb-2">
                            {step.description}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {step.details}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Warranty Conditions */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-card p-8">
                  <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-primary dark:text-white mb-8">
                    Условия гарантийного обслуживания
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {warrantyConditions.map((condition, index) => (
                      <div key={index} className={`border rounded-lg p-6 ${
                        condition.type === 'valid' 
                          ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20'
                          : 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20'
                      }`}>
                        <h3 className={`font-heading font-semibold mb-4 ${
                          condition.type === 'valid'
                            ? 'text-green-800 dark:text-green-200'
                            : 'text-red-800 dark:text-red-200'
                        }`}>
                          {condition.category}
                        </h3>
                        <ul className="space-y-3">
                          {condition.items.map((item, itemIndex) => (
                            <li key={itemIndex} className={`flex items-start text-sm ${
                              condition.type === 'valid'
                                ? 'text-green-700 dark:text-green-300'
                                : 'text-red-700 dark:text-red-300'
                            }`}>
                              {condition.type === 'valid' ? (
                                <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                              ) : (
                                <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400 mr-2 flex-shrink-0 mt-0.5" />
                              )}
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Required Documents */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-card p-8">
                  <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-primary dark:text-white mb-8">
                    Необходимые документы для гарантийного обслуживания
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-heading font-semibold text-h4-desktop text-primary dark:text-white mb-4">
                        Для оборудования:
                      </h3>
                      <ul className="space-y-3">
                        {[
                          'Гарантийный талон',
                          'Товарный чек или накладная',
                          'Паспорт изделия',
                          'Акт ввода в эксплуатацию',
                          'Журнал технического обслуживания'
                        ].map((item, index) => (
                          <li key={index} className="flex items-center text-gray-600 dark:text-gray-300">
                            <FileText className="h-5 w-5 text-secondary mr-3 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="font-heading font-semibold text-h4-desktop text-primary dark:text-white mb-4">
                        Для монтажных работ:
                      </h3>
                      <ul className="space-y-3">
                        {[
                          'Договор на выполнение работ',
                          'Акт выполненных работ',
                          'Исполнительная документация',
                          'Протоколы испытаний',
                          'Справка о вводе в эксплуатацию'
                        ].map((item, index) => (
                          <li key={index} className="flex items-center text-gray-600 dark:text-gray-300">
                            <FileText className="h-5 w-5 text-secondary mr-3 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="bg-lightBg dark:bg-gray-700 rounded-lg p-8">
                  <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-primary dark:text-white mb-8">
                    Контакты гарантийной службы
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center">
                      <div className="flex justify-center mb-4">
                        <div className="bg-primary/10 rounded-full p-4">
                          <Phone className="h-8 w-8 text-primary" />
                        </div>
                      </div>
                      <h3 className="font-heading font-semibold text-primary dark:text-white mb-2">
                        Телефон
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-2">
                        Горячая линия 24/7
                      </p>
                      <a href="tel:+71234567890" className="text-accent font-semibold hover:underline">
                        +7 (123) 456-78-90
                      </a>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center">
                      <div className="flex justify-center mb-4">
                        <div className="bg-primary/10 rounded-full p-4">
                          <Mail className="h-8 w-8 text-primary" />
                        </div>
                      </div>
                      <h3 className="font-heading font-semibold text-primary dark:text-white mb-2">
                        Email
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-2">
                        Гарантийная служба
                      </p>
                      <a href="mailto:warranty@nordengineering.ru" className="text-accent font-semibold hover:underline">
                        warranty@nordengineering.ru
                      </a>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center">
                      <div className="flex justify-center mb-4">
                        <div className="bg-primary/10 rounded-full p-4">
                          <Calendar className="h-8 w-8 text-primary" />
                        </div>
                      </div>
                      <h3 className="font-heading font-semibold text-primary dark:text-white mb-2">
                        График работы
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Пн-Пт: 9:00 - 18:00<br />
                        Экстренные вызовы: 24/7
                      </p>
                    </div>
                  </div>
                </div>

                {/* Important Notice */}
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                  <div className="flex items-start">
                    <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-3 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-heading font-semibold text-blue-800 dark:text-blue-200 mb-2">
                        Важная информация
                      </h3>
                      <ul className="space-y-2 text-blue-700 dark:text-blue-300 text-sm">
                        <li>• Гарантийное обслуживание осуществляется только при наличии документов</li>
                        <li>• Самостоятельный ремонт или вмешательство третьих лиц прекращает гарантию</li>
                        <li>• Регулярное техническое обслуживание продлевает гарантийный срок</li>
                        <li>• При обращении укажите модель оборудования и характер неисправности</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="bg-primary rounded-lg p-8 text-center">
                  <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-white mb-4">
                    Нужна гарантийная поддержка?
                  </h2>
                  <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                    Обратитесь в нашу гарантийную службу для быстрого решения любых проблем с оборудованием или выполненными работами.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="bg-accent hover:bg-opacity-90 text-white font-semibold py-3 px-8 rounded-md transition-colors">
                      Подать заявку
                    </button>
                    <button className="bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-8 rounded-md transition-colors">
                      Связаться с службой
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

export default Warranty;