'use client';

import Image from 'next/image';
import Link from 'next/link';
import { User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  transparent?: boolean;
}

export default function Header({ transparent = false }: HeaderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const logged = localStorage.getItem('spa-logueado');
    setIsLoggedIn(logged === 'true');

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
    <motion.header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 font-roboto ${
        transparent 
          ? isScrolled 
            ? 'bg-primary/90 backdrop-blur-md border-b border-primary/20 shadow-lg' 
            : 'bg-transparent'
          : 'bg-primary/90 backdrop-blur-md border-b border-primary/20 shadow-lg'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6 md:px-14 py-3 flex items-center justify-between">
        <motion.div 
          className="flex items-center gap-3"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <Image 
            src="/images/logo.png" 
            alt="Logo del SPA" 
            width={45} 
            height={45} 
            className="rounded-full border-2 border-accent shadow-lg hover:shadow-xl transition-shadow duration-300" 
          />
          <div>
            <h1 className="text-2xl md:text-3xl font-lora font-bold tracking-tight text-soft2 drop-shadow-sm">
              SPA <span className="font-light italic text-accent">Sentirse Bien</span>
            </h1>
            <span className="block text-xs md:text-sm font-lora italic text-soft2/80 -mt-1">Bienestar & Relax</span>
          </div>
        </motion.div>

        <div className="flex items-center gap-6">
          <nav className="flex gap-4 md:gap-6 text-sm md:text-base font-medium">
            {[
              { href: '/', label: 'INICIO' },
              { href: '/servicios', label: 'SERVICIOS' },
              { href: '/conocenos', label: 'NOSOTROS' },
              { href: '/turnos', label: 'MIS TURNOS' },
              { href: '/contacto', label: 'CONTACTO' }
            ].map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link
                  href={link.href}
                  className="relative px-2 py-1 font-lora text-soft2 transition-all duration-300
                    before:content-[''] before:absolute before:left-0 before:-bottom-1 before:w-0 before:h-[2px]
                    before:bg-accent before:transition-all before:duration-300
                    hover:before:w-full hover:text-accent hover:scale-105"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="flex items-center gap-4 relative">
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <User
                className="w-6 h-6 cursor-pointer hover:text-accent transition-colors duration-300"
                onClick={handleUserClick}
              />
              <AnimatePresence>
                {isLoggedIn && showMenu && (
                  <motion.div 
                    className="absolute right-0 mt-2 w-44 bg-white text-primary shadow-lg border border-soft2 rounded-xl z-50 text-sm font-normal overflow-hidden"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      href="/perfil"
                      className="block px-4 py-2 hover:bg-soft transition-colors duration-300 font-lora"
                      onClick={() => setShowMenu(false)}
                    >
                      Mi perfil
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-soft transition-colors duration-300 font-lora"
                    >
                      Cerrar sesión
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
