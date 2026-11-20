import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
import { AuthSession } from '@/types';

const AUTH_COOKIE_NAME = 'wedding_admin_token';
const AUTH_SECRET = process.env.AUTH_SECRET || 'wedding_default_fallback_jwt_secret_key_32chars';
const secretKey = new TextEncoder().encode(AUTH_SECRET);

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(password, salt);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function signAuthToken(payload: AuthSession): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secretKey);
}

export async function verifyAuthToken(token: string): Promise<AuthSession | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    return {
      adminId: payload.adminId as string,
      name: payload.name as string,
      email: payload.email as string,
      role: payload.role as string,
    };
  } catch {
    return null;
  }
}

export async function getSession(): Promise<AuthSession | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
    if (!token) return null;
    return await verifyAuthToken(token);
  } catch {
    return null;
  }
}

export async function getSessionFromRequest(request: NextRequest): Promise<AuthSession | null> {
  try {
    const token =
      request.cookies.get(AUTH_COOKIE_NAME)?.value ||
      request.headers.get('authorization')?.replace(/^Bearer\s+/, '');
    if (!token) return null;
    return await verifyAuthToken(token);
  } catch {
    return null;
  }
}

export const AUTH_COOKIE_OPTIONS = {
  name: AUTH_COOKIE_NAME,
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
  maxAge: 60 * 60 * 24 * 7, // 7 days
};
