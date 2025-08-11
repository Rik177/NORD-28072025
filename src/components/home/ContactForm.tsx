import React from 'react';
import EnhancedContactForm from '../shared/EnhancedContactForm';

const ContactForm: React.FC = () => {
  const handleSubmit = async (data: any) => {
    // Здесь будет логика отправки на сервер
    
    
    // Симуляция API запроса
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Ошибка отправки формы');
    }
    
    return response.json();
  };

  return (
    <section className="py-12 bg-lightBg text-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <EnhancedContactForm
            onSubmit={handleSubmit}
            title="Остались вопросы?"
            description="Оставьте заявку, и наш специалист свяжется с вами в ближайшее время"
            className="bg-white/10 backdrop-blur-sm border border-white/20"
          />
        </div>
      </div>
    </section>
  );
};

export default ContactForm;