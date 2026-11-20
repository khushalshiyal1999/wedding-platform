import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromRequest } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const session = await getSessionFromRequest(request);

    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Session invalid or expired' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      data: session,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to retrieve session';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
