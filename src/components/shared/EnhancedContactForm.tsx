import React, { useState, useRef } from 'react';
import { Send, Shield, Clock, CheckCircle } from 'lucide-react';
import FormField from './FormField';
import { useFormValidation, commonValidationRules, SpamProtection, formatPhone } from '../../utils/formValidation';

interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  message: string;
  agreement: boolean;
  honeypot: string; // Скрытое поле для защиты от ботов
}

interface EnhancedContactFormProps {
  onSubmit?: (data: ContactFormData) => Promise<void>;
  title?: string;
  description?: string;
  className?: string;
}

const EnhancedContactForm: React.FC<EnhancedContactFormProps> = ({
  onSubmit,
  title = "Остались вопросы?",
  description = "Оставьте заявку, и наш специалист свяжется с вами в ближайшее время",
  className = ""
}) => {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  
  const initialData: ContactFormData = {
    name: '',
    phone: '',
    email: '',
    message: '',
    agreement: false,
    honeypot: ''
  };
  
  const validationRules = {
    name: commonValidationRules.name,
    phone: commonValidationRules.phone,
    email: commonValidationRules.email,
    message: commonValidationRules.message,
    agreement: {
      required: true,
      custom: (value: boolean) => {
        return value ? null : 'Необходимо согласие на обработку персональных данных';
      }
    }
  };
  
  const {
    data,
    errors,
    touched,
    isSubmitting,
    setIsSubmitting,
    updateField,
    touchField,
    validateAll,
    reset
  } = useFormValidation(initialData, validationRules);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateAll()) {
      setSubmitStatus('error');
      setSubmitMessage('Пожалуйста, исправьте ошибки в форме');
      return;
    }
    
    // Проверка защиты от спама
    const clientIP = 'user-ip'; // В реальном приложении получать IP клиента
    
    if (SpamProtection.isRateLimited(clientIP)) {
      setSubmitStatus('error');
      setSubmitMessage('Слишком много запросов. Попробуйте позже.');
      return;
    }
    
    if (!SpamProtection.validateHoneypot(data.honeypot)) {
      setSubmitStatus('error');
      setSubmitMessage('Обнаружена подозрительная активность');
      return;
    }
    
    if (SpamProtection.isDisposableEmail(data.email)) {
      setSubmitStatus('error');
      setSubmitMessage('Пожалуйста, используйте постоянный email адрес');
      return;
    }
    
    if (SpamProtection.containsSuspiciousContent(data.message)) {
      setSubmitStatus('error');
      setSubmitMessage('Сообщение содержит недопустимый контент');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      // Форматируем телефон перед отправкой
      const formattedData = {
        ...data,
        phone: formatPhone(data.phone)
      };
      
      if (onSubmit) {
        await onSubmit(formattedData);
      } else {
        // Симуляция отправки
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
      
      setSubmitStatus('success');
      setSubmitMessage('Спасибо! Ваша заявка успешно отправлена. Мы свяжемся с вами в ближайшее время.');
      reset();
      
      // Сброс статуса через 5 секунд
      setTimeout(() => {
        setSubmitStatus('idle');
        setSubmitMessage('');
      }, 5000);
      
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage('Произошла ошибка при отправке. Попробуйте еще раз или свяжитесь с нами по телефону.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (submitStatus === 'success') {
    return (
      <div className={`bg-white dark:bg-gray-900 rounded-lg p-8 text-center ${className}`}>
        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="font-heading font-bold text-h3-desktop text-primary dark:text-white mb-4">
          Заявка отправлена!
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {submitMessage}
        </p>
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
          <div className="flex items-center justify-center text-green-700 dark:text-green-300 text-sm">
            <Clock className="h-4 w-4 mr-2" />
            <span>Ответим в течение 15 минут в рабочее время</span>
          </div>
          <p className="text-xs text-green-600 dark:text-green-400 mt-1">
            Пн-Пт: 9:00-18:00, Сб: 10:00-16:00
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className={`bg-white dark:bg-gray-900 rounded-lg p-8 ${className}`}>
      <div className="text-center mb-8">
        <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-primary dark:text-white mb-4">
          {title}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {description}
        </p>
      </div>
      
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
        {/* Honeypot поле (скрытое от пользователей) */}
        <input
          type="text"
          name="website"
          value={data.honeypot}
          onChange={(e) => updateField('honeypot', e.target.value)}
          style={{ display: 'none' }}
          tabIndex={-1}
          autoComplete="off"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Ваше имя"
            name="name"
            type="text"
            value={data.name}
            error={errors.name}
            touched={touched.name}
            required
            placeholder="Введите ваше имя"
            onChange={updateField}
            onBlur={touchField}
            autoComplete="name"
            maxLength={50}
          />
          
          <FormField
            label="Телефон"
            name="phone"
            type="tel"
            value={data.phone}
            error={errors.phone}
            touched={touched.phone}
            required
            placeholder="+7 (___) ___-__-__"
            onChange={updateField}
            onBlur={touchField}
            autoComplete="tel"
          />
        </div>
        
        <FormField
          label="Email"
          name="email"
          type="email"
          value={data.email}
          error={errors.email}
          touched={touched.email}
          required
          placeholder="your@email.com"
          onChange={updateField}
          onBlur={touchField}
          autoComplete="email"
        />
        
        <FormField
          label="Сообщение"
          name="message"
          type="textarea"
          value={data.message}
          error={errors.message}
          touched={touched.message}
          placeholder="Опишите ваши требования или задайте вопрос..."
          rows={4}
          onChange={updateField}
          onBlur={touchField}
          maxLength={1000}
        />
        
        <FormField
          label="Я согласен на обработку персональных данных в соответствии с политикой конфиденциальности"
          name="agreement"
          type="checkbox"
          value={data.agreement}
          error={errors.agreement}
          touched={touched.agreement}
          required
          onChange={updateField}
          onBlur={touchField}
        />
        
        {/* Сообщение об ошибке */}
        {submitStatus === 'error' && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <div className="flex items-center text-red-700 dark:text-red-300">
              <AlertCircle className="h-5 w-5 mr-2" />
              <span>{submitMessage}</span>
            </div>
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <button
            type="submit"
            disabled={isSubmitting || !data.agreement}
            className="w-full sm:w-auto btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Отправляем...
              </>
            ) : (
              <>
                <Send className="h-5 w-5 mr-2" />
                Отправить заявку
              </>
            )}
          </button>
          
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Shield className="h-4 w-4 mr-2" />
            <span>Защищено от спама</span>
          </div>
        </div>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
          <div className="flex items-center text-blue-700 dark:text-blue-300 text-sm">
            <Clock className="h-4 w-4 mr-2" />
            <span>Ответим в течение 15 минут в рабочее время</span>
          </div>
          <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
            Пн-Пт: 9:00-18:00, Сб: 10:00-16:00
          </p>
        </div>
      </form>
    </div>
  );
};

export default EnhancedContactForm;