import React from 'react';
import { BarChart2 } from 'lucide-react';
import { useComparison } from '../../hooks/useComparison';

interface ComparisonButtonProps {
  className?: string;
}

const ComparisonButton: React.FC<ComparisonButtonProps> = ({ className = '' }) => {
  const { getComparisonCount, openComparison } = useComparison();
  const count = getComparisonCount();

  if (count === 0) return null;

  return (
    <button
      onClick={openComparison}
      className={`fixed bottom-44 right-6 z-40 bg-secondary hover:bg-opacity-90 text-white rounded-full p-3 shadow-lg transition-all duration-300 group ${className}`}
      aria-label="Открыть сравнение товаров"
    >
      <BarChart2 className="h-6 w-6" />
      {count > 0 && (
        <div className="absolute -top-2 -right-2 bg-accent text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
          {count}
        </div>
      )}
      <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
        Сравнить товары ({count})
      </div>
    </button>
  );
};

export default ComparisonButton;