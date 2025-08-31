import { Link, useLocation } from 'wouter';
import { useCartStore } from '@/lib/store';
import { useState, useEffect, useCallback, useMemo } from 'react';

interface HeaderProps {
  onCartToggle: () => void;
  onPageTransition?: (href: string) => void;
  logoOverride?: string | null;
}

export default function Header({ onCartToggle, onPageTransition, logoOverride }: HeaderProps) {
  const [location] = useLocation();
  const { getTotalItems } = useCartStore();
  const totalItems = getTotalItems();
  
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  const isMainPage = location === '/';

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    
    // Solo ocultar después de haber scrolleado 100px
    if (currentScrollY < 100) {
      setIsHeaderVisible(true);
    } else {
      // Si scrollea hacia abajo, ocultar; si scrollea hacia arriba, mostrar
      setIsHeaderVisible(currentScrollY < lastScrollY);
    }
    
    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  useEffect(() => {
    // Solo aplicar la funcionalidad de scroll en páginas que no sean la principal
    if (isMainPage) return;

    // Throttle scroll events para mejorar rendimiento
    let ticking = false;
    const throttledScrollHandler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScrollHandler, { passive: true });
    return () => window.removeEventListener('scroll', throttledScrollHandler);
  }, [handleScroll, isMainPage]);

  const isActive = useCallback((path: string) => {
    if (path === '/' && location === '/') return true;
    if (path !== '/' && location.startsWith(path)) return true;
    return false;
  }, [location]);

  const logoClass = useMemo(() => 
    isMainPage ? 'ecrist-logo ecrist-logo-main-page' : 'ecrist-logo', 
    [isMainPage]
  );

  const headerClassName = useMemo(() => {
    const baseClass = 'ecrist-header bg-[#001cba9c]';
    if (isMainPage) {
      return `${baseClass} header-main-page`;
    }
    return `${baseClass} ${isHeaderVisible ? 'header-visible' : 'header-hidden'}`;
  }, [isMainPage, isHeaderVisible]);

  return (
    <header className={headerClassName}>
      <Link 
        href="/" 
        className={logoClass} 
        data-testid="link-logo"
        onClick={(e) => {
          if (!isMainPage && onPageTransition) {
            e.preventDefault();
            onPageTransition('/');
          }
        }}
      >
        <div className="ecrist-logo-icon">🌿</div>
        <div className="ecrist-logo-text">
          {logoOverride || (isMainPage ? (
            <span>EcoCrist</span>
          ) : (
            <>
              <span className="ecrist-logo-short">E'Crist Commerce</span>
              <span className="ecrist-logo-full">EcoCrist</span>
            </>
          ))}
        </div>
      </Link>
      <nav className="ecrist-nav-menu">
        <Link 
          href="/inicio" 
          className={`ecrist-nav-link ${isActive('/inicio') ? 'active' : ''}`}
          data-testid="link-home"
          onClick={(e) => {
            if (isMainPage && onPageTransition) {
              e.preventDefault();
              onPageTransition('/inicio');
            }
          }}
        >
          Inicio
        </Link>
        <Link 
          href="/productos" 
          className={`ecrist-nav-link ${isActive('/productos') ? 'active' : ''}`}
          data-testid="link-products"
          onClick={(e) => {
            if (isMainPage && onPageTransition) {
              e.preventDefault();
              onPageTransition('/productos');
            }
          }}
        >
          Productos
        </Link>
        <Link 
          href="/sostenibilidad" 
          className={`ecrist-nav-link ${isActive('/sostenibilidad') ? 'active' : ''}`}
          data-testid="link-sustainability"
          onClick={(e) => {
            if (isMainPage && onPageTransition) {
              e.preventDefault();
              onPageTransition('/sostenibilidad');
            }
          }}
        >
          Sostenibilidad
        </Link>
        <Link 
          href="/nosotros" 
          className={`ecrist-nav-link ${isActive('/nosotros') ? 'active' : ''}`}
          data-testid="link-about"
          onClick={(e) => {
            if (isMainPage && onPageTransition) {
              e.preventDefault();
              onPageTransition('/nosotros');
            }
          }}
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
