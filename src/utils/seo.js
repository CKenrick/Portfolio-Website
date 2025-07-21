/**
 * SEO Utility Functions
 * Provides dynamic meta tag management and SEO optimization features
 */

// Default SEO configuration
export const defaultSEO = {
  title: 'Chris Kenrick | Frontend Developer Portfolio',
  description: 'Modern React portfolio showcasing frontend development skills with React 19, Tailwind CSS, and cutting-edge web technologies. Experienced Scrum Master and developer.',
  keywords: 'React developer, Frontend developer, React 19, Tailwind CSS, JavaScript, Portfolio, Web developer, VueJS, Vite, Pinia, Vuetify, Scrum Master, Agile',
  author: 'Chris Kenrick',
  url: 'https://chriskenrick.dev',
  image: 'https://chriskenrick.dev/og-image.jpg',
  twitterHandle: '@chriskenrick',
  locale: 'en_US',
  type: 'website'
};

// Page-specific SEO configurations
export const pageSEO = {
  home: {
    title: 'Chris Kenrick | Frontend Developer Portfolio',
    description: 'Welcome to my portfolio! I\'m a Frontend Software Engineer and Scrum Master with expertise in React, VueJS, and modern web technologies.',
    keywords: 'Chris Kenrick, Frontend Developer, React, VueJS, JavaScript, Portfolio, Home',
    structuredData: {
      '@type': 'WebPage',
      name: 'Home - Chris Kenrick Portfolio',
      description: 'Welcome to my portfolio! I\'m a Frontend Software Engineer and Scrum Master with expertise in React, VueJS, and modern web technologies.'
    }
  },
  about: {
    title: 'About Chris Kenrick | Frontend Developer & Scrum Master',
    description: 'Learn about my background as a Frontend Software Engineer and certified Scrum Master with experience in React, VueJS, and Agile development.',
    keywords: 'About Chris Kenrick, Frontend Developer, Scrum Master, React, VueJS, Experience, Background',
    structuredData: {
      '@type': 'AboutPage',
      name: 'About - Chris Kenrick',
      description: 'Learn about my background as a Frontend Software Engineer and certified Scrum Master with experience in React, VueJS, and Agile development.'
    }
  },
  projects: {
    title: 'Projects | Chris Kenrick Portfolio',
    description: 'Explore my frontend development projects featuring React, VueJS, and modern web technologies with GitHub API integration.',
    keywords: 'Projects, Frontend Projects, React Projects, VueJS Projects, GitHub, Portfolio Projects',
    structuredData: {
      '@type': 'CollectionPage',
      name: 'Projects - Chris Kenrick Portfolio',
      description: 'Explore my frontend development projects featuring React, VueJS, and modern web technologies with GitHub API integration.'
    }
  },
  resume: {
    title: 'Resume | Chris Kenrick - Frontend Developer',
    description: 'View my professional resume highlighting experience as a Frontend Software Engineer and Scrum Master with expertise in React and VueJS.',
    keywords: 'Resume, CV, Chris Kenrick, Frontend Developer, Experience, Skills, Education',
    structuredData: {
      '@type': 'ProfilePage',
      name: 'Resume - Chris Kenrick',
      description: 'View my professional resume highlighting experience as a Frontend Software Engineer and Scrum Master with expertise in React and VueJS.'
    }
  },
  contact: {
    title: 'Contact Chris Kenrick | Frontend Developer',
    description: 'Get in touch with me for frontend development opportunities, collaborations, or technical discussions about React and VueJS.',
    keywords: 'Contact, Chris Kenrick, Frontend Developer, Hire, Collaborate, React Developer, VueJS Developer',
    structuredData: {
      '@type': 'ContactPage',
      name: 'Contact - Chris Kenrick',
      description: 'Get in touch with me for frontend development opportunities, collaborations, or technical discussions about React and VueJS.'
    }
  }
};

/**
 * Update document meta tags dynamically
 * @param {Object} seoConfig - SEO configuration object
 */
export const updateMetaTags = (seoConfig = {}) => {
  const config = { ...defaultSEO, ...seoConfig };
  
  // Update title
  document.title = config.title;
  
  // Update meta tags
  updateMetaTag('description', config.description);
  updateMetaTag('keywords', config.keywords);
  updateMetaTag('author', config.author);
  
  // Update OpenGraph tags
  updateMetaTag('og:title', config.title, 'property');
  updateMetaTag('og:description', config.description, 'property');
  updateMetaTag('og:url', config.url, 'property');
  updateMetaTag('og:image', config.image, 'property');
  updateMetaTag('og:type', config.type, 'property');
  updateMetaTag('og:locale', config.locale, 'property');
  
  // Update Twitter Card tags
  updateMetaTag('twitter:title', config.title);
  updateMetaTag('twitter:description', config.description);
  updateMetaTag('twitter:image', config.image);
  updateMetaTag('twitter:url', config.url);
  
  // Update canonical URL
  updateCanonicalURL(config.url);
};

