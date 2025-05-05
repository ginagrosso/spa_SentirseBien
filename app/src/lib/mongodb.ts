// src/lib/mongodb.ts
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) throw new Error('Define MONGODB_URI en .env.local');

let cachedConn: typeof mongoose | null = null;

export async function connectToDatabase() {
    if (cachedConn) return cachedConn;
    const conn = await mongoose.connect(MONGODB_URI, {
        dbName: process.env.DB_NAME,       // opcional
        // useNewUrlParser: true, useUnifiedTopology: true  // TS incl. ya lo hace por default
    });
    cachedConn = conn;
    return conn;
}
