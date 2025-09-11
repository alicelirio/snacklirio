import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export default function Cart() {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Meu Carrinho</h1>
        
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            {!user ? (
              <div className="text-center py-4">
                <p className="text-gray-600">Faça login para ver seu carrinho</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Lista de itens do carrinho será implementada aqui */}
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-600">Seu carrinho está vazio</p>
                </div>
                
                <div className="mt-6 border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>R$ 0,00</p>
                  </div>
                  <div className="mt-6">
                    <button
                      type="button"
                      className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Finalizar Pedido
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
