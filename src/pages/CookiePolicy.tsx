import React from 'react';
import Header from '../components/home/Header';
import Footer from '../components/home/Footer';
import Breadcrumbs from '../components/shared/Breadcrumbs';
import { Cookie, Settings, Eye, BarChart3, Shield, Calendar, CheckCircle, X } from 'lucide-react';

const cookieTypes = [
  {
    icon: <Settings className="h-8 w-8 text-green-600" />,
    title: 'Необходимые cookies',
    description: 'Обеспечивают базовую функциональность сайта',
    essential: true,
    examples: [
      'Сохранение настроек сессии',
      'Обеспечение безопасности',
      'Запоминание выбранного языка',
      'Корзина покупок'
    ],
    retention: 'Сессия или до 1 года'
  },
  {
    icon: <BarChart3 className="h-8 w-8 text-blue-600" />,
    title: 'Аналитические cookies',
    description: 'Помогают понять, как посетители используют сайт',
    essential: false,
    examples: [
      'Google Analytics',
      'Яндекс.Метрика',
      'Статистика посещений',
      'Анализ поведения пользователей'
    ],
    retention: 'До 2 лет'
  },
  {
    icon: <Eye className="h-8 w-8 text-purple-600" />,
    title: 'Функциональные cookies',
    description: 'Улучшают функциональность и персонализацию',
    essential: false,
    examples: [
      'Запоминание предпочтений',
      'Персонализация контента',
      'Социальные сети',
      'Чат-боты'
    ],
    retention: 'До 1 года'
  },
  {
    icon: <Shield className="h-8 w-8 text-orange-600" />,
    title: 'Маркетинговые cookies',
    description: 'Используются для показа релевантной рекламы',
    essential: false,
    examples: [
      'Ретаргетинг',
      'Персонализированная реклама',
      'Отслеживание конверсий',
      'A/B тестирование'
    ],
    retention: 'До 1 года'
  }
];

