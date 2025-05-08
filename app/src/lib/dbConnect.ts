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

  if (globalWithMongoose.mongoose.conn) {
    return globalWithMongoose.mongoose.conn;
  }

  if (!globalWithMongoose.mongoose.promise) {
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
      // heartbeatFrequencyMS: 10000,
      // autoIndex: true,
      // autoCreate: true
    };

    globalWithMongoose.mongoose.promise = mongoose.connect(MONGODB_URI, opts)
      .then(mongooseInstance => {
        return mongooseInstance.connection;
      })
      .catch(error => {
        console.error('MongoDB connection error:', error.message);
        throw error;
      });
  }

  try {
    globalWithMongoose.mongoose.conn = await globalWithMongoose.mongoose.promise;
    return globalWithMongoose.mongoose.conn;
  } catch (e) {
    globalWithMongoose.mongoose.promise = null;
    console.error('Failed to establish MongoDB connection:', e);
    throw e;
  }
}

export default dbConnect;