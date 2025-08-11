import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import { MapPin, Calendar, Users, Eye } from 'lucide-react';
import ConsultationForm, { ConsultationFormData } from '../catalog/ConsultationForm';

interface Project {
  id: number;
  title: string;
  category: string;
  location: string;
  completionDate: string;
  area: string;
  beforeImage: string;
  afterImage: string;
  description: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Торговый центр "Галерея"',
    category: 'Коммерческий',
    location: 'Москва, ул. Тверская',
    completionDate: 'Декабрь 2024',
    area: '15,000 м²',
    beforeImage: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    afterImage: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Комплексная система вентиляции и кондиционирования с энергосбережением 35%'
  },
  {
    id: 2,
    title: 'Жилой комплекс "Северный"',
    category: 'Жилой',
    location: 'Москва, Северное Бутово',
    completionDate: 'Октябрь 2024',
    area: '25,000 м²',
    beforeImage: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    afterImage: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Индивидуальное управление климатом в каждой квартире с классом энергоэффективности A+'
  },
  {
    id: 3,
    title: 'Производственный комплекс "ТехноПарк"',
    category: 'Промышленный',
    location: 'Московская область, Подольск',
    completionDate: 'Ноябрь 2024',
    area: '40,000 м²',
    beforeImage: 'https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    afterImage: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Специализированная промышленная вентиляция с контролем чистоты воздуха'
  },
  {
    id: 4,
    title: 'Офисный центр "Бизнес Плаза"',
    category: 'Коммерческий',
    location: 'Москва, Деловой центр',
    completionDate: 'Сентябрь 2024',
    area: '8,000 м²',
    beforeImage: 'https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    afterImage: 'https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Адаптивная VRF система с интеллектуальным управлением и экономией энергии 40%'
  }
];

const LatestProjects: React.FC = () => {
  const [imageComparison, setImageComparison] = useState<{ project: Project; showAfter: boolean } | null>(null);
  const [showConsultationForm, setShowConsultationForm] = useState(false);
  const [formData, setFormData] = useState<ConsultationFormData>({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Жилой': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'Коммерческий': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      case 'Промышленный': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    setShowConsultationForm(false);
    setFormData({ name: '', phone: '', email: '', message: '' });
    alert('Спасибо! Мы свяжемся с вами в ближайшее время.');
  };

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-primary dark:text-white mb-4">
            Последние реализованные проекты
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-lg">
            Посмотрите на результаты нашей работы — фотографии "до" и "после" установки климатических систем
          </p>
        </div>

        <Swiper
          modules={[Navigation, Pagination, A11y]}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          className="mb-12"
          a11y={{
            prevSlideMessage: 'Предыдущий проект',
            nextSlideMessage: 'Следующий проект',
            firstSlideMessage: 'Это первый проект',
            lastSlideMessage: 'Это последний проект',
            paginationBulletMessage: 'Перейти к проекту {{index}}'
          }}
        >
          {projects.map((project) => (
            <SwiperSlide key={project.id}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center dark:bg-gray-900">
                {/* Project Info */}
                <div>
                  <div className="mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getCategoryColor(project.category)}`}>
                      {project.category}
                    </span>
                  </div>
                  
                  <h3 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-primary dark:text-white mb-4">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <MapPin className="h-5 w-5 mr-2 text-secondary" />
                      <span>{project.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <Calendar className="h-5 w-5 mr-2 text-secondary" />
                      <span>{project.completionDate}</span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <Users className="h-5 w-5 mr-2 text-secondary" />
                      <span>{project.area}</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-4">
                    <button 
                      onClick={() => setImageComparison({ project, showAfter: false })}
                      className="flex items-center bg-primary hover:bg-opacity-90 text-white font-semibold py-3 px-6 rounded-md transition-colors"
                    >
                      <Eye className="h-5 w-5 mr-2" />
                      Посмотреть детали
                    </button>
                    <a 
                      href="/projects" 
                      className="flex items-center border border-primary text-primary hover:bg-primary hover:text-white font-semibold py-3 px-6 rounded-md transition-colors"
                    >
                      Все проекты
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Before/After Images */}
                <div>
                  <div className="relative">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="relative group">
                        <img
                          src={project.beforeImage}
                          alt={`${project.title} - до`}
                          className="w-full h-64 object-cover rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute bottom-3 left-3 bg-black/70 text-white px-3 py-1 rounded text-sm font-semibold">
                          ДО
                        </div>
                      </div>
                      <div className="relative group">
                        <img
                          src={project.afterImage}
                          alt={`${project.title} - после`}
                          className="w-full h-64 object-cover rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute bottom-3 right-3 bg-accent text-white px-3 py-1 rounded text-sm font-semibold">
                          ПОСЛЕ
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* CTA */}
        <div className="text-center mt-12">
          <div className="bg-lightBg dark:bg-gray-800 rounded-2xl p-8">
            <h3 className="font-heading font-bold text-h3-mobile md:text-h3-desktop text-primary dark:text-white mb-4">
              Хотите увидеть свой объект в нашем портфолио?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Обсудим ваш проект и создадим эффективное решение для комфортного микроклимата
            </p>
            <button 
              className="bg-accent hover:bg-opacity-90 text-white font-semibold py-3 px-8 rounded-md transition-colors"
              onClick={() => setShowConsultationForm(true)}
            >
              Обсудить проект
            </button>
          </div>
        </div>
      </div>

      {/* Comparison Modal */}
      {imageComparison && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="max-w-6xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white font-heading font-bold text-xl">
                {imageComparison.project.title}
              </h3>
              <button
                onClick={() => setImageComparison(null)}
                className="text-white hover:text-gray-300"
                aria-label="Закрыть"
              >
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <img
                  src={imageComparison.project.beforeImage}
                  alt={`${imageComparison.project.title} - до`}
                  className="w-full h-auto rounded-lg"
                />
                <div className="absolute bottom-4 left-4 bg-black/70 text-white px-4 py-2 rounded text-lg font-semibold">
                  ДО
                </div>
              </div>
              <div className="relative">
                <img
                  src={imageComparison.project.afterImage}
                  alt={`${imageComparison.project.title} - после`}
                  className="w-full h-auto rounded-lg"
                />
                <div className="absolute bottom-4 right-4 bg-accent text-white px-4 py-2 rounded text-lg font-semibold">
                  ПОСЛЕ
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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

export default LatestProjects;