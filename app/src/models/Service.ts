import mongoose, { Document, Schema } from 'mongoose';
import { IService } from '../models/Service';

export interface IService {
  _id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  category: string;
  image: string;
  available: boolean;
}

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
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative']
    },
    image: {
      type: String,
      required: [true, 'Image URL is required']
    },
    duration: {
      type: Number,
      min: [1, 'Duration must be at least 1 minute'],
      default: 60
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

export const ServiceModel =
  mongoose.models.Service || mongoose.model<IService>('Service', ServiceSchema);
