import { connectToDatabase } from '@/lib/mongodb';
import { Invitation } from '@/models/Invitation';
import { IInvitation, InvitationStatus } from '@/types';
import mongoose from 'mongoose';

export interface InvitationQueryFilters {
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
}

export class InvitationService {
  static async getAllInvitations(filters: InvitationQueryFilters = {}) {
    await connectToDatabase();
    const { search, status, page = 1, limit = 10 } = filters;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: any = {};

    if (status && status !== 'all') {
      query.status = status;
    }

    if (search && search.trim()) {
      const regex = new RegExp(search.trim(), 'i');
      query.$or = [
        { groomName: regex },
        { brideName: regex },
        { slug: regex },
        { venueName: regex },
        { city: regex },
      ];
    }

    const skip = (page - 1) * limit;

    const [invitations, total] = await Promise.all([
      Invitation.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Invitation.countDocuments(query),
    ]);

    return {
      invitations: invitations as unknown as IInvitation[],
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  static async getInvitationById(id: string): Promise<IInvitation | null> {
    await connectToDatabase();
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    const found = await Invitation.findById(id).lean();
    return found ? (found as unknown as IInvitation) : null;
  }

  static async getInvitationBySlug(slug: string, requirePublished: boolean = false): Promise<IInvitation | null> {
    await connectToDatabase();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: any = { slug: slug.toLowerCase() };
    if (requirePublished) {
      query.status = 'published';
    }
    const found = await Invitation.findOne(query).lean();
    return found ? (found as unknown as IInvitation) : null;
  }

  static async checkSlugAvailability(slug: string, excludeId?: string): Promise<boolean> {
    await connectToDatabase();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: any = { slug: slug.toLowerCase() };
    if (excludeId && mongoose.Types.ObjectId.isValid(excludeId)) {
      query._id = { $ne: new mongoose.Types.ObjectId(excludeId) };
    }
    const count = await Invitation.countDocuments(query);
    return count === 0;
  }

  static async createInvitation(data: Partial<IInvitation>): Promise<IInvitation> {
    await connectToDatabase();
    const slugAvailable = await this.checkSlugAvailability(data.slug || '');
    if (!slugAvailable) {
      throw new Error(`The slug "${data.slug}" is already taken. Please choose another.`);
    }

    const invitation = new Invitation({
      ...data,
      slug: data.slug?.toLowerCase().trim(),
      publishedAt: data.status === 'published' ? new Date() : null,
    });

    const saved = await invitation.save();
    return saved.toObject() as unknown as IInvitation;
  }

  static async updateInvitation(id: string, data: Partial<IInvitation>): Promise<IInvitation | null> {
    await connectToDatabase();
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('Invalid invitation ID');
    }

    if (data.slug) {
      const slugAvailable = await this.checkSlugAvailability(data.slug, id);
      if (!slugAvailable) {
        throw new Error(`The slug "${data.slug}" is already in use by another invitation.`);
      }
      data.slug = data.slug.toLowerCase().trim();
    }

    const existing = await Invitation.findById(id);
    if (!existing) {
      return null;
    }

    if (data.status === 'published' && existing.status !== 'published') {
      data.publishedAt = new Date();
    }

    const updated = await Invitation.findByIdAndUpdate(
      id,
      { $set: data },
      { returnDocument: 'after', runValidators: true }
    ).lean();

    return updated ? (updated as unknown as IInvitation) : null;
  }

  static async updateInvitationStatus(id: string, status: InvitationStatus): Promise<IInvitation | null> {
    await connectToDatabase();
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('Invalid invitation ID');
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updatePayload: any = { status };
    if (status === 'published') {
      updatePayload.publishedAt = new Date();
    }

    const updated = await Invitation.findByIdAndUpdate(
      id,
      { $set: updatePayload },
      { returnDocument: 'after' }
    ).lean();
    return updated ? (updated as unknown as IInvitation) : null;
  }

  static async deleteInvitation(id: string): Promise<boolean> {
    await connectToDatabase();
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('Invalid invitation ID');
    }
    const res = await Invitation.findByIdAndDelete(id);
    return !!res;
  }

  static async getDashboardStats() {
    await connectToDatabase();
    const [total, published, draft, archived, recent] = await Promise.all([
      Invitation.countDocuments(),
      Invitation.countDocuments({ status: 'published' }),
      Invitation.countDocuments({ status: 'draft' }),
      Invitation.countDocuments({ status: 'archived' }),
      Invitation.find().sort({ createdAt: -1 }).limit(5).lean(),
    ]);

    return {
      total,
      published,
      draft,
      archived,
      recent: recent as unknown as IInvitation[],
    };
  }
}