/**
 * Update a specific meta tag
 * @param {string} name - Meta tag name or property
 * @param {string} content - Meta tag content
 * @param {string} attribute - Attribute type ('name' or 'property')
 */
const updateMetaTag = (name, content, attribute = 'name') => {
  let meta = document.querySelector(`meta[${attribute}="${name}"]`);
  
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute(attribute, name);
    document.head.appendChild(meta);
  }
  
  meta.setAttribute('content', content);
};

/**
 * Update canonical URL
 * @param {string} url - Canonical URL
 */
const updateCanonicalURL = (url) => {
  let canonical = document.querySelector('link[rel="canonical"]');
  
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  
  canonical.setAttribute('href', url);
};

/**
 * Generate structured data for a page
 * @param {string} pageType - Type of page
 * @param {Object} additionalData - Additional structured data
 */
export const generateStructuredData = (pageType, additionalData = {}) => {
  const baseData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: defaultSEO.title,
    description: defaultSEO.description,
    url: defaultSEO.url,
    author: {
      '@type': 'Person',
      name: defaultSEO.author
    },
    mainEntity: {
      '@type': 'Person',
      name: defaultSEO.author
    }
  };
  
  const pageData = pageSEO[pageType]?.structuredData || {};
  
  return {
    ...baseData,
    ...pageData,
    ...additionalData
  };
};

/**
 * Add structured data to page
 * @param {Object} data - Structured data object
 * @param {string} id - Script element ID
 */
export const addStructuredData = (data, id = 'structured-data') => {
  // Remove existing structured data script if it exists
  const existingScript = document.getElementById(id);
  if (existingScript) {
    existingScript.remove();
  }
  
  // Create new script element
  const script = document.createElement('script');
  script.id = id;
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(data, null, 2);
  document.head.appendChild(script);
};

/**
 * Generate breadcrumb structured data
 * @param {Array} breadcrumbs - Array of breadcrumb items
 */
export const generateBreadcrumbData = (breadcrumbs = []) => {
  const defaultBreadcrumbs = [
    { name: 'Home', url: 'https://chriskenrick.dev' }
  ];
  
  const allBreadcrumbs = [...defaultBreadcrumbs, ...breadcrumbs];
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: allBreadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
};

/**
 * Update page SEO for specific section
 * @param {string} section - Section name (home, about, projects, resume, contact)
 * @param {Object} customData - Custom SEO data to merge
 */
export const updatePageSEO = (section = 'home', customData = {}) => {
  const sectionSEO = pageSEO[section] || pageSEO.home;
  const seoConfig = { ...sectionSEO, ...customData };
  
  // Update meta tags
  updateMetaTags(seoConfig);
  
  // Generate and add structured data
  const structuredData = generateStructuredData(section, seoConfig.structuredData);
  addStructuredData(structuredData, `structured-data-${section}`);
  
  // Generate breadcrumb data for non-home pages
  if (section !== 'home') {
    const breadcrumbs = [
      { name: sectionSEO.title, url: `${defaultSEO.url}/#${section}` }
    ];
    const breadcrumbData = generateBreadcrumbData(breadcrumbs);
    addStructuredData(breadcrumbData, `breadcrumb-${section}`);
  }
};

/**
 * SEO Performance Monitoring
 */
export class SEOMonitor {
  constructor() {
    this.metrics = {
      metaTagsCount: 0,
      structuredDataCount: 0,
      imageAltCount: 0,
      headingStructure: {},
      lastUpdated: new Date()
    };
    
    this.init();
  }
  
  init() {
    this.analyzeMetaTags();
    this.analyzeStructuredData();
    this.analyzeImages();
    this.analyzeHeadings();
    this.startPerformanceMonitoring();
  }
  
  analyzeMetaTags() {
    const metaTags = document.querySelectorAll('meta');
    this.metrics.metaTagsCount = metaTags.length;
    
    // Check for essential meta tags
    const essentialTags = [
      'description',
      'keywords',
      'author',
      'og:title',
      'og:description',
      'twitter:title',
      'twitter:description'
    ];
    
    this.metrics.missingMetaTags = essentialTags.filter(tag => {
      return !document.querySelector(`meta[name="${tag}"], meta[property="${tag}"]`);
    });
  }
  
