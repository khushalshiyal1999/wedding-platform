import mongoose, { Schema, Document, Model } from 'mongoose';
import { IMedia } from '@/types';

export interface MediaDocument extends Omit<IMedia, '_id'>, Document {}

const MediaSchema = new Schema<MediaDocument>(
  {
    url: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    format: {
      type: String,
      required: true,
    },
    resourceType: {
      type: String,
      required: true,
      enum: ['image', 'video', 'raw'],
      default: 'image',
    },
    bytes: {
      type: Number,
      required: true,
    },
    invitationId: {
      type: Schema.Types.ObjectId,
      ref: 'Invitation',
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Media: Model<MediaDocument> =
  mongoose.models.Media || mongoose.model<MediaDocument>('Media', MediaSchema);

export default Media;
