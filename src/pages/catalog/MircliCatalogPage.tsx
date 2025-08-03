import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MircliCatalog from '../../components/catalog/MircliCatalog';
import SEOHelmet from '../../components/shared/SEOHelmet';

interface MircliProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  images: Array<{ url: string; alt: string }>;
  rating: number;
  reviewCount: number;
  brand: string;
  category: string;
  sku: string;
  availability: string;
  specifications: Record<string, string>;
  features: string[];
  isNew: boolean;
  isSale: boolean;
  isBestseller: boolean;
  url: string;
  shortDescription?: string;
  deliveryTime?: string;
  energyClass?: string;
  certifications?: string[];
}

const MircliCatalogPage: React.FC = () => {
  const { category } = useParams<{ category?: string }>();
  const [products, setProducts] = useState<MircliProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        
        // Загружаем данные из сгенерированного файла
        const response = await import('../../data/enhancedProductData.generated');
        let allProducts: MircliProduct[] = [];
        
        if (response.mircliProducts) {
          allProducts = response.mircliProducts.map(product => ({
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            oldPrice: product.oldPrice,
            images: product.images,
            rating: product.rating,
            reviewCount: product.reviewCount,
            brand: product.brand,
            category: product.category,
            sku: product.sku,
            availability: product.availability,
            specifications: product.specifications.reduce((acc, spec) => ({
              ...acc,
              [spec.name]: spec.value
            }), {}),
            features: product.features.map(f => f.title),
            isNew: product.isNew,
            isSale: product.isSale,
            isBestseller: product.isBestseller,
            url: product.url,
            shortDescription: product.shortDescription,
            deliveryTime: product.deliveryTime,
            energyClass: product.energyClass,
            certifications: product.certifications
          }));
        }

        // Фильтруем по категории если указана
        if (category) {
          const decodedCategory = decodeURIComponent(category);
          allProducts = allProducts.filter(product => 
            product.category.toLowerCase().includes(decodedCategory.toLowerCase()) ||
            decodedCategory.toLowerCase().includes(product.category.toLowerCase())
          );
        }

        setProducts(allProducts);
      } catch (err) {
        console.error('Ошибка загрузки товаров:', err);
        setError('Не удалось загрузить товары');
        
        // Создаем тестовые данные если загрузка не удалась
        const testProducts: MircliProduct[] = [
          {
            id: 'mircli-1',
            name: 'Вентилятор канальный ВКРС 150',
            description: 'Канальный вентилятор для систем вентиляции и кондиционирования',
            price: 12500,
            oldPrice: 15000,
            images: [
              { url: 'https://picsum.photos/400/300?random=1', alt: 'Вентилятор канальный ВКРС 150' }
            ],
            rating: 4.5,
            reviewCount: 25,
            brand: 'Ruck',
            category: 'Вентиляторы',
            sku: 'VKRS-150',
            availability: 'В наличии',
            specifications: {
              'Мощность': '0.37 кВт',
              'Производительность': '150 м³/ч',
              'Напряжение': '220 В',
              'Диаметр': '150 мм'
            },
            features: ['Гарантия качества', 'Сертифицированная продукция', 'Энергоэффективность'],
            isNew: false,
            isSale: true,
            isBestseller: true,
            url: 'https://mircli.ru/product/vkrs-150',
            shortDescription: 'Канальный вентилятор для систем вентиляции',
            deliveryTime: '1-3 дня',
            energyClass: 'A+',
            certifications: ['ГОСТ', 'СЕ']
          },
          {
            id: 'mircli-2',
            name: 'Воздуховод круглый 200мм',
            description: 'Круглый воздуховод из оцинкованной стали',
            price: 850,
            oldPrice: null,
            images: [
              { url: 'https://picsum.photos/400/300?random=2', alt: 'Воздуховод круглый 200мм' }
            ],
            rating: 4.3,
            reviewCount: 18,
            brand: 'Systemair',
            category: 'Воздуховоды',
            sku: 'VD-200',
            availability: 'В наличии',
            specifications: {
              'Диаметр': '200 мм',
              'Толщина': '0.5 мм',
              'Материал': 'Оцинкованная сталь',
              'Длина': '3 м'
            },
            features: ['Гарантия качества', 'Сертифицированная продукция'],
            isNew: true,
            isSale: false,
            isBestseller: false,
            url: 'https://mircli.ru/product/vd-200',
            shortDescription: 'Круглый воздуховод из оцинкованной стали',
            deliveryTime: '1-3 дня',
            energyClass: null,
            certifications: ['ГОСТ']
          },
          {
            id: 'mircli-3',
            name: 'Решетка приточная РП 150х150',
            description: 'Приточная решетка для систем вентиляции',
            price: 320,
            oldPrice: 400,
            images: [
              { url: 'https://picsum.photos/400/300?random=3', alt: 'Решетка приточная РП 150х150' }
            ],
            rating: 4.7,
            reviewCount: 32,
            brand: 'Vents',
            category: 'Решетки и диффузоры',
            sku: 'RP-150',
            availability: 'В наличии',
            specifications: {
              'Размер': '150х150 мм',
              'Материал': 'Пластик',
              'Цвет': 'Белый',
              'Тип': 'Приточная'
            },
            features: ['Гарантия качества', 'Сертифицированная продукция', 'Легкий монтаж'],
            isNew: false,
            isSale: true,
            isBestseller: false,
            url: 'https://mircli.ru/product/rp-150',
            shortDescription: 'Приточная решетка для систем вентиляции',
            deliveryTime: '1-3 дня',
            energyClass: null,
            certifications: ['ГОСТ', 'СЕ']
          },
          {
            id: 'mircli-4',
            name: 'Вентилятор лопастной ВЛ-200',
            description: 'Лопастной вентилятор для систем вентиляции',
            price: 8500,
            oldPrice: 9500,
            images: [
              { url: 'https://picsum.photos/400/300?random=4', alt: 'Вентилятор лопастной ВЛ-200' }
            ],
            rating: 4.6,
            reviewCount: 28,
            brand: 'Ruck',
            category: 'Вентиляторы > Лопастные',
            sku: 'VL-200',
            availability: 'В наличии',
            specifications: {
              'Мощность': '0.25 кВт',
              'Производительность': '200 м³/ч',
              'Напряжение': '220 В',
              'Тип': 'Лопастной'
            },
            features: ['Гарантия качества', 'Сертифицированная продукция', 'Низкий уровень шума'],
            isNew: true,
            isSale: true,
            isBestseller: false,
            url: 'https://mircli.ru/product/vl-200',
            shortDescription: 'Лопастной вентилятор для систем вентиляции',
            deliveryTime: '1-3 дня',
            energyClass: 'A',
            certifications: ['ГОСТ', 'СЕ']
          },
          {
            id: 'mircli-5',
            name: 'Вентилятор осевой ОВ-150',
            description: 'Осевой вентилятор для систем вентиляции',
            price: 6500,
            oldPrice: null,
            images: [
              { url: 'https://picsum.photos/400/300?random=5', alt: 'Вентилятор осевой ОВ-150' }
            ],
            rating: 4.4,
            reviewCount: 22,
            brand: 'Systemair',
            category: 'Вентиляторы > Осевые',
            sku: 'OV-150',
            availability: 'В наличии',
            specifications: {
              'Мощность': '0.18 кВт',
              'Производительность': '150 м³/ч',
              'Напряжение': '220 В',
              'Тип': 'Осевой'
            },
            features: ['Гарантия качества', 'Сертифицированная продукция', 'Высокая производительность'],
            isNew: false,
            isSale: false,
            isBestseller: true,
            url: 'https://mircli.ru/product/ov-150',
            shortDescription: 'Осевой вентилятор для систем вентиляции',
            deliveryTime: '1-3 дня',
            energyClass: 'A+',
            certifications: ['ГОСТ']
          }
        ];

        // Фильтруем по категории если указана
        if (category) {
          const decodedCategory = decodeURIComponent(category);
          const filtered = testProducts.filter(product => 
            product.category.toLowerCase().includes(decodedCategory.toLowerCase()) ||
            decodedCategory.toLowerCase().includes(product.category.toLowerCase())
          );
          setProducts(filtered);
        } else {
          setProducts(testProducts);
        }
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [category]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Загрузка товаров...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <svg className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Ошибка загрузки
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary hover:bg-opacity-90 text-white rounded-lg transition-colors"
          >
            Попробовать снова
          </button>
        </div>
      </div>
    );
  }

  const getPageTitle = () => {
    if (category) {
      const decodedCategory = decodeURIComponent(category);
      return `Каталог ${decodedCategory} - Mircli`;
    }
    return 'Каталог товаров - Mircli';
  };

  const getPageDescription = () => {
    if (category) {
      const decodedCategory = decodeURIComponent(category);
      return `Широкий выбор ${decodedCategory.toLowerCase()} от ведущих производителей. Качественное вентиляционное оборудование с гарантией.`;
    }
    return 'Каталог вентиляционного оборудования от ведущих производителей. Вентиляторы, воздуховоды, решетки и многое другое.';
  };

  return (
    <>
      <SEOHelmet
        title={getPageTitle()}
        description={getPageDescription()}
        keywords={`вентиляция, ${category ? decodeURIComponent(category) : 'оборудование'}, mircli, вентиляторы, воздуховоды`}
      />
      
      <MircliCatalog
        products={products}
        category={category ? decodeURIComponent(category) : undefined}
        title={category ? `Каталог ${decodeURIComponent(category)}` : 'Каталог товаров Mircli'}
      />
    </>
  );
};

export default MircliCatalogPage; 