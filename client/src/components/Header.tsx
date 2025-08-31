import { Link, useLocation } from 'wouter';
import { useCartStore } from '@/lib/store';
import { useState, useEffect } from 'react';

interface HeaderProps {
  onCartToggle: () => void;
}

export default function Header({ onCartToggle }: HeaderProps) {
  const [location] = useLocation();
  const { getTotalItems } = useCartStore();
  const totalItems = getTotalItems();
  
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  const isMainPage = location === '/';

  useEffect(() => {
    // Solo aplicar la funcionalidad de scroll en páginas que no sean la principal
    if (isMainPage) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Solo ocultar después de haber scrolleado 100px
      if (currentScrollY < 100) {
        setIsHeaderVisible(true);
      } else {
        // Si scrollea hacia abajo, ocultar; si scrollea hacia arriba, mostrar
        setIsHeaderVisible(currentScrollY < lastScrollY);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isMainPage]);

  const isActive = (path: string) => {
    if (path === '/' && location === '/') return true;
    if (path !== '/' && location.startsWith(path)) return true;
    return false;
  };
  const logoClass = isMainPage ? 'ecrist-logo ecrist-logo-main-page' : 'ecrist-logo';

  return (
    <header className={`ecrist-header bg-[#001cba9c] ${
      isMainPage 
        ? 'header-main-page' 
        : (isHeaderVisible ? 'header-visible' : 'header-hidden')
    }`}>
      <Link href="/" className={logoClass} data-testid="link-logo">
        <div className="ecrist-logo-icon">🌿</div>
        <div className="ecrist-logo-text">
          {isMainPage ? (
            <span>EcoCrist</span>
          ) : (
            <>
              <span className="ecrist-logo-short">E'Crist Commerce</span>
              <span className="ecrist-logo-full">EcoCrist</span>
            </>
          )}
        </div>
      </Link>
      <nav className="ecrist-nav-menu">
        <Link 
          href="/inicio" 
          className={`ecrist-nav-link ${isActive('/inicio') ? 'active' : ''}`}
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
      <div className="ecrist-header-buttons">
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
