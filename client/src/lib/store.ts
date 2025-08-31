import { create } from 'zustand';
import type { Product, CartItemWithProduct, SearchFilters } from '@shared/schema';

interface CartStore {
  items: CartItemWithProduct[];
  isCartOpen: boolean;
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isCartOpen: false,

  addItem: (product: Product) => {
    set((state) => {
      const existingItem = state.items.find(item => item.productId === product.id);
      
      if (existingItem) {
        return {
          items: state.items.map(item =>
            item.productId === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      } else {
        const newItem: CartItemWithProduct = {
          id: Date.now().toString(),
          productId: product.id,
          quantity: 1,
          userId: undefined,
          product
        };
        return {
          items: [...state.items, newItem]
        };
      }
    });
  },

  removeItem: (id: string) => {
    set((state) => ({
      items: state.items.filter(item => item.id !== id)
    }));
  },

  updateQuantity: (id: string, quantity: number) => {
    set((state) => {
      if (quantity <= 0) {
        return {
          items: state.items.filter(item => item.id !== id)
        };
      }
      return {
        items: state.items.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
      };
    });
  },

  clearCart: () => {
    set({ items: [] });
  },

  toggleCart: () => {
    set((state) => ({ isCartOpen: !state.isCartOpen }));
  },

  getTotalItems: () => {
    const { items } = get();
    return items.reduce((total, item) => total + item.quantity, 0);
  },

  getTotalPrice: () => {
    const { items } = get();
    return items.reduce((total, item) => total + (parseFloat(item.product.price) * item.quantity), 0);
  },
}));

// Search Store for sharing search data between pages
interface SearchStore {
  currentSearch: string;
  searchFilters: SearchFilters;
  setSearch: (search: string) => void;
  setSearchFilters: (filters: SearchFilters) => void;
  clearSearch: () => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  currentSearch: '',
  searchFilters: {
    product: '',
    category: '',
    location: '',
  },
  
  setSearch: (search: string) => {
    set({ currentSearch: search });
  },
  
  setSearchFilters: (filters: SearchFilters) => {
    set({ 
      searchFilters: filters,
      currentSearch: filters.product || ''
    });
  },
  
  clearSearch: () => {
    set({ 
      currentSearch: '',
      searchFilters: { product: '', category: '', location: '' }
    });
  },
}));
