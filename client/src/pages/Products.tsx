import { useQuery } from '@tanstack/react-query';
import ProductCard from '@/components/ProductCard';
import type { Product } from '@shared/schema';

export default function Products() {
  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  if (isLoading) {
    return (
      <div className="ecrist-page-content">
        <div className="ecrist-products-section">
          <h2 className="ecrist-products-title" data-testid="text-products-loading">
            Cargando productos...
          </h2>
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
        <div className="ecrist-products-grid" data-testid="grid-products">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
