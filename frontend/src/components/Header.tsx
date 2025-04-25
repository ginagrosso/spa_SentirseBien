'use client';

import Image from 'next/image';
import { CalendarDays, Search, User } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-[#436E6C] shadow-sm text-[#F5F9F8] font-roboto">
      <div className="container mx-auto px-14 py-1 flex items-center justify-between">
        
        <div className="flex items-center gap-2">
          <Image
            src="/images/logo.png"
            alt="Logo del SPA"
            width={50}
            height={50}
          />
          <h1 className="text-2xl font-amiri not-italic">
            SPA <span className="font-light italic">Sentirse Bien</span>
          </h1>
        </div>

        <div className="flex items-center gap-6">
          <nav className="flex gap-6 text-sm font-medium">
            <a href="/" className="hover:underline">INICIO</a>
            <a href="servicios" className="hover:underline">SERVICIOS</a>
            <a href="conocenos" className="hover:underline">NOSOTROS</a>
            <a href="turnos" className="hover:underline">MIS TURNOS</a>
            <a href="contacto" className="hover:underline">CONTACTO</a>
          </nav>

          <div className="flex items-center gap-4">
            <Search className="w-5 h-5 cursor-pointer" />
            <User className="w-5 h-5 cursor-pointer" />
            <CalendarDays className="w-5 h-5 cursor-pointer" />
          </div>
        </div>

      </div>
    </header>
  );
}
