import React, { useState, useEffect } from 'react';
import { imagePerformanceTracker, getOptimizationRecommendations } from '../../utils/imagePerformance.js';

const ImageOptimizationDebugger = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [metrics, setMetrics] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const updateMetrics = () => {
      const currentMetrics = imagePerformanceTracker.getMetrics();
      setMetrics(currentMetrics);
      setRecommendations(getOptimizationRecommendations(currentMetrics));
      setStats(imagePerformanceTracker.getCompressionStats());
    };

    // Update metrics every 2 seconds
    const interval = setInterval(updateMetrics, 2000);
    updateMetrics(); // Initial load

    return () => clearInterval(interval);
  }, []);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const logReport = () => {
    imagePerformanceTracker.logPerformanceReport();
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      default: return 'text-blue-500';
    }
  };

  const formatSize = (bytes) => {
    return `${(bytes / 1024).toFixed(2)} KB`;
  };

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-16 right-4 z-50">
      {/* Toggle Button */}
      <button
        onClick={toggleVisibility}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg transition-colors duration-200 mb-2"
      >
        🖼️ Image Debug {metrics.length > 0 && `(${metrics.length})`}
      </button>

      {/* Debug Panel */}
      {isVisible && (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl p-4 w-96 max-h-96 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Image Performance
            </h3>
            <button
              onClick={logReport}
              className="text-sm bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded"
            >
              Log Report
            </button>
          </div>

          {/* Stats Overview */}
          {stats && (
            <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                Overview
              </h4>
              <div className="text-xs text-gray-600 dark:text-gray-300 space-y-1">
                <div>Images: {stats.imageCount}</div>
                <div>Transfer Size: {formatSize(stats.totalTransferSize)}</div>
                <div>Decoded Size: {formatSize(stats.totalDecodedSize)}</div>
                <div>Avg Compression: {(stats.averageCompression * 100).toFixed(1)}%</div>
                <div className="text-green-600 dark:text-green-400">
                  Savings: {formatSize(imagePerformanceTracker.getTotalSavings())}
                </div>
              </div>
            </div>
          )}

          {/* Recommendations */}
          {recommendations.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                Recommendations
              </h4>
              <div className="space-y-2">
                {recommendations.slice(0, 5).map((rec, index) => (
                  <div
                    key={index}
                    className="text-xs p-2 bg-gray-50 dark:bg-gray-700 rounded"
                  >
                    <div className={`font-medium ${getSeverityColor(rec.severity)}`}>
                      {rec.type.toUpperCase()}
                    </div>
                    <div className="text-gray-600 dark:text-gray-300">
                      {rec.image.split('/').pop()}
                    </div>
                    <div className="text-gray-500 dark:text-gray-400">
                      {rec.message}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Image List */}
          {metrics.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                Loaded Images
              </h4>
              <div className="space-y-2">
                {metrics.slice(0, 10).map((metric, index) => (
                  <div
                    key={index}
                    className="text-xs p-2 bg-gray-50 dark:bg-gray-700 rounded"
                  >
                    <div className="font-medium text-gray-900 dark:text-white">
                      {metric.name.split('/').pop()}
                    </div>
                    <div className="text-gray-600 dark:text-gray-300">
                      {formatSize(metric.transferSize)} • {metric.duration.toFixed(2)}ms
                    </div>
                    <div className="text-gray-500 dark:text-gray-400">
                      Compression: {(metric.compressionRatio * 100).toFixed(1)}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {metrics.length === 0 && (
            <div className="text-center text-gray-500 dark:text-gray-400 py-8">
              No images loaded yet
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageOptimizationDebugger; 