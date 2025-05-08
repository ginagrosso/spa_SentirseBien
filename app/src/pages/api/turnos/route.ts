// src/pages/api/turnos/route.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect                from '../../../lib/dbConnect';
import { authenticate }         from '../../../middleware/auth';
import { Turno }                from '../../../models/Turno';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // 1) Autenticación
    await new Promise<void>((resolve) =>
        authenticate(req as any, res, resolve)
    );
    const user = (req as any).user;
    if (!user || user.rol !== 'user')
        return res.status(401).json({ error: 'No autorizado' });

    // 2) Conexión a Mongo
    await dbConnect();

    switch (req.method) {
        case 'GET': {
            // Listar todos los turnos del user
            const turnos = await Turno.find({ userId: user.id })
                .populate('service','name category')
                .sort({ date: 1 });
            return res.status(200).json(turnos);
        }

        case 'POST': {
            const { date, service } = req.body;
            if (!date || !service)
                return res.status(400).json({ error: 'Faltan date o service' });

            const newTurno = await Turno.create({
                userId:  user.id,
                service: service,
                date:    new Date(date),
            });
            return res.status(201).json(newTurno);
        }

        default:
            res.setHeader('Allow', ['GET','POST']);
            return res.status(405).end(`Method ${req.method} No permitido`);
    }
}
