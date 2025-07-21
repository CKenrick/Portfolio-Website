// Image performance tracking utilities
class ImagePerformanceTracker {
  constructor() {
    this.metrics = new Map();
    this.isSupported = 'PerformanceObserver' in window;
    
    if (this.isSupported) {
      this.setupObserver();
    }
  }

  setupObserver() {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.initiatorType === 'img') {
            this.recordMetric(entry);
          }
        }
      });
      
      observer.observe({ entryTypes: ['resource'] });
    } catch (error) {
      console.warn('Performance observation not supported:', error);
    }
  }

  recordMetric(entry) {
    const metric = {
      name: entry.name,
      duration: entry.duration,
      transferSize: entry.transferSize,
      encodedBodySize: entry.encodedBodySize,
      decodedBodySize: entry.decodedBodySize,
      timestamp: entry.startTime,
      compressionRatio: entry.encodedBodySize / entry.decodedBodySize
    };
    
    this.metrics.set(entry.name, metric);
  }

  getMetrics() {
    return Array.from(this.metrics.values());
  }

  getMetricsBySize() {
    return this.getMetrics().sort((a, b) => b.transferSize - a.transferSize);
  }

  getLargestImages(limit = 5) {
    return this.getMetricsBySize().slice(0, limit);
  }

  getSlowestImages(limit = 5) {
    return this.getMetrics()
      .sort((a, b) => b.duration - a.duration)
      .slice(0, limit);
  }

  getCompressionStats() {
    const metrics = this.getMetrics();
    if (metrics.length === 0) return null;

    const compressionRatios = metrics.map(m => m.compressionRatio).filter(r => r > 0);
    const avgCompression = compressionRatios.reduce((a, b) => a + b, 0) / compressionRatios.length;
    
    return {
      averageCompression: avgCompression,
      totalTransferSize: metrics.reduce((sum, m) => sum + m.transferSize, 0),
      totalDecodedSize: metrics.reduce((sum, m) => sum + m.decodedBodySize, 0),
      imageCount: metrics.length
    };
  }

  getTotalSavings() {
    const stats = this.getCompressionStats();
    if (!stats) return 0;
    
    return stats.totalDecodedSize - stats.totalTransferSize;
  }

  logPerformanceReport() {
    if (!this.isSupported) {
      //console.log('Performance tracking not supported');
      return;
    }

    const metrics = this.getMetrics();
    const stats = this.getCompressionStats();
    
    console.group('🖼️ Image Performance Report');
    //console.log(`📊 Total Images: ${metrics.length}`);
    
    if (stats) {
      //console.log(`💾 Total Transfer Size: ${(stats.totalTransferSize / 1024).toFixed(2)} KB`);
      //console.log(`📦 Total Decoded Size: ${(stats.totalDecodedSize / 1024).toFixed(2)} KB`);
      //console.log(`🎯 Average Compression: ${(stats.averageCompression * 100).toFixed(1)}%`);
      //console.log(`💰 Total Savings: ${(this.getTotalSavings() / 1024).toFixed(2)} KB`);
    }
    
    const slowest = this.getSlowestImages(3);
    if (slowest.length > 0) {
      //console.log('\n⏱️ Slowest Loading Images:');
      slowest.forEach((metric, index) => {
        //console.log(`${index + 1}. ${metric.name.split('/').pop()} - ${metric.duration.toFixed(2)}ms`);
      });
    }
    
    const largest = this.getLargestImages(3);
    if (largest.length > 0) {
      //console.log('\n📏 Largest Images:');
      largest.forEach((metric, index) => {
        //console.log(`${index + 1}. ${metric.name.split('/').pop()} - ${(metric.transferSize / 1024).toFixed(2)} KB`);
      });
    }
    
    console.groupEnd();
  }
}

// Create a singleton instance
export const imagePerformanceTracker = new ImagePerformanceTracker();

// Utility functions
export const logImageLoadTime = (src, startTime) => {
  const loadTime = performance.now() - startTime;
  //console.log(`📸 Image loaded: ${src.split('/').pop()} in ${loadTime.toFixed(2)}ms`);
};

export const measureImageLoad = (src, callback) => {
  const startTime = performance.now();
  
  return (...args) => {
    logImageLoadTime(src, startTime);
    if (callback) callback(...args);
  };
};

export const getImageSizeCategory = (bytes) => {
  if (bytes < 10000) return 'small';
  if (bytes < 50000) return 'medium';
  if (bytes < 200000) return 'large';
  return 'extra-large';
};

export const calculateImageSavings = (originalSize, optimizedSize) => {
  const savings = originalSize - optimizedSize;
  const percentage = (savings / originalSize) * 100;
  
  return {
    bytes: savings,
    percentage: percentage.toFixed(1),
    formatted: `${(savings / 1024).toFixed(2)} KB (${percentage.toFixed(1)}%)`
  };
};

// WebP support detection
export const detectWebPSupport = () => {
  return new Promise((resolve) => {
    const webpImage = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = webpImage;
  });
};

// Image preloading utility
export const preloadImages = async (urls) => {
  const promises = urls.map(url => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve({ url, status: 'loaded' });
      img.onerror = () => reject({ url, status: 'error' });
      img.src = url;
    });
  });

  try {
    const results = await Promise.allSettled(promises);
    return results.map(result => 
      result.status === 'fulfilled' ? result.value : result.reason
    );
  } catch (error) {
    console.error('Error preloading images:', error);
    return [];
  }
};

// Image optimization recommendations
export const getOptimizationRecommendations = (imageMetrics) => {
  const recommendations = [];
  
  imageMetrics.forEach(metric => {
    // Check for large images
    if (metric.transferSize > 200000) {
      recommendations.push({
        type: 'size',
        image: metric.name,
        message: `Image is ${(metric.transferSize / 1024).toFixed(2)} KB. Consider optimizing.`,
        severity: 'high'
      });
    }
    
    // Check for poor compression
    if (metric.compressionRatio > 0.8) {
      recommendations.push({
        type: 'compression',
        image: metric.name,
        message: `Poor compression ratio (${(metric.compressionRatio * 100).toFixed(1)}%). Consider WebP format.`,
        severity: 'medium'
      });
    }
    
    // Check for slow loading
    if (metric.duration > 1000) {
      recommendations.push({
        type: 'performance',
        image: metric.name,
        message: `Slow loading time (${metric.duration.toFixed(2)}ms). Consider lazy loading.`,
        severity: 'medium'
      });
    }
  });
  
  return recommendations;
}; 