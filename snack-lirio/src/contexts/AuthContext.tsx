import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import api from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
  type: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStoredData() {
      const storedToken = localStorage.getItem('snacklirio:token');
      const storedUser = localStorage.getItem('snacklirio:user');

      if (storedToken && storedUser) {
        api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        setUser(JSON.parse(storedUser));
      }

      setLoading(false);
    }

    loadStoredData();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', {
        email,
        password,
      });

      const { token, user } = response.data;

      localStorage.setItem('snacklirio:token', token);
      localStorage.setItem('snacklirio:user', JSON.stringify(user));

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(user);
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    }
  };

  const signUp = async (name: string, email: string, password: string) => {
    try {
      const response = await api.post('/auth/register', {
        name,
        email,
        password,
      });

      const { token, user } = response.data;

      localStorage.setItem('snacklirio:token', token);
      localStorage.setItem('snacklirio:user', JSON.stringify(user));

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(user);
    } catch (error) {
      console.error('Erro ao fazer cadastro:', error);
      throw error;
    }
  };

  const signOut = () => {
    localStorage.removeItem('snacklirio:token');
    localStorage.removeItem('snacklirio:user');
    api.defaults.headers.common['Authorization'] = '';
    setUser(null);
  };

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated: !!user, 
        user, 
        signIn, 
        signUp, 
        signOut,
        loading 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext)
