import { useEffect, useRef, useCallback, useMemo } from 'react';
import { updatePageSEO, initSEOMonitor } from '../utils/seo.js';

/**
 * Custom hook for managing SEO in React components
 * @param {string} section - Current section/page identifier
 * @param {Object} customSEO - Custom SEO data to merge
 * @param {Object} options - Additional options
 */
export const useSEO = (section = 'home', customSEO = {}, options = {}) => {
  const { 
    updateOnMount = true,
    updateOnChange = true,
    enableMonitoring = false 
  } = options;
  
  const prevSection = useRef(section);
  const isInitialized = useRef(false);
  
  // Memoize customSEO to prevent recreation on every render
  const memoizedCustomSEO = useMemo(() => customSEO, [JSON.stringify(customSEO)]);
  
  // Create a stable updateSEO function
  const updateSEO = useCallback((newSection, newCustomSEO) => {
    try {
      updatePageSEO(newSection || section, newCustomSEO || memoizedCustomSEO);
      if (process.env.NODE_ENV === 'development') {
        //console.log(`SEO updated for section: ${newSection || section}`);
      }
    } catch (error) {
      console.error('Error updating SEO:', error);
    }
  }, []); // Empty dependency array to make it stable
  
  // Initialize SEO on mount
  useEffect(() => {
    if (updateOnMount && !isInitialized.current) {
      updateSEO(section, memoizedCustomSEO);
      isInitialized.current = true;
      
      // Initialize SEO monitoring in development
      if (enableMonitoring && process.env.NODE_ENV === 'development') {
        initSEOMonitor();
      }
    }
  }, [updateOnMount, section, memoizedCustomSEO, enableMonitoring, updateSEO]);
  
  // Update SEO when section changes
  useEffect(() => {
    if (updateOnChange && isInitialized.current && prevSection.current !== section) {
      updateSEO(section, memoizedCustomSEO);
      prevSection.current = section;
    }
  }, [section, updateOnChange, memoizedCustomSEO, updateSEO]);
  
  return {
    updateSEO,
    currentSection: section
  };
};

/**
 * Hook for managing SEO on scroll/intersection
 * Updates SEO based on visible sections
 */
export const useSEOOnScroll = (sections = [], options = {}) => {
  const { 
    threshold = 0.5,
    rootMargin = '0px 0px -20% 0px' 
  } = options;
  
  // Create a stable updateSEO function specifically for scroll updates
  const updateSEO = useCallback((sectionId, customSEO = {}) => {
    try {
      updatePageSEO(sectionId, customSEO);
      if (process.env.NODE_ENV === 'development') {
        //console.log(`SEO updated for section: ${sectionId}`);
      }
    } catch (error) {
      console.error('Error updating SEO:', error);
    }
  }, []);
  
  // Memoize sections to prevent recreation
  const memoizedSections = useMemo(() => sections, [JSON.stringify(sections)]);
  
  useEffect(() => {
    if (memoizedSections.length === 0) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            const sectionConfig = memoizedSections.find(s => s.id === sectionId);
            
            if (sectionConfig) {
              updateSEO(sectionConfig.seoSection || sectionId, sectionConfig.customSEO || {});
            }
          }
        });
      },
      { threshold, rootMargin }
    );
    
    // Use a timeout to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      memoizedSections.forEach(section => {
        const element = document.getElementById(section.id);
        if (element) {
          observer.observe(element);
        }
      });
    }, 100);
    
    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [memoizedSections, threshold, rootMargin, updateSEO]);
};

/**
 * Hook for managing project-specific SEO
 * @param {Object} project - Project data
 */
export const useProjectSEO = (project) => {
  const customSEO = {
    title: `${project?.name || 'Project'} | Chris Kenrick Portfolio`,
    description: project?.description || 'Frontend development project showcasing modern web technologies.',
    keywords: `${project?.name || 'Project'}, ${project?.topics?.join(', ') || 'Frontend, React, JavaScript'}, Portfolio Project`,
    url: `https://chriskenrick.dev/#projects`,
    image: `https://chriskenrick.dev/project-${project?.name?.toLowerCase()}.jpg`,
    structuredData: {
      '@type': 'CreativeWork',
      name: project?.name,
      description: project?.description,
      url: project?.html_url,
      dateCreated: project?.created_at,
      dateModified: project?.updated_at,
      programmingLanguage: project?.language,
      author: {
        '@type': 'Person',
        name: 'Chris Kenrick'
      }
    }
  };
  
  return useSEO('projects', customSEO);
};

