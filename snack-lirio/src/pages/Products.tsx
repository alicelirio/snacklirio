import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import api from '../services/api';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  supplierId: string;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const { addItem } = useCart();
  const isSupplier = user?.type === 'fornecedor';

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await api.get('/products');
      setProducts(response.data);
    } catch (err) {
      setError('Erro ao carregar produtos');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Carregando produtos...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-3">
        <h1 className="text-xl sm:text-2xl font-bold">Produtos</h1>
        {isSupplier && (
          <button
            onClick={() => {/* Implementar adição de produto */}}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 text-sm sm:text-base"
          >
            Adicionar Produto
          </button>
        )}
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
            {product.image && (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 sm:h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="text-base sm:text-lg font-semibold line-clamp-2 min-h-[2.5rem]">{product.name}</h3>
              <p className="text-gray-600 mt-1 text-sm line-clamp-3 min-h-[3.5rem]">{product.description}</p>
              <div className="mt-4 flex flex-col gap-3">
                <span className="text-lg sm:text-xl font-bold">R$ {product.price.toFixed(2)}</span>
                <button
                  onClick={() => addItem(product, 1)}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 text-sm"
                >Adicionar ao Carrinho</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
