import { useState, memo, useCallback } from 'react';
import { useCartStore } from '@/lib/store';
import type { Product } from '@shared/schema';

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const [isAdding, setIsAdding] = useState(false);
  const { addItem } = useCartStore();

  const handleAddToCart = useCallback(() => {
    setIsAdding(true);
    addItem(product);
    
    setTimeout(() => {
      setIsAdding(false);
    }, 1000);
  }, [product, addItem]);

  return (
    <div className="ecrist-product-card" data-testid={`card-product-${product.id}`}>
      <div 
        className="ecrist-product-image" 
        style={{ backgroundImage: `url('${product.image}')` }}
        data-testid={`img-product-${product.id}`}
      ></div>
      
      <div className="ecrist-product-info">
        <div className="ecrist-product-name" data-testid={`text-product-name-${product.id}`}>
          {product.name}
        </div>
        <div className="ecrist-product-description" data-testid={`text-product-description-${product.id}`}>
          {product.description}
        </div>
        <div className="ecrist-product-price" data-testid={`text-product-price-${product.id}`}>
          S/{product.price}
        </div>
        <button 
          className="ecrist-add-to-cart-btn"
          onClick={handleAddToCart}
          disabled={isAdding}
          style={isAdding ? { background: 'var(--ecrist-secondary)' } : {}}
          data-testid={`button-add-to-cart-${product.id}`}
        >
          {isAdding ? '¡Añadido!' : 'Añadir al Carrito'}
        </button>
      </div>
    </div>
  );
}

export default memo(ProductCard);
