import React from 'react';
import { useTheme } from '../context/ThemeContext.jsx';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`
        relative p-2 rounded-full transition-all duration-300 transform hover:scale-110
        ${isDarkMode 
          ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400' 
          : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
        }
      `}
      aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
    >
      <div className="relative w-6 h-6">
        {/* Sun Icon */}
        <svg
          className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
            isDarkMode ? 'rotate-180 opacity-0' : 'rotate-0 opacity-100'
          }`}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
          <path d="M12 1l3 3-3 3V1zM21 10l-3 3 3 3v-6zM12 21l-3-3 3-3v6zM3 14l3-3-3-3v6zM18.5 5.5l-1.414 1.414L18.5 8.328l1.414-1.414L18.5 5.5zM17.086 17.086l1.414 1.414 1.414-1.414-1.414-1.414-1.414 1.414zM5.5 18.5l1.414-1.414L5.5 15.672l-1.414 1.414L5.5 18.5zM6.914 6.914L5.5 5.5 4.086 6.914 5.5 8.328l1.414-1.414z" />
        </svg>
        
        {/* Moon Icon */}
        <svg
          className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
            isDarkMode ? 'rotate-0 opacity-100' : '-rotate-180 opacity-0'
          }`}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      </div>
    </button>
  );
};

export default ThemeToggle; 