import React, { useState } from 'react';
import { Pencil, Wrench, CheckCircle, ArrowRight } from 'lucide-react';
import ConsultationForm, { ConsultationFormData } from '../catalog/ConsultationForm';

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
}

const services: Service[] = [
  {
    icon: <Pencil className="h-12 w-12 text-primary" />,
    title: 'Проектирование',
    description: 'Профессиональное проектирование систем вентиляции и кондиционирования для объектов любой сложности.',
    link: '/services/design'
  },
  {
    icon: <Wrench className="h-12 w-12 text-primary" />,
    title: 'Монтаж оборудования',
    description: 'Качественный монтаж систем вентиляции, кондиционирования и отопления с соблюдением всех норм.',
    link: '/services/installation'
  },
  {
    icon: <CheckCircle className="h-12 w-12 text-primary" />,
    title: 'Сервисное обслуживание',
    description: 'Регулярное техническое обслуживание вентиляционного и климатического оборудования.',
    link: '/services/maintenance'
  }
];

const Services: React.FC = () => {
  const [showConsultationForm, setShowConsultationForm] = useState(false);
  const [formData, setFormData] = useState<ConsultationFormData>({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Consultation form submitted:', formData);
    setShowConsultationForm(false);
    setFormData({ name: '', phone: '', email: '', message: '' });
    alert('Спасибо! Мы свяжемся с вами в ближайшее время.');
  };

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 fade-in-element">
          <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-primary dark:text-white mb-4">
            <span className="animated-underline">Полный спектр услуг</span> для вашего комфорта
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-lg">
            От проектирования до сервисного обслуживания — мы обеспечиваем комплексный подход к созданию идеального микроклимата
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="service-card bg-white dark:bg-gray-800 rounded-xl shadow-card p-8 border border-gray-100 dark:border-gray-700 transition-all duration-300 flex flex-col justify-between group hover:shadow-card-hover hover:-translate-y-2 parallax-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-6">
                <div className="bg-primary/10 rounded-lg p-4 w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                  {service.icon}
                </div>
                <h3 className="font-heading font-semibold text-h3-mobile md:text-h3-desktop text-primary dark:text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {service.description}
                </p>
              </div>
              <a 
                href={service.link} 
                className="inline-flex items-center text-secondary font-semibold hover:text-primary dark:hover:text-white transition-colors group-hover:translate-x-1 animated-underline"
              >
                <span>Подробнее</span>
                <ArrowRight className="h-5 w-5 ml-2 transition-transform" />
              </a>
              
              {/* Card shine effect */}
              <div className="card-shine"></div>
            </div>
          ))}
        </div>
        
        {/* Enhanced CTA */}
        <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 md:p-12 text-center fade-in-element">
          <h3 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-white mb-4">
            Готовы начать ваш проект?
          </h3>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto text-lg">
            Получите бесплатную консультацию и расчет стоимости для вашего объекта
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="magnetic-effect bg-accent hover:bg-opacity-90 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
              onClick={() => setShowConsultationForm(true)}
            >
              Получить консультацию
            </button>
            <button className="magnetic-effect bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-8 rounded-lg transition-colors">
              Рассчитать стоимость
            </button>
          </div>
        </div>
      </div>
      
      {showConsultationForm && (
        <ConsultationForm
          onClose={() => setShowConsultationForm(false)}
          onSubmit={handleFormSubmit}
          value={formData}
          setValue={setFormData}
        />
      )}
    </section>
  );
};

export default Services;