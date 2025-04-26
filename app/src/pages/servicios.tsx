'use client';

import Header from "../components/Header";
import Footer from "../components/Footer";
import Servicios from "../components/Servicios";

export default function PaginaServicios() {
  return (
    <>
      <Header />
      <main>
        <Servicios />
      </main>
      <Footer />
    </>
  );
}