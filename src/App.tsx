import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';


// Основные страницы
import Home from './pages/Home';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Tools from './pages/Tools';
import NotFound from './pages/NotFound';
import Brands from './pages/Brands';

// Страницы каталога
import Catalog from './pages/catalog/Catalog';
import EnhancedProductPage from './pages/catalog/EnhancedProductPage';
import CategoryRouter from './pages/catalog/CategoryRouter';

// Страницы услуг
import Services from './pages/Services';
import Design from './pages/services/Design';
import Installation from './pages/services/Installation';
import Maintenance from './pages/services/Maintenance';
import Warranty from './pages/services/Warranty';

// Страницы о компании
import About from './pages/about/About';
import AboutUs from './pages/about/AboutUs';
import Team from './pages/about/Team';
import Licenses from './pages/about/Licenses';
import Requisites from './pages/about/Requisites';

// Информационные страницы
import Contacts from './pages/Contacts';
import Projects from './pages/Projects';
import Reviews from './pages/Reviews';
import Sales from './pages/Sales';
import FAQ from './pages/FAQ';
import Delivery from './pages/Delivery';
import WarrantyTerms from './pages/WarrantyTerms';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import CookiePolicy from './pages/CookiePolicy';

// Компоненты
import AccessibilityControls from './components/shared/AccessibilityControls';
import OfflineIndicator from './components/shared/OfflineIndicator';
import PWAInstallPrompt from './components/shared/PWAInstallPrompt';

import ChatWidget from "./components/shared/ChatWidget";
import QuickCallButton from "./components/shared/QuickCallButton";

// PWA utilities
import { handleShareTarget } from './utils/pwaUtils';

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  
  useEffect(() => {
    // Handle online/offline events
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // Handle PWA share target
    const url = new URL(window.location.href);
    const sharedTitle = url.searchParams.get('title');
    const sharedText = url.searchParams.get('text');
    const sharedUrl = url.searchParams.get('url');
    
    if (sharedTitle || sharedText || sharedUrl) {
      handleShareTarget({
        title: sharedTitle || undefined,
        text: sharedText || undefined,
        url: sharedUrl || undefined
      });
    }
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <HelmetProvider>
      <Router>
        <div className="App">
          {/* Offline indicator */}
          <OfflineIndicator />
          
          <Routes>
            {/* Главная страница */}
            <Route path="/" element={<Home />} />
            
            {/* Блог */}
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            
            {/* Каталог */}
            {/* Сначала явные роуты товара, чтобы страница товара получала URL-параметры */}
            <Route path="/catalog/:category/product/:productId" element={<EnhancedProductPage />} />
            <Route path="/catalog/:category/:subcategory/product/:productId" element={<EnhancedProductPage />} />
            <Route path="/catalog/:category/:subcategory/:subsubcategory/product/:productId" element={<EnhancedProductPage />} />
            <Route path="/catalog/:category/:subcategory/:subsubcategory/:subsubsubcategory/product/:productId" element={<EnhancedProductPage />} />
            {/* Затем общий роут каталога */}
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/catalog/*" element={<CategoryRouter />} />
            
            {/* Услуги */}
            <Route path="/services" element={<Services />} />
            <Route path="/services/design" element={<Design />} />
            <Route path="/services/installation" element={<Installation />} />
            <Route path="/services/maintenance" element={<Maintenance />} />
            <Route path="/services/warranty" element={<Warranty />} />
            
            {/* О компании */}
            <Route path="/about" element={<About />} />
            <Route path="/about/about-us" element={<AboutUs />} />
            <Route path="/about/team" element={<Team />} />
            <Route path="/about/licenses" element={<Licenses />} />
            <Route path="/about/requisites" element={<Requisites />} />
            
            {/* Основные страницы */}
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/delivery" element={<Delivery />} />
            <Route path="/warranty-terms" element={<WarrantyTerms />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/brands" element={<Brands />} />
            
            {/* Юридические страницы */}
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            
            {/* Страница 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>

          <ChatWidget />
          <QuickCallButton />
          
          <AccessibilityControls />
          
          {/* PWA Install Prompt */}
          <PWAInstallPrompt />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;