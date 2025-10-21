import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
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

export default function OrderDetails() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!user || !orderId) {
        navigate('/login');
        return;
      }

      try {
        const data = await orderService.getOrderDetails(orderId);
        
        // Verifica se o pedido pertence ao usuário
        if (data.userId !== user.id) {
          navigate('/profile/orders');
          return;
        }

        setOrder(data);
      } catch (error) {
        console.error('Erro ao buscar detalhes do pedido:', error);
        alert('Erro ao carregar detalhes do pedido. Tente novamente.');
        navigate('/profile/orders');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, user, navigate]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
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
        return 'Aguardando confirmação';
      case 'processing':
        return 'Em preparação';
      case 'shipped':
        return 'Em transporte';
      case 'delivered':
        return 'Entregue';
      case 'cancelled':
        return 'Cancelado';
      default:
        return status;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-600">Carregando detalhes do pedido...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-600">Pedido não encontrado</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Pedido #{orderId?.slice(0, 8)}
          </h1>
          <button
            onClick={() => navigate('/profile/orders')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
          >
            Voltar para Pedidos
          </button>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            {/* Cabeçalho do Pedido */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-sm text-gray-500">
                  Realizado em{' '}
                  {formatDate(order.createdAt)}
                </p>
              </div>
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                  order.status
                )}`}
              >
                {getStatusText(order.status)}
              </span>
            </div>

            {/* Timeline de Status */}
            <div className="mb-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-between">
                  {['pending', 'processing', 'shipped', 'delivered'].map((status, idx) => (
                    <div
                      key={status}
                      className={`flex flex-col items-center ${
                        ['pending', 'processing'].includes(order.status) && idx > 1
                          ? 'opacity-50'
                          : ''
                      }`}
                    >
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full ${
                          status === order.status
                            ? 'bg-indigo-600 text-white'
                            : idx < ['pending', 'processing', 'shipped', 'delivered'].indexOf(order.status)
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-300 text-gray-500'
                        }`}
                      >
                        {idx < ['pending', 'processing', 'shipped', 'delivered'].indexOf(order.status) ? (
                          '✓'
                        ) : (
                          idx + 1
                        )}
                      </div>
                      <p className="mt-2 text-xs text-gray-500">{getStatusText(status)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Lista de Itens */}
            <div className="mt-6 border-t border-gray-200">
              <dl className="divide-y divide-gray-200">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5"
                  >
                    <dt className="text-sm font-medium text-gray-500 flex items-center">
                      {item.product.image && (
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-16 h-16 object-cover rounded mr-4"
                        />
                      )}
                      <span>{item.product.name}</span>
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0">
                      {item.quantity}x R$ {item.price.toFixed(2)}
                    </dd>
                    <dd className="mt-1 text-sm font-medium text-gray-900 sm:mt-0 text-right">
                      R$ {(item.quantity * item.price).toFixed(2)}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Total e Informações Adicionais */}
            <div className="mt-8 border-t border-gray-200 pt-8">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Total</p>
                <p>R$ {order.total.toFixed(2)}</p>
              </div>
              
              {order.status === 'pending' && (
                <div className="mt-6">
                  <button
                    onClick={() => {
                      if (window.confirm('Tem certeza que deseja cancelar este pedido?')) {
                        // Implementar cancelamento
                      }
                    }}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Cancelar Pedido
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
