'use client';

import Header from '../components/Header';
import Hero from '../components/Hero';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <div>
      <Header />
      <Hero />
        <section className="py-8 px-4 bg-[#f6fedb] text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#536a86] text-lg md:text-xl font-light font-roboto leading-relaxed">
            En <span className="font-semibold"> Sentirse Bien</span> buscamos atraer la atención de nuestros clientes a 
            través de experiencias inspiradas en la seducción de los sentidos. Adaptamos las propuestas con el objetivo de que logre
            desconectarse completamente de la rutina y disfrute de un momento de bienestar, en total armonía con la naturaleza.
            <br className="hidden md:block text-sm" />
            En respuesta al crecimiento del spa, ahora podés reservar turnos de forma más cómoda y organizada a través de nuestra nueva plataforma web.
          </p>
        </div>
        <div className="w-24 h-[2px] bg-[#bac4e0] mx-auto mt-6 mb-2  rounded-full"></div>
        </section>
      <Footer/>
    </div>
  );
}
