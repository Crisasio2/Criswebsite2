import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchStore } from '@/lib/store';
import ProductCard from '@/components/ProductCard';
import type { Product } from '@shared/schema';

export default function Products() {
  const { currentSearch, setSearch } = useSearchStore();
  const [searchValue, setSearchValue] = useState(currentSearch);
  
  const { data: allProducts = [], isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });
  
  // Sync searchValue with currentSearch from store
  useEffect(() => {
    setSearchValue(currentSearch);
  }, [currentSearch]);
  
  // Memoized filtered products for better performance
  const displayProducts = useMemo(() => {
    if (!searchValue.trim()) {
      return allProducts;
    }
    
    return allProducts.filter(product => {
      const searchLower = searchValue.toLowerCase();
      return (
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower)
      );
    });
  }, [allProducts, searchValue]);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    setSearch(value);
  };

  if (isLoading) {
    return (
      <div className="ecrist-page-content">
        <div className="ecrist-products-section">
          <h2 className="ecrist-products-title" data-testid="text-products-loading">
            Cargando productos...
          </h2>
          <div className="max-w-md mx-auto mb-8">
            <div className="animate-pulse bg-gray-200 h-12 rounded-xl"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ecrist-page-content">
      <div className="ecrist-products-section">
        <h2 className="ecrist-products-title" data-testid="text-products-title">
          Nuestros Productos Sostenibles
        </h2>
        
        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              value={searchValue}
              onChange={handleSearchChange}
              placeholder="Buscar productos..."
              className="w-full px-4 py-3 pl-12 text-gray-700 bg-white border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 transition-all duration-300"
              data-testid="input-products-search"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-4">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="ecrist-products-grid" data-testid="grid-products">
          {displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {searchValue.trim() && displayProducts.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No se encontraron productos para "{searchValue}"</p>
          </div>
        )}
      </div>
    </div>
  );
}
