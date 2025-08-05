import React from 'react';
import { useParams, useLocation } from 'react-router-dom';

const TestCategoryPage: React.FC = () => {
  const params = useParams();
  const location = useLocation();
  
  console.log('TestCategoryPage: Component mounted');
  console.log('TestCategoryPage: Params:', params);
  console.log('TestCategoryPage: Location:', location);
  console.log('TestCategoryPage: Window location:', window.location.href);
  
  return (
    <div className="p-8">
      <h1>Test Category Page</h1>
      <p>Params: {JSON.stringify(params)}</p>
      <p>Location: {JSON.stringify(location)}</p>
      <p>Window location: {window.location.href}</p>
    </div>
  );
};

export default TestCategoryPage; 