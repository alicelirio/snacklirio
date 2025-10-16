import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { orderService, Order } from '../services/orderService';
// Função auxiliar para formatar data
const formatDate = (date: string) => {
  const d = new Date(date);
  return d.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      
      try {
        const data = await orderService.getUserOrders(user.id);
        setOrders(data);
      } catch (error) {
        console.error('Erro ao buscar pedidos:', error);
        alert('Erro ao carregar pedidos. Tente novamente.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pendente';
      case 'processing':
        return 'Em processamento';
      case 'completed':
        return 'Concluído';
      case 'cancelled':
        return 'Cancelado';
      default:
        return status;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-600 animate-pulse">Carregando pedidos…</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Meus Pedidos</h1>

        {orders.length === 0 ? (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <p className="text-gray-600 text-center">Você ainda não fez nenhum pedido</p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div 
                key={order.id} 
                className="bg-white shadow overflow-hidden sm:rounded-lg cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => navigate(`/profile/orders/${order.id}`)}
              >
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Pedido #{order.id.slice(0, 8)}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {getStatusText(order.status)}
                    </span>
                  </div>

                  <div className="mt-6 border-t border-gray-200">
                    <dl className="divide-y divide-gray-200">
                      {order.items.map((item, index) => (
                        <div
                          key={index}
                          className="py-4 sm:grid sm:grid-cols-3 sm:gap-4"
                        >
                          <dt className="text-sm font-medium text-gray-500 flex items-center">
                            {item.product.image && (
                              <img
                                src={item.product.image}
                                alt={item.product.name}
                                className="w-12 h-12 object-cover rounded mr-4"
                              />
                            )}
                            {item.product.name}
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0">
                            {item.quantity}x R$ {item.price.toFixed(2)}
                          </dd>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:text-right">
                            R$ {(item.quantity * item.price).toFixed(2)}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>

                  <div className="mt-6 border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Total</p>
                      <p>R$ {order.total.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
