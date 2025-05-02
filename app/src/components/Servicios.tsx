'use client';

import { Leaf } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';

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
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 50000 });

  const filteredTreatments = treatments.filter(category => 
    !selectedCategory || category.category === selectedCategory
  ).map(category => ({
    ...category,
    services: category.services.filter(service => {
      const price = parseInt(service.price.replace('$', '').replace('.', ''));
      return price >= priceRange.min && price <= priceRange.max;
    })
  }));

  return (
    <>
      <main className="relative min-h-screen font-roboto">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="flex flex-col md:flex-row gap-8">

            <div className="md:w-64 w-full bg-white/80 rounded-xl shadow-lg p-6 h-fit backdrop-blur-sm border border-accent/20">
              <h3 className="text-lg font-lora font-semibold mb-4 text-primary">Filtrar por</h3>          

              <div className="mb-6">
                <h4 className="text-sm font-medium text-primary/80 mb-2">Categoría</h4>
                <div className="space-y-2">
                  {treatments.map((category) => (
                    <label key={category.category} className="flex items-center space-x-2 cursor-pointer group">
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === category.category}
                        onChange={() => setSelectedCategory(selectedCategory === category.category ? null : category.category)}
                        className="text-accent focus:ring-accent cursor-pointer"
                      />
                      <span className="text-sm group-hover:text-accent transition-colors">{category.category}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-primary/80 mb-2">Rango de Precio</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span>${priceRange.min}</span>
                    <span>${priceRange.max}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="50000"
                    step="1000"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) })}
                    className="w-full accent-accent"
                  />
                </div>
              </div>
            </div>

            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredTreatments.flatMap(category => 
                  category.services.map((service, idx) => (
                    <motion.div
                      key={`${category.category}-${idx}`}
                      className="relative rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: idx * 0.1 }}
                      viewport={{ once: true }}
                    >

                      <div className="absolute inset-0">
                        <Image
                          src={service.image}
                          alt={service.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="relative h-full flex flex-col">

                        <div className="w-full h-40 relative">
                          <div className="absolute inset-0 bg-black/20"></div>
                        </div>
                        
                        <div className="flex-1 flex flex-col justify-between p-4 bg-white/80">
                          <div>
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="text-lg font-lora font-bold">{service.name}</h4>
                              <span className="bg-accent/30 text-primary text-base font-semibold px-3 py-1.5 rounded-full border border-accent/30">{service.price}</span>
                            </div>
                            <p className="text-sm text-primary/80 mb-3 line-clamp-2">{service.descripcion}</p>
                          </div>
                          <div className="flex justify-end">
                            <Link href="/reserva">
                              <button
                                className="bg-primary text-white px-5 py-2 rounded-lg hover:bg-primary/90 transition-all text-sm font-medium"
                              >
                                Reservar
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
