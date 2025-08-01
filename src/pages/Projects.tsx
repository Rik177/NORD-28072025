import React, { useState } from 'react';
import Header from '../components/home/Header';
import Footer from '../components/home/Footer';
import Breadcrumbs from '../components/shared/Breadcrumbs';
import { Calendar, MapPin, Users, Clock, ArrowRight, Eye, Filter, Search, Building, Home, Factory } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  category: 'residential' | 'commercial' | 'industrial';
  location: string;
  completionDate: string;
  duration: string;
  area: string;
  client: string;
  description: string;
  challenge: string;
  solution: string;
  results: string[];
  beforeImage: string;
  afterImage: string;
  additionalImages?: string[];
  equipment: string[];
  teamSize: number;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Торговый центр "Галерея"',
    category: 'commercial',
    location: 'Москва, ул. Тверская',
    completionDate: 'Декабрь 2024',
    duration: '4 месяца',
    area: '15,000 м²',
    client: 'ООО "Галерея Девелопмент"',
    description: 'Комплексная система вентиляции и кондиционирования для крупного торгового центра с учетом высокой проходимости и разнообразных зон.',
    challenge: 'Необходимо было обеспечить комфортный микроклимат в торговых залах, ресторанном дворике, кинотеатре и офисных помещениях при минимальном энергопотреблении.',
    solution: 'Установлена центральная приточно-вытяжная система с рекуперацией тепла, зональные кондиционеры для торговых залов и индивидуальные системы для ресторанов.',
    results: [
      'Снижение энергопотребления на 35%',
      'Поддержание температуры ±1°C',
      'Улучшение качества воздуха на 40%',
      'Снижение уровня шума до 45 дБ'
    ],
    beforeImage: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    afterImage: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    additionalImages: [
      'https://images.pexels.com/photos/8486972/pexels-photo-8486972.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/4270511/pexels-photo-4270511.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    equipment: ['Приточно-вытяжные установки Daikin', 'VRF системы Mitsubishi', 'Система автоматизации Siemens'],
    teamSize: 12
  },
  {
    id: 2,
    title: 'Жилой комплекс "Северный"',
    category: 'residential',
    location: 'Москва, Северное Бутово',
    completionDate: 'Октябрь 2024',
    duration: '6 месяцев',
    area: '25,000 м²',
    client: 'ГК "СтройИнвест"',
    description: 'Система вентиляции и кондиционирования для жилого комплекса из 3 корпусов с подземным паркингом и коммерческими помещениями.',
    challenge: 'Обеспечить индивидуальное управление климатом в каждой квартире при общей энергоэффективной системе вентиляции.',
    solution: 'Центральная приточная система с индивидуальными рекуператорами в квартирах, VRF системы для коммерческих помещений.',
    results: [
      'Энергоэффективность класса A+',
      'Индивидуальное управление в каждой квартире',
      'Снижение затрат на отопление на 30%',
      'Соответствие всем экологическим стандартам'
    ],
    beforeImage: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    afterImage: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    equipment: ['Приточные установки Вентс', 'Рекуператоры Blauberg', 'VRF системы Daikin'],
    teamSize: 8
  },
  {
    id: 3,
    title: 'Производственный комплекс "ТехноПарк"',
    category: 'industrial',
    location: 'Московская область, Подольск',
    completionDate: 'Ноябрь 2024',
    duration: '8 месяцев',
    area: '40,000 м²',
    client: 'ООО "ТехноПарк Производство"',
    description: 'Промышленная система вентиляции для производственного комплекса с цехами различного назначения и административными зданиями.',
    challenge: 'Обеспечить специальные условия для производственных процессов, включая контроль влажности, температуры и чистоты воздуха.',
    solution: 'Многозональная система с различными параметрами для каждого цеха, системы очистки воздуха и контроля загрязнений.',
    results: [
      'Соответствие всем промышленным стандартам',
      'Снижение брака продукции на 15%',
      'Улучшение условий труда',
      'Автоматизированный контроль параметров'
    ],
    beforeImage: 'https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    afterImage: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    equipment: ['Промышленные вентиляторы Systemair', 'Фильтры HEPA', 'Система автоматизации Schneider Electric'],
    teamSize: 15
  },
  {
    id: 4,
    title: 'Офисный центр "Бизнес Плаза"',
    category: 'commercial',
    location: 'Москва, Деловой центр',
    completionDate: 'Сентябрь 2024',
    duration: '3 месяца',
    area: '8,000 м²',
    client: 'ООО "Бизнес Плаза"',
    description: 'Современная система климат-контроля для офисного центра класса A с гибкой планировкой помещений.',
    challenge: 'Создать адаптивную систему, способную быстро реагировать на изменения планировки и количества сотрудников.',
    solution: 'Модульная VRF система с возможностью перенастройки зон, интеллектуальная система управления с датчиками присутствия.',
    results: [
      'Экономия энергии до 40%',
      'Быстрая адаптация к изменениям планировки',
      'Повышение комфорта сотрудников',
      'Удаленное управление и мониторинг'
    ],
    beforeImage: 'https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    afterImage: 'https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    equipment: ['VRF системы Carrier', 'Приточные установки Daikin', 'Система управления KNX'],
    teamSize: 6
  },
  {
    id: 5,
    title: 'Частный дом "Загородная резиденция"',
    category: 'residential',
    location: 'Московская область, Рублевка',
    completionDate: 'Август 2024',
    duration: '2 месяца',
    area: '1,200 м²',
    client: 'Частный заказчик',
    description: 'Премиальная система климат-контроля для загородного дома с бассейном, винным погребом и домашним кинотеатром.',
    challenge: 'Обеспечить различные климатические условия для специальных помещений при максимальной энергоэффективности.',
    solution: 'Индивидуальные системы для каждой зоны: осушение для бассейна, контроль влажности для винного погреба, акустический комфорт для кинотеатра.',
    results: [
      'Идеальный микроклимат в каждом помещении',
      'Энергоэффективность класса A++',
      'Бесшумная работа (менее 25 дБ)',
      'Интеграция с системой "умный дом"'
    ],
    beforeImage: 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    afterImage: 'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    equipment: ['VRF системы Mitsubishi Diamond', 'Осушители Dantherm', 'Система управления Crestron'],
    teamSize: 4
  },
  {
    id: 6,
    title: 'Медицинский центр "Здоровье+"',
    category: 'commercial',
    location: 'Москва, ул. Профсоюзная',
    completionDate: 'Июль 2024',
    duration: '3 месяца',
    area: '3,500 м²',
    client: 'ООО "Медицинский центр Здоровье+"',
    description: 'Специализированная система вентиляции для медицинского центра с операционными, палатами и диагностическими кабинетами.',
    challenge: 'Обеспечить стерильность воздуха в операционных, контроль давления в палатах и комфортные условия в общих зонах.',
    solution: 'Многоуровневая система фильтрации HEPA, ламинарные потоки в операционных, система контроля давления.',
    results: [
      'Соответствие медицинским стандартам',
      'Стерильность воздуха 99.97%',
      'Контроль давления в критических зонах',
      'Снижение риска инфекций на 60%'
    ],
    beforeImage: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    afterImage: 'https://images.pexels.com/photos/236380/pexels-photo-236380.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    equipment: ['Медицинские вентустановки Systemair', 'HEPA фильтры Camfil', 'Ламинарные потоки Weiss Technik'],
    teamSize: 8
  }
];

