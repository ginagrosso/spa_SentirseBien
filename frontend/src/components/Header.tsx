'use client';

import Image from 'next/image';
import Link from 'next/link';
import { CalendarDays, Search, User } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showMenu, setShowMenu] = useState(false);


  useEffect(() => {
    const logged = localStorage.getItem('spa-logueado');
    setIsLoggedIn(logged === 'true');
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('spa-logueado');
    setIsLoggedIn(false);
    setShowMenu(false);
    window.location.href = '/'; 
  };

  const handleUserClick = () => {
    if (!isLoggedIn) {
      window.location.href = '/login'; 
    } else {
      setShowMenu(!showMenu); 
    }
  };

  return (
    <header className="bg-[#436E6C] shadow-sm text-[#F5F9F8] font-roboto">
      <div className="container mx-auto px-14 py-1 flex items-center justify-between">
        
        <div className="flex items-center gap-2">
          <Image src="/images/logo.png" alt="Logo del SPA" width={50} height={50} />
          <h1 className="text-2xl font-amiri not-italic">
            SPA <span className="font-light italic">"Sentirse Bien"</span>
          </h1>
        </div>

        <div className="flex items-center gap-6">
            <nav className="flex gap-6 text-sm font-medium">
            <Link href="/" className="hover:underline hover:text-[#B6D5C8] transition">
              INICIO
            </Link>
            <Link href="/servicios" className="hover:underline hover:text-[#B6D5C8] transition">
              SERVICIOS
            </Link>
            <Link href="/conocenos" className="hover:underline hover:text-[#B6D5C8] transition">
              NOSOTROS
            </Link>
            <Link href="/turnos" className="hover:underline hover:text-[#B6D5C8] transition">
              MIS TURNOS
            </Link>
            <Link href="/contacto" className="hover:underline hover:text-[#B6D5C8] transition">
              CONTACTO
            </Link>
            </nav>

          <div className="flex items-center gap-4 relative">

            <div className="relative">
              <User
                className="w-5 h-5 cursor-pointer hover:text-[#B6D5C8] transition"
                onClick={handleUserClick}
              />
              {isLoggedIn && showMenu && (
                <div className="absolute right-0 mt-2 w-40 bg-white text-[#436E6C] shadow-md rounded-md z-50 text-sm font-normal">
                  <Link
                    href="/perfil"
                    className="block px-4 py-2 hover:bg-[#F5F9F8] transition"
                    onClick={() => setShowMenu(false)}
                  >
                    Mi perfil
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-[#F5F9F8] transition"
                  >
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
