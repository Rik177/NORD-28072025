import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import { Star } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  company?: string;
  text: string;
  rating: number;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Александр Петров',
    company: 'ООО "Технологии"',
    text: 'Работаем с НОРДИНЖИНИРИНГ уже более 5 лет. Отличное качество оборудования и монтажа, всегда соблюдаются сроки. Особенно ценим оперативность при возникновении вопросов по обслуживанию.',
    rating: 5,
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 2,
    name: 'Елена Сидорова',
    text: 'Обратились в компанию для установки системы кондиционирования в квартире. Менеджер помог выбрать оптимальное решение, монтаж произвели быстро и чисто. Результатом очень довольны!',
    rating: 5,
    image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 3,
    name: 'Иван Соколов',
    company: 'Ресторан "Морской"',
    text: 'Специалисты НОРДИНЖИНИРИНГ разработали и реализовали проект вентиляции для нашего ресторана. Все работает безупречно, гости отмечают комфортную атмосферу, а затраты на электроэнергию снизились.',
    rating: 4,
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 4,
    name: 'Марина Ковалева',
    company: 'Сеть магазинов "Стиль"',
    text: 'Заказывали монтаж систем кондиционирования в сети наших магазинов. Работы выполнены профессионально, все наши пожелания учтены. Теперь в наших торговых залах всегда комфортная температура.',
    rating: 5,
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  }
];

export const TestimonialsSection: React.FC = () => {
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star 
          key={i} 
          className={`h-4 w-4 ${i < rating ? 'text-accent fill-accent' : 'text-gray-300'}`} 
        />
      );
    }
    return stars;
  };

  return (
    <section className="py-16 bg-lightBg dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-primary dark:text-white text-center mb-10">
          Отзывы наших клиентов
        </h2>
        
        <Swiper
          modules={[Navigation, Pagination, A11y]}
          spaceBetween={24}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 2,
            },
          }}
          a11y={{
            prevSlideMessage: 'Предыдущий отзыв',
            nextSlideMessage: 'Следующий отзыв',
            firstSlideMessage: 'Это первый отзыв',
            lastSlideMessage: 'Это последний отзыв',
            paginationBulletMessage: 'Перейти к отзыву {{index}}'
          }}
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id} className='bg-lightBg dark:bg-gray-800'>
              <div className="bg-white rounded-lg shadow-card p-6 transition-all duration-300 hover:shadow-card-hover h-full h-[240px] dark:bg-gray-300">
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="h-14 w-14 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="font-heading font-semibold text-primary">
                      {testimonial.name}
                    </h3>
                    {testimonial.company && (
                      <p className="text-gray-600 text-sm">{testimonial.company}</p>
                    )}
                    <div className="flex mt-1">
                      {renderStars(testimonial.rating)}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "{testimonial.text}"
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        
        <div className="mt-8 text-center">
          <a 
            href="/reviews" 
            className="inline-block bg-primary hover:bg-opacity-90 text-white font-semibold py-3 px-6 rounded-md transition-colors"
          >
            Все отзывы
          </a>
        </div>
      </div>
    </section>
  );
};