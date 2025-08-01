import React from 'react';
import { Helmet } from 'react-helmet-async';
import VentilationCatalog from '../components/VentilationCatalog';

const VentilationPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Каталог вентиляции - Климатическая компания</title>
        <meta name="description" content="Полный каталог вентиляционного оборудования. Вентиляторы, воздуховоды, решетки, клапаны и другие компоненты систем вентиляции." />
        <meta name="keywords" content="вентиляция, вентиляторы, воздуховоды, решетки, клапаны, вентиляционное оборудование" />
        <link rel="canonical" href="/ventilation" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-4">
                <li>
                  <div>
                    <a href="/" className="text-gray-400 hover:text-gray-500">
                      Главная
                    </a>
                  </div>
                </li>
                <li>
                  <div className="flex items-center">
                    <svg className="flex-shrink-0 h-5 w-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="ml-4 text-sm font-medium text-gray-500">Вентиляция</span>
                  </div>
                </li>
              </ol>
            </nav>
          </div>
        </div>

        <VentilationCatalog className="py-8" />

        {/* Дополнительная информация */}
        <div className="bg-white border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  О вентиляционном оборудовании
                </h3>
                <p className="text-gray-600">
                  Вентиляционное оборудование является важнейшей частью любой системы вентиляции. 
                  От правильного выбора оборудования зависит эффективность воздухообмена и комфорт в помещении.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Типы вентиляционного оборудования
                </h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• Вентиляторы (канальные, крышные, осевые)</li>
                  <li>• Воздуховоды и фасонные изделия</li>
                  <li>• Решетки и диффузоры</li>
                  <li>• Клапаны и заслонки</li>
                  <li>• Фильтры и очистители воздуха</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Консультация специалистов
                </h3>
                <p className="text-gray-600 mb-4">
                  Наши специалисты помогут подобрать оптимальное вентиляционное оборудование 
                  для вашего проекта.
                </p>
                <a
                  href="/contact"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Получить консультацию
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VentilationPage; 