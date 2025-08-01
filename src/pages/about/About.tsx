import React from 'react';
import Header from '../../components/home/Header';
import Footer from '../../components/home/Footer';
import Breadcrumbs from '../../components/shared/Breadcrumbs';
import { Link } from 'react-router-dom';
import { Building2, Users, FileText, FileSpreadsheet } from 'lucide-react';

interface MenuItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  path: string;
}

const menuItems: MenuItem[] = [
  {
    icon: <Building2 className="h-12 w-12 text-primary" />,
    title: 'О нас',
    description: 'История компании, миссия и ценности',
    path: '/about/about-us'
  },
  {
    icon: <Users className="h-12 w-12 text-primary" />,
    title: 'Наша команда',
    description: 'Познакомьтесь с профессионалами НОРДИНЖИНИРИНГ',
    path: '/about/team'
  },
  {
    icon: <FileText className="h-12 w-12 text-primary" />,
    title: 'Лицензии и сертификаты',
    description: 'Документы, подтверждающие качество наших услуг',
    path: '/about/licenses'
  },
  {
    icon: <FileSpreadsheet className="h-12 w-12 text-primary" />,
    title: 'Реквизиты',
    description: 'Юридическая информация о компании',
    path: '/about/requisites'
  }
];

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main className="pb-12">
        <Breadcrumbs />
        
        {/* Hero Section */}
        <section className="bg-primary py-12">
          <div className="container mx-auto px-4">
            <h1 className="font-heading font-bold text-h1-mobile md:text-h1-desktop text-white text-center mb-6">
              О компании
            </h1>
            <p className="text-white/90 text-center max-w-2xl mx-auto">
              Узнайте больше о компании НОРДИНЖИНИРИНГ, нашей команде и достижениях
            </p>
          </div>
        </section>

        {/* Navigation Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-card p-8 flex items-start space-x-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
                >
                  <div className="bg-primary/10 p-4 rounded-lg">
                    {item.icon}
                  </div>
                  <div>
                    <h2 className="font-heading font-bold text-h3-mobile md:text-h3-desktop text-primary dark:text-white mb-2">
                      {item.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      {item.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;