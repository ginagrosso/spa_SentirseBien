'use client';

import { useState, useEffect } from 'react';
import PageHero from '../components/PageHero';
import Servicios from '../components/Servicios';

interface IServiceDisplay {
  _id: any;
  name: string;
  description: string;
  price: number | string;
  duration: number | string;
  category: string;
  imageUrl: string;
  available: boolean;
}

export default function ServiciosPage() {
  const [services, setServices] = useState<IServiceDisplay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [rawData, setRawData] = useState(null);

  useEffect(() => {
    fetch('/api/servicios')
      .then(res => {
        if (!res.ok) {
          return res.json().then(errData => {
            throw new Error(errData.error || errData.message || `Error ${res.status} al obtener servicios`);
          }).catch(() => { 
            throw new Error(`Error ${res.status} al obtener servicios`);
          });
        }
        return res.json();
      })
      .then((data) => {
        setRawData(data); 
        
        if (Array.isArray(data)) {
          const formattedServices = data.map((service: any) => {
            let finalImageUrl = service.imageUrl; 
            if (!finalImageUrl && typeof service.image === 'string') {
              finalImageUrl = service.image;
            } else if (!finalImageUrl && typeof service.imagen === 'string') {
              finalImageUrl = service.imagen;
            }
            if (!finalImageUrl) {
              finalImageUrl = '/images/default-service.jpg';
            }

            return {
              _id: service._id,
              name: service.name || service.nombre || 'Servicio sin nombre',
              description: service.description || service.descripcion || '',
              price: service.price || service.precio || 0,
              duration: service.duration || service.duracion || 0,
              category: (service.category || service.categoria) ? String(service.category || service.categoria).trim() : 'General', 
              imageUrl: finalImageUrl, 
              available: service.available !== undefined ? service.available : true,
            };
          });
          setServices(formattedServices);
          setError(null);
        } else {
          console.error('Respuesta de API inesperada o vacía:', data);
          setError('No se encontraron servicios disponibles o el formato es incorrecto.');
          setServices([]);
        }
      })
      .catch((e: Error) => {
        console.error('Error cargando servicios:', e);
        setError(e.message || 'No se pudieron cargar los servicios. Intenta más tarde.');
        setServices([]); 
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <PageHero
        title="Nuestros Servicios"
        description="Descubrí todos los tratamientos que Sentirse Bien tiene para vos."
      />
      {loading && (
        <p className="text-center mt-8 text-gray-500">Cargando servicios...</p>
      )}
      {error && (
        <p className="text-center mt-8 text-red-500">{error}</p>
      )}
      {!loading && !error && services.length > 0 && (
        <Servicios services={services as any} /> 
      )}
      {!loading && !error && services.length === 0 && (
        <div className="text-center mt-10 p-4">
          <p className="text-amber-600">No hay servicios disponibles actualmente.</p>
          {rawData && (
            <details className="mt-4 text-left max-w-2xl mx-auto p-4 bg-gray-50 rounded">
              <summary className="cursor-pointer text-sm text-gray-500">Información de depuración (datos crudos API)</summary>
              <pre className="text-xs mt-2 overflow-auto p-2 bg-gray-100">{JSON.stringify(rawData, null, 2)}</pre>
            </details>
          )}
        </div>
      )}
    </>
  );
}