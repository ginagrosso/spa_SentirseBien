export interface IUser {
    _id: string;
    name: string;
    email: string;
    password?: string;
    role: 'user' | 'admin' | 'professional';
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserSession {
    id: string;
    name: string;
    email: string;
    role: 'user' | 'admin' | 'professional';
}

export interface UserResponse {
    id: string;
    name: string;
    email: string;
    role: 'user' | 'admin' | 'professional';
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
} 