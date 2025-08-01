import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade, A11y } from 'swiper/modules';
import { ArrowRight, Phone, Calculator } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

interface Slide {
  image: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  mobileImage?: string;
}

const slides: Slide[] = [
  {
    image: 'https://images.pexels.com/photos/3970330/pexels-photo-3970330.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
    mobileImage: 'https://images.pexels.com/photos/3970330/pexels-photo-3970330.jpeg?auto=compress&cs=tinysrgb&w=768&h=1024&dpr=1',
    title: 'Создаем идеальный микроклимат',
    description: 'Профессиональные решения в области вентиляции и кондиционирования с 18-летним опытом',
    buttonText: 'Подобрать оборудование',
    buttonLink: '/catalog',
    secondaryButtonText: 'Консультация',
    secondaryButtonLink: '/contacts'
  },
  {
    image: 'https://images.pexels.com/photos/6444/pencil-typography-black-design.jpg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
    mobileImage: 'https://images.pexels.com/photos/6444/pencil-typography-black-design.jpg?auto=compress&cs=tinysrgb&w=768&h=1024&dpr=1',
    title: 'Полный цикл работ "под ключ"',
    description: 'От проектирования до сервисного обслуживания с гарантией до 5 лет',
    buttonText: 'Наши услуги',
    buttonLink: '/services',
    secondaryButtonText: 'Рассчитать стоимость',
    secondaryButtonLink: '/tools'
  },
  {
    image: 'https://images.pexels.com/photos/534220/pexels-photo-534220.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
    mobileImage: 'https://images.pexels.com/photos/534220/pexels-photo-534220.jpeg?auto=compress&cs=tinysrgb&w=768&h=1024&dpr=1',
    title: 'Экономьте до 40% на энергозатратах',
    description: 'Современные энергоэффективные технологии и умные системы управления',
    buttonText: 'Узнать больше',
    buttonLink: '/about',
    secondaryButtonText: 'Калькулятор',
    secondaryButtonLink: '/tools'
  }
];

const HeroSlider: React.FC = () => {
  return (
    <section className="relative h-[400px] sm:h-[450px] lg:h-[500px] overflow-hidden bg-primary">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade, A11y]}
        slidesPerView={1}
        navigation={{
          nextEl: '.hero-swiper-button-next',
          prevEl: '.hero-swiper-button-prev',
        }}
        pagination={{ 
          clickable: true,
          el: '.hero-swiper-pagination',
          bulletClass: 'hero-pagination-bullet',
          bulletActiveClass: 'hero-pagination-bullet-active'
        }}
        autoplay={{ 
          delay: 6000, 
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={true}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        className="h-full w-full"
        speed={1000}
        touchRatio={1}
        touchAngle={45}
        grabCursor={true}
        a11y={{
          prevSlideMessage: 'Предыдущий слайд',
          nextSlideMessage: 'Следующий слайд',
          firstSlideMessage: 'Это первый слайд',
          lastSlideMessage: 'Это последний слайд',
          paginationBulletMessage: 'Перейти к слайду {{index}}'
        }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full">
              {/* Background Image */}
              <picture>
                <source 
                  media="(max-width: 768px)" 
                  srcSet={slide.mobileImage || slide.image}
                />
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: `url(${slide.image})` }}
                  aria-hidden="true"
                />
              </picture>
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/60 sm:from-primary/90 sm:via-primary/70 sm:to-primary/50" />
              
              {/* Content */}
              <div className="relative h-full container mx-auto px-4 flex items-center z-10">
                <div className="max-w-full sm:max-w-2xl text-white">
                  <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-base sm:text-lg mb-4 sm:mb-6 leading-relaxed opacity-90 max-w-lg text-left">
                    {slide.description}
                  </p>
                  
                  {/* Mobile-first button layout */}
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <a
                      href={slide.buttonLink}
                      className="inline-flex items-center justify-center bg-accent hover:bg-accent/90 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-lg text-center min-h-[48px] text-base"
                    >
                      <span>{slide.buttonText}</span>
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </a>
                    
                    {slide.secondaryButtonText && (
                      <a
                        href={slide.secondaryButtonLink}
                        className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 border border-white/20 hover:border-white/30 text-center min-h-[48px] text-base"
                      >
                        {slide.secondaryButtonText === 'Консультация' && <Phone className="mr-2 h-5 w-5" />}
                        {slide.secondaryButtonText === 'Калькулятор' && <Calculator className="mr-2 h-5 w-5" />}
                        {slide.secondaryButtonText === 'Рассчитать стоимость' && <Calculator className="mr-2 h-5 w-5" />}
                        <span>{slide.secondaryButtonText}</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
        
        {/* Custom Navigation - скрыта на мобильных */}
        <div className="hero-swiper-button-prev hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full items-center justify-center cursor-pointer transition-all duration-300 border border-white/20">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </div>
        <div className="hero-swiper-button-next hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full items-center justify-center cursor-pointer transition-all duration-300 border border-white/20">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
        
        {/* Custom Pagination */}
        <div className="hero-swiper-pagination absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10"></div>
      </Swiper>
    </section>
  );
};

export default HeroSlider;