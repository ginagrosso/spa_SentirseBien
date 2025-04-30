'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  nombre: string;
  rol: string;
}

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        if (typeof window !== 'undefined') {
          const storedUser = localStorage.getItem('spa-logueado');
          if (storedUser && mounted) {
            setUser(JSON.parse(storedUser));
          }
        }
      } catch (error) {
        console.error('Error loading user from localStorage:', error);
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    initializeAuth();

    return () => {
      mounted = false;
    };
  }, []);

  const login = (userData: User) => {
    try {
      setUser(userData);
      if (typeof window !== 'undefined') {
        localStorage.setItem('spa-logueado', JSON.stringify(userData));
      }
    } catch (error) {
      console.error('Error saving user to localStorage:', error);
    }
  };

  const logout = () => {
    try {
      setUser(null);
      if (typeof window !== 'undefined') {
        localStorage.removeItem('spa-logueado');
      }
    } catch (error) {
      console.error('Error removing user from localStorage:', error);
    }
  };

  const value = {
    user,
    login,
    logout,
    isLoading
  };

  if (isLoading) {
    return null;
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 