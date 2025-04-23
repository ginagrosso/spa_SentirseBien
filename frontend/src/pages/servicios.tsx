'use client';

import Header from "../components/Header";
import Footer from "../components/Footer";
import Servicios from "../components/Servicios";

export default function PaginaServicios() {
  return (
    <>
      <Header />
      <section className="bg-[#f0f8ff] text-center pt-8 pb-2 px-4 font-roboto">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-2xl font-semibold text-[#536a86] mb-4">
            Nuestros Servicios
          </h1>
          <p className="text-[#536a86] text-base md:text-m font-light italic leading-relaxed">
            Elegí el servicio que más te guste y reservá tu turno.
          </p>
        </div>
      </section>
      <main>
        <Servicios />
      </main>
      <Footer />
    </>
  );
}