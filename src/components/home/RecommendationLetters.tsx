import React from 'react';
import { FileText, Calendar } from 'lucide-react';

interface Recommendation {
  id: number;
  company: string;
  date: string;
  image: string;
}

const recommendations: Recommendation[] = [
  {
    id: 1,
    company: 'ООО «Вента-Сервис»',
    date: '15.08.2024',
    image: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg'
  },
  {
    id: 2,
    company: 'АО «ТехноКлимат»',
    date: '23.07.2024',
    image: 'https://images.pexels.com/photos/590037/pexels-photo-590037.jpeg'
  },
  {
    id: 3,
    company: 'ООО «СтройИнвест»',
    date: '05.06.2024',
    image: 'https://images.pexels.com/photos/590058/pexels-photo-590058.jpeg'
  }
];

const RecommendationLetters: React.FC = () => {
  return (
    <section className="py-12 bg-lightBg dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-primary dark:text-white text-center mb-10">
          Рекомендательные письма
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map((recommendation) => (
            <div 
              key={recommendation.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-card overflow-hidden transition-transform duration-300 hover:-translate-y-2"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img 
                  src={recommendation.image} 
                  alt={`Рекомендательное письмо от ${recommendation.company}`}
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-6 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-secondary mr-2" />
                    <h3 className="font-heading font-semibold text-primary dark:text-white">
                      {recommendation.company}
                    </h3>
                  </div>
                  <div className="flex items-center text-gray-500 dark:text-gray-400">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span className="text-sm">{recommendation.date}</span>
                  </div>
                </div>
                <button className="w-full btn btn-outline">
                  Посмотреть письмо
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecommendationLetters;