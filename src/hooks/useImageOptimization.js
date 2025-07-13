import { useState, useEffect, useCallback } from 'react';

// Hook for managing optimized images
export const useImageOptimization = () => {
  const [webpSupported, setWebpSupported] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const checkWebPSupport = () => {
      return new Promise((resolve) => {
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 1, 1);
        
        const webpData = canvas.toDataURL('image/webp');
        resolve(webpData.startsWith('data:image/webp'));
      });
    };

    checkWebPSupport().then((supported) => {
      setWebpSupported(supported);
      setIsChecked(true);
    });
  }, []);

  const getOptimalFormat = useCallback((jpegSrc, webpSrc) => {
    return webpSupported && webpSrc ? webpSrc : jpegSrc;
  }, [webpSupported]);

  const getResponsiveSource = useCallback((imageConfig, size = 'medium') => {
    const selectedSize = imageConfig[size] || imageConfig.medium || imageConfig.large;
    return getOptimalFormat(selectedSize.jpg, selectedSize.webp);
  }, [getOptimalFormat]);

  return {
    webpSupported,
    isChecked,
    getOptimalFormat,
    getResponsiveSource
  };
};

// Hook for lazy loading with intersection observer
export const useLazyLoading = (options = {}) => {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [elementRef, setElementRef] = useState(null);

  const {
    threshold = 0.1,
    rootMargin = '50px',
    triggerOnce = true
  } = options;

  useEffect(() => {
    if (!elementRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          if (triggerOnce) {
            observer.disconnect();
          }
        } else if (!triggerOnce) {
          setIsIntersecting(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(elementRef);

    return () => {
      observer.disconnect();
    };
  }, [elementRef, threshold, rootMargin, triggerOnce]);

  const ref = useCallback((node) => {
    if (node) {
      setElementRef(node);
    }
  }, []);

  return {
    ref,
    isIntersecting,
    hasLoaded,
    setHasLoaded
  };
};

// Hook for progressive image loading
export const useProgressiveImage = (lowQualitySrc, highQualitySrc) => {
  const [src, setSrc] = useState(lowQualitySrc);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!highQualitySrc) return;

    const img = new Image();
    img.onload = () => {
      setSrc(highQualitySrc);
      setIsLoaded(true);
    };
    img.onerror = () => {
      // Keep the low quality version if high quality fails
      setIsLoaded(false);
    };
    img.src = highQualitySrc;
  }, [highQualitySrc]);

  return { src, isLoaded };
};

// Hook for managing image preloading
export const useImagePreload = (imageUrls = []) => {
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [failedImages, setFailedImages] = useState(new Set());

  const preloadImage = useCallback((url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        setLoadedImages(prev => new Set(prev).add(url));
        resolve(url);
      };
      img.onerror = () => {
        setFailedImages(prev => new Set(prev).add(url));
        reject(url);
      };
      img.src = url;
    });
  }, []);

  const preloadImages = useCallback(async (urls) => {
    const promises = urls.map(url => preloadImage(url));
    try {
      await Promise.allSettled(promises);
    } catch (error) {
      console.warn('Some images failed to preload:', error);
    }
  }, [preloadImage]);

  useEffect(() => {
    if (imageUrls.length > 0) {
      preloadImages(imageUrls);
    }
  }, [imageUrls, preloadImages]);

  const isImageLoaded = useCallback((url) => {
    return loadedImages.has(url);
  }, [loadedImages]);

  const isImageFailed = useCallback((url) => {
    return failedImages.has(url);
  }, [failedImages]);

  return {
    loadedImages,
    failedImages,
    preloadImage,
    preloadImages,
    isImageLoaded,
    isImageFailed
  };
};

// Hook for handling image loading states
export const useImageLoad = (src, options = {}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const { onLoad, onError } = options;

  useEffect(() => {
    if (!src) return;

    setIsLoading(true);
    setIsError(false);

    const img = new Image();
    
    img.onload = () => {
      setDimensions({ width: img.naturalWidth, height: img.naturalHeight });
      setIsLoading(false);
      if (onLoad) onLoad(img);
    };
    
    img.onerror = () => {
      setIsError(true);
      setIsLoading(false);
      if (onError) onError();
    };
    
    img.src = src;
  }, [src, onLoad, onError]);

  return { isLoading, isError, dimensions };
}; 