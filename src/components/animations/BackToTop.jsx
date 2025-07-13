import React, { useState, useEffect } from 'react';
import { FaChevronUp, FaRocket } from 'react-icons/fa';
import { useSmoothScroll } from '../../hooks/useScrollAnimation.js';

const BackToTop = ({ 
  showAfter = 300,
  icon = 'chevron',
  size = 'md',
  position = 'bottom-right',
  className = '',
  onClick = null 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollToTop } = useSmoothScroll();

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      setIsVisible(scrolled > showAfter);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, [showAfter]);

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      scrollToTop();
    }
  };

  const getPositionClasses = () => {
    const positions = {
      'bottom-right': 'bottom-6 right-6',
      'bottom-left': 'bottom-6 left-6',
      'bottom-center': 'bottom-6 left-1/2 transform -translate-x-1/2',
      'top-right': 'top-6 right-6',
      'top-left': 'top-6 left-6',
    };
    return positions[position] || positions['bottom-right'];
  };

  const getSizeClasses = () => {
    const sizes = {
      sm: 'w-10 h-10 text-sm',
      md: 'w-12 h-12 text-base',
      lg: 'w-14 h-14 text-lg',
      xl: 'w-16 h-16 text-xl',
    };
    return sizes[size] || sizes.md;
  };

  const getIcon = () => {
    const icons = {
      chevron: <FaChevronUp />,
      rocket: <FaRocket />,
    };
    return icons[icon] || icons.chevron;
  };

  return (
    <button
      onClick={handleClick}
      className={`
        fixed z-50 flex items-center justify-center
        bg-primary-light dark:bg-primary-dark
        text-white
        rounded-full
        shadow-lg hover:shadow-xl
        transition-all duration-300 ease-out
        hover:scale-110 hover:rotate-3
        focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:ring-offset-2
        ${getSizeClasses()}
        ${getPositionClasses()}
        ${isVisible 
          ? 'opacity-100 translate-y-0 pointer-events-auto' 
          : 'opacity-0 translate-y-4 pointer-events-none'
        }
        ${className}
      `}
      aria-label="Back to top"
    >
      <span className="transform transition-transform duration-300 group-hover:scale-110">
        {getIcon()}
      </span>
    </button>
  );
};

// Enhanced version with progress indicator
export const BackToTopWithProgress = ({ 
  showAfter = 300,
  className = '',
  strokeWidth = 3,
  size = 56 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { scrollToTop } = useSmoothScroll();

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / maxScroll) * 100;
      
      setIsVisible(scrolled > showAfter);
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [showAfter]);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <button
      onClick={scrollToTop}
      className={`
        fixed bottom-6 right-6 z-50
        flex items-center justify-center
        bg-surface-light dark:bg-surface-dark
        text-primary-light dark:text-primary-dark
        rounded-full
        shadow-lg hover:shadow-xl
        transition-all duration-300 ease-out
        hover:scale-110
        focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:ring-offset-2
        ${isVisible 
          ? 'opacity-100 translate-y-0 pointer-events-auto' 
          : 'opacity-0 translate-y-4 pointer-events-none'
        }
        ${className}
      `}
      style={{ width: size, height: size }}
      aria-label="Back to top"
    >
      <svg
        className="absolute inset-0 w-full h-full transform -rotate-90"
        width={size}
        height={size}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          opacity={0.2}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-300 ease-out"
        />
      </svg>
      <FaChevronUp className="relative z-10 text-lg" />
    </button>
  );
};

export default BackToTop; 