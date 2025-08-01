// Performance optimization utilities

/**
 * Initializes performance optimizations for the application
 */
export const initPerformanceOptimizations = (): void => {
  // Preload critical resources
  preloadCriticalResources();
  
  // Initialize intersection observer for lazy loading
  initLazyLoading();
  
  // Initialize content visibility observer
  initContentVisibility();
  
  // Initialize performance metrics tracking
  initPerformanceMetrics();
};

/**
 * Preloads critical resources for faster initial load
 */
const preloadCriticalResources = (): void => {
  // Preconnect to external domains
  const preconnectDomains = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://images.pexels.com'
  ];
  
  preconnectDomains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = domain;
    if (domain.includes('gstatic')) {
      link.crossOrigin = 'anonymous';
    }
    document.head.appendChild(link);
  });
  
  // Preload critical fonts
  const criticalFonts = [
    'https://fonts.gstatic.com/s/montserrat/v25/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtr6Ew-.woff2',
    'https://fonts.gstatic.com/s/opensans/v34/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsg-1x4gaVQUwaEQbjB_mQ.woff2'
  ];
  
  criticalFonts.forEach(font => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = font;
    link.as = 'font';
    link.type = 'font/woff2';
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
  
  // Preload critical images
  const criticalImages = [
    document.querySelector('.hero-slider img')?.getAttribute('src') || '',
  ].filter(Boolean);
  
  criticalImages.forEach(image => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = image;
    link.as = 'image';
    document.head.appendChild(link);
  });
};

/**
 * Initializes lazy loading for images and iframes
 */
const initLazyLoading = (): void => {
  // Use native lazy loading where supported
  if ('loading' in HTMLImageElement.prototype) {
    document.querySelectorAll('img').forEach(img => {
      if (!img.hasAttribute('loading') && !img.hasAttribute('data-no-lazy')) {
        img.setAttribute('loading', 'lazy');
      }
    });
    
    document.querySelectorAll('iframe').forEach(iframe => {
      if (!iframe.hasAttribute('loading')) {
        iframe.setAttribute('loading', 'lazy');
      }
    });
  } else {
    // Fallback to Intersection Observer for browsers that don't support native lazy loading
    const lazyImages = document.querySelectorAll('img[data-src], iframe[data-src]');
    
    if (lazyImages.length > 0) {
      const lazyImageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const lazyImage = entry.target as HTMLImageElement | HTMLIFrameElement;
            const src = lazyImage.getAttribute('data-src');
            
            if (src) {
              lazyImage.setAttribute('src', src);
              lazyImage.removeAttribute('data-src');
            }
            
            const srcset = lazyImage.getAttribute('data-srcset');
            if (srcset) {
              lazyImage.setAttribute('srcset', srcset);
              lazyImage.removeAttribute('data-srcset');
            }
            
            lazyImageObserver.unobserve(lazyImage);
          }
        });
      });
      
      lazyImages.forEach(lazyImage => {
        lazyImageObserver.observe(lazyImage);
      });
    }
  }
};

/**
 * Initializes content visibility observer for better rendering performance
 */
const initContentVisibility = (): void => {
  const contentVisibilityElements = document.querySelectorAll('.content-visibility-auto');
  
  if (contentVisibilityElements.length > 0) {
    const contentObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          
          // Optionally unobserve after becoming visible
          // contentObserver.unobserve(entry.target);
        } else {
          entry.target.classList.remove('visible');
        }
      });
    }, {
      rootMargin: '200px 0px', // Start loading before element is in viewport
    });
    
    contentVisibilityElements.forEach(element => {
      contentObserver.observe(element);
    });
  }
};

/**
 * Initializes performance metrics tracking
 */
const initPerformanceMetrics = (): void => {
  if ('performance' in window && 'PerformanceObserver' in window) {
    // Track Core Web Vitals
    try {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach(entry => {
          // Report to analytics or console
          console.debug('[Performance]', entry.name, entry.startTime, entry.duration);
        });
      });
      
      // Observe paint timing
      observer.observe({ entryTypes: ['paint', 'largest-contentful-paint', 'layout-shift', 'first-input'] });
    } catch (e) {
      console.error('Performance Observer error:', e);
    }
  }
};

/**
 * Registers service worker for PWA functionality
 */
export const registerServiceWorker = (): void => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch(error => {
          console.error('Service Worker registration failed:', error);
        });
    });
  }
};

/**
 * Checks if app can be installed (PWA)
 * @returns Promise resolving to boolean
 */
export const canInstallPWA = async (): Promise<boolean> => {
  if ('getInstalledRelatedApps' in navigator) {
    try {
      // @ts-ignore - TypeScript doesn't know about this API yet
      const relatedApps = await navigator.getInstalledRelatedApps();
      return relatedApps.length === 0;
    } catch (e) {
      console.error('Error checking installed apps:', e);
    }
  }
  
  return false;
};

/**
 * Defers non-critical resources
 * @param callback Function to execute after defer
 * @param timeout Timeout in milliseconds
 */
export const deferNonCritical = (callback: () => void, timeout: number = 2000): void => {
  if ('requestIdleCallback' in window) {
    // @ts-ignore - TypeScript doesn't know about this API in some versions
    window.requestIdleCallback(callback, { timeout });
  } else {
    setTimeout(callback, timeout);
  }
};

/**
 * Optimizes images on the page
 */
export const optimizeImages = (): void => {
  // Convert images to WebP where supported
  if ('createImageBitmap' in window) {
    const webpSupport = document.createElement('canvas')
      .toDataURL('image/webp')
      .indexOf('data:image/webp') === 0;
    
    if (webpSupport) {
      document.documentElement.classList.add('webp');
      
      // Find images that could be converted to WebP
      document.querySelectorAll('img[src$=".jpg"], img[src$=".jpeg"], img[src$=".png"]').forEach(img => {
        const src = img.getAttribute('src');
        if (src && !src.includes('data:') && !src.includes('blob:')) {
          // For Pexels images
          if (src.includes('pexels.com')) {
            const newSrc = new URL(src);
            newSrc.searchParams.set('auto', 'webp');
            img.setAttribute('src', newSrc.toString());
          }
        }
      });
    }
  }
};