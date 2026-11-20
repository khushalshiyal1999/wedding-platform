import mongoose, { Schema, Document, Model } from 'mongoose';
import { IAdmin } from '@/types';

export interface AdminDocument extends Omit<IAdmin, '_id'>, Document {}

const AdminSchema = new Schema<AdminDocument>(
  {
    name: {
      type: String,
      required: [true, 'Admin name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Admin email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    passwordHash: {
      type: String,
      required: [true, 'Password hash is required'],
    },
    role: {
      type: String,
      enum: ['admin'],
      default: 'admin',
    },
  },
  {
    timestamps: true,
  }
);

export const Admin: Model<AdminDocument> =
  mongoose.models.Admin || mongoose.model<AdminDocument>('Admin', AdminSchema);

export default Admin;
