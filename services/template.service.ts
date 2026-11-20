import { connectToDatabase } from '@/lib/mongodb';
import { Template, TemplateDocument } from '@/models/Template';
import { ITemplate } from '@/types';

export class TemplateService {
  static async getAllTemplates(): Promise<TemplateDocument[]> {
    await connectToDatabase();
    return Template.find({ isActive: true }).sort({ createdAt: 1 }).lean();
  }

  static async getTemplateBySlug(slug: string): Promise<TemplateDocument | null> {
    await connectToDatabase();
    return Template.findOne({ slug: slug.toLowerCase(), isActive: true }).lean();
  }

  static async seedDefaultTemplates(): Promise<void> {
    await connectToDatabase();
    const defaultTemplates: Partial<ITemplate>[] = [
      {
        name: 'Royal Indian Wedding',
        slug: 'royal',
        description:
          'Majestic traditional Indian aesthetic with maroon, gold, floral motifs, shloks, royal mandap vibes, and ceremonial grandeur.',
        previewImage:
          'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
        category: 'traditional',
        isActive: true,
      },
      {
        name: 'Floral Elegant Wedding',
        slug: 'floral',
        description:
          'Soft, romantic floral design with pastel accents, blossoming petals, delicate serif typography, and graceful charm.',
        previewImage:
          'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80',
        category: 'floral',
        isActive: true,
      },
      {
        name: 'Modern Minimal Wedding',
        slug: 'modern',
        description:
          'Contemporary chic design with clean lines, elegant monochrome and gold highlights, spacious layouts, and stylish typography.',
        previewImage:
          'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
        category: 'modern',
        isActive: true,
      },
    ];

    for (const t of defaultTemplates) {
      await Template.findOneAndUpdate({ slug: t.slug }, { $set: t }, { upsert: true, new: true });
    }
  }
}
