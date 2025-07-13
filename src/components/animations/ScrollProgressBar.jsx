import React from 'react';
import { useScrollProgress } from '../../hooks/useScrollAnimation.js';

const ScrollProgressBar = ({ 
  position = 'top',
  height = '3px',
  color = 'bg-primary-light dark:bg-primary-dark',
  className = '',
  showPercentage = false
}) => {
  const scrollProgress = useScrollProgress();

  const positionClasses = {
    top: 'top-0 left-0 right-0',
    bottom: 'bottom-0 left-0 right-0',
    left: 'left-0 top-0 bottom-0',
    right: 'right-0 top-0 bottom-0'
  };

  const isVertical = position === 'left' || position === 'right';

  return (
    <>
      {/* Progress Bar */}
      <div 
        className={`fixed z-50 ${positionClasses[position]} ${className}`}
        style={{
          [isVertical ? 'width' : 'height']: height,
          backgroundColor: 'rgba(0, 0, 0, 0.1)'
        }}
      >
        <div 
          className={`h-full transition-all duration-150 ease-out ${color}`}
          style={{
            [isVertical ? 'height' : 'width']: `${scrollProgress}%`,
            transformOrigin: position === 'right' ? 'top' : 
                           position === 'bottom' ? 'right' : 'left'
          }}
        />
      </div>

      {/* Percentage Indicator */}
      {showPercentage && (
        <div 
          className="fixed z-50 bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark px-2 py-1 rounded-md text-sm font-medium shadow-lg transition-all duration-150"
          style={{
            top: position === 'top' ? '20px' : 'auto',
            bottom: position === 'bottom' ? '20px' : 'auto',
            right: '20px',
            opacity: scrollProgress > 5 ? 1 : 0,
            transform: scrollProgress > 5 ? 'translateY(0)' : 'translateY(10px)'
          }}
        >
          {Math.round(scrollProgress)}%
        </div>
      )}
    </>
  );
};

export default ScrollProgressBar; 