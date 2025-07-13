import React, { useState, useRef, useEffect } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation.js';

const OptimizedImage = ({ 
  src, 
  webpSrc, 
  alt, 
  width, 
  height, 
  className = '', 
  lazy = true,
  placeholderSrc,
  blurDataURL,
  sizes = '100vw',
  priority = false,
  onLoad,
  onError,
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [imageSrc, setImageSrc] = useState(priority ? src : placeholderSrc || null);
  const imgRef = useRef(null);
  
  // Use scroll animation hook for lazy loading
  const { elementRef, isVisible } = useScrollAnimation({
    threshold: 0.1,
    triggerOnce: true,
    rootMargin: '50px' // Start loading 50px before the image is visible
  });

  // Check WebP support
  const [supportsWebP, setSupportsWebP] = useState(false);

  useEffect(() => {
    const checkWebPSupport = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1;
      canvas.height = 1;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, 1, 1);
      return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    };

    setSupportsWebP(checkWebPSupport());
  }, []);

  // Handle lazy loading
  useEffect(() => {
    if (!lazy || priority) {
      loadImage();
      return;
    }

    if (isVisible && !isLoaded && !isError) {
      loadImage();
    }
  }, [isVisible, lazy, priority, isLoaded, isError]);

  const loadImage = () => {
    const finalSrc = webpSrc && supportsWebP ? webpSrc : src;
    
    if (finalSrc) {
      const img = new Image();
      img.onload = () => {
        setImageSrc(finalSrc);
        setIsLoaded(true);
        if (onLoad) onLoad();
      };
      img.onerror = () => {
        setIsError(true);
        if (onError) onError();
      };
      img.src = finalSrc;
    }
  };

  const getBlurStyle = () => {
    if (blurDataURL && !isLoaded) {
      return {
        backgroundImage: `url(${blurDataURL})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'blur(10px)',
        transform: 'scale(1.1)', // Slightly scale to hide blur edges
      };
    }
    return {};
  };

  const getImageClasses = () => {
    let classes = className;
    
    if (!isLoaded) {
      classes += ' opacity-0';
    } else {
      classes += ' opacity-100';
    }
    
    classes += ' transition-opacity duration-500 ease-in-out';
    
    return classes;
  };

  if (isError) {
    return (
      <div 
        className={`bg-gray-200 dark:bg-gray-700 flex items-center justify-center ${className}`}
        style={{ width, height }}
        {...props}
      >
        <div className="text-gray-400 dark:text-gray-500 text-center">
          <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-sm">Failed to load image</span>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={elementRef}
      className="relative overflow-hidden"
      style={{ width, height }}
    >
      {/* Blur placeholder */}
      {blurDataURL && !isLoaded && (
        <div 
          className="absolute inset-0 z-10"
          style={getBlurStyle()}
        />
      )}
      
      {/* Skeleton placeholder */}
      {!isLoaded && !blurDataURL && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse">
          <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-pulse"></div>
        </div>
      )}
      
      {/* Main image */}
      <img
        ref={imgRef}
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        className={getImageClasses()}
        sizes={sizes}
        loading={lazy && !priority ? 'lazy' : 'eager'}
        decoding="async"
        {...props}
      />
      
      {/* Loading indicator */}
      {!isLoaded && !isError && (lazy ? isVisible : true) && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-primary-light dark:bg-primary-dark rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 bg-primary-light dark:bg-primary-dark rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 bg-primary-light dark:bg-primary-dark rounded-full animate-bounce"></div>
          </div>
        </div>
      )}
    </div>
  );
};

// Progressive image component for hero images
export const ProgressiveImage = ({ 
  lowQualitySrc, 
  highQualitySrc, 
  webpSrc, 
  alt, 
  className = '',
  ...props 
}) => {
  const [currentSrc, setCurrentSrc] = useState(lowQualitySrc);
  const [isHighQualityLoaded, setIsHighQualityLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setCurrentSrc(highQualitySrc);
      setIsHighQualityLoaded(true);
    };
    img.src = highQualitySrc;
  }, [highQualitySrc]);

  return (
    <OptimizedImage
      src={currentSrc}
      webpSrc={webpSrc}
      alt={alt}
      className={`${className} ${!isHighQualityLoaded ? 'filter blur-sm' : ''}`}
      lazy={false}
      priority={true}
      {...props}
    />
  );
};

// Responsive image component
export const ResponsiveImage = ({ 
  src, 
  webpSrc, 
  srcSet, 
  alt, 
  className = '',
  breakpoints = {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px'
  },
  ...props 
}) => {
  const generateSizes = () => {
    const entries = Object.entries(breakpoints).reverse();
    const sizeQueries = entries.map(([key, value]) => `(min-width: ${value}) 100vw`);
    return sizeQueries.join(', ') + ', 100vw';
  };

  return (
    <OptimizedImage
      src={src}
      webpSrc={webpSrc}
      alt={alt}
      className={className}
      sizes={generateSizes()}
      {...props}
    />
  );
};

export default OptimizedImage; 