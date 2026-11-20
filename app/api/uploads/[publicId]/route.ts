import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromRequest } from '@/lib/auth';
import { MediaService } from '@/services/media.service';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ publicId: string }> }
) {
  try {
    const session = await getSessionFromRequest(request);
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { publicId } = await params;
    if (!publicId) {
      return NextResponse.json({ success: false, error: 'Public ID is required' }, { status: 400 });
    }

    const deleted = await MediaService.deleteMedia(decodeURIComponent(publicId));

    return NextResponse.json({
      success: true,
      message: deleted ? 'Media deleted successfully' : 'Media record not found or already deleted',
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to delete media';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
