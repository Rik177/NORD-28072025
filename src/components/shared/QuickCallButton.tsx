import React, { useState } from 'react';
import { Phone, X, MessageCircle } from 'lucide-react';

const QuickCallButton: React.FC = () => {
  const [showCallForm, setShowCallForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) return;
    
    console.log('Callback request:', formData);
    
    setIsSubmitted(true);
    setTimeout(() => {
      setShowCallForm(false);
      setIsSubmitted(false);
      setFormData({ name: '', phone: '' });
    }, 3000);
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setShowCallForm(true)}
          className="flex items-center justify-center w-14 h-14 bg-accent hover:bg-accent/90 text-white rounded-full shadow-lg transition-all duration-300 hover:scale-110 animate-pulse group"
          aria-label="Заказать обратный звонок"
        >
          <Phone className="h-7 w-7" />
          
          {/* Tooltip */}
          <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Обратный звонок
            <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-gray-900"></div>
          </div>
        </button>
      </div>

      {/* Callback Form Modal */}
      {showCallForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-md mx-4">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="font-heading font-bold text-xl sm:text-2xl text-primary dark:text-primary-300">
                    Обратный звонок
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm sm:text-base">
                    Оставьте номер телефона, мы перезвоним в течение 5 минут
                  </p>
                </div>
                <button 
                  onClick={() => setShowCallForm(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1"
                  aria-label="Закрыть"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                      Ваше имя*
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full p-3 sm:p-4 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-base"
                      placeholder="Как к вам обращаться?"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                      Телефон*
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full p-3 sm:p-4 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-base"
                      placeholder="+7 (___) ___-__-__"
                    />
                  </div>
                  
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                    <div className="flex items-center text-green-700 dark:text-green-300 text-sm">
                      <Phone className="h-4 w-4 mr-2" />
                      <span>Перезвоним в течение 5 минут в рабочее время</span>
                    </div>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                      Пн-Пт: 9:00-18:00, Сб: 10:00-16:00
                    </p>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-accent hover:bg-accent/90 text-white font-semibold py-3 sm:py-4 px-6 rounded-lg transition-colors text-base sm:text-lg min-h-[48px]"
                  >
                    Заказать звонок
                  </button>
                  
                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                    Нажимая кнопку, вы соглашаетесь с{' '}
                    <a href="/privacy-policy" className="text-primary-700 dark:text-primary-300 hover:underline">
                      политикой конфиденциальности
                    </a>
                  </p>
                </form>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Phone className="h-8 w-8 text-green-600" />
                  </div>
                  <h4 className="font-heading font-bold text-lg sm:text-xl text-primary dark:text-primary-300 mb-2">
                    Заявка принята!
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm sm:text-base">
                    Мы перезвоним вам в ближайшее время
                  </p>
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Номер заявки: #{Date.now().toString().slice(-6)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QuickCallButton;