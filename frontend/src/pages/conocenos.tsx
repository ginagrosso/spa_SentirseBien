'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Image from 'next/image';

export default function ConocenosPage() {
  return (
    <>
      <Header />

      <section className="bg-[#F5F9F8] text-[#536a86] font-roboto py-12 px-4 text-center">
        <h1 className="text-3xl font-amiri italic mb-4">Conócenos</h1>
        <p className="max-w-3xl mx-auto text-lg">
          Sumérgete en la historia de <span className="font-semibold">Sentirse Bien</span> y descubre la pasión
          que nos mueve día a día.
        </p>
      </section>

      <section className="py-12 px-4 bg-white font-roboto bg-[#F5F9F8]">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 space-y-4">
            <Image
              src="/images/spa_interior.png"
              alt="Interior del spa"
              width={600}
              height={400}
              className="rounded-lg object-cover"
            />
          </div>
          <div className="md:w-1/2 px-8 space-y-4">
            <h2 className="text-2xl font-semibold text-[#436E6C]">Nuestra historia</h2>
            <p>
              Fundado por la Dra. Ana Felicidad, <span className="font-semibold">Sentirse Bien</span> nació en 2022
              como un refugio de paz en el corazón de la ciudad. Desde entonces hemos crecido
              incorporando nuevas terapias y formando un equipo de profesionales dedicados a tu bienestar.
            </p>
            <p>
              Con una filosofía centrada en la armonía cuerpo-mente, cada tratamiento está diseñado
              para ayudarte a desconectarte de la rutina y reconectar con tu equilibrio interior.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-[#F5F9F8] font-roboto">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-[#536a86]">Nuestra Misión</h3>
            <p>
              Brindar experiencias de bienestar físico y emocional, en un entorno sereno y seguro,
              que fomenten la armonía y la renovación del cuerpo.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-[#536a86]">Nuestra Visión</h3>
            <p>
              Ser reconocidos como el spa líder en calidad y calidez, donde cada visitante
              sienta un antes y un después tras su visita.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-[#536a86]">Nuestros Valores</h3>
            <ul className="list-disc list-inside">
              <li>Profesionalismo</li>
              <li>Compromiso</li>
              <li>Respeto</li>
              <li>Calidad</li>
            </ul>
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}
