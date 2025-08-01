import React, { useState } from 'react';
import { Filter, X, ChevronDown, ChevronUp } from 'lucide-react';

interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

interface FilterGroup {
  id: string;
  label: string;
  type: 'checkbox' | 'range' | 'radio';
  options?: FilterOption[];
  min?: number;
  max?: number;
  value?: any;
}

interface ProductFiltersProps {
  isOpen: boolean;
  onClose: () => void;
  onFiltersChange: (filters: Record<string, any>) => void;
  category?: string;
}

const filterGroups: FilterGroup[] = [
  {
    id: 'brand',
    label: 'Бренд',
    type: 'checkbox',
    options: [
      { id: 'daikin', label: 'Daikin', count: 24 },
      { id: 'mitsubishi', label: 'Mitsubishi', count: 18 },
      { id: 'carrier', label: 'Carrier', count: 15 },
      { id: 'toshiba', label: 'Toshiba', count: 12 },
      { id: 'panasonic', label: 'Panasonic', count: 9 }
    ]
  },
  {
    id: 'price',
    label: 'Цена, ₽',
    type: 'range',
    min: 0,
    max: 200000
  },
  {
    id: 'power',
    label: 'Мощность, кВт',
    type: 'checkbox',
    options: [
      { id: '1-2', label: '1-2 кВт', count: 32 },
      { id: '2-3', label: '2-3 кВт', count: 28 },
      { id: '3-5', label: '3-5 кВт', count: 24 },
      { id: '5-7', label: '5-7 кВт', count: 16 },
      { id: '7+', label: 'Более 7 кВт', count: 8 }
    ]
  },
  {
    id: 'efficiency',
    label: 'Класс энергоэффективности',
    type: 'checkbox',
    options: [
      { id: 'a+++', label: 'A+++', count: 15 },
      { id: 'a++', label: 'A++', count: 42 },
      { id: 'a+', label: 'A+', count: 28 },
      { id: 'a', label: 'A', count: 18 }
    ]
  },
  {
    id: 'type',
    label: 'Тип установки',
    type: 'checkbox',
    options: [
      { id: 'wall', label: 'Настенный', count: 56 },
      { id: 'ceiling', label: 'Потолочный', count: 24 },
      { id: 'floor', label: 'Напольный', count: 18 },
      { id: 'cassette', label: 'Кассетный', count: 12 }
    ]
  },
  {
    id: 'features',
    label: 'Дополнительные функции',
    type: 'checkbox',
    options: [
      { id: 'wifi', label: 'Wi-Fi управление', count: 34 },
      { id: 'inverter', label: 'Инверторное управление', count: 67 },
      { id: 'heating', label: 'Обогрев', count: 89 },
      { id: 'self-clean', label: 'Самоочистка', count: 23 },
      { id: 'ion', label: 'Ионизация', count: 18 }
    ]
  }
];

const ProductFilters: React.FC<ProductFiltersProps> = ({
  isOpen,
  onClose,
  onFiltersChange,
  category
}) => {
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(['brand', 'price']));
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200000]);

  const toggleGroup = (groupId: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(groupId)) {
      newExpanded.delete(groupId);
    } else {
      newExpanded.add(groupId);
    }
    setExpandedGroups(newExpanded);
  };

  const handleCheckboxChange = (groupId: string, optionId: string, checked: boolean) => {
    const newFilters = { ...filters };
    if (!newFilters[groupId]) {
      newFilters[groupId] = [];
    }
    
    if (checked) {
      newFilters[groupId] = [...newFilters[groupId], optionId];
    } else {
      newFilters[groupId] = newFilters[groupId].filter((id: string) => id !== optionId);
    }
    
    if (newFilters[groupId].length === 0) {
      delete newFilters[groupId];
    }
    
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handlePriceChange = (min: number, max: number) => {
    setPriceRange([min, max]);
    const newFilters = { ...filters, price: [min, max] };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    setFilters({});
    setPriceRange([0, 200000]);
    onFiltersChange({});
  };

  const getActiveFiltersCount = () => {
    return Object.keys(filters).length;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex">
      <div className="bg-white dark:bg-gray-900 w-full max-w-sm h-full overflow-y-auto">
        {/* Header */}
        <div className="p-4 border-b dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            <h2 className="font-semibold text-lg">Фильтры</h2>
            {getActiveFiltersCount() > 0 && (
              <span className="ml-2 bg-primary text-white text-xs px-2 py-1 rounded-full">
                {getActiveFiltersCount()}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Filters */}
        <div className="p-4">
          {filterGroups.map((group) => (
            <div key={group.id} className="mb-6">
              <button
                onClick={() => toggleGroup(group.id)}
                className="flex items-center justify-between w-full mb-3 text-left"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {group.label}
                </h3>
                {expandedGroups.has(group.id) ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </button>

              {expandedGroups.has(group.id) && (
                <div className="space-y-2">
                  {group.type === 'checkbox' && group.options && (
                    <div className="space-y-2">
                      {group.options.map((option) => (
                        <label
                          key={option.id}
                          className="flex items-center cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={filters[group.id]?.includes(option.id) || false}
                            onChange={(e) =>
                              handleCheckboxChange(group.id, option.id, e.target.checked)
                            }
                            className="mr-2 rounded border-gray-300 text-primary focus:ring-primary"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300 flex-1">
                            {option.label}
                          </span>
                          {option.count && (
                            <span className="text-xs text-gray-500">
                              ({option.count})
                            </span>
                          )}
                        </label>
                      ))}
                    </div>
                  )}

                  {group.type === 'range' && group.id === 'price' && (
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <input
                          type="number"
                          placeholder="От"
                          value={priceRange[0]}
                          onChange={(e) =>
                            handlePriceChange(Number(e.target.value), priceRange[1])
                          }
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md text-sm"
                        />
                        <span className="text-gray-500">—</span>
                        <input
                          type="number"
                          placeholder="До"
                          value={priceRange[1]}
                          onChange={(e) =>
                            handlePriceChange(priceRange[0], Number(e.target.value))
                          }
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md text-sm"
                        />
                      </div>
                      <div className="relative">
                        <input
                          type="range"
                          min={group.min}
                          max={group.max}
                          value={priceRange[0]}
                          onChange={(e) =>
                            handlePriceChange(Number(e.target.value), priceRange[1])
                          }
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <input
                          type="range"
                          min={group.min}
                          max={group.max}
                          value={priceRange[1]}
                          onChange={(e) =>
                            handlePriceChange(priceRange[0], Number(e.target.value))
                          }
                          className="absolute top-0 w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t dark:border-gray-700 space-y-3">
          <button
            onClick={clearFilters}
            className="w-full py-2 px-4 border border-gray-300 dark:border-gray-700 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Сбросить фильтры
          </button>
          <button
            onClick={onClose}
            className="w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-opacity-90 transition-colors"
          >
            Применить фильтры
          </button>
        </div>
      </div>
      
      {/* Overlay */}
      <div className="flex-1" onClick={onClose} />
    </div>
  );
};

export default ProductFilters;