import api from './api';
import { CartItem } from '../contexts/CartContext';

export interface Order {
  id: string;
  userId: string;
  status: string;
  total: number;
  createdAt: string;
  items: {
    quantity: number;
    price: number;
    product: {
      id: string;
      name: string;
      image: string | null;
    };
  }[];
}

export const orderService = {
  createOrder: async (items: CartItem[]) => {
    const response = await api.post<Order>('/orders', { items });
    return response.data;
  },

  getUserOrders: async (userId: string) => {
    const response = await api.get<Order[]>(`/orders/${userId}`);
    return response.data;
  },

  getOrderDetails: async (orderId: string) => {
    const response = await api.get<Order>(`/orders/${orderId}/details`);
    return response.data;
  }
};
