// Утилиты для оптимизации производительности и Core Web Vitals

// Инициализация оптимизаций производительности
export const initPerformanceOptimizations = () => {
  // Preload критических ресурсов
  preloadCriticalResources();
  
  // Оптимизация изображений
  optimizeImages();
  
  // Ленивая загрузка некритических ресурсов
  lazyLoadResources();
  
  // Оптимизация шрифтов
  optimizeFonts();
  
  // Мониторинг Core Web Vitals
  if (typeof window !== 'undefined') {
    monitorWebVitals();
  }

  // Оптимизация для складных экранов
  optimizeForFoldableScreens();
};

// Preload критических ресурсов
const preloadCriticalResources = () => {
  if (typeof document === 'undefined') return;
  
  const criticalResources = [
    { href: '/fonts/inter-var.woff2', as: 'font', type: 'font/woff2' },
    { href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&family=Open+Sans:wght@300;400;600&display=swap', as: 'style' }
  ];
  
  criticalResources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource.href;
    link.as = resource.as;
    if (resource.type) link.type = resource.type;
    if (resource.as === 'font') link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
};

// Оптимизация изображений
const optimizeImages = () => {
  if (typeof window === 'undefined') return;
  
  // Intersection Observer для ленивой загрузки
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        
        // Загружаем изображение
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        
        // Загружаем srcset
        if (img.dataset.srcset) {
          img.srcset = img.dataset.srcset;
          img.removeAttribute('data-srcset');
        }
        
        img.classList.remove('lazy');
        observer.unobserve(img);
      }
    });
  }, {
    rootMargin: '50px 0px',
    threshold: 0.01
  });
  
  // Наблюдаем за всеми изображениями с классом lazy
  document.querySelectorAll('img.lazy').forEach(img => {
    imageObserver.observe(img);
  });
};

// Ленивая загрузка некритических ресурсов
const lazyLoadResources = () => {
  if (typeof window === 'undefined') return;
  
  // Загружаем некритические скрипты после загрузки страницы
  window.addEventListener('load', () => {
    // Загружаем аналитику
    loadAnalytics();
    
    // Загружаем чат-виджет
    setTimeout(() => {
      loadChatWidget();
    }, 3000);
  });
};

// Загрузка аналитики
const loadAnalytics = () => {
  // Google Analytics или другие аналитические скрипты
  // Загружаем только после полной загрузки страницы
  console.log('Analytics loaded');
};

// Загрузка чат-виджета
const loadChatWidget = () => {
  // Загружаем чат-виджет с задержкой
  console.log('Chat widget loaded');
};

// Оптимизация шрифтов
const optimizeFonts = () => {
  if (typeof document === 'undefined') return;
  
  // Используем font-display: swap для всех шрифтов
  const style = document.createElement('style');
  style.textContent = `
    @font-face {
      font-family: 'Montserrat';
      font-display: swap;
    }
    @font-face {
      font-family: 'Open Sans';
      font-display: swap;
    }
  `;
  document.head.appendChild(style);
};

// Мониторинг Core Web Vitals
const monitorWebVitals = () => {
  // Largest Contentful Paint (LCP)
  new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();
    const lastEntry = entries[entries.length - 1];
    console.log('LCP:', lastEntry.startTime);
  }).observe({ entryTypes: ['largest-contentful-paint'] });
  
  // First Input Delay (FID)
  new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();
    entries.forEach(entry => {
      console.log('FID:', entry.processingStart - entry.startTime);
    });
  }).observe({ entryTypes: ['first-input'] });
  
  // Cumulative Layout Shift (CLS)
  let clsValue = 0;
  new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();
    entries.forEach(entry => {
      if (!entry.hadRecentInput) {
        clsValue += entry.value;
      }
    });
    console.log('CLS:', clsValue);
  }).observe({ entryTypes: ['layout-shift'] });
};

// Оптимизация для мобильных устройств
export const optimizeForMobile = () => {
  if (typeof window === 'undefined') return;
  
  // Отключаем hover эффекты на мобильных
  if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
  }
  
  // Оптимизируем скролл
  let ticking = false;
  const updateScrollPosition = () => {
    // Обновляем позицию скролла
    ticking = false;
  };
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateScrollPosition);
      ticking = true;
    }
  });
};

