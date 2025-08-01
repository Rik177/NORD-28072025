import React from 'react';
import { Clock, Award, ShieldCheck, Wrench, Users, Zap } from 'lucide-react';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlight: string;
}

const features: Feature[] = [
  {
    icon: <Clock className="h-8 w-8 sm:h-10 sm:w-10 text-secondary" />,
    title: '18 лет опыта',
    description: 'Работаем с 2005 года, реализовали более 1000 проектов',
    highlight: '1000+ проектов'
  },
  {
    icon: <Award className="h-8 w-8 sm:h-10 sm:w-10 text-secondary" />,
    title: 'Качественное оборудование',
    description: 'Только проверенные производители с мировым именем',
    highlight: '30+ брендов'
  },
  {
    icon: <ShieldCheck className="h-8 w-8 sm:h-10 sm:w-10 text-secondary" />,
    title: 'Гарантия до 5 лет',
    description: 'На оборудование и все виды монтажных работ',
    highlight: 'До 5 лет'
  },
  {
    icon: <Wrench className="h-8 w-8 sm:h-10 sm:w-10 text-secondary" />,
    title: 'Сервисное обслуживание',
    description: 'Регулярное обслуживание и оперативный ремонт',
    highlight: '24/7 поддержка'
  }
];

const Features: React.FC = () => {
  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-lightBg dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-primary dark:text-white text-center mb-8 sm:mb-10">
          Почему выбирают нас
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-gray-900 rounded-lg shadow-card p-6 text-center transition-transform duration-300 hover:-translate-y-2 flex flex-col justify-between items-center"
            >
              <div>
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-heading font-semibold text-xl text-primary dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
              <div className="mt-3 inline-block bg-primary/10 dark:bg-primary/20 px-3 py-1 rounded-full">
                <span className="text-primary dark:text-secondary text-sm font-semibold">
                  {feature.highlight}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;