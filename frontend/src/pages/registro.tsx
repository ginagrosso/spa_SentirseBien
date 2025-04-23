'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Registro() {
  return (
    <>
      <Header />

      <section className="py-12 px-4 bg-white font-roboto flex justify-center">
      <div className="bg-[#B6D5C8] p-6 rounded-xl space-y-4 shadow-md w-full max-w-lg text-[#436E6C]">
          <h2 className="text-3xl font-semibold text-[#436E6C] text-center mb-6">
            Crear cuenta
          </h2>
          <form className="space-y-4 text-left">
            <input
              type="text"
              placeholder="Nombre completo"
              className="w-full px-4 py-2 border border-[#B6D5C8] rounded-md text-[#436E6C] focus:outline-none focus:ring-2 focus:ring-[#B6D5C8]"
            />
            <input
              type="email"
              placeholder="Correo electrónico"
              className="w-full px-4 py-2 border border-[#B6D5C8] rounded-md text-[#436E6C] focus:outline-none focus:ring-2 focus:ring-[#B6D5C8]"
            />
            <input
              type="tel"
              placeholder="Teléfono"
              className="w-full px-4 py-2 border border-[#B6D5C8] rounded-md text-[#436E6C] focus:outline-none focus:ring-2 focus:ring-[#B6D5C8]"
            />
            <input
              type="password"
              placeholder="Contraseña"
              className="w-full px-4 py-2 border border-[#B6D5C8] rounded-md text-[#436E6C] focus:outline-none focus:ring-2 focus:ring-[#B6D5C8]"
            />
            <button
              type="submit"
              className="w-full bg-[#436E6C] text-white py-2 rounded-md hover:bg-[#5A9A98] transition"
            >
              Registrarse
            </button>
            <p className="text-sm text-center text-[#436E6C] mt-4">
              ¿Ya tenés una cuenta?{' '}
              <a href="/login" className="underline hover:text-[#40576d]">
                Iniciar sesión
              </a>
            </p>

          </form>
        </div>
      </section>

      <Footer />
    </>
  );
}
