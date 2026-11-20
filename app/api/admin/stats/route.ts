import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromRequest } from '@/lib/auth';
import { InvitationService } from '@/services/invitation.service';

export async function GET(request: NextRequest) {
  try {
    const session = await getSessionFromRequest(request);
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Admin authentication required' },
        { status: 401 }
      );
    }

    const stats = await InvitationService.getDashboardStats();
    return NextResponse.json({
      success: true,
      data: stats,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to fetch dashboard stats';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
