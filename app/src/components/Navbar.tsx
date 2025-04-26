import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="p-4 bg-gray-100">
            <Link href="/login" className="mr-4">Login</Link>
            <Link href="/reservar" className="mr-4">Reservar</Link>
            <Link href="/misturnos">Mis Turnos</Link>
        </nav>
    );
}
