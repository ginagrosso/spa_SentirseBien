'use client';

import Image from 'next/image';

export default function Destacados() {
  return (
    <section className="py-12 text-center font-roboto">
      <h2 className="text-2xl md:text-3xl font-semibold  text-[#536a86]">SERVICIOS DESTACADOS</h2>
      <div className="py-4 text-center text-[#536a86] italic text-xl mb-4">Nuestros servicios destacados te ayudarán a renovar cuerpo y mente.</div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        <div className="border-2 border-[#bac4e0] rounded-3xl p-6 flex flex-col items-center">
          <Image
            src="/images/facial.jpg"
            alt="Pulido facial"
            width={200}
            height={200}
            className="rounded-2xl"
          />
          <h3 className="text-xl font-bold text-[#536a86] mt-4">PULIDO FACIAL 30'</h3>
          <p className="text-[#536a86] mt-4">$25000</p>
          <p className="text-sm mt-2">Se reserva con el 30% del total</p>
          <a href='/reserva' className="mt-4 bg-[#bac4e0] text-[#536a86] px-4 py-2 rounded-lg shadow hover:bg-[#a7b4cc] transition">Sacar turno</a>
        </div>

        <div className="border-2 border-[#bac4e0] rounded-3xl p-6 flex flex-col items-center">
          <Image
            src="/images/masorelax.jpg"
            alt="Masorelax"
            width={200}
            height={200}
            className="rounded-2xl"
          />
          <h3 className="text-xl font-bold text-[#536a86] mt-4">MASORELAX</h3>
          <p className="text-[#536a86] mt-4">$28000</p>
          <p className="text-sm mt-2 font-roboto">Se reserva con el 30% del total</p>
          <a href='/reserva' className="mt-4 bg-[#bac4e0] text-[#536a86] px-4 py-2 rounded-lg shadow hover:bg-[#a7b4cc] transition">Sacar turno</a>
        </div>

        <div className="border-2 border-[#bac4e0] rounded-3xl p-6 flex flex-col items-center">
          <Image
            src="/images/diaspa.jpg"
            alt="Día de spa"
            width={200}
            height={200}
            className="rounded-2xl"
          />
          <h3 className="text-xl font-bold text-[#536a86] mt-4">DÍA DE SPA</h3>
          <p className="text-[#536a86] mt-4">$30000</p>
          <p className="text-sm mt-2">Se reserva con el 30% del total</p>
          <a href='/reserva' className="mt-4 bg-[#bac4e0] text-[#536a86] px-4 py-2 rounded-lg shadow hover:bg-[#a7b4cc] transition">Sacar turno</a>
        </div>
      </div>

      <button className="mt-10 bg-[#bac4e0] text-[#536a86] px-6 py-3 rounded-lg shadow hover:bg-[#a7b4cc] transition">
        VER TODOS LOS SERVICIOS
      </button>
    </section>
  );
}
