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

  // Log the MongoDB URI (masked for security)
  console.log('MongoDB URI present:', !!MONGODB_URI);
  if (MONGODB_URI) {
    const maskedUri = MONGODB_URI.replace(/mongodb(\+srv)?:\/\/([^:]+):([^@]+)@/, 'mongodb$1://***:***@');
    console.log('MongoDB URI (masked):', maskedUri);
  }

  if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable');
  }

  // If we have an existing connection, return it
  if (globalWithMongoose.mongoose.conn) {
    console.log('Using existing MongoDB connection');
    return globalWithMongoose.mongoose.conn;
  }

  // If a connection is being established, return the promise
  if (!globalWithMongoose.mongoose.promise) {
    console.log('Initializing new MongoDB connection...');
    const opts = {
      bufferCommands: true,
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 30000,
      maxPoolSize: 10,
      minPoolSize: 5,
      maxIdleTimeMS: 60000,
      retryWrites: true,
      retryReads: true,
      family: 4,
      heartbeatFrequencyMS: 10000,
      autoIndex: true,
      autoCreate: true
    };

    console.log('MongoDB connection options:', JSON.stringify(opts, null, 2));

    globalWithMongoose.mongoose.promise = mongoose.connect(MONGODB_URI, opts)
      .then(mongoose => {
        console.log('MongoDB connected successfully');
        console.log('Connection state:', mongoose.connection.readyState);
        return mongoose.connection;
      })
      .catch(error => {
        console.error('MongoDB connection error:', error);
        console.error('Error details:', {
          name: error.name,
          message: error.message,
          code: error.code,
          stack: error.stack
        });
        throw error;
      });
  }

  try {
    // Await the connection
    console.log('Awaiting MongoDB connection...');
    globalWithMongoose.mongoose.conn = await globalWithMongoose.mongoose.promise;
    console.log('MongoDB connection established successfully');
  } catch (e: unknown) {
    // If connection fails, clear the promise to retry next time
    globalWithMongoose.mongoose.promise = null;
    console.error('Failed to connect to MongoDB:', e);
    if (e instanceof Error) {
      console.error('Error details:', {
        name: e.name,
        message: e.message,
        code: (e as any).code,
        stack: e.stack
      });
    }
    throw e;
  }

  return globalWithMongoose.mongoose.conn;
}

export default dbConnect;