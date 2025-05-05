import mongoose, { Document, Schema } from 'mongoose';

// Define the interface for Service document
export interface IService extends Document {
  name: string;
  description: string;
  duration: number; // in minutes
  price: number;
  available: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Create the schema
const ServiceSchema = new Schema<IService>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true
    },
    duration: {
      type: Number,
      required: [true, 'Duration is required'],
      min: [1, 'Duration must be at least 1 minute']
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative']
    },
    available: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

// Create and export the model
export const ServiceModel = mongoose.models.Service ||
  mongoose.model<IService>('Service', ServiceSchema);