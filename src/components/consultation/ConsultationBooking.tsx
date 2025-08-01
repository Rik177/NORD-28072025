import React, { useState } from 'react';
import { Calendar, Clock, User, Phone, Mail, MapPin, CheckCircle, X } from 'lucide-react';

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

interface ConsultationData {
  name: string;
  phone: string;
  email: string;
  address: string;
  consultationType: string;
  preferredDate: string;
  preferredTime: string;
  description: string;
  urgency: string;
}

const timeSlots: TimeSlot[] = [
  { id: '09:00', time: '09:00', available: true },
  { id: '10:00', time: '10:00', available: true },
  { id: '11:00', time: '11:00', available: false },
  { id: '12:00', time: '12:00', available: true },
  { id: '13:00', time: '13:00', available: false },
  { id: '14:00', time: '14:00', available: true },
  { id: '15:00', time: '15:00', available: true },
  { id: '16:00', time: '16:00', available: true },
  { id: '17:00', time: '17:00', available: true },
  { id: '18:00', time: '18:00', available: false }
];

const consultationTypes = [
  { id: 'design', label: 'Проектирование системы', duration: '60 мин', price: 'Бесплатно' },
  { id: 'selection', label: 'Подбор оборудования', duration: '45 мин', price: 'Бесплатно' },
  { id: 'maintenance', label: 'Техническое обслуживание', duration: '30 мин', price: '2000 ₽' },
  { id: 'repair', label: 'Диагностика и ремонт', duration: '45 мин', price: '3000 ₽' },
  { id: 'energy', label: 'Энергоаудит', duration: '90 мин', price: '5000 ₽' },
  { id: 'general', label: 'Общая консультация', duration: '30 мин', price: 'Бесплатно' }
];

interface ConsultationBookingProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ConsultationData) => void;
}

