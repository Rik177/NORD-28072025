import React from 'react';
import { X } from 'lucide-react';
import FormField from '../shared/FormField';
import { useFormValidation, commonValidationRules } from '../../utils/formValidation';

export interface ConsultationFormData {
    name: string;
    phone: string;
    email: string;
    message: string;
}

interface ConsultationFormProps {
    onClose: () => void;
    onSubmit: (e: React.FormEvent) => void;
    value: ConsultationFormData;
    setValue: (data: ConsultationFormData) => void;
}

const ConsultationForm: React.FC<ConsultationFormProps> = ({ onClose, onSubmit, value, setValue}) => {
    const validationRules = {
        name: commonValidationRules.name,
        phone: commonValidationRules.phone,
        email: commonValidationRules.email,
        message: commonValidationRules.message
    };

    const {
        data,
        errors,
        touched,
        updateField,
        touchField,
        validateAll
    } = useFormValidation(value, validationRules);

    React.useEffect(() => {
        setValue(data as ConsultationFormData);
    }, [data, setValue]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateAll()) {
            onSubmit(e);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-lg w-full">
                <div className="p-6">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h3 className="font-heading font-bold text-h3-mobile md:text-h3-desktop text-primary dark:text-white">
                                Заказать консультацию
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mt-1">
                                Наш специалист свяжется с вами в ближайшее время
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </div>
            
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <FormField
                            label="Ваше имя"
                            name="name"
                            type="text"
                            value={data.name}
                            error={errors.name}
                            touched={touched.name}
                            required
                            onChange={updateField}
                            onBlur={touchField}
                        />
                        
                        <FormField
                            label="Телефон"
                            name="phone"
                            type="tel"
                            value={data.phone}
                            error={errors.phone}
                            touched={touched.phone}
                            required
                            onChange={updateField}
                            onBlur={touchField}
                        />
                        
                        <FormField
                            label="Email"
                            name="email"
                            type="email"
                            value={data.email}
                            error={errors.email}
                            touched={touched.email}
                            onChange={updateField}
                            onBlur={touchField}
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
                        />
                        
                        <button
                            type="submit"
                            className="w-full bg-accent hover:bg-opacity-90 text-white font-semibold py-3 px-6 rounded-md transition-colors"
                        >
                            Заказать консультацию
                        </button>
                    </form>
            
                    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                            Или свяжитесь с нами напрямую:
                        </p>
                        <div className="flex flex-col space-y-2">
                            <a href="tel:+71234567890" className="flex items-center text-primary hover:text-secondary">
                                <span>📞</span>
                                <span className="ml-2">+7 (123) 456-78-90</span>
                            </a>
                            <a href="mailto:info@nordengineering.ru" className="flex items-center text-primary hover:text-secondary">
                                <span>✉️</span>
                                <span className="ml-2">info@nordengineering.ru</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConsultationForm;