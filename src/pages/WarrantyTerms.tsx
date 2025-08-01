import React from 'react';
import Header from '../components/home/Header';
import Footer from '../components/home/Footer';
import Breadcrumbs from '../components/shared/Breadcrumbs';
import { Shield, FileText, Clock, CheckCircle, AlertTriangle, Phone, Mail, Download } from 'lucide-react';

const warrantyPeriods = [
  {
    category: 'Кондиционеры',
    equipment: [
      { name: 'Настенные сплит-системы', warranty: '3 года', extended: '5 лет' },
      { name: 'Кассетные кондиционеры', warranty: '3 года', extended: '5 лет' },
      { name: 'VRF/VRV системы', warranty: '5 лет', extended: '7 лет' },
      { name: 'Мобильные кондиционеры', warranty: '2 года', extended: '3 года' }
    ]
  },
  {
    category: 'Вентиляционное оборудование',
    equipment: [
      { name: 'Приточно-вытяжные установки', warranty: '3 года', extended: '5 лет' },
      { name: 'Канальные вентиляторы', warranty: '2 года', extended: '3 года' },
      { name: 'Осевые вентиляторы', warranty: '2 года', extended: '3 года' },
      { name: 'Рекуператоры', warranty: '3 года', extended: '5 лет' }
    ]
  },
  {
    category: 'Отопительное оборудование',
    equipment: [
      { name: 'Тепловые завесы', warranty: '2 года', extended: '3 года' },
      { name: 'Конвекторы', warranty: '3 года', extended: '5 лет' },
      { name: 'Инфракрасные обогреватели', warranty: '2 года', extended: '3 года' },
      { name: 'Тепловые насосы', warranty: '5 лет', extended: '7 лет' }
    ]
  }
];

const warrantyConditions = [
  {
    title: 'Гарантия распространяется на:',
    items: [
      'Заводские дефекты материалов и изготовления',
      'Неисправности, возникшие при нормальной эксплуатации',
      'Отказ компонентов в течение гарантийного срока',
      'Программные сбои и ошибки автоматики',
      'Нарушение герметичности фреоновой системы'
    ],
    type: 'covered'
  },
  {
    title: 'Гарантия НЕ распространяется на:',
    items: [
      'Механические повреждения',
      'Повреждения от стихийных бедствий',
      'Неправильную эксплуатацию или самостоятельный ремонт',
      'Использование неоригинальных запчастей',
      'Нарушение условий транспортировки и хранения'
    ],
    type: 'not-covered'
  }
];

const warrantyProcess = [
  {
    step: 1,
    title: 'Обращение',
    description: 'Свяжитесь с гарантийной службой по телефону или email',
    details: 'Опишите проблему и предоставьте данные об оборудовании'
  },
  {
    step: 2,
    title: 'Регистрация заявки',
    description: 'Специалист зарегистрирует вашу заявку в системе',
    details: 'Вы получите номер заявки для отслеживания статуса'
  },
  {
    step: 3,
    title: 'Диагностика',
    description: 'Выезд инженера для диагностики неисправности',
    details: 'Бесплатная диагностика в рамках гарантийного случая'
  },
  {
    step: 4,
    title: 'Ремонт или замена',
    description: 'Устранение неисправности или замена оборудования',
    details: 'Все работы и запчасти предоставляются бесплатно'
  },
  {
    step: 5,
    title: 'Тестирование',
    description: 'Проверка работоспособности после ремонта',
    details: 'Контрольные измерения и настройка параметров'
  }
];

const requiredDocuments = [
  {
    category: 'Основные документы',
    documents: [
      'Гарантийный талон с печатью продавца',
      'Товарный чек или накладная',
      'Паспорт изделия',
      'Акт ввода в эксплуатацию'
    ]
  },
  {
    category: 'Дополнительные документы',
    documents: [
      'Журнал технического обслуживания',
      'Договор на монтажные работы',
      'Исполнительная документация',
      'Протоколы пусконаладочных работ'
    ]
  }
];

