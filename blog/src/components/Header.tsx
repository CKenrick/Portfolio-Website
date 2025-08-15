'use client';

import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-lg border-b border-gray-100 transition-all duration-300 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center h-16">
        <div className="flex items-center">
            <Link 
              href="/" 
              className="flex items-center transform hover:scale-105 transition-transform duration-200"
            >
              <Image 
                src="/images/Logo.svg" 
                alt="Chris Kenrick Logo" 
                width={32}
                height={32}
                className="h-8 w-auto"
              />
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link 
                href="/"
                className="text-primary-light hover:text-primary-dark transition-colors duration-200 px-3 py-2 font-medium"
              >
                All Posts 
              </Link>
              <span className="text-gray-400  font-bold"> / </span>
              <Link 
                href="/tags"
                className="text-gray-700  hover:text-primary-light  transition-colors duration-200 px-3 py-2 font-medium"
              >
                Tags
              </Link>
              <a
                href="../"
                className="text-gray-700  hover:text-primary-light  transition-colors duration-200 px-3 py-2 font-medium"
              >
                ← Back to Portfolio
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700  hover:text-primary-light  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light transition-colors duration-200"
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

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
          <div className="px-2 pt-4 pb-4 space-y-2 bg-white border-t border-gray-100">
            <Link 
              href="/"
              onClick={() => setIsOpen(false)}
              className="text-primary-light dark:text-primary-dark block px-3 py-2 text-base font-medium"
            >
              All Posts
            </Link>
            <Link 
              href="/tags"
              onClick={() => setIsOpen(false)}
              className="text-gray-700  hover:text-primary-light  block px-3 py-2 text-base font-medium transition-colors duration-200"
            >
              Tags
            </Link>
            <a
              href="../"
              onClick={() => setIsOpen(false)}
              className="text-gray-700  hover:text-primary-light  block px-3 py-2 text-base font-medium transition-colors duration-200"
            >
              ← Back to Portfolio
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}