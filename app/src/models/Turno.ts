// src/models/Turno.ts
import mongoose, { Schema, Document, Model } from 'mongoose';

// Esta interfaz debe coincidir con los campos del Schema
export interface ITurno extends Document {
    userId: mongoose.Types.ObjectId; // Ref a User
    service: mongoose.Types.ObjectId; // Ref a Service
    professional: mongoose.Types.ObjectId; // Ref a Professional (inferido de API)
    date: Date; // Fecha (¿o solo fecha sin hora?) - API recibe date, startTime, endTime
    startTime: string; // Hora de inicio (inferido de API)
    endTime: string; // Hora de fin (inferido de API)
    duration: number; // Duración (inferido de API)
    status: 'pendiente' | 'confirmado' | 'cancelado';
    notas?: string;
    createdAt: Date;
    updatedAt: Date;
}

const TurnoSchema = new Schema<ITurno>({
    userId:  { type: Schema.Types.ObjectId, ref: 'User',    required: true, index: true }, 
    service: { type: Schema.Types.ObjectId, ref: 'Service', required: true },
    professional: { type: Schema.Types.ObjectId, ref: 'Professional', required: true }, // Añadido ref a Professional
    date:    { type: Date,     required: true, index: true }, // ¿Debería ser solo fecha?
    startTime: { type: String, required: true }, // Añadido
    endTime: { type: String, required: true }, // Añadido
    duration: { type: Number, required: true }, // Añadido
    status:  {
        type: String,
        enum: ['pendiente','confirmado','cancelado'],
        default: 'pendiente'
    },
    notas: { type: String } // Añadido
}, {
    timestamps: true // Mantenido de HEAD
});

// Índices adaptados
TurnoSchema.index({ professional: 1, date: 1, startTime: 1 }); // Índice más útil para disponibilidad

export const Turno: Model<ITurno> =
    mongoose.models.Turno ||
    mongoose.model<ITurno>('Turno', TurnoSchema);
