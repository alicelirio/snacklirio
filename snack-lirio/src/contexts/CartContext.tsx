import { createContext, useContext, useState, ReactNode } from 'react';
import { orderService } from '../services/orderService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CartContextData {
  items: CartItem[];
  addItem: (product: any, quantity: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  checkout: () => Promise<void>;
  isLoading: boolean;
}

export const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const addItem = (product: any, quantity: number = 1) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.id === product.id);
      
      if (existingItem) {
        return currentItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...currentItems, {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity,
        image: product.image
      }];
    });
  };

  const removeItem = (productId: string) => {
    setItems(currentItems => currentItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(productId);
      return;
    }

    setItems(currentItems =>
      currentItems.map(item =>
        item.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const checkout = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      setIsLoading(true);
      await orderService.createOrder(items);
      clearCart();
      navigate('/profile/orders');
    } catch (error) {
      console.error('Erro ao criar pedido:', error);
      alert('Erro ao finalizar pedido. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CartContext.Provider 
      value={{ 
        items, 
        addItem, 
        removeItem, 
        updateQuantity, 
        clearCart,
        total,
        checkout,
        isLoading
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
