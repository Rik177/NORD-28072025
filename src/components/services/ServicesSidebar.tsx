import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Ruler, Wrench, Settings, Shield } from 'lucide-react';

interface ServiceItem {
  id: string;
  title: string;
  path: string;
  icon: React.ReactNode;
}

const serviceItems: ServiceItem[] = [
  {
    id: 'design',
    title: 'Проектирование',
    path: '/services/design',
    icon: <Ruler className="h-5 w-5" />
  },
  {
    id: 'installation',
    title: 'Монтаж',
    path: '/services/installation',
    icon: <Wrench className="h-5 w-5" />
  },
  {
    id: 'maintenance',
    title: 'Сервисное обслуживание',
    path: '/services/maintenance',
    icon: <Settings className="h-5 w-5" />
  },
  {
    id: 'warranty',
    title: 'Гарантийный ремонт',
    path: '/services/warranty',
    icon: <Shield className="h-5 w-5" />
  }
];

const ServicesSidebar: React.FC = () => {
  const location = useLocation();

  return (
    <aside className="bg-white dark:bg-gray-800 rounded-lg shadow-card p-6 h-fit sticky top-8">
      <h3 className="font-heading font-bold text-h4-desktop text-primary dark:text-white mb-6">
        Наши услуги
      </h3>
      <nav className="space-y-2">
        {serviceItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.id}
              to={item.path}
              className={`flex items-center p-3 rounded-md transition-colors ${
                isActive
                  ? 'bg-primary text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-primary/10 hover:text-primary dark:hover:text-white'
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              <span className="font-medium">{item.title}</span>
            </Link>
          );
        })}
      </nav>
      
      <div className="mt-8 p-4 bg-lightBg dark:bg-gray-700 rounded-lg">
        <h4 className="font-heading font-semibold text-primary dark:text-white mb-2">
          Нужна консультация?
        </h4>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Свяжитесь с нашими специалистами для получения подробной информации
        </p>
        <button className="w-full bg-accent hover:bg-opacity-90 text-white font-semibold py-2 px-4 rounded-md transition-colors text-sm">
          Заказать звонок
        </button>
      </div>
    </aside>
  );
};

export default ServicesSidebar;