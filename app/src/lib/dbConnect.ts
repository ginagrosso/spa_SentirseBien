// src/lib/dbConnect.ts
import mongoose from 'mongoose';

// Define the MongoDB connection cache type
interface ConnectionCache {
  conn: mongoose.Connection | null;
  promise: Promise<mongoose.Connection> | null;
}

// Declare global namespace augmentation
declare global {
  var mongoose: ConnectionCache;
}

// Initialize cache in global scope to persist across hot reloads in development
const globalWithMongoose = global as typeof global & {
  mongoose: ConnectionCache;
};

// Set up the connection cache
if (!globalWithMongoose.mongoose) {
  globalWithMongoose.mongoose = { conn: null, promise: null };
}

/**
 * Connect to MongoDB database
 */
async function dbConnect(): Promise<mongoose.Connection> {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    console.error('ERROR: MONGODB_URI environment variable not defined.');
    throw new Error('Please define the MONGODB_URI environment variable');
  }

  console.log('Attempting to use MONGODB_URI:', process.env.MONGODB_URI);

  if (globalWithMongoose.mongoose.conn) {
    console.log('Using cached database connection');
    return globalWithMongoose.mongoose.conn;
  }

  if (!globalWithMongoose.mongoose.promise) {
    const opts = {
      bufferCommands: false,
    };
    console.log('Creating new database connection promise');
    globalWithMongoose.mongoose.promise = mongoose.connect(MONGODB_URI, opts)
      .then(mongooseInstance => {
        console.log('MongoDB connected successfully to:', mongooseInstance.connection.host);
        return mongooseInstance.connection;
      })
      .catch(error => {
        console.error('MongoDB connection error:', error.message);
        throw error;
      });
  }

  try {
    console.log('Awaiting database connection promise');
    globalWithMongoose.mongoose.conn = await globalWithMongoose.mongoose.promise;
    return globalWithMongoose.mongoose.conn;
  } catch (e) {
    console.error('Database connection error in dbConnect:', e);
    globalWithMongoose.mongoose.promise = null;
    throw e;
  }
}

export default dbConnect;