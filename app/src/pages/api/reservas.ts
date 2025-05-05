import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/mongodb';
import { ServiceModel } from '@/models/Service';
import { ReservationModel } from '@/models/Reservation';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();

  if (req.method === 'GET') {
    const reservas = await ReservationModel.find().populate('service');
    return res.status(200).json(reservas);
  }

  if (req.method === 'POST') {
    const { userId, serviceId, date } = req.body;

    if (!userId || !serviceId || !date) {
      return res.status(400).json({ error: 'Faltan datos en el formulario.' });
    }

    try {
      const nueva = await ReservationModel.create({ userId, service: serviceId, date });
      return res.status(201).json(nueva);
    } catch (error) {
      console.error('Error al crear la reserva:', error);
      return res.status(500).json({ error: 'Error al procesar la reserva.' });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}