// src/models/Service.ts
import { Schema, model, models } from 'mongoose';

interface Service {
    name: string;
    price: number;
    duration: number;  // minutos, por ejemplo
    // …otros campos que tengas hardcodeados
}

const ServiceSchema = new Schema<Service>({
    name:     { type: String, required: true },
    price:    { type: Number, required: true },
    duration: { type: Number, required: true },
}, {
    collection: 'services',
    timestamps: true,
});

// Evita recompilar el modelo multiple veces en dev
export const ServiceModel = models.Service || model<Service>('Service', ServiceSchema);
