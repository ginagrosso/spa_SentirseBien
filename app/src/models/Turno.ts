// src/models/Turno.ts
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
