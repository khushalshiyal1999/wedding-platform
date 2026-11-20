import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromRequest } from '@/lib/auth';
import { InvitationService } from '@/services/invitation.service';
import { invitationSchema } from '@/lib/validations/invitation';
import mongoose from 'mongoose';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSessionFromRequest(request);
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: 'Invalid invitation ID' }, { status: 400 });
    }

    const invitation = await InvitationService.getInvitationById(id);
    if (!invitation) {
      return NextResponse.json({ success: false, error: 'Invitation not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: invitation });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error retrieving invitation';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSessionFromRequest(request);
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: 'Invalid invitation ID' }, { status: 400 });
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

    const updated = await InvitationService.updateInvitation(id, parsed.data);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Invitation not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Invitation updated successfully',
      data: updated,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error updating invitation';
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSessionFromRequest(request);
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: 'Invalid invitation ID' }, { status: 400 });
    }

    const deleted = await InvitationService.deleteInvitation(id);
    if (!deleted) {
      return NextResponse.json({ success: false, error: 'Invitation not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Invitation deleted successfully',
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error deleting invitation';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
