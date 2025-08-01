import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Search, Phone, Heart, ChevronDown, Sun, Moon, MapPin, Building2, Box, Wrench, FolderOpen, Award, PanelTop, X, User, MessageCircle } from 'lucide-react';
import GlobalSearch from '../shared/GlobalSearch';
import ConsultationForm, { ConsultationFormData } from '../catalog/ConsultationForm';
import { ventilationCategories } from '../../data/ventilationData';

interface MenuItem {
  label: string;
  path: string;
  icon?: React.ReactNode;
  submenu?: {
    label: string;
    path: string;
  }[];
}

const menuItems: MenuItem[] = [
  {
    label: 'О компании',
    path: '/about',
    icon: <Building2 className="h-5 w-5" />,
    submenu: [
      { label: 'О нас', path: '/about/about-us' },
      { label: 'Наша команда', path: '/about/team' },
      { label: 'Лицензии и сертификаты', path: '/about/licenses' },
      { label: 'Реквизиты', path: '/about/requisites' }
    ]
  },
  {
    label: 'Каталог',
    path: '/catalog',
    icon: <Box className="h-5 w-5" />,
    submenu: ventilationCategories
      .filter(cat => !cat.parentId) // Только основные категории
      .map(cat => ({
        label: cat.title,
        path: `/catalog/${cat.slug}`
      }))
  },
  {
    label: 'Услуги',
    path: '/services',
    icon: <Wrench className="h-5 w-5" />,
    submenu: [
      { label: 'Проектирование', path: '/services/design' },
      { label: 'Монтаж', path: '/services/installation' },
      { label: 'Сервисное обслуживание', path: '/services/maintenance' },
      { label: 'Гарантийный ремонт', path: '/services/warranty' }
    ]
  },
  {
    label: 'Проекты',
    path: '/projects',
    icon: <FolderOpen className="h-5 w-5" />
  },
  {
    label: 'Блог',
    path: '/blog',
    icon: <PanelTop className="h-5 w-5"/>
  },
  {
    label: 'Бренды',
    path: '/brands'
  }
];

