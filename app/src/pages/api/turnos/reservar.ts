import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import dbConnect from '@/lib/dbConnect';
import { Turno } from '@/models/Turno';
import { validations } from '@/lib/validations';
import { handleError, ValidationError, AuthenticationError, ConflictError } from '@/lib/errors';
import { turnoSchema } from '@/lib/validations';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Método no permitido' });
    }

    try {
        const session = await getServerSession(req, res, authOptions);

        if (!session) {
            throw new AuthenticationError();
        }

        await dbConnect();

        const { servicio, fecha, hora, notas } = req.body;

        // Validar datos con Zod
        const validationResult = turnoSchema.safeParse({
            userId: session.user.id,
            serviceId: servicio,
            date: fecha,
            time: hora,
            notes: notas
        });

        if (!validationResult.success) {
            throw new ValidationError(validationResult.error.message);
        }

        // Validar fecha
        const fechaResult = validations.validarFecha(fecha);
        if (!fechaResult.isValid) {
            throw new ValidationError(fechaResult.error!);
        }

        // Validar horario
        const horarioResult = validations.validarHorario(hora);
        if (!horarioResult.isValid) {
            throw new ValidationError(horarioResult.error!);
        }

        // Verificar disponibilidad
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
            throw new ConflictError(disponibilidadResult.error!);
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
        const errorResponse = handleError(error);
        return res.status(errorResponse.statusCode).json({
            message: errorResponse.message,
            code: errorResponse.code
        });
    }
} 