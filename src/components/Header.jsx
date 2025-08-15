import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle.jsx';
import LazyImage from './LazyImage.jsx';
import { useSmoothScroll } from '../hooks/useScrollAnimation.js';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { scrollToSection } = useSmoothScroll();

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleSectionClick = (sectionId, event) => {
    event.preventDefault();
    closeMenu();
    
    // If we're not on the home page, navigate first
    if (location.pathname !== '/') {
      window.location.href = `/#${sectionId}`;
    } else {
      scrollToSection(sectionId, 80); // 80px offset for fixed header
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-lg border-b border-gray-200 dark:border-gray-700 transition-colors duration-300 sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center transform hover:scale-105 transition-transform duration-200">
              <LazyImage 
                src="/Logo.svg" 
                alt="logo" 
                className="h-8 w-auto ml-2"
                priority={true}
              />
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link 
                to="/" 
                className="text-primary-light dark:text-primary-dark hover:text-primary-dark dark:hover:text-primary-light transition-all duration-200 px-3 py-2 font-medium hover:scale-105 transform"
              >
                Home
              </Link>
              <button
                onClick={(e) => handleSectionClick('about', e)}
                className="text-primary-light dark:text-primary-dark hover:text-primary-dark dark:hover:text-primary-light transition-all duration-200 px-3 py-2 font-medium hover:scale-105 transform"
              >
                About
              </button>
              <button
                onClick={(e) => handleSectionClick('projects', e)}
                className="text-primary-light dark:text-primary-dark hover:text-primary-dark dark:hover:text-primary-light transition-all duration-200 px-3 py-2 font-medium hover:scale-105 transform"
              >
                Projects
              </button>
              <Link 
                to="/Resume" 
                className="text-primary-light dark:text-primary-dark hover:text-primary-dark dark:hover:text-primary-light transition-all duration-200 px-3 py-2 font-medium hover:scale-105 transform"
              >
                Resume
              </Link>
              <a
                href="/blog"
                className="text-primary-light dark:text-primary-dark hover:text-primary-dark dark:hover:text-primary-light transition-all duration-200 px-3 py-2 font-medium hover:scale-105 transform"
              >
                Blog
              </a>
              <button
                onClick={(e) => handleSectionClick('connect', e)}
                className="text-primary-light dark:text-primary-dark hover:text-primary-dark dark:hover:text-primary-light transition-all duration-200 px-3 py-2 font-medium hover:scale-105 transform"
              >
                Connect
              </button>
            </div>
          </div>

          {/* Theme Toggle and Mobile Menu */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggle}
                className="text-primary-light dark:text-primary-dark hover:text-primary-dark dark:hover:text-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white transition-all duration-200"
              >
                <span className="sr-only">Open main menu</span>
                <svg 
                  className={`h-6 w-6 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  {isOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
            <Link 
              to="/" 
              onClick={closeMenu}
              className="text-primary-light dark:text-primary-dark hover:text-primary-dark dark:hover:text-primary-light block px-3 py-2 text-base font-medium transition-colors duration-200"
            >
              Home
            </Link>
            <button
              onClick={(e) => handleSectionClick('about', e)}
              className="text-primary-light dark:text-primary-dark hover:text-primary-dark dark:hover:text-primary-light block px-3 py-2 text-base font-medium transition-colors duration-200 w-full text-left"
            >
              About
            </button>
            <button
              onClick={(e) => handleSectionClick('projects', e)}
              className="text-primary-light dark:text-primary-dark hover:text-primary-dark dark:hover:text-primary-light block px-3 py-2 text-base font-medium transition-colors duration-200 w-full text-left"
            >
              Projects
            </button>
            <Link 
              to="/Resume" 
              onClick={closeMenu}
              className="text-primary-light dark:text-primary-dark hover:text-primary-dark dark:hover:text-primary-light block px-3 py-2 text-base font-medium transition-colors duration-200"
            >
              Resume
            </Link>
            <a
              href="/blog"
              onClick={closeMenu}
              className="text-primary-light dark:text-primary-dark hover:text-primary-dark dark:hover:text-primary-light block px-3 py-2 text-base font-medium transition-colors duration-200"
            >
              Blog
            </a>
            <button
              onClick={(e) => handleSectionClick('connect', e)}
              className="text-primary-light dark:text-primary-dark hover:text-primary-dark dark:hover:text-primary-light block px-3 py-2 text-base font-medium transition-colors duration-200 w-full text-left"
            >
              Connect
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;