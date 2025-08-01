import React, { useEffect, useRef } from 'react';

const AboutCompany: React.FC = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('stagger-visible');
          }
        });
      },
      { threshold: 0.2 }
    );
    
    if (statsRef.current) {
      observer.observe(statsRef.current);
    }
    
    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);
  
  return (
    <section className="py-12 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="fade-in-element">
            <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-primary dark:text-white mb-6">
              <span className="gradient-text">О компании НОРДИНЖИНИРИНГ</span>
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Компания НОРДИНЖИНИРИНГ специализируется на продаже, проектировании, монтаже и обслуживании систем вентиляции и кондиционирования воздуха с 2005 года. За это время мы реализовали более 1000 проектов различной сложности – от небольших квартир до крупных промышленных объектов.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Мы предлагаем комплексный подход к решению задач по созданию комфортного микроклимата в помещениях любого назначения. Наши специалисты имеют высокую квалификацию и большой опыт работы, что позволяет нам выполнять проекты на высоком профессиональном уровне.
            </p>
            
            <div ref={statsRef} className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <div className="text-center stagger-item">
                <span className="block text-3xl font-bold text-accent">18+</span>
                <span className="text-gray-600 dark:text-gray-400">лет опыта</span>
              </div>
              <div className="text-center stagger-item">
                <span className="block text-3xl font-bold text-accent">1000+</span>
                <span className="text-gray-600 dark:text-gray-400">проектов</span>
              </div>
              <div className="text-center stagger-item">
                <span className="block text-3xl font-bold text-accent">50+</span>
                <span className="text-gray-600 dark:text-gray-400">специалистов</span>
              </div>
              <div className="text-center stagger-item">
                <span className="block text-3xl font-bold text-accent">30+</span>
                <span className="text-gray-600 dark:text-gray-400">брендов</span>
              </div>
            </div>
            
            <a 
              href="/about/about-us" 
              className="inline-block bg-primary hover:bg-opacity-90 text-white font-semibold py-3 px-6 rounded-lg transition-colors magnetic-effect"
            >
              Узнать больше
            </a>
          </div>
          
          <div className="relative fade-in-element">
            <div className="rounded-lg overflow-hidden shadow-lg parallax-card">
              <img 
                src="https://images.pexels.com/photos/8961214/pexels-photo-8961214.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Команда НОРДИНЖИНИРИНГ" 
                className="w-full h-auto"
              />
              <div className="card-shine"></div>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-accent text-white p-4 rounded-lg shadow-lg hidden md:block floating">
              <p className="text-lg font-semibold">Более 5000</p>
              <p>довольных клиентов</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCompany;