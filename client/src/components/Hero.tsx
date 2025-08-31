import { useState } from 'react';
import { useLocation } from 'wouter';
// Using CSS background instead of importing image to avoid build issues
// import naturalezaImage from '@assets/Imagen naturaleza_1756588974717.jpg';
import type { SearchFilters } from '@shared/schema';

interface HeroProps {
  onSearch: (filters: SearchFilters) => void;
}

export default function Hero({ onSearch }: HeroProps) {
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
    <section 
      className="ecrist-hero-extended"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="ecrist-leaf-frame">
        <div className="ecrist-leaf ecrist-leaf-1"></div>
        <div className="ecrist-leaf ecrist-leaf-2"></div>
        <div className="ecrist-leaf ecrist-leaf-3"></div>
        <div className="ecrist-leaf ecrist-leaf-4"></div>
        <div className="ecrist-leaf ecrist-leaf-5"></div>
        <div className="ecrist-leaf ecrist-leaf-6"></div>
        <div className="ecrist-leaf ecrist-leaf-7"></div>
        <div className="ecrist-leaf ecrist-leaf-8"></div>
        <div className="ecrist-leaf ecrist-leaf-9"></div>
        <div className="ecrist-leaf ecrist-leaf-10"></div>
        <div className="ecrist-leaf ecrist-leaf-11"></div>
        <div className="ecrist-leaf ecrist-leaf-12"></div>
      </div>
      
      <div className="ecrist-hero-content">
        <h1 className="ecrist-hero-title" data-testid="text-hero-title">
          CONSUMO CONSCIENTE<br />ESTILO EXCLUSIVO
        </h1>
        <p className="ecrist-hero-subtitle" data-testid="text-hero-subtitle">
          Descubre productos sostenibles y lujosos que cuidan del planeta
        </p>
      </div>
      
      {/* Search Form Overlay */}
      <div className="ecrist-search-overlay">
        <form className="ecrist-search-form-overlay" onSubmit={handleSubmit}>
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
    </section>
  );
}