// Оптимизация для складных экранов
export const optimizeForFoldableScreens = () => {
  if (typeof window === 'undefined') return;

  // Проверка поддержки CSS Spanning API
  if ('windowSegments' in window) {
    // Устройство имеет несколько экранов или складной экран
    const segments = (window as any).windowSegments;
    if (segments && segments.length > 1) {
      // Устанавливаем CSS-переменные для адаптации макета
      document.documentElement.style.setProperty('--fold-width', `${segments[1].x - segments[0].width}px`);
      document.documentElement.style.setProperty('--fold-height', `${segments[1].y - segments[0].height}px`);
      document.documentElement.style.setProperty('--has-fold', 'true');
    }
  }

  // Обработка изменений ориентации экрана
  window.addEventListener('resize', () => {
    // Проверяем соотношение сторон для определения состояния складного устройства
    const aspectRatio = window.innerWidth / window.innerHeight;
    
    if (aspectRatio < 0.5) {
      // Вероятно, устройство сложено вертикально
      document.documentElement.style.setProperty('--fold-state', 'vertical');
    } else if (aspectRatio > 2) {
      // Вероятно, устройство сложено горизонтально
      document.documentElement.style.setProperty('--fold-state', 'horizontal');
    } else {
      // Обычное соотношение сторон
      document.documentElement.style.setProperty('--fold-state', 'normal');
    }
  });

  // Проверка поддержки Screen Spanning API
  if ('getWindowSegments' in window.screen) {
    const updateSpanning = () => {
      const segments = (window.screen as any).getWindowSegments();
      if (segments.length > 1) {
        // Устройство имеет несколько экранов или складной экран
        const spanningEnv = (window.screen as any).spanning;
        document.documentElement.style.setProperty('--spanning-env', spanningEnv);
      }
    };
    
    // Обновляем при изменении состояния экрана
    window.addEventListener('change', updateSpanning);
    updateSpanning();
  }
};

// Предзагрузка критических маршрутов
export const preloadCriticalRoutes = () => {
  if (typeof window === 'undefined') return;
  
  const criticalRoutes = ['/catalog', '/services', '/contacts'];
  
  criticalRoutes.forEach(route => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = route;
    document.head.appendChild(link);
  });
};

// Оптимизация ресурсов
export const optimizeResources = () => {
  if (typeof document === 'undefined') return;
  
  // Минификация CSS
  const styles = document.querySelectorAll('style');
  styles.forEach(style => {
    if (style.textContent) {
      style.textContent = style.textContent.replace(/\s+/g, ' ').trim();
    }
  });
  
  // Сжатие изображений
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    // Добавляем параметры сжатия для Pexels
    if (img.src.includes('pexels.com')) {
      const url = new URL(img.src);
      url.searchParams.set('auto', 'compress');
      url.searchParams.set('cs', 'tinysrgb');
      img.src = url.toString();
    }
  });
};

// Кэширование ресурсов
export const setupCaching = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('Service Worker registered:', registration);
      })
      .catch(error => {
        console.log('Service Worker registration failed:', error);
      });
  }
};

// Оптимизация критического пути рендеринга
export const optimizeCriticalRenderingPath = () => {
  if (typeof document === 'undefined') return;
  
  // Инлайним критический CSS
  const criticalCSS = `
    body { font-family: 'Open Sans', sans-serif; }
    .header { position: fixed; top: 0; width: 100%; z-index: 50; }
    .hero { height: 600px; background: #1A3C6E; }
  `;
  
  const style = document.createElement('style');
  style.textContent = criticalCSS;
  document.head.insertBefore(style, document.head.firstChild);
  
  // Загружаем некритический CSS асинхронно
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = '/styles/non-critical.css';
  link.as = 'style';
  link.onload = function() {
    this.onload = null;
    this.rel = 'stylesheet';
  };
  document.head.appendChild(link);
};

// Разбивка длинных задач
export const breakUpLongTasks = (callback: () => void) => {
  if ('scheduler' in window && 'postTask' in (window as any).scheduler) {
    (window as any).scheduler.postTask(callback, { priority: 'user-blocking' });
  } else {
    // Fallback для браузеров без Scheduler API
    setTimeout(callback, 0);
  }
};

// Измерение производительности
export const measurePerformance = (name: string, fn: () => void) => {
  const start = performance.now();
  fn();
  const end = performance.now();
  console.log(`${name} took ${end - start} milliseconds`);
};

// Оптимизация для PWA
export const setupPWA = () => {
  // Регистрируем Service Worker
  setupCaching();
  
  // Добавляем манифест
  if (typeof document !== 'undefined') {
    const manifestLink = document.createElement('link');
    manifestLink.rel = 'manifest';
    manifestLink.href = '/manifest.json';
    document.head.appendChild(manifestLink);
  }
};