'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Mail,
  PlusCircle,
  Palette,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Sparkles,
} from 'lucide-react';

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const navItems = [
    { label: 'Overview', href: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Invitations', href: '/admin/dashboard/invitations', icon: Mail },
    { label: 'Create New', href: '/admin/dashboard/invitations/create', icon: PlusCircle },
    { label: 'Templates', href: '/admin/dashboard/templates', icon: Palette },
    { label: 'Settings', href: '/admin/dashboard/settings', icon: Settings },
  ];

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (e) {
      console.error('Logout error:', e);
      setLoggingOut(false);
    }
  };

  const navContent = (
    <div className="flex flex-col h-full justify-between">
      <div>
        <div className="p-6 flex items-center justify-between border-b border-stone-800">
          <Link href="/admin/dashboard" className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-amber-600 text-white shadow">
              <Sparkles className="w-5 h-5" />
            </span>
            <div className="flex flex-col">
              <span className="text-lg font-serif font-bold text-white tracking-tight">VivaahInvites</span>
              <span className="text-[10px] uppercase tracking-widest text-amber-500 font-semibold">Admin Studio</span>
            </div>
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation"
            className="md:hidden text-stone-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-4 space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === '/admin/dashboard'
                ? pathname === '/admin/dashboard'
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
                    : 'text-stone-400 hover:text-white hover:bg-stone-800/60'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-stone-800 space-y-2">
        <Link
          href="/wedding/aarav-weds-priya"
          target="_blank"
          className="flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-medium text-stone-400 hover:text-white hover:bg-stone-800/40 transition-colors"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5 text-amber-500" />
            <span>Public Demo</span>
          </span>
          <span className="px-1.5 py-0.5 rounded text-[10px] bg-stone-800 text-amber-400 font-mono">Live</span>
        </Link>

        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>{loggingOut ? 'Signing out...' : 'Sign Out'}</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Top Header Toggle */}
      <div className="md:hidden sticky top-0 z-40 bg-stone-900 border-b border-stone-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-amber-600 text-white">
            <Sparkles className="w-4 h-4" />
          </span>
          <span className="font-serif font-bold text-white text-base">VivaahInvites</span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
          className="p-2 rounded-lg bg-stone-800 text-stone-300"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden">
          <div className="fixed inset-y-0 left-0 w-72 bg-stone-900 shadow-2xl">
            {navContent}
          </div>
        </div>
      )}

      {/* Desktop Persistent Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-stone-900 border-r border-stone-800 fixed inset-y-0 left-0 z-30">
        {navContent}
      </aside>
    </>
  );
}
