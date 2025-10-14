import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';

export default function Header() {
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);

  const commonLinks = (
    <>
      <Link to="/" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">Home</Link>
      <Link to="/about" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">Sobre</Link>
      {user && (
        <Link to="/products" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">Produtos</Link>
      )}
      {user?.type === 'fornecedor' && (
        <Link to="/meus-produtos" className="block px-3 py-2 rounded-md text-sm font-medium text-indigo-600 hover:bg-indigo-50">Meus Produtos</Link>
      )}
      {(user?.type === 'admin' || user?.type === 'fornecedor') && (
        <Link to="/admin" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">Área Administrativa</Link>
      )}
      {user && (
        <Link to="/cart" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">Carrinho</Link>
      )}
      {user && (
        <Link to="/profile" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">Perfil</Link>
      )}
    </>
  );

  return (
    <header className="bg-white shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-indigo-600">Snack Lírio</span>
          </Link>
          {/* Desktop */}
          <div className="hidden sm:flex sm:items-center sm:space-x-6">
            {commonLinks}
            {user ? (
              <button onClick={signOut} className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">Sair</button>
            ) : (
              <>
                <Link to="/login" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">Entrar</Link>
                <Link to="/register" className="px-4 py-2 rounded-md text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700">Cadastrar</Link>
              </>
            )}
          </div>
          {/* Mobile hamburger */}
          <button onClick={() => setOpen(o => !o)} className="sm:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500" aria-label="Menu">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        {/* Mobile panel */}
        {open && (
          <div className="sm:hidden pb-4 space-y-1 border-t border-gray-200">
            {commonLinks}
            {user ? (
              <button onClick={signOut} className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">Sair</button>
            ) : (
              <div className="px-3 pt-2 space-y-2">
                <Link to="/login" className="block w-full text-center px-4 py-2 rounded-md text-sm font-medium bg-gray-100 text-gray-800 hover:bg-gray-200">Entrar</Link>
                <Link to="/register" className="block w-full text-center px-4 py-2 rounded-md text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700">Cadastrar</Link>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
