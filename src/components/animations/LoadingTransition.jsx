import React, { useState, useEffect } from 'react';

const LoadingTransition = ({ 
  isLoading = true, 
  children, 
  type = 'fade',
  duration = 300,
  className = '',
  loadingComponent = null,
  minLoadingTime = 500
}) => {
  const [showContent, setShowContent] = useState(!isLoading);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    let timeout;
    
    if (isLoading) {
      setShowContent(false);
      setIsTransitioning(true);
    } else {
      // Ensure minimum loading time for better UX
      timeout = setTimeout(() => {
        setShowContent(true);
        
        // Reset transition state after animation
        setTimeout(() => {
          setIsTransitioning(false);
        }, duration);
      }, minLoadingTime);
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [isLoading, duration, minLoadingTime]);

  const getTransitionClasses = () => {
    const baseClasses = `transition-all duration-${duration} ease-out`;
    
    const transitions = {
      fade: showContent 
        ? 'opacity-100' 
        : 'opacity-0',
      slideDown: showContent 
        ? 'translate-y-0 opacity-100' 
        : '-translate-y-4 opacity-0',
      slideUp: showContent 
        ? 'translate-y-0 opacity-100' 
        : 'translate-y-4 opacity-0',
      scale: showContent 
        ? 'scale-100 opacity-100' 
        : 'scale-95 opacity-0',
      slideLeft: showContent 
        ? 'translate-x-0 opacity-100' 
        : 'translate-x-4 opacity-0',
      slideRight: showContent 
        ? 'translate-x-0 opacity-100' 
        : '-translate-x-4 opacity-0',
    };
    
    return `${baseClasses} ${transitions[type] || transitions.fade}`;
  };

  if (isLoading || isTransitioning) {
    return (
      <div className={`${className} ${getTransitionClasses()}`}>
        {loadingComponent || <DefaultLoader />}
      </div>
    );
  }

  return (
    <div className={`${className} ${getTransitionClasses()}`}>
      {children}
    </div>
  );
};

// Default loading component
const DefaultLoader = () => (
  <div className="flex items-center justify-center min-h-[200px] space-x-2">
    <div className="w-2 h-2 bg-primary-light dark:bg-primary-dark rounded-full animate-bounce [animation-delay:-0.3s]"></div>
    <div className="w-2 h-2 bg-primary-light dark:bg-primary-dark rounded-full animate-bounce [animation-delay:-0.15s]"></div>
    <div className="w-2 h-2 bg-primary-light dark:bg-primary-dark rounded-full animate-bounce"></div>
  </div>
);

// Skeleton loader component
export const SkeletonLoader = ({ 
  lines = 3, 
  className = '',
  showAvatar = false,
  animated = true 
}) => {
  const animationClass = animated ? 'animate-pulse' : '';
  
  return (
    <div className={`${className} ${animationClass}`}>
      {showAvatar && (
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
          <div className="space-y-2 flex-1">
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/4"></div>
            <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/3"></div>
          </div>
        </div>
      )}
      
      <div className="space-y-3">
        {[...Array(lines)].map((_, index) => (
          <div key={index} className="space-y-2">
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-5/6"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Card skeleton
export const CardSkeleton = ({ className = '' }) => (
  <div className={`border border-gray-200 dark:border-gray-700 rounded-lg p-6 ${className} animate-pulse`}>
    <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-4"></div>
    <div className="space-y-2">
      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-5/6"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-4/6"></div>
    </div>
    <div className="mt-4 h-8 bg-gray-300 dark:bg-gray-600 rounded w-1/3"></div>
  </div>
);

export default LoadingTransition; 