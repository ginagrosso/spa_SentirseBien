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
    <header className="fixed top-0 left-0 w-full z-50 bg-primary/80 backdrop-blur-md border-b border-primary/20 shadow-lg transition-all duration-300 font-roboto">
      <div className="container mx-auto px-6 md:px-14 py-2 flex items-center justify-between">
        
        <div className="flex items-center gap-3">
          <Image src="/images/logo.png" alt="Logo del SPA" width={40} height={40} className="rounded-full border-2 border-accent shadow" />
          <div>
            <h1 className="text-2xl md:text-3xl font-lora font-bold tracking-tight text-soft2 drop-shadow-sm">
              SPA <span className="font-light italic text-accent">Sentirse Bien</span>
            </h1>
            <span className="block text-xs md:text-sm font-lora italic text-soft2/80 -mt-1">Bienestar & Relax</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <nav className="flex gap-4 md:gap-6 text-sm md:text-base font-medium">
            {[
              { href: '/', label: 'INICIO' },
              { href: '/servicios', label: 'SERVICIOS' },
              { href: '/conocenos', label: 'NOSOTROS' },
              { href: '/turnos', label: 'MIS TURNOS' },
              { href: '/contacto', label: 'CONTACTO' }
            ].map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-2 py-1 font-lora text-soft2 transition
                  before:content-[''] before:absolute before:left-0 before:-bottom-1 before:w-0 before:h-[2px]
                  before:bg-accent before:transition-all before:duration-300
                  hover:before:w-full hover:text-accent"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4 relative">
            <div className="relative">
              <User
                className="w-6 h-6 cursor-pointer hover:text-accent transition"
                onClick={handleUserClick}
              />
              {isLoggedIn && showMenu && (
                <div className="absolute right-0 mt-2 w-44 bg-white text-primary shadow-lg border border-soft2 rounded-xl z-50 text-sm font-normal overflow-hidden">
                  <Link
                    href="/perfil"
                    className="block px-4 py-2 hover:bg-soft transition font-lora"
                    onClick={() => setShowMenu(false)}
                  >
                    Mi perfil
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-soft transition font-lora"
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
