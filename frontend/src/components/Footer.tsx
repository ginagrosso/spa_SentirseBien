'use client';

import Image from 'next/image';
import { Facebook, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#436E6C] text-[#F5F9F8] py-4 font-roboto w-full">
      <div className="w-full px-4">
        <div className="grid grid-cols-3 gap-14 text-center items-center">
          <div className="flex flex-col items-center">
            <Image
              src="/images/logo.png"
              alt="Logo Sentirse Bien"
              width={80}
              height={80}
            />
            <h2 className="text-lg font-amiri not-italic font-semibold mt-2">
              SPA <span className="italic">Sentirse Bien</span>
            </h2>
            <p className="text-sm italic">Dra. Ana Felicidad</p>
          </div>

          <div className="flex flex-col items-center">
            <h3 className="text-base font-semibold mb-2">Accesos rápidos</h3>
            <ul className="space-y-1 text-sm">
              <li><a href="/">Inicio</a></li>
              <li><a href="servicios">Servicios</a></li>
              <li><a href="turnos">Mis Turnos</a></li>
              <li><a href="contacto">Contacto</a></li>
            </ul>
          </div>

          <div className="flex flex-col items-center">
            <h3 className="text-base font-semibold mb-2">Seguinos</h3>
            <div className="flex gap-4 justify-center">
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <Instagram className="w-6 h-6 hover:scale-110 transition" />
              </a>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <Facebook className="w-6 h-6 hover:scale-110 transition" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-[#536a86]/20 mt-8 pt-4 text-center text-xs">
          © 2025 Sentirse Bien. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}