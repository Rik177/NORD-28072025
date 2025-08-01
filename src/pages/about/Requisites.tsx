import React from 'react';
import Header from '../../components/home/Header';
import Footer from '../../components/home/Footer';
import Breadcrumbs from '../../components/shared/Breadcrumbs';
import { FileText, Download, Copy, CheckCircle } from 'lucide-react';

const Requisites: React.FC = () => {
  const [copySuccess, setCopySuccess] = React.useState<string | null>(null);

  const requisites = {
    name: 'ООО "НОРДИНЖИНИРИНГ"',
    inn: '1234567890',
    kpp: '123456789',
    ogrn: '1234567890123',
    address: '123456, г. Москва, ул. Примерная, д. 123',
    mail: '123456, г. Москва, ул. Примерная, д. 123',
    director: 'Петров Александр Иванович',
    bank: 'АО "БАНК"',
    account: '40702810123456789012',
    corr: '30101810123456789012',
    bik: '044525225'
  };

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(field);
      setTimeout(() => setCopySuccess(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main className="pb-12">
        <Breadcrumbs />
        
        {/* Hero Section */}
        <section className="bg-primary py-12">
          <div className="container mx-auto px-4">
            <h1 className="font-heading font-bold text-h1-mobile md:text-h1-desktop text-white text-center mb-6">
              Реквизиты компании
            </h1>
            <p className="text-white/90 text-center max-w-2xl mx-auto">
              Юридическая информация о компании НОРДИНЖИНИРИНГ
            </p>
          </div>
        </section>

        {/* Requisites Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-card p-8">
                <div className="flex justify-between items-start mb-8">
                  <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-primary dark:text-white">
                    Реквизиты
                  </h2>
                  <button className="flex items-center text-primary hover:text-secondary transition-colors">
                    <Download className="h-5 w-5 mr-2" />
                    <span>Скачать PDF</span>
                  </button>
                </div>

                <div className="space-y-6">
                  {Object.entries(requisites).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center py-3 border-b dark:border-gray-700">
                      <div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                          {key.toUpperCase()}
                        </div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {value}
                        </div>
                      </div>
                      <button
                        onClick={() => copyToClipboard(value, key)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                        title="Копировать"
                      >
                        {copySuccess === key ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <Copy className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-card p-8">
                <h3 className="font-heading font-semibold text-h3-mobile md:text-h3-desktop text-primary dark:text-white mb-4">
                  Дополнительные документы
                </h3>
                <div className="space-y-4">
                  <a
                    href="#"
                    className="flex items-center justify-between p-4 bg-lightBg dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  >
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-primary mr-3" />
                      <span className="text-gray-700 dark:text-gray-300">Свидетельство о регистрации</span>
                    </div>
                    <Download className="h-5 w-5 text-gray-400" />
                  </a>
                  <a
                    href="#"
                    className="flex items-center justify-between p-4 bg-lightBg dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  >
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-primary mr-3" />
                      <span className="text-gray-700 dark:text-gray-300">Выписка из ЕГРЮЛ</span>
                    </div>
                    <Download className="h-5 w-5 text-gray-400" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Requisites;