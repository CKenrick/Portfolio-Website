import React from 'react';
import LazyImage from './LazyImage.jsx';

const Footer = () => {
  return (
    <footer className="bg-gray-800 dark:bg-gray-900 text-gray-300 dark:text-gray-400 py-8 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-row mb-4 md:mb-0">
            <p className="text-sm">
              &copy; 2025 Christopher Kenrick. All rights reserved.
            </p>
            <LazyImage 
                src="/newLogo.svg" 
                alt="logo" 
                className="inline-block ml-2 pb-2 h-6 w-auto align-middle transition-transform duration-200 hover:scale-110" 
                priority={false}
            />
          </div>
          
          <div className="flex space-x-6">
            <a 
              href="https://github.com/CKenrick" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              GitHub
            </a>
            <a 
              href="https://www.linkedin.com/in/christopherkenrick/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              LinkedIn
            </a>
            <a 
              href="mailto:christopher.kenrick@gmail.com" 
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;