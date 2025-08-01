import React from "react";
import SEOHelmet from "../components/shared/SEOHelmet";
import Header from "../components/home/Header";
import Footer from "../components/home/Footer";
import Breadcrumbs from "../components/shared/Breadcrumbs";
import { MapPin, Phone, Mail, Clock, FileText } from "lucide-react";
import { seoPages } from "../utils/seo";
import { localBusinessSchema } from "../utils/schema";

const Contacts: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <SEOHelmet {...seoPages.contacts} structuredData={localBusinessSchema} />
      <Header />
      <main className="pb-12">
        <Breadcrumbs />
        {/* Hero Section */}
        <section className="bg-primary py-12">
          <div className="container mx-auto px-4">
            <h1 className="font-heading font-bold text-h1-mobile md:text-h1-desktop text-white text-center mb-6">
              Контакты
            </h1>
            <p className="text-white/90 text-center max-w-2xl mx-auto">
              Свяжитесь с нами любым удобным способом. Мы всегда рады помочь вам
              с выбором оборудования и ответить на все вопросы.
            </p>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-12 bg-lightBg dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 -mt-20">
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-card p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-primary/10 rounded-full p-4">
                    <MapPin className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="font-heading font-semibold text-h4-desktop mb-2">
                  Адрес
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  123456, г. Москва,
                  <br />
                  ул. Примерная, д. 123
                </p>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-card p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-primary/10 rounded-full p-4">
                    <Phone className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="font-heading font-semibold text-h4-desktop mb-2">
                  Телефоны
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  <a href="tel:+71234567890" className="hover:text-primary">
                    +7 (123) 456-78-90
                  </a>
                  <br />
                  <a href="tel:+71234567891" className="hover:text-primary">
                    +7 (123) 456-78-91
                  </a>
                </p>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-card p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-primary/10 rounded-full p-4">
                    <Mail className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="font-heading font-semibold text-h4-desktop mb-2">
                  Email
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  <a
                    href="mailto:info@nordengineering.ru"
                    className="hover:text-primary"
                  >
                    info@nordengineering.ru
                  </a>
                </p>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-card p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-primary/10 rounded-full p-4">
                    <Clock className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="font-heading font-semibold text-h4-desktop mb-2">
                  Режим работы
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Пн-Пт: 9:00 - 18:00
                  <br />
                  Сб-Вс: выходной
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Map and Form Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 gap-8">
              {/* Map */}
              <div className="h-[400px] rounded-lg overflow-hidden shadow-card">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2245.5887738696547!2d37.6173!3d55.7558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTXCsDQ1JzIwLjkiTiAzN8KwMzcnMDIuMyJF!5e0!3m2!1sen!2sus!4v1621436289564!5m2!1sen!2sus"
                  className="w-full h-full border-0"
                  loading="lazy"
                  title="Карта расположения компании"
                />
              </div>

              {/* Contact Form */}
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-card p-6">
                <h2 className="font-heading font-bold text-h3-mobile md:text-h3-desktop text-primary dark:text-white mb-6">
                  Напишите нам
                </h2>
                <form className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 font-semibold text-gray-700 dark:text-gray-300"
                    >
                      Ваше имя*
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full p-3 rounded-md bg-lightBg dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block mb-2 font-semibold text-gray-700 dark:text-gray-300"
                    >
                      Телефон*
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full p-3 rounded-md bg-lightBg dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 font-semibold text-gray-700 dark:text-gray-300"
                    >
                      Email*
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full p-3 rounded-md bg-lightBg dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block mb-2 font-semibold text-gray-700 dark:text-gray-300"
                    >
                      Сообщение
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full p-3 rounded-md bg-lightBg dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
                    ></textarea>
                  </div>
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="agreement"
                      className="mt-1 mr-2 cursor-pointer"
                      required
                    />
                    <label
                      htmlFor="agreement"
                      className="text-sm text-gray-600 dark:text-gray-400"
                    >
                      Я согласен на обработку персональных данных в соответствии
                      с{" "}
                      <a href="#" className="text-primary hover:text-secondary">
                        политикой конфиденциальности
                      </a>
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-primary hover:bg-opacity-90 text-white font-semibold py-3 px-6 rounded-md transition-colors"
                  >
                    Отправить сообщение
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Company Details */}
        <section className="py-12 bg-lightBg dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="font-heading font-bold text-h3-mobile md:text-h3-desktop text-primary dark:text-white mb-6">
                  Реквизиты компании
                </h2>
                <div className="bg-white dark:bg-gray-900 rounded-lg shadow-card p-6">
                  <div className="space-y-4">
                    <div>
                      <div className="font-semibold text-primary dark:text-white">
                        Полное наименование:
                      </div>
                      <div className="text-gray-600 dark:text-gray-400">
                        ООО "НОРДИНЖИНИРИНГ"
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold text-primary dark:text-white">
                        ИНН:
                      </div>
                      <div className="text-gray-600 dark:text-gray-400">
                        1234567890
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold text-primary dark:text-white">
                        КПП:
                      </div>
                      <div className="text-gray-600 dark:text-gray-400">
                        123456789
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold text-primary dark:text-white">
                        ОГРН:
                      </div>
                      <div className="text-gray-600 dark:text-gray-400">
                        1234567890123
                      </div>
                    </div>
                    <button className="flex items-center text-primary hover:text-secondary">
                      <FileText className="h-5 w-5 mr-2" />
                      <span>Скачать реквизиты</span>
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="font-heading font-bold text-h3-mobile md:text-h3-desktop text-primary dark:text-white mb-6">
                  Схема проезда
                </h2>
                <div className="bg-white dark:bg-gray-900 rounded-lg shadow-card p-6">
                  <div className="space-y-4">
                    <div>
                      <div className="font-semibold text-primary dark:text-white">
                        На автомобиле:
                      </div>
                      <div className="text-gray-600 dark:text-gray-400">
                        Описание маршрута на автомобиле...
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold text-primary dark:text-white">
                        На общественном транспорте:
                      </div>
                      <div className="text-gray-600 dark:text-gray-400">
                        От метро "Название" - автобусы №123, №456 до остановки
                        "Название"
                      </div>
                    </div>
                  </div>
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

export default Contacts;
