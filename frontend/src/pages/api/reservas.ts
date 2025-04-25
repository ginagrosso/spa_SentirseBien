import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'lib/prisma';
import { authenticate } from '../../middleware/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  authenticate(req, res, async () => {
    if (req.method === 'POST') {
      const { nombre, email, servicio, fecha, horario } = req.body;

      if (!nombre || !email || !servicio || !fecha || !horario) {
        return res.status(400).json({ error: 'Faltan datos en el formulario.' });
      }

      try {
        await prisma.reserva.create({
          data: { nombre, email, servicio, fecha, horario },
        });
        return res.status(201).json({ mensaje: 'Reserva realizada con éxito.' });
      } catch (error) {
        console.error('Error al crear la reserva:', error);
        return res.status(500).json({ error: 'Error al procesar la reserva.' });
      }
    }

    return res.status(405).json({ error: 'Método no permitido.' });
  });
}