import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MircliProductDetail from '../../components/catalog/MircliProductDetail';
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

const MircliProductPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<MircliProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProduct = async () => {
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

        // Ищем товар по ID
        const foundProduct = allProducts.find(p => p.id === productId);
        
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          setError('Товар не найден');
        }
      } catch (err) {
        console.error('Ошибка загрузки товара:', err);
        setError('Не удалось загрузить товар');
        
        // Создаем тестовый товар если загрузка не удалась
        const testProduct: MircliProduct = {
          id: productId || 'mircli-1',
          name: 'Вентилятор канальный ВКРС 150',
          description: 'Качественный канальный вентилятор для систем вентиляции и кондиционирования. Идеально подходит для жилых и коммерческих помещений. Высокая производительность и низкий уровень шума делают этот вентилятор отличным выбором для любых систем вентиляции.',
          price: 12500,
          oldPrice: 15000,
          images: [
            { url: 'https://picsum.photos/400/300?random=1', alt: 'Вентилятор канальный ВКРС 150' },
            { url: 'https://picsum.photos/400/300?random=2', alt: 'Вентилятор канальный ВКРС 150 - вид 2' },
            { url: 'https://picsum.photos/400/300?random=3', alt: 'Вентилятор канальный ВКРС 150 - вид 3' }
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
            'Диаметр': '150 мм',
            'Уровень шума': '35 дБ',
            'Вес': '2.5 кг',
            'Материал корпуса': 'Оцинкованная сталь',
            'Класс защиты': 'IP44'
          },
          features: ['Гарантия качества', 'Сертифицированная продукция', 'Энергоэффективность', 'Тихая работа'],
          isNew: false,
          isSale: true,
          isBestseller: true,
          url: 'https://mircli.ru/product/vkrs-150',
          shortDescription: 'Канальный вентилятор для систем вентиляции',
          deliveryTime: '1-3 дня',
          energyClass: 'A+',
          certifications: ['ГОСТ', 'СЕ', 'ISO']
        };
        
        setProduct(testProduct);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [productId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Загрузка товара...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <svg className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            {error || 'Товар не найден'}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            {error ? 'Попробуйте обновить страницу' : 'Запрашиваемый товар не существует'}
          </p>
          <button
            onClick={() => window.location.href = '/ventilation'}
            className="px-4 py-2 bg-primary hover:bg-opacity-90 text-white rounded-lg transition-colors"
          >
            Вернуться в каталог
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEOHelmet
        title={`${product.name} - ${product.brand} | Mircli`}
        description={product.shortDescription || product.description}
        keywords={`${product.name}, ${product.brand}, ${product.category}, вентиляция, mircli`}
        image={product.images[0]?.url}
      />
      
      <MircliProductDetail product={product} />
    </>
  );
};

export default MircliProductPage; 