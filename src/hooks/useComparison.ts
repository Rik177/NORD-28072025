import { useState, useEffect } from 'react';

interface ComparisonProduct {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  specifications: Record<string, string>;
  rating: number;
  features: string[];
  category: string;
}

const COMPARISON_STORAGE_KEY = 'product_comparison';
const MAX_COMPARISON_ITEMS = 4;

export const useComparison = () => {
  const [comparisonProducts, setComparisonProducts] = useState<ComparisonProduct[]>([]);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);

  // Load comparison products from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(COMPARISON_STORAGE_KEY);
    if (stored) {
      try {
        const products = JSON.parse(stored);
        setComparisonProducts(products);
      } catch (error) {
        console.error('Error loading comparison products:', error);
      }
    }
  }, []);

  // Save to localStorage whenever comparison products change
  useEffect(() => {
    localStorage.setItem(COMPARISON_STORAGE_KEY, JSON.stringify(comparisonProducts));
  }, [comparisonProducts]);

  const addToComparison = (product: ComparisonProduct) => {
    setComparisonProducts(prev => {
      // Check if product already exists
      if (prev.find(p => p.id === product.id)) {
        return prev;
      }
      
      // Check if we've reached the maximum
      if (prev.length >= MAX_COMPARISON_ITEMS) {
        // Remove the first item and add the new one
        return [...prev.slice(1), product];
      }
      
      return [...prev, product];
    });
  };

  const removeFromComparison = (productId: string) => {
    setComparisonProducts(prev => prev.filter(p => p.id !== productId));
  };

  const clearComparison = () => {
    setComparisonProducts([]);
  };

  const isInComparison = (productId: string) => {
    return comparisonProducts.some(p => p.id === productId);
  };

  const openComparison = () => {
    setIsComparisonOpen(true);
  };

  const closeComparison = () => {
    setIsComparisonOpen(false);
  };

  const getComparisonCount = () => {
    return comparisonProducts.length;
  };

  const canAddMore = () => {
    return comparisonProducts.length < MAX_COMPARISON_ITEMS;
  };

  return {
    comparisonProducts,
    isComparisonOpen,
    addToComparison,
    removeFromComparison,
    clearComparison,
    isInComparison,
    openComparison,
    closeComparison,
    getComparisonCount,
    canAddMore,
    maxItems: MAX_COMPARISON_ITEMS
  };
};