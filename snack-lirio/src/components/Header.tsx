import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-white shadow">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">Snack Lírio</Link>
          <div className="space-x-4">
            <Link to="/about" className="text-gray-600 hover:text-gray-900">Sobre</Link>
            <Link to="/cart" className="text-gray-600 hover:text-gray-900">Carrinho</Link>
            <Link to="/login" className="text-gray-600 hover:text-gray-900">Login</Link>
            <Link to="/register" className="text-gray-600 hover:text-gray-900">Cadastro</Link>
            <Link to="/profile" className="text-gray-600 hover:text-gray-900">Perfil</Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
