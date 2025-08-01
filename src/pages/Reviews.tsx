import React, { useState } from 'react';
import SEOHelmet from '../components/shared/SEOHelmet';
import Header from '../components/home/Header';
import Footer from '../components/home/Footer';
import Breadcrumbs from '../components/shared/Breadcrumbs';
import { Star, ThumbsUp, MessageCircle, Filter, Search, Calendar, User, CheckCircle } from 'lucide-react';

interface Review {
  id: number;
  name: string;
  company?: string;
  rating: number;
  date: string;
  title: string;
  text: string;
  project: string;
  category: 'residential' | 'commercial' | 'industrial';
  verified: boolean;
  helpful: number;
  avatar: string;
  images?: string[];
}

const reviews: Review[] = [
  {
    id: 1,
    name: 'Александр Петров',
    company: 'ООО "Технологии"',
    rating: 5,
    date: '15.01.2025',
    title: 'Отличная работа по установке системы вентиляции',
    text: 'Работаем с НОРДИНЖИНИРИНГ уже более 5 лет. Отличное качество оборудования и монтажа, всегда соблюдаются сроки. Особенно ценим оперативность при возникновении вопросов по обслуживанию. Последний проект - установка системы вентиляции в новом офисе на 200 сотрудников. Все выполнено на высшем уровне.',
    project: 'Офисный центр "Технопарк"',
    category: 'commercial',
    verified: true,
    helpful: 24,
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 2,
    name: 'Елена Сидорова',
    rating: 5,
    date: '08.01.2025',
    title: 'Профессиональный подход к установке кондиционера',
    text: 'Обратились в компанию для установки системы кондиционирования в квартире. Менеджер помог выбрать оптимальное решение, монтаж произвели быстро и чисто. Результатом очень довольны! Особенно порадовало, что после монтажа все убрали и объяснили, как пользоваться системой.',
    project: 'Квартира в ЖК "Северный"',
    category: 'residential',
    verified: true,
    helpful: 18,
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 3,
    name: 'Иван Соколов',
    company: 'Ресторан "Морской"',
    rating: 4,
    date: '22.12.2024',
    title: 'Качественная система вентиляции для ресторана',
    text: 'Специалисты НОРДИНЖИНИРИНГ разработали и реализовали проект вентиляции для нашего ресторана. Все работает безупречно, гости отмечают комфортную атмосферу, а затраты на электроэнергию снизились. Единственный минус - немного затянулись сроки из-за сложности проекта.',
    project: 'Ресторан "Морской"',
    category: 'commercial',
    verified: true,
    helpful: 15,
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 4,
    name: 'Марина Ковалева',
    company: 'Сеть магазинов "Стиль"',
    rating: 5,
    date: '10.12.2024',
    title: 'Комплексное решение для сети магазинов',
    text: 'Заказывали монтаж систем кондиционирования в сети наших магазинов. Работы выполнены профессионально, все наши пожелания учтены. Теперь в наших торговых залах всегда комфортная температура. Отдельно хочется отметить сервисное обслуживание - всегда оперативно реагируют на заявки.',
    project: 'Сеть магазинов "Стиль" (5 объектов)',
    category: 'commercial',
    verified: true,
    helpful: 22,
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 5,
    name: 'Дмитрий Волков',
    rating: 5,
    date: '28.11.2024',
    title: 'Отличная система для загородного дома',
    text: 'Установили систему вентиляции и кондиционирования в загородном доме. Очень довольны результатом! Система работает тихо, энергопотребление минимальное. Особенно понравилось, что учли все наши пожелания по зонированию. Рекомендую!',
    project: 'Загородный дом 300 м²',
    category: 'residential',
    verified: true,
    helpful: 12,
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 6,
    name: 'Анна Морозова',
    company: 'Производство "ТехМаш"',
    rating: 5,
    date: '15.11.2024',
    title: 'Промышленная вентиляция высокого класса',
    text: 'Компания выполнила проект промышленной вентиляции для нашего производственного цеха. Сложная задача была решена на отлично. Все требования по очистке воздуха и контролю параметров выполнены. Система работает стабильно уже полгода.',
    project: 'Производственный цех 2000 м²',
    category: 'industrial',
    verified: true,
    helpful: 19,
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  }
];

const categoryFilters = [
  { id: 'all', label: 'Все отзывы' },
  { id: 'residential', label: 'Жилые объекты' },
  { id: 'commercial', label: 'Коммерческие' },
  { id: 'industrial', label: 'Промышленные' }
];

const ratingFilters = [
  { id: 'all', label: 'Все оценки' },
  { id: '5', label: '5 звезд' },
  { id: '4', label: '4 звезды' },
  { id: '3', label: '3 звезды' }
];

