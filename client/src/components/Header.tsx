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
    // Aplicar la funcionalidad de scroll en todas las páginas
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
  }, [handleScroll]);

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

  if (isMainPage) {
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
            {logoOverride || (
              <span>EcoCrist</span>
            )}
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

  // Header mejorado para subpáginas (inspirado en Linio)
  return (
    <>
      {/* Barra superior informativa */}
      <div className="ecrist-top-bar">
        <div className="ecrist-top-bar-content">
          <span className="ecrist-delivery-info">🚚 Envío gratis en compras sobre $50.000</span>
          <div className="ecrist-user-menu">
            <span className="ecrist-greeting">Hola, Bienvenido</span>
            <Link href="#" className="ecrist-account-link" data-testid="link-account">
              Mi cuenta
            </Link>
            <Link href="#" className="ecrist-help-link" data-testid="link-help">
              Ayuda
            </Link>
          </div>
        </div>
      </div>
      
      {/* Header principal mejorado */}
      <header className={`${headerClassName} ecrist-enhanced-header ${isHeaderVisible ? 'header-visible' : 'header-hidden'}`}>
        <div className="ecrist-header-container">
          {/* Logo */}
          <Link 
            href="/" 
            className={`${logoClass} ecrist-enhanced-logo`} 
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
              <span>E'Crist Commerce</span>
            </div>
          </Link>
          
          {/* Categorías dropdown */}
          <div className="ecrist-categories-dropdown">
            <button className="ecrist-categories-btn" data-testid="button-categories">
              📂 Categorías
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
          
          {/* Barra de búsqueda central */}
          <div className="ecrist-search-section">
            <div className="ecrist-search-input-container">
              <input
                type="text"
                placeholder="Buscar productos sostenibles..."
                className="ecrist-main-search-input"
                data-testid="input-main-search"
              />
              <button className="ecrist-search-btn" data-testid="button-main-search">
                🔍
              </button>
            </div>
          </div>
          
          {/* Menú de usuario y carrito */}
          <div className="ecrist-user-actions">
            <div className="ecrist-user-info">
              <span className="ecrist-user-greeting">Hola,</span>
              <Link href="#" className="ecrist-login-link" data-testid="link-login">
                Inicia sesión
              </Link>
            </div>
            <Link href="#" className="ecrist-purchases-link" data-testid="link-purchases">
              🛍️ Mis compras
            </Link>
            <button 
              className="ecrist-cart-btn-enhanced" 
              onClick={onCartToggle}
              data-testid="button-cart"
            >
              🛒 Carrito
              {totalItems > 0 && (
                <span className="ecrist-cart-count-enhanced" data-testid="text-cart-count">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
        
        {/* Navegación secundaria */}
        <nav className="ecrist-secondary-nav">
          <Link 
            href="/inicio" 
            className={`ecrist-secondary-nav-link ${isActive('/inicio') ? 'active' : ''}`}
            data-testid="link-home"
          >
            🏠 Inicio
          </Link>
          <Link 
            href="/productos" 
            className={`ecrist-secondary-nav-link ${isActive('/productos') ? 'active' : ''}`}
            data-testid="link-products"
          >
            🛍️ Productos
          </Link>
          <Link 
            href="/sostenibilidad" 
            className={`ecrist-secondary-nav-link ${isActive('/sostenibilidad') ? 'active' : ''}`}
            data-testid="link-sustainability"
          >
            🌱 Sostenibilidad
          </Link>
          <Link 
            href="/nosotros" 
            className={`ecrist-secondary-nav-link ${isActive('/nosotros') ? 'active' : ''}`}
            data-testid="link-about"
          >
            ℹ️ Nosotros
          </Link>
        </nav>
      </header>
    </>
  );
}
