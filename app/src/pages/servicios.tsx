'use client';

import Header from "../components/Header";
import Footer from "../components/Footer";
import Servicios from "../components/Servicios";
import PageHero from "components/PageHero";

export default function PaginaServicios() {
  return (
    <>
      <Header transparent={false} />
      <PageHero 
        title="Nuestros Servicios"
        description="Descubrí todos los tratamientos que Sentirse Bien tiene para vos."
      />
      <main>
        <Servicios />
      </main>
      <Footer />
    </>
  );
}