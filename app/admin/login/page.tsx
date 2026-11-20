'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Sparkles, Lock, Mail, AlertCircle, ArrowRight, Check } from 'lucide-react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get('from') || '/admin/dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
        throw new Error(data.error || 'Login failed. Please check credentials.');
      }

      router.push(from);
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Login failed');
      setLoading(false);
    }
  };

  return (
    <div className="bg-stone-800/80 backdrop-blur-md rounded-3xl border border-stone-700/80 p-8 shadow-2xl">
      <h2 className="text-xl font-bold text-white mb-2">Sign In to Dashboard</h2>
      <p className="text-xs text-stone-400 mb-6">
        Enter your administrator credentials to manage wedding invitations.
      </p>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-rose-950/50 border border-rose-800/60 text-rose-300 text-xs flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
            Email Address
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@wedding.com"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-stone-900 border border-stone-700 text-white text-sm placeholder-stone-500 focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
            Password
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-stone-900 border border-stone-700 text-white text-sm placeholder-stone-500 focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-sm font-semibold shadow-lg shadow-amber-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
        >
          <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      {/* Quick Demo Credentials */}
      <div className="mt-8 pt-6 border-t border-stone-700/80">
        <div className="flex items-center justify-between text-xs text-stone-400 mb-2">
          <span className="font-semibold text-stone-300">Default Admin Credentials</span>
          <button
            type="button"
            onClick={handleFillDemo}
            className="text-amber-400 hover:text-amber-300 font-semibold cursor-pointer flex items-center gap-1"
          >
            <Check className="w-3 h-3" />
            <span>Auto-Fill</span>
          </button>
        </div>
        <div className="bg-stone-900/90 rounded-xl p-3 border border-stone-700 text-[11px] font-mono text-stone-300 space-y-1">
          <div>
            <span className="text-stone-500">Email:</span> admin@wedding.com
          </div>
          <div>
            <span className="text-stone-500">Password:</span> Admin@123456
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-stone-900 flex items-center justify-center p-4 selection:bg-amber-500 selection:text-stone-900">
      <div className="max-w-md w-full">
        {/* Top Brand Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex p-3 rounded-2xl bg-amber-600 text-white shadow-xl shadow-amber-600/30 mb-3">
            <Sparkles className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-white tracking-tight">VivaahInvites</h1>
          <p className="text-xs uppercase tracking-widest text-amber-500 font-semibold mt-1">
            Wedding Administrator Studio
          </p>
        </div>

        <Suspense
          fallback={
            <div className="bg-stone-800 p-8 rounded-3xl text-center text-stone-400 text-sm">
              Loading admin login...
            </div>
          }
        >
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
