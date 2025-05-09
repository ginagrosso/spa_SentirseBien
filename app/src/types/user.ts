export interface IUser {
    _id: string;
    name: string;
    email: string;
    password: string;
    image?: string;
    rol: 'user' | 'admin';
    active: boolean;
    createdAt: string;
    updatedAt: string;
} 