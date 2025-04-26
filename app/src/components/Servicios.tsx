'use client';

import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

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
        descripcion: 'Un tratamiento que produce el “SHOCK TERMICO" logrando resultados instantáneos de efecto lifting.',
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
  const sliderRefs = useRef<HTMLDivElement[]>([]);

  const scroll = (idx: number, dir: 'left' | 'right') => {
    const container = sliderRefs.current[idx];
    if (!container) return;
    const card = container.querySelector<HTMLDivElement>('.flex > div');
    if (!card) return;
    const gap = 24;
    const amount = card.offsetWidth + gap;
    container.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <>
      <section className="bg-[#F5F9F8] text-[#436E6C] font-roboto pt-8 pb-16 px-4 text-center">
        <h1 className="text-4xl font-amiri italic mb-4">Nuestros Servicios</h1>
        <p className="max-w-3xl mx-auto text-lg">
          Descubrí todos los tratamientos que <span className="font-semibold">Sentirse Bien</span> tiene para vos.
        </p>
      </section>

      <main className="px-4 py-16 bg-white font-roboto">
        {treatments.map((category, index) => (
          <section
            key={index}
            id={category.category.replace(/\s+/g, '').toLowerCase()}
            className="mb-20"
          >
            <h3 className="text-3xl font-semibold text-center mb-8 text-[#436E6C]">
              {category.category}
            </h3>

            <div className="relative flex items-center justify-center gap-4 px-4">
              <button onClick={() => scroll(index, 'left')} aria-label="Anterior">
                <ChevronLeft className="w-6 h-6 text-[#536a86] hover:text-[#40576d] transition" />
              </button>

              <div className="relative px-4 w-full max-w-[990px]">
                <div
                  ref={(el) => {
                    if (el) sliderRefs.current[index] = el;
                  }}
                  className="flex gap-6 overflow-x-auto scrollbar-hide"
                  style={{ paddingBottom: '1rem' }}
                >

                  {category.services.map((service, idx) => (
                    <div
                    className="
                      flex-shrink-0 w-[300px]
                      bg-[#F5F9F8] p-6 rounded-xl
                      shadow-md hover:shadow-xl
                      transform hover:scale-[1.02]
                      transition-all duration-300 ease-in-out
                      text-[#436E6C] text-center
                      flex flex-col justify-between
                    "
                  >
                  
                      <div className="flex-grow mb-4">
                        <Image
                          src={service.image}
                          alt={service.name}
                          width={300}
                          height={180}
                          className="rounded-md object-cover mb-4"
                        />
                        <h4 className="text-lg font-semibold mb-2">{service.name}</h4>
                        <p className="text-sm mb-2">{service.price}</p>
                        <p className="text-sm text-[#40576d]">{service.descripcion}</p>
                      </div>

                      <Link href="/reserva">
                        <button className="bg-[#436E6C] text-white px-4 py-2 rounded-full hover:bg-[#5A9A98] transition mt-4">
                          Reservar turno
                        </button>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              <button onClick={() => scroll(index, 'right')} aria-label="Siguiente">
                <ChevronRight className="w-6 h-6 text-[#536a86] hover:text-[#40576d] transition" />
              </button>
            </div>
          </section>
        ))}
      </main>
    </>
  );
}
