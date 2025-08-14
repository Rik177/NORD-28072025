// Image optimization utilities

/**
 * Generates optimized image URL with parameters for responsive images
 * @param src Original image URL
 * @param width Optional width to request
 * @param quality Optional quality (1-100)
 * @returns Optimized image URL
 */
export const generateOptimizedUrl = (src: string, width?: number, quality: number = 80): string => {
  // Only process URLs from supported domains
  if (!src || !isExternalImage(src)) {
    return src;
  }

  // MirCli images have size folders like /images/120/, /images/300/, /images/600/
  try {
    const urlObj = new URL(src);
    if (urlObj.hostname.includes('mircli.ru') && /\/themes\/mircli\/images\//.test(urlObj.pathname)) {
      const targetWidth = width || 600;
      const bucket = targetWidth <= 200 ? '120' : targetWidth <= 480 ? '300' : '600';
      const replaced = urlObj.pathname.replace(/\/images\/(120|300|600)\//, `/images/${bucket}/`);
      urlObj.pathname = replaced;
      return urlObj.toString();
    }
  } catch {}

  // For Pexels images, use their API parameters
  if (src.includes('pexels.com')) {
    const url = new URL(src);
    
    // Add auto compression
    if (!url.searchParams.has('auto')) {
      url.searchParams.set('auto', 'compress');
    }
    
    // Set quality
    if (!url.searchParams.has('q') && quality) {
      url.searchParams.set('q', quality.toString());
    }
    
    // Set width if provided
    if (width && !url.searchParams.has('w')) {
      url.searchParams.set('w', width.toString());
    }
    
    return url.toString();
  }

  // For other supported services, return original URL
  return src;
};

/**
 * Generates srcSet attribute for responsive images
 * @param src Original image URL
 * @returns srcSet string with multiple resolutions
 */
export const generateSrcSet = (src: string): string => {
  if (!src || !isExternalImage(src)) {
    return '';
  }

  // Define widths for responsive images
  let widths = [320, 640, 768, 1024, 1280, 1536, 1920];

  // For MirCli images stick to available buckets
  try {
    const urlObj = new URL(src);
    if (urlObj.hostname.includes('mircli.ru') && /\/themes\/mircli\/images\//.test(urlObj.pathname)) {
      widths = [300, 600];
    }
  } catch {}
  
  // Generate srcSet entries
  return widths
    .map(w => `${generateOptimizedUrl(src, w)} ${w}w`)
    .join(', ');
};

/**
 * Checks if browser supports WebP format
 * @returns Promise resolving to boolean
 */
export const supportsWebP = async (): Promise<boolean> => {
  if (!self.createImageBitmap) return false;
  
  const webpData = 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=';
  const blob = await fetch(webpData).then(r => r.blob());
  
  return createImageBitmap(blob).then(() => true, () => false);
};

/**
 * Checks if browser supports AVIF format
 * @returns Promise resolving to boolean
 */
export const supportsAVIF = async (): Promise<boolean> => {
  if (!self.createImageBitmap) return false;
  
  const avifData = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=';
  const blob = await fetch(avifData).then(r => r.blob());
  
  return createImageBitmap(blob).then(() => true, () => false);
};

/**
 * Checks if URL is from a supported external image provider
 * @param url Image URL to check
 * @returns Boolean indicating if URL is from supported provider
 */
export const isExternalImage = (url: string): boolean => {
  if (!url) return false;
  
  const supportedDomains = [
    'mircli.ru',
    'pexels.com',
    'images.pexels.com',
    'unsplash.com',
    'images.unsplash.com',
    'picsum.photos',
    'placekitten.com',
    'placeimg.com',
    'loremflickr.com',
    'cloudinary.com'
  ];
  
  try {
    const urlObj = new URL(url);
    return supportedDomains.some(domain => urlObj.hostname.includes(domain));
  } catch (e) {
    return false;
  }
};

/**
 * Converts image to WebP format if supported
 * @param src Original image URL
 * @returns URL with WebP format if supported
 */
export const getWebPUrl = (src: string): string => {
  if (!src || !isExternalImage(src)) {
    return src;
  }
  
  // For Pexels images
  if (src.includes('pexels.com')) {
    const url = new URL(src);
    url.searchParams.set('auto', 'webp');
    return url.toString();
  }
  
  return src;
};

/**
 * Generates a low-quality image placeholder URL
 * @param src Original image URL
 * @returns Low quality placeholder URL
 */
export const generatePlaceholderUrl = (src: string): string => {
  if (!src || !isExternalImage(src)) {
    return '';
  }
  
  // For Pexels images
  if (src.includes('pexels.com')) {
    const url = new URL(src);
    url.searchParams.set('auto', 'compress');
    url.searchParams.set('q', '10');
    url.searchParams.set('w', '50');
    url.searchParams.set('blur', '10');
    return url.toString();
  }
  
  return '';
};

/**
 * Preloads critical images
 * @param urls Array of image URLs to preload
 */
export const preloadCriticalImages = (urls: string[]): void => {
  urls.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = url;
    link.type = 'image/webp';
    document.head.appendChild(link);
  });
};