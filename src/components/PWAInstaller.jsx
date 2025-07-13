import React, { useState, useEffect } from 'react';
import { FaDownload, FaTimes, FaMobile, FaDesktop } from 'react-icons/fa';

const PWAInstaller = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if app is already installed or running in standalone mode
    const checkInstallStatus = () => {
      const isStandaloneMode = window.matchMedia('(display-mode: standalone)').matches || 
                              window.navigator.standalone === true;
      setIsStandalone(isStandaloneMode);
      
      // Hide install prompt if already installed
      if (isStandaloneMode) {
        setIsInstalled(true);
        setShowInstallPrompt(false);
      }
    };

    checkInstallStatus();

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e) => {
      console.log('PWA: beforeinstallprompt event fired');
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Save the event so it can be triggered later
      setDeferredPrompt(e);
      // Show custom install prompt
      if (!isStandalone) {
        setShowInstallPrompt(true);
      }
    };

    // Listen for successful app installation
    const handleAppInstalled = () => {
      console.log('PWA: App was installed successfully');
      setIsInstalled(true);
      setShowInstallPrompt(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // Register service worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.log('PWA: Service Worker registered successfully:', registration.scope);
            
            // Check for updates
            registration.addEventListener('updatefound', () => {
              const newWorker = registration.installing;
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // New content is available, show update prompt
                  showUpdatePrompt();
                }
              });
            });
          })
          .catch((error) => {
            console.error('PWA: Service Worker registration failed:', error);
          });
      });
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [isStandalone]);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    try {
      // Show the install prompt
      const result = await deferredPrompt.prompt();
      console.log('PWA: Install prompt result:', result.outcome);
      
      if (result.outcome === 'accepted') {
        console.log('PWA: User accepted the install prompt');
      } else {
        console.log('PWA: User dismissed the install prompt');
      }
    } catch (error) {
      console.error('PWA: Install prompt error:', error);
    }

    // Clear the deferredPrompt
    setDeferredPrompt(null);
    setShowInstallPrompt(false);
  };

  const showUpdatePrompt = () => {
    if (window.confirm('A new version of the app is available. Would you like to update?')) {
      window.location.reload();
    }
  };

  const dismissPrompt = () => {
    setShowInstallPrompt(false);
    // Hide prompt for this session
    sessionStorage.setItem('pwa-install-dismissed', 'true');
  };

  // Don't show if already installed, dismissed, or no prompt available
  if (isInstalled || 
      isStandalone || 
      !showInstallPrompt || 
      !deferredPrompt ||
      sessionStorage.getItem('pwa-install-dismissed')) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-4 animate-slide-up">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center">
            <div className="bg-primary-light dark:bg-primary-dark rounded-full p-2 mr-3">
              <FaDownload className="text-white text-lg" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                Install Portfolio App
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-xs">
                Access offline & get quick shortcuts
              </p>
            </div>
          </div>
          <button
            onClick={dismissPrompt}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <FaTimes className="text-sm" />
          </button>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
            <FaMobile className="mr-1" />
            <span className="mr-3">Mobile ready</span>
            <FaDesktop className="mr-1" />
            <span>Works offline</span>
          </div>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={handleInstallClick}
            className="flex-1 bg-primary-light dark:bg-primary-dark text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-primary-dark dark:hover:bg-primary-light transition-colors duration-200"
          >
            Install App
          </button>
          <button
            onClick={dismissPrompt}
            className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
          >
            Not now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PWAInstaller; 