const Header: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isGlobalSearchOpen, setIsGlobalSearchOpen] = useState(false);
  const [currentCity, setCurrentCity] = useState('Москва');
  const [isScrolled, setIsScrolled] = useState(false);
  const [showConsultationForm, setShowConsultationForm] = useState(false);
  const [expandedSubmenu, setExpandedSubmenu] = useState<string | null>(null);
  const [formData, setFormData] = useState<ConsultationFormData>({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    const initializeTheme = () => {
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme) {
        setIsDarkMode(storedTheme === 'dark');
        updateTheme(storedTheme === 'dark');
      } else {
        if (window.matchMedia) {
          const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
          const prefersDark = darkModeQuery.matches;
          setIsDarkMode(prefersDark);
          updateTheme(prefersDark);
          
          try {
            darkModeQuery.addEventListener('change', (e) => {
              if (!localStorage.getItem('theme')) {
                setIsDarkMode(e.matches);
                updateTheme(e.matches);
              }
            });
          } catch (e) {
            darkModeQuery.addListener((e) => {
              if (!localStorage.getItem('theme')) {
                setIsDarkMode(e.matches);
                updateTheme(e.matches);
              }
            });
          }
        }
      }
    };

    initializeTheme();
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const updateTheme = (isDark: boolean) => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    document.body.setAttribute('data-theme', isDark ? 'dark' : 'light');
    document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
  };

  const toggleDarkMode = () => {
    const newIsDark = !isDarkMode;
    setIsDarkMode(newIsDark);
    updateTheme(newIsDark);
    localStorage.setItem('theme', newIsDark ? 'dark' : 'light');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (!isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Consultation form submitted:', formData);
    setShowConsultationForm(false);
    setFormData({ name: '', phone: '', email: '', message: '' });
    alert('Спасибо! Мы свяжемся с вами в ближайшее время.');
  };

  const toggleSubmenu = (label: string) => {
    setExpandedSubmenu(expandedSubmenu === label ? null : label);
  };

  // Закрытие мобильного меню при нажатии Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
        document.body.style.overflow = '';
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header 
        className={`sticky top-0 w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg' 
            : 'bg-white dark:bg-gray-900'
        }`}
        role="banner"
      >
        {/* Top bar - скрыт на мобильных */}
        <div className="hidden md:block bg-primary dark:bg-gray-800 text-white py-2">
          <div className="container mx-auto px-4 flex justify-between items-center text-sm">
            <div className="flex items-center space-x-4">
              <button 
                className="flex items-center hover:text-accent"
                aria-label={`Текущий город: ${currentCity}. Нажмите для изменения`}
              >
                <MapPin className="h-4 w-4 mr-1" aria-hidden="true" />
                <span>{currentCity}</span>
              </button>
              <a 
                href="tel:+71234567890" 
                className="flex items-center hover:text-accent"
                aria-label="Позвонить по номеру +7 (123) 456-78-90"
              >
                <Phone className="h-4 w-4 mr-1" aria-hidden="true" />
                <span>+7 (123) 456-78-90</span>
              </a>
            </div>
            <nav className="flex space-x-4" role="navigation" aria-label="Дополнительная навигация">
              <a href="/about" className="hover:text-accent">О компании</a>
              <a href="/delivery" className="hover:text-accent">Доставка</a>
              <a href="/contacts" className="hover:text-accent">Контакты</a>
            </nav>
          </div>
        </div>

        {/* Main header */}
        <div className="bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4 py-3 md:py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link 
                to="/" 
                className="flex items-center space-x-1 flex-shrink-0"
                aria-label="НОРДИНЖИНИРИНГ - перейти на главную страницу"
              >
                <span className="font-heading font-bold text-xl md:text-2xl text-primary dark:text-primary-300">НОРД</span>
                <span className="font-heading font-bold text-xl md:text-2xl text-secondary-700 dark:text-accent">ИНЖИНИРИНГ</span>
              </Link>

              {/* Mobile actions */}
              <div className="flex items-center space-x-2 md:hidden">
                <button
                  onClick={() => setIsGlobalSearchOpen(true)}
                  className="p-2 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-white"
                  aria-label="Открыть поиск"
                >
                  <Search className="h-6 w-6" />
                </button>
                <a
                  href="tel:+71234567890"
                  className="p-2 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-white"
                  aria-label="Позвонить"
                >
                  <Phone className="h-6 w-6" />
                </a>
                <button
                  onClick={toggleMobileMenu}
                  className="p-2 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-white"
                  aria-label={isMobileMenuOpen ? "Закрыть меню" : "Открыть меню"}
                  aria-expanded={isMobileMenuOpen}
                >
                  {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>

              {/* Desktop search */}
              <div className="hidden md:flex flex-1 max-w-xl mx-8">
                <GlobalSearch className="w-full" />
              </div>

              {/* Desktop actions */}
              <div className="hidden md:flex items-center space-x-4">
                <button 
                  className="flex flex-col items-center text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-white p-2"
                  aria-label="Избранные товары"
                >
                  <Heart className="h-5 w-5" aria-hidden="true" />
                  <span className="text-xs mt-1">Избранное</span>
                </button>
                <button 
                  onClick={toggleDarkMode} 
                  className="flex flex-col items-center text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-white p-2 w-[46.6px]"
                  aria-label={isDarkMode ? 'Включить светлую тему' : 'Включить темную тему'}
                >
                  {isDarkMode ? (
                    <>
                      <Sun className="h-5 w-5" aria-hidden="true" />
                      <span className="text-xs mt-1">Светлая</span>
                    </>
                  ) : (
                    <>
                      <Moon className="h-5 w-5" aria-hidden="true" />
                      <span className="text-xs mt-1">Темная</span>
                    </>
                  )}
                </button>
                <button 
                  className="bg-accent hover:bg-opacity-90 text-white font-semibold px-4 py-2 rounded-md transition-colors"
                  onClick={() => setShowConsultationForm(true)}
                >
                  Консультация
                </button>
              </div>
            </div>
          </div>

          {/* Desktop navigation */}
          <nav 
            className="hidden md:block border-t border-gray-200 dark:border-gray-700"
            role="navigation"
            aria-label="Основная навигация"
          >
            <div className="container mx-auto px-4">
              <ul className="flex items-center space-x-6 py-3">
                {menuItems.map((item, index) => (
                  <li key={index} className="relative group">
                    <Link
                      to={item.path}
                      className="flex items-center text-gray-600 dark:text-gray-300 hover:text-secondary-700 dark:hover:text-primary-300 py-2"
                      aria-haspopup={item.submenu ? "true" : "false"}
                    >
                      {item.icon && <span className="mr-2" aria-hidden="true">{item.icon}</span>}
                      <span>{item.label}</span>
                      {item.submenu && <ChevronDown className="h-4 w-4 ml-1" aria-hidden="true" />}
                    </Link>
                    {item.submenu && (
                      <div 
                        className="absolute left-0 mt-1 w-64 bg-white dark:bg-gray-800 rounded-md shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-200 z-50"
                        role="menu"
                        aria-label={`Подменю ${item.label}`}
                      >
                        {item.submenu.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            to={subItem.path}
                            className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                            role="menuitem"
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </li>
                ))}
                <li>
                  <Link 
                    to="/sales" 
                    className="text-gray-600 dark:text-gray-300 hover:text-secondary-700 dark:hover:text-primary-300 py-2"
                  >
                    Акции
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/contacts" 
                    className="text-gray-600 dark:text-gray-300 hover:text-secondary-700 dark:hover:text-primary-300 py-2"
                  >
                    Контакты
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/tools" 
                    className="text-gray-600 dark:text-gray-300 hover:text-secondary-700 dark:hover:text-primary-300 py-2"
                  >
                    Инструменты
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        {/* Mobile menu overlay */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={toggleMobileMenu}
            aria-hidden="true"
          />
        )}
        
        {/* Mobile menu */}
        <div
          className={`fixed top-0 right-0 w-full max-w-sm h-full bg-white dark:bg-gray-900 z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-menu-title"
        >
          <div className="flex flex-col h-full">
            {/* Mobile menu header */}
            <div className="flex items-center justify-between p-4 border-b dark:border-gray-700 bg-primary dark:bg-gray-800">
              <h2 id="mobile-menu-title" className="font-heading font-bold text-lg text-white">
                Меню
              </h2>
              <button
                onClick={toggleMobileMenu}
                className="p-2 text-white hover:text-gray-300"
                aria-label="Закрыть меню"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Mobile menu content */}
            <div className="flex-1 overflow-y-auto">
              {/* Quick actions */}
              <div className="p-4 bg-gray-50 dark:bg-gray-800 border-b dark:border-gray-700">
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href="tel:+71234567890"
                    className="flex items-center justify-center p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    onClick={toggleMobileMenu}
                  >
                    <Phone className="h-5 w-5 mr-2" />
                    <span className="font-semibold">Звонок</span>
                  </a>
                  <button
                    onClick={() => {
                      setShowConsultationForm(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center justify-center p-3 bg-accent text-white rounded-lg hover:bg-opacity-90 transition-colors"
                  >
                    <MessageCircle className="h-5 w-5 mr-2" />
                    <span className="font-semibold">Консультация</span>
                  </button>
                </div>
              </div>

              {/* Navigation */}
              <nav className="p-4" role="navigation" aria-label="Мобильная навигация">
                <div className="space-y-2">
                  {menuItems.map((item, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between">
                        <Link
                          to={item.path}
                          className="flex items-center py-3 text-primary dark:text-primary-300 font-semibold text-base flex-1"
                          onClick={!item.submenu ? toggleMobileMenu : undefined}
                        >
                          {item.icon && <span className="mr-3" aria-hidden="true">{item.icon}</span>}
                          <span>{item.label}</span>
                        </Link>
                        {item.submenu && (
                          <button
                            onClick={() => toggleSubmenu(item.label)}
                            className="p-2 text-gray-400 hover:text-primary dark:hover:text-white"
                            aria-label={`${expandedSubmenu === item.label ? 'Скрыть' : 'Показать'} подменю ${item.label}`}
                          >
                            <ChevronDown 
                              className={`h-5 w-5 transition-transform ${
                                expandedSubmenu === item.label ? 'rotate-180' : ''
                              }`} 
                            />
                          </button>
                        )}
                      </div>
                      {item.submenu && expandedSubmenu === item.label && (
                        <div className="ml-8 space-y-1 pb-2">
                          {item.submenu.map((subItem, subIndex) => (
                            <Link
                              key={subIndex}
                              to={subItem.path}
                              className="block py-2 text-gray-600 dark:text-gray-300 hover:text-secondary-700 dark:hover:text-primary-300 text-base"
                              onClick={toggleMobileMenu}
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {/* Additional links */}
                  <Link 
                    to="/sales" 
                    className="flex items-center py-3 text-gray-600 dark:text-gray-300 text-base"
                    onClick={toggleMobileMenu}
                  >
                    Акции
                  </Link>
                  <Link 
                    to="/contacts" 
                    className="flex items-center py-3 text-gray-600 dark:text-gray-300 text-base"
                    onClick={toggleMobileMenu}
                  >
                    Контакты
                  </Link>
                  <Link 
                    to="/tools" 
                    className="flex items-center py-3 text-gray-600 dark:text-gray-300 text-base"
                    onClick={toggleMobileMenu}
                  >
                    Инструменты
                  </Link>
                </div>
              </nav>

              {/* Mobile footer */}
              <div className="mt-auto p-4 border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Тема оформления:</span>
                  <button 
                    onClick={toggleDarkMode}
                    className="flex items-center p-2 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
                  >
                    {isDarkMode ? (
                      <>
                        <Sun className="h-4 w-4 mr-2" />
                        <span className="text-sm">Светлая</span>
                      </>
                    ) : (
                      <>
                        <Moon className="h-4 w-4 mr-2" />
                        <span className="text-sm">Темная</span>
                      </>
                    )}
                  </button>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <MapPin className="h-4 w-4 mr-1 text-gray-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">{currentCity}</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Пн-Пт: 9:00-18:00, Сб: 10:00-16:00
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <GlobalSearch 
        isOpen={isGlobalSearchOpen} 
        onClose={() => setIsGlobalSearchOpen(false)} 
        className='hidden'
      />
      
      {showConsultationForm && (
        <ConsultationForm
          onClose={() => setShowConsultationForm(false)}
          onSubmit={handleFormSubmit}
          value={formData}
          setValue={setFormData}
        />
      )}
    </>
  );
};

export default Header;