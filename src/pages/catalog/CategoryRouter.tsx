import React from 'react';
import { useLocation, Navigate, useParams } from 'react-router-dom';
import EnhancedCategoryPage from './EnhancedCategoryPage';
import Catalog from './Catalog';

const CategoryRouter: React.FC = () => {
  const location = useLocation();
  const params = useParams();
  
  console.log('CategoryRouter: Component mounted');
  console.log('CategoryRouter: Location pathname:', location.pathname);
  console.log('CategoryRouter: Params:', params);
  console.log('CategoryRouter: Full URL:', window.location.href);
  
  // Извлекаем путь после /catalog/
  const pathAfterCatalog = location.pathname.replace('/catalog', '').replace(/^\/+/, '');
  console.log('CategoryRouter: Path after catalog:', pathAfterCatalog);
  
  // Если путь точно /catalog или пустой, показываем главную страницу каталога
  if (location.pathname === '/catalog' || pathAfterCatalog === '') {
    console.log('CategoryRouter: Rendering Catalog component');
    return <Catalog />;
  }
  
  console.log('CategoryRouter: Rendering EnhancedCategoryPage');
  // Для всех остальных путей /catalog/* используем EnhancedCategoryPage
  return <EnhancedCategoryPage />;
};

export default CategoryRouter; 