const CookiePolicy: React.FC = () => {
  const [cookieSettings, setCookieSettings] = React.useState({
    necessary: true,
    analytics: false,
    functional: false,
    marketing: false
  });

  const handleCookieToggle = (type: keyof typeof cookieSettings) => {
    if (type === 'necessary') return; // Необходимые cookies нельзя отключить
    
    setCookieSettings(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const saveSettings = () => {
    // Здесь будет логика сохранения настроек cookies
    console.log('Cookie settings saved:', cookieSettings);
    alert('Настройки cookies сохранены!');
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
              Политика использования cookies
            </h1>
            <p className="text-white/90 text-center max-w-2xl mx-auto">
              Информация о том, как мы используем файлы cookie и аналогичные технологии на нашем сайте
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
            
            {/* What are Cookies */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-card p-8 mb-8">
              <div className="flex items-center mb-6">
                <Cookie className="h-8 w-8 text-primary mr-4" />
                <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-primary dark:text-white">
                  Что такое cookies?
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                Cookies (куки) — это небольшие текстовые файлы, которые сохраняются на вашем устройстве (компьютере, планшете или мобильном телефоне) при посещении веб-сайтов. Они помогают сайтам запоминать информацию о вашем визите, что может сделать ваше следующее посещение более удобным и полезным.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Cookies не могут получить доступ к данным на вашем жестком диске или передать вирусы. Они содержат только информацию, которую вы предоставляете сайту, или данные о том, как вы используете сайт.
              </p>
            </div>

            {/* Cookie Types */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-card p-8 mb-8">
              <div className="flex items-center mb-6">
                <Settings className="h-8 w-8 text-primary mr-4" />
                <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-primary dark:text-white">
                  Типы cookies, которые мы используем
                </h2>
              </div>
              
              <div className="space-y-6">
                {cookieTypes.map((type, index) => (
                  <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 mr-4">
                          {type.icon}
                        </div>
                        <div>
                          <h3 className="font-heading font-semibold text-h4-desktop text-primary dark:text-white">
                            {type.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 text-sm">
                            {type.description}
                          </p>
                        </div>
                      </div>
                      {type.essential ? (
                        <span className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300 px-3 py-1 rounded-full text-xs font-semibold">
                          Обязательные
                        </span>
                      ) : (
                        <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-semibold">
                          Опциональные
                        </span>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-primary dark:text-white mb-2">Примеры использования:</h4>
                        <ul className="space-y-1">
                          {type.examples.map((example, exampleIndex) => (
                            <li key={exampleIndex} className="flex items-start text-sm text-gray-600 dark:text-gray-300">
                              <span className="w-2 h-2 bg-secondary rounded-full mr-2 mt-2 flex-shrink-0"></span>
                              {example}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-primary dark:text-white mb-2">Срок хранения:</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{type.retention}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cookie Settings */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-card p-8 mb-8">
              <div className="flex items-center mb-6">
                <Settings className="h-8 w-8 text-primary mr-4" />
                <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-primary dark:text-white">
                  Настройки cookies
                </h2>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Вы можете управлять использованием cookies на нашем сайте. Обратите внимание, что отключение некоторых cookies может повлиять на функциональность сайта.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-primary dark:text-white">Необходимые cookies</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Обеспечивают базовую работу сайта</p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500 mr-3">Всегда включены</span>
                    <div className="w-12 h-6 bg-green-500 rounded-full flex items-center justify-end px-1">
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-primary dark:text-white">Аналитические cookies</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Помогают улучшить сайт</p>
                  </div>
                  <button
                    onClick={() => handleCookieToggle('analytics')}
                    className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                      cookieSettings.analytics ? 'bg-green-500 justify-end' : 'bg-gray-300 dark:bg-gray-600 justify-start'
                    }`}
                  >
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </button>
                </div>
                
                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-primary dark:text-white">Функциональные cookies</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Улучшают пользовательский опыт</p>
                  </div>
                  <button
                    onClick={() => handleCookieToggle('functional')}
                    className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                      cookieSettings.functional ? 'bg-green-500 justify-end' : 'bg-gray-300 dark:bg-gray-600 justify-start'
                    }`}
                  >
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </button>
                </div>
                
                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-primary dark:text-white">Маркетинговые cookies</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Персонализируют рекламу</p>
                  </div>
                  <button
                    onClick={() => handleCookieToggle('marketing')}
                    className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                      cookieSettings.marketing ? 'bg-green-500 justify-end' : 'bg-gray-300 dark:bg-gray-600 justify-start'
                    }`}
                  >
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </button>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <button
                  onClick={saveSettings}
                  className="bg-primary hover:bg-opacity-90 text-white font-semibold py-3 px-8 rounded-md transition-colors"
                >
                  Сохранить настройки
                </button>
              </div>
            </div>

            {/* Third Party Cookies */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-card p-8 mb-8">
              <div className="flex items-center mb-6">
                <Eye className="h-8 w-8 text-primary mr-4" />
                <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-primary dark:text-white">
                  Cookies третьих сторон
                </h2>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Мы можем использовать сервисы третьих сторон, которые также устанавливают cookies на вашем устройстве:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h3 className="font-semibold text-primary dark:text-white mb-2">Google Analytics</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    Анализ посещаемости и поведения пользователей
                  </p>
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline text-sm">
                    Политика конфиденциальности Google
                  </a>
                </div>
                
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h3 className="font-semibold text-primary dark:text-white mb-2">Яндекс.Метрика</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    Веб-аналитика и статистика посещений
                  </p>
                  <a href="https://yandex.ru/legal/confidential/" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline text-sm">
                    Политика конфиденциальности Яндекс
                  </a>
                </div>
              </div>
            </div>

            {/* Browser Settings */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-card p-8 mb-8">
              <div className="flex items-center mb-6">
                <Settings className="h-8 w-8 text-primary mr-4" />
                <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-primary dark:text-white">
                  Управление cookies в браузере
                </h2>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Вы также можете управлять cookies через настройки вашего браузера:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h3 className="font-semibold text-primary dark:text-white mb-2">Chrome</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-300">
                    Настройки → Конфиденциальность и безопасность → Файлы cookie
                  </p>
                </div>
                
                <div className="text-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h3 className="font-semibold text-primary dark:text-white mb-2">Firefox</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-300">
                    Настройки → Приватность и защита → Куки и данные сайтов
                  </p>
                </div>
                
                <div className="text-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h3 className="font-semibold text-primary dark:text-white mb-2">Safari</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-300">
                    Настройки → Конфиденциальность → Управление данными веб-сайта
                  </p>
                </div>
                
                <div className="text-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h3 className="font-semibold text-primary dark:text-white mb-2">Edge</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-300">
                    Настройки → Конфиденциальность → Файлы cookie и разрешения сайта
                  </p>
                </div>
              </div>
            </div>

            {/* Important Notice */}
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-6 mb-8">
              <div className="flex items-start">
                <Shield className="h-6 w-6 text-amber-600 dark:text-amber-400 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-heading font-semibold text-amber-800 dark:text-amber-200 mb-2">
                    Важная информация
                  </h3>
                  <ul className="space-y-2 text-amber-700 dark:text-amber-300 text-sm">
                    <li>• Отключение cookies может повлиять на функциональность сайта</li>
                    <li>• Некоторые функции могут стать недоступными</li>
                    <li>• Мы не используем cookies для сбора личной информации без согласия</li>
                    <li>• Вы можете изменить настройки cookies в любое время</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-primary rounded-lg p-8 text-center">
              <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-white mb-4">
                Вопросы о cookies?
              </h2>
              <p className="text-white/90 mb-6">
                Если у вас есть вопросы о нашем использовании cookies, свяжитесь с нами:
              </p>
              
              <div className="max-w-md mx-auto">
                <div className="bg-white/10 rounded-lg p-4">
                  <p className="text-white font-semibold mb-2">Email для вопросов о cookies</p>
                  <a href="mailto:privacy@nordengineering.ru" className="text-accent hover:underline">
                    privacy@nordengineering.ru
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

export default CookiePolicy;