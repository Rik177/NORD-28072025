import React, { useEffect } from "react";
import SEOHelmet from "../components/shared/SEOHelmet";
import Header from "../components/home/Header";
import Footer from "../components/home/Footer";
import HeroSlider from "../components/home/HeroSlider";
import AdvancedFeatures from "../components/home/AdvancedFeatures";
import CompanyMap from "../components/home/CompanyMap";
import Features from "../components/home/Features";
import Categories from "../components/home/Categories";
import PopularProducts from "../components/home/PopularProducts";
import Services from "../components/home/Services";
import AboutCompany from "../components/home/AboutCompany";
import LatestProjects from "../components/home/LatestProjects";
import { TestimonialsSection } from "../components/home/Testimonials";
import Partners from "../components/home/Partners";
import ContactForm from "../components/home/ContactForm";
import ComparisonButton from "../components/shared/ComparisonButton";
import { seoPages } from "../utils/seo";
import {
  organizationSchema,
  websiteSchema,
  localBusinessSchema,
} from "../utils/schema";
import { initPerformanceOptimizations, registerServiceWorker } from "../utils/performanceOptimizations";
import { initHoverEffects, initScrollAnimations } from "../utils/cursorEffects";

function Home() {
  useEffect(() => {
    // Инициализация оптимизаций производительности
    initPerformanceOptimizations();
    
    // Регистрация Service Worker
    registerServiceWorker();
    
    // Инициализация интерактивных эффектов
    initHoverEffects();
    
    // Инициализация анимаций при скролле
    setTimeout(() => {
      initScrollAnimations();
    }, 500);
    
    // Предзагрузка критических ресурсов
    const preloadLinks = [
      { href: 'https://fonts.googleapis.com', rel: 'preconnect' },
      { href: 'https://fonts.gstatic.com', rel: 'preconnect', crossOrigin: 'anonymous' },
      { href: 'https://images.pexels.com', rel: 'preconnect' }
    ];
    
    preloadLinks.forEach(link => {
      const linkElement = document.createElement('link');
      Object.assign(linkElement, link);
      document.head.appendChild(linkElement);
    });

    // Убираем любую автоматическую прокрутку при загрузке страницы
    window.scrollTo(0, 0);
    
    // Предотвращаем автоматическую прокрутку к якорям
    const handleHashChange = (e: HashChangeEvent) => {
      e.preventDefault();
      window.scrollTo(0, 0);
    };
    
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const combinedStructuredData = [
    organizationSchema,
    websiteSchema,
    localBusinessSchema,
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <SEOHelmet {...seoPages.home} structuredData={combinedStructuredData} />
      <Header />
      <main id="main-content">
        <HeroSlider />
        <div className="content-visibility-auto">
          <Features />
        </div>
        <div className="content-visibility-auto">
          <Categories />
        </div>
        <div className="content-visibility-auto fade-in-element">
          <PopularProducts />
        </div>
        <div className="content-visibility-auto fade-in-element">
          <Services />
        </div>
        <div className="content-visibility-auto fade-in-element">
          <AdvancedFeatures />
        </div>
        <div className="content-visibility-auto fade-in-element">
          <AboutCompany />
        </div>
        <div className="content-visibility-auto fade-in-element">
          <LatestProjects />
        </div>
        <div className="content-visibility-auto fade-in-element">
          <TestimonialsSection />
        </div>
        <div className="content-visibility-auto fade-in-element">
          <Partners />
        </div>
        <div className="content-visibility-auto fade-in-element">
          <CompanyMap />
        </div>
        <div className="content-visibility-auto fade-in-element">
          <ContactForm />
        </div>
      </main>
      <Footer />
      
      {/* Floating accessibility and interaction elements */}
      {/* <ChatWidget />
      <QuickCallButton /> */}
      <ComparisonButton />
    </div>
  );
}

export default Home;