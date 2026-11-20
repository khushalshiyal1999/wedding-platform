'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  Sparkles,
  Lock,
  Mail,
  AlertCircle,
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  Heart,
  ShieldCheck,
} from 'lucide-react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get('from') || '/admin/dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFillDemo = () => {
    setEmail('admin@wedding.com');
    setPassword('Admin@123456');
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Invalid credentials. Please verify email and password.');
      }

      router.push(from);
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Login failed');
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-[#EAE4DC] shadow-xl p-8 sm:p-12 relative overflow-hidden">
      {/* Subtle top gold accent line */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#800020] via-[#D4AF37] to-[#800020]"></div>

      {/* Brand Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2.5 mb-3">
          <span className="p-2.5 rounded-2xl bg-[#800020] text-white shadow-md shadow-[#800020]/20 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-[#D4AF37]" />
          </span>
          <div>
            <span className="font-serif font-bold text-xl tracking-tight text-[#242424]">
              Vivaah<span className="text-[#800020]">Invites</span>
            </span>
            <span className="block text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold">
              Admin Studio
            </span>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#242424] mt-4">
          Welcome Back
        </h1>
        <p className="text-xs sm:text-sm text-[#777777] mt-1.5 font-sans">
          Manage your wedding invitations beautifully.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5 animate-in fade-in">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-rose-600" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#242424] mb-2">
            Email Address
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-[#777777] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@wedding.com"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#EAE4DC] text-[#242424] text-sm placeholder-[#777777] focus:outline-none focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/10 transition-all"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#242424]">
              Password
            </label>
          </div>
          <div className="relative">
            <Lock className="w-4 h-4 text-[#777777] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full pl-10 pr-11 py-3 rounded-xl bg-[#FAF8F5] border border-[#EAE4DC] text-[#242424] text-sm placeholder-[#777777] focus:outline-none focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/10 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#777777] hover:text-[#242424] cursor-pointer"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs pt-1">
          <label className="flex items-center gap-2 cursor-pointer text-[#777777] select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded border-[#EAE4DC] text-[#800020] focus:ring-[#800020]/20"
            />
            <span>Remember for 7 days</span>
          </label>
          <span className="text-[11px] text-[#777777] flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Encrypted Session</span>
          </span>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 rounded-xl bg-[#800020] hover:bg-[#580016] text-white text-sm font-semibold shadow-lg shadow-[#800020]/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
        >
          <span>{loading ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
          <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
        </button>
      </form>

      {/* Elegant Informational Helper */}
      <div className="mt-8 pt-6 border-t border-[#EAE4DC] flex items-center justify-between bg-[#FAF8F5] -mx-8 -mb-8 p-6 sm:-mx-12 sm:-mb-12">
        <div className="text-[11px] text-[#777777]">
          <span className="font-semibold text-[#242424] block">Default Administrator:</span>
          <span>admin@wedding.com</span>
        </div>
        <button
          type="button"
          onClick={handleFillDemo}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#EAE4DC] text-[#800020] hover:bg-[#800020] hover:text-white text-xs font-semibold transition-all cursor-pointer shadow-xs"
        >
          <Check className="w-3.5 h-3.5" />
          <span>Auto-Fill</span>
        </button>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center p-4 sm:p-8 relative overflow-hidden">
      {/* Decorative Traditional Indian Mandala / Floral Accents */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-gradient-to-br from-[#D4AF37]/15 to-transparent blur-2xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-gradient-to-tr from-[#800020]/10 to-transparent blur-2xl pointer-events-none"></div>

      <div className="max-w-4xl w-full grid md:grid-cols-2 rounded-3xl overflow-hidden shadow-2xl border border-[#EAE4DC] bg-white">
        {/* Left Side: Brand Story & Luxury Showcase */}
        <div className="hidden md:flex flex-col justify-between p-10 bg-gradient-to-br from-[#800020] via-[#5C0017] to-[#400010] text-white relative overflow-hidden">
          {/* Subtle Decorative Backdrop Pattern */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:16px_16px]"></div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/20 text-[#D4AF37] text-xs font-medium mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Wedding Technology Platform</span>
            </div>
            <h2 className="text-3xl font-serif font-bold leading-tight">
              Craft Timeless Digital Wedding Celebrations
            </h2>
            <p className="text-stone-300 text-xs sm:text-sm mt-3 leading-relaxed">
              Create, manage, and publish high-end wedding invitations with dedicated slugs, live countdowns, music, photo galleries, and guest RSVP.
            </p>
          </div>

          <div className="relative z-10 my-8">
            <div className="rounded-2xl p-4 bg-white/10 backdrop-blur border border-white/15 text-xs text-stone-200 space-y-2">
              <p className="font-serif italic text-stone-100">
                &ldquo;Every invitation tells a unique story. VivaahInvites makes traditional weddings feel modern and seamless.&rdquo;
              </p>
              <div className="flex items-center gap-2 text-[11px] text-[#D4AF37] font-semibold pt-1">
                <span>Featured: Aarav &amp; Priya</span>
                <span>•</span>
                <Link href="/wedding/aarav-weds-priya" target="_blank" className="hover:underline flex items-center gap-1">
                  <span>Live Preview</span>
                  <span>↗</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="relative z-10 text-[11px] text-stone-400 flex items-center justify-between border-t border-white/10 pt-4">
            <span>© 2027 VivaahInvites Platform</span>
            <span className="flex items-center gap-1 text-[#D4AF37]">
              <Heart className="w-3 h-3 fill-[#D4AF37]" />
              <span>Royal Indian Weddings</span>
            </span>
          </div>
        </div>

        {/* Right Side: Authentication Card */}
        <div className="p-4 sm:p-6 flex items-center justify-center bg-white">
          <div className="w-full">
            <Suspense
              fallback={
                <div className="p-12 text-center text-[#777777] text-xs">
                  Loading administrator authentication...
                </div>
              }
            >
              <LoginForm />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
