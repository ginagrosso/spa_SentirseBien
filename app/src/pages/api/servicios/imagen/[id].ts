import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../../lib/dbConnect';
import { ServiceModel } from '../../../../models/Service';
import mongoose from 'mongoose';

// Configuración del CDN (reemplazar con tu URL de CDN en producción)
const CDN_URL = process.env.NEXT_PUBLIC_CDN_URL || '';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  const { id } = req.query;
  if (!id || Array.isArray(id) || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  // Si estamos en producción y tenemos CDN, redirigir al CDN
  if (process.env.NODE_ENV === 'production' && CDN_URL) {
    return res.redirect(302, `${CDN_URL}/images/${id}`);
  }

  // Configurar cabeceras de caché
  res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  res.setHeader('ETag', `"${id}"`);
  
  // Si el cliente tiene la imagen en caché, devolver 304
  const ifNoneMatch = req.headers['if-none-match'];
  if (ifNoneMatch === `"${id}"`) {
    return res.status(304).end();
  }

  const servicio = await ServiceModel.findById(id);
  if (!servicio) {
    console.log('No se encontró el servicio con id:', id);
    return res.redirect(302, '/images/default-service.jpg');
  }

  if (!servicio.image || !servicio.image.data) {
    console.log('El servicio no tiene imagen, se muestra la imagen por defecto');
    return res.redirect(302, '/images/default-service.jpg');
  }

  res.setHeader('Content-Type', servicio.image.contentType);
  return res.send(servicio.image.data);
} 