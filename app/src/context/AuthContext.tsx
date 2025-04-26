// app/src/context/AuthContext.tsx
import { createContext, useState, useContext, ReactNode } from 'react';

interface AuthContextType {
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [token, setToken] = useState<string | null>(
        typeof window !== 'undefined' ? localStorage.getItem('token') : null
    );

    function login(newToken: string) {
        localStorage.setItem('token', newToken);
        setToken(newToken);
    }

    function logout() {
        localStorage.removeItem('token');
        setToken(null);
    }

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider');
    return ctx;
}