const WarrantyTerms: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main className="pb-12">
        <Breadcrumbs />
        
        {/* Hero Section */}
        <section className="bg-primary py-12">
          <div className="container mx-auto px-4">
            <h1 className="font-heading font-bold text-h1-mobile md:text-h1-desktop text-white text-center mb-6">
              Гарантийные обязательства
            </h1>
            <p className="text-white/90 text-center max-w-2xl mx-auto">
              Подробная информация о гарантийных условиях на оборудование и выполненные работы
            </p>
          </div>
        </section>

        {/* Warranty Overview */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-card p-8 text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-primary/10 rounded-full p-4">
                    <Shield className="h-12 w-12 text-primary" />
                  </div>
                </div>
                <h3 className="font-heading font-bold text-h3-desktop text-primary dark:text-white mb-4">
                  Полная гарантия
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Комплексные гарантийные обязательства на оборудование и работы
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-card p-8 text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-primary/10 rounded-full p-4">
                    <Clock className="h-12 w-12 text-primary" />
                  </div>
                </div>
                <h3 className="font-heading font-bold text-h3-desktop text-primary dark:text-white mb-4">
                  Быстрое реагирование
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Обращение рассматривается в течение 24 часов
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-card p-8 text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-primary/10 rounded-full p-4">
                    <FileText className="h-12 w-12 text-primary" />
                  </div>
                </div>
                <h3 className="font-heading font-bold text-h3-desktop text-primary dark:text-white mb-4">
                  Документооборот
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Полное документальное сопровождение всех работ
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Warranty Periods */}
        <section className="py-12 bg-lightBg dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-primary dark:text-white text-center mb-10">
              Сроки гарантии по категориям оборудования
            </h2>
            
            <div className="space-y-8">
              {warrantyPeriods.map((category, index) => (
                <div key={index} className="bg-white dark:bg-gray-900 rounded-lg shadow-card overflow-hidden">
                  <div className="bg-primary text-white px-6 py-4">
                    <h3 className="font-heading font-bold text-h3-desktop">
                      {category.category}
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200 dark:border-gray-700">
                            <th className="text-left py-3 font-semibold text-gray-900 dark:text-white">
                              Тип оборудования
                            </th>
                            <th className="text-center py-3 font-semibold text-gray-900 dark:text-white">
                              Стандартная гарантия
                            </th>
                            <th className="text-center py-3 font-semibold text-gray-900 dark:text-white">
                              Расширенная гарантия
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {category.equipment.map((item, itemIndex) => (
                            <tr key={itemIndex} className="border-b border-gray-100 dark:border-gray-800">
                              <td className="py-3 text-gray-700 dark:text-gray-300">
                                {item.name}
                              </td>
                              <td className="py-3 text-center">
                                <span className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300 px-3 py-1 rounded-full text-sm font-semibold">
                                  {item.warranty}
                                </span>
                              </td>
                              <td className="py-3 text-center">
                                <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-semibold">
                                  {item.extended}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Warranty Conditions */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-primary dark:text-white text-center mb-10">
              Условия гарантийного обслуживания
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {warrantyConditions.map((condition, index) => (
                <div key={index} className={`rounded-lg p-6 ${
                  condition.type === 'covered' 
                    ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                    : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
                }`}>
                  <h3 className={`font-heading font-semibold text-h4-desktop mb-4 ${
                    condition.type === 'covered'
                      ? 'text-green-800 dark:text-green-200'
                      : 'text-red-800 dark:text-red-200'
                  }`}>
                    {condition.title}
                  </h3>
                  <ul className="space-y-3">
                    {condition.items.map((item, itemIndex) => (
                      <li key={itemIndex} className={`flex items-start text-sm ${
                        condition.type === 'covered'
                          ? 'text-green-700 dark:text-green-300'
                          : 'text-red-700 dark:text-red-300'
                      }`}>
                        {condition.type === 'covered' ? (
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
        </section>

        {/* Warranty Process */}
        <section className="py-12 bg-lightBg dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-primary dark:text-white text-center mb-10">
              Процедура гарантийного обслуживания
            </h2>
            
            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                {warrantyProcess.map((step, index) => (
                  <div key={index} className="bg-white dark:bg-gray-900 rounded-lg shadow-card p-6">
                    <div className="flex items-start">
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
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Required Documents */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-primary dark:text-white text-center mb-10">
              Необходимые документы
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {requiredDocuments.map((category, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-card p-6">
                  <h3 className="font-heading font-semibold text-h4-desktop text-primary dark:text-white mb-4">
                    {category.category}
                  </h3>
                  <ul className="space-y-3">
                    {category.documents.map((doc, docIndex) => (
                      <li key={docIndex} className="flex items-center text-gray-600 dark:text-gray-300">
                        <FileText className="h-5 w-5 text-secondary mr-3 flex-shrink-0" />
                        {doc}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Extended Warranty */}
        <section className="py-12 bg-blue-50 dark:bg-blue-900/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-primary dark:text-white mb-6">
                Расширенная гарантия
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                При заключении договора на сервисное обслуживание гарантийный срок увеличивается на 2 года
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-card">
                  <h3 className="font-heading font-semibold text-primary dark:text-white mb-3">
                    Преимущества
                  </h3>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                    <li>• Увеличение срока гарантии</li>
                    <li>• Приоритетное обслуживание</li>
                    <li>• Скидки на запчасти</li>
                    <li>• Профилактические работы</li>
                  </ul>
                </div>
                
                <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-card">
                  <h3 className="font-heading font-semibold text-primary dark:text-white mb-3">
                    Условия
                  </h3>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                    <li>• Договор на 3 года</li>
                    <li>• Регулярное ТО 2 раза в год</li>
                    <li>• Соблюдение рекомендаций</li>
                    <li>• Использование оригинальных запчастей</li>
                  </ul>
                </div>
                
                <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-card">
                  <h3 className="font-heading font-semibold text-primary dark:text-white mb-3">
                    Стоимость
                  </h3>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                    <li>• От 5 000 ₽/год</li>
                    <li>• Зависит от типа оборудования</li>
                    <li>• Возможна рассрочка</li>
                    <li>• Скидки при заключении сразу</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-12 bg-primary">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-white text-center mb-10">
                Контакты гарантийной службы
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/10 rounded-lg p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <Phone className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-heading font-semibold text-white mb-2">
                    Телефон
                  </h3>
                  <p className="text-white/80 mb-3">
                    Горячая линия 24/7
                  </p>
                  <a href="tel:+71234567890" className="text-accent font-semibold hover:underline">
                    +7 (123) 456-78-90
                  </a>
                </div>

                <div className="bg-white/10 rounded-lg p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <Mail className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-heading font-semibold text-white mb-2">
                    Email
                  </h3>
                  <p className="text-white/80 mb-3">
                    Гарантийная служба
                  </p>
                  <a href="mailto:warranty@nordengineering.ru" className="text-accent font-semibold hover:underline">
                    warranty@nordengineering.ru
                  </a>
                </div>

                <div className="bg-white/10 rounded-lg p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <Download className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-heading font-semibold text-white mb-2">
                    Документы
                  </h3>
                  <p className="text-white/80 mb-3">
                    Скачать формы
                  </p>
                  <button className="text-accent font-semibold hover:underline">
                    Заявка на ремонт
                  </button>
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

export default WarrantyTerms;