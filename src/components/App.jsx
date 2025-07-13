import React, { useState, useEffect, useMemo } from 'react';
import { ThemeProvider } from '../context/ThemeContext';
import { ContactProvider } from '../context/ContactContext';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ScrollProgressBar from './animations/ScrollProgressBar';
import BackToTop from './animations/BackToTop';
import ImageOptimizationDebugger from './dev/ImageOptimizationDebugger';
import SEODashboard from './dev/SEODashboard';
import { useSEOOnScroll, useSEOMonitoring } from '../hooks/useSEO';

// Define sections for SEO management outside component to prevent recreation
const SEO_SECTIONS = [
  { 
    id: 'home', 
    seoSection: 'home',
    customSEO: {
      title: 'Chris Kenrick | Frontend Developer Portfolio',
      description: 'Welcome to my portfolio! I\'m a Frontend Software Engineer and Scrum Master with expertise in React, VueJS, and modern web technologies.'
    }
  },
  { 
    id: 'about', 
    seoSection: 'about',
    customSEO: {
      title: 'About Chris Kenrick | Frontend Developer & Scrum Master',
      description: 'Learn about my background as a Frontend Software Engineer and certified Scrum Master with experience in React, VueJS, and Agile development.'
    }
  },
  { 
    id: 'projects', 
    seoSection: 'projects',
    customSEO: {
      title: 'Projects | Chris Kenrick Portfolio',
      description: 'Explore my frontend development projects featuring React, VueJS, and modern web technologies with GitHub API integration.'
    }
  },
  { 
    id: 'resume', 
    seoSection: 'resume',
    customSEO: {
      title: 'Resume | Chris Kenrick - Frontend Developer',
      description: 'View my professional resume highlighting experience as a Frontend Software Engineer and Scrum Master with expertise in React and VueJS.'
    }
  },
  { 
    id: 'contact', 
    seoSection: 'contact',
    customSEO: {
      title: 'Contact Chris Kenrick | Frontend Developer',
      description: 'Get in touch with me for frontend development opportunities, collaborations, or technical discussions about React and VueJS.'
    }
  }
];

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  // Memoize SEO monitoring to prevent recreation
  const seoMonitoring = useSEOMonitoring();
  
  // Memoize getSEOMetrics to prevent recreation
  const getSEOMetrics = useMemo(() => seoMonitoring.getSEOMetrics, [seoMonitoring.getSEOMetrics]);
  
  // Initialize SEO on scroll with stable reference
  useSEOOnScroll(SEO_SECTIONS, {
    threshold: 0.3,
    rootMargin: '0px 0px -30% 0px'
  });
  
  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading portfolio...</p>
        </div>
      </div>
    );
  }
  
  return (
    <ThemeProvider>
      <ContactProvider>
        <div className="min-h-screen relative overflow-hidden">
          {/* Background gradients */}
          <div className="gradient-bg-left"></div>
          <div className="gradient-bg-right"></div>
          <div className="underlay"></div>
          
          {/* Progress bar */}
          <ScrollProgressBar />
          
          {/* Main content */}
          <div className="relative z-10">
            <Header />
            <Main />
            <Footer />
          </div>
          
          {/* Back to top button */}
          <BackToTop />
          
          {/* Development tools */}
          {process.env.NODE_ENV === 'development' && (
            <>
              <ImageOptimizationDebugger />
              <SEODashboard getSEOMetrics={getSEOMetrics} />
            </>
          )}
        </div>
      </ContactProvider>
    </ThemeProvider>
  );
};

export default App;
