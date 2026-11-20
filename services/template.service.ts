import { connectToDatabase } from '@/lib/mongodb';
import { Template, TemplateDocument } from '@/models/Template';
import { ITemplate } from '@/types';

export const ALL_TEMPLATES: Partial<ITemplate>[] = [
  {
    name: 'Royal Indian Wedding',
    slug: 'royal',
    description:
      'Majestic traditional Indian aesthetic with maroon, gold, floral motifs, shloks, royal mandap vibes, and ceremonial grandeur.',
    previewImage:
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
    category: 'royal',
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
  {
    name: 'Royal Palace',
    slug: 'royal-palace',
    description:
      'Imperial palatial grandeur with deep maroon, antique gold filigree, Jharokha arches, and courtly farman styling.',
    previewImage:
      'https://images.unsplash.com/photo-1599818496464-9fc21976a445?auto=format&fit=crop&w=1200&q=80',
    category: 'royal',
    isActive: true,
  },
  {
    name: 'Pastel Garden',
    slug: 'pastel-garden',
    description:
      'Whimsical romantic garden aesthetic with blush pink, sage green, botanical wreaths, and soft watercolor blooms.',
    previewImage:
      'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80',
    category: 'floral',
    isActive: true,
  },
  {
    name: 'Traditional Gujarati',
    slug: 'gujarati',
    description:
      'Authentic Gujarati wedding patrika with auspicious red & saffron gold, Toran border, Kalash motifs, and Garba festivity.',
    previewImage:
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80',
    category: 'traditional',
    isActive: true,
  },
  {
    name: 'Minimal Luxury',
    slug: 'minimal-luxury',
    description:
      'High-fashion editorial elegance featuring spacious ivory whitespace, obsidian typography, and hairline gold rules.',
    previewImage:
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    category: 'minimal',
    isActive: true,
  },
  {
    name: 'Peacock Elegance',
    slug: 'peacock',
    description:
      'Opulent jewel tones with royal peacock navy, iridescent turquoise, emerald accents, and Mor-Pankh feather motifs.',
    previewImage:
      'https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=1200&q=80',
    category: 'royal',
    isActive: true,
  },
  {
    name: 'Bohemian Sunset',
    slug: 'bohemian',
    description:
      'Warm terracotta, desert sand, sunburst accents, organic rounded arches, and relaxed golden-hour romance.',
    previewImage:
      'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1200&q=80',
    category: 'bohemian',
    isActive: true,
  },
  {
    name: 'Mughal Heritage',
    slug: 'mughal',
    description:
      'Imperial emerald and sandstone courtly aesthetics with Persian Mehrab arches, jali tracery, and Shahi Farman grandeur.',
    previewImage:
      'https://images.unsplash.com/photo-1566552881560-0be86c53210f?auto=format&fit=crop&w=1200&q=80',
    category: 'heritage',
    isActive: true,
  },
  {
    name: 'Cinematic Love Story',
    slug: 'cinematic',
    description:
      'Dramatic widescreen movie premiere aesthetic with velvet dark backgrounds, cinema gold, film reels, and VIP ticket passes.',
    previewImage:
      'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1200&q=80',
    category: 'cinematic',
    isActive: true,
  },
];

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
    for (const t of ALL_TEMPLATES) {
      await Template.findOneAndUpdate({ slug: t.slug }, { $set: t }, { upsert: true, new: true });
    }
  }
}
