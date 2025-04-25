'use client';

import Image from 'next/image';
import Link from 'next/link';

const services = [
  {
    category: 'Masajes',
    image: '/images/masajes.png',
    anchor: 'masajes',
  },
  {
    category: 'Belleza',
    image: '/images/belleza.png',
    anchor: 'belleza',
  },
  {
    category: 'Tratamientos Corporales',
    image: '/images/corporales.png',
    anchor: 'tratamientoscorporales',
  },
  {
    category: 'Tratamientos Faciales',
    image: '/images/faciales.png',
    anchor: 'tratamientosfaciales',
  },
  {
    category: 'Servicios Grupales',
    image: '/images/grupales.png',
    anchor: 'tratamientosgrupales',
  },
];

export default function Categorias() {
  return (
    <section className="py-16 px-6 bg-[#F5F9F8] font-roboto text-[#436E6C]">
      <h2 className="text-3xl font-semibold text-center mb-12 tracking-wide">Categorías</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
        {services.map((service) => (
          <div
          key={service.category}
          className="group bg-[#B6D5C8] bg-opacity-80 hover:bg-opacity-100 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-4 flex flex-col items-center text-center"
        >
        
            <div className="overflow-hidden rounded-lg mb-4 w-full h-[200px]">
              <Image
                src={service.image}
                alt={service.category}
                width={300}
                height={200}
                className="object-cover w-full h-full opacity-80 transform group-hover:scale-105 transition duration-300"
              />
            </div>
            <h3 className="text-lg font-semibold mb-3">{service.category}</h3>
            <Link href={{ pathname: '/servicios', hash: service.anchor }}>
              <button className="bg-[#436E6C] text-white px-5 py-2 rounded-full text-sm hover:bg-[#5A9A98] transition">
                Ver más
              </button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