const Reviews: React.FC = () => {
  // Calculate average rating for structured data
  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  
  // Prepare structured data for reviews
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "НОРДИНЖИНИРИНГ",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": averageRating.toFixed(1),
      "reviewCount": reviews.length,
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": reviews.map(review => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": review.name
      },
      "datePublished": review.date.split('.').reverse().join('-'),
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating,
        "bestRating": "5",
        "worstRating": "1"
      },
      "name": review.title,
      "reviewBody": review.text,
      ...(review.company ? { "publisher": { "@type": "Organization", "name": review.company } } : {})
    }))
  };

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRating, setSelectedRating] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    project: '',
    rating: 5,
    title: '',
    text: ''
  });

  const filteredReviews = reviews.filter(review => {
    const matchesCategory = selectedCategory === 'all' || review.category === selectedCategory;
    const matchesRating = selectedRating === 'all' || review.rating.toString() === selectedRating;
    const matchesSearch = review.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         review.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         review.text.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesRating && matchesSearch;
  });

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'helpful':
        return b.helpful - a.helpful;
      case 'date':
      default:
        return new Date(b.date.split('.').reverse().join('-')).getTime() - 
               new Date(a.date.split('.').reverse().join('-')).getTime();
    }
  });

  const renderStars = (rating: number, size: 'sm' | 'md' | 'lg' = 'md') => {
    const sizeClass = size === 'sm' ? 'h-4 w-4' : size === 'lg' ? 'h-6 w-6' : 'h-5 w-5';
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star 
          key={i} 
          className={`${sizeClass} ${i < rating ? 'text-accent fill-accent' : 'text-gray-300'}`} 
        />
      );
    }
    return stars;
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'residential': return 'Жилой';
      case 'commercial': return 'Коммерческий';
      case 'industrial': return 'Промышленный';
      default: return category;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800">
      <SEOHelmet 
        title="Отзывы клиентов - НОРДИНЖИНИРИНГ"
        description="Читайте отзывы наших клиентов о качестве услуг по монтажу и обслуживанию систем вентиляции и кондиционирования"
        structuredData={structuredData}
      />
      <Header />
      
      <main>
        <div className="container mx-auto px-4 py-8 pt-0">
          <Breadcrumbs 
            items={[
              { label: 'Главная', href: '/' },
              { label: 'Отзывы', href: '/reviews' }
            ]} 
          />
          
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 dark:text-primary-300">
              Отзывы наших клиентов
            </h1>
            <p className="text-xl text-gray-600 mb-8 dark:text-gray-400">
              Узнайте, что говорят о нас наши клиенты
            </p>
            
            {/* Rating Summary */}
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto dark:bg-gray-800">
              <div className="grid md:grid-cols-3 gap-8 items-center">
                <div className="text-center">
                  <div className="text-5xl font-bold text-accent mb-2">
                    {averageRating.toFixed(1)}
                  </div>
                  <div className="flex justify-center mb-2">
                    {renderStars(Math.round(averageRating), 'lg')}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">Средняя оценка</p>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-2 dark:text-primary-300">
                    {reviews.length}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">Всего отзывов</p>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {Math.round((reviews.filter(r => r.rating >= 4).length / reviews.length) * 100)}%
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">Довольных клиентов</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8 dark:bg-primary">
            <div className="grid lg:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Поиск по отзывам..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
              >
                {categoryFilters.map(filter => (
                  <option key={filter.id} value={filter.id}>
                    {filter.label}
                  </option>
                ))}
              </select>

              {/* Rating Filter */}
              <select
                value={selectedRating}
                onChange={(e) => setSelectedRating(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
              >
                {ratingFilters.map(filter => (
                  <option key={filter.id} value={filter.id}>
                    {filter.label}
                  </option>
                ))}
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
              >
                <option value="date">По дате</option>
                <option value="rating">По рейтингу</option>
                <option value="helpful">По полезности</option>
              </select>
            </div>
          </div>

          {/* Reviews List */}
          <div className="space-y-6">
            {sortedReviews.map(review => (
              <div key={review.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow dark:bg-primary">
                <div className="flex items-start gap-4">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-gray-900 dark:text-gray-200">{review.name}</h3>
                          {review.verified && (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          )}
                        </div>
                        {review.company && (
                          <p className="text-sm text-gray-600 dark:text-gray-300">{review.company}</p>
                        )}
                      </div>
                      
                      <div className="text-right">
                        <div className="flex items-center gap-1 mb-1">
                          {renderStars(review.rating, 'sm')}
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-300">{review.date}</p>
                      </div>
                    </div>

                    <div className="mb-3">
                      <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                        {getCategoryLabel(review.category)}
                      </span>
                    </div>

                    <h4 className="font-semibold text-lg text-gray-900 mb-2 dark:text-gray-200">
                      {review.title}
                    </h4>
                    
                    <p className="text-gray-700 mb-3 leading-relaxed dark:text-gray-300">
                      {review.text}
                    </p>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        <strong>Проект:</strong> {review.project}
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <button className="flex items-center gap-1 text-gray-500 hover:text-accent transition-colors dark:text-gray-200">
                          <ThumbsUp className="h-4 w-4" />
                          <span className="text-sm">{review.helpful}</span>
                        </button>
                        <button className="flex items-center gap-1 text-gray-500 hover:text-accent transition-colors  dark:text-gray-200">
                          <MessageCircle className="h-4 w-4" />
                          <span className="text-sm">Ответить</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {sortedReviews.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                По вашему запросу отзывы не найдены
              </p>
            </div>
          )}

          {/* Add Review Button */}
          <div className="text-center mt-12">
            <button
              onClick={() => setShowReviewForm(true)}
              className="bg-accent text-white px-8 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors"
            >
              Оставить отзыв
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Reviews;