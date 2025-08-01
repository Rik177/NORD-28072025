import React from 'react';
import { Shield, Award, Clock, Users, Zap, CheckCircle, TrendingUp, HeadphonesIcon } from 'lucide-react';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlight: string;
}

const features: Feature[] = [
  {
    icon: <Shield className="h-8 w-8 text-secondary" />,
    title: 'Надежность и качество',
    description: 'Работаем только с проверенными брендами и предоставляем расширенную гарантию',
    highlight: 'Гарантия до 5 лет'
  },
  {
    icon: <Clock className="h-8 w-8 text-secondary" />,
    title: 'Быстрая реализация',
    description: 'Соблюдаем сроки выполнения работ благодаря отлаженным процессам',
    highlight: 'Точно в срок'
  },
  {
    icon: <Award className="h-8 w-8 text-secondary" />,
    title: 'Экспертиза и опыт',
    description: 'Команда сертифицированных специалистов с многолетним опытом',
    highlight: '18+ лет на рынке'
  },
  {
    icon: <Users className="h-8 w-8 text-secondary" />,
    title: 'Индивидуальный подход',
    description: 'Разрабатываем решения с учетом специфики каждого объекта',
    highlight: 'Персональные решения'
  },
  {
    icon: <Zap className="h-8 w-8 text-secondary" />,
    title: 'Энергоэффективность',
    description: 'Современные технологии для снижения эксплуатационных расходов',
    highlight: 'Экономия до 40%'
  },
  {
    icon: <HeadphonesIcon className="h-8 w-8 text-secondary" />,
    title: 'Сервисная поддержка',
    description: 'Круглосуточная техническая поддержка и оперативное обслуживание',
    highlight: '24/7 поддержка'
  }
];

const AdvancedFeatures: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-lightBg via-white to-lightBg dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-primary dark:text-white mb-4">
            Почему более 5000 клиентов выбрали нас
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-lg">
            Мы не просто устанавливаем оборудование — мы создаем комплексные решения для комфортного микроклимата
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group bg-white dark:bg-gray-800 rounded-xl shadow-card p-8 transition-all duration-300 hover:shadow-card-hover hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-center mb-6">
                <div className="bg-primary/10 rounded-lg p-3 mr-4 group-hover:bg-primary/20 transition-colors">
                  {feature.icon}
                </div>
                <div className="bg-accent/10 px-3 py-1 rounded-full">
                  <span className="text-accent font-semibold text-sm">{feature.highlight}</span>
                </div>
              </div>
              <h3 className="font-heading font-semibold text-h4-desktop text-primary dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 bg-primary rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">1000+</div>
              <div className="text-white/80">Реализованных проектов</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">5000+</div>
              <div className="text-white/80">Довольных клиентов</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">98%</div>
              <div className="text-white/80">Положительных отзывов</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">24ч</div>
              <div className="text-white/80">Время реакции</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdvancedFeatures;