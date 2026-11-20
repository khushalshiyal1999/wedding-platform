import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromRequest } from '@/lib/auth';
import { InvitationService } from '@/services/invitation.service';
import { invitationSchema } from '@/lib/validations/invitation';

export async function GET(request: NextRequest) {
  try {
    const session = await getSessionFromRequest(request);
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Admin authentication required' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || undefined;
    const status = searchParams.get('status') || undefined;
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);

    const result = await InvitationService.getAllInvitations({ search, status, page, limit });

    return NextResponse.json({
      success: true,
      data: result.invitations,
      meta: result.meta,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to fetch invitations';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSessionFromRequest(request);
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Admin authentication required' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const parsed = invitationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join(', '),
        },
        { status: 400 }
      );
    }

    const newInvitation = await InvitationService.createInvitation(parsed.data);

    return NextResponse.json(
      {
        success: true,
        message: 'Wedding invitation created successfully',
        data: newInvitation,
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to create invitation';
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}
