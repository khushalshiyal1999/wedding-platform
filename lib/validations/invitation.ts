import { z } from 'zod';

export const eventSchema = z.object({
  _id: z.string().optional(),
  eventName: z.string().min(1, 'Event name is required').trim(),
  eventDate: z.string().min(1, 'Event date is required'),
  eventTime: z.string().min(1, 'Event time is required'),
  eventVenue: z.string().min(1, 'Event venue is required').trim(),
  eventDescription: z.string().optional().default(''),
  eventImage: z.string().optional().default(''),
});

export const galleryItemSchema = z.object({
  _id: z.string().optional(),
  imageUrl: z.string().min(1, 'Image URL is required'),
  altText: z.string().optional().default(''),
  displayOrder: z.number().int().default(0),
});

export const invitationSchema = z.object({
  groomName: z.string().min(1, 'Groom name is required').trim(),
  brideName: z.string().min(1, 'Bride name is required').trim(),
  slug: z
    .string()
    .min(3, 'Slug must be at least 3 characters')
    .max(100, 'Slug cannot exceed 100 characters')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase alphanumeric with hyphens (e.g., couple-wedding)')
    .trim(),
  description: z.string().optional().default(''),
  status: z.enum(['draft', 'published', 'archived']).default('draft'),
  templateId: z.string().min(1, 'Template selection is required').default('royal'),

  weddingDate: z.string().min(1, 'Wedding date is required'),
  weddingTime: z.string().optional().default('18:00'),
  timezone: z.string().optional().default('Asia/Kolkata'),

  groomImage: z.string().optional().default(''),
  groomDescription: z.string().optional().default(''),
  groomParents: z.string().optional().default(''),

  brideImage: z.string().optional().default(''),
  brideDescription: z.string().optional().default(''),
  brideParents: z.string().optional().default(''),

  venueName: z.string().min(1, 'Venue name is required').trim(),
  venueAddress: z.string().min(1, 'Venue address is required').trim(),
  city: z.string().min(1, 'City is required').trim(),
  state: z.string().min(1, 'State is required').trim(),
  country: z.string().optional().default('India'),
  googleMapsUrl: z.string().optional().default(''),

  events: z.array(eventSchema).optional().default([]),
  gallery: z.array(galleryItemSchema).optional().default([]),

  musicUrl: z.string().optional().default(''),
  musicTitle: z.string().optional().default(''),

  primaryColor: z.string().optional().default('#800020'),
  secondaryColor: z.string().optional().default('#D4AF37'),
  backgroundColor: z.string().optional().default('#FFFDF9'),
  fontFamily: z.string().optional().default('Playfair Display'),

  contactNumber: z.string().optional().default(''),
  whatsappNumber: z.string().optional().default(''),
});

export const updateStatusSchema = z.object({
  status: z.enum(['draft', 'published', 'archived']),
});

export type InvitationInput = z.infer<typeof invitationSchema>;
export type UpdateStatusInput = z.infer<typeof updateStatusSchema>;
