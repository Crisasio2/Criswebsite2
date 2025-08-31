import { Link, useLocation } from 'wouter';
import { useCartStore } from '@/lib/store';

interface HeaderProps {
  onCartToggle: () => void;
}

export default function Header({ onCartToggle }: HeaderProps) {
  const [location] = useLocation();
  const { getTotalItems } = useCartStore();
  const totalItems = getTotalItems();

  const isActive = (path: string) => {
    if (path === '/' && location === '/') return true;
    if (path !== '/' && location.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="ecrist-header bg-[#001cba9c]">
      <Link href="/" className="ecrist-logo" data-testid="link-logo">
        <div className="ecrist-logo-icon">🌿</div>
        <div className="ecrist-logo-text">
          <span>E'Crist Commerce</span>
        </div>
      </Link>
      <nav className="ecrist-nav-menu">
        <Link 
          href="/" 
          className={`ecrist-nav-link ${isActive('/') ? 'active' : ''}`}
          data-testid="link-home"
        >
          Inicio
        </Link>
        <Link 
          href="/productos" 
          className={`ecrist-nav-link ${isActive('/productos') ? 'active' : ''}`}
          data-testid="link-products"
        >
          Productos
        </Link>
        <Link 
          href="/sostenibilidad" 
          className={`ecrist-nav-link ${isActive('/sostenibilidad') ? 'active' : ''}`}
          data-testid="link-sustainability"
        >
          Sostenibilidad
        </Link>
        <Link 
          href="/nosotros" 
          className={`ecrist-nav-link ${isActive('/nosotros') ? 'active' : ''}`}
          data-testid="link-about"
        >
          Nosotros
        </Link>
      </nav>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 'clamp(8px, 2vw, 10px)' }}>
        <button 
          className="ecrist-cart-btn" 
          onClick={onCartToggle}
          data-testid="button-cart"
        >Carro 🛒{totalItems > 0 && (
            <span className="ecrist-cart-count" data-testid="text-cart-count">
              {totalItems}
            </span>
          )}
        </button>
        <Link href="#" className="ecrist-sign-up-btn" data-testid="link-signup">
          Únete
        </Link>
      </div>
    </header>
  );
}
