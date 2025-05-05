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
    throw new Error('Please define the MONGODB_URI environment variable');
  }

  // If we have an existing connection, return it
  if (globalWithMongoose.mongoose.conn) {
    return globalWithMongoose.mongoose.conn;
  }

  // If a connection is being established, return the promise
  if (!globalWithMongoose.mongoose.promise) {
    const opts = {
      bufferCommands: false,
    };

    globalWithMongoose.mongoose.promise = mongoose.connect(MONGODB_URI, opts)
      .then(mongoose => mongoose.connection);
  }

  try {
    // Await the connection
    globalWithMongoose.mongoose.conn = await globalWithMongoose.mongoose.promise;
  } catch (e) {
    // If connection fails, clear the promise to retry next time
    globalWithMongoose.mongoose.promise = null;
    throw e;
  }

  return globalWithMongoose.mongoose.conn;
}

export default dbConnect;