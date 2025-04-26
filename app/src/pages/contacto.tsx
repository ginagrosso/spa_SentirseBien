'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';
import { useState } from 'react';

export default function Contacto() {
  const [form, setForm] = useState({ nombre: '', email: '', mensaje: '' });
  const [status, setStatus] = useState<'enviado' | 'error' | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('enviado');
        setForm({ nombre: '', email: '', mensaje: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
    setTimeout(() => setStatus(null), 4000);
  };

  return (
    <>
      <Header />

      {/* Hero simple */}
      <section className="bg-[#F5F9F8] text-[#436E6C] font-roboto py-16 px-4 text-center">
        <h1 className="text-4xl font-amiri italic mb-4">Contactanos</h1>
        <p className="max-w-3xl mx-auto text-lg">
          ¿Tenés dudas o querés saber más? Escribinos y te responderemos a la brevedad.
        </p>
      </section>

      {/* Formulario y contacto */}
      <section className="py-20 px-6 bg-white font-roboto">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-start">

          {/* Formulario */}
          <div className="bg-[#F5F9F8] p-8 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold text-[#436E6C] mb-6">Envíanos tu consulta</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="nombre"
                placeholder="Nombre completo"
                value={form.nombre}
                onChange={handleChange}
                className="w-full p-3 rounded-md border border-[#B6D5C8] focus:outline-none focus:ring-2 focus:ring-[#436E6C]"
              />
              <input
                type="email"
                name="email"
                placeholder="Correo electrónico"
                value={form.email}
                onChange={handleChange}
                className="w-full p-3 rounded-md border border-[#B6D5C8] focus:outline-none focus:ring-2 focus:ring-[#436E6C]"
              />
              <textarea
                rows={6}
                name="mensaje"
                placeholder="Escribí tu mensaje..."
                value={form.mensaje}
                onChange={handleChange}
                className="w-full p-3 rounded-md border border-[#B6D5C8] focus:outline-none focus:ring-2 focus:ring-[#436E6C]"
              ></textarea>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-[#436E6C] text-white px-6 py-2 rounded-md hover:bg-[#5A9A98] transition"
                >
                  Enviar consulta
                </button>
              </div>
              {status === 'enviado' && (
                <p className="text-green-700 text-sm mt-2">Tu mensaje fue enviado con éxito.</p>
              )}
              {status === 'error' && (
                <p className="text-red-700 text-sm mt-2">Ocurrió un error. Intenta nuevamente.</p>
              )}
            </form>
          </div>

          {/* Info de contacto */}
          <div className="text-[#436E6C] space-y-6">
            <h2 className="text-2xl font-semibold">Información de contacto</h2>
            <div className="text-base space-y-2">
              <p><strong>Teléfono:</strong> (011) 1234-5678</p>
              <p><strong>Email:</strong> contacto@sentirsebien.com</p>
              <p><strong>Dirección:</strong> Av. Bienestar 1234, Buenos Aires</p>
              <p><strong>Horarios:</strong> Lunes a Viernes de 9 a 18 hs</p>
            </div>
            <a
              href="https://wa.me/*************"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-500 text-white px-5 py-2 rounded-md hover:bg-green-600 transition"
            >
              💬 Chatear por WhatsApp
            </a>
            <div className="rounded-xl overflow-hidden shadow-md mt-4">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3282.7923130479853!2d-58.417309384770684!3d-34.60966068046016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccb2e3fbd2073%3A0xe2d0f2928e89c561!2sAv.%20Bienestar%201234%2C%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1713300000000"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
