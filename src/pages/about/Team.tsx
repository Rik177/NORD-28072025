import React from 'react';
import Header from '../../components/home/Header';
import Footer from '../../components/home/Footer';
import Breadcrumbs from '../../components/shared/Breadcrumbs';
import { Mail, Phone, Linkedin } from 'lucide-react';

interface TeamMember {
  id: number;
  name: string;
  position: string;
  department: string;
  image: string;
  email: string;
  phone: string;
  linkedin?: string;
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'Александр Петров',
    position: 'Генеральный директор',
    department: 'Руководство',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    email: 'a.petrov@nordengineering.ru',
    phone: '+7 (123) 456-78-90',
    linkedin: 'https://linkedin.com'
  },
  {
    id: 2,
    name: 'Елена Соколова',
    position: 'Технический директор',
    department: 'Руководство',
    image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    email: 'e.sokolova@nordengineering.ru',
    phone: '+7 (123) 456-78-91',
    linkedin: 'https://linkedin.com'
  },
  {
    id: 3,
    name: 'Михаил Иванов',
    position: 'Главный инженер',
    department: 'Инженерный отдел',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    email: 'm.ivanov@nordengineering.ru',
    phone: '+7 (123) 456-78-92'
  },
  {
    id: 4,
    name: 'Анна Козлова',
    position: 'Руководитель отдела продаж',
    department: 'Отдел продаж',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    email: 'a.kozlova@nordengineering.ru',
    phone: '+7 (123) 456-78-93',
    linkedin: 'https://linkedin.com'
  }
];

const departments = ['Руководство', 'Инженерный отдел', 'Отдел продаж'];

const Team: React.FC = () => {
  const [selectedDepartment, setSelectedDepartment] = React.useState<string>('all');

  const filteredMembers = selectedDepartment === 'all'
    ? teamMembers
    : teamMembers.filter(member => member.department === selectedDepartment);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main className="pb-12">
        <Breadcrumbs />
        
        {/* Hero Section */}
        <section className="bg-primary py-12">
          <div className="container mx-auto px-4">
            <h1 className="font-heading font-bold text-h1-mobile md:text-h1-desktop text-white text-center mb-6">
              Наша команда
            </h1>
            <p className="text-white/90 text-center max-w-2xl mx-auto">
              Профессионалы своего дела, которые делают НОРДИНЖИНИРИНГ лидером отрасли
            </p>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {/* Department Filter */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <button
                onClick={() => setSelectedDepartment('all')}
                className={`px-6 py-2 rounded-full transition-colors ${
                  selectedDepartment === 'all'
                    ? 'bg-primary text-white'
                    : 'bg-lightBg dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                Все отделы
              </button>
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDepartment(dept)}
                  className={`px-6 py-2 rounded-full transition-colors ${
                    selectedDepartment === dept
                      ? 'bg-primary text-white'
                      : 'bg-lightBg dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>

            {/* Team Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredMembers.map((member) => (
                <div key={member.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-card overflow-hidden group">
                  <div className="relative">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading font-semibold text-h4-desktop text-primary dark:text-white mb-1">
                      {member.name}
                    </h3>
                    <p className="text-secondary mb-2">{member.position}</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{member.department}</p>
                    
                    <div className="space-y-2">
                      <a
                        href={`mailto:${member.email}`}
                        className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-white transition-colors"
                      >
                        <Mail className="h-4 w-4 mr-2" />
                        <span className="text-sm">{member.email}</span>
                      </a>
                      <a
                        href={`tel:${member.phone}`}
                        className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-white transition-colors"
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        <span className="text-sm">{member.phone}</span>
                      </a>
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-white transition-colors"
                        >
                          <Linkedin className="h-4 w-4 mr-2" />
                          <span className="text-sm">LinkedIn</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Join Team Section */}
        <section className="py-12 bg-lightBg dark:bg-gray-800">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-primary dark:text-white mb-6">
              Присоединяйтесь к нашей команде
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Мы всегда в поиске талантливых специалистов, готовых развиваться вместе с нами
            </p>
            <a
              href="/about/careers"
              className="inline-block bg-primary hover:bg-opacity-90 text-white font-semibold py-3 px-8 rounded-md transition-colors"
            >
              Смотреть вакансии
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Team;