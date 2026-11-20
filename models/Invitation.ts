import mongoose, { Schema, Document, Model } from 'mongoose';
import { IInvitation, IWeddingEvent, IGalleryItem, InvitationStatus } from '@/types';

export interface WeddingEventDocument extends Omit<IWeddingEvent, '_id'>, Document {}
export interface GalleryItemDocument extends Omit<IGalleryItem, '_id'>, Document {}
export interface InvitationDocument extends Omit<IInvitation, '_id'>, Document {}

const WeddingEventSchema = new Schema<WeddingEventDocument>({
  eventName: { type: String, required: true, trim: true },
  eventDate: { type: String, required: true },
  eventTime: { type: String, required: true },
  eventVenue: { type: String, required: true, trim: true },
  eventDescription: { type: String, default: '', trim: true },
  eventImage: { type: String, default: '' },
});

const GalleryItemSchema = new Schema<GalleryItemDocument>({
  imageUrl: { type: String, required: true },
  altText: { type: String, default: '' },
  displayOrder: { type: Number, default: 0 },
});

const InvitationSchema = new Schema<InvitationDocument>(
  {
    groomName: { type: String, required: true, trim: true },
    brideName: { type: String, required: true, trim: true },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    description: { type: String, default: '', trim: true },
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'] as InvitationStatus[],
      default: 'draft',
      index: true,
    },
    templateId: {
      type: String,
      required: true,
      default: 'royal',
      index: true,
    },

    // Wedding details
    weddingDate: { type: String, required: true },
    weddingTime: { type: String, default: '18:00' },
    timezone: { type: String, default: 'Asia/Kolkata' },

    // Groom info
    groomImage: { type: String, default: '' },
    groomDescription: { type: String, default: '', trim: true },
    groomParents: { type: String, default: '', trim: true },

    // Bride info
    brideImage: { type: String, default: '' },
    brideDescription: { type: String, default: '', trim: true },
    brideParents: { type: String, default: '', trim: true },

    // Venue info
    venueName: { type: String, required: true, trim: true },
    venueAddress: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    country: { type: String, default: 'India', trim: true },
    googleMapsUrl: { type: String, default: '' },

    // Events and Gallery
    events: { type: [WeddingEventSchema], default: [] },
    gallery: { type: [GalleryItemSchema], default: [] },

    // Music
    musicUrl: { type: String, default: '' },
    musicTitle: { type: String, default: '' },

    // Design settings
    primaryColor: { type: String, default: '#800020' },
    secondaryColor: { type: String, default: '#D4AF37' },
    backgroundColor: { type: String, default: '#FFFDF9' },
    fontFamily: { type: String, default: 'Playfair Display' },

    // Contact
    contactNumber: { type: String, default: '' },
    whatsappNumber: { type: String, default: '' },

    publishedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);

// Indexes
InvitationSchema.index({ slug: 1, status: 1 });
InvitationSchema.index({ createdAt: -1 });

export const Invitation: Model<InvitationDocument> =
  mongoose.models.Invitation || mongoose.model<InvitationDocument>('Invitation', InvitationSchema);

export default Invitation;
