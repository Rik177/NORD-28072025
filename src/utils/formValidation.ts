export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => string | null;
}

export interface ValidationRules {
  [key: string]: ValidationRule;
}

export interface FormErrors {
  [key: string]: string;
}

export interface FormTouched {
  [key: string]: boolean;
}

export const commonValidationRules = {
  name: {
    required: true,
    minLength: 2,
    maxLength: 50,
    pattern: /^[а-яёА-ЯЁa-zA-Z\s-]+$/,
    custom: (value: string) => {
      if (value && value.trim().length < 2) {
        return 'Имя должно содержать минимум 2 символа';
      }
      if (value && !/^[а-яёА-ЯЁa-zA-Z\s-]+$/.test(value)) {
        return 'Имя может содержать только буквы, пробелы и дефисы';
      }
      return null;
    }
  },
  phone: {
    required: true,
    pattern: /^(\+7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/,
    custom: (value: string) => {
      const cleanPhone = value.replace(/[\s\-\(\)]/g, '');
      if (cleanPhone.length < 10) {
        return 'Введите корректный номер телефона';
      }
      return null;
    }
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    custom: (value: string) => {
      if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return 'Введите корректный email адрес';
      }
      return null;
    }
  },
  message: {
    maxLength: 1000,
    custom: (value: string) => {
      if (value && value.length > 1000) {
        return 'Сообщение не должно превышать 1000 символов';
      }
      return null;
    }
  }
};

export const validateField = (value: any, rules: ValidationRule): string | null => {
  // Required validation
  if (rules.required && (!value || (typeof value === 'string' && !value.trim()))) {
    return 'Это поле обязательно для заполнения';
  }

  // Skip other validations if field is empty and not required
  if (!value || (typeof value === 'string' && !value.trim())) {
    return null;
  }

  // String validations
  if (typeof value === 'string') {
    // Min length validation
    if (rules.minLength && value.trim().length < rules.minLength) {
      return `Минимальная длина: ${rules.minLength} символов`;
    }

    // Max length validation
    if (rules.maxLength && value.length > rules.maxLength) {
      return `Максимальная длина: ${rules.maxLength} символов`;
    }

    // Pattern validation
    if (rules.pattern && !rules.pattern.test(value)) {
      return 'Неверный формат данных';
    }
  }

  // Custom validation
  if (rules.custom) {
    return rules.custom(value);
  }

  return null;
};

export const validateForm = (data: any, rules: ValidationRules): FormErrors => {
  const errors: FormErrors = {};

  Object.keys(rules).forEach(field => {
    const error = validateField(data[field], rules[field]);
    if (error) {
      errors[field] = error;
    }
  });

  return errors;
};

export const useFormValidation = <T extends Record<string, any>>(
  initialData: T,
  validationRules: ValidationRules
) => {
  const [data, setData] = React.useState<T>(initialData);
  const [errors, setErrors] = React.useState<FormErrors>({});
  const [touched, setTouched] = React.useState<FormTouched>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const updateField = React.useCallback((field: string, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  }, [errors]);

  const touchField = React.useCallback((field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    
    // Validate field when it loses focus
    if (validationRules[field]) {
      const error = validateField(data[field], validationRules[field]);
      setErrors(prev => ({ ...prev, [field]: error || '' }));
    }
  }, [data, validationRules]);

  const validateAll = React.useCallback(() => {
    const newErrors = validateForm(data, validationRules);
    const newTouched: FormTouched = {};
    
    Object.keys(validationRules).forEach(field => {
      newTouched[field] = true;
    });
    
    setErrors(newErrors);
    setTouched(newTouched);
    
    return Object.keys(newErrors).length === 0;
  }, [data, validationRules]);

  const reset = React.useCallback(() => {
    setData(initialData);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialData]);

  return {
    data,
    errors,
    touched,
    isSubmitting,
    setIsSubmitting,
    updateField,
    touchField,
    validateAll,
    reset
  };
};

// Utility functions for specific validations
export const formatPhone = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.length === 11 && cleaned.startsWith('8')) {
    return '+7' + cleaned.slice(1);
  }
  
  if (cleaned.length === 10) {
    return '+7' + cleaned;
  }
  
  if (cleaned.length === 11 && cleaned.startsWith('7')) {
    return '+' + cleaned;
  }
  
  return phone;
};

export const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// Spam protection utilities
export class SpamProtection {
  private static submissionTimes: Map<string, number[]> = new Map();
  private static readonly MAX_SUBMISSIONS_PER_HOUR = 5;
  private static readonly HOUR_IN_MS = 60 * 60 * 1000;

  static isRateLimited(identifier: string): boolean {
    const now = Date.now();
    const submissions = this.submissionTimes.get(identifier) || [];
    
    // Remove submissions older than 1 hour
    const recentSubmissions = submissions.filter(time => now - time < this.HOUR_IN_MS);
    
    // Update the map
    this.submissionTimes.set(identifier, recentSubmissions);
    
    return recentSubmissions.length >= this.MAX_SUBMISSIONS_PER_HOUR;
  }

  static recordSubmission(identifier: string): void {
    const now = Date.now();
    const submissions = this.submissionTimes.get(identifier) || [];
    submissions.push(now);
    this.submissionTimes.set(identifier, submissions);
  }

  static validateHoneypot(value: string): boolean {
    return value === '';
  }

  static isDisposableEmail(email: string): boolean {
    const disposableDomains = [
      '10minutemail.com',
      'tempmail.org',
      'guerrillamail.com',
      'mailinator.com',
      'throwaway.email'
    ];
    
    const domain = email.split('@')[1]?.toLowerCase();
    return disposableDomains.includes(domain);
  }

  static containsSuspiciousContent(text: string): boolean {
    const suspiciousPatterns = [
      /\b(viagra|cialis|casino|lottery|winner|congratulations)\b/i,
      /\b(click here|free money|make money fast)\b/i,
      /(http|https):\/\/[^\s]+/g // Multiple URLs
    ];
    
    return suspiciousPatterns.some(pattern => pattern.test(text));
  }
}

// React import for hooks
import React from 'react';