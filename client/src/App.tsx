import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useState, useEffect, useCallback, useMemo } from "react";

import Header from "@/components/Header";
import CartModal from "@/components/CartModal";
import ECristCommerce from "@/pages/ECristCommerce";
import Home from "@/pages/Home";
import Products from "@/pages/Products";
import Sustainability from "@/pages/Sustainability";
import About from "@/pages/About";
import NotFound from "@/pages/not-found";

function Router() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [location, setLocation] = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionStage, setTransitionStage] = useState<'idle' | 'fadeOut' | 'expand' | 'fadeIn'>('idle');
  const [targetPage, setTargetPage] = useState<string>('');
  const [logoOverride, setLogoOverride] = useState<string | null>(null);

  const toggleCart = useCallback(() => {
    setIsCartOpen(prev => !prev);
  }, []);

  const handlePageTransition = useCallback(async (href: string) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setTargetPage(href);
    
    // Si vamos a la página principal, cambiar inmediatamente el logo a "EcoCrist"
    if (href === '/') {
      setLogoOverride('EcoCrist');
    }
    
    // Fase 1: Fade out del contenido actual
    setTransitionStage('fadeOut');
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Fase 2: Expandir el fondo blanco
    setTransitionStage('expand');
    await new Promise(resolve => setTimeout(resolve, 400));
    
    // Cambiar la página
    setLocation(href);
    
    // Fase 3: Fade in del nuevo contenido
    setTransitionStage('fadeIn');
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Resetear estados
    setTransitionStage('idle');
    setIsTransitioning(false);
    setTargetPage('');
    setLogoOverride(null);
  }, [isTransitioning, setLocation]);

  // Agregar/quitar clase al body según la página
  useEffect(() => {
    const isMainPage = location === '/';
    if (isMainPage) {
      document.body.classList.add('main-page');
    } else {
      document.body.classList.remove('main-page');
    }
    
    return () => {
      document.body.classList.remove('main-page');
    };
  }, [location]);

  const containerClasses = useMemo(() => 
    `ecrist-container ${isTransitioning ? `transitioning transition-${transitionStage}` : ''}`, 
    [isTransitioning, transitionStage]
  );

  const overlayClasses = useMemo(() => 
    `transition-overlay transition-overlay-${transitionStage}`, 
    [transitionStage]
  );

  const closeCart = useCallback(() => setIsCartOpen(false), []);

  return (
    <div className={containerClasses}>
      <Header onCartToggle={toggleCart} onPageTransition={handlePageTransition} logoOverride={logoOverride} />
      
      <div className="page-content">
        <Switch>
          <Route path="/" component={ECristCommerce} />
          <Route path="/inicio" component={Home} />
          <Route path="/productos" component={Products} />
          <Route path="/sostenibilidad" component={Sustainability} />
          <Route path="/nosotros" component={About} />
          <Route component={NotFound} />
        </Switch>
      </div>
      
      {isTransitioning && (
        <div className={overlayClasses}></div>
      )}
      
      <CartModal isOpen={isCartOpen} onClose={closeCart} />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
