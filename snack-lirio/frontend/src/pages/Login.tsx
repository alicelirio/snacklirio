import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    console.log('🔍 Tentando fazer login...');
    console.log('Email:', email);
    console.log('Senha:', password ? '******' : '(vazio)');
    
    if (!email || !password) {
      setError('Por favor, preencha email e senha');
      return;
    }
    
    try {
      console.log('📡 Enviando requisição...');
      await signIn(email, password);
      console.log('✅ Login bem-sucedido!');
      navigate('/');
    } catch (err: any) {
      console.error('❌ Erro no login:', err);
      setError(err.response?.data?.error || 'Erro ao fazer login');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8 p-6 sm:p-8 bg-white rounded-lg shadow">
        <h2 className="text-center text-2xl sm:text-3xl font-bold">Login</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-2 border rounded"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            className="w-full p-2 border rounded"
          />
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white p-3 rounded hover:bg-indigo-700 transition-colors text-sm font-medium"
          >Entrar</button>
        </form>
      </div>
    </div>
  );
}
