import React from 'react';
import { AlertCircle, Check } from 'lucide-react';

interface FormFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'tel' | 'textarea' | 'checkbox';
  value: string | boolean;
  error?: string;
  touched?: boolean;
  required?: boolean;
  placeholder?: string;
  rows?: number;
  onChange: (name: string, value: string | boolean) => void;
  onBlur: (name: string) => void;
  disabled?: boolean;
  autoComplete?: string;
  maxLength?: number;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type = 'text',
  value,
  error,
  touched,
  required,
  placeholder,
  rows = 4,
  onChange,
  onBlur,
  disabled = false,
  autoComplete,
  maxLength
}) => {
  const hasError = touched && error;
  const isValid = touched && !error && value;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (type === 'checkbox') {
      onChange(name, (e.target as HTMLInputElement).checked);
    } else {
      onChange(name, e.target.value);
    }
  };
  
  const handleBlur = () => {
    onBlur(name);
  };
  
  const fieldClasses = `
    w-full px-4 py-3 border rounded-md transition-all duration-200 
    focus:ring-2 focus:ring-primary focus:border-transparent
    dark:bg-gray-800 dark:text-white
    ${hasError 
      ? 'border-red-500 bg-red-50 dark:bg-red-900/20' 
      : isValid 
        ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
        : 'border-gray-300 dark:border-gray-700 bg-white'
    }
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
  `;
  
  if (type === 'checkbox') {
    return (
      <div className="flex items-start">
        <input
          type="checkbox"
          id={name}
          name={name}
          checked={value as boolean}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={disabled}
          className={`mt-1 mr-3 rounded border-gray-300 text-primary focus:ring-primary ${
            hasError ? 'border-red-500' : ''
          }`}
          required={required}
        />
        <div className="flex-1">
          <label htmlFor={name} className="text-sm text-gray-700 dark:text-gray-300">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
          {hasError && (
            <div className="flex items-center mt-1 text-red-500 text-sm">
              <AlertCircle className="h-4 w-4 mr-1" />
              <span>{error}</span>
            </div>
          )}
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block font-semibold text-gray-700 dark:text-gray-300">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <div className="relative">
        {type === 'textarea' ? (
          <textarea
            id={name}
            name={name}
            value={value as string}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={placeholder}
            rows={rows}
            disabled={disabled}
            maxLength={maxLength}
            className={fieldClasses}
            required={required}
            autoComplete={autoComplete}
          />
        ) : (
          <input
            type={type}
            id={name}
            name={name}
            value={value as string}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={placeholder}
            disabled={disabled}
            maxLength={maxLength}
            className={fieldClasses}
            required={required}
            autoComplete={autoComplete}
          />
        )}
        
        {/* Индикатор валидации */}
        {touched && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {hasError ? (
              <AlertCircle className="h-5 w-5 text-red-500" />
            ) : isValid ? (
              <Check className="h-5 w-5 text-green-500" />
            ) : null}
          </div>
        )}
      </div>
      
      {/* Сообщение об ошибке */}
      {hasError && (
        <div className="flex items-center text-red-500 text-sm animate-slide-down">
          <AlertCircle className="h-4 w-4 mr-1" />
          <span>{error}</span>
        </div>
      )}
      
      {/* Счетчик символов для textarea */}
      {type === 'textarea' && maxLength && (
        <div className="text-right text-xs text-gray-500 dark:text-gray-400">
          {(value as string).length} / {maxLength}
        </div>
      )}
    </div>
  );
};

export default FormField;