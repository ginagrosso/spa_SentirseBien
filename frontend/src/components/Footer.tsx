'use client';

import Image from 'next/image';
import { Facebook, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary text-soft py-8 font-roboto w-full">
      <div className="w-full px-4 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center items-center">
          <div className="flex flex-col items-center">
            <Image
              src="/images/logo.png"
              alt="Logo Sentirse Bien"
              width={60}
              height={60}
              className="rounded-full border-2 border-accent shadow mb-2"
            />
            <h2 className="text-lg font-lora font-bold mt-1 tracking-tight text-accent">
              SPA <span className="italic font-normal text-soft">Sentirse Bien</span>
            </h2>
            <p className="text-xs italic text-soft/80">Dra. Ana Felicidad</p>
          </div>

          <div className="flex flex-col items-center">
            <h3 className="text-base font-lora font-semibold mb-2 text-accent">Accesos rápidos</h3>
            <ul className="space-y-1 text-sm">
              {[
                { href: '/', label: 'Inicio' },
                { href: '/servicios', label: 'Servicios' },
                { href: '/turnos', label: 'Mis Turnos' },
                { href: '/contacto', label: 'Contacto' }
              ].map(link => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="relative px-1 py-0.5 transition text-soft2
                      before:content-[''] before:absolute before:left-0 before:-bottom-0.5 before:w-0 before:h-[2px]
                      before:bg-accent before:transition-all before:duration-300
                      hover:before:w-full hover:text-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-center">
            <h3 className="text-base font-lora font-semibold mb-2 text-accent">Seguinos</h3>
            <div className="flex gap-4 justify-center">
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"
                className="group rounded-full p-2 transition hover:bg-accent/30">
                <Instagram className="w-6 h-6 group-hover:scale-110 group-hover:text-accent transition" />
              </a>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"
                className="group rounded-full p-2 transition hover:bg-accent/30">
                <Facebook className="w-6 h-6 group-hover:scale-110 group-hover:text-accent transition" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-accent/30 mt-8 pt-4 text-center text-xs text-soft/80">
          © 2025 Sentirse Bien. Todos los derechos reservados.
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] pointer-events-none">
        <svg
          className="relative block w-[calc(150%+1.3px)] h-[60px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
        >
          <path
            fill="#F5F9F8"
            d="M0,30 Q360,60 720,30 T1440,30 L1440,60 L0,60 Z"
          />
        </svg>
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-b from-[#F5F9F8]/0 to-[#F5F9F8] pointer-events-none" />
      </div>
    </footer>
  );
}