import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useSearchStore } from '@/lib/store';
import ProductCard from '@/components/ProductCard';
import type { Product, SearchFilters } from '@shared/schema';

export default function Products() {
  const { currentSearch, setSearch } = useSearchStore();
  const [searchValue, setSearchValue] = useState(currentSearch);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  
  const { data: allProducts = [], isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });
  
  const searchMutation = useMutation({
    mutationFn: async (filters: SearchFilters) => {
      if (!filters.product && !filters.category) {
        return allProducts;
      }
      const response = await apiRequest('POST', '/api/products/search', filters);
      return response.json();
    },
    onSuccess: (results) => {
      setFilteredProducts(results);
    },
  });
  
  useEffect(() => {
    setSearchValue(currentSearch);
    if (currentSearch) {
      searchMutation.mutate({ product: currentSearch, category: '', location: '' });
    } else {
      setFilteredProducts(allProducts);
    }
  }, [currentSearch, allProducts]);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    setSearch(value);
    
    if (value.trim()) {
      searchMutation.mutate({ product: value, category: '', location: '' });
    } else {
      setFilteredProducts(allProducts);
    }
  };
  
  const displayProducts = filteredProducts.length > 0 ? filteredProducts : allProducts;

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
        
        {searchValue && displayProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No se encontraron productos para "{searchValue}"</p>
          </div>
        )}
      </div>
    </div>
  );
}
