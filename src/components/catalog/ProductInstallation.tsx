import React from 'react';
import { Wrench, Clock, Users, Shield, Check } from 'lucide-react';
import { ProductInstallation as InstallationType } from '../../data/productData';

interface ProductInstallationProps {
  installation: InstallationType;
  productName: string;
  onOrderInstallation: () => void;
}

const ProductInstallation: React.FC<ProductInstallationProps> = ({ 
  installation, 
  productName, 
  onOrderInstallation 
}) => {
  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Простая': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'Средняя': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'Сложная': return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  return (
    <div>
      <h3 className="font-heading font-bold text-h3-desktop text-primary dark:text-white mb-6">
        Информация об установке
      </h3>
      
      {/* Installation Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-lightBg dark:bg-gray-800 rounded-lg p-6 text-center">
          <div className="bg-white dark:bg-gray-700 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Wrench className="h-8 w-8 text-secondary" />
          </div>
          <h4 className="font-semibold text-primary dark:text-white mb-2">Сложность</h4>
          <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getComplexityColor(installation.complexity)}`}>
            {installation.complexity}
          </span>
        </div>
        <div className="bg-lightBg dark:bg-gray-800 rounded-lg p-6 text-center">
          <div className="bg-white dark:bg-gray-700 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Clock className="h-8 w-8 text-secondary" />
          </div>
          <h4 className="font-semibold text-primary dark:text-white mb-2">Время установки</h4>
          <p className="text-gray-600 dark:text-gray-300">{installation.time}</p>
        </div>
        <div className="bg-lightBg dark:bg-gray-800 rounded-lg p-6 text-center">
          <div className="bg-white dark:bg-gray-700 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Users className="h-8 w-8 text-secondary" />
          </div>
          <h4 className="font-semibold text-primary dark:text-white mb-2">Команда</h4>
          <p className="text-gray-600 dark:text-gray-300">{installation.team}</p>
        </div>
      </div>

      {/* Requirements */}
      <div className="mb-8">
        <h4 className="font-heading font-semibold text-h4-desktop text-primary dark:text-white mb-4">
          Требования к установке
        </h4>
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {installation.requirements.map((requirement, index) => (
              <div key={index} className="flex items-start">
                <Check className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 dark:text-gray-300">{requirement}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Installation Steps */}
      <div className="mb-8">
        <h4 className="font-heading font-semibold text-h4-desktop text-primary dark:text-white mb-4">
          Этапы установки
        </h4>
        <div className="space-y-4">
          {installation.steps.map((step, index) => (
            <div key={index} className="flex items-start bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
              <div className="bg-secondary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold mr-4 flex-shrink-0 mt-1">
                {index + 1}
              </div>
              <div className="flex-1">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{step}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Warranty and Maintenance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
          <div className="flex items-center mb-3">
            <Shield className="h-6 w-6 text-green-600 mr-3" />
            <h4 className="font-semibold text-primary dark:text-white">Гарантийные обязательства</h4>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-3">{installation.warranty}</p>
          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li>• Бесплатное устранение дефектов монтажа</li>
            <li>• Замена оборудования при заводском браке</li>
            <li>• Круглосуточная техническая поддержка</li>
          </ul>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
          <div className="flex items-center mb-3">
            <Wrench className="h-6 w-6 text-blue-600 mr-3" />
            <h4 className="font-semibold text-primary dark:text-white">Техническое обслуживание</h4>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-3">{installation.maintenance}</p>
          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li>• Плановые профилактические работы</li>
            <li>• Диагностика и настройка оборудования</li>
            <li>• Консультации по эксплуатации</li>
          </ul>
        </div>
      </div>

      {/* Installation Benefits */}
      <div className="bg-lightBg dark:bg-gray-800 rounded-lg p-6 mb-8">
        <h4 className="font-heading font-semibold text-lg text-primary dark:text-white mb-4">
          Преимущества профессиональной установки
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-start">
              <Check className="h-5 w-5 text-secondary mr-3 flex-shrink-0 mt-0.5" />
              <span className="text-gray-600 dark:text-gray-300">Соблюдение технических норм и стандартов</span>
            </div>
            <div className="flex items-start">
              <Check className="h-5 w-5 text-secondary mr-3 flex-shrink-0 mt-0.5" />
              <span className="text-gray-600 dark:text-gray-300">Использование профессионального инструмента</span>
            </div>
            <div className="flex items-start">
              <Check className="h-5 w-5 text-secondary mr-3 flex-shrink-0 mt-0.5" />
              <span className="text-gray-600 dark:text-gray-300">Гарантия на выполненные работы</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-start">
              <Check className="h-5 w-5 text-secondary mr-3 flex-shrink-0 mt-0.5" />
              <span className="text-gray-600 dark:text-gray-300">Оптимальная настройка оборудования</span>
            </div>
            <div className="flex items-start">
              <Check className="h-5 w-5 text-secondary mr-3 flex-shrink-0 mt-0.5" />
              <span className="text-gray-600 dark:text-gray-300">Обучение правилам эксплуатации</span>
            </div>
            <div className="flex items-start">
              <Check className="h-5 w-5 text-secondary mr-3 flex-shrink-0 mt-0.5" />
              <span className="text-gray-600 dark:text-gray-300">Послегарантийное обслуживание</span>
            </div>
          </div>
        </div>
      </div>

      {/* CTA for Installation */}
      <div className="bg-primary rounded-lg p-6 text-center">
        <h4 className="font-heading font-bold text-white mb-3">
          Профессиональная установка {productName}
        </h4>
        <p className="text-white/90 mb-6">
          Наши сертифицированные специалисты выполнят монтаж с соблюдением всех технических требований 
          и предоставят полную гарантию на выполненные работы
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={onOrderInstallation}
            className="bg-accent hover:bg-opacity-90 text-white font-semibold py-3 px-6 rounded-md transition-colors"
          >
            Заказать установку
          </button>
          <button className="bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-md transition-colors">
            Рассчитать стоимость
          </button>
        </div>
        
        <div className="mt-6 pt-6 border-t border-white/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-white/80">
            <div>
              <strong className="text-white">Быстро:</strong> Установка в день обращения
            </div>
            <div>
              <strong className="text-white">Качественно:</strong> Сертифицированные мастера
            </div>
            <div>
              <strong className="text-white">Надежно:</strong> Гарантия на все работы
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInstallation;