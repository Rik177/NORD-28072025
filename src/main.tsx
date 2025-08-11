import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Добавляем скрипт для определения фокуса с клавиатуры
const addFocusVisiblePolyfill = () => {
  let hadKeyboardEvent = false;
  const keyboardModalityWhitelist = ['Tab', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter', 'Space', 'Escape', 'Home', 'End', 'PageUp', 'PageDown'];

  document.addEventListener('keydown', (e) => {
    if (keyboardModalityWhitelist.includes(e.key)) {
      hadKeyboardEvent = true;
    }
  });

  document.addEventListener('mousedown', () => {
    hadKeyboardEvent = false;
  });

  document.addEventListener('pointerdown', () => {
    hadKeyboardEvent = false;
  });

  document.addEventListener('touchstart', () => {
    hadKeyboardEvent = false;
  });

  document.addEventListener('focus', (e) => {
    if (hadKeyboardEvent) {
      (e.target as HTMLElement).classList.add('focus-visible');
    }
  }, true);

  document.addEventListener('blur', (e) => {
    (e.target as HTMLElement).classList.remove('focus-visible');
  }, true);

  document.documentElement.classList.add('js-focus-visible');
};

// Register service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        
      })
      .catch(error => {
        console.error('Service Worker registration failed:', error);
      });
  });
}

// Initialize focus visible polyfill
addFocusVisiblePolyfill();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);