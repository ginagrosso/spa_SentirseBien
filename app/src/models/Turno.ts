// src/models/Turno.ts
<<<<<<< HEAD
import mongoose from 'mongoose';
import { ITurno } from '@/types/turno';

const turnoSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    servicio: {
        type: String,
        required: true,
        enum: ['masaje', 'facial', 'corporal']
    },
    fecha: {
        type: Date,
        required: true
    },
    hora: {
        type: String,
        required: true
    },
    notas: {
        type: String
    },
    estado: {
        type: String,
        enum: ['pendiente', 'confirmado', 'cancelado'],
        default: 'pendiente'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Índices para mejorar el rendimiento de las búsquedas
turnoSchema.index({ userId: 1, fecha: 1 });
turnoSchema.index({ fecha: 1, hora: 1 });

export const Turno = mongoose.models.Turno || mongoose.model('Turno', turnoSchema);
=======
import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITurno extends Document {
    userId: mongoose.Types.ObjectId;
    service: mongoose.Types.ObjectId;
    date: Date;
    status: 'pendiente' | 'confirmado' | 'cancelado';
    createdAt: Date;
    updatedAt: Date;
}

const TurnoSchema = new Schema<ITurno>({
    userId:  { type: Schema.Types.ObjectId, ref: 'User',    required: true },
    service: { type: Schema.Types.ObjectId, ref: 'Service', required: true },
    date:    { type: Date,     required: true },
    status:  {
        type: String,
        enum: ['pendiente','confirmado','cancelado'],
        default: 'pendiente'
    },
}, {
    timestamps: true
});

export const Turno: Model<ITurno> =
    mongoose.models.Turno ||
    mongoose.model<ITurno>('Turno', TurnoSchema);
>>>>>>> origin/feature/adminpage
