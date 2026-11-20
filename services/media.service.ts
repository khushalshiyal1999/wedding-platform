import { connectToDatabase } from '@/lib/mongodb';
import { Media, MediaDocument } from '@/models/Media';
import { IMedia } from '@/types';
import { deleteFromCloudinary } from '@/lib/cloudinary';

export class MediaService {
  static async saveMedia(data: Partial<IMedia>): Promise<MediaDocument> {
    await connectToDatabase();
    const media = new Media(data);
    return await media.save();
  }

  static async deleteMedia(publicId: string): Promise<boolean> {
    await connectToDatabase();
    const media = await Media.findOne({ publicId });
    if (media) {
      try {
        await deleteFromCloudinary(publicId, media.resourceType as 'image' | 'video' | 'raw');
      } catch (err) {
        console.warn('Cloudinary remote delete skipped or failed:', err);
      }
      await Media.deleteOne({ publicId });
      return true;
    }
    return false;
  }
}
