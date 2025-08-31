import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import type { CartItemWithProduct, InsertCartItem } from '@shared/schema';
import { useMemo } from 'react';

export function useCart() {
  const queryClient = useQueryClient();

  const cartQuery = useQuery<CartItemWithProduct[]>({
    queryKey: ['/api/cart'],
    staleTime: 30000, // 30 segundos de cache
  });

  const addToCartMutation = useMutation({
    mutationFn: async (cartItem: InsertCartItem) => {
      const response = await apiRequest('POST', '/api/cart', cartItem);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cart'] });
    },
  });

  const updateQuantityMutation = useMutation({
    mutationFn: async ({ id, quantity }: { id: string; quantity: number }) => {
      const response = await apiRequest('PUT', `/api/cart/${id}`, { quantity });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cart'] });
    },
  });

  const removeFromCartMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await apiRequest('DELETE', `/api/cart/${id}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cart'] });
    },
  });

  const clearCartMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest('DELETE', '/api/cart');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cart'] });
    },
  });

  const totalItems = useMemo(() => 
    (cartQuery.data || []).reduce((total, item) => total + item.quantity, 0),
    [cartQuery.data]
  );

  const totalPrice = useMemo(() => 
    (cartQuery.data || []).reduce((total, item) => 
      total + (parseFloat(item.product?.price || "0") * item.quantity), 0),
    [cartQuery.data]
  );

  return {
    cartItems: cartQuery.data || [],
    isLoading: cartQuery.isLoading,
    addToCart: addToCartMutation.mutate,
    updateQuantity: updateQuantityMutation.mutate,
    removeFromCart: removeFromCartMutation.mutate,
    clearCart: clearCartMutation.mutate,
    isAddingToCart: addToCartMutation.isPending,
    totalItems,
    totalPrice,
    getTotalItems: () => totalItems,
    getTotalPrice: () => totalPrice,
  };
}
