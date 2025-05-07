import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
    email: string;
    password: string;
    nombre: string;
    telefono: string;
    rol: 'admin' | 'user';
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
    {
        email: {
            type: String,
            required: [true, 'Email es requerido'],
            unique: true,
            trim: true,
            lowercase: true
        },
        password: {
            type: String,
            required: [true, 'Contraseña es requerida'],
            minlength: [6, 'La contraseña debe tener al menos 6 caracteres']
        },
        nombre: {
            type: String,
            required: [true, 'Nombre es requerido'],
            trim: true
        },
        telefono: {
            type: String,
            trim: true
        },
        rol: {
            type: String,
            enum: ['admin', 'user'],
            default: 'user'
        }
    },
    {
        timestamps: true
    }
);

// Middleware para hashear la contraseña antes de guardar
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error: any) {
        next(error);
    }
});

// Método para comparar contraseñas
UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
};

// Índices para mejorar el rendimiento de las consultas
// userSchema.index({ email: 1 });
UserSchema.index({ rol: 1 });

export const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);