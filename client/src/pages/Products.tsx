import { useState, useEffect, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchStore } from '@/lib/store';
import ProductCard from '@/components/ProductCard';
import type { Product } from '@shared/schema';

export default function Products() {
  const { currentSearch, setSearch } = useSearchStore();
  const [searchValue, setSearchValue] = useState(currentSearch);
  const [searchResults, setSearchResults] = useState<{
    products: Product[];
    suggestions: string[];
    totalFound: number;
  }>({ products: [], suggestions: [], totalFound: 0 });
  const [isSearching, setIsSearching] = useState(false);
  
  const { data: allProducts = [], isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });
  
  // Sync searchValue with currentSearch from store
  useEffect(() => {
    setSearchValue(currentSearch);
  }, [currentSearch]);
  
  // Initialize search results when products load
  useEffect(() => {
    if (allProducts.length > 0 && !currentSearch.trim()) {
      setSearchResults({ products: allProducts, suggestions: [], totalFound: allProducts.length });
    }
  }, [allProducts.length]); // Only run when products are first loaded
  
  // Handle search when currentSearch changes
  useEffect(() => {
    if (currentSearch.trim()) {
      performSearch(currentSearch);
    } else if (allProducts.length > 0) {
      setSearchResults({ products: allProducts, suggestions: [], totalFound: allProducts.length });
    }
  }, [currentSearch]); // Only depend on currentSearch
  
  const performSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults({ products: allProducts, suggestions: [], totalFound: allProducts.length });
      return;
    }
    
    setIsSearching(true);
    try {
      const response = await fetch('/api/products/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product: query })
      });
      
      if (!response.ok) {
        throw new Error('Search failed');
      }
      
      const data = await response.json();
      
      setSearchResults({
        products: data.products || [],
        suggestions: data.suggestions || [],
        totalFound: data.totalFound || 0
      });
    } catch (error) {
      // Silent error handling for production
      setSearchResults({ products: [], suggestions: [], totalFound: 0 });
    } finally {
      setIsSearching(false);
    }
  }, [allProducts]);
  
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    setSearch(value);
  }, [setSearch]);
  
  const handleSuggestionClick = useCallback((suggestion: string) => {
    setSearchValue(suggestion);
    setSearch(suggestion);
    performSearch(suggestion);
  }, [setSearch, performSearch]);
  
  const displayProducts = searchValue.trim() ? searchResults.products : allProducts;

  if (isLoading) {
    return (
      <div className="ecrist-enhanced-page-content">
        <h2 className="ecrist-enhanced-page-title" data-testid="text-products-loading">
          🛍️ Cargando productos...
        </h2>
        <div className="max-w-md mx-auto mb-8">
          <div className="animate-pulse bg-gray-200 h-12 rounded-xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="ecrist-enhanced-page-content">
      <h2 className="ecrist-enhanced-page-title" data-testid="text-products-title">
        🛍️ Nuestros Productos Sostenibles
      </h2>
      
      {/* Featured Categories */}
      <div className="ecrist-stats-grid" style={{ marginBottom: '40px' }}>
        <div className="ecrist-stat-card">
          <span className="ecrist-stat-number">🧴</span>
          <span className="ecrist-stat-label">Cosmética Natural</span>
        </div>
        <div className="ecrist-stat-card">
          <span className="ecrist-stat-number">🏠</span>
          <span className="ecrist-stat-label">Hogar Ecológico</span>
        </div>
        <div className="ecrist-stat-card">
          <span className="ecrist-stat-number">🌱</span>
          <span className="ecrist-stat-label">Cuidado Personal</span>
        </div>
        <div className="ecrist-stat-card">
          <span className="ecrist-stat-number">♻️</span>
          <span className="ecrist-stat-label">Biodegradables</span>
        </div>
      </div>
      
      {/* Search Section */}
      <div className="ecrist-enhanced-section">
        <div className="max-w-lg mx-auto mb-6">
          <div className="relative">
            <input
              type="text"
              value={searchValue}
              onChange={handleSearchChange}
              placeholder="Buscar productos sostenibles..."
              className="w-full px-4 py-3 pl-12 text-gray-700 bg-white border-2 border-green-200 rounded-xl focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 transition-all duration-300 shadow-sm"
              data-testid="input-products-search"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-4">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
        
        {/* Search Status */}
        {searchValue.trim() && (
          <div className="mb-6 text-center">
            <p className="text-gray-600 font-medium">
              {isSearching ? '🔍 Buscando...' : `✅ ${displayProducts.length} ${displayProducts.length === 1 ? 'producto encontrado' : 'productos encontrados'} para "${searchValue}"`}
            </p>
          </div>
        )}
        
        {/* Suggestions */}
        {searchValue.trim() && searchResults.suggestions.length > 0 && displayProducts.length === 0 && (
          <div className="mb-8 text-center">
            <p className="text-gray-600 mb-3 font-medium">💡 ¿Quizás quisiste buscar:</p>
            <div className="flex flex-wrap justify-center gap-3">
              {searchResults.suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm hover:bg-green-200 transition-colors border border-green-200 font-medium"
                  data-testid={`button-suggestion-${index}`}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Products Grid */}
      <div className="ecrist-enhanced-products-grid" data-testid="grid-products">
        {displayProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {/* No Results */}
      {searchValue.trim() && displayProducts.length === 0 && searchResults.suggestions.length === 0 && !isSearching && !isLoading && (
        <div className="ecrist-enhanced-section text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-gray-500 text-lg font-medium mb-2">No se encontraron productos para "{searchValue}"</p>
          <p className="text-gray-400 text-sm">Intenta con términos diferentes o revisa la ortografía</p>
        </div>
      )}
    </div>
  );
}