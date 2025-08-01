import React from 'react';
import { ProductApplication } from '../../data/productData';

interface ProductApplicationsProps {
  applications: ProductApplication[];
  productName: string;
}

const ProductApplications: React.FC<ProductApplicationsProps> = ({ applications, productName }) => {
  return (
    <div>
      <h3 className="font-heading font-bold text-h3-desktop text-primary dark:text-white mb-6">
        Сферы применения
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {applications.map((application, index) => (
          <div key={index} className="bg-lightBg dark:bg-gray-800 rounded-lg p-6 hover:shadow-card transition-shadow">
            <div className="flex items-center mb-4">
              <div className="bg-white dark:bg-gray-700 rounded-lg p-3 mr-4">
                {application.icon}
              </div>
              <h4 className="font-heading font-semibold text-lg text-primary dark:text-white">
                {application.title}
              </h4>
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {application.description}
            </p>
          </div>
        ))}
      </div>
      
      <div className="bg-secondary/10 rounded-lg p-6">
        <h4 className="font-heading font-semibold text-lg text-primary dark:text-white mb-4">
          Рекомендации по выбору
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h5 className="font-semibold text-primary dark:text-white mb-2">
                Правильный выбор оборудования:
              </h5>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• Учитывайте площадь и высоту помещения</li>
                <li>• Определите тепловые нагрузки</li>
                <li>• Рассмотрите режим эксплуатации</li>
              </ul>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <h5 className="font-semibold text-primary dark:text-white mb-2">
                Дополнительные факторы:
              </h5>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• Количество людей в помещении</li>
                <li>• Наличие тепловыделяющего оборудования</li>
                <li>• Требования к уровню шума</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-white dark:bg-gray-700 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            <strong>Совет эксперта:</strong> Для точного подбора оборудования рекомендуется провести 
            теплотехнический расчет с учетом всех особенностей объекта. Наши специалисты помогут 
            выбрать оптимальное решение для ваших задач.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductApplications;