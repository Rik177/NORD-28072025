import React from 'react';
import { useLocation, Navigate, useParams } from 'react-router-dom';
import EnhancedCategoryPage from './EnhancedCategoryPage';
import EnhancedProductPage from './EnhancedProductPage';
import Catalog from './Catalog';

const CategoryRouter: React.FC = () => {
  const location = useLocation();
  const params = useParams();
  
  console.log('CategoryRouter:', { pathname: location.pathname, params });
  
  // Извлекаем путь после /catalog/
  const pathAfterCatalog = location.pathname.replace('/catalog', '').replace(/^\/+/, '');
  
  
  // Если путь точно /catalog или пустой, показываем главную страницу каталога
  if (location.pathname === '/catalog' || pathAfterCatalog === '') {
    return <Catalog />;
  }

  // Если в пути есть product, рендерим страницу товара
  if (pathAfterCatalog.includes('/product/')) {
    return <EnhancedProductPage />;
  }
  
  // Для всех остальных путей /catalog/* используем EnhancedCategoryPage
  return <EnhancedCategoryPage />;
};

export default CategoryRouter; 