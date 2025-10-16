import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const { user } = useContext(AuthContext);
  const { items, removeItem, updateQuantity, total, checkout, isLoading } = useCart();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (items.length === 0) {
      alert('Seu carrinho está vazio');
      return;
    }

    const itemsList = items.map(item => 
      `- ${item.quantity}x ${item.name} (R$ ${(item.price * item.quantity).toFixed(2)})`
    ).join('\n');

    const confirmMessage = `Confirmar pedido?\n\nItens:\n${itemsList}\n\nTotal: R$ ${total.toFixed(2)}`;

    if (window.confirm(confirmMessage)) {
      try {
        await checkout();
      } catch (error) {
        console.error('Erro ao finalizar pedido:', error);
        alert('Não foi possível finalizar o pedido. Por favor, tente novamente.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-5xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Meu Carrinho</h1>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6 space-y-4">
            {!user ? (
              <div className="text-center py-4">
                <p className="text-gray-600">Faça login para ver seu carrinho</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.length === 0 ? (
                  <div className="text-center py-4">
                    <p className="text-gray-600">Seu carrinho está vazio</p>
                    <button
                      onClick={() => navigate('/products')}
                      className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
                    >
                      Ver Produtos
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={item.id} className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 p-4 bg-gray-50 rounded-lg space-y-3 sm:space-y-0">
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded self-center sm:self-auto"
                          />
                        )}
                        <div className="flex-1 space-y-1">
                          <h3 className="text-base sm:text-lg font-medium leading-tight">{item.name}</h3>
                          <p className="text-sm sm:text-gray-600">R$ {item.price.toFixed(2)}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 rounded-full hover:bg-gray-200"
                          >
                            -
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 rounded-full hover:bg-gray-200"
                          >
                            +
                          </button>
                        </div>
                        <div className="flex justify-end sm:block">
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-600 hover:text-red-800 text-sm"
                          >
                            Remover
                          </button>
                        </div>
                      </div>
                    ))}
                    
                    <div className="mt-6 border-t border-gray-200 pt-4">
                      <div className="flex justify-between text-sm sm:text-base font-medium text-gray-900">
                        <p>Total</p>
                        <p className="font-semibold">R$ {total.toFixed(2)}</p>
                      </div>
                      <div className="mt-6">
                        <button
                          onClick={handleCheckout}
                          disabled={isLoading}
                          className={`w-full ${
                            isLoading
                              ? 'bg-indigo-400 cursor-not-allowed'
                              : 'bg-indigo-600 hover:bg-indigo-700'
                          } border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                        >
                          {isLoading ? 'Processando...' : 'Finalizar Pedido'}
                        </button>
                        <p className="text-xs text-gray-500 mt-2 text-center">Revise os itens antes de finalizar</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
