import React, { useState, useEffect, useCallback } from 'react';
import { initSEOMonitor } from '../../utils/seo';

const SEODashboard = ({ getSEOMetrics }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [seoData, setSeoData] = useState({
    metaTagsCount: 0,
    structuredDataCount: 0,
    altTextCoverage: 0,
    pageLoadTime: 0,
    seoScore: 0,
    recommendations: []
  });
  const [userMetrics, setUserMetrics] = useState({
    avgTimeOnPage: 0,
    engagementRate: 0,
    scrollDepth: 0,
    pageViews: 0,
    interactions: 0
  });
  const [activeTab, setActiveTab] = useState('overview');
  
  // Initialize SEO monitor
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      initSEOMonitor();
    }
  }, []);
  
  // Update metrics periodically
  const updateMetrics = useCallback(() => {
    try {
      // Get SEO monitor data
      if (window.seoMonitor) {
        const report = window.seoMonitor.getReport();
        setSeoData(report);
      }
      
      // Get user engagement metrics
      if (getSEOMetrics) {
        const metrics = getSEOMetrics();
        setUserMetrics(metrics);
      }
    } catch (error) {
      console.error('Error updating SEO metrics:', error);
    }
  }, [getSEOMetrics]);
  
  useEffect(() => {
    // Update metrics every 5 seconds
    const interval = setInterval(updateMetrics, 5000);
    
    // Initial update
    updateMetrics();
    
    return () => clearInterval(interval);
  }, [updateMetrics]);
  
  // Calculate overall SEO health
  const calculateSEOHealth = () => {
    const technicalScore = seoData.seoScore || 0;
    const engagementScore = userMetrics.seoScore || 0;
    const overallScore = (technicalScore + engagementScore) / 2;
    
    if (overallScore >= 80) return { status: 'Excellent', color: 'text-green-600', bgColor: 'bg-green-100' };
    if (overallScore >= 60) return { status: 'Good', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
    if (overallScore >= 40) return { status: 'Fair', color: 'text-orange-600', bgColor: 'bg-orange-100' };
    return { status: 'Poor', color: 'text-red-600', bgColor: 'bg-red-100' };
  };
  
  const seoHealth = calculateSEOHealth();
  
  // Format time display
  const formatTime = (ms) => {
    if (ms < 1000) return `${Math.round(ms)}ms`;
    if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
    return `${(ms / 60000).toFixed(1)}m`;
  };
  
  // Format percentage
  const formatPercentage = (value) => `${Math.round(value)}%`;
  
  if (!isVisible) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsVisible(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
          title="Open SEO Dashboard"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          SEO
        </button>
      </div>
    );
  }
  
  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white dark:bg-gray-800 shadow-2xl rounded-lg border border-gray-200 dark:border-gray-700 w-96 max-h-[80vh] overflow-hidden">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <h3 className="font-semibold">SEO Dashboard</h3>
        </div>
        <div className="flex items-center gap-2">
          <div className={`px-2 py-1 rounded text-xs ${seoHealth.bgColor} ${seoHealth.color}`}>
            {seoHealth.status}
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex">
          {['overview', 'technical', 'engagement', 'recommendations'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium capitalize ${
                activeTab === tab
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 dark:text-gray-400 hover:text-blue-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>
      
      {/* Content */}
      <div className="p-4 max-h-96 overflow-y-auto">
        {activeTab === 'overview' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded">
                <div className="text-2xl font-bold text-blue-600">{seoData.seoScore || 0}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">SEO Score</div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded">
                <div className="text-2xl font-bold text-green-600">{userMetrics.seoScore || 0}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Engagement Score</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-300">Page Views</span>
                <span className="text-sm font-medium">{userMetrics.pageViews || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-300">Avg. Time on Page</span>
                <span className="text-sm font-medium">{formatTime(userMetrics.avgTimeOnPage || 0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-300">Scroll Depth</span>
                <span className="text-sm font-medium">{formatPercentage(userMetrics.scrollDepth || 0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-300">Page Load Time</span>
                <span className="text-sm font-medium">{formatTime(seoData.pageLoadTime || 0)}</span>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'technical' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded">
                <div className="text-2xl font-bold text-blue-600">{seoData.metaTagsCount || 0}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Meta Tags</div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded">
                <div className="text-2xl font-bold text-green-600">{seoData.structuredDataCount || 0}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Structured Data</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-300">Alt Text Coverage</span>
                <span className="text-sm font-medium">{formatPercentage(seoData.altTextCoverage || 0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-300">H1 Tags</span>
                <span className="text-sm font-medium">{seoData.headingStructure?.h1 || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-300">H2 Tags</span>
                <span className="text-sm font-medium">{seoData.headingStructure?.h2 || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-300">Total Images</span>
                <span className="text-sm font-medium">{seoData.totalImages || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-300">Images with Alt</span>
                <span className="text-sm font-medium">{seoData.imageAltCount || 0}</span>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'engagement' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded">
                <div className="text-2xl font-bold text-purple-600">{formatPercentage(userMetrics.engagementRate || 0)}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Engagement Rate</div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded">
                <div className="text-2xl font-bold text-indigo-600">{userMetrics.interactions || 0}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Interactions</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-300">Avg. Session Duration</span>
                <span className="text-sm font-medium">{formatTime(userMetrics.avgTimeOnPage || 0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-300">Max Scroll Depth</span>
                <span className="text-sm font-medium">{formatPercentage(userMetrics.scrollDepth || 0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-300">Total Page Views</span>
                <span className="text-sm font-medium">{userMetrics.pageViews || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-300">Interactions per View</span>
                <span className="text-sm font-medium">{
                  userMetrics.pageViews > 0 
                    ? (userMetrics.interactions / userMetrics.pageViews).toFixed(1)
                    : '0'
                }</span>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'recommendations' && (
          <div className="space-y-3">
            {seoData.recommendations && seoData.recommendations.length > 0 ? (
              seoData.recommendations.map((recommendation, index) => (
                <div key={index} className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded p-3">
                  <div className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-yellow-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    <p className="text-sm text-gray-800 dark:text-gray-200">{recommendation}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <svg className="w-12 h-12 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-gray-600 dark:text-gray-300">No recommendations at this time!</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Your SEO is looking good.</p>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Footer */}
      <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-2 bg-gray-50 dark:bg-gray-700">
        <div className="flex justify-between items-center">
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Last updated: {new Date().toLocaleTimeString()}
          </div>
          <button
            onClick={updateMetrics}
            className="text-xs text-blue-600 hover:text-blue-800 font-medium"
          >
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
};

export default SEODashboard; 