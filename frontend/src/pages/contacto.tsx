'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Contacto() {
  return (
    <>
      <Header />

      <section className="py-10 bg-white flex justify-center font-roboto">
        <div className="bg-[#bac4e0] p-6 rounded-xl space-y-4 shadow-md w-full max-w-lg text-[#536a86]">
            <h2 className="text-xl font-semibold mb-4">Envíanos tu consulta</h2>
            <form className="space-y-4">
            <input
                type="text"
                placeholder="Nombre completo"
                className="w-full p-3 rounded-md"
            />
            <input
                type="email"
                placeholder="Correo electrónico"
                className="w-full p-3 rounded-md"
            />
            <textarea
                rows={5}
                placeholder="Escribí tu mensaje..."
                className="w-full p-3 rounded-md"
            ></textarea>
            <button
                type="submit"
                className="bg-[#536a86] text-white py-2 px-6 rounded-md w-full hover:bg-[#40576d] transition"
            >
                Enviar consulta
            </button>
            </form>
        </div>
    </section>

      <section className="py-12 px-4 bg-white font-roboto">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 items-start">
            
          <div className="space-y-4 text-[#536a86]">
            <h2 className="text-3xl font-semibold mb-4">Contacto</h2>
            <p><strong>Teléfono:</strong> (011) 1234-5678</p>
            <p><strong>Email:</strong> contacto@sentirsebien.com</p>
            <p><strong>Dirección:</strong> Av. Bienestar 1234, Buenos Aires</p>
            <p><strong>Horarios:</strong> Lunes a Viernes de 9 a 18 hs</p>
            <a
                href="https://wa.me/5493482678983"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                >
                Chatear por WhatsApp
            </a>

          </div>
          <div className="rounded-md overflow-hidden mt-6">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3282.7923130479853!2d-58.417309384770684!3d-34.60966068046016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccb2e3fbd2073%3A0xe2d0f2928e89c561!2sAv.%20Bienestar%201234%2C%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1713300000000"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
