import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Phone, User, Clock } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'operator';
  timestamp: Date;
}

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Здравствуйте! Меня зовут Анна, я консультант НОРДИНЖИНИРИНГ. Чем могу помочь?',
      sender: 'operator',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isFirstOpen, setIsFirstOpen] = useState(true);
  const [showNotification, setShowNotification] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Show notification after 15 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        setShowNotification(true);
      }
    }, 15000);

    return () => clearTimeout(timer);
  }, [isOpen]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    setIsTyping(true);

    // Симуляция ответа оператора
    setTimeout(() => {
      setIsTyping(false);
      const operatorResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Спасибо за ваш вопрос! Наш специалист свяжется с вами в ближайшее время. Для более быстрой связи можете позвонить по телефону +7 (123) 456-78-90.',
        sender: 'operator',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, operatorResponse]);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ru-RU', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setShowNotification(false);
    
    if (isFirstOpen && !isOpen) {
      setIsFirstOpen(false);
      // Add welcome message after a delay
      setTimeout(() => {
        const welcomeMessage: Message = {
          id: (Date.now() + 2).toString(),
          text: 'Чем я могу вам помочь сегодня? Интересует подбор оборудования, монтаж или сервисное обслуживание?',
          sender: 'operator',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, welcomeMessage]);
      }, 1000);
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={toggleChat}
        className={`fixed bottom-24 right-6 z-40 bg-primary hover:bg-primary/90 text-white rounded-full p-4 shadow-lg transition-all duration-300 ${
          isOpen ? 'scale-0' : 'scale-100'
        }`}
        style={{
          transformOrigin: 'bottom right'
        }}
        aria-label="Открыть чат"
      >
        <MessageCircle className="h-6 w-6" />
        {showNotification && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
        )}
        
        {/* Notification bubble */}
        {showNotification && (
          <div className="absolute -top-12 -right-2 bg-white text-primary text-xs font-semibold px-3 py-2 rounded-lg shadow-lg whitespace-nowrap">
            Нужна помощь?
            <div className="absolute bottom-0 right-4 transform translate-y-1/2 rotate-45 w-2 h-2 bg-white"></div>
          </div>
        )}
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 w-[calc(100%-2rem)] sm:w-80 md:w-96 h-[80vh] sm:h-[500px] bg-white dark:bg-gray-900 rounded-xl shadow-xl transition-all duration-300 overflow-hidden flex flex-col ${
          isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
        }`}
        style={{
          transformOrigin: 'bottom right'
        }}
      >
        {/* Header */}
        <div className="bg-primary text-white p-4 rounded-t-xl flex items-center justify-between relative">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center mr-3">
              <User className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-base sm:text-lg text-gray-200">Онлайн консультант</h3>
              <div className="flex items-center text-xs text-green-300">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-1"></div>
                В сети
              </div>
            </div>
          </div>
          <button
            onClick={toggleChat}
            className="text-white hover:text-gray-300 p-1 absolute right-4 top-4"
            aria-label="Закрыть чат"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-3 bg-gray-50 dark:bg-gray-800">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] px-3 py-2 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-primary text-white rounded-tr-none'
                    : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-tl-none shadow-sm'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <div className={`flex items-center justify-end mt-1 ${
                  message.sender === 'user' ? 'text-white/70' : 'text-gray-500 dark:text-gray-400'
                }`}>
                  <Clock className="h-3 w-3 mr-1" />
                  <span className="text-xs">{formatTime(message.timestamp)}</span>
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white dark:bg-gray-700 px-3 py-2 rounded-lg rounded-tl-none shadow-sm">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t dark:border-gray-700 bg-white dark:bg-gray-900 shrink-0">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Введите сообщение..."
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800 dark:text-white text-sm"
            />
            <button
              onClick={handleSendMessage}
              className="bg-primary hover:bg-opacity-90 text-white p-2 rounded-lg transition-colors"
              disabled={!inputValue.trim()}
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
          <div className="mt-2 flex items-center justify-center">
            <a
              href="tel:+71234567890"
              className="flex items-center text-xs text-secondary-700 dark:text-primary-300 hover:text-primary dark:hover:text-white"
            >
              <Phone className="h-3 w-3 mr-1" />
              Позвонить: +7 (123) 456-78-90
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatWidget;