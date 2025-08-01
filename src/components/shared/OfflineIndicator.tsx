import React, { useState, useEffect } from 'react';
import { WifiOff } from 'lucide-react';
import { isOnline, registerConnectivityListeners, unregisterConnectivityListeners } from '../../utils/pwaUtils';

const OfflineIndicator: React.FC = () => {
  const [offline, setOffline] = useState(!isOnline());

  useEffect(() => {
    const handleOnline = () => {
      setOffline(false);
    };

    const handleOffline = () => {
      setOffline(true);
    };

    // Register event listeners
    registerConnectivityListeners(handleOnline, handleOffline);

    // Cleanup
    return () => {
      unregisterConnectivityListeners(handleOnline, handleOffline);
    };
  }, []);

  if (!offline) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 bg-red-500 text-white py-2 px-4 text-center z-50 flex items-center justify-center">
      <WifiOff className="h-4 w-4 mr-2" />
      <span className="text-sm font-medium">Нет подключения к интернету. Некоторые функции могут быть недоступны.</span>
    </div>
  );
};

export default OfflineIndicator;