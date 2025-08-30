import { useState } from 'react';
import { useLocation } from 'wouter';
import type { SearchFilters } from '@shared/schema';

interface SearchFormProps {
  onSearch: (filters: SearchFilters) => void;
}

export default function SearchForm({ onSearch }: SearchFormProps) {
  const [, setLocation] = useLocation();
  const [isSearching, setIsSearching] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    product: '',
    category: '',
    location: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    
    try {
      onSearch(filters);
      setLocation('/productos');
    } finally {
      setTimeout(() => setIsSearching(false), 1000);
    }
  };

  const handleInputChange = (field: keyof SearchFilters) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  return (
    <div className="ecrist-search-container bg-[#3eff0021]">
      <form className="ecrist-search-form" onSubmit={handleSubmit}>
        <div className="ecrist-form-group">
          <label className="ecrist-form-label">Qué buscas</label>
          <input 
            type="text" 
            className="ecrist-form-input" 
            placeholder="Productos ecológicos"
            value={filters.product}
            onChange={handleInputChange('product')}
            data-testid="input-search-product"
          />
        </div>
        
        <div className="ecrist-form-group">
          <label className="ecrist-form-label">Categoría</label>
          <input 
            type="text" 
            className="ecrist-form-input" 
            placeholder="Hogar, Cosmética..."
            value={filters.category}
            onChange={handleInputChange('category')}
            data-testid="input-search-category"
          />
        </div>
        
        <div className="ecrist-form-group">
          <label className="ecrist-form-label">Ubicación</label>
          <input 
            type="text" 
            className="ecrist-form-input" 
            placeholder="Tu ciudad"
            value={filters.location}
            onChange={handleInputChange('location')}
            data-testid="input-search-location"
          />
        </div>
        
        <button 
          type="submit" 
          className="ecrist-search-button"
          disabled={isSearching}
          data-testid="button-search"
        >
          {isSearching ? 'Buscando...' : 'Buscar'}
        </button>
      </form>
    </div>
  );
}
