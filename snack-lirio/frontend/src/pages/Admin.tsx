import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string | null;
  supplier?: { name: string };
}

export function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [stats, setStats] = useState<{ totalPending: number; totalDelivered: number }>({ totalPending: 0, totalDelivered: 0 });
  const { user } = useAuth();

  useEffect(() => {
    loadProducts();
    loadOrders();
    loadStats();
  }, []);

  const loadProducts = async () => {
    try {
      let response;
      if (user?.type === 'admin') {
        response = await api.get('/products');
      } else if (user?.type === 'fornecedor') {
        response = await api.get(`/products/supplier`);
      }
      if (response?.data) {
        setProducts(response.data);
      }
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
    }
  };

  const loadOrders = async () => {
    try {
      const response = await api.get('/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Erro ao carregar pedidos:', error);
  toast.error('Erro ao carregar pedidos');
    }
  };

  const loadStats = async () => {
    try {
      const response = await api.get('/orders/stats/summary');
      setStats(response.data);
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
  toast.error('Erro ao carregar estatísticas');
    }
  };

  const totalProducts = useMemo(() => products.length, [products]);

  const statusOptions = [
    { value: 'pending', label: 'Pendente' },
    { value: 'processing', label: 'Em processamento' },
    { value: 'shipped', label: 'Enviado' },
    { value: 'delivered', label: 'Entregue' },
  ];

  const statusBadge = (status: string) => {
    const map: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800',
      processing: 'bg-blue-100 text-blue-800',
      shipped: 'bg-purple-100 text-purple-800',
      delivered: 'bg-green-100 text-green-800',
    };
    const text = statusOptions.find(s => s.value === status)?.label || status;
    return <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${map[status] || 'bg-gray-100 text-gray-800'}`}>{text}</span>;
  };

  const handleUpdateStatus = async (orderId: string, status: string) => {
    try {
  await api.patch(`/orders/${orderId}/status`, { status });
  toast.success('Status atualizado com sucesso');
      await Promise.all([loadOrders(), loadStats()]);
    } catch (error) {
      console.error('Erro ao atualizar status do pedido:', error);
  toast.error('Não foi possível atualizar o status');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/products/${id}`);
      loadProducts();
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <h1 className="text-3xl font-bold">Painel Administrativo</h1>

      {/* Cards de métricas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-indigo-50 border border-indigo-200 p-6 rounded-lg">
          <p className="text-sm text-indigo-700">Total de Produtos</p>
          <p className="text-3xl font-bold text-indigo-900">{totalProducts}</p>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
          <p className="text-sm text-yellow-700">Pedidos Pendentes</p>
          <p className="text-3xl font-bold text-yellow-900">{stats.totalPending}</p>
        </div>
        <div className="bg-green-50 border border-green-200 p-6 rounded-lg">
          <p className="text-sm text-green-700">Pedidos Entregues</p>
          <p className="text-3xl font-bold text-green-900">{stats.totalDelivered}</p>
        </div>
      </div>

      {/* Listagem de pedidos com atualização de status */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Pedidos</h2>
        </div>
        {orders.length === 0 ? (
          <p className="text-gray-600">Nenhum pedido encontrado.</p>
        ) : (
          <>
            {/* Tabela desktop */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pedido</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-2"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td className="px-4 py-3 text-sm text-gray-900">#{order.id.slice(0,8)}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{order.user?.name || '-'}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">R$ {Number(order.total).toFixed(2)}</td>
                      <td className="px-4 py-3 text-sm space-x-2 flex items-center">
                        {statusBadge(order.status)}
                        <select
                          value={order.status}
                          onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                          className="border rounded px-2 py-1 text-sm"
                        >
                          {statusOptions.map(opt => (
                            <option value={opt.value} key={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-3 text-right text-sm">
                        <button
                          onClick={() => handleUpdateStatus(order.id, order.status)}
                          className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
                        >
                          Atualizar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Cards mobile */}
            <div className="md:hidden space-y-4">
              {orders.map(order => (
                <div key={order.id} className="border border-gray-200 rounded-lg p-4 space-y-2 bg-gray-50">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Pedido #{order.id.slice(0,8)}</span>
                    {statusBadge(order.status)}
                  </div>
                  <p className="text-sm text-gray-600">Cliente: <span className="font-medium text-gray-800">{order.user?.name || '-'}</span></p>
                  <p className="text-sm text-gray-600">Total: <span className="font-semibold">R$ {Number(order.total).toFixed(2)}</span></p>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <select
                      value={order.status}
                      onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                      className="border rounded px-3 py-2 text-sm bg-white"
                    >
                      {statusOptions.map(opt => (
                        <option value={opt.value} key={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                    <button
                      onClick={() => handleUpdateStatus(order.id, order.status)}
                      className="w-full sm:w-auto bg-indigo-600 text-white px-3 py-2 rounded text-sm font-medium hover:bg-indigo-700"
                    >
                      Atualizar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      
      {/* Gerenciamento simples de produtos (visual) */}
      <h2 className="text-xl font-semibold">Gerenciamento de Produtos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md p-6">
            {product.image && (
              <img
                src={product.image}
                alt={product.name}
        className="w-full h-40 sm:h-48 object-cover rounded-lg mb-4"
              />
            )}
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-2">{product.description}</p>
            <p className="text-lg font-bold mb-4">
              R$ {product.price.toFixed(2)}
            </p>
            {product.supplier?.name && (
              <p className="text-sm text-gray-500 mb-4">
                Fornecedor: {product.supplier.name}
              </p>
            )}
      <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2">
              <button
                onClick={() => handleDelete(product.id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Deletar
              </button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Editar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminPage;
