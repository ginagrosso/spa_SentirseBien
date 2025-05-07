import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import dbConnect from '@/lib/dbConnect';
import { Turno } from '@/models/Turno';
import { validations } from '@/lib/validations';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Método no permitido' });
    }

    try {
        const session = await getServerSession(req, res, authOptions);

        if (!session) {
            return res.status(401).json({ message: 'No autorizado' });
        }

        await dbConnect();

        const { servicio, fecha, hora, notas } = req.body;

        // Validar fecha usando las validaciones existentes
        const fechaResult = validations.validarFecha(fecha);
        if (!fechaResult.isValid) {
            return res.status(400).json({ message: fechaResult.error });
        }

        // Validar horario usando las validaciones existentes
        const horarioResult = validations.validarHorario(hora);
        if (!horarioResult.isValid) {
            return res.status(400).json({ message: horarioResult.error });
        }

        // Verificar disponibilidad usando las validaciones existentes
        const turnosExistentes = await Turno.find({
            fecha: new Date(fecha),
            estado: { $ne: 'cancelado' }
        });

        const disponibilidadResult = await validations.validarDisponibilidad(
            fecha,
            hora,
            60, // Duración por defecto de 60 minutos
            turnosExistentes
        );

        if (!disponibilidadResult.isValid) {
            return res.status(400).json({ message: disponibilidadResult.error });
        }

        // Crear el nuevo turno
        const turno = await Turno.create({
            userId: session.user.id,
            servicio,
            fecha: new Date(fecha),
            hora,
            notas,
            estado: 'pendiente'
        });

        return res.status(201).json({ message: 'Turno reservado exitosamente', turno });
    } catch (error) {
        console.error('Error al reservar turno:', error);
        return res.status(500).json({ message: 'Error al reservar el turno' });
    }
} 