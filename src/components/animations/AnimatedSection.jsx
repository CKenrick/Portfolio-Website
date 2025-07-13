import React from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation.js';

const AnimatedSection = ({ 
  children, 
  animation = 'fadeInUp',
  delay = 0,
  duration = 600,
  className = '',
  id,
  ...props 
}) => {
  const { elementRef, isVisible } = useScrollAnimation({
    threshold: 0.1,
    delay,
    triggerOnce: true
  });

  const getAnimationClasses = () => {
    const baseClasses = `transition-all duration-${duration} ease-out`;
    
    const animations = {
      fadeInUp: isVisible 
        ? 'translate-y-0 opacity-100' 
        : 'translate-y-8 opacity-0',
      fadeInDown: isVisible 
        ? 'translate-y-0 opacity-100' 
        : '-translate-y-8 opacity-0',
      fadeInLeft: isVisible 
        ? 'translate-x-0 opacity-100' 
        : '-translate-x-8 opacity-0',
      fadeInRight: isVisible 
        ? 'translate-x-0 opacity-100' 
        : 'translate-x-8 opacity-0',
      fadeIn: isVisible 
        ? 'opacity-100' 
        : 'opacity-0',
      scaleIn: isVisible 
        ? 'scale-100 opacity-100' 
        : 'scale-95 opacity-0',
      slideInUp: isVisible 
        ? 'translate-y-0 opacity-100' 
        : 'translate-y-full opacity-0',
      rotateIn: isVisible 
        ? 'rotate-0 opacity-100' 
        : 'rotate-12 opacity-0',
      bounceIn: isVisible 
        ? 'translate-y-0 opacity-100' 
        : 'translate-y-4 opacity-0',
    };
    
    return `${baseClasses} ${animations[animation] || animations.fadeInUp}`;
  };

  return (
    <div 
      ref={elementRef}
      id={id}
      className={`${getAnimationClasses()} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default AnimatedSection; 