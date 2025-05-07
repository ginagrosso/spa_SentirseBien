import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

interface ProtectedLayoutProps {
    children: React.ReactNode;
    requireAdmin?: boolean;
}

export default function ProtectedLayout({ children, requireAdmin = false }: ProtectedLayoutProps) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const user = session?.user;
    const isLoading = status === 'loading';
    const isAuthenticated = status === 'authenticated';
    const isAdmin = user?.rol === 'admin';

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push('/auth/signin');
            return;
        }

        if (!isLoading && requireAdmin && !isAdmin) {
            router.push('/');
            return;
        }
    }, [isLoading, isAuthenticated, isAdmin, requireAdmin, router]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!isAuthenticated || (requireAdmin && !isAdmin)) {
        return null;
    }

    return <>{children}</>;
} 