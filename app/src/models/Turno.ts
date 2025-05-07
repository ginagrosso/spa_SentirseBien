// src/models/Turno.ts
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
