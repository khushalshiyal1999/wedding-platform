import { NextRequest, NextResponse } from 'next/server';
import { InvitationService } from '@/services/invitation.service';
import { getSessionFromRequest } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    if (!slug) {
      return NextResponse.json({ success: false, error: 'Slug is required' }, { status: 400 });
    }

    const session = await getSessionFromRequest(request);
    const { searchParams } = new URL(request.url);
    const isPreview = searchParams.get('preview') === 'true';

    // If admin is previewing, allow viewing draft; otherwise only allow published
    const requirePublished = !(session && isPreview);

    const invitation = await InvitationService.getInvitationBySlug(slug, requirePublished);

    if (!invitation) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invitation not found or has not been published yet.',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: invitation,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error loading public invitation';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
