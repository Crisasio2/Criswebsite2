import { useCartStore } from '@/lib/store';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const { items, removeItem, updateQuantity, clearCart, getTotalPrice } = useCartStore();

  if (!isOpen) return null;

  const handleCheckout = () => {
    if (items.length === 0) return;
    
    const total = getTotalPrice();
    alert(`¡Gracias por tu compra! Total: S/${total.toFixed(2)}`);
    clearCart();
    onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center animate-fadeIn"
      onClick={handleOverlayClick}
      data-testid="modal-cart"
    >
      <div className="bg-white rounded-2xl p-8 max-w-lg w-full max-h-[70vh] overflow-y-auto mx-4 animate-slideUp">
        <div className="flex justify-between items-center mb-5 border-b border-gray-100 pb-4">
          <h3 className="text-2xl font-bold" style={{ color: 'var(--ecrist-text-primary)' }} data-testid="text-cart-title">
            Tu Carrito
          </h3>
          <button 
            className="text-2xl text-gray-400 hover:text-gray-600 transition-colors"
            onClick={onClose}
            data-testid="button-close-cart"
          >
            ×
          </button>
        </div>
        
        {items.length === 0 ? (
          <div className="text-center text-gray-500 italic my-10" data-testid="text-empty-cart">
            Tu carrito está vacío
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {items.map((item) => (
                <div 
                  key={item.id} 
                  className="flex justify-between items-center py-4 border-b border-gray-50"
                  data-testid={`cart-item-${item.id}`}
                >
                  <div className="flex-1">
                    <div 
                      className="font-semibold mb-1"
                      style={{ color: 'var(--ecrist-text-primary)' }}
                      data-testid={`text-cart-item-name-${item.id}`}
                    >
                      {item.product.name}
                    </div>
                    <div 
                      className="font-semibold"
                      style={{ color: 'var(--ecrist-primary)' }}
                      data-testid={`text-cart-item-price-${item.id}`}
                    >
                      S/{item.product.price}
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                      <button 
                        className="w-8 h-8 rounded-full text-white font-bold transition-all hover:scale-105"
                        style={{ background: 'var(--ecrist-secondary)' }}
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        data-testid={`button-decrease-quantity-${item.id}`}
                      >
                        -
                      </button>
                      <span className="font-semibold" data-testid={`text-quantity-${item.id}`}>
                        {item.quantity}
                      </span>
                      <button 
                        className="w-8 h-8 rounded-full text-white font-bold transition-all hover:scale-105"
                        style={{ background: 'var(--ecrist-secondary)' }}
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        data-testid={`button-increase-quantity-${item.id}`}
                      >
                        +
                      </button>
                      <button 
                        className="w-8 h-8 rounded-full text-white font-bold transition-all hover:scale-105 ml-2"
                        style={{ background: '#ff4444' }}
                        onClick={() => removeItem(item.id)}
                        data-testid={`button-remove-item-${item.id}`}
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-5 pt-5 border-t-2 border-gray-100">
              <div 
                className="text-2xl font-bold mb-5"
                style={{ color: 'var(--ecrist-text-primary)' }}
                data-testid="text-cart-total"
              >
                Total: S/{getTotalPrice().toFixed(2)}
              </div>
              <button 
                className="w-full py-4 text-white rounded-xl text-lg font-semibold transition-all hover:transform hover:translate-y-[-2px]"
                style={{ background: 'var(--ecrist-primary)' }}
                onClick={handleCheckout}
                data-testid="button-checkout"
              >
                Proceder al Pago
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
