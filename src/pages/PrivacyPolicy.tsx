import React from 'react';
import Header from '../components/home/Header';
import Footer from '../components/home/Footer';
import Breadcrumbs from '../components/shared/Breadcrumbs';
import { Shield, Eye, Lock, Database, UserCheck, Mail, Phone, Calendar } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main className="pb-12">
        <Breadcrumbs />
        
        {/* Hero Section */}
        <section className="bg-primary py-12">
          <div className="container mx-auto px-4">
            <h1 className="font-heading font-bold text-h1-mobile md:text-h1-desktop text-white text-center mb-6">
              Политика конфиденциальности
            </h1>
            <p className="text-white/90 text-center max-w-2xl mx-auto">
              Информация о том, как мы собираем, используем и защищаем ваши персональные данные
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
                <Shield className="h-8 w-8 text-primary mr-4" />
                <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-primary dark:text-white">
                  Общие положения
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                Настоящая Политика конфиденциальности персональных данных (далее – Политика конфиденциальности) действует в отношении всей информации, которую сайт nordengineering.ru, расположенный на доменном имени nordengineering.ru (а также его поддоменах), может получить о Пользователе во время использования сайта nordengineering.ru (а также его поддоменов), его программ и его продуктов.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Использование сервисов сайта nordengineering.ru означает безоговорочное согласие Пользователя с настоящей Политикой конфиденциальности и указанными в ней условиями обработки его персональной информации.
              </p>
            </div>

            {/* Data Collection */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-card p-8 mb-8">
              <div className="flex items-center mb-6">
                <Database className="h-8 w-8 text-primary mr-4" />
                <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-primary dark:text-white">
                  Какие данные мы собираем
                </h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-heading font-semibold text-h4-desktop text-primary dark:text-white mb-3">
                    Персональные данные, предоставляемые добровольно:
                  </h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    <li className="flex items-start">
                      <UserCheck className="h-5 w-5 text-secondary mr-3 flex-shrink-0 mt-0.5" />
                      <span>Имя, фамилия, отчество</span>
                    </li>
                    <li className="flex items-start">
                      <Phone className="h-5 w-5 text-secondary mr-3 flex-shrink-0 mt-0.5" />
                      <span>Номер телефона</span>
                    </li>
                    <li className="flex items-start">
                      <Mail className="h-5 w-5 text-secondary mr-3 flex-shrink-0 mt-0.5" />
                      <span>Адрес электронной почты</span>
                    </li>
                    <li className="flex items-start">
                      <Database className="h-5 w-5 text-secondary mr-3 flex-shrink-0 mt-0.5" />
                      <span>Информация о компании (название, должность)</span>
                    </li>
                    <li className="flex items-start">
                      <Database className="h-5 w-5 text-secondary mr-3 flex-shrink-0 mt-0.5" />
                      <span>Сообщения и комментарии, оставленные на сайте</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-heading font-semibold text-h4-desktop text-primary dark:text-white mb-3">
                    Данные, собираемые автоматически:
                  </h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    <li className="flex items-start">
                      <Eye className="h-5 w-5 text-secondary mr-3 flex-shrink-0 mt-0.5" />
                      <span>IP-адрес и данные о местоположении</span>
                    </li>
                    <li className="flex items-start">
                      <Eye className="h-5 w-5 text-secondary mr-3 flex-shrink-0 mt-0.5" />
                      <span>Информация о браузере и устройстве</span>
                    </li>
                    <li className="flex items-start">
                      <Eye className="h-5 w-5 text-secondary mr-3 flex-shrink-0 mt-0.5" />
                      <span>Данные о посещенных страницах и времени пребывания</span>
                    </li>
                    <li className="flex items-start">
                      <Eye className="h-5 w-5 text-secondary mr-3 flex-shrink-0 mt-0.5" />
                      <span>Файлы cookie и аналогичные технологии</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Data Usage */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-card p-8 mb-8">
              <div className="flex items-center mb-6">
                <UserCheck className="h-8 w-8 text-primary mr-4" />
                <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-primary dark:text-white">
                  Как мы используем ваши данные
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-heading font-semibold text-h4-desktop text-primary dark:text-white mb-3">
                    Основные цели:
                  </h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    <li>• Обработка заявок и запросов</li>
                    <li>• Предоставление услуг и консультаций</li>
                    <li>• Связь с клиентами</li>
                    <li>• Выполнение договорных обязательств</li>
                    <li>• Техническая поддержка</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-heading font-semibold text-h4-desktop text-primary dark:text-white mb-3">
                    Дополнительные цели:
                  </h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    <li>• Улучшение качества сервиса</li>
                    <li>• Анализ использования сайта</li>
                    <li>• Информирование о новых услугах</li>
                    <li>• Проведение маркетинговых исследований</li>
                    <li>• Обеспечение безопасности</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Data Protection */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-card p-8 mb-8">
              <div className="flex items-center mb-6">
                <Lock className="h-8 w-8 text-primary mr-4" />
                <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-primary dark:text-white">
                  Защита персональных данных
                </h2>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Мы применяем технические и организационные меры для защиты персональных данных от неправомерного доступа, изменения, раскрытия или уничтожения:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-heading font-semibold text-h4-desktop text-primary dark:text-white mb-3">
                    Технические меры:
                  </h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    <li>• SSL-шифрование данных</li>
                    <li>• Защищенные серверы</li>
                    <li>• Регулярное обновление ПО</li>
                    <li>• Мониторинг безопасности</li>
                    <li>• Резервное копирование</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-heading font-semibold text-h4-desktop text-primary dark:text-white mb-3">
                    Организационные меры:
                  </h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    <li>• Ограниченный доступ к данным</li>
                    <li>• Обучение сотрудников</li>
                    <li>• Политики безопасности</li>
                    <li>• Контроль доступа</li>
                    <li>• Аудит безопасности</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* User Rights */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-card p-8 mb-8">
              <div className="flex items-center mb-6">
                <UserCheck className="h-8 w-8 text-primary mr-4" />
                <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-primary dark:text-white">
                  Ваши права
                </h2>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                В соответствии с действующим законодательством, вы имеете следующие права в отношении ваших персональных данных:
              </p>
              
              <div className="space-y-4">
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-semibold text-primary dark:text-white mb-2">Право на доступ</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Получение информации о том, какие персональные данные мы обрабатываем
                  </p>
                </div>
                
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-semibold text-primary dark:text-white mb-2">Право на исправление</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Исправление неточных или неполных персональных данных
                  </p>
                </div>
                
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-semibold text-primary dark:text-white mb-2">Право на удаление</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Удаление персональных данных при определенных условиях
                  </p>
                </div>
                
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-semibold text-primary dark:text-white mb-2">Право на ограничение обработки</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Ограничение обработки персональных данных в определенных случаях
                  </p>
                </div>
                
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-semibold text-primary dark:text-white mb-2">Право на отзыв согласия</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Отзыв согласия на обработку персональных данных в любое время
                  </p>
                </div>
              </div>
            </div>

            {/* Data Sharing */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-card p-8 mb-8">
              <div className="flex items-center mb-6">
                <Database className="h-8 w-8 text-primary mr-4" />
                <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-primary dark:text-white">
                  Передача данных третьим лицам
                </h2>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Мы не продаем, не обмениваем и не передаем ваши персональные данные третьим лицам без вашего согласия, за исключением случаев, предусмотренных законодательством:
              </p>
              
              <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0"></span>
                  <span>Поставщикам услуг, которые помогают нам в работе сайта (хостинг, аналитика)</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0"></span>
                  <span>Государственным органам по их законному требованию</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0"></span>
                  <span>В случае реорганизации или продажи бизнеса</span>
                </li>
              </ul>
            </div>

            {/* Data Retention */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-card p-8 mb-8">
              <div className="flex items-center mb-6">
                <Calendar className="h-8 w-8 text-primary mr-4" />
                <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-primary dark:text-white">
                  Сроки хранения данных
                </h2>
              </div>
              
              <div className="space-y-4">
                <div className="bg-lightBg dark:bg-gray-700 p-4 rounded-lg">
                  <h3 className="font-semibold text-primary dark:text-white mb-2">Данные клиентов</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Хранятся в течение срока действия договора и 5 лет после его окончания
                  </p>
                </div>
                
                <div className="bg-lightBg dark:bg-gray-700 p-4 rounded-lg">
                  <h3 className="font-semibold text-primary dark:text-white mb-2">Данные посетителей сайта</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Хранятся в течение 3 лет с момента последнего обращения
                  </p>
                </div>
                
                <div className="bg-lightBg dark:bg-gray-700 p-4 rounded-lg">
                  <h3 className="font-semibold text-primary dark:text-white mb-2">Технические данные</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Хранятся в течение 1 года для обеспечения безопасности и аналитики
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
                По вопросам обработки персональных данных обращайтесь к нам:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                <div className="bg-white/10 rounded-lg p-4">
                  <Mail className="h-6 w-6 text-white mx-auto mb-2" />
                  <p className="text-white font-semibold">Email</p>
                  <a href="mailto:privacy@nordengineering.ru" className="text-accent hover:underline">
                    privacy@nordengineering.ru
                  </a>
                </div>
                
                <div className="bg-white/10 rounded-lg p-4">
                  <Phone className="h-6 w-6 text-white mx-auto mb-2" />
                  <p className="text-white font-semibold">Телефон</p>
                  <a href="tel:+71234567890" className="text-accent hover:underline">
                    +7 (123) 456-78-90
                  </a>
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

export default PrivacyPolicy;