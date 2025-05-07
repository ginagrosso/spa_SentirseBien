'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { IService } from '../models/Service';

interface ServiciosProps {
  services: IService[] | undefined;
}

export default function Servicios({ services }: ServiciosProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 50000 });

  
  if (!services || !Array.isArray(services)) {
    return (
      <div className="text-center mt-10 text-red-500">
        No se pudieron cargar los servicios. Intenta más tarde.
      </div>
    );
  }


  const servicesGroupedByCategory = services.reduce((acc: Record<string, IService[]>, service) => {
    if (!acc[service.category]) acc[service.category] = [];
    acc[service.category].push(service);
    return acc;
  }, {});

  
  const filtered = Object.entries(servicesGroupedByCategory).map(([category, items]) => ({
    category,
    services: items.filter(service => {
      const price = service.price;
      return (!selectedCategory || selectedCategory === category) &&
             price >= priceRange.min &&
             price <= priceRange.max;
    }),
  }));

  return (
    <main className="relative min-h-screen font-roboto">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row gap-8">


          <div className="md:w-64 w-full bg-white/80 rounded-xl shadow-lg p-6 h-fit backdrop-blur-sm border border-accent/20">
            <h3 className="text-lg font-lora font-semibold mb-4 text-primary">Filtrar por</h3>

            <div className="mb-6">
              <h4 className="text-sm font-medium text-primary/80 mb-2">Categoría</h4>
              <div className="space-y-2">
                {Object.keys(servicesGroupedByCategory).map(category => (
                  <label key={category} className="flex items-center space-x-2 cursor-pointer group">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === category}
                      onChange={() =>
                        setSelectedCategory(selectedCategory === category ? null : category)
                      }
                      className="text-accent focus:ring-accent cursor-pointer"
                    />
                    <span className="text-sm group-hover:text-accent transition-colors">{category}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-primary/80 mb-2">Rango de Precio</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span>${priceRange.min}</span>
                  <span>${priceRange.max}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="50000"
                  step="1000"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) })}
                  className="w-full accent-accent"
                />
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.flatMap(({ category, services }) =>
                services.map((service, idx) => {
                  console.log('Servicio:', service.name, 'imageUrl:', service.imageUrl);
                  return (
                    <motion.div
                      key={`${category}-${idx}`}
                      className="relative rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: idx * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="absolute inset-0">
                        <img
                          src={typeof service.image === 'string' ? service.image : (service.imageUrl || '/images/default-service.jpg')}
                          alt={service.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>

                      <div className="relative h-full flex flex-col">
                        <div className="w-full h-40 relative">
                          <div className="absolute inset-0 bg-black/20"></div>
                        </div>

                        <div className="flex-1 flex flex-col justify-between p-4 bg-white/80">
                          <div>
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="text-lg font-lora font-bold">{service.name}</h4>
                              <span className="bg-accent/30 text-primary text-base font-semibold px-3 py-1.5 rounded-full border border-accent/30">
                                ${service.price}
                              </span>
                            </div>
                            <p className="text-sm text-primary/80 mb-3 line-clamp-2">{service.description}</p>
                          </div>
                          <div className="flex justify-end">
                            <Link href="/reserva">
                              <button className="bg-primary text-white px-5 py-2 rounded-lg hover:bg-primary/90 transition-all text-sm font-medium">
                                Reservar
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

