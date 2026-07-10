import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Fallback for different Zustand versions if named import fails
const createStore = typeof create === 'function' ? create : (create?.default || create);

const useCartStore = createStore(
  persist(
    (set, get) => ({
      cart: [],
  lastOrderTime: localStorage.getItem('last_order_time') || null,
  lastOrderId: localStorage.getItem('last_order_id') || null,
  
  persistOrderTime: (orderId = null) => {
    const now = new Date().toISOString();
    localStorage.setItem('last_order_time', now);
    if (orderId) localStorage.setItem('last_order_id', String(orderId));
    set({ lastOrderTime: now, lastOrderId: orderId ? String(orderId) : get().lastOrderId });
  },
      addToCart: (product, size) => set((state) => {
        const existing = state.cart.find(item => item.id === product.id && item.size === size);
        if (existing) {
          return {
            cart: state.cart.map(item => 
              (item.id === product.id && item.size === size) 
                ? { ...item, quantity: item.quantity + 1 } 
                : item
            )
          };
        }
        return { cart: [...state.cart, { ...product, size, quantity: 1 }] };
      }),
      removeFromCart: (productId, size) => set((state) => ({
        cart: state.cart.filter(item => !(item.id === productId && item.size === size))
      })),
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: 'biryani-cart-storage',
    }
  )
);

export default useCartStore;
