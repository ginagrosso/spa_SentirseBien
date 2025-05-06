'use client';

import Header from "../components/Header";
import Footer from "../components/Footer";
import Servicios from "../components/Servicios";
import PageHero from "components/PageHero";

export default function ServiciosPage() {
  return (
    <>
      <Header transparent={true} />
      <PageHero 
        title="Nuestros Servicios"
        description="Descubrí todos los tratamientos que Sentirse Bien tiene para vos."
      />
      <Servicios />
      <Footer />
    </>
  );
}