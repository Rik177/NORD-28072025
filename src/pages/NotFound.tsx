import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SEOHelmet from '../components/shared/SEOHelmet';
import Header from '../components/home/Header';
import Footer from '../components/home/Footer';
import GlobalSearch from '../components/shared/GlobalSearch';
import { 
  Home, 
  Search, 
  ArrowLeft, 
  Phone, 
  Mail, 
  MapPin,
  Clock,
  Wrench,
  Building,
  FileText,
  HelpCircle
} from 'lucide-react';

interface QuickLink {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  category: 'main' | 'catalog' | 'services' | 'info';
}

const quickLinks: QuickLink[] = [
  {
    title: 'Главная страница',
    description: 'Вернуться на главную страницу сайта',
    href: '/',
    icon: <Home className="h-6 w-6" />,
    category: 'main'
  },
  {
    title: 'Каталог оборудования',
    description: 'Просмотреть весь каталог климатического оборудования',
    href: '/catalog',
    icon: <Building className="h-6 w-6" />,
    category: 'catalog'
  },
  {
    title: 'Наши услуги',
    description: 'Проектирование, монтаж и обслуживание систем',
    href: '/services',
    icon: <Wrench className="h-6 w-6" />,
    category: 'services'
  },
  {
    title: 'Контакты',
    description: 'Связаться с нами любым удобным способом',
    href: '/contacts',
    icon: <Phone className="h-6 w-6" />,
    category: 'info'
  },
  {
    title: 'Часто задаваемые вопросы',
    description: 'Ответы на популярные вопросы',
    href: '/faq',
    icon: <HelpCircle className="h-6 w-6" />,
    category: 'info'
  },
  {
    title: 'Блог',
    description: 'Полезные статьи и новости компании',
    href: '/blog',
    icon: <FileText className="h-6 w-6" />,
    category: 'info'
  }
];

const popularPages = [
  { title: 'Кондиционеры', href: '/catalog/air-conditioning' },
          { title: 'Вентиляторы', href: '/catalog/ventilators' },
  { title: 'Проектирование систем', href: '/services/design' },
  { title: 'Монтаж оборудования', href: '/services/installation' },
  { title: 'Отзывы клиентов', href: '/reviews' },
  { title: 'Наши проекты', href: '/projects' }
];

const NotFound: React.FC = () => {
  const [countdown, setCountdown] = useState(10);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          setIsRedirecting(true);
          navigate('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [navigate]);
  
  const stopRedirect = () => {
    setCountdown(0);
  };
  
  const getCategoryLinks = (category: string) => {
    return quickLinks.filter(link => link.category === category);
  };
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Страница не найдена - 404",
    "description": "Запрашиваемая страница не найдена. Воспользуйтесь поиском или перейдите в нужный раздел.",
    "url": "https://nordengineering.ru/404"
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <SEOHelmet
        title="Страница не найдена - 404 | НОРДИНЖИНИРИНГ"
        description="Запрашиваемая страница не найдена. Воспользуйтесь поиском или перейдите в нужный раздел сайта НОРДИНЖИНИРИНГ."
        noindex={true}
        structuredData={structuredData}
      />
      <Header />
      
      <main className="pb-12">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary to-secondary py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto">
              <div className="text-8xl md:text-9xl font-bold text-white/20 mb-4">
                404
              </div>
              <h1 className="font-heading font-bold text-h1-mobile md:text-h1-desktop text-white mb-6">
                Страница не найдена
              </h1>
              <p className="text-white/90 text-lg mb-8">
                К сожалению, запрашиваемая страница не существует или была перемещена. 
                Воспользуйтесь поиском или выберите нужный раздел ниже.
              </p>
              
              {/* Auto-redirect notice */}
              {countdown > 0 && !isRedirecting && (
                <div className="bg-white/10 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-center text-white/90 mb-2">
                    <Clock className="h-5 w-5 mr-2" />
                    <span>Автоматический переход на главную через {countdown} сек</span>
                  </div>
                  <button
                    onClick={stopRedirect}
                    className="text-white/80 hover:text-white text-sm underline"
                  >
                    Отменить переход
                  </button>
                </div>
              )}
              
              {/* Quick Actions */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/"
                  className="inline-flex items-center bg-accent hover:bg-opacity-90 text-white font-semibold py-3 px-6 rounded-md transition-colors"
                >
                  <Home className="h-5 w-5 mr-2" />
                  На главную
                </Link>
                <button
                  onClick={() => window.history.back()}
                  className="inline-flex items-center bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-md transition-colors"
                >
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  Назад
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Search Section */}
        <section className="py-12 bg-lightBg dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-primary dark:text-white mb-6">
                Поиск по сайту
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Попробуйте найти нужную информацию с помощью поиска
              </p>
              <div className="max-w-lg mx-auto">
                <GlobalSearch className="w-full" />
              </div>
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-primary dark:text-white text-center mb-10">
              Популярные разделы
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {quickLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.href}
                  className="group bg-white dark:bg-gray-800 rounded-lg shadow-card p-6 hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-start">
                    <div className="bg-primary/10 rounded-lg p-3 mr-4 group-hover:bg-primary/20 transition-colors">
                      <div className="text-primary">
                        {link.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading font-semibold text-lg text-primary dark:text-white mb-2 group-hover:text-secondary transition-colors">
                        {link.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {link.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            
            {/* Popular Pages */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-card p-8">
              <h3 className="font-heading font-bold text-h3-desktop text-primary dark:text-white mb-6 text-center">
                Часто посещаемые страницы
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {popularPages.map((page, index) => (
                  <Link
                    key={index}
                    to={page.href}
                    className="flex items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
                  >
                    <div className="w-2 h-2 bg-secondary rounded-full mr-3 group-hover:bg-primary transition-colors" />
                    <span className="text-gray-700 dark:text-gray-300 group-hover:text-primary dark:group-hover:text-white transition-colors">
                      {page.title}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-12 bg-primary">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-white mb-6">
                Не нашли что искали?
              </h2>
              <p className="text-white/90 mb-8">
                Свяжитесь с нами, и мы поможем найти нужную информацию или решение
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <a
                  href="tel:+71234567890"
                  className="flex flex-col items-center p-6 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                >
                  <Phone className="h-8 w-8 text-white mb-3" />
                  <h3 className="font-semibold text-white mb-2">Позвонить</h3>
                  <p className="text-white/80 text-sm">+7 (123) 456-78-90</p>
                </a>
                
                <a
                  href="mailto:info@nordengineering.ru"
                  className="flex flex-col items-center p-6 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                >
                  <Mail className="h-8 w-8 text-white mb-3" />
                  <h3 className="font-semibold text-white mb-2">Написать</h3>
                  <p className="text-white/80 text-sm">info@nordengineering.ru</p>
                </a>
                
                <Link
                  to="/contacts"
                  className="flex flex-col items-center p-6 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                >
                  <MapPin className="h-8 w-8 text-white mb-3" />
                  <h3 className="font-semibold text-white mb-2">Приехать</h3>
                  <p className="text-white/80 text-sm">Все контакты</p>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;