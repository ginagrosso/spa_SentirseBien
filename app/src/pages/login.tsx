import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.ok) {
      login(data.token);
      router.push('/reservar');
    } else {
      alert(data.error || 'Error en login');
    }
  }

  return (
      <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
        <h1 className="text-xl mb-4">Iniciar Sesión</h1>
        <input
            type="email"
            placeholder="Email"
            className="block w-full p-2 mb-3 border"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
        />
        <input
            type="password"
            placeholder="Contraseña"
            className="block w-full p-2 mb-3 border"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
        />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white">
          Entrar
        </button>
      </form>
  );
}
