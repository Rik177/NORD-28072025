// Утилиты для улучшения доступности

export const announceToScreenReader = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  
  document.body.appendChild(announcement);
  
  // Удаляем элемент через небольшую задержку
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
};

export const trapFocus = (element: HTMLElement) => {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  const firstFocusableElement = focusableElements[0] as HTMLElement;
  const lastFocusableElement = focusableElements[focusableElements.length - 1] as HTMLElement;

  const handleTabKey = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      if (document.activeElement === firstFocusableElement) {
        lastFocusableElement.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastFocusableElement) {
        firstFocusableElement.focus();
        e.preventDefault();
      }
    }
  };

  element.addEventListener('keydown', handleTabKey);
  
  // Фокусируем первый элемент
  firstFocusableElement?.focus();

  return () => {
    element.removeEventListener('keydown', handleTabKey);
  };
};

export const getContrastRatio = (color1: string, color2: string): number => {
  const getLuminance = (color: string): number => {
    // Упрощенная функция для расчета яркости
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16) / 255;
    const g = parseInt(hex.substr(2, 2), 16) / 255;
    const b = parseInt(hex.substr(4, 2), 16) / 255;
    
    const [rs, gs, bs] = [r, g, b].map(c => {
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  const l1 = getLuminance(color1);
  const l2 = getLuminance(color2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  
  return (lighter + 0.05) / (darker + 0.05);
};

export const checkColorContrast = (foreground: string, background: string): {
  ratio: number;
  wcagAA: boolean;
  wcagAAA: boolean;
} => {
  const ratio = getContrastRatio(foreground, background);
  
  return {
    ratio,
    wcagAA: ratio >= 4.5,
    wcagAAA: ratio >= 7
  };
};

export const addKeyboardNavigation = (element: HTMLElement) => {
  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'Enter':
      case ' ':
        if (element.tagName === 'BUTTON' || element.getAttribute('role') === 'button') {
          e.preventDefault();
          element.click();
        }
        break;
      case 'Escape':
        if (element.getAttribute('aria-expanded') === 'true') {
          element.setAttribute('aria-expanded', 'false');
          element.focus();
        }
        break;
    }
  };

  element.addEventListener('keydown', handleKeyDown);
  
  return () => {
    element.removeEventListener('keydown', handleKeyDown);
  };
};

export const createAriaLabel = (text: string, context?: string): string => {
  if (context) {
    return `${text}, ${context}`;
  }
  return text;
};

export const updateAriaLive = (element: HTMLElement, message: string) => {
  element.textContent = message;
  element.setAttribute('aria-live', 'polite');
};

export const manageModalFocus = (modalElement: HTMLElement, triggerElement?: HTMLElement) => {
  const previousActiveElement = document.activeElement as HTMLElement;
  
  // Устанавливаем фокус на модальное окно
  modalElement.focus();
  
  // Ловушка фокуса
  const removeTrapFocus = trapFocus(modalElement);
  
  return () => {
    removeTrapFocus();
    // Возвращаем фокус на элемент, который открыл модальное окно
    if (triggerElement) {
      triggerElement.focus();
    } else if (previousActiveElement) {
      previousActiveElement.focus();
    }
  };
};

export const addAriaDescribedBy = (element: HTMLElement, descriptionId: string) => {
  const existingDescribedBy = element.getAttribute('aria-describedby');
  const newDescribedBy = existingDescribedBy 
    ? `${existingDescribedBy} ${descriptionId}`
    : descriptionId;
  
  element.setAttribute('aria-describedby', newDescribedBy);
};

export const removeAriaDescribedBy = (element: HTMLElement, descriptionId: string) => {
  const describedBy = element.getAttribute('aria-describedby');
  if (describedBy) {
    const newDescribedBy = describedBy
      .split(' ')
      .filter(id => id !== descriptionId)
      .join(' ');
    
    if (newDescribedBy) {
      element.setAttribute('aria-describedby', newDescribedBy);
    } else {
      element.removeAttribute('aria-describedby');
    }
  }
};

// Проверка поддержки скрин-ридеров
export const isScreenReaderActive = (): boolean => {
  // Проверяем различные индикаторы использования скрин-ридера
  return !!(
    window.navigator.userAgent.includes('NVDA') ||
    window.navigator.userAgent.includes('JAWS') ||
    window.speechSynthesis ||
    (window as any).speechSynthesis
  );
};

// Улучшение навигации с клавиатуры для списков
export const addListKeyboardNavigation = (listElement: HTMLElement) => {
  const items = Array.from(listElement.querySelectorAll('[role="listitem"], li')) as HTMLElement[];
  let currentIndex = 0;

  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        currentIndex = Math.min(currentIndex + 1, items.length - 1);
        items[currentIndex].focus();
        break;
      case 'ArrowUp':
        e.preventDefault();
        currentIndex = Math.max(currentIndex - 1, 0);
        items[currentIndex].focus();
        break;
      case 'Home':
        e.preventDefault();
        currentIndex = 0;
        items[currentIndex].focus();
        break;
      case 'End':
        e.preventDefault();
        currentIndex = items.length - 1;
        items[currentIndex].focus();
        break;
    }
  };

  listElement.addEventListener('keydown', handleKeyDown);
  
  return () => {
    listElement.removeEventListener('keydown', handleKeyDown);
  };
};