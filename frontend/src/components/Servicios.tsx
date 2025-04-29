'use client';

import { Leaf } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const decorativeLeaves = (
  <svg width="120" height="240" viewBox="0 0 120 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-30">
    <path d="M60 0C90 60 120 120 60 240C0 120 30 60 60 0Z" fill="#B7D3C6"/>
  </svg>
);

const treatments = [
  {
    category: 'Masajes',
    services: [
      {
        name: 'Masaje Anti-stress',
        price: '$25000',
        descripcion: 'Un masaje relajante que alivia el estrés y la tensión muscular.',
        image: '/images/antistress.png',
      },
      {
        name: 'Masaje Descontructurante',
        price: '$26000',
        descripcion: 'Un masaje profundo que ayuda a liberar la tensión acumulada en los músculos.',
        image: '/images/masajes.png',
      },
      {
        name: 'Masaje con piedras calientes',
        price: '$30000',
        descripcion: 'Un masaje que utiliza piedras calientes para relajar los músculos y mejorar la circulación.',
        image: '/images/conpiedras.png',
      },
      {
        name: 'Masaje Circulatorio',
        price: '$28000',
        descripcion: 'Un masaje que mejora la circulación sanguínea y alivia la tensión muscular.',
        image: '/images/circulatorio.png',
      },
    ],
  },
  {
    category: 'Belleza',
    services: [
      {
        name: 'Lifting de pestañas',
        price: '$8000',
        descripcion: 'Un tratamiento que levanta y riza las pestañas para un look más abierto y fresco.',
        image: '/images/lifting.png',
      },
      {
        name: 'Depilación facial',
        price: '$4000',
        descripcion: 'Un tratamiento de depilación para eliminar el vello facial no deseado.',
        image: '/images/depifacial.png',
      },
      {
        name: 'Belleza de manos y pies',
        price: '$30000',
        descripcion: 'Un tratamiento completo para embellecer y cuidar manos y pies.',
        image: '/images/manosypies.png',
      },
    ],
  },
  {
    category: 'Tratamientos Faciales',
    services: [
      {
        name: 'Punta de diamante',
        price: '$25000',
        descripcion: 'Un tratamiento de microexfoliación que elimina las células muertas y mejora la textura de la piel.',
        image: '/images/microex.png',
      },
      {
        name: 'Limpieza profunda + Hidratación',
        price: '$22000',
        descripcion: 'Un tratamiento completo que limpia profundamente la piel y la hidrata para un aspecto radiante.',
        image: '/images/faciales.png',
      },
      {
        name: 'Criofrecuencia facial',
        price: '$30000',
        descripcion: 'Un tratamiento que produce el "SHOCK TERMICO" logrando resultados instantáneos de efecto lifting.',
        image: '/images/criofacial.png',
      },
    ],
  },
  {
    category: 'Tratamientos Corporales',
    services: [
      {
        name: 'VelaSlim',
        price: '$35000',
        descripcion: 'Un tratamiento que utiliza calor para reducir de la circunferencia corporal y la celulitis.',
        image: '/images/velaslim.png',
      },
      {
        name: 'DermoHealth',
        price: '$33000',
        descripcion: 'Un tratamiento que moviliza los tejidos y estimula la microcirculación generando drenaje linfático.',
        image: '/images/dermohealth.png',
      },
      {
        name: 'Criofrecuencia corporal',
        price: '$40000',
        descripcion: 'Un tratamiento que utiliza frío y calor que produce un efecto de lifting instantáneo.',
        image: '/images/corporales.png',
      },
      {
        name: 'Ultracavitación',
        price: '$40000',
        descripcion: 'Un tratamiento que utiliza ultrasonido para eliminar grasa localizada.',
        image: '/images/ultracav.png',
      },
    ],
  },
  {
    category: 'Servicios Grupales',
    services: [
      {
        name: 'Hidromasaje',
        price: '$20000',
        descripcion: 'Precio por persona. Relajación muscular mediante agua caliente y burbujas.',
        image: '/images/hidro.png',
      },
      {
        name: 'Yoga',
        price: '$18000',
        descripcion: 'Precio por persona. Ejercicios de respiración y estiramiento para reducir el estrés.',
        image: '/images/grupales.png',
      },
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="relative bg-gradient-to-b from-[#F5F9F8] to-white text-primary font-roboto pt-24 pb-16 px-4 text-center overflow-hidden mt-12">
        {/* Hoja decorativa izquierda */}
        <div className="hidden md:block absolute left-0 top-1 z-0">{decorativeLeaves}</div>
        {/* Hoja decorativa derecha */}
        <div className="hidden md:block absolute right-0 top-1/2 z-0 rotate-180">{decorativeLeaves}</div>
        <motion.div 
          className="relative z-10 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-lora italic mb-6">Nuestros Servicios</h1>
          <p className="text-lg md:text-xl font-light">
            Descubrí todos los tratamientos que <span className="font-semibold">Sentirse Bien</span> tiene para vos.
          </p>
          <div className="flex justify-center items-center gap-3 my-8">
            <span className="w-2.5 h-2.5 rounded-full bg-accent/60 animate-pulse"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-accent/40 animate-pulse delay-150"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-accent/60 animate-pulse delay-300"></span>
          </div>
        </motion.div>
      </section>

      <main className="relative bg-gradient-to-b from-white via-[#F5F9F8] to-white font-roboto min-h-screen">
        <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-5"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-2 md:px-8 py-16">
          {treatments.map((category, index) => (
            <motion.section
              key={index}
              id={category.category.replace(/\s+/g, '').toLowerCase()}
              className="mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-lora font-semibold text-center mb-12 text-primary relative">
                <span className="relative z-10">{category.category}</span>
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-accent/30 rounded-full"></div>
              </h3>
              <div className="flex flex-col gap-8">
                {category.services.map((service, idx) => (
                  <motion.div
                    key={idx}
                    className="bg-white w-full max-w-3xl mx-auto rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col md:flex-row items-center md:items-stretch border border-soft2/30 group relative overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="md:w-56 w-full flex-shrink-0 flex items-center justify-center bg-[#F5F9F8] md:rounded-l-2xl md:rounded-r-none rounded-t-2xl md:rounded-t-none p-4">
                      <Image
                        src={service.image}
                        alt={service.name}
                        width={180}
                        height={120}
                        className="rounded-xl object-cover mx-auto"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between p-4 md:pl-6 text-left">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-lg font-lora font-semibold">{service.name}</h4>
                          <span className="bg-accent/10 text-accent text-xs font-semibold px-2 py-1 rounded-full ml-2">{service.price}</span>
                          {idx === 0 && (
                            <span className="ml-2 bg-accent text-white text-xs font-bold px-2 py-1 rounded-full shadow">Popular</span>
                          )}
                        </div>
                        <p className="text-xs text-primary/80 mb-2 line-clamp-3 md:line-clamp-2">{service.descripcion}</p>
                      </div>
                      <div className="flex items-center gap-3 mt-2">
                        <Link href="/reserva">
                          <button
                            className="bg-primary/80 text-white px-4 py-1.5 rounded-full hover:bg-primary/60 transition-all duration-300 text-xs font-semibold border border-primary/20 shadow-sm"
                          >
                            Reservar turno
                          </button>
                        </Link>
                        <button
                          className="text-primary underline underline-offset-2 text-xs font-medium hover:text-accent transition-all duration-200"
                          onClick={() => alert('Aquí podría abrirse un modal con más información.')}
                        >
                          Ver más
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          ))}
        </div>
      </main>
    </>
  );
}
