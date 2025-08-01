import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search, X, Clock, TrendingUp, ArrowRight } from 'lucide-react';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: 'product' | 'category' | 'page';
  url: string;
  image?: string;
  price?: number;
}

const mockSearchResults: SearchResult[] = [
  {
    id: 'daikin-ftxb25c',
    title: 'Кондиционер Daikin FTXB25C',
    description: 'Настенная сплит-система с инверторным управлением',
    type: 'product',
    url: '/catalog/air-conditioning/daikin-ftxb25c',
    image: 'https://images.pexels.com/photos/4270511/pexels-photo-4270511.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: 38900
  },
  {
    id: 'ventilation-category',
    title: 'Вентиляционное оборудование',
    description: 'Канальные и осевые вентиляторы, приточно-вытяжные установки',
    type: 'category',
          url: '/catalog/ventilators'
  },
  {
    id: 'services-page',
    title: 'Наши услуги',
    description: 'Проектирование, монтаж и обслуживание климатических систем',
    type: 'page',
    url: '/services'
  }
];

const recentSearches = [
  'Кондиционер Daikin',
  'Вентиляторы канальные',
  'Тепловые завесы'
];

const popularSearches = [
  'Кондиционеры настенные',
  'Приточная вентиляция',
  'Монтаж кондиционера',
  'VRF системы'
];

interface GlobalSearchProps {
  isOpen?: boolean;
  onClose?: () => void;
  className?: string;
}

const GlobalSearch: React.FC<GlobalSearchProps> = ({ 
  isOpen = false, 
  onClose,
  className = ""
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.length > 2) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        const filteredResults = mockSearchResults.filter(result =>
          result.title.toLowerCase().includes(query.toLowerCase()) ||
          result.description.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filteredResults);
        setIsLoading(false);
        setIsDropdownOpen(true);
      }, 300);
    } else {
      setResults([]);
      setIsDropdownOpen(query.length > 0);
    }
  }, [query]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsDropdownOpen(false);
      if (onClose) onClose();
    }
  };

  const handleInputFocus = () => {
    setIsDropdownOpen(true);
  };

  const handleSearchSelect = (searchTerm: string) => {
    setQuery(searchTerm);
    setIsDropdownOpen(false);
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setIsDropdownOpen(false);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'product':
        return '🛍️';
      case 'category':
        return '📁';
      case 'page':
        return '📄';
      default:
        return '🔍';
    }
  };

  // Modal version for mobile
  if (isOpen && onClose) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-16 sm:pt-20 px-4">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-xl">
          {/* Search Input */}
          <div className="p-4 border-b dark:border-gray-700">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Поиск по сайту..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full pl-10 pr-10 py-3 bg-gray-50 dark:bg-gray-800 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-base"
              />
              <button
                onClick={onClose}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Search Results */}
          <div className="max-h-[70vh] overflow-y-auto">
            {isLoading && (
              <div className="p-4 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              </div>
            )}

            {query.length > 2 && !isLoading && results.length > 0 && (
              <div className="p-2">
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 px-3 py-2">
                  Результаты поиска
                </h3>
                {results.map((result) => (
                  <Link
                    key={result.id}
                    to={result.url}
                    onClick={onClose}
                    className="flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors"
                  >
                    {result.image ? (
                      <img
                        src={result.image}
                        alt={result.title}
                        className="w-12 h-12 object-cover rounded-md mr-3"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-md mr-3 flex items-center justify-center text-xl">
                        {getTypeIcon(result.type)}
                      </div>
                    )}
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {result.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">
                        {result.description}
                      </p>
                      {result.price && (
                        <p className="text-sm font-semibold text-primary">
                          {result.price.toLocaleString()} ₽
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
                
                {/* View all results */}
                <div className="p-3 border-t dark:border-gray-700 mt-2">
                  <Link
                    to={`/catalog?search=${encodeURIComponent(query)}`}
                    onClick={onClose}
                    className="flex items-center justify-center text-primary hover:text-secondary"
                  >
                    <span>Все результаты</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            )}

            {query.length > 2 && !isLoading && results.length === 0 && (
              <div className="p-8 text-center">
                <p className="text-gray-500 dark:text-gray-400">
                  По запросу "{query}" ничего не найдено
                </p>
                <div className="mt-4">
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Попробуйте:</h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• Проверить правильность написания</li>
                    <li>• Использовать другие ключевые слова</li>
                    <li>• Использовать более общие термины</li>
                  </ul>
                </div>
              </div>
            )}

            {query.length <= 2 && (
              <div className="p-4">
                {/* Recent Searches */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3 flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    Недавние поиски
                  </h3>
                  <div className="space-y-1">
                    {recentSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => setQuery(search)}
                        className="block w-full text-left px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors text-gray-700 dark:text-gray-300"
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Popular Searches */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3 flex items-center">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Популярные запросы
                  </h3>
                  <div className="space-y-1">
                    {popularSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => setQuery(search)}
                        className="block w-full text-left px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors text-gray-700 dark:text-gray-300"
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Regular search input with dropdown
  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Поиск по каталогу..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={handleInputFocus}
          onKeyDown={handleKeyDown}
          className="w-full pl-10 pr-10 py-2 sm:py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent text-gray-900 dark:text-white text-sm sm:text-base"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Dropdown Results */}
      {isDropdownOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-900 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50 max-h-96 overflow-y-auto">
          {isLoading && (
            <div className="p-4 text-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto"></div>
            </div>
          )}

          {query.length > 2 && !isLoading && results.length > 0 && (
            <div className="p-2">
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 px-3 py-2">
                Результаты поиска
              </h3>
              {results.map((result) => (
                <Link
                  key={result.id}
                  to={result.url}
                  onClick={() => setIsDropdownOpen(false)}
                  className="flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors"
                >
                  {result.image ? (
                    <img
                      src={result.image}
                      alt={result.title}
                      className="w-10 h-10 object-cover rounded-md mr-3"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-md mr-3 flex items-center justify-center text-sm">
                      {getTypeIcon(result.type)}
                    </div>
                  )}
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm text-gray-900 dark:text-white">
                      {result.title}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-1">
                      {result.description}
                    </p>
                    {result.price && (
                      <p className="text-xs font-semibold text-primary">
                        {result.price.toLocaleString()} ₽
                      </p>
                    )}
                  </div>
                </Link>
              ))}
              
              {/* View all results */}
              <div className="p-2 border-t dark:border-gray-700 mt-1">
                <Link
                  to={`/catalog?search=${encodeURIComponent(query)}`}
                  onClick={() => setIsDropdownOpen(false)}
                  className="flex items-center justify-center text-primary hover:text-secondary text-sm"
                >
                  <span>Все результаты</span>
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          )}

          {query.length > 2 && !isLoading && results.length === 0 && (
            <div className="p-6 text-center">
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                По запросу "{query}" ничего не найдено
              </p>
            </div>
          )}

          {query.length <= 2 && query.length > 0 && (
            <div className="p-4">
              {/* Recent Searches */}
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2 flex items-center">
                  <Clock className="h-3 w-3 mr-2" />
                  Недавние поиски
                </h3>
                <div className="space-y-1">
                  {recentSearches.slice(0, 3).map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handleSearchSelect(search)}
                      className="block w-full text-left px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors text-sm text-gray-700 dark:text-gray-300"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>

              {/* Popular Searches */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-2" />
                  Популярные запросы
                </h3>
                <div className="space-y-1">
                  {popularSearches.slice(0, 3).map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handleSearchSelect(search)}
                      className="block w-full text-left px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors text-sm text-gray-700 dark:text-gray-300"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GlobalSearch;