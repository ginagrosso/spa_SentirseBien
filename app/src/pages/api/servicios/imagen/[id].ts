import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../../lib/dbConnect';
import { ServiceModel } from '../../../../models/Service';
import mongoose from 'mongoose';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  const { id } = req.query;
  if (!id || Array.isArray(id) || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'ID inválido' });
  }
  const servicio = await ServiceModel.findById(id);
  if (!servicio) {
    console.log('No se encontró el servicio con id:', id);
    return res.redirect(302, '/images/default-service.jpg');
  }
  console.log('Servicio encontrado:', JSON.stringify(servicio, null, 2));
  if (!servicio.image || !servicio.image.data) {
    console.log('El servicio no tiene imagen, se muestra la imagen por defecto');
    return res.redirect(302, '/images/default-service.jpg');
  }
  console.log('Imagen encontrada, enviando imagen con contentType:', servicio.image.contentType);
  res.setHeader('Content-Type', servicio.image.contentType);
  res.setHeader('Cache-Control', 'public, max-age=31536000');
  return res.send(servicio.image.data);
} 