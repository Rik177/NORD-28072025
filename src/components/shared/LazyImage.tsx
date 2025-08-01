import React, { useState, useRef, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { generateSrcSet, generateOptimizedUrl, supportsWebP, supportsAVIF, generatePlaceholderUrl } from '../../utils/imageOptimization';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
  onLoad?: () => void;
  onError?: () => void;
  placeholder?: string;
  blurDataURL?: string;
  fetchpriority?: "high" | "low" | "auto";
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  onLoad,
  onError,
  placeholder,
  blurDataURL,
  fetchpriority = "auto"
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [error, setError] = useState(false);
  const [imageFormat, setImageFormat] = useState<'avif' | 'webp' | 'original'>('original');
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver>();
  const placeholderUrl = blurDataURL || generatePlaceholderUrl(src);

  useEffect(() => {
    // Determine supported image formats
    const checkFormats = async () => {
      if (await supportsAVIF()) {
        setImageFormat('avif');
      } else if (await supportsWebP()) {
        setImageFormat('webp');
      }
    };
    
    checkFormats();
  }, []);

  useEffect(() => {
    if (priority) {
      setIsInView(true);
      return;
    }

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observerRef.current?.disconnect();
        }
      },
      { 
        rootMargin: '200px', // Start loading before image enters viewport
        threshold: 0.01 
      }
    );

    if (imgRef.current) {
      observerRef.current.observe(imgRef.current);
    }

    return () => observerRef.current?.disconnect();
  }, [priority]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setError(true);
    onError?.();
  };

  const getOptimizedSrc = () => {
    return generateOptimizedUrl(src, width);
  };

  if (error) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 ${className}`}
        style={{ width, height }}
      >
        <span className="text-sm">Изображение недоступно</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`} ref={imgRef}>
      {/* Placeholder */}
      {!isLoaded && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700"
          style={
            placeholderUrl
              ? {
                  backgroundImage: `url(${placeholderUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  filter: "blur(10px)",
                }
              : {}
          }
        >
          {placeholder ? (
            <img
              src={placeholder}
              alt=""
              className="w-full h-full object-cover blur-sm opacity-50"
              aria-hidden="true"
            />
          ) : (
            <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
          )}
        </div>
      )}

      {/* Main Image */}
      {isInView && (
        <picture>
          {/* AVIF format */}
          {imageFormat === 'avif' && (
            <source
              srcSet={generateSrcSet(src).replace(/\.(jpe?g|png)/gi, '.avif')}
              sizes={sizes}
              type="image/avif"
            />
          )}
          
          {/* WebP format */}
          {(imageFormat === 'webp' || imageFormat === 'avif') && (
            <source
              srcSet={generateSrcSet(src).replace(/\.(jpe?g|png)/gi, '.webp')}
              sizes={sizes}
              type="image/webp"
            />
          )}
          
          {/* Fallback */}
          <img
            src={getOptimizedSrc()}
            alt={alt}
            className={`transition-opacity duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            } ${className}`}
            width={width}
            height={height}
            srcSet={generateSrcSet(src)}
            sizes={sizes}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            fetchpriority={fetchpriority}
            onLoad={handleLoad}
            onError={handleError}
            style={{
              objectFit: 'cover',
              width: width ? `${width}px` : '100%',
              height: height ? `${height}px` : '100%',
            }}
          />
        </picture>
      )}
    </div>
  );
};

export default LazyImage;