const ConsultationBooking: React.FC<ConsultationBookingProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<ConsultationData>({
    name: '',
    phone: '',
    email: '',
    address: '',
    consultationType: '',
    preferredDate: '',
    preferredTime: '',
    description: '',
    urgency: 'normal'
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep = (stepNumber: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (stepNumber === 1) {
      if (!formData.name.trim()) newErrors.name = 'Введите ваше имя';
      if (!formData.phone.trim()) newErrors.phone = 'Введите номер телефона';
      if (!formData.email.trim()) newErrors.email = 'Введите email';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Некорректный email';
    }

    if (stepNumber === 2) {
      if (!formData.consultationType) newErrors.consultationType = 'Выберите тип консультации';
      if (!formData.preferredDate) newErrors.preferredDate = 'Выберите дату';
      if (!formData.preferredTime) newErrors.preferredTime = 'Выберите время';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
    setErrors({});
  };

  const handleSubmit = () => {
    if (validateStep(step)) {
      onSubmit(formData);
      setStep(1);
      setFormData({
        name: '',
        phone: '',
        email: '',
        address: '',
        consultationType: '',
        preferredDate: '',
        preferredTime: '',
        description: '',
        urgency: 'normal'
      });
      setErrors({});
    }
  };

  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30);
    return maxDate.toISOString().split('T')[0];
  };

  const selectedConsultationType = consultationTypes.find(
    type => type.id === formData.consultationType
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-primary dark:text-white">
              Запись на консультацию
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          {/* Progress */}
          <div className="mt-4">
            <div className="flex items-center">
              {[1, 2, 3].map((stepNumber) => (
                <React.Fragment key={stepNumber}>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      step >= stepNumber
                        ? 'bg-primary text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    {step > stepNumber ? <CheckCircle className="h-5 w-5" /> : stepNumber}
                  </div>
                  {stepNumber < 3 && (
                    <div
                      className={`flex-1 h-1 mx-2 ${
                        step > stepNumber ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-sm">
              <span className={step >= 1 ? 'text-primary' : 'text-gray-500'}>Контакты</span>
              <span className={step >= 2 ? 'text-primary' : 'text-gray-500'}>Детали</span>
              <span className={step >= 3 ? 'text-primary' : 'text-gray-500'}>Подтверждение</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Step 1: Contact Information */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="font-heading font-semibold text-h3-desktop text-primary dark:text-white mb-4">
                Контактная информация
              </h3>

              <div>
                <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
                  Ваше имя*
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className={`w-full pl-10 pr-4 py-3 border rounded-md focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white ${
                      errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                    }`}
                    placeholder="Введите ваше имя"
                  />
                </div>
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
                  Телефон*
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className={`w-full pl-10 pr-4 py-3 border rounded-md focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white ${
                      errors.phone ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                    }`}
                    placeholder="+7 (___) ___-__-__"
                  />
                </div>
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
                  Email*
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className={`w-full pl-10 pr-4 py-3 border rounded-md focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white ${
                      errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                    }`}
                    placeholder="your@email.com"
                  />
                </div>
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
                  Адрес объекта
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white"
                    placeholder="Адрес для выезда специалиста"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Consultation Details */}
          {step === 2 && (
            <div className="space-y-6">
              <h3 className="font-heading font-semibold text-h3-desktop text-primary dark:text-white">
                Детали консультации
              </h3>

              {/* Consultation Type */}
              <div>
                <label className="block mb-3 font-semibold text-gray-700 dark:text-gray-300">
                  Тип консультации*
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {consultationTypes.map((type) => (
                    <label
                      key={type.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                        formData.consultationType === type.id
                          ? 'border-primary bg-primary/5'
                          : 'border-gray-300 dark:border-gray-700 hover:border-primary/50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="consultationType"
                        value={type.id}
                        checked={formData.consultationType === type.id}
                        onChange={(e) => setFormData({...formData, consultationType: e.target.value})}
                        className="sr-only"
                      />
                      <div className="font-semibold text-gray-900 dark:text-white mb-1">
                        {type.label}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {type.duration} • {type.price}
                      </div>
                    </label>
                  ))}
                </div>
                {errors.consultationType && (
                  <p className="text-red-500 text-sm mt-1">{errors.consultationType}</p>
                )}
              </div>

              {/* Date Selection */}
              <div>
                <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
                  Предпочтительная дата*
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({...formData, preferredDate: e.target.value})}
                    min={getMinDate()}
                    max={getMaxDate()}
                    className={`w-full pl-10 pr-4 py-3 border rounded-md focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white ${
                      errors.preferredDate ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                    }`}
                  />
                </div>
                {errors.preferredDate && (
                  <p className="text-red-500 text-sm mt-1">{errors.preferredDate}</p>
                )}
              </div>

              {/* Time Selection */}
              <div>
                <label className="block mb-3 font-semibold text-gray-700 dark:text-gray-300">
                  Предпочтительное время*
                </label>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot.id}
                      type="button"
                      disabled={!slot.available}
                      onClick={() => setFormData({...formData, preferredTime: slot.time})}
                      className={`p-3 text-sm font-semibold rounded-md transition-colors ${
                        !slot.available
                          ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                          : formData.preferredTime === slot.time
                          ? 'bg-primary text-white'
                          : 'bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-primary/10'
                      }`}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
                {errors.preferredTime && (
                  <p className="text-red-500 text-sm mt-1">{errors.preferredTime}</p>
                )}
              </div>

              {/* Urgency */}
              <div>
                <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
                  Срочность
                </label>
                <select
                  value={formData.urgency}
                  onChange={(e) => setFormData({...formData, urgency: e.target.value})}
                  className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white"
                >
                  <option value="normal">Обычная</option>
                  <option value="urgent">Срочная (в течение 24 часов)</option>
                  <option value="emergency">Экстренная (в течение 2 часов)</option>
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
                  Описание задачи
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={4}
                  className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white"
                  placeholder="Опишите вашу задачу или вопросы, которые хотите обсудить..."
                />
              </div>
            </div>
          )}

          {/* Step 3: Confirmation */}
          {step === 3 && (
            <div className="space-y-6">
              <h3 className="font-heading font-semibold text-h3-desktop text-primary dark:text-white">
                Подтверждение записи
              </h3>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                  Детали консультации
                </h4>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Клиент:</span>
                    <span className="font-semibold">{formData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Телефон:</span>
                    <span className="font-semibold">{formData.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Email:</span>
                    <span className="font-semibold">{formData.email}</span>
                  </div>
                  {formData.address && (
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Адрес:</span>
                      <span className="font-semibold">{formData.address}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Тип:</span>
                    <span className="font-semibold">{selectedConsultationType?.label}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Дата:</span>
                    <span className="font-semibold">
                      {new Date(formData.preferredDate).toLocaleDateString('ru-RU')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Время:</span>
                    <span className="font-semibold">{formData.preferredTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Длительность:</span>
                    <span className="font-semibold">{selectedConsultationType?.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Стоимость:</span>
                    <span className="font-semibold text-primary">{selectedConsultationType?.price}</span>
                  </div>
                </div>
              </div>

              {formData.description && (
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                  <h5 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">
                    Описание задачи:
                  </h5>
                  <p className="text-blue-800 dark:text-blue-300 text-sm">
                    {formData.description}
                  </p>
                </div>
              )}

              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
                <h5 className="font-semibold text-yellow-900 dark:text-yellow-200 mb-2">
                  Важная информация:
                </h5>
                <ul className="text-yellow-800 dark:text-yellow-300 text-sm space-y-1">
                  <li>• Подтверждение записи придет на указанный email</li>
                  <li>• За 1 час до консультации вам позвонит специалист</li>
                  <li>• Отменить или перенести можно за 2 часа до встречи</li>
                  <li>• При выезде на объект возможна доплата за транспорт</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t dark:border-gray-700 flex justify-between">
          {step > 1 && (
            <button
              onClick={prevStep}
              className="px-6 py-3 border border-gray-300 dark:border-gray-700 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Назад
            </button>
          )}
          
          <div className="ml-auto">
            {step < 3 ? (
              <button
                onClick={nextStep}
                className="px-6 py-3 bg-primary text-white rounded-md hover:bg-opacity-90 transition-colors"
              >
                Далее
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-6 py-3 bg-accent text-white rounded-md hover:bg-opacity-90 transition-colors"
              >
                Подтвердить запись
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultationBooking;