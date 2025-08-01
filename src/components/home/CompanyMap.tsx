import React from 'react';
import { MapPin, Phone, Clock } from 'lucide-react';

const CompanyMap: React.FC = () => {
  return (
    <section className="py-12 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-primary dark:text-white text-center mb-10">
          Схема предприятия
        </h2>
        
        <div className="relative w-full h-[400px] md:h-[500px] bg-lightBg dark:bg-gray-800 rounded-lg overflow-hidden">
          {/* Map container */}
          <div className="absolute inset-0">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2245.5887738696547!2d37.6173!3d55.7558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTXCsDQ1JzIwLjkiTiAzN8KwMzcnMDIuMyJF!5e0!3m2!1sen!2sus!4v1621436289564!5m2!1sen!2sus"
              className="w-full h-full border-0"
              loading="lazy"
              title="Карта расположения компании"
            />
          </div>

          {/* Map overlay with location markers */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 pointer-events-none" />
          
          {/* Location markers */}
          <div className="absolute bottom-6 left-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
            <div className="flex items-start space-x-3 mb-4">
              <MapPin className="h-5 w-5 text-accent mt-1" />
              <div>
                <h3 className="font-heading font-semibold text-primary dark:text-white">
                  Главный офис
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  123456, г. Москва, ул. Примерная, д. 123
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="flex items-center text-gray-600 dark:text-gray-400 mb-1">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>Время работы:</span>
                </div>
                <p className="font-semibold text-primary dark:text-white">Пн-Пт: 9:00 - 18:00</p>
              </div>
              <div>
                <div className="flex items-center text-gray-600 dark:text-gray-400 mb-1">
                  <Phone className="h-4 w-4 mr-1" />
                  <span>Телефон:</span>
                </div>
                <a 
                  href="tel:+71234567890" 
                  className="font-semibold text-secondary hover:text-primary dark:hover:text-white transition-colors"
                >
                  +7 (123) 456-78-90
                </a>
              </div>
            </div>
          </div>

          {/* Building markers */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <div className="absolute -top-3 -left-3 w-6 h-6 bg-accent rounded-full animate-pulse" />
              <div className="absolute -top-2 -left-2 w-4 h-4 bg-white dark:bg-gray-800 rounded-full" />
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <div className="w-3 h-3 bg-accent rounded-full mr-3" />
            <span className="text-sm text-gray-600 dark:text-gray-300">Производственный цех</span>
          </div>
          <div className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <div className="w-3 h-3 bg-secondary rounded-full mr-3" />
            <span className="text-sm text-gray-600 dark:text-gray-300">Складские помещения</span>
          </div>
          <div className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <div className="w-3 h-3 bg-primary rounded-full mr-3" />
            <span className="text-sm text-gray-600 dark:text-gray-300">Административное здание</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyMap;