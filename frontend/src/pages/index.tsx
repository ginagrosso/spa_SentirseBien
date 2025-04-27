'use client';

import Header from '../components/Header';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import ServicesSlider from '../components/Categorias';
import { motion } from 'framer-motion';
import { Leaf} from 'lucide-react';

export default function HomePage() {
  return (
    <div>
      <Header />
      <Hero />

      <section className="relative z-20 py-8 px-4 bg-white text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#436E6C] text-lg md:text-xl font-light font-roboto leading-relaxed">
            En <span className="font-semibold">Sentirse Bien</span> buscamos atraer la atención de nuestros clientes a 
            través de experiencias inspiradas en la seducción de los sentidos. Adaptamos las propuestas con el objetivo de que logre
            desconectarse completamente de la rutina y disfrute de un momento de bienestar, en total armonía con la naturaleza.
            <br className="hidden md:block" />
            En respuesta al crecimiento del spa, ahora podés reservar turnos de forma más cómoda y organizada a través de nuestra nueva plataforma web.
          </p>
          <div className="flex justify-center items-center gap-2 my-10">
            <span className="w-2 h-2 rounded-full bg-accent/60"></span>
            <span className="w-2 h-2 rounded-full bg-accent/40"></span>
            <span className="w-2 h-2 rounded-full bg-accent/60"></span>
          </div>
        </div>
      </section>

      <section className="pt-2 pb-12 px-4 bg-gradient-to-b from-white via-white to-[#F5F9F8]">
        <h2 className="text-4xl font-lora font-bold text-center mb-14 text-primary">¿Por qué elegirnos?</h2>
        <div className="flex flex-col md:flex-row gap-8 max-w-5xl mx-auto justify-center items-stretch">
          <div className="flex-1 bg-white rounded-3xl p-10 flex flex-col items-center justify-center shadow-lg border-b-4 border-accent/30 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
            <div className="w-8 h-8 rounded-full bg-accent/30 mb-4 flex items-center justify-center">
              <Leaf className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-xl font-lora font-semibold mb-2 text-primary">Ambiente único</h3>
            <p className="text-base font-roboto text-primary/80">Diseñado para tu desconexión. Luces cálidas, música suave y aromas relajantes.</p>
          </div>
          <div className="flex-1 bg-white rounded-3xl p-10 flex flex-col items-center justify-center shadow-lg border-b-4 border-accent/30 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
            <div className="w-8 h-8 rounded-full bg-accent/30 mb-4 flex items-center justify-center">
              <Leaf className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-xl font-lora font-semibold mb-2 text-primary">Profesionales certificados</h3>
            <p className="text-base font-roboto text-primary/80">Todo nuestro equipo está altamente capacitado para garantizar tu bienestar.</p>
          </div>
          <div className="flex-1 bg-white rounded-3xl p-10 flex flex-col items-center justify-center shadow-lg border-b-4 border-accent/30 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
            <div className="w-8 h-8 rounded-full bg-accent/30 mb-4 flex items-center justify-center">
              <Leaf className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-xl font-lora font-semibold mb-2 text-primary">Resultados comprobables</h3>
            <p className="text-base font-roboto text-primary/80">Miles de clientes satisfechos y transformados desde 2022.</p>
          </div>
        </div>
      </section>

      <ServicesSlider />

      
      <div className="flex justify-center bg-[#F5F9F8] my-8">
        <span className="inline-block w-20 h-px bg-accent/40"></span>
        <span className="inline-block w-3 h-3 mx-2 rounded-full bg-accent/60"></span>
        <span className="inline-block w-20 h-px bg-accent/40"></span>
      </div>

      <section className="pt-2 pb-12 px-6 bg-gradient-to-b from-[#F5F9F8] to-white font-roboto text-dark text-center">
        <h2 className="text-3xl italic font-bold mb-10 font-lora text-primary">Lo que dicen nuestros clientes</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <motion.div
            className="bg-white rounded-2xl p-8 shadow-lg border border-soft2 italic hover:shadow-xl transition-shadow"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <p className="text-base mb-4 font-lora">“Una experiencia mágica. Salí flotando. Volveré sin dudas.”</p>
            <p className="text-xs font-semibold text-primary font-lora">— Carla M., 32 años</p>
          </motion.div>
          <motion.div
            className="bg-white rounded-2xl p-8 shadow-lg border border-soft2 italic hover:shadow-xl transition-shadow"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <p className="text-base mb-4 font-lora">“El masaje con piedras calientes me cambió el ánimo. 100% recomendable.”</p>
            <p className="text-xs font-semibold text-primary font-lora">— Lucía P., 40 años</p>
          </motion.div>
          <motion.div
            className="bg-white rounded-2xl p-8 shadow-lg border border-soft2 italic hover:shadow-xl transition-shadow"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <p className="text-base mb-4 font-lora">“Todo está pensado para relajar. Hasta los aromas.”</p>
            <p className="text-xs font-semibold text-primary font-lora">— Eugenia R., 28 años</p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

