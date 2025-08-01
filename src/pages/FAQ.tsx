import React, { useState } from 'react';
import Header from '../components/home/Header';
import Footer from '../components/home/Footer';
import Breadcrumbs from '../components/shared/Breadcrumbs';
import { ChevronDown, ChevronUp, Search, MessageCircle, Phone, Mail } from 'lucide-react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  {
    id: 1,
    question: 'Какие виды климатического оборудования вы устанавливаете?',
    answer: 'Мы устанавливаем полный спектр климатического оборудования: настенные, кассетные, канальные и напольно-потолочные кондиционеры, VRF и VRV системы, приточно-вытяжные установки, системы вентиляции, тепловые завесы, увлажнители и осушители воздуха, а также системы "умного дома" для управления климатом.',
    category: 'Оборудование'
  },
  {
    id: 2,
    question: 'Сколько времени занимает установка кондиционера?',
    answer: 'Установка обычного настенного кондиционера занимает 3-5 часов. Для мульти-сплит систем время увеличивается до 6-8 часов. Сложные VRF системы могут требовать 1-3 дня в зависимости от количества внутренних блоков и сложности трассы.',
    category: 'Монтаж'
  },
  {
    id: 3,
    question: 'Какая гарантия предоставляется на оборудование и работы?',
    answer: 'На оборудование предоставляется гарантия производителя от 2 до 5 лет в зависимости от бренда. На монтажные работы мы даем гарантию 3 года. При заключении договора на сервисное обслуживание гарантия может быть продлена до 7 лет.',
    category: 'Гарантия'
  },
  {
    id: 4,
    question: 'Нужно ли получать разрешение на установку кондиционера?',
    answer: 'Для установки кондиционера в квартире разрешение не требуется, если наружный блок устанавливается на собственный балкон или лоджию. При установке на фасад здания может потребоваться согласование с управляющей компанией. Для коммерческих объектов требования могут отличаться.',
    category: 'Документы'
  },
  {
    id: 5,
    question: 'Можно ли установить кондиционер зимой?',
    answer: 'Да, монтаж кондиционера можно проводить круглый год. Однако пусконаладочные работы при температуре ниже -5°C не рекомендуются. В этом случае тестирование системы переносится на более теплое время года.',
    category: 'Монтаж'
  },
  {
    id: 6,
    question: 'Как часто нужно обслуживать кондиционер?',
    answer: 'Рекомендуется проводить техническое обслуживание 2 раза в год: перед началом летнего сезона (весной) и перед зимней консервацией (осенью). Для коммерческих объектов с интенсивным использованием может потребоваться более частое обслуживание.',
    category: 'Обслуживание'
  },
  {
    id: 7,
    question: 'Какие документы нужны для гарантийного ремонта?',
    answer: 'Для гарантийного ремонта необходимы: гарантийный талон, товарный чек или накладная, паспорт изделия, акт ввода в эксплуатацию. Также желательно иметь журнал технического обслуживания, подтверждающий соблюдение правил эксплуатации.',
    category: 'Гарантия'
  },
  {
    id: 8,
    question: 'Сколько стоит проектирование системы вентиляции?',
    answer: 'Стоимость проектирования зависит от сложности объекта и составляет от 50 до 150 рублей за м². Для типовых объектов до 200 м² стоимость может быть фиксированной. При заказе монтажа стоимость проекта засчитывается в общую сумму работ.',
    category: 'Стоимость'
  },
  {
    id: 9,
    question: 'Какие способы оплаты вы принимаете?',
    answer: 'Мы принимаем оплату наличными, банковскими картами, безналичным переводом для юридических лиц. Возможна рассрочка платежа: 50% при заключении договора, 50% после завершения работ. Для крупных проектов возможна поэтапная оплата.',
    category: 'Оплата'
  },
  {
    id: 10,
    question: 'Выезжаете ли вы в Московскую область?',
    answer: 'Да, мы работаем в Москве и Московской области в радиусе до 100 км от МКАД. Для объектов за пределами МКАД может взиматься дополнительная плата за выезд в зависимости от удаленности объекта.',
    category: 'География'
  },
  {
    id: 11,
    question: 'Можно ли установить кондиционер в уже готовом ремонте?',
    answer: 'Да, установка возможна в готовом помещении. Мы используем специальные технологии для минимизации пыли и загрязнений. Трассы прокладываются в декоративных коробах или штробах с последующим восстановлением отделки.',
    category: 'Монтаж'
  },
  {
    id: 12,
    question: 'Что включено в стоимость монтажа?',
    answer: 'В стоимость монтажа включено: установка внутреннего и наружного блоков, прокладка трассы до 5 метров, подключение к электросети, заправка фреоном, пусконаладочные работы, уборка после монтажа. Дополнительно оплачивается: превышение длины трассы, сложные крепления, электромонтажные работы.',
    category: 'Стоимость'
  }
];

