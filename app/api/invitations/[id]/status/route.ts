import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromRequest } from '@/lib/auth';
import { InvitationService } from '@/services/invitation.service';
import { updateStatusSchema } from '@/lib/validations/invitation';
import mongoose from 'mongoose';

export async function PATCH(
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
    const parsed = updateStatusSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.issues[0]?.message || 'Invalid status' },
        { status: 400 }
      );
    }

    const updated = await InvitationService.updateInvitationStatus(id, parsed.data.status);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Invitation not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: `Invitation status updated to ${parsed.data.status}`,
      data: updated,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error updating status';
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}
