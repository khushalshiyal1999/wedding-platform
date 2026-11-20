import mongoose, { Schema, Document, Model } from 'mongoose';
import { ITemplate } from '@/types';

export interface TemplateDocument extends Omit<ITemplate, '_id'>, Document {}

const TemplateSchema = new Schema<TemplateDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    previewImage: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['traditional', 'floral', 'modern'],
      default: 'traditional',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Template: Model<TemplateDocument> =
  mongoose.models.Template || mongoose.model<TemplateDocument>('Template', TemplateSchema);

export default Template;
