import React from 'react';
import { useStaggeredAnimation } from '../../hooks/useScrollAnimation.js';

const StaggeredList = ({ 
  children, 
  animation = 'fadeInUp',
  staggerDelay = 100,
  duration = 600,
  className = '',
  itemClassName = '',
  ...props 
}) => {
  const childrenArray = React.Children.toArray(children);
  const { elementRef, visibleItems } = useStaggeredAnimation(childrenArray.length, {
    staggerDelay,
    threshold: 0.1,
    triggerOnce: true
  });

  const getItemAnimationClasses = (index) => {
    const baseClasses = `transition-all duration-${duration} ease-out`;
    const isVisible = visibleItems.has(index);
    
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
      className={className}
      {...props}
    >
      {childrenArray.map((child, index) => (
        <div
          key={index}
          className={`${getItemAnimationClasses(index)} ${itemClassName}`}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

export default StaggeredList; 