import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { AUTH_COOKIE_OPTIONS } from '@/lib/auth';

export async function POST() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(AUTH_COOKIE_OPTIONS.name);

    return NextResponse.json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Logout failed';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
