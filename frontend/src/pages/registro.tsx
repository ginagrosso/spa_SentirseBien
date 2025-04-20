'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Registro() {
  return (
    <>
      <Header />

      <section className="py-12 px-4 bg-white font-roboto">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-[#536a86] mb-6">
            Crear cuenta
          </h2>
          <form className="space-y-4 text-left">
            <input
              type="text"
              placeholder="Nombre completo"
              className="w-full px-4 py-2 border border-[#bac4e0] rounded-md text-[#536a86] focus:outline-none focus:ring-2 focus:ring-[#bac4e0]"
            />
            <input
              type="email"
              placeholder="Correo electrónico"
              className="w-full px-4 py-2 border border-[#bac4e0] rounded-md text-[#536a86] focus:outline-none focus:ring-2 focus:ring-[#bac4e0]"
            />
            <input
              type="tel"
              placeholder="Teléfono"
              className="w-full px-4 py-2 border border-[#bac4e0] rounded-md text-[#536a86] focus:outline-none focus:ring-2 focus:ring-[#bac4e0]"
            />
            <input
              type="password"
              placeholder="Contraseña"
              className="w-full px-4 py-2 border border-[#bac4e0] rounded-md text-[#536a86] focus:outline-none focus:ring-2 focus:ring-[#bac4e0]"
            />
            <button
              type="submit"
              className="w-full bg-[#536a86] text-white py-2 rounded-md hover:bg-[#40576d] transition"
            >
              Registrarse
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </>
  );
}
