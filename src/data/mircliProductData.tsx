import React from 'react';
import { Home, Building, Factory, Store, Hotel, Guitar as Hospital, School, ShoppingCart, Zap, Shield, Snowflake, Wind, Thermometer, Volume2, Wifi, Timer, Filter, Droplets, Sun, Moon } from 'lucide-react';

// Импортируем данные из JSON файла
import mircliData from './mircli-catalog-data.json';

type RawMircliProduct = {
  id: string;
  name: string;
  brand: string;
  model: string;
  category: string;
  subcategory: string;
  shortDescription: string;
  fullDescription: string;
  technicalDescription: string;
  price: number;
  oldPrice?: number;
  currency: string;
  availability: 'В наличии' | 'Под заказ' | 'Нет в наличии';
  deliveryTime: string;
  images: { url: string; alt: string; type: 'main' | 'gallery' | 'technical' | 'installation'; caption?: string }[];
  rating: number;
  reviewCount: number;
  specifications: { category: string; specifications: Record<string, string> }[];
  features: { icon: string; title: string; description: string }[];
  applications: { icon: string; title: string; description: string; benefits: string[]; recommendedFor: string[] }[];
  installation: any;
  seoTitle?: string;
  seoDescription?: string;
  keywords: string[];
  certifications: string[];
  energyClass?: string;
  noiseLevel?: string;
  dimensions?: { length: number; width: number; height: number; weight: number };
  relatedProducts?: string[];
  accessories?: string[];
  isNew?: boolean;
  isSale?: boolean;
  isPopular?: boolean;
  isBestseller?: boolean;
};

type RawMircliData = {
  categories: any[];
  products: RawMircliProduct[];
};

export interface ProductSpecification {
  category: string;
  specifications: Record<string, string>;
}

export interface ProductFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface ProductImage {
  url: string;
  alt: string;
  type: 'main' | 'gallery' | 'technical' | 'installation';
  caption?: string;
}

export interface ProductApplication {
  icon: React.ReactNode;
  title: string;
  description: string;
  benefits: string[];
  recommendedFor: string[];
}

export interface ProductInstallation {
  complexity: 'Простая' | 'Средняя' | 'Сложная';
  time: string;
  team: string;
  requirements: string[];
  steps: string[];
  warranty: string;
  maintenance: string;
  tools: string[];
  materials: string[];
}

export interface EnhancedProduct {
  id: string;
  name: string;
  brand: string;
  model: string;
  category: string;
  subcategory: string;
  
  // Описания
  shortDescription: string;
  fullDescription: string;
  technicalDescription: string;
  
  // Цены и наличие
  price: number;
  oldPrice?: number;
  currency: string;
  availability: 'В наличии' | 'Под заказ' | 'Нет в наличии';
  deliveryTime: string;
  
  // Изображения
  images: ProductImage[];
  
  // Рейтинг и отзывы
  rating: number;
  reviewCount: number;
  
  // Характеристики
  specifications: ProductSpecification[];
  
  // Особенности
  features: ProductFeature[];
  
  // Применение
  applications: ProductApplication[];
  
  // Установка
  installation: ProductInstallation;
  
  // SEO и метаданные
  seoTitle?: string;
  seoDescription?: string;
  keywords: string[];
  
  // Дополнительная информация
  certifications: string[];
  energyClass?: string;
  noiseLevel?: string;
  dimensions: {
    length: number;
    width: number;
    height: number;
    weight: number;
  };
  
  // Связанные товары
  relatedProducts: string[];
  accessories: string[];
  
  // Статусы
  isNew?: boolean;
  isSale?: boolean;
  isPopular?: boolean;
  isBestseller?: boolean;
}

// Функция для получения иконки по названию
function getIconByName(iconName: string): React.ReactNode {
  const iconMap: Record<string, React.ReactNode> = {
    'Wind': <Wind className="w-5 h-5" />,
    'Zap': <Zap className="w-5 h-5" />,
    'Building': <Building className="w-5 h-5" />,
    'Home': <Home className="w-5 h-5" />,
    'Factory': <Factory className="w-5 h-5" />,
    'Store': <Store className="w-5 h-5" />,
    'Hotel': <Hotel className="w-5 h-5" />,
    'Hospital': <Hospital className="w-5 h-5" />,
    'School': <School className="w-5 h-5" />,
    'ShoppingCart': <ShoppingCart className="w-5 h-5" />,
    'Shield': <Shield className="w-5 h-5" />,
    'Snowflake': <Snowflake className="w-5 h-5" />,
    'Thermometer': <Thermometer className="w-5 h-5" />,
    'Volume2': <Volume2 className="w-5 h-5" />,
    'Wifi': <Wifi className="w-5 h-5" />,
    'Timer': <Timer className="w-5 h-5" />,
    'Filter': <Filter className="w-5 h-5" />,
    'Droplets': <Droplets className="w-5 h-5" />,
    'Sun': <Sun className="w-5 h-5" />,
    'Moon': <Moon className="w-5 h-5" />
  };
  
  return iconMap[iconName] || <Wind className="w-5 h-5" />;
}