/**
 * Hook for managing blog post SEO (for future blog section)
 * @param {Object} post - Blog post data
 */
export const useBlogSEO = (post) => {
  const customSEO = {
    title: `${post?.title || 'Blog Post'} | Chris Kenrick`,
    description: post?.excerpt || post?.description || 'Blog post about frontend development and web technologies.',
    keywords: `${post?.tags?.join(', ') || 'Frontend, React, JavaScript'}, Blog, Tutorial`,
    url: `https://chriskenrick.dev/blog/${post?.slug || ''}`,
    image: post?.featuredImage || 'https://chriskenrick.dev/blog-default.jpg',
    structuredData: {
      '@type': 'BlogPosting',
      headline: post?.title,
      description: post?.excerpt || post?.description,
      datePublished: post?.publishedAt,
      dateModified: post?.updatedAt,
      author: {
        '@type': 'Person',
        name: 'Chris Kenrick'
      },
      publisher: {
        '@type': 'Organization',
        name: 'Chris Kenrick Portfolio'
      }
    }
  };
  
  return useSEO('blog', customSEO);
};

/**
 * Hook for managing error page SEO
 * @param {number} errorCode - HTTP error code
 * @param {string} errorMessage - Error message
 */
export const useErrorSEO = (errorCode = 404, errorMessage = 'Page not found') => {
  const customSEO = {
    title: `Error ${errorCode} | Chris Kenrick Portfolio`,
    description: `${errorMessage}. Visit Chris Kenrick's portfolio to explore frontend development projects and skills.`,
    keywords: `Error ${errorCode}, Page not found, Chris Kenrick, Frontend Developer`,
    url: `https://chriskenrick.dev/error/${errorCode}`,
    robots: 'noindex, nofollow'
  };
  
  return useSEO('error', customSEO);
};

/**
 * Hook for managing dynamic SEO based on user interactions
 */
export const useDynamicSEO = () => {
  // Create a stable updateSEO function specifically for dynamic updates
  const updateSEO = useCallback((sectionId, customSEO = {}) => {
    try {
      updatePageSEO(sectionId, customSEO);
      if (process.env.NODE_ENV === 'development') {
        //console.log(`SEO updated for section: ${sectionId}`);
      }
    } catch (error) {
      console.error('Error updating SEO:', error);
    }
  }, []);
  
  const updateForSearch = useCallback((query) => {
    if (query && query.trim()) {
      updateSEO('search', {
        title: `Search: "${query}" | Chris Kenrick Portfolio`,
        description: `Search results for "${query}" in Chris Kenrick's portfolio. Find projects, skills, and experience.`,
        keywords: `Search, ${query}, Chris Kenrick, Frontend Developer`,
        url: `https://chriskenrick.dev/search?q=${encodeURIComponent(query)}`,
        robots: 'noindex, follow'
      });
    }
  }, [updateSEO]);
  
  const updateForFilter = useCallback((filter, value) => {
    updateSEO('projects', {
      title: `${filter}: ${value} | Chris Kenrick Portfolio`,
      description: `Projects filtered by ${filter}: ${value}. Explore Chris Kenrick's frontend development work.`,
      keywords: `${filter}, ${value}, Projects, Chris Kenrick, Frontend Developer`,
      url: `https://chriskenrick.dev/#projects?${filter}=${encodeURIComponent(value)}`
    });
  }, [updateSEO]);
  
  const updateForContact = useCallback((success = false) => {
    const title = success 
      ? 'Thank You | Chris Kenrick Portfolio'
      : 'Contact Chris Kenrick | Frontend Developer';
    
    const description = success
      ? 'Thank you for your message! I\'ll get back to you soon.'
      : 'Get in touch with Chris Kenrick for frontend development opportunities and collaborations.';
    
    updateSEO('contact', {
      title,
      description,
      keywords: success 
        ? 'Thank you, Contact success, Chris Kenrick'
        : 'Contact, Chris Kenrick, Frontend Developer, Hire, Collaborate',
      url: success 
        ? 'https://chriskenrick.dev/contact/success'
        : 'https://chriskenrick.dev/#contact'
    });
  }, [updateSEO]);
  
  return {
    updateForSearch,
    updateForFilter,
    updateForContact,
    updateSEO
  };
};

