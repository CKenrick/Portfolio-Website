import React, { useState, useEffect } from 'react';

const DebugInfo = () => {
  const [debugInfo, setDebugInfo] = useState({
    tailwindLoaded: false,
    customColorsWorking: false,
    sectionsVisible: {
      about: false,
      projects: false,
      connect: false
    }
  });

  useEffect(() => {
    // Check if Tailwind is loaded
    const testElement = document.createElement('div');
    testElement.className = 'bg-primary-dark';
    document.body.appendChild(testElement);
    const styles = window.getComputedStyle(testElement);
    const tailwindLoaded = styles.backgroundColor === 'rgb(4, 176, 130)';
    document.body.removeChild(testElement);

    // Check if custom colors are working
    const customElement = document.createElement('div');
    customElement.className = 'text-primary-light';
    document.body.appendChild(customElement);
    const customStyles = window.getComputedStyle(customElement);
    const customColorsWorking = customStyles.color !== 'rgba(0, 0, 0, 0)' && customStyles.color !== '';
    document.body.removeChild(customElement);

    // Check if sections exist
    const aboutElement = document.getElementById('about');
    const projectsElement = document.getElementById('projects');
    const connectElement = document.getElementById('connect');

    setDebugInfo({
      tailwindLoaded,
      customColorsWorking,
      sectionsVisible: {
        about: !!aboutElement,
        projects: !!projectsElement,
        connect: !!connectElement
      }
    });
  }, []);

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed top-20 right-4 bg-black bg-opacity-80 text-white p-4 rounded-lg z-50 text-xs max-w-xs">
      <h3 className="font-bold mb-2">Debug Info</h3>
      <div>
        <div>Tailwind CSS: {debugInfo.tailwindLoaded ? '✅' : '❌'}</div>
        <div>Custom Colors: {debugInfo.customColorsWorking ? '✅' : '❌'}</div>
        <div>About Section: {debugInfo.sectionsVisible.about ? '✅' : '❌'}</div>
        <div>Projects Section: {debugInfo.sectionsVisible.projects ? '✅' : '❌'}</div>
        <div>Connect Section: {debugInfo.sectionsVisible.connect ? '✅' : '❌'}</div>
      </div>
      <button 
        onClick={() => console.log('Current sections:', {
          about: document.getElementById('about'),
          projects: document.getElementById('projects'),
          connect: document.getElementById('connect')
        })}
        className="mt-2 bg-blue-600 px-2 py-1 rounded text-xs"
      >
        Log Sections
      </button>
    </div>
  );
};

export default DebugInfo; 