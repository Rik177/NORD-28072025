// Базовая информация о компании
const companyInfo = {
  name: 'НОРДИНЖИНИРИНГ',
  legalName: 'ООО "НОРДИНЖИНИРИНГ"',
  url: 'https://nordengineering.ru',
  logo: 'https://nordengineering.ru/logo.png',
  image: 'https://nordengineering.ru/og-image.jpg',
  description: 'Профессиональные решения в области вентиляции и климатического оборудования с 2005 года',
  foundingDate: '2005-01-01',
  address: {
    streetAddress: 'ул. Примерная, д. 123',
    addressLocality: 'Москва',
    postalCode: '123456',
    addressCountry: 'RU'
  },
  contactPoint: {
    telephone: '+7-123-456-78-90',
    email: 'info@nordengineering.ru',
    contactType: 'customer service',
    availableLanguage: 'Russian'
  },
  sameAs: [
    'https://www.facebook.com/nordengineering',
    'https://www.instagram.com/nordengineering',
    'https://www.youtube.com/nordengineering'
  ]
};

// Schema.org разметка для организации
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: companyInfo.name,
  legalName: companyInfo.legalName,
  url: companyInfo.url,
  logo: companyInfo.logo,
  image: companyInfo.image,
  description: companyInfo.description,
  foundingDate: companyInfo.foundingDate,
  address: {
    '@type': 'PostalAddress',
    ...companyInfo.address
  },
  contactPoint: {
    '@type': 'ContactPoint',
    ...companyInfo.contactPoint
  },
  sameAs: companyInfo.sameAs,
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Климатическое оборудование',
    itemListElement: [
      {
        '@type': 'OfferCatalog',
        name: 'Кондиционеры',
        description: 'Настенные, кассетные, канальные кондиционеры'
      },
      {
        '@type': 'OfferCatalog',
        name: 'Вентиляционное оборудование',
        description: 'Приточно-вытяжные установки, вентиляторы'
      },
      {
        '@type': 'OfferCatalog',
        name: 'Отопительное оборудование',
        description: 'Котлы, радиаторы, теплые полы'
      }
    ]
  }
};

// Schema.org разметка для местного бизнеса
export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://nordengineering.ru/#business',
  name: companyInfo.name,
  image: companyInfo.image,
  description: companyInfo.description,
  url: companyInfo.url,
  telephone: companyInfo.contactPoint.telephone,
  email: companyInfo.contactPoint.email,
  address: {
    '@type': 'PostalAddress',
    ...companyInfo.address
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 55.7558,
    longitude: 37.6176
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00'
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '10:00',
      closes: '16:00'
    }
  ],
  priceRange: '$$',
  currenciesAccepted: 'RUB',
  paymentAccepted: 'Cash, Credit Card, Bank Transfer',
  areaServed: {
    '@type': 'City',
    name: 'Москва'
  }
};

// Schema.org разметка для веб-сайта
export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://nordengineering.ru/#website',
  url: 'https://nordengineering.ru',
  name: 'НОРДИНЖИНИРИНГ',
  description: 'Климатическое оборудование и системы вентиляции',
  publisher: {
    '@id': 'https://nordengineering.ru/#organization'
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://nordengineering.ru/search?q={search_term_string}'
    },
    'query-input': 'required name=search_term_string'
  }
};

// Функция для создания разметки товара
export const generateProductSchema = (product: {
  name: string;
  description: string;
  image: string;
  price: number;
  brand: string;
  model: string;
  category: string;
  rating?: number;
  reviewCount?: number;
  availability?: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: product.name,
  description: product.description,
  image: product.image,
  brand: {
    '@type': 'Brand',
    name: product.brand
  },
  model: product.model,
  category: product.category,
  offers: {
    '@type': 'Offer',
    price: product.price,
    priceCurrency: 'RUB',
    availability: product.availability || 'https://schema.org/InStock',
    seller: {
      '@type': 'Organization',
      name: companyInfo.name
    }
  },
  ...(product.rating && product.reviewCount && {
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
      bestRating: 5,
      worstRating: 1
    }
  })
});

// Функция для создания разметки статьи блога
export const generateArticleSchema = (article: {
  title: string;
  excerpt: string;
  content: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  image: string;
  url: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: article.title,
  description: article.excerpt,
  image: article.image,
  author: {
    '@type': 'Person',
    name: article.author
  },
  publisher: {
    '@type': 'Organization',
    name: companyInfo.name,
    logo: {
      '@type': 'ImageObject',
      url: companyInfo.logo
    }
  },
  datePublished: article.datePublished,
  dateModified: article.dateModified || article.datePublished,
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': article.url
  },
  articleBody: article.content
});

// Функция для создания разметки услуги
export const generateServiceSchema = (service: {
  name: string;
  description: string;
  provider: string;
  areaServed: string;
  serviceType: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: service.name,
  description: service.description,
  provider: {
    '@type': 'Organization',
    name: service.provider
  },
  areaServed: {
    '@type': 'City',
    name: service.areaServed
  },
  serviceType: service.serviceType
});

// Функция для создания разметки FAQ
export const generateFAQSchema = (faqs: Array<{ question: string; answer: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer
    }
  }))
});

// Функция для создания разметки отзывов
export const generateReviewSchema = (reviews: Array<{
  author: string;
  rating: number;
  text: string;
  datePublished: string;
}>) => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: companyInfo.name,
  review: reviews.map(review => ({
    '@type': 'Review',
    author: {
      '@type': 'Person',
      name: review.author
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.rating,
      bestRating: 5,
      worstRating: 1
    },
    reviewBody: review.text,
    datePublished: review.datePublished
  }))
});

// Функция для создания разметки хлебных крошек
export const generateBreadcrumbSchema = (breadcrumbs: Array<{ name: string; url: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: breadcrumbs.map((crumb, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: crumb.name,
    item: crumb.url
  }))
});