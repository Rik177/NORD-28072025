const CACHE_NAME = "nordengineering-v3";
const STATIC_CACHE_URLS = [
  "/",
  "/index.html",
  "/manifest.json",
  "/offline.html",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png"
];

// Separate caches for different types of resources
const RUNTIME_CACHE = "runtime-cache-v3";
const IMAGE_CACHE = "image-cache-v3";
const FONT_CACHE = "font-cache-v3";
const STATIC_ASSETS_CACHE = "static-assets-v3";

// Install Service Worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(STATIC_CACHE_URLS);
      })
      .then(() => {
        return self.skipWaiting();
      })
  );
});

// Activate Service Worker
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (
              ![
                CACHE_NAME, 
                RUNTIME_CACHE, 
                IMAGE_CACHE, 
                FONT_CACHE, 
                STATIC_ASSETS_CACHE
              ].includes(cacheName)
            ) {
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        return self.clients.claim();
      })
  );
});

// Helper function to determine cache based on request
const getCacheForRequest = (request) => {
  const url = new URL(request.url);
  
  // Font files
  if (
    request.destination === 'font' || 
    url.pathname.match(/\.(woff2?|eot|ttf|otf)$/i)
  ) {
    return FONT_CACHE;
  }
  
  // Image files
  if (
    request.destination === 'image' || 
    url.pathname.match(/\.(jpe?g|png|gif|svg|webp|avif)$/i)
  ) {
    return IMAGE_CACHE;
  }
  
  // Static assets (CSS, JS)
  if (
    request.destination === 'script' || 
    request.destination === 'style' || 
    url.pathname.match(/\.(js|css)$/i)
  ) {
    return STATIC_ASSETS_CACHE;
  }
  
  // Default to runtime cache
  return RUNTIME_CACHE;
};

// Fetch Event - Advanced Caching Strategy
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip cross-origin requests except for allowed domains
  const allowedDomains = [
    location.hostname,
    'fonts.googleapis.com',
    'fonts.gstatic.com',
    'images.pexels.com',
    'upload.wikimedia.org'
  ];
  
  const isAllowedDomain = allowedDomains.some(domain => 
    url.hostname === domain || url.hostname.endsWith(`.${domain}`)
  );
  
  if (!isAllowedDomain) {
    return;
  }

  // Font caching strategy - Cache First with Network Fallback
  if (request.destination === 'font' || url.pathname.match(/\.(woff2?|eot|ttf|otf)$/i)) {
    event.respondWith(
      caches.open(FONT_CACHE).then(cache => {
        return cache.match(request).then(response => {
          if (response) {
            return response;
          }
          
          return fetch(request).then(fetchResponse => {
            if (fetchResponse.ok) {
              cache.put(request, fetchResponse.clone());
            }
            return fetchResponse;
          }).catch(error => {
            console.error('Font fetch error:', error);
            // No fallback for fonts
          });
        });
      })
    );
    return;
  }

  // Image caching strategy - Cache First with Network Fallback
  if (request.destination === 'image' || url.pathname.match(/\.(jpe?g|png|gif|svg|webp|avif)$/i)) {
    event.respondWith(
      caches.open(IMAGE_CACHE).then(cache => {
        return cache.match(request).then(response => {
          if (response) {
            // Refresh cache in background
            fetch(request).then(fetchResponse => {
              if (fetchResponse.ok) {
                cache.put(request, fetchResponse.clone());
              }
            }).catch(() => {});
            
            return response;
          }
          
          return fetch(request).then(fetchResponse => {
            if (fetchResponse.ok) {
              cache.put(request, fetchResponse.clone());
            }
            return fetchResponse;
          }).catch(() => {
            // Return placeholder image if available
            return caches.match('/icons/image-placeholder.svg');
          });
        });
      })
    );
    return;
  }

  // Navigation requests (HTML pages) - Network First with Cache Fallback
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const responseClone = response.clone();
          caches.open(RUNTIME_CACHE).then((cache) => {
            cache.put(request, responseClone);
          });
          return response;
        })
        .catch(() => {
          return caches.match(request).then((cachedResponse) => {
            return cachedResponse || caches.match('/offline.html');
          });
        }),
    );
    return;
  }

  // CSS and JS files - Stale While Revalidate
  if (
    request.destination === 'script' || 
    request.destination === 'style' ||
    url.pathname.includes('.css') ||
    url.pathname.includes('.js')
  ) {
    event.respondWith(
      caches.open(STATIC_ASSETS_CACHE).then(cache => {
        return cache.match(request).then(response => {
          const fetchPromise = fetch(request).then(fetchResponse => {
            if (fetchResponse.ok) {
              cache.put(request, fetchResponse.clone());
            }
            return fetchResponse;
          }).catch(error => {
            console.error('Static asset fetch error:', error);
            // No specific fallback, will use cached version if available
          });
          
          return response || fetchPromise;
        });
      })
    );
    return;
  }

  // API requests - Network First with Cache Fallback
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(RUNTIME_CACHE).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          return caches.match(request);
        }),
    );
    return;
  }

  // Default strategy for other requests - Network First with Cache Fallback
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response.status === 200) {
          const responseClone = response.clone();
          const cacheName = getCacheForRequest(request);
          
          caches.open(cacheName).then((cache) => {
            cache.put(request, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        return caches.match(request);
      }),
  );
});