const categories = ['Все вопросы', 'Оборудование', 'Монтаж', 'Гарантия', 'Обслуживание', 'Стоимость', 'Документы', 'Оплата', 'География'];

const FAQ: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все вопросы');
  const [openItems, setOpenItems] = useState<number[]>([]);

  const filteredFAQ = faqData.filter(item => {
    const matchesCategory = selectedCategory === 'Все вопросы' || item.category === selectedCategory;
    const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main className="pb-12">
        <Breadcrumbs />
        
        {/* Hero Section */}
        <section className="bg-primary py-12">
          <div className="container mx-auto px-4">
            <h1 className="font-heading font-bold text-h1-mobile md:text-h1-desktop text-white text-center mb-6">
              Часто задаваемые вопросы
            </h1>
            <p className="text-white/90 text-center max-w-2xl mx-auto">
              Ответы на самые популярные вопросы о наших услугах и оборудовании
            </p>
          </div>
        </section>

        {/* Search and Categories */}
        <section className="py-8 bg-lightBg dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Search */}
              <div className="relative mb-6">
                <input
                  type="text"
                  placeholder="Поиск по вопросам..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-3 px-4 pr-12 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-lg"
                />
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400" />
              </div>

              {/* Categories */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-primary text-white'
                        : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 hover:bg-primary/10'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ List */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {filteredFAQ.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-600 dark:text-gray-400 text-lg">
                    По вашему запросу ничего не найдено. Попробуйте изменить поисковый запрос или выберите другую категорию.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredFAQ.map((item) => (
                    <div key={item.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-card overflow-hidden">
                      <button
                        onClick={() => toggleItem(item.id)}
                        className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-semibold mr-3">
                              {item.category}
                            </span>
                          </div>
                          <h3 className="font-heading font-semibold text-primary dark:text-white text-left">
                            {item.question}
                          </h3>
                        </div>
                        <div className="ml-4">
                          {openItems.includes(item.id) ? (
                            <ChevronUp className="h-6 w-6 text-gray-400" />
                          ) : (
                            <ChevronDown className="h-6 w-6 text-gray-400" />
                          )}
                        </div>
                      </button>
                      
                      {openItems.includes(item.id) && (
                        <div className="px-6 pb-6">
                          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                              {item.answer}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-12 bg-lightBg dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-primary dark:text-white mb-6">
                Не нашли ответ на свой вопрос?
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Свяжитесь с нами любым удобным способом, и наши специалисты ответят на все ваши вопросы
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-card">
                  <div className="flex justify-center mb-4">
                    <div className="bg-primary/10 rounded-full p-4">
                      <Phone className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="font-heading font-semibold text-primary dark:text-white mb-2">
                    Позвонить
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Получите консультацию по телефону
                  </p>
                  <a 
                    href="tel:+71234567890" 
                    className="bg-primary hover:bg-opacity-90 text-white font-semibold py-2 px-4 rounded-md transition-colors inline-block"
                  >
                    +7 (123) 456-78-90
                  </a>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-card">
                  <div className="flex justify-center mb-4">
                    <div className="bg-primary/10 rounded-full p-4">
                      <Mail className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="font-heading font-semibold text-primary dark:text-white mb-2">
                    Написать
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Отправьте вопрос на email
                  </p>
                  <a 
                    href="mailto:info@nordengineering.ru" 
                    className="bg-primary hover:bg-opacity-90 text-white font-semibold py-2 px-4 rounded-md transition-colors inline-block"
                  >
                    Написать письмо
                  </a>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-card">
                  <div className="flex justify-center mb-4">
                    <div className="bg-primary/10 rounded-full p-4">
                      <MessageCircle className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="font-heading font-semibold text-primary dark:text-white mb-2">
                    Онлайн-чат
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Задайте вопрос в чате
                  </p>
                  <button className="bg-primary hover:bg-opacity-90 text-white font-semibold py-2 px-4 rounded-md transition-colors">
                    Открыть чат
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Questions */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-primary dark:text-white text-center mb-10">
                Самые популярные вопросы
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {faqData.slice(0, 6).map((item) => (
                  <div key={item.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-card p-6">
                    <div className="flex items-center mb-3">
                      <span className="bg-accent/10 text-accent px-2 py-1 rounded text-xs font-semibold">
                        {item.category}
                      </span>
                    </div>
                    <h3 className="font-heading font-semibold text-primary dark:text-white mb-3">
                      {item.question}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
                      {item.answer}
                    </p>
                    <button 
                      onClick={() => toggleItem(item.id)}
                      className="mt-3 text-secondary hover:text-primary dark:hover:text-white font-semibold text-sm"
                    >
                      Читать полностью →
                    </button>
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

export default FAQ;