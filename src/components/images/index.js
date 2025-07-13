// Image optimization components
export { default as OptimizedImage, ProgressiveImage, ResponsiveImage } from '../OptimizedImage.jsx';
export { default as LazyImage } from '../LazyImage.jsx';

// Image optimization hooks
export { 
  useImageOptimization, 
  useLazyLoading, 
  useProgressiveImage, 
  useImagePreload, 
  useImageLoad 
} from '../../hooks/useImageOptimization.js';

// Optimized image assets
export * from '../../images/optimized/index.js'; 