'use client';

import React from 'react';
import Link from 'next/link';
import { PlusCircle, ExternalLink } from 'lucide-react';

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
    <header className="bg-white border-b border-stone-200 px-6 sm:px-8 py-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-stone-900 tracking-tight">{title}</h1>
          {subtitle && <p className="text-xs sm:text-sm text-stone-500 mt-1">{subtitle}</p>}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/wedding/aarav-weds-priya"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-stone-200 text-xs font-semibold text-stone-700 hover:bg-stone-50 transition-colors"
          >
            <span>Live Preview</span>
            <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
          </Link>

          {actionText && actionHref && (
            <Link
              href={actionHref}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold shadow transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{actionText}</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
