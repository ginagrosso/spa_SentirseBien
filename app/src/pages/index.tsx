'use client';

import Header from '../components/Header';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import ServicesSlider from '../components/Categorias';
import { motion } from 'framer-motion';

export default function HomePage() {
  return (
    <div>
      <Header />
      <Hero />

      <section className="py-8 px-4 bg-[#F5F9F8] text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#436E6C] text-lg md:text-xl font-light font-roboto leading-relaxed">
            En <span className="font-semibold">Sentirse Bien</span> buscamos atraer la atención de nuestros clientes a 
            través de experiencias inspiradas en la seducción de los sentidos. Adaptamos las propuestas con el objetivo de que logre
            desconectarse completamente de la rutina y disfrute de un momento de bienestar, en total armonía con la naturaleza.
            <br className="hidden md:block" />
            En respuesta al crecimiento del spa, ahora podés reservar turnos de forma más cómoda y organizada a través de nuestra nueva plataforma web.
          </p>
        </div>
        <div className="w-24 h-[2px] bg-[#436E6C] mx-auto mt-6 mb-2 rounded-full"></div>
      </section>

      <section className="py-12 px-6 bg-white font-roboto text-[#436E6C] text-center">
        <h2 className="text-2xl font-semibold mb-8">¿Por qué elegirnos?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <motion.div
            className="bg-[#F5F9F8] rounded-xl p-6 shadow"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            >
            <h3 className="text-lg font-semibold mb-2">Ambiente único</h3>
            <p className="text-sm">Diseñado para tu desconexión. Luces cálidas, música suave y aromas relajantes.</p>
          </motion.div>
          <motion.div
            className="bg-[#F5F9F8] rounded-xl p-6 shadow"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-2">Profesionales certificados</h3>
            <p className="text-sm">Todo nuestro equipo está altamente capacitado para garantizar tu bienestar.</p>
          </motion.div>
          <motion.div
            className="bg-[#F5F9F8] rounded-xl p-6 shadow"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-2">Resultados comprobables</h3>
            <p className="text-sm">Miles de clientes satisfechos y transformados desde 2022.</p>
          </motion.div>
        </div>
      </section>

      <ServicesSlider />

      <section className="pt-2 pb-12 px-6 bg-[#F5F9F8] font-roboto text-[#436E6C] text-center">
        <h2 className="text-2xl italic font-semibold mb-10">Lo que dicen nuestros clientes</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <motion.div
            className="bg-white rounded-xl p-6 shadow-md italic"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <p className="text-sm mb-4">“Una experiencia mágica. Salí flotando. Volveré sin dudas.”</p>
            <p className="text-xs font-semibold">— Carla M., 32 años</p>
          </motion.div>
          <motion.div
            className="bg-white rounded-xl p-6 shadow-md italic"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <p className="text-sm mb-4">“El masaje con piedras calientes me cambió el ánimo. 100% recomendable.”</p>
            <p className="text-xs font-semibold">— Lucía P., 40 años</p>
          </motion.div>
          <motion.div
            className="bg-white rounded-xl p-6 shadow-md italic"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <p className="text-sm mb-4">“Todo está pensado para relajar. Hasta los aromas.”</p>
            <p className="text-xs font-semibold">— Eugenia R., 28 años</p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

