import React, { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';
import { isRunningAsStandalone } from '../../utils/pwaUtils';

interface PWAInstallPromptProps {
  className?: string;
}

const PWAInstallPrompt: React.FC<PWAInstallPromptProps> = ({ className = '' }) => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (isRunningAsStandalone()) {
      setIsInstalled(true);
      return;
    }

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e);
      // Show the install button
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Listen for app installed event
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setShowPrompt(false);
      // Log app installation to analytics
      
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', () => {});
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      return;
    }

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    
    // We've used the prompt, and can't use it again, throw it away
    setDeferredPrompt(null);

    if (outcome === 'accepted') {
      
    } else {
      
    }
  };

  const dismissPrompt = () => {
    setShowPrompt(false);
    // Store in localStorage to avoid showing again for some time
    localStorage.setItem('pwa-prompt-dismissed', Date.now().toString());
  };

  if (!showPrompt || isInstalled) {
    return null;
  }

  return (
    <div className={`fixed bottom-20 left-1/2 transform -translate-x-1/2 z-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 w-[90%] max-w-md ${className}`}>
      <div className="flex items-start">
        <div className="bg-primary/10 dark:bg-primary/20 rounded-full p-3 mr-4">
          <Download className="h-6 w-6 text-primary dark:text-secondary" />
        </div>
        <div className="flex-1">
          <h3 className="font-heading font-semibold text-primary dark:text-white text-lg mb-1">
            Установите приложение
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
            Установите наше приложение для быстрого доступа и работы офлайн
          </p>
          <div className="flex space-x-3">
            <button
              onClick={handleInstallClick}
              className="flex-1 bg-primary hover:bg-primary/90 text-white font-semibold py-2 px-4 rounded-md transition-colors text-sm"
            >
              Установить
            </button>
            <button
              onClick={dismissPrompt}
              className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 font-semibold py-2 px-4 rounded-md transition-colors text-sm"
            >
              Не сейчас
            </button>
          </div>
        </div>
        <button
          onClick={dismissPrompt}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 ml-2"
          aria-label="Закрыть"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default PWAInstallPrompt;