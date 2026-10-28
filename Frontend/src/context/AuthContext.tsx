import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { loginUser, registerUser } from '../services/api';

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  bloodType?: string;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: string) => Promise<User>;
  register: (formData: Record<string, string>) => Promise<User>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('bloodlink_token');
    const storedUser = localStorage.getItem('bloodlink_user');
    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem('bloodlink_token');
        localStorage.removeItem('bloodlink_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: string) => {
    try {
      const res = await loginUser({ email, password, role });
      const { token, data } = res.data;
      localStorage.setItem('bloodlink_token', token);
      localStorage.setItem('bloodlink_user', JSON.stringify(data));
      setUser(data);
      return data;
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Login failed');
    }
  };

  const register = async (formData: Record<string, string>) => {
    try {
      const res = await registerUser(formData);
      const { token, data } = res.data;
      localStorage.setItem('bloodlink_token', token);
      localStorage.setItem('bloodlink_user', JSON.stringify(data));
      setUser(data);
      return data;
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Registration failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('bloodlink_token');
    localStorage.removeItem('bloodlink_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export default AuthContext;