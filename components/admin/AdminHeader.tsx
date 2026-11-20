'use client';

import React from 'react';
import Link from 'next/link';
import { PlusCircle, ExternalLink, Shield } from 'lucide-react';

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
  actionText?: string;
  actionHref?: string;
}

export default function AdminHeader({
  title,
  subtitle,
  actionText,
  actionHref,
}: AdminHeaderProps) {
  return (
    <header className="bg-white border-b border-[#EAE4DC] px-6 sm:px-8 py-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#242424] tracking-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xs sm:text-sm text-[#777777] mt-1 font-sans">
              {subtitle}
            </p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/wedding/aarav-weds-priya"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#EAE4DC] bg-[#FAF8F5] text-xs font-semibold text-[#242424] hover:bg-white hover:border-[#D4AF37] transition-all shadow-2xs"
          >
            <span>Live Demo</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#D4AF37]" />
          </Link>

          {actionText && actionHref && (
            <Link
              href={actionHref}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#800020] hover:bg-[#580016] text-white text-xs font-semibold shadow-md shadow-[#800020]/20 transition-all hover:scale-102"
            >
              <PlusCircle className="w-4 h-4 text-[#D4AF37]" />
              <span>{actionText}</span>
            </Link>
          )}

          {/* Admin Profile Pill */}
          <div className="hidden lg:flex items-center gap-2.5 pl-3 border-l border-[#EAE4DC]">
            <div className="w-8 h-8 rounded-full bg-[#800020] text-[#D4AF37] font-serif font-bold text-xs flex items-center justify-center border border-[#D4AF37]/50 shadow-xs">
              WA
            </div>
            <div className="text-[11px]">
              <span className="font-semibold text-[#242424] block leading-tight">Admin Studio</span>
              <span className="text-[#777777] text-[10px]">Super Admin</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
