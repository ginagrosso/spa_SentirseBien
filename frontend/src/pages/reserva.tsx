'use client';

import ReservaTurno from '../components/ReservaTurno';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function PaginaReserva() {
  return (
    <>
      <Header />
        <section className="bg-white text-center py-8 px-4">
        <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-2xl font-semibold text-[#536a86] font-roboto mb-4">
            Elegí tu momento de bienestar
            </h1>
            <p className="text-[#536a86] text-base md:text-m font-light italic font-roboto leading-relaxed">
            Completá el siguiente formulario para reservar tu espacio y dejarte cuidar como te merecés.
            </p>
        </div>
        </section>
      <main>
        <ReservaTurno />
      </main>
      <Footer />
    </>
  );
}
