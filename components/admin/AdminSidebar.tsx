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
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const navItems = [
    { label: 'Overview', href: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Invitations', href: '/admin/dashboard/invitations', icon: Mail },
    { label: 'Create Invitation', href: '/admin/dashboard/invitations/create', icon: PlusCircle },
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
    <div className="flex flex-col h-full justify-between bg-white border-r border-[#EAE4DC] select-none">
      <div>
        {/* Brand Area */}
        <div className="p-5 flex items-center justify-between border-b border-[#EAE4DC]">
          <Link href="/admin/dashboard" className="flex items-center gap-3">
            <span className="p-2.5 rounded-xl bg-[#800020] text-white shadow-md shadow-[#800020]/20 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-[#D4AF37]" />
            </span>
            {!collapsed && (
              <div className="flex flex-col">
                <span className="text-lg font-serif font-bold text-[#242424] tracking-tight leading-none">
                  Vivaah<span className="text-[#800020]">Invites</span>
                </span>
                <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold mt-1">
                  Admin Studio
                </span>
              </div>
            )}
          </Link>

          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation"
            className="md:hidden text-[#777777] hover:text-[#242424] p-1.5"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="p-3 space-y-1.5 mt-2">
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
                className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-semibold transition-all relative ${
                  isActive
                    ? 'bg-[#800020] text-white shadow-md shadow-[#800020]/25 font-bold'
                    : 'text-[#777777] hover:text-[#242424] hover:bg-[#FAF8F5]'
                }`}
                title={collapsed ? item.label : undefined}
              >
                <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-[#D4AF37]' : 'text-[#777777]'}`} />
                {!collapsed && <span>{item.label}</span>}
                {isActive && !collapsed && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Footer Section */}
      <div className="p-3 border-t border-[#EAE4DC] space-y-2">
        <Link
          href="/wedding/aarav-weds-priya"
          target="_blank"
          className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium text-[#777777] hover:text-[#242424] hover:bg-[#FAF8F5] transition-colors"
          title={collapsed ? 'Public Demo' : undefined}
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5 text-[#D4AF37]" />
            {!collapsed && <span>Public Demo</span>}
          </span>
          {!collapsed && (
            <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#FAF8F5] border border-[#EAE4DC] text-[#800020] font-semibold">
              Live
            </span>
          )}
        </Link>

        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-rose-700 hover:bg-rose-50 transition-colors cursor-pointer disabled:opacity-50"
          title={collapsed ? 'Sign Out' : undefined}
        >
          <LogOut className="w-4 h-4 text-rose-600 flex-shrink-0" />
          {!collapsed && <span>{loggingOut ? 'Signing out...' : 'Sign Out'}</span>}
        </button>

        {/* Desktop Collapse Toggle */}
        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className="hidden md:flex items-center justify-center w-full py-1.5 text-[#777777] hover:text-[#242424] text-[11px] transition-colors border-t border-[#EAE4DC]/60 pt-2"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Top Header Toggle */}
      <div className="md:hidden sticky top-0 z-40 bg-white border-b border-[#EAE4DC] px-4 py-3 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2.5">
          <span className="p-1.5 rounded-xl bg-[#800020] text-white">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          </span>
          <span className="font-serif font-bold text-[#242424] text-base">VivaahInvites</span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
          className="p-2 rounded-xl border border-[#EAE4DC] text-[#242424] hover:bg-[#FAF8F5]"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs md:hidden">
          <div className="fixed inset-y-0 left-0 w-72 bg-white shadow-2xl">
            {navContent}
          </div>
        </div>
      )}

      {/* Desktop Persistent Sidebar */}
      <aside
        className={`hidden md:flex flex-col bg-white border-r border-[#EAE4DC] fixed inset-y-0 left-0 z-30 transition-all duration-300 ${
          collapsed ? 'w-20' : 'w-64'
        }`}
      >
        {navContent}
      </aside>
    </>
  );
}
