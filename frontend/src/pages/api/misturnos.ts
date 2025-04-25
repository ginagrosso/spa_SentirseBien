import type { NextApiRequest, NextApiResponse } from 'next';
import servicios from '../../data/servicios';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const turnos = [
    {
      id: 1,
      nombre: 'Lucia Tonzar',
      servicio: servicios[0].services[0].name,
      dia: 'Lunes',
      horario: '10:00',
      estado: 'Confirmado',
    },
    {
      id: 2,
      nombre: 'Lucia Tonzar',
      servicio: servicios[1].services[0].name,
      dia: 'Martes',
      horario: '11:00',
      estado: 'Pendiente',
    },
    {
        id: 3,
        nombre: 'Lucia Tonzar',
        servicio: servicios[1].services[0].name,
        dia: 'Martes',
        horario: '11:00',
        estado: 'Cancelado',
      },
  ];

  res.status(200).json(turnos);
}
