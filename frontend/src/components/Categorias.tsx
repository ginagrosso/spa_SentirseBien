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
    anchor: 'corporales',
  },
  {
    category: 'Tratamientos Faciales',
    image: '/images/faciales.png',
    anchor: 'corporales',
  },
  {
    category: 'Servicios Grupales',
    image: '/images/grupales.png',
    anchor: 'grupales',
  },
];

export default function Categorias() {
  return (
    <section className="py-12 px-24 bg-[#F5F9F8] font-roboto text-[#436E6C]">
      <h2 className="text-2xl font-semibold text-center mb-10">Categorías</h2>

      <div className="grid grid-cols-5 gap-6 max-w-full mx-auto overflow-x-auto">
        {services.map((service) => (
          <div
            key={service.category}
            className="bg-[#B6D5C8] rounded-xl shadow hover:shadow-md transition p-4 flex flex-col items-center"
          >
            <Image
              src={service.image}
              alt={service.category}
              width={300}
              height={200}
              className="rounded-lg object-cover opacity-80 mb-4"
            />
            <h3 className="text-lg font-semibold mb-3">{service.category}</h3>
            <Link href={`/servicios#${service.anchor}`}>
              <button className="bg-[#436E6C] text-white px-4 py-2 rounded-full text-sm hover:bg-[#5A9A98] transition">
                Ver más
              </button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
