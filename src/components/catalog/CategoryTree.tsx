import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronRight, ChevronDown, Folder, FolderOpen } from 'lucide-react';
import { VentilationCategory } from '../../data/ventilationData';

interface CategoryTreeProps {
  categories: VentilationCategory[];
  level?: number;
  onCategoryClick?: (category: VentilationCategory) => void;
}

const CategoryTree: React.FC<CategoryTreeProps> = ({ 
  categories, 
  level = 0, 
  onCategoryClick 
}) => {
  const { category: currentCategory } = useParams<{ category: string }>();
  const [expandedCategories, setExpandedCategories] = useState<Set<number>>(new Set());

  const toggleCategory = (categoryId: number) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const getCategorySlug = (categoryTitle: string): string => {
    const slugs: { [key: string]: string } = {
      "Вентиляторы": "ventilyatory",
      "Вентиляционные установки": "ventilyatsionnye-ustanovki",
      "Сетевые элементы": "setevye-elementy",
      "Автоматика": "avtomatika",
      "Вентиляционные решетки": "ventilyatsionnye-reshetki",
      "Диффузоры": "diffuzory",
      "Анемостаты": "anemostaty",
      "Воздуховоды": "vozdukhovody",
      // Подкатегории
      "Канальные вентиляторы": "kanalnye-ventilyatory",
      "Осевые вентиляторы": "osevye-ventilyatory",
      "Крышные вентиляторы": "kryshnye-ventilyatory",
      "Центробежные вентиляторы": "tsentrobezhnye-ventilyatory",
      "Приточно-вытяжные установки": "pritochno-vytyazhnye-ustanovki",
      "Приточные установки": "pritochnye-ustanovki",
      "Фасонные изделия": "fasonnye-izdeliya",
      "Крепления": "krepleniya",
      "Изоляция": "izolyatsiya",
      "Датчики": "datchiki",
      "Контроллеры": "kontrollery",
      "Приводы": "privody",
      "Приточные решетки": "pritochnye-reshetki",
      "Вытяжные решетки": "vytyazhnye-reshetki",
      "Универсальные решетки": "universalnye-reshetki",
      "Круглые диффузоры": "kruglye-diffuzory",
      "Прямоугольные диффузоры": "pryamougolnye-diffuzory",
      "Линейные диффузоры": "lineynye-diffuzory",
      "Приточные анемостаты": "pritochnye-anemostaty",
      "Вытяжные анемостаты": "vytyazhnye-anemostaty",
      "Универсальные анемостаты": "universalnye-anemostaty",
      "Круглые воздуховоды": "kruglye-vozdukhovody",
      "Прямоугольные воздуховоды": "pryamougolnye-vozdukhovody",
      // Под-подкатегории
      "Круглые канальные": "kruglye-kanalnye",
      "Прямоугольные канальные": "pryamougolnye-kanalnye",
      "Настенные осевые": "nastennye-osevye",
      "Потолочные осевые": "potolochnye-osevye",
      "Компактные ПВУ": "kompaktnye-pvu",
      "Наборные ПВУ": "nabornye-pvu",
      "Отводы": "otvody",
      "Тройники": "troyniki",
      "Переходы": "perekhody",
      "Датчики температуры": "datchiki-temperatury",
      "Датчики влажности": "datchiki-vlazhnosti",
      "Датчики давления": "datchiki-davleniya",
      "Оцинкованные круглые": "otsinkovannye-kruglye",
      "Пластиковые круглые": "plastikovye-kruglye",
      "Оцинкованные прямоугольные": "otsinkovannye-pryamougolnye",
      "Пластиковые прямоугольные": "plastikovye-pryamougolnye"
    };
    
    return slugs[categoryTitle] || categoryTitle.toLowerCase().replace(/\s+/g, '-');
  };

  const renderCategory = (category: VentilationCategory) => {
    const isExpanded = expandedCategories.has(category.id);
    const hasSubcategories = category.subcategories && category.subcategories.length > 0;
    const categorySlug = getCategorySlug(category.title);
    const isActive = currentCategory === categorySlug;

    return (
      <div key={category.id} className="w-full">
        <div 
          className={`
            flex items-center justify-between p-3 rounded-lg transition-colors cursor-pointer
            ${isActive 
              ? 'bg-primary text-white' 
              : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            }
            ${level > 0 ? 'ml-4' : ''}
          `}
          onClick={() => {
            if (hasSubcategories) {
              toggleCategory(category.id);
            }
            if (onCategoryClick) {
              onCategoryClick(category);
            }
          }}
        >
          <div className="flex items-center space-x-2">
            {hasSubcategories && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleCategory(category.id);
                }}
                className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
              >
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>
            )}
            {hasSubcategories ? (
              isExpanded ? (
                <FolderOpen className="h-4 w-4" />
              ) : (
                <Folder className="h-4 w-4" />
              )
            ) : (
              <div className="w-4 h-4" />
            )}
            <Link
              to={`/catalog/${categorySlug}`}
              className="flex-1 text-left hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="font-medium">{category.title}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                ({category.productCount})
              </span>
            </Link>
          </div>
        </div>
        
        {hasSubcategories && isExpanded && (
          <div className="mt-1">
            <CategoryTree
              categories={category.subcategories}
              level={level + 1}
              onCategoryClick={onCategoryClick}
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-1">
      {categories.map(renderCategory)}
    </div>
  );
};

export default CategoryTree; 