// Преобразуем данные из JSON в формат EnhancedProduct
export const enhancedProductDatabase: Record<string, EnhancedProduct> = {};

// Нормализуем бренд: если в исходных данных он "Неизвестный бренд" или пустой,
// пытаемся извлечь бренд из краткого описания до первого " - "
function normalizeBrand(originalBrand: string, shortDescription: string): string {
  const unknown = !originalBrand || /неизвестный бренд/i.test(originalBrand);
  if (!unknown) return originalBrand;
  if (shortDescription && typeof shortDescription === 'string') {
    const beforeDash = shortDescription.split(' - ')[0] || '';
    const firstToken = beforeDash.trim().split(/\s+/)[0] || '';
    return firstToken || originalBrand;
  }
  return originalBrand;
}

const typedMircliData = mircliData as unknown as RawMircliData;
typedMircliData.products.forEach((product) => {
  const brand = normalizeBrand(product.brand, product.shortDescription);
  enhancedProductDatabase[product.id] = {
    ...product,
    brand,
    dimensions: product.dimensions || { length: 0, width: 0, height: 0, weight: 0 },
    relatedProducts: product.relatedProducts || [],
    accessories: product.accessories || [],
    features: product.features.map((feature: any) => ({
      ...feature,
      icon: getIconByName(feature.icon)
    })),
    applications: product.applications.map((app: any) => ({
      ...app,
      icon: getIconByName(app.icon)
    }))
  };
});

// Экспортируем категории
export const categories = typedMircliData.categories;

// Функции для работы с данными
export const getEnhancedProduct = (id: string): EnhancedProduct | undefined => {
  const product = enhancedProductDatabase[id];
  
  // Debug logs removed for production
  
  return product;
};

export const getProductsByCategory = (category: string): EnhancedProduct[] => {
  return Object.values(enhancedProductDatabase).filter(product => product.category === category);
};

export const getProductsByBrand = (brand: string): EnhancedProduct[] => {
  return Object.values(enhancedProductDatabase).filter(product => 
    product.brand.toLowerCase().includes(brand.toLowerCase())
  );
};

export const searchProducts = (query: string): EnhancedProduct[] => {
  const lowerQuery = query.toLowerCase();
  return Object.values(enhancedProductDatabase).filter(product =>
    product.name.toLowerCase().includes(lowerQuery) ||
    product.brand.toLowerCase().includes(lowerQuery) ||
    product.model.toLowerCase().includes(lowerQuery) ||
    product.shortDescription.toLowerCase().includes(lowerQuery)
  );
};

export const getRelatedProducts = (productId: string): EnhancedProduct[] => {
  const product = enhancedProductDatabase[productId];
  if (!product) return [];
  
  return Object.values(enhancedProductDatabase)
    .filter(p => p.id !== productId && p.category === product.category)
    .slice(0, 4);
};

export const getProductAccessories = (productId: string): EnhancedProduct[] => {
  const product = enhancedProductDatabase[productId];
  if (!product) return [];
  
  return Object.values(enhancedProductDatabase)
    .filter(p => p.id !== productId && p.category === product.category)
    .slice(0, 6);
};

export const getPopularProducts = (limit: number = 10): EnhancedProduct[] => {
  return Object.values(enhancedProductDatabase)
    .filter(product => product.isPopular)
    .slice(0, limit);
};

export const getNewProducts = (limit: number = 10): EnhancedProduct[] => {
  return Object.values(enhancedProductDatabase)
    .filter(product => product.isNew)
    .slice(0, limit);
};

export const getSaleProducts = (limit: number = 10): EnhancedProduct[] => {
  return Object.values(enhancedProductDatabase)
    .filter(product => product.isSale)
    .slice(0, limit);
};

export const getAllProducts = (): EnhancedProduct[] => {
  return Object.values(enhancedProductDatabase);
};

export const getProductsBySubcategory = (subcategory: string): EnhancedProduct[] => {
  return Object.values(enhancedProductDatabase).filter(product => product.subcategory === subcategory);
}; 