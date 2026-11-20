import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Admin } from '@/models/Admin';
import { verifyPassword, signAuthToken, AUTH_COOKIE_OPTIONS } from '@/lib/auth';
import { loginSchema } from '@/lib/validations/auth';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: parsed.error.issues[0]?.message || 'Invalid input credentials',
        },
        { status: 400 }
      );
    }

    const { email, password } = parsed.data;

    await connectToDatabase();
    const admin = await Admin.findOne({ email }).select('+passwordHash');

    if (!admin || !admin.passwordHash) {
      return NextResponse.json(
        { success: false, error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const isMatch = await verifyPassword(password, admin.passwordHash);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const token = await signAuthToken({
      adminId: admin._id.toString(),
      name: admin.name,
      email: admin.email,
      role: admin.role,
    });

    const cookieStore = await cookies();
    cookieStore.set(AUTH_COOKIE_OPTIONS.name, token, AUTH_COOKIE_OPTIONS);

    return NextResponse.json({
      success: true,
      message: 'Logged in successfully',
      data: {
        adminId: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Server error occurred during login';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
