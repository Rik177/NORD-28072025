import React, { useState } from 'react';
import { Calculator, Info, Download, Share2, RotateCcw } from 'lucide-react';

interface CalculationParams {
  roomType: string;
  area: number;
  height: number;
  peopleCount: number;
  hasKitchen: boolean;
  hasBathroom: boolean;
  hasSmokingArea: boolean;
  airChangeRate?: number;
}

interface CalculationResult {
  requiredAirflow: number;
  recommendedFanPower: number;
  ductDiameter: number;
  estimatedCost: number;
  recommendations: string[];
}

const roomTypes = [
  { id: 'residential', label: 'Жилое помещение', airChangeRate: 1 },
  { id: 'office', label: 'Офис', airChangeRate: 2 },
  { id: 'restaurant', label: 'Ресторан/кафе', airChangeRate: 8 },
  { id: 'shop', label: 'Магазин', airChangeRate: 2 },
  { id: 'warehouse', label: 'Склад', airChangeRate: 1 },
  { id: 'gym', label: 'Спортзал', airChangeRate: 6 },
  { id: 'medical', label: 'Медицинское учреждение', airChangeRate: 6 },
  { id: 'industrial', label: 'Производство', airChangeRate: 10 }
];

const VentilationCalculator: React.FC = () => {
  const [params, setParams] = useState<CalculationParams>({
    roomType: 'residential',
    area: 0,
    height: 2.7,
    peopleCount: 1,
    hasKitchen: false,
    hasBathroom: false,
    hasSmokingArea: false
  });
  
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const calculateVentilation = () => {
    const roomTypeData = roomTypes.find(type => type.id === params.roomType);
    const baseAirChangeRate = roomTypeData?.airChangeRate || 1;
    
    // Базовый расчет по кратности воздухообмена
    const roomVolume = params.area * params.height;
    let requiredAirflow = roomVolume * baseAirChangeRate;
    
    // Корректировка по количеству людей (30 м³/ч на человека)
    const peopleAirflow = params.peopleCount * 30;
    requiredAirflow = Math.max(requiredAirflow, peopleAirflow);
    
    // Дополнительные корректировки
    if (params.hasKitchen) requiredAirflow += 100;
    if (params.hasBathroom) requiredAirflow += 50;
    if (params.hasSmokingArea) requiredAirflow += 200;
    
    // Рекомендуемая мощность вентилятора (с запасом 20%)
    const recommendedFanPower = Math.ceil(requiredAirflow * 1.2);
    
    // Диаметр воздуховода (упрощенный расчет)
    const velocity = 3; // м/с - рекомендуемая скорость
    const ductArea = (requiredAirflow / 3600) / velocity; // м²
    const ductDiameter = Math.ceil(Math.sqrt(ductArea / Math.PI) * 2000); // мм
    
    // Примерная стоимость
    const baseCost = params.area * 1500; // базовая стоимость за м²
    const equipmentCost = recommendedFanPower * 50; // стоимость оборудования
    const estimatedCost = baseCost + equipmentCost;
    
    // Рекомендации
    const recommendations = [];
    
    if (requiredAirflow < 100) {
      recommendations.push('Для небольших помещений рекомендуется естественная вентиляция');
    }
    
    if (params.hasKitchen) {
      recommendations.push('Установите вытяжку над плитой мощностью не менее 500 м³/ч');
    }
    
    if (params.hasBathroom) {
      recommendations.push('В санузле необходим отдельный вытяжной вентилятор');
    }
    
    if (baseAirChangeRate >= 6) {
      recommendations.push('Рекомендуется установка приточно-вытяжной системы с рекуперацией');
    }
    
    if (ductDiameter > 200) {
      recommendations.push('Для больших воздуховодов рассмотрите прямоугольное сечение');
    }
    
    recommendations.push('Обязательно предусмотрите систему фильтрации воздуха');
    recommendations.push('Рекомендуется автоматическое управление системой');

    setResult({
      requiredAirflow: Math.ceil(requiredAirflow),
      recommendedFanPower,
      ductDiameter,
      estimatedCost,
      recommendations
    });
  };

  const resetCalculator = () => {
    setParams({
      roomType: 'residential',
      area: 0,
      height: 2.7,
      peopleCount: 1,
      hasKitchen: false,
      hasBathroom: false,
      hasSmokingArea: false
    });
    setResult(null);
    setShowDetails(false);
  };

  const exportResults = () => {
    if (!result) return;
    
    const data = {
      parameters: params,
      results: result,
      calculatedAt: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ventilation-calculation.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-card p-6">
      <div className="flex items-center mb-6">
        <Calculator className="h-8 w-8 text-primary mr-3" />
        <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-primary dark:text-white">
          Калькулятор мощности вентиляции
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Parameters */}
        <div className="space-y-6">
          <h3 className="font-heading font-semibold text-h3-desktop text-primary dark:text-white">
            Параметры помещения
          </h3>

          {/* Room Type */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
              Тип помещения*
            </label>
            <select
              value={params.roomType}
              onChange={(e) => setParams({...params, roomType: e.target.value})}
              className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white"
            >
              {roomTypes.map(type => (
                <option key={type.id} value={type.id}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* Area */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
              Площадь помещения, м²*
            </label>
            <input
              type="number"
              min="1"
              value={params.area || ''}
              onChange={(e) => setParams({...params, area: Number(e.target.value)})}
              className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white"
              placeholder="Введите площадь"
            />
          </div>

          {/* Height */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
              Высота потолков, м*
            </label>
            <input
              type="number"
              min="2"
              max="10"
              step="0.1"
              value={params.height}
              onChange={(e) => setParams({...params, height: Number(e.target.value)})}
              className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white"
            />
          </div>

          {/* People Count */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
              Количество людей*
            </label>
            <input
              type="number"
              min="1"
              value={params.peopleCount}
              onChange={(e) => setParams({...params, peopleCount: Number(e.target.value)})}
              className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white"
            />
          </div>

          {/* Additional Options */}
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-700 dark:text-gray-300">
              Дополнительные параметры
            </h4>
            
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={params.hasKitchen}
                onChange={(e) => setParams({...params, hasKitchen: e.target.checked})}
                className="mr-2 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span className="text-gray-700 dark:text-gray-300">Есть кухня</span>
            </label>
            
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={params.hasBathroom}
                onChange={(e) => setParams({...params, hasBathroom: e.target.checked})}
                className="mr-2 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span className="text-gray-700 dark:text-gray-300">Есть санузел</span>
            </label>
            
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={params.hasSmokingArea}
                onChange={(e) => setParams({...params, hasSmokingArea: e.target.checked})}
                className="mr-2 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span className="text-gray-700 dark:text-gray-300">Есть курительная зона</span>
            </label>
          </div>

          {/* Calculate Button */}
          <div className="flex space-x-4">
            <button
              onClick={calculateVentilation}
              disabled={!params.area || params.area <= 0}
              className="flex-1 bg-primary hover:bg-opacity-90 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-md transition-colors"
            >
              Рассчитать
            </button>
            <button
              onClick={resetCalculator}
              className="p-3 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              title="Сбросить"
            >
              <RotateCcw className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {result ? (
            <>
              <div className="flex items-center justify-between">
                <h3 className="font-heading font-semibold text-h3-desktop text-primary dark:text-white">
                  Результаты расчета
                </h3>
                <div className="flex space-x-2">
                  <button
                    onClick={exportResults}
                    className="p-2 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    title="Экспорт результатов"
                  >
                    <Download className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => navigator.share && navigator.share({
                      title: 'Расчет вентиляции',
                      text: `Требуемый воздухообмен: ${result.requiredAirflow} м³/ч`
                    })}
                    className="p-2 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    title="Поделиться"
                  >
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Main Results */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">
                    Воздухообмен
                  </h4>
                  <p className="text-2xl font-bold text-blue-900 dark:text-blue-200">
                    {result.requiredAirflow} м³/ч
                  </p>
                </div>
                
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">
                    Мощность вентилятора
                  </h4>
                  <p className="text-2xl font-bold text-green-900 dark:text-green-200">
                    {result.recommendedFanPower} м³/ч
                  </p>
                </div>
                
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-800 dark:text-purple-300 mb-2">
                    Диаметр воздуховода
                  </h4>
                  <p className="text-2xl font-bold text-purple-900 dark:text-purple-200">
                    {result.ductDiameter} мм
                  </p>
                </div>
                
                <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
                  <h4 className="font-semibold text-orange-800 dark:text-orange-300 mb-2">
                    Примерная стоимость
                  </h4>
                  <p className="text-2xl font-bold text-orange-900 dark:text-orange-200">
                    {result.estimatedCost.toLocaleString()} ₽
                  </p>
                </div>
              </div>

              {/* Recommendations */}
              <div>
                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className="flex items-center w-full text-left font-semibold text-primary dark:text-white mb-3"
                >
                  <Info className="h-5 w-5 mr-2" />
                  Рекомендации специалистов
                  <span className="ml-auto">{showDetails ? '−' : '+'}</span>
                </button>
                
                {showDetails && (
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <ul className="space-y-2">
                      {result.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-primary mr-2">•</span>
                          <span className="text-gray-700 dark:text-gray-300">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* CTA */}
              <div className="bg-primary rounded-lg p-6 text-center">
                <h4 className="font-heading font-bold text-white mb-3">
                  Нужна профессиональная консультация?
                </h4>
                <p className="text-white/90 mb-4">
                  Наши инженеры помогут уточнить расчеты и подобрать оптимальное оборудование
                </p>
                <button className="bg-accent hover:bg-opacity-90 text-white font-semibold py-3 px-6 rounded-md transition-colors">
                  Заказать консультацию
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-64 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="text-center">
                <Calculator className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">
                  Заполните параметры помещения и нажмите "Рассчитать"
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VentilationCalculator;