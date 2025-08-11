import React from 'react';
import Header from '../../components/home/Header';
import Footer from '../../components/home/Footer';
import Breadcrumbs from '../../components/shared/Breadcrumbs';
import { Briefcase, MapPin, Clock, DollarSign, Send } from 'lucide-react';

interface JobPosition {
  id: number;
  title: string;
  department: string;
  location: string;
  type: 'full-time' | 'part-time' | 'remote';
  experience: string;
  salary: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
}

const positions: JobPosition[] = [
  {
    id: 1,
    title: 'Инженер-проектировщик систем вентиляции',
    department: 'Инженерный отдел',
    location: 'Москва',
    type: 'full-time',
    experience: '3-5 лет',
    salary: 'от 120 000 ₽',
    description: 'Требуется опытный инженер-проектировщик для разработки систем вентиляции и кондиционирования.',
    requirements: [
      'Высшее техническое образование',
      'Опыт работы от 3 лет в проектировании систем ОВиК',
      'Знание нормативной документации',
      'Владение AutoCAD, Revit'
    ],
    responsibilities: [
      'Разработка проектной документации',
      'Проведение расчетов и подбор оборудования',
      'Согласование проектных решений',
      'Авторский надзор'
    ]
  },
  {
    id: 2,
    title: 'Менеджер по продажам',
    department: 'Отдел продаж',
    location: 'Москва',
    type: 'full-time',
    experience: '2-3 года',
    salary: 'от 80 000 ₽',
    description: 'Ищем энергичного менеджера по продажам климатического оборудования.',
    requirements: [
      'Высшее образование',
      'Опыт продаж B2B от 2 лет',
      'Знание рынка климатического оборудования',
      'Навыки ведения переговоров'
    ],
    responsibilities: [
      'Активный поиск клиентов',
      'Подготовка коммерческих предложений',
      'Проведение презентаций',
      'Заключение договоров'
    ]
  },
  {
    id: 3,
    title: 'Сервисный инженер',
    department: 'Сервисный отдел',
    location: 'Москва',
    type: 'full-time',
    experience: '1-3 года',
    salary: 'от 90 000 ₽',
    description: 'Требуется сервисный инженер для обслуживания климатического оборудования.',
    requirements: [
      'Техническое образование',
      'Опыт работы с климатическим оборудованием',
      'Знание основ электротехники',
      'Готовность к выездной работе'
    ],
    responsibilities: [
      'Диагностика и ремонт оборудования',
      'Плановое техническое обслуживание',
      'Пусконаладочные работы',
      'Консультирование клиентов'
    ]
  }
];

const Careers: React.FC = () => {
  const [selectedPosition, setSelectedPosition] = React.useState<JobPosition | null>(null);
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    resume: null as File | null
  });

  const handleApply = (position: JobPosition) => {
    setSelectedPosition(position);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    
    setSelectedPosition(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
      resume: null
    });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main className="pb-12">
        <Breadcrumbs />
        
        {/* Hero Section */}
        <section className="bg-primary py-12">
          <div className="container mx-auto px-4">
            <h1 className="font-heading font-bold text-h1-mobile md:text-h1-desktop text-white text-center mb-6">
              Вакансии
            </h1>
            <p className="text-white/90 text-center max-w-2xl mx-auto">
              Присоединяйтесь к команде профессионалов НОРДИНЖИНИРИНГ
            </p>
          </div>
        </section>

        {/* Why Join Us */}
        <section className="py-12 bg-lightBg dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-primary dark:text-white text-center mb-12">
              Почему стоит работать с нами
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-card">
                <div className="flex items-center mb-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Briefcase className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold ml-4 text-primary dark:text-white">
                    Стабильность
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Официальное трудоустройство и белая зарплата
                </p>
              </div>
              <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-card">
                <div className="flex items-center mb-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold ml-4 text-primary dark:text-white">
                    График работы
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  5/2 с гибким началом рабочего дня
                </p>
              </div>
              <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-card">
                <div className="flex items-center mb-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold ml-4 text-primary dark:text-white">
                    Расположение
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Современный офис в центре города
                </p>
              </div>
              <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-card">
                <div className="flex items-center mb-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <DollarSign className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold ml-4 text-primary dark:text-white">
                    Развитие
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Обучение и карьерный рост
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-primary dark:text-white text-center mb-12">
              Открытые вакансии
            </h2>
            <div className="space-y-6">
              {positions.map((position) => (
                <div
                  key={position.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-card p-6"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                      <h3 className="font-heading font-semibold text-h3-mobile md:text-h3-desktop text-primary dark:text-white mb-2">
                        {position.title}
                      </h3>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4 md:mb-0">
                        <span className="flex items-center">
                          <Briefcase className="h-4 w-4 mr-1" />
                          {position.department}
                        </span>
                        <span className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {position.location}
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {position.experience}
                        </span>
                        <span className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-1" />
                          {position.salary}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleApply(position)}
                      className="bg-primary hover:bg-opacity-90 text-white font-semibold py-2 px-6 rounded-md transition-colors"
                    >
                      Откликнуться
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Application Modal */}
        {selectedPosition && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b dark:border-gray-700">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-heading font-bold text-h3-mobile md:text-h3-desktop text-primary dark:text-white">
                      {selectedPosition.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {selectedPosition.department} • {selectedPosition.location}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedPosition(null)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <span className="sr-only">Закрыть</span>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="mb-8">
                  <h4 className="font-heading font-semibold text-primary dark:text-white mb-4">
                    Описание вакансии
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {selectedPosition.description}
                  </p>
                  
                  <h4 className="font-heading font-semibold text-primary dark:text-white mb-2">
                    Требования:
                  </h4>
                  <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mb-4">
                    {selectedPosition.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                  
                  <h4 className="font-heading font-semibold text-primary dark:text-white mb-2">
                    Обязанности:
                  </h4>
                  <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
                    {selectedPosition.responsibilities.map((resp, index) => (
                      <li key={index}>{resp}</li>
                    ))}
                  </ul>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
                      Ваше имя*
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      className="w-full p-3 rounded-md bg-lightBg dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
                      Email*
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      className="w-full p-3 rounded-md bg-lightBg dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
                      Телефон*
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      className="w-full p-3 rounded-md bg-lightBg dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
                      Сопроводительное письмо
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full p-3 rounded-md bg-lightBg dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
                    ></textarea>
                  </div>
                  
                  <div>
                    <label htmlFor="resume" className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
                      Резюме*
                    </label>
                    <input
                      type="file"
                      id="resume"
                      required
                      accept=".pdf,.doc,.docx"
                      className="w-full p-3 rounded-md bg-lightBg dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-primary hover:bg-opacity-90 text-white font-semibold py-3 px-6 rounded-md transition-colors flex items-center justify-center"
                  >
                    <Send className="h-5 w-5 mr-2" />
                    Отправить заявку
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Careers;