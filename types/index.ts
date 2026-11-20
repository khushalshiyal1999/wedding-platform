export type InvitationStatus = 'draft' | 'published' | 'archived';

export interface IWeddingEvent {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _id?: any;
  eventName: string;
  eventDate: string;
  eventTime: string;
  eventVenue: string;
  eventDescription: string;
  eventImage?: string;
}

export interface IGalleryItem {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _id?: any;
  imageUrl: string;
  altText?: string;
  displayOrder: number;
}

export interface IInvitation {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _id?: any;
  groomName: string;
  brideName: string;
  slug: string;
  description: string;
  status: InvitationStatus;
  templateId: string;

  // Wedding details
  weddingDate: string;
  weddingTime: string;
  timezone: string;

  // Groom info
  groomImage?: string;
  groomDescription?: string;
  groomParents?: string;

  // Bride info
  brideImage?: string;
  brideDescription?: string;
  brideParents?: string;

  // Venue info
  venueName: string;
  venueAddress: string;
  city: string;
  state: string;
  country: string;
  googleMapsUrl?: string;

  // Events & Gallery
  events: IWeddingEvent[];
  gallery: IGalleryItem[];

  // Music
  musicUrl?: string;
  musicTitle?: string;

  // Design settings
  primaryColor?: string;
  secondaryColor?: string;
  backgroundColor?: string;
  fontFamily?: string;

  // Contact
  contactNumber?: string;
  whatsappNumber?: string;

  createdAt?: string | Date;
  updatedAt?: string | Date;
  publishedAt?: string | Date | null;
}

export interface ITemplate {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _id?: any;
  name: string;
  slug: string;
  description: string;
  previewImage: string;
  category: string;
  isActive: boolean;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface IAdmin {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _id?: any;
  name: string;
  email: string;
  passwordHash?: string;
  role: 'admin';
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface IMedia {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _id?: any;
  url: string;
  publicId: string;
  format: string;
  resourceType: string;
  bytes: number;
  invitationId?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
    totalPages?: number;
  };
}

export interface AuthSession {
  adminId: string;
  name: string;
  email: string;
  role: string;
}
