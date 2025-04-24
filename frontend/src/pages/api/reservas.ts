import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { nombre, email, servicio, dia, horario } = req.body;

    if (
      typeof nombre !== 'string' || nombre.trim() === '' ||
      typeof email !== 'string' || email.trim() === '' ||
      typeof servicio !== 'string' || servicio.trim() === '' ||
      typeof dia !== 'string' || dia.trim() === '' ||
      typeof horario !== 'string' || horario.trim() === ''
    ) {
      return res.status(400).json({ error: 'Faltan datos en el formulario.' });
    }

    console.log('📥 Reserva recibida:', { nombre, email, servicio, dia, horario });

    return res.status(200).json({
      mensaje: 'Reserva realizada con éxito. Pronto recibirás una confirmación por correo.',
    });
  }

  return res.status(405).json({ error: 'Método no permitido.' });
}

