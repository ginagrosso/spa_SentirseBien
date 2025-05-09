import mongoose from 'mongoose';
import { IUser } from '@/types/user';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema<IUser>({
    name: {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    email: {
        type: String,
        required: [true, 'El email es requerido'],
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es requerida'],
        minlength: [6, 'La contraseña debe tener al menos 6 caracteres']
    },
    rol: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
}, {
    timestamps: true
});

// Método para comparar contraseñas
userSchema.methods.comparePassword = async function(candidatePassword: string) {
    return bcrypt.compare(candidatePassword, this.password);
};

// Middleware para hashear la contraseña antes de guardar
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error: any) {
        next(error);
    }
});

// Índices para mejorar el rendimiento de las consultas
// userSchema.index({ email: 1 });
userSchema.index({ rol: 1 });

export const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);