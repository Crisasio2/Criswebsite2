import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useState } from "react";

import Header from "@/components/Header";
import CartModal from "@/components/CartModal";
import Home from "@/pages/Home";
import Products from "@/pages/Products";
import Sustainability from "@/pages/Sustainability";
import About from "@/pages/About";
import NotFound from "@/pages/not-found";

function Router() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div className="ecrist-container">
      <Header onCartToggle={toggleCart} />
      
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/productos" component={Products} />
        <Route path="/sostenibilidad" component={Sustainability} />
        <Route path="/nosotros" component={About} />
        <Route component={NotFound} />
      </Switch>
      
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
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
