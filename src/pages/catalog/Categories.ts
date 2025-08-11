// Автоматически сгенерировано на основе MIRCLI_CATALOGUE_results.json
import { categories, products, getCategoryById, getCategoryByPath, getProductsByCategory, getProductsByBrand, searchProducts, getCategoryHierarchy, getSubcategories, getAllProducts, getProductsBySubcategory } from '../../data/enhanced-categories';

// Debug logs removed for production

export interface Subcategory {
  id: string;
  name: string;
  path: string;
  url: string;
  parentId: string;
  level: number;
  subcategories?: Subcategory[];
}

export interface Category {
  id: string;
  name: string;
  path: string;
  url: string;
  parentId: string;
  level: number;
  subcategories?: Subcategory[];
}

export interface ProductSpecification {
  [key: string]: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  model: string;
  category: string;
  price: number;
  currency: string;
  availability: string;
  image: string;
  specifications: ProductSpecification;
  url: string;
  rating: number;
  reviewCount: number;
  isNew: boolean;
  isSale: boolean;
  isPopular: boolean;
  isBestseller: boolean;
}

// Экспортируем данные и функции из enhanced-categories.ts
export { 
  categories, 
  products, 
  getCategoryById, 
  getCategoryByPath, 
  getProductsByCategory, 
  getProductsByBrand, 
  searchProducts, 
  getCategoryHierarchy, 
  getSubcategories, 
  getAllProducts, 
  getProductsBySubcategory 
};