// Background Sync for form submissions
self.addEventListener("sync", (event) => {
  if (event.tag === "contact-form") {
    event.waitUntil(sendPendingContactForms());
  }
});

async function sendPendingContactForms() {
  const formData = await getStoredFormData();
  if (formData && formData.length > 0) {
    for (const form of formData) {
      try {
        await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });
        await removeStoredFormData(form.id);
      } catch (error) {
        console.log("Failed to send form data:", error);
      }
    }
  }
}

async function getStoredFormData() {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['forms'], 'readonly');
    const store = transaction.objectStore('forms');
    const request = store.getAll();
    
    request.onsuccess = () => {
      resolve(request.result);
    };
    
    request.onerror = () => {
      reject(request.error);
    };
  });
}

async function removeStoredFormData(id) {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['forms'], 'readwrite');
    const store = transaction.objectStore('forms');
    const request = store.delete(id);
    
    request.onsuccess = () => {
      resolve();
    };
    
    request.onerror = () => {
      reject(request.error);
    };
  });
}

async function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('nordengineering-forms', 1);
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('forms')) {
        db.createObjectStore('forms', { keyPath: 'id' });
      }
    };
    
    request.onsuccess = () => {
      resolve(request.result);
    };
    
    request.onerror = () => {
      reject(request.error);
    };
  });
}

// Push notification handling
self.addEventListener("push", (event) => {
  const options = {
    body: event.data
      ? event.data.text()
      : "Новое уведомление от НОРДИНЖИНИРИНГ",
    icon: "/icons/icon-192x192.png",
    badge: "/icons/badge-72x72.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
    actions: [
      {
        action: "explore",
        title: "Перейти на сайт",
        icon: "/icons/action-explore.png",
      },
      {
        action: "close",
        title: "Закрыть",
        icon: "/icons/action-close.png",
      },
    ],
  };

  event.waitUntil(
    self.registration.showNotification("НОРДИНЖИНИРИНГ", options),
  );
});

// Notification click handling
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  if (event.action === "explore") {
    event.waitUntil(clients.openWindow("/"));
  }
});

// Periodic background sync for cache cleanup
self.addEventListener("periodicsync", (event) => {
  if (event.tag === "cache-cleanup") {
    event.waitUntil(cleanupOldCaches());
  }
});

async function cleanupOldCaches() {
  const cacheNames = await caches.keys();
  const oldCaches = cacheNames.filter(name => 
    !name.includes('v3') && 
    (name.includes('nordengineering') || 
     name.includes('runtime') || 
     name.includes('image') ||
     name.includes('font') ||
     name.includes('static'))
  );
  
  await Promise.all(oldCaches.map(name => caches.delete(name)));
}

// Cache warming on activation
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // Warm the cache with critical resources
      return cache.addAll([
        '/',
        '/offline.html',
        '/manifest.json',
        '/icons/icon-192x192.png',
        '/icons/icon-512x512.png'
      ]);
    })
  );
});

// Handle app installation
self.addEventListener('appinstalled', (event) => {
  // Log app installation
  console.log('PWA was installed');
});