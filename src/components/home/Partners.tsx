import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, A11y } from 'swiper/modules';

const partnerLogos = [
  'https://upload.wikimedia.org/wikipedia/commons/c/ce/Daikin-logo-png-transparent.png',
  'https://upload.wikimedia.org/wikipedia/commons/a/ad/Mitsubishi_Electric_logo.svg',
  'https://upload.wikimedia.org/wikipedia/commons/4/4e/Carrier_Corporation_logo.svg',
  'https://upload.wikimedia.org/wikipedia/commons/2/2b/Toshiba_logo.svg',
  'https://upload.wikimedia.org/wikipedia/commons/9/9e/Panasonic_logo.svg',
  'https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg',
  'https://upload.wikimedia.org/wikipedia/commons/3/36/LG_logo_%282015%29.svg',
  'https://upload.wikimedia.org/wikipedia/commons/8/87/Bosch_logo.svg'
];

const Partners: React.FC = () => {
  return (
    <section className="py-10 bg-white dark:bg-gray-300">
      <div className="container mx-auto px-4">
        <h2 className="font-heading font-bold text-h3-mobile md:text-h3-desktop text-primary text-center mb-8">
          Наши партнеры
        </h2>
        <div className="overflow-hidden">
          <Swiper
            modules={[Autoplay, A11y]}
            spaceBetween={24}
            slidesPerView={2}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 3,
              },
              768: {
                slidesPerView: 4,
              },
              1024: {
                slidesPerView: 6,
              },
            }}
            a11y={{
              enabled: true,
              prevSlideMessage: 'Предыдущий партнер',
              nextSlideMessage: 'Следующий партнер'
            }}
          >
            {partnerLogos.map((logo, index) => (
              <SwiperSlide key={`logo-${index}`}>
                <div className="flex items-center justify-center min-w-[160px] mx-6">
                  <img 
                    src={logo} 
                    alt={`Логотип партнера ${index + 1}`} 
                    className="max-h-12 w-auto opacity-70 hover:opacity-100 transition-opacity"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Partners;