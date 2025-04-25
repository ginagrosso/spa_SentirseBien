'use client';

import ReservaTurno from '../components/ReservaTurno';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

export default function PaginaReserva() {
  return (
    <>
      <Header />
      <section className="bg-[#F5F9F8] text-[#436E6C] font-roboto py-16 pt-12 px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl font-amiri italic mb-4"
        >
          Reserva tu turno
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-lg"
        >
        Completá el siguiente formulario para elegir tu momento con <span className="font-semibold">Sentirse Bien</span>.
        </motion.p>
      </section>
      <main>
        <ReservaTurno />
      </main>
      <Footer />
    </>
  );
}