  analyzeStructuredData() {
    const structuredDataScripts = document.querySelectorAll('script[type="application/ld+json"]');
    this.metrics.structuredDataCount = structuredDataScripts.length;
  }
  
  analyzeImages() {
    const images = document.querySelectorAll('img');
    let imagesWithAlt = 0;
    
    images.forEach(img => {
      if (img.alt && img.alt.trim() !== '') {
        imagesWithAlt++;
      }
    });
    
    this.metrics.imageAltCount = imagesWithAlt;
    this.metrics.totalImages = images.length;
    this.metrics.altTextCoverage = images.length > 0 ? (imagesWithAlt / images.length) * 100 : 0;
  }
  
  analyzeHeadings() {
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const structure = { h1: 0, h2: 0, h3: 0, h4: 0, h5: 0, h6: 0 };
    
    headings.forEach(heading => {
      structure[heading.tagName.toLowerCase()]++;
    });
    
    this.metrics.headingStructure = structure;
  }
  
  startPerformanceMonitoring() {
    // Monitor page performance metrics
    if ('performance' in window) {
      const navigation = performance.getEntriesByType('navigation')[0];
      if (navigation) {
        this.metrics.pageLoadTime = navigation.loadEventEnd - navigation.fetchStart;
        this.metrics.domContentLoaded = navigation.domContentLoadedEventEnd - navigation.fetchStart;
        this.metrics.firstPaint = performance.getEntriesByType('paint')
          .find(entry => entry.name === 'first-paint')?.startTime || 0;
      }
    }
  }
  
  getReport() {
    return {
      ...this.metrics,
      seoScore: this.calculateSEOScore(),
      recommendations: this.generateRecommendations()
    };
  }
  
  calculateSEOScore() {
    let score = 0;
    const maxScore = 100;
    
    // Meta tags score (30 points)
    if (this.metrics.metaTagsCount >= 20) score += 30;
    else if (this.metrics.metaTagsCount >= 10) score += 20;
    else score += 10;
    
    // Structured data score (20 points)
    if (this.metrics.structuredDataCount >= 3) score += 20;
    else if (this.metrics.structuredDataCount >= 1) score += 10;
    
    // Image alt text score (25 points)
    if (this.metrics.altTextCoverage >= 90) score += 25;
    else if (this.metrics.altTextCoverage >= 70) score += 20;
    else if (this.metrics.altTextCoverage >= 50) score += 15;
    
    // Heading structure score (15 points)
    if (this.metrics.headingStructure.h1 === 1) score += 10;
    if (this.metrics.headingStructure.h2 > 0) score += 5;
    
    // Performance score (10 points)
    if (this.metrics.pageLoadTime < 2000) score += 10;
    else if (this.metrics.pageLoadTime < 3000) score += 5;
    
    return Math.min(score, maxScore);
  }
  
  generateRecommendations() {
    const recommendations = [];
    
    if (this.metrics.missingMetaTags.length > 0) {
      recommendations.push(`Add missing meta tags: ${this.metrics.missingMetaTags.join(', ')}`);
    }
    
    if (this.metrics.altTextCoverage < 90) {
      recommendations.push(`Improve image alt text coverage (currently ${this.metrics.altTextCoverage.toFixed(1)}%)`);
    }
    
    if (this.metrics.headingStructure.h1 !== 1) {
      recommendations.push('Ensure exactly one H1 tag per page');
    }
    
    if (this.metrics.pageLoadTime > 3000) {
      recommendations.push('Optimize page load time (currently ' + (this.metrics.pageLoadTime / 1000).toFixed(2) + 's)');
    }
    
    if (this.metrics.structuredDataCount < 3) {
      recommendations.push('Add more structured data for better search visibility');
    }
    
    return recommendations;
  }
}

// Initialize SEO monitor in development mode
export const initSEOMonitor = () => {
  if (process.env.NODE_ENV === 'development') {
    window.seoMonitor = new SEOMonitor();
    //console.log('SEO Monitor initialized. Use window.seoMonitor.getReport() for analysis.');
  }
};

// Export utility functions for convenience
export const seoUtils = {
  updateMetaTags,
  updatePageSEO,
  generateStructuredData,
  addStructuredData,
  generateBreadcrumbData,
  initSEOMonitor
}; 