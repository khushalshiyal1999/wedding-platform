import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromRequest } from '@/lib/auth';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { MediaService } from '@/services/media.service';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const session = await getSessionFromRequest(request);
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Admin authentication required' },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const folder = (formData.get('folder') as string) || 'wedding_invitations';
    const invitationId = (formData.get('invitationId') as string) || undefined;

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file provided in form data' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const isCloudinaryConfigured =
      process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET &&
      process.env.CLOUDINARY_CLOUD_NAME !== 'demo_cloud';

    let mediaData: {
      url: string;
      publicId: string;
      format: string;
      resourceType: 'image' | 'video' | 'raw';
      bytes: number;
    };

    if (isCloudinaryConfigured) {
      const isAudio = file.type.startsWith('audio/') || file.name.endsWith('.mp3');
      const resourceType = isAudio ? 'auto' : 'image';
      const result = await uploadToCloudinary(buffer, folder, resourceType);

      mediaData = {
        url: result.secureUrl,
        publicId: result.publicId,
        format: result.format,
        resourceType: (result.resourceType as 'image' | 'video' | 'raw') || 'image',
        bytes: result.bytes,
      };
    } else {
      // Local development fallback to public/uploads
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      await fs.mkdir(uploadDir, { recursive: true });

      const extension = path.extname(file.name) || (file.type.includes('image') ? '.jpg' : '.mp3');
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const filename = `media-${uniqueSuffix}${extension}`;
      const filePath = path.join(uploadDir, filename);

      await fs.writeFile(filePath, buffer);

      mediaData = {
        url: `/uploads/${filename}`,
        publicId: `local-${uniqueSuffix}`,
        format: extension.replace('.', ''),
        resourceType: file.type.startsWith('audio/') ? 'raw' : 'image',
        bytes: buffer.length,
      };
    }

    // Save media metadata to MongoDB
    const savedMedia = await MediaService.saveMedia({
      ...mediaData,
      invitationId,
    });

    return NextResponse.json({
      success: true,
      message: 'Media uploaded successfully',
      data: savedMedia,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Media upload failed';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
