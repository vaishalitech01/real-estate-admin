import React, { useState, useEffect } from 'react';
import { Download, X, Smartphone } from 'lucide-react';

const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if running on iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(iOS);

    // Check if app is already installed (standalone mode)
    const standalone = window.matchMedia('(display-mode: standalone)').matches || 
                     window.navigator.standalone || 
                     document.referrer.includes('android-app://');
    setIsStandalone(standalone);

    // Listen for beforeinstallprompt event (Chrome/Edge)
    const handleBeforeInstallPrompt = (e) => {
      console.log('PWA: beforeinstallprompt event fired');
      
      // Prevent the default browser install prompt
      e.preventDefault();
      
      // Store the event for later use
      setDeferredPrompt(e);
      
      // Show custom install prompt only if:
      // - Not already installed
      // - User has visited before (check localStorage)
      // - On mobile or small screen
      const hasVisited = localStorage.getItem('pwa-visited');
      const isMobile = window.innerWidth <= 768;
      
      if (!standalone && hasVisited && isMobile) {
        setShowInstallPrompt(true);
      }
    };

    // Register event listener
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Mark that user has visited
    localStorage.setItem('pwa-visited', 'true');

    // Cleanup
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  // Handle install button click
  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    console.log('PWA: Showing install prompt');
    
    // Show the browser's install prompt
    deferredPrompt.prompt();
    
    // Wait for user choice
    const { outcome } = await deferredPrompt.userChoice;
    console.log('PWA: User choice:', outcome);
    
    // Reset the deferred prompt
    setDeferredPrompt(null);
    setShowInstallPrompt(false);
  };

  // Handle dismiss
  const handleDismiss = () => {
    setShowInstallPrompt(false);
    // Don't show again for this session
    sessionStorage.setItem('pwa-dismissed', 'true');
  };

  // Don't show if already installed or dismissed this session
  if (isStandalone || sessionStorage.getItem('pwa-dismissed')) {
    return null;
  }

  // iOS install instructions
  if (isIOS && !isStandalone) {
    return (
      <div className="fixed bottom-4 left-4 right-4 z-50 md:hidden">
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 shadow-lg">
          <div className="flex items-start gap-3">
            <Smartphone className="w-6 h-6 text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="text-white font-medium text-sm mb-1">
                Install RealEstate Admin
              </h4>
              <p className="text-slate-300 text-xs mb-2">
                Add to your home screen for quick access
              </p>
              <p className="text-slate-400 text-xs">
                Tap <span className="font-medium">Share</span> → <span className="font-medium">Add to Home Screen</span>
              </p>
            </div>
            <button
              onClick={handleDismiss}
              className="text-slate-400 hover:text-slate-300 flex-shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Chrome/Edge install prompt
  if (showInstallPrompt && deferredPrompt) {
    return (
      <div className="fixed bottom-4 left-4 right-4 z-50 md:hidden">
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
              <Download className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="text-white font-medium text-sm mb-1">
                Install RealEstate Admin
              </h4>
              <p className="text-slate-300 text-xs">
                Get quick access and work offline
              </p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button
                onClick={handleDismiss}
                className="px-3 py-1.5 text-slate-400 hover:text-slate-300 text-xs"
              >
                Later
              </button>
              <button
                onClick={handleInstallClick}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-medium"
              >
                Install
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default PWAInstallPrompt;