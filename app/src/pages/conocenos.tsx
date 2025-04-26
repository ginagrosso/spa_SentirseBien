'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function ConocenosPage() {
  return (
    <>
      <Header />

      <section className="bg-[#F5F9F8] text-[#436E6C] font-roboto py-16 px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl font-amiri italic mb-4"
        >
          Conócenos
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-lg"
        >
          Sumérgete en la historia de <span className="font-semibold">Sentirse Bien</span> y descubre la pasión
          que nos mueve día a día.
        </motion.p>
      </section>

      <section className="py-20 px-6 bg-white font-roboto">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative w-full h-[300px] md:h-[400px] rounded-lg overflow-hidden shadow-md"
          >
            <Image
              src="/images/spa_interior.png"
              alt="Interior del spa"
              fill
              style={{ objectFit: 'cover' }}
              className="rounded-lg"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-4 text-[#436E6C]"
          >
            <h2 className="text-3xl font-semibold text-[#436E6C]">Nuestra historia</h2>
            <p>
              Fundado por la Dra. Ana Felicidad, <span className="font-semibold">Sentirse Bien</span> nació en 2022
              como un refugio de paz en el corazón de la ciudad. Desde entonces hemos crecido
              incorporando nuevas terapias y formando un equipo de profesionales dedicados a tu bienestar.
            </p>
            <p>
              Con una filosofía centrada en la armonía cuerpo-mente, cada tratamiento está diseñado
              para ayudarte a desconectarte de la rutina y reconectar con tu equilibrio interior.
            </p>
          </motion.div>

        </div>
      </section>
      
      <section className="py-20 px-6 bg-[#F5F9F8] font-roboto">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-semibold text-[#436E6C]">Nuestra Misión</h3>
            <p>
              Brindar experiencias de bienestar físico y emocional, en un entorno sereno y seguro,
              que fomenten la armonía y la renovación del cuerpo.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-semibold text-[#436E6C]">Nuestra Visión</h3>
            <p>
              Ser reconocidos como el spa líder en calidad y calidez, donde cada visitante
              sienta un antes y un después tras su visita.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-semibold text-[#436E6C]">Nuestros Valores</h3>
            <ul className="list-disc list-inside text-left max-w-xs mx-auto">
              <li>Profesionalismo</li>
              <li>Compromiso</li>
              <li>Respeto</li>
              <li>Calidad</li>
            </ul>
          </motion.div>

        </div>
      </section>

      <Footer />
    </>
  );
}