/**
 * Hook for SEO performance monitoring
 */
export const useSEOMonitoring = () => {
  const performanceData = useRef({
    pageViews: 0,
    sectionViews: {},
    userEngagement: {
      totalTime: 0,
      interactions: 0,
      scrollDepth: 0
    }
  });
  
  const isInitialized = useRef(false);
  
  useEffect(() => {
    // Only initialize once
    if (isInitialized.current) return;
    isInitialized.current = true;
    
    // Track page view
    performanceData.current.pageViews++;
    
    // Track time on page
    const startTime = Date.now();
    
    // Track scroll depth
    const trackScrollDepth = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollDepth = documentHeight > 0 ? (scrollTop / documentHeight) * 100 : 0;
      
      performanceData.current.userEngagement.scrollDepth = Math.max(
        performanceData.current.userEngagement.scrollDepth,
        Math.min(scrollDepth, 100)
      );
    };
    
    // Track interactions
    const trackInteraction = () => {
      performanceData.current.userEngagement.interactions++;
    };
    
    // Throttle scroll events to prevent excessive updates
    let scrollTimeout;
    const throttledScrollDepth = () => {
      if (scrollTimeout) return;
      scrollTimeout = setTimeout(() => {
        trackScrollDepth();
        scrollTimeout = null;
      }, 100);
    };
    
    // Event listeners
    window.addEventListener('scroll', throttledScrollDepth, { passive: true });
    window.addEventListener('click', trackInteraction, { passive: true });
    window.addEventListener('keydown', trackInteraction, { passive: true });
    
    // Cleanup
    return () => {
      performanceData.current.userEngagement.totalTime += Date.now() - startTime;
      window.removeEventListener('scroll', throttledScrollDepth);
      window.removeEventListener('click', trackInteraction);
      window.removeEventListener('keydown', trackInteraction);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, []);
  
  const getSEOMetrics = useCallback(() => {
    const data = performanceData.current;
    const avgTimeOnPage = data.pageViews > 0 ? data.userEngagement.totalTime / data.pageViews : 0;
    const engagementRate = data.userEngagement.interactions / data.pageViews;
    
    return {
      ...data,
      avgTimeOnPage,
      engagementRate,
      seoScore: calculateSEOScore(data)
    };
  }, []);
  
  const calculateSEOScore = (data) => {
    let score = 0;
    
    // Time on page score (0-25 points)
    const avgTime = data.userEngagement.totalTime / data.pageViews;
    if (avgTime > 120000) score += 25; // 2+ minutes
    else if (avgTime > 60000) score += 20; // 1+ minute
    else if (avgTime > 30000) score += 15; // 30+ seconds
    
    // Scroll depth score (0-25 points)
    if (data.userEngagement.scrollDepth > 80) score += 25;
    else if (data.userEngagement.scrollDepth > 60) score += 20;
    else if (data.userEngagement.scrollDepth > 40) score += 15;
    
    // Interaction score (0-25 points)
    const interactionRate = data.userEngagement.interactions / data.pageViews;
    if (interactionRate > 10) score += 25;
    else if (interactionRate > 5) score += 20;
    else if (interactionRate > 2) score += 15;
    
    // Page views score (0-25 points)
    if (data.pageViews > 10) score += 25;
    else if (data.pageViews > 5) score += 20;
    else if (data.pageViews > 1) score += 15;
    
    return Math.min(score, 100);
  };
  
  return {
    getSEOMetrics,
    trackSectionView: (section) => {
      performanceData.current.sectionViews[section] = 
        (performanceData.current.sectionViews[section] || 0) + 1;
    }
  };
};

// Export all hooks
export default useSEO; 