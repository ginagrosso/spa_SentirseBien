'use client';

export default function Categorias() {
  return (
    <section className="pt-4 pb-12 px-4 bg-white">
    <div className="max-w-6xl mx-auto">
    
    <h2 className="text-2xl md:text-2xl font-roboto font-semibold text-[#536a86] text-center mb-8 tracking-wide">
      Categorías
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-center">
      
      <div className="rounded-xl border border-[#bac4e0] text-[#536a86] font-roboto text-base font-medium py-4 px-2 hover:bg-[#bac4e0] hover:text-white transition duration-300 cursor-pointer shadow-sm hover:shadow-md">
        TRATAMIENTOS
      </div>

      <div className="rounded-xl border border-[#bac4e0] text-[#536a86] font-roboto text-base font-medium py-4 px-2 hover:bg-[#bac4e0] hover:text-white transition duration-300 cursor-pointer shadow-sm hover:shadow-md">
        PROMOS
      </div>

      <div className="rounded-xl border border-[#bac4e0] text-[#536a86] font-roboto text-base font-medium py-4 px-2 hover:bg-[#bac4e0] hover:text-white transition duration-300 cursor-pointer shadow-sm hover:shadow-md">
        SERVICIO DEL MES
      </div>

    </div>
  </div>
</section>

  );
}
