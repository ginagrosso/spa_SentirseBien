import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { nombre, email, mensaje } = req.body;

    if (!nombre || !email || !mensaje) {
      return res.status(400).json({ error: 'Faltan datos en el formulario.' });
    }

    console.log('Consulta recibida:', { nombre, email, mensaje });

    setTimeout(() => {
      res.status(200).json({ mensaje: 'Tu mensaje fue recibido correctamente.' });
    }, 1000);

  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Método ${req.method} no permitido.`);
  }
}
