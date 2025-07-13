import React, { useState, useRef, useEffect } from 'react';
import { useLazyLoading } from '../hooks/useImageOptimization.js';

const LazyImage = ({ 
  src, 
  alt, 
  className = '', 
  placeholder = null,
  onLoad = null,
  onError = null,
  priority = false,
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [actualSrc, setActualSrc] = useState(priority ? src : '');
  
  const { ref, isIntersecting, hasLoaded, setHasLoaded } = useLazyLoading({
    threshold: 0.1,
    rootMargin: '50px',
    triggerOnce: true
  });

  // Load image when it comes into view or if it's priority
  useEffect(() => {
    if (priority || isIntersecting) {
      if (!hasLoaded && !hasError) {
        setActualSrc(src);
        setHasLoaded(true);
      }
    }
  }, [isIntersecting, priority, hasLoaded, hasError, src, setHasLoaded]);

  const handleLoad = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  };

  const handleError = () => {
    setHasError(true);
    if (onError) onError();
  };

  const getImageClasses = () => {
    let classes = className;
    
    if (!isLoaded && actualSrc) {
      classes += ' opacity-0';
    } else if (isLoaded) {
      classes += ' opacity-100';
    }
    
    classes += ' transition-opacity duration-300 ease-in-out';
    
    return classes;
  };

  if (hasError) {
    return (
      <div className={`bg-gray-200 dark:bg-gray-700 flex items-center justify-center ${className}`}>
        <div className="text-gray-400 dark:text-gray-500 text-center">
          <svg className="w-6 h-6 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-xs">Failed to load</span>
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className="relative">
      {/* Placeholder while loading */}
      {!isLoaded && actualSrc && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse rounded">
          {placeholder || (
            <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-pulse rounded"></div>
          )}
        </div>
      )}
      
      {/* Actual image */}
      {actualSrc && (
        <img
          src={actualSrc}
          alt={alt}
          className={getImageClasses()}
          onLoad={handleLoad}
          onError={handleError}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          {...props}
        />
      )}
      
      {/* Loading indicator for lazy images */}
      {!priority && !actualSrc && (
        <div className={`bg-gray-200 dark:bg-gray-700 animate-pulse ${className}`}>
          <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-pulse"></div>
        </div>
      )}
    </div>
  );
};

export default LazyImage; 