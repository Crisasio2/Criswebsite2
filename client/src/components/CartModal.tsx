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
      className="z-[9999] animate-fadeIn"
      onClick={handleOverlayClick}
      data-testid="modal-cart"
      style={{ 
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        width: '100vw',
        height: '100vh',
        background: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        zIndex: 9999
      }}
    >
      <div 
        className="cart-modal-backdrop rounded-2xl flex flex-col" 
        style={{ 
          width: '100%',
          maxWidth: '32rem',
          maxHeight: 'calc(100vh - 40px)',
          position: 'relative'
        }}
      >
        {/* Fixed Header */}
        <div className="flex justify-between items-center p-6 pb-4 border-b border-gray-100 flex-shrink-0">
          <h3 className="text-2xl font-bold modern-blur-text" data-testid="text-cart-title">
            Tu Carrito
          </h3>
          <button 
            className="text-2xl modern-blur-text hover:opacity-75 transition-all"
            onClick={onClose}
            data-testid="button-close-cart"
          >
            ×
          </button>
        </div>
        
        {items.length === 0 ? (
          <div className="text-center modern-blur-text-muted italic my-10 px-6" data-testid="text-empty-cart">
            Tu carrito está vacío
          </div>
        ) : (
          <>
            {/* Scrollable Items List - Invisible scrollbar */}
            <div className="flex-1 overflow-y-auto px-6 py-4 cart-scroll-area" style={{ maxHeight: 'calc(80vh - 200px)' }}>
              <div className="space-y-4">
                {items.map((item) => (
                <div 
                  key={item.id} 
                  className="flex items-center gap-4 py-4 border-b border-gray-50"
                  data-testid={`cart-item-${item.id}`}
                >
                  <div className="flex-1">
                    <div 
                      className="font-semibold mb-1 modern-blur-text"
                      data-testid={`text-cart-item-name-${item.id}`}
                    >
                      {item.product.name}
                    </div>
                    <div 
                      className="font-semibold modern-blur-text"
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
                      <span className="font-semibold modern-blur-text" data-testid={`text-quantity-${item.id}`}>
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
                  
                  {/* Product Image */}
                  <div 
                    className="w-16 h-16 bg-cover bg-center rounded-xl flex-shrink-0 shadow-sm"
                    style={{ backgroundImage: `url('${item.product.image}')` }}
                    data-testid={`img-cart-item-${item.id}`}
                  >
                  </div>
                </div>
                ))}
              </div>
            </div>
            
            {/* Fixed Footer */}
            <div className="text-center p-6 pt-4 border-t-2 border-gray-100 flex-shrink-0">
              <div 
                className="text-2xl font-bold mb-5 modern-blur-text"
                data-testid="text-cart-total"
              >
                Total: S/{getTotalPrice().toFixed(2)}
              </div>
              <button 
                className="w-full py-4 rounded-xl text-lg font-semibold modern-blur-button"
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
