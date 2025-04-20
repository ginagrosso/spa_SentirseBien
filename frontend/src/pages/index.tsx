'use client';

import Header from '../components/Header';
import Hero from '../components/Hero';
import Destacados from '../components/Destacados';
import Categorias from '../components/Categorias';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <div>
      <Header />
      <Hero />
        <section className="py-8 px-4 bg-white text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#536a86] text-lg md:text-xl font-light font-roboto leading-relaxed">
            Fundado por la <span className="font-semibold">Dra. Ana Felicidad</span>, <span className="font-semibold"> Sentirse Bien</span> nace con la misión de brindar 
            bienestar físico y emocional en un ambiente sereno y profesional. Cada servicio está pensado para ayudarte a reconectar 
            con tu equilibrio y paz interior.
            <br className="hidden md:block text-sm" />
            En respuesta al crecimiento del spa, ahora podés reservar turnos de forma más cómoda y organizada a través de nuestra nueva plataforma web.
          </p>
        </div>
        <div className="w-24 h-[2px] bg-[#bac4e0] mx-auto mt-6 mb-2  rounded-full"></div>
        </section>
      <Categorias/>
      <Destacados/>
      <Footer/>
    </div>
  );
}
