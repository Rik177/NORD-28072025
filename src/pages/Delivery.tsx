import React from 'react';
import Header from '../components/home/Header';
import Footer from '../components/home/Footer';
import Breadcrumbs from '../components/shared/Breadcrumbs';
import { Truck, Clock, MapPin, Package, CheckCircle, Calculator, Phone, AlertTriangle } from 'lucide-react';

const deliveryZones = [
  {
    zone: 'Москва (в пределах МКАД)',
    price: 'Бесплатно',
    time: 'В день заказа',
    description: 'При заказе от 10 000 ₽',
    color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
  },
  {
    zone: 'Московская область (до 30 км от МКАД)',
    price: '500 ₽',
    time: '1-2 дня',
    description: 'Стандартная доставка',
    color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300'
  },
  {
    zone: 'Московская область (30-50 км от МКАД)',
    price: '1 000 ₽',
    time: '2-3 дня',
    description: 'Доставка по согласованию',
    color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
  },
  {
    zone: 'Московская область (50-100 км от МКАД)',
    price: '1 500 ₽',
    time: '3-5 дней',
    description: 'Доставка по предварительной договоренности',
    color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300'
  }
];

const deliveryOptions = [
  {
    icon: <Truck className="h-8 w-8 text-secondary" />,
    title: 'Стандартная доставка',
    description: 'Доставка до подъезда в рабочие дни с 9:00 до 18:00',
    features: [
      'Доставка до подъезда',
      'Звонок за час до доставки',
      'Проверка комплектности',
      'Документы о доставке'
    ]
  },
  {
    icon: <Package className="h-8 w-8 text-secondary" />,
    title: 'Доставка с подъемом',
    description: 'Доставка и подъем оборудования до квартиры/офиса',
    features: [
      'Подъем на любой этаж',
      'Занос в помещение',
      'Распаковка при необходимости',
      'Вынос упаковочного материала'
    ]
  },
  {
    icon: <Clock className="h-8 w-8 text-secondary" />,
    title: 'Экспресс-доставка',
    description: 'Срочная доставка в течение 3-4 часов',
    features: [
      'Доставка в день заказа',
      'Точное время доставки',
      'Приоритетная обработка',
      'SMS-уведомления'
    ]
  }
];

const deliverySteps = [
  {
    step: 1,
    title: 'Оформление заказа',
    description: 'Выберите товар и оформите заказ на сайте или по телефону'
  },
  {
    step: 2,
    title: 'Подтверждение',
    description: 'Менеджер свяжется с вами для подтверждения заказа и уточнения деталей доставки'
  },
  {
    step: 3,
    title: 'Подготовка к отправке',
    description: 'Товар комплектуется на складе и готовится к доставке'
  },
  {
    step: 4,
    title: 'Доставка',
    description: 'Курьер доставляет заказ по указанному адресу в согласованное время'
  },
  {
    step: 5,
    title: 'Получение',
    description: 'Проверьте комплектность и подпишите документы о получении'
  }
];

