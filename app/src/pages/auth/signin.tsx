import { useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import { motion } from 'framer-motion';

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { data: session, status } = useSession();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const result = await signIn('credentials', {
                redirect: false,
                email,
                password
            });

            if (result?.error) {
                setError(result.error);
                setIsLoading(false);
                return;
            }

            // Esperar a que la sesión se actualice
            const response = await fetch('/api/auth/session');
            const sessionData = await response.json();
            
            if (sessionData?.user?.rol === 'admin') {
                router.push('/admin/dashboard');
            } else {
                router.push('/');
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('Ocurrió un error al iniciar sesión');
            setIsLoading(false);
        }
    };

    // Si está cargando o ya autenticado, mostrar un estado de carga
    if (status === 'loading' || status === 'authenticated' || isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-4 text-gray-600">Cargando...</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <PageHero 
                title="Iniciar Sesión"
                description="Ingresa a tu cuenta para reservar tus turnos y acceder a todos los beneficios de Sentirse Bien."
            />

            <main className="bg-white font-roboto py-16">
                <div className="max-w-md mx-auto px-4">
                    <motion.div 
                        className="bg-[#F5F9F8] p-8 rounded-xl shadow-lg border border-[#B6D5C8]"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-[#436E6C] mb-1">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    className="w-full p-3 rounded-md border border-[#B6D5C8] focus:outline-none focus:ring-2 focus:ring-[#436E6C] text-[#436E6C]"
                                    placeholder="tu@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={isLoading}
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-[#436E6C] mb-1">
                                    Contraseña
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    className="w-full p-3 rounded-md border border-[#B6D5C8] focus:outline-none focus:ring-2 focus:ring-[#436E6C] text-[#436E6C]"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    disabled={isLoading}
                                />
                            </div>

                            {error && (
                                <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                className="w-full bg-[#436E6C] text-white py-3 rounded-md hover:bg-[#5A9A98] transition-colors duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                            </button>

                            <div className="text-center text-sm text-[#436E6C]">
                                <Link href="/auth/register" className="hover:text-[#5A9A98] transition-colors duration-300">
                                    ¿No tienes una cuenta? Regístrate
                                </Link>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </main>
        </>
    );
} 