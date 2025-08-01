import React, { useState, useEffect } from 'react';
import { Settings, Eye, Type, Contrast, Volume2 } from 'lucide-react';

interface AccessibilitySettings {
  fontSize: 'normal' | 'large' | 'extra-large';
  contrast: 'normal' | 'high';
  dyslexiaFriendly: boolean;
  reducedMotion: boolean;
  screenReader: boolean;
}

const AccessibilityControls: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<AccessibilitySettings>({
    fontSize: 'normal',
    contrast: 'normal',
    dyslexiaFriendly: false,
    reducedMotion: false,
    screenReader: false
  });

  useEffect(() => {
    // Загружаем настройки из localStorage
    const savedSettings = localStorage.getItem('accessibility-settings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings(parsed);
        applySettings(parsed);
      } catch (error) {
        console.error('Error loading accessibility settings:', error);
      }
    }

    // Проверяем системные предпочтения
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setSettings(prev => ({ ...prev, reducedMotion: true }));
    }

    if (window.matchMedia('(prefers-contrast: high)').matches) {
      setSettings(prev => ({ ...prev, contrast: 'high' }));
    }
  }, []);

  const applySettings = (newSettings: AccessibilitySettings) => {
    const root = document.documentElement;
    
    // Применяем размер шрифта
    root.classList.remove('font-size-normal', 'font-size-large', 'font-size-extra-large');
    root.classList.add(`font-size-${newSettings.fontSize}`);
    
    // Применяем контрастность
    root.classList.remove('contrast-normal', 'contrast-high');
    root.classList.add(`contrast-${newSettings.contrast}`);
    
    // Применяем дружественный к дислексии шрифт
    if (newSettings.dyslexiaFriendly) {
      root.classList.add('dyslexia-friendly');
    } else {
      root.classList.remove('dyslexia-friendly');
    }
    
    // Применяем уменьшенную анимацию
    if (newSettings.reducedMotion) {
      root.style.setProperty('--animation-duration', '0.01ms');
      root.style.setProperty('--transition-duration', '0.01ms');
    } else {
      root.style.removeProperty('--animation-duration');
      root.style.removeProperty('--transition-duration');
    }

    // Сохраняем настройки
    localStorage.setItem('accessibility-settings', JSON.stringify(newSettings));
  };

  const updateSetting = <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    applySettings(newSettings);
  };

  const resetSettings = () => {
    const defaultSettings: AccessibilitySettings = {
      fontSize: 'normal',
      contrast: 'normal',
      dyslexiaFriendly: false,
      reducedMotion: false,
      screenReader: false
    };
    setSettings(defaultSettings);
    applySettings(defaultSettings);
  };

  return (
    <>
      {/* Кнопка открытия панели доступности */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-5 left-6 z-50 bg-primary hover:bg-opacity-90 text-white rounded-full p-3 shadow-lg transition-all duration-300"
        aria-label="Открыть настройки доступности"
        title="Настройки доступности"
      >
        <Settings className="h-6 w-6" />
      </button>

      {/* Панель настроек доступности */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div 
            className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
            role="dialog"
            aria-labelledby="accessibility-title"
            aria-describedby="accessibility-description"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 id="accessibility-title" className="font-heading font-bold text-h3-desktop text-primary dark:text-primary-300">
                  Настройки доступности
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-2"
                  aria-label="Закрыть настройки доступности"
                >
                  ×
                </button>
              </div>

              <p id="accessibility-description" className="text-gray-600 dark:text-gray-400 mb-6">
                Настройте параметры для более комфортного использования сайта
              </p>

              <div className="space-y-6">
                {/* Размер шрифта */}
                <div>
                  <label className="flex items-center mb-3 font-semibold text-gray-700 dark:text-gray-300">
                    <Type className="h-5 w-5 mr-2" />
                    Размер шрифта
                  </label>
                  <div className="space-y-2">
                    {[
                      { value: 'normal', label: 'Обычный' },
                      { value: 'large', label: 'Крупный' },
                      { value: 'extra-large', label: 'Очень крупный' }
                    ].map(option => (
                      <label key={option.value} className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="fontSize"
                          value={option.value}
                          checked={settings.fontSize === option.value}
                          onChange={(e) => updateSetting('fontSize', e.target.value as any)}
                          className="mr-3 text-primary focus:ring-primary"
                        />
                        <span className="text-gray-700 dark:text-gray-300">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Контрастность */}
                <div>
                  <label className="flex items-center mb-3 font-semibold text-gray-700 dark:text-gray-300">
                    <Contrast className="h-5 w-5 mr-2" />
                    Контрастность
                  </label>
                  <div className="space-y-2">
                    {[
                      { value: 'normal', label: 'Обычная' },
                      { value: 'high', label: 'Высокая' }
                    ].map(option => (
                      <label key={option.value} className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="contrast"
                          value={option.value}
                          checked={settings.contrast === option.value}
                          onChange={(e) => updateSetting('contrast', e.target.value as any)}
                          className="mr-3 text-primary focus:ring-primary"
                        />
                        <span className="text-gray-700 dark:text-gray-300">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Дополнительные настройки */}
                <div className="space-y-4">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.dyslexiaFriendly}
                      onChange={(e) => updateSetting('dyslexiaFriendly', e.target.checked)}
                      className="mr-3 text-primary focus:ring-primary"
                    />
                    <div>
                      <span className="font-semibold text-gray-700 dark:text-gray-300">
                        Шрифт для дислексии
                      </span>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Использовать специальный шрифт для людей с дислексией
                      </p>
                    </div>
                  </label>

                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.reducedMotion}
                      onChange={(e) => updateSetting('reducedMotion', e.target.checked)}
                      className="mr-3 text-primary focus:ring-primary"
                    />
                    <div>
                      <span className="font-semibold text-gray-700 dark:text-gray-300">
                        Уменьшить анимацию
                      </span>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Отключить или уменьшить анимации и переходы
                      </p>
                    </div>
                  </label>

                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.screenReader}
                      onChange={(e) => updateSetting('screenReader', e.target.checked)}
                      className="mr-3 text-primary focus:ring-primary"
                    />
                    <div>
                      <span className="font-semibold text-gray-700 dark:text-gray-300">
                        Режим скрин-ридера
                      </span>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Оптимизировать интерфейс для программ чтения с экрана
                      </p>
                    </div>
                  </label>
                </div>

                {/* Кнопки действий */}
                <div className="flex space-x-4 pt-4">
                  <button
                    onClick={resetSettings}
                    className="flex-1 py-3 px-4 border border-gray-300 dark:border-gray-700 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    Сбросить
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="flex-1 py-3 px-4 bg-primary text-white rounded-md hover:bg-opacity-90 transition-colors"
                  >
                    Применить
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Дополнительные стили для размеров шрифта */}
      <style jsx global>{`
        .font-size-large {
          font-size: 18px;
        }
        
        .font-size-large h1 {
          font-size: 3rem;
        }
        
        .font-size-large h2 {
          font-size: 2.5rem;
        }
        
        .font-size-large h3 {
          font-size: 2rem;
        }
        
        .font-size-large p,
        .font-size-large span,
        .font-size-large div {
          font-size: 1.125rem;
        }
        
        .font-size-extra-large {
          font-size: 20px;
        }
        
        .font-size-extra-large h1 {
          font-size: 3.5rem;
        }
        
        .font-size-extra-large h2 {
          font-size: 3rem;
        }
        
        .font-size-extra-large h3 {
          font-size: 2.5rem;
        }
        
        .font-size-extra-large p,
        .font-size-extra-large span,
        .font-size-extra-large div {
          font-size: 1.25rem;
        }
        
        .contrast-high {
          filter: contrast(150%);
        }
        
        .contrast-high .btn-primary {
          background-color: #000080 !important;
          border-color: #000080 !important;
        }
        
        .contrast-high .btn-secondary {
          background-color: #0066CC !important;
          border-color: #0066CC !important;
        }
        
        .contrast-high .text-gray-600 {
          color: #000000 !important;
        }
        
        .contrast-high .text-gray-400 {
          color: #333333 !important;
        }
      `}</style>
    </>
  );
};

export default AccessibilityControls;