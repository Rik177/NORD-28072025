/**
 * PWA utility functions
 */

/**
 * Checks if the app is running in standalone mode (installed PWA)
 * @returns boolean
 */
export const isRunningAsStandalone = (): boolean => {
  return window.matchMedia('(display-mode: standalone)').matches || 
         (window.navigator as any).standalone === true;
};

/**
 * Checks if the app can be installed
 * @returns Promise<boolean>
 */
export const canInstallPWA = async (): Promise<boolean> => {
  if ('getInstalledRelatedApps' in navigator) {
    try {
      // @ts-ignore - TypeScript doesn't know about this API yet
      const relatedApps = await navigator.getInstalledRelatedApps();
      return relatedApps.length === 0;
    } catch (e) {
      console.error('Error checking installed apps:', e);
    }
  }
  
  return false;
};

/**
 * Shows PWA installation prompt
 * @param deferredPrompt BeforeInstallPromptEvent
 * @returns Promise<boolean> - Whether the user accepted the prompt
 */
export const showInstallPrompt = async (deferredPrompt: any): Promise<boolean> => {
  if (!deferredPrompt) {
    return false;
  }
  
  // Show the prompt
  deferredPrompt.prompt();
  
  // Wait for the user to respond to the prompt
  const choiceResult = await deferredPrompt.userChoice;
  
  return choiceResult.outcome === 'accepted';
};

/**
 * Registers the app for handling share targets
 * @param data ShareData
 */
export const handleShareTarget = (data: { title?: string, text?: string, url?: string }): void => {
  if (!data) return;
  
  // Example: Handle shared content
  if (data.url) {
    // Navigate to a page that can handle the shared URL
    window.location.href = `/share?url=${encodeURIComponent(data.url)}`;
  } else if (data.text) {
    // Handle shared text
    window.location.href = `/share?text=${encodeURIComponent(data.text)}`;
  }
};

/**
 * Checks if the app has permission for notifications
 * @returns Promise<boolean>
 */
export const hasNotificationPermission = async (): Promise<boolean> => {
  if (!('Notification' in window)) {
    return false;
  }
  
  return Notification.permission === 'granted';
};

/**
 * Requests permission for notifications
 * @returns Promise<boolean>
 */
export const requestNotificationPermission = async (): Promise<boolean> => {
  if (!('Notification' in window)) {
    return false;
  }
  
  const permission = await Notification.requestPermission();
  return permission === 'granted';
};

/**
 * Subscribes to push notifications
 * @returns Promise<PushSubscription | null>
 */
export const subscribeToPushNotifications = async (): Promise<any> => {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
    return null;
  }
  
  try {
    const registration = await navigator.serviceWorker.ready;
    
    // Get the server's public key
    const response = await fetch('/api/push/public-key');
    const { publicKey } = await response.json();
    
    // Subscribe the user
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicKey)
    });
    
    // Send the subscription to the server
    await fetch('/api/push/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(subscription)
    });
    
    return subscription;
  } catch (error) {
    console.error('Error subscribing to push notifications:', error);
    return null;
  }
};

/**
 * Converts a base64 string to Uint8Array
 * @param base64String Base64 string
 * @returns Uint8Array
 */
function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');
  
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  
  return outputArray;
}

/**
 * Checks if the device is online
 * @returns boolean
 */
export const isOnline = (): boolean => {
  return navigator.onLine;
};

/**
 * Registers event listeners for online/offline events
 * @param onlineCallback Function to call when online
 * @param offlineCallback Function to call when offline
 */
export const registerConnectivityListeners = (
  onlineCallback: () => void,
  offlineCallback: () => void
): void => {
  window.addEventListener('online', onlineCallback);
  window.addEventListener('offline', offlineCallback);
};

/**
 * Unregisters event listeners for online/offline events
 * @param onlineCallback Function to call when online
 * @param offlineCallback Function to call when offline
 */
export const unregisterConnectivityListeners = (
  onlineCallback: () => void,
  offlineCallback: () => void
): void => {
  window.removeEventListener('online', onlineCallback);
  window.removeEventListener('offline', offlineCallback);
};