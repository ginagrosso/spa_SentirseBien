'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Login() {
  return (
    <>
      <Header />

      <section className="py-12 px-4 bg-white font-roboto">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-[#536a86] mb-6">
            Iniciar sesión
          </h2>
          <form className="space-y-4 text-left">
            <input
              type="email"
              placeholder="Correo electrónico"
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
              Ingresar
            </button>
            <p className="text-sm text-center text-[#536a86] mt-4">
              ¿Todavía no tenés una cuenta?{' '}
              <a href="/registro" className="underline hover:text-[#40576d]">
                Registrate acá
              </a>
            </p>
          </form>
        </div>
      </section>

      <Footer />
    </>
  );
}
