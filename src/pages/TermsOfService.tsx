import React from 'react';
import Header from '../components/home/Header';
import Footer from '../components/home/Footer';
import Breadcrumbs from '../components/shared/Breadcrumbs';
import { FileText, Users, Shield, AlertTriangle, CheckCircle, Scale, Calendar, Mail } from 'lucide-react';

const TermsOfService: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main className="pb-12">
        <Breadcrumbs />
        
        {/* Hero Section */}
        <section className="bg-primary py-12">
          <div className="container mx-auto px-4">
            <h1 className="font-heading font-bold text-h1-mobile md:text-h1-desktop text-white text-center mb-6">
              Пользовательское соглашение
            </h1>
            <p className="text-white/90 text-center max-w-2xl mx-auto">
              Условия использования сайта и предоставления услуг компании НОРДИНЖИНИРИНГ
            </p>
          </div>
        </section>

        {/* Last Updated */}
        <section className="py-6 bg-lightBg dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center text-gray-600 dark:text-gray-400">
              <Calendar className="h-5 w-5 mr-2" />
              <span>Последнее обновление: 15 января 2025 года</span>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            
            {/* Introduction */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-card p-8 mb-8">
              <div className="flex items-center mb-6">
                <FileText className="h-8 w-8 text-primary mr-4" />
                <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-primary dark:text-white">
                  Общие положения
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                Настоящее Пользовательское соглашение (далее – Соглашение) регулирует отношения между ООО "НОРДИНЖИНИРИНГ" (далее – Компания) и пользователями сайта nordengineering.ru (далее – Сайт).
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                Использование Сайта означает полное и безоговорочное принятие пользователем условий настоящего Соглашения. Если вы не согласны с какими-либо условиями, пожалуйста, не используйте Сайт.
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-3 flex-shrink-0 mt-0.5" />
                  <p className="text-blue-800 dark:text-blue-200 text-sm">
                    Используя наш сайт, вы подтверждаете, что достигли возраста 18 лет или действуете с согласия родителей/опекунов.
                  </p>
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-card p-8 mb-8">
              <div className="flex items-center mb-6">
                <Users className="h-8 w-8 text-primary mr-4" />
                <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-primary dark:text-white">
                  Предоставляемые услуги
                </h2>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Через Сайт Компания предоставляет следующие услуги:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-heading font-semibold text-h4-desktop text-primary dark:text-white mb-3">
                    Основные услуги:
                  </h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-secondary mr-3 flex-shrink-0 mt-0.5" />
                      <span>Проектирование систем вентиляции и кондиционирования</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-secondary mr-3 flex-shrink-0 mt-0.5" />
                      <span>Монтаж климатического оборудования</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-secondary mr-3 flex-shrink-0 mt-0.5" />
                      <span>Сервисное обслуживание и ремонт</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-secondary mr-3 flex-shrink-0 mt-0.5" />
                      <span>Поставка оборудования</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-heading font-semibold text-h4-desktop text-primary dark:text-white mb-3">
                    Информационные услуги:
                  </h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-secondary mr-3 flex-shrink-0 mt-0.5" />
                      <span>Консультации по выбору оборудования</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-secondary mr-3 flex-shrink-0 mt-0.5" />
                      <span>Техническая поддержка</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-secondary mr-3 flex-shrink-0 mt-0.5" />
                      <span>Информация о продукции</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-secondary mr-3 flex-shrink-0 mt-0.5" />
                      <span>Обучающие материалы</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* User Obligations */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-card p-8 mb-8">
              <div className="flex items-center mb-6">
                <Scale className="h-8 w-8 text-primary mr-4" />
                <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-primary dark:text-white">
                  Обязанности пользователей
                </h2>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                При использовании Сайта пользователь обязуется:
              </p>
              
              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">Разрешенные действия</h3>
                  <ul className="text-gray-600 dark:text-gray-300 text-sm space-y-1">
                    <li>• Использовать Сайт в соответствии с его назначением</li>
                    <li>• Предоставлять достоверную информацию</li>
                    <li>• Соблюдать авторские права и права интеллектуальной собственности</li>
                    <li>• Уважать права других пользователей</li>
                  </ul>
                </div>
                
                <div className="border-l-4 border-red-500 pl-4">
                  <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2">Запрещенные действия</h3>
                  <ul className="text-gray-600 dark:text-gray-300 text-sm space-y-1">
                    <li>• Нарушать работу Сайта или серверов</li>
                    <li>• Распространять вредоносное ПО</li>
                    <li>• Использовать автоматизированные системы для сбора данных</li>
                    <li>• Размещать незаконный или оскорбительный контент</li>
                    <li>• Нарушать права третьих лиц</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Intellectual Property */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-card p-8 mb-8">
              <div className="flex items-center mb-6">
                <Shield className="h-8 w-8 text-primary mr-4" />
                <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-primary dark:text-white">
                  Интеллектуальная собственность
                </h2>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Все материалы Сайта, включая тексты, изображения, графику, логотипы, программное обеспечение и дизайн, являются интеллектуальной собственностью Компании или используются на законных основаниях.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-lightBg dark:bg-gray-700 p-4 rounded-lg">
                  <h3 className="font-semibold text-primary dark:text-white mb-2">Права Компании</h3>
                  <ul className="text-gray-600 dark:text-gray-300 text-sm space-y-1">
                    <li>• Исключительные права на контент</li>
                    <li>• Защита товарных знаков</li>
                    <li>• Авторские права на дизайн</li>
                    <li>• Права на программное обеспечение</li>
                  </ul>
                </div>
                
                <div className="bg-lightBg dark:bg-gray-700 p-4 rounded-lg">
                  <h3 className="font-semibold text-primary dark:text-white mb-2">Права пользователей</h3>
                  <ul className="text-gray-600 dark:text-gray-300 text-sm space-y-1">
                    <li>• Просмотр материалов для личного использования</li>
                    <li>• Цитирование с указанием источника</li>
                    <li>• Использование в образовательных целях</li>
                    <li>• Обратная связь и комментарии</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Liability */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-card p-8 mb-8">
              <div className="flex items-center mb-6">
                <AlertTriangle className="h-8 w-8 text-primary mr-4" />
                <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-primary dark:text-white">
                  Ответственность и ограничения
                </h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-heading font-semibold text-h4-desktop text-primary dark:text-white mb-3">
                    Ответственность Компании:
                  </h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    <li>• Компания стремится обеспечить бесперебойную работу Сайта</li>
                    <li>• Мы не гарантируем отсутствие технических сбоев</li>
                    <li>• Информация на Сайте носит справочный характер</li>
                    <li>• Окончательные условия определяются договором</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-heading font-semibold text-h4-desktop text-primary dark:text-white mb-3">
                    Ответственность пользователя:
                  </h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    <li>• Пользователь несет ответственность за достоверность предоставленных данных</li>
                    <li>• За нарушение условий использования Сайта</li>
                    <li>• За ущерб, причиненный третьим лицам</li>
                    <li>• За соблюдение применимого законодательства</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Privacy and Data */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-card p-8 mb-8">
              <div className="flex items-center mb-6">
                <Shield className="h-8 w-8 text-primary mr-4" />
                <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-primary dark:text-white">
                  Конфиденциальность и персональные данные
                </h2>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                Обработка персональных данных пользователей осуществляется в соответствии с Политикой конфиденциальности, которая является неотъемлемой частью настоящего Соглашения.
              </p>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <p className="text-blue-800 dark:text-blue-200 text-sm">
                  Используя Сайт, вы соглашаетесь с обработкой ваших персональных данных в соответствии с 
                  <a href="/privacy-policy" className="font-semibold hover:underline ml-1">Политикой конфиденциальности</a>.
                </p>
              </div>
            </div>

            {/* Changes and Termination */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-card p-8 mb-8">
              <div className="flex items-center mb-6">
                <FileText className="h-8 w-8 text-primary mr-4" />
                <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-primary dark:text-white">
                  Изменения и прекращение действия
                </h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-primary dark:text-white mb-2">Изменение условий</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Компания оставляет за собой право изменять условия настоящего Соглашения. Изменения вступают в силу с момента их публикации на Сайте.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-primary dark:text-white mb-2">Прекращение использования</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Пользователь может прекратить использование Сайта в любое время. Компания может ограничить доступ при нарушении условий Соглашения.
                  </p>
                </div>
              </div>
            </div>

            {/* Applicable Law */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-card p-8 mb-8">
              <div className="flex items-center mb-6">
                <Scale className="h-8 w-8 text-primary mr-4" />
                <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-primary dark:text-white">
                  Применимое право и разрешение споров
                </h2>
              </div>
              
              <div className="space-y-4">
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Настоящее Соглашение регулируется законодательством Российской Федерации. Все споры, возникающие в связи с использованием Сайта, подлежат рассмотрению в судах по месту нахождения Компании.
                </p>
                
                <div className="bg-lightBg dark:bg-gray-700 p-4 rounded-lg">
                  <h3 className="font-semibold text-primary dark:text-white mb-2">Досудебное урегулирование</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Стороны обязуются предпринять попытки досудебного урегулирования споров путем переговоров в течение 30 дней с момента возникновения разногласий.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-primary rounded-lg p-8 text-center">
              <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-white mb-4">
                Контактная информация
              </h2>
              <p className="text-white/90 mb-6">
                По вопросам, связанным с настоящим Соглашением, обращайтесь:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                <div className="bg-white/10 rounded-lg p-4">
                  <Mail className="h-6 w-6 text-white mx-auto mb-2" />
                  <p className="text-white font-semibold">Email</p>
                  <a href="mailto:legal@nordengineering.ru" className="text-accent hover:underline">
                    legal@nordengineering.ru
                  </a>
                </div>
                
                <div className="bg-white/10 rounded-lg p-4">
                  <FileText className="h-6 w-6 text-white mx-auto mb-2" />
                  <p className="text-white font-semibold">Юридический адрес</p>
                  <p className="text-white/80 text-sm">
                    123456, г. Москва, ул. Примерная, д. 123
                  </p>
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

export default TermsOfService;