const categoryFilters = [
  { id: 'all', label: 'Все проекты', icon: <Eye className="h-5 w-5" /> },
  { id: 'residential', label: 'Жилые', icon: <Home className="h-5 w-5" /> },
  { id: 'commercial', label: 'Коммерческие', icon: <Building className="h-5 w-5" /> },
  { id: 'industrial', label: 'Промышленные', icon: <Factory className="h-5 w-5" /> }
];

const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [imageComparison, setImageComparison] = useState<{ project: Project; showAfter: boolean } | null>(null);

  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'residential': return 'Жилой';
      case 'commercial': return 'Коммерческий';
      case 'industrial': return 'Промышленный';
      default: return category;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'residential': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'commercial': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      case 'industrial': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
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
              Наши проекты
            </h1>
            <p className="text-white/90 text-center max-w-3xl mx-auto">
              Реализованные проекты систем вентиляции и кондиционирования различной сложности с фотографиями до и после установки
            </p>
          </div>
        </section>

        {/* Filters and Search */}
        <section className="py-8 bg-lightBg dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-6 justify-between items-center">
              <div className="flex flex-wrap gap-3">
                {categoryFilters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setSelectedCategory(filter.id)}
                    className={`flex items-center px-4 py-2 rounded-full transition-colors ${
                      selectedCategory === filter.id
                        ? 'bg-primary text-white'
                        : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 hover:bg-primary/10'
                    }`}
                  >
                    <span className="mr-2">{filter.icon}</span>
                    {filter.label}
                  </button>
                ))}
              </div>
              
              <div className="relative w-full lg:w-96">
                <input
                  type="text"
                  placeholder="Поиск проектов..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-3 px-4 pr-12 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <div key={project.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-card overflow-hidden group hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between">
                  {/* Before/After Images */}
                  <div className="relative h-64 overflow-hidden">
                    <div className="absolute inset-0 grid grid-cols-2">
                      <div className="relative">
                        <img
                          src={project.beforeImage}
                          alt={`${project.title} - до`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-semibold">
                          ДО
                        </div>
                      </div>
                      <div className="relative">
                        <img
                          src={project.afterImage}
                          alt={`${project.title} - после`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-2 right-2 bg-accent text-white px-2 py-1 rounded text-xs font-semibold">
                          ПОСЛЕ
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(project.category)}`}>
                        {getCategoryLabel(project.category)}
                      </span>
                    </div>
                    <button
                      onClick={() => setImageComparison({ project, showAfter: false })}
                      className="absolute top-4 right-4 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full transition-colors"
                      title="Увеличить изображения"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Project Info */}
                  <div className="p-6">
                    <h3 className="font-heading font-bold text-h4-desktop text-primary dark:text-white mb-2">
                      {project.title}
                    </h3>
                    
                    <div className="flex items-center text-gray-500 dark:text-gray-400 mb-3">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{project.location}</span>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                      {project.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div className="flex items-center text-gray-500 dark:text-gray-400">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{project.completionDate}</span>
                      </div>
                      <div className="flex items-center text-gray-500 dark:text-gray-400">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>{project.duration}</span>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="w-full bg-primary hover:bg-opacity-90 text-white font-semibold py-2 px-4 rounded-md transition-colors flex items-center justify-center"
                    >
                      <span>Подробнее</span>
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="py-12 bg-lightBg dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-primary dark:text-white text-center mb-10">
              Результаты нашей работы
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 text-center shadow-card">
                <div className="text-3xl font-bold text-primary dark:text-white mb-2">1000+</div>
                <div className="text-gray-600 dark:text-gray-400">реализованных проектов</div>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 text-center shadow-card">
                <div className="text-3xl font-bold text-primary dark:text-white mb-2">500,000</div>
                <div className="text-gray-600 dark:text-gray-400">м² обслуживаемых площадей</div>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 text-center shadow-card">
                <div className="text-3xl font-bold text-primary dark:text-white mb-2">98%</div>
                <div className="text-gray-600 dark:text-gray-400">довольных клиентов</div>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 text-center shadow-card">
                <div className="text-3xl font-bold text-primary dark:text-white mb-2">35%</div>
                <div className="text-gray-600 dark:text-gray-400">средняя экономия энергии</div>
              </div>
            </div>
          </div>
        </section>

        {/* Project Detail Modal */}
        {selectedProject && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b dark:border-gray-700">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-primary dark:text-white">
                      {selectedProject.title}
                    </h3>
                    <div className="flex items-center mt-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold mr-3 ${getCategoryColor(selectedProject.category)}`}>
                        {getCategoryLabel(selectedProject.category)}
                      </span>
                      <div className="flex items-center text-gray-500 dark:text-gray-400">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{selectedProject.location}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <span className="sr-only">Закрыть</span>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="p-6 space-y-8">
                {/* Before/After Comparison */}
                <div>
                  <h4 className="font-heading font-semibold text-h4-desktop text-primary dark:text-white mb-4">
                    Результат работы
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                      <img
                        src={selectedProject.beforeImage}
                        alt={`${selectedProject.title} - до`}
                        className="w-full h-64 object-cover rounded-lg"
                      />
                      <div className="absolute bottom-3 left-3 bg-black/70 text-white px-3 py-1 rounded text-sm font-semibold">
                        ДО
                      </div>
                    </div>
                    <div className="relative">
                      <img
                        src={selectedProject.afterImage}
                        alt={`${selectedProject.title} - после`}
                        className="w-full h-64 object-cover rounded-lg"
                      />
                      <div className="absolute bottom-3 right-3 bg-accent text-white px-3 py-1 rounded text-sm font-semibold">
                        ПОСЛЕ
                      </div>
                    </div>
                  </div>
                </div>

                {/* Project Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-heading font-semibold text-h4-desktop text-primary dark:text-white mb-4">
                      Детали проекта
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Клиент:</span>
                        <span className="font-semibold">{selectedProject.client}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Площадь:</span>
                        <span className="font-semibold">{selectedProject.area}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Длительность:</span>
                        <span className="font-semibold">{selectedProject.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Команда:</span>
                        <span className="font-semibold">{selectedProject.teamSize} специалистов</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-heading font-semibold text-h4-desktop text-primary dark:text-white mb-4">
                      Оборудование
                    </h4>
                    <ul className="space-y-2">
                      {selectedProject.equipment.map((item, index) => (
                        <li key={index} className="flex items-center text-gray-600 dark:text-gray-300">
                          <div className="w-2 h-2 bg-secondary rounded-full mr-3 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Challenge and Solution */}
                <div>
                  <h4 className="font-heading font-semibold text-h4-desktop text-primary dark:text-white mb-4">
                    Задача
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {selectedProject.challenge}
                  </p>
                  
                  <h4 className="font-heading font-semibold text-h4-desktop text-primary dark:text-white mb-4">
                    Решение
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {selectedProject.solution}
                  </p>
                </div>

                {/* Results */}
                <div>
                  <h4 className="font-heading font-semibold text-h4-desktop text-primary dark:text-white mb-4">
                    Достигнутые результаты
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedProject.results.map((result, index) => (
                      <div key={index} className="flex items-center text-gray-600 dark:text-gray-300">
                        <div className="w-2 h-2 bg-accent rounded-full mr-3 flex-shrink-0" />
                        {result}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Image Comparison Modal */}
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

        {/* CTA Section */}
        <section className="py-12 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-white mb-6">
              Хотите реализовать свой проект?
            </h2>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              Свяжитесь с нами для обсуждения вашего проекта. Мы создадим эффективное решение для вашего объекта.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-accent hover:bg-opacity-90 text-white font-semibold py-3 px-8 rounded-md transition-colors">
                Обсудить проект
              </button>
              <button className="bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-8 rounded-md transition-colors">
                Получить консультацию
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Projects;