import React, { useState } from 'react';
import SEOHelmet from '../components/shared/SEOHelmet';
import Header from '../components/home/Header';
import Footer from '../components/home/Footer';
import Breadcrumbs from '../components/shared/Breadcrumbs';
import VentilationCalculator from '../components/tools/VentilationCalculator';
import ConsultationBooking from '../components/consultation/ConsultationBooking';
import RequestTracking from '../components/consultation/RequestTracking';
import { Calculator, Calendar, FileText, Wrench, Zap, Users } from 'lucide-react';

interface Tool {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: 'calculator' | 'booking' | 'tracking' | 'utility';
  popular?: boolean;
}

const tools: Tool[] = [
  {
    id: 'ventilation-calculator',
    title: 'Калькулятор мощности вентиляции',
    description: 'Рассчитайте необходимую мощность вентиляционной системы для вашего помещения',
    icon: <Calculator className="h-8 w-8" />,
    category: 'calculator',
    popular: true
  },
  {
    id: 'consultation-booking',
    title: 'Запись на консультацию',
    description: 'Запишитесь на консультацию к нашим специалистам в удобное время',
    icon: <Calendar className="h-8 w-8" />,
    category: 'booking',
    popular: true
  },
  {
    id: 'request-tracking',
    title: 'Отслеживание заявок',
    description: 'Отслеживайте статус ваших заявок и запросов в режиме реального времени',
    icon: <FileText className="h-8 w-8" />,
    category: 'tracking'
  }
];

const Tools: React.FC = () => {
  const [activeToolId, setActiveToolId] = useState<string>('ventilation-calculator');
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  const handleConsultationSubmit = (data: any) => {
    
    setIsConsultationOpen(false);
    // Here you would typically send the data to your backend
    alert('Консультация успешно забронирована! Мы свяжемся с вами в ближайшее время.');
  };

  const activeTool = tools.find(tool => tool.id === activeToolId);

  const renderActiveTool = () => {
    switch (activeToolId) {
      case 'ventilation-calculator':
        return <VentilationCalculator />;
      case 'consultation-booking':
        return (
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-card p-6">
            <div className="text-center py-12">
              <Calendar className="h-16 w-16 text-primary mx-auto mb-4" />
              <h3 className="font-heading font-bold text-h3-desktop text-primary dark:text-white mb-4">
                Запись на консультацию
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                Получите профессиональную консультацию от наших экспертов по климатическому оборудованию
              </p>
              <button
                onClick={() => setIsConsultationOpen(true)}
                className="bg-primary hover:bg-opacity-90 text-white font-semibold py-3 px-8 rounded-md transition-colors"
              >
                Записаться на консультацию
              </button>
            </div>
          </div>
        );
      case 'request-tracking':
        return <RequestTracking />;
      default:
        return null;
    }
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Инструменты и калькуляторы",
    "description": "Полезные инструменты для расчета вентиляции, записи на консультацию и отслеживания заявок",
    "url": "https://nordengineering.ru/tools"
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <SEOHelmet
        title="Инструменты и калькуляторы - НОРДИНЖИНИРИНГ"
        description="Полезные инструменты: калькулятор мощности вентиляции, запись на консультацию, отслеживание заявок. Профессиональные решения для климатических систем."
        keywords="калькулятор вентиляции, запись на консультацию, отслеживание заявок, инструменты, климатическое оборудование"
        canonical="https://nordengineering.ru/tools"
        structuredData={structuredData}
      />
      <Header />
      <main className="pb-12">
        <Breadcrumbs />
        
        {/* Hero Section */}
        <section className="bg-primary py-12">
          <div className="container mx-auto px-4">
            <h1 className="font-heading font-bold text-h1-mobile md:text-h1-desktop text-white text-center mb-6">
              Инструменты и калькуляторы
            </h1>
            <p className="text-white/90 text-center max-w-2xl mx-auto">
              Инструменты для расчета, планирования и управления климатическими системами
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Tools Sidebar */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-card p-6 sticky top-8">
                <h2 className="font-heading font-bold text-h3-desktop text-primary dark:text-white mb-6">
                  Доступные инструменты
                </h2>
                
                <div className="space-y-3">
                  {tools.map((tool) => (
                    <button
                      key={tool.id}
                      onClick={() => setActiveToolId(tool.id)}
                      className={`w-full text-left p-4 rounded-lg transition-all duration-200 ${
                        activeToolId === tool.id
                          ? 'bg-primary text-white shadow-md'
                          : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
                      }`}
                    >
                      <div className="flex items-start">
                        <div className={`mr-3 ${activeToolId === tool.id ? 'text-white' : 'text-primary'}`}>
                          {tool.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className={`font-semibold mb-1 ${
                            activeToolId === tool.id ? 'text-white' : 'text-gray-900 dark:text-white'
                          }`}>
                            {tool.title}
                            {tool.popular && (
                              <span className="ml-2 bg-accent text-white text-xs px-2 py-1 rounded-full">
                                Популярный
                              </span>
                            )}
                          </h3>
                          <p className={`text-sm ${
                            activeToolId === tool.id ? 'text-white/90' : 'text-gray-600 dark:text-gray-400'
                          }`}>
                            {tool.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Quick Stats */}
                <div className="mt-8 pt-6 border-t dark:border-gray-700">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                    Статистика использования
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Расчетов выполнено:</span>
                      <span className="font-semibold">2,847</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Консультаций:</span>
                      <span className="font-semibold">1,234</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Активных заявок:</span>
                      <span className="font-semibold">156</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {renderActiveTool()}
            </div>
          </div>
        </div>

        {/* Features Section */}
        <section className="py-12 bg-lightBg dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-primary dark:text-white text-center mb-10">
              Преимущества наших инструментов
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-white dark:bg-gray-900 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Zap className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-h4-desktop text-primary dark:text-white mb-3">
                  Быстрые расчеты
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Получите точные расчеты за считанные секунды с учетом всех технических параметров
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-white dark:bg-gray-900 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-h4-desktop text-primary dark:text-white mb-3">
                  Экспертная поддержка
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Консультации от сертифицированных специалистов с многолетним опытом
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-white dark:bg-gray-900 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Wrench className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-h4-desktop text-primary dark:text-white mb-3">
                  Полный контроль
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Отслеживайте все этапы работ от заявки до завершения проекта
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <ConsultationBooking
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        onSubmit={handleConsultationSubmit}
      />
      
      <Footer />
    </div>
  );
};

export default Tools;