const Delivery: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main className="pb-12">
        <Breadcrumbs />
        
        {/* Hero Section */}
        <section className="bg-primary py-12">
          <div className="container mx-auto px-4">
            <h1 className="font-heading font-bold text-h1-mobile md:text-h1-desktop text-white text-center mb-6">
              Условия доставки
            </h1>
            <p className="text-white/90 text-center max-w-2xl mx-auto">
              Быстрая и надежная доставка климатического оборудования по Москве и Московской области
            </p>
          </div>
        </section>

        {/* Delivery Zones */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-primary dark:text-white text-center mb-10">
              Зоны доставки
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {deliveryZones.map((zone, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-card p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="bg-primary/10 rounded-full p-4">
                      <MapPin className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="font-heading font-semibold text-primary dark:text-white mb-3">
                    {zone.zone}
                  </h3>
                  <div className="mb-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${zone.color}`}>
                      {zone.price}
                    </span>
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 mb-2">
                    <Clock className="h-4 w-4 inline mr-1" />
                    {zone.time}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-500">
                    {zone.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Delivery Options */}
        <section className="py-12 bg-lightBg dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-primary dark:text-white text-center mb-10">
              Варианты доставки
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {deliveryOptions.map((option, index) => (
                <div key={index} className="bg-white dark:bg-gray-900 rounded-lg shadow-card p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-primary/10 rounded-lg p-3 mr-4">
                      {option.icon}
                    </div>
                    <h3 className="font-heading font-semibold text-h4-desktop text-primary dark:text-white">
                      {option.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {option.description}
                  </p>
                  <ul className="space-y-3">
                    {option.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-600 dark:text-gray-300">
                        <CheckCircle className="h-5 w-5 text-secondary mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Delivery Process */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-primary dark:text-white text-center mb-10">
              Как происходит доставка
            </h2>
            
            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                {deliverySteps.map((step, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg mr-6">
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading font-semibold text-h4-desktop text-primary dark:text-white mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Table */}
        <section className="py-12 bg-lightBg dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-primary dark:text-white text-center mb-10">
              Стоимость дополнительных услуг
            </h2>
            
            <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-primary text-white">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold">Услуга</th>
                      <th className="px-6 py-4 text-left font-semibold">Стоимость</th>
                      <th className="px-6 py-4 text-left font-semibold">Примечание</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    <tr>
                      <td className="px-6 py-4 text-gray-900 dark:text-white">Подъем на этаж (без лифта)</td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-300">100 ₽/этаж</td>
                      <td className="px-6 py-4 text-gray-500 dark:text-gray-400">За единицу оборудования</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-gray-900 dark:text-white">Занос в помещение</td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-300">500 ₽</td>
                      <td className="px-6 py-4 text-gray-500 dark:text-gray-400">При заказе от 50 000 ₽ - бесплатно</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-gray-900 dark:text-white">Экспресс-доставка</td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-300">1 500 ₽</td>
                      <td className="px-6 py-4 text-gray-500 dark:text-gray-400">В течение 3-4 часов</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-gray-900 dark:text-white">Доставка в выходные</td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-300">1 000 ₽</td>
                      <td className="px-6 py-4 text-gray-500 dark:text-gray-400">Суббота, воскресенье</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-gray-900 dark:text-white">Доставка в вечернее время</td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-300">800 ₽</td>
                      <td className="px-6 py-4 text-gray-500 dark:text-gray-400">После 18:00</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-gray-900 dark:text-white">Вынос упаковки</td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-300">300 ₽</td>
                      <td className="px-6 py-4 text-gray-500 dark:text-gray-400">Утилизация картона и пленки</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Important Information */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-primary dark:text-white text-center mb-10">
                Важная информация
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-card p-6">
                  <h3 className="font-heading font-semibold text-h4-desktop text-primary dark:text-white mb-4 flex items-center">
                    <CheckCircle className="h-6 w-6 text-secondary mr-3" />
                    Что нужно знать при получении
                  </h3>
                  <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                    <li>• Проверьте комплектность товара при получении</li>
                    <li>• Осмотрите упаковку на предмет повреждений</li>
                    <li>• Сверьте модель и серийный номер с документами</li>
                    <li>• Подпишите документы только после проверки</li>
                    <li>• Сохраните все документы для гарантии</li>
                  </ul>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-card p-6">
                  <h3 className="font-heading font-semibold text-h4-desktop text-primary dark:text-white mb-4 flex items-center">
                    <Calculator className="h-6 w-6 text-secondary mr-3" />
                    Расчет стоимости доставки
                  </h3>
                  <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                    <li>• Стоимость зависит от зоны доставки</li>
                    <li>• Вес и габариты товара учитываются</li>
                    <li>• Дополнительные услуги оплачиваются отдельно</li>
                    <li>• Точная стоимость рассчитывается при заказе</li>
                    <li>• Возможна оплата при получении</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Special Conditions */}
        <section className="py-12 bg-amber-50 dark:bg-amber-900/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-start">
                <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-400 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-heading font-semibold text-amber-800 dark:text-amber-200 mb-4">
                    Особые условия доставки
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-amber-700 dark:text-amber-300">
                    <div>
                      <h4 className="font-semibold mb-2">Крупногабаритное оборудование:</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• Доставка манипулятором - от 3 000 ₽</li>
                        <li>• Предварительное согласование маршрута</li>
                        <li>• Возможны ограничения по времени</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Доставка в регионы:</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• Транспортными компаниями</li>
                        <li>• Стоимость рассчитывается индивидуально</li>
                        <li>• Сроки доставки 3-7 дней</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-12 bg-primary">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-white mb-6">
                Остались вопросы по доставке?
              </h2>
              <p className="text-white/90 mb-8">
                Свяжитесь с нами, и мы поможем выбрать оптимальный вариант доставки для вашего заказа
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="tel:+71234567890"
                  className="bg-accent hover:bg-opacity-90 text-white font-semibold py-3 px-8 rounded-md transition-colors flex items-center justify-center"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  Позвонить
                </a>
                <button className="bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-8 rounded-md transition-colors">
                  Рассчитать доставку
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

export default Delivery;