'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ITemplate } from '@/types';
import { Search, ArrowRight, ExternalLink, Sparkles, Filter } from 'lucide-react';

interface Props {
  templates: ITemplate[];
}

const PALETTE_MAP: Record<string, string[]> = {
  royal: ['#800020', '#D4AF37', '#FFFDF9', '#242424'],
  floral: ['#9C4153', '#6B8E23', '#FDFBF7', '#4A7C59'],
  modern: ['#0F172A', '#B45309', '#F8FAFC', '#475569'],
  'royal-palace': ['#660018', '#C5A059', '#FAF7F2', '#2D2319'],
  'pastel-garden': ['#9E5A63', '#607D67', '#FCF9F5', '#F7CAD0'],
  gujarati: ['#990000', '#D48B1C', '#FFFDF8', '#E63946'],
  'minimal-luxury': ['#141414', '#C5A059', '#FAF8F5', '#777777'],
  peacock: ['#0B2545', '#00A896', '#D4AF37', '#081726'],
  bohemian: ['#C86D51', '#DDA15E', '#FAF3EB', '#4A3B32'],
  mughal: ['#12372A', '#C89D42', '#FAF8F2', '#2B1E16'],
  cinematic: ['#0D0D12', '#F5C518', '#E50914', '#FFFFFF'],
};

const CATEGORIES = [
  { id: 'all', label: 'All Templates' },
  { id: 'royal', label: 'Royal & Palatial' },
  { id: 'traditional', label: 'Traditional' },
  { id: 'floral', label: 'Floral & Botanical' },
  { id: 'minimal', label: 'Minimal Luxury' },
  { id: 'modern', label: 'Modern Chic' },
  { id: 'heritage', label: 'Heritage Mughal' },
  { id: 'bohemian', label: 'Bohemian' },
  { id: 'cinematic', label: 'Cinematic' },
];

export default function TemplateCatalogueClient({ templates }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredTemplates = useMemo(() => {
    return templates.filter((tmpl) => {
      const matchesCategory =
        selectedCategory === 'all' || tmpl.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesSearch =
        tmpl.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tmpl.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tmpl.slug.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [templates, selectedCategory, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Search & Filter Controls */}
      <div className="bg-white rounded-3xl p-6 border border-[#EAE4DC] shadow-xs space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#777777] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search templates by style, theme or name..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#EAE4DC] text-xs bg-[#FAF8F5]/50 focus:bg-white focus:outline-none focus:border-[#800020] transition-colors text-[#242424]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#777777] hover:text-[#242424]"
              >
                ✕
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs text-[#777777]">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>Showing <strong className="text-[#242424]">{filteredTemplates.length}</strong> of {templates.length} Designs</span>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
          <Filter className="w-3.5 h-3.5 text-[#777777] flex-shrink-0 mr-1" />
          {CATEGORIES.map((cat) => {
            const count =
              cat.id === 'all'
                ? templates.length
                : templates.filter((t) => t.category.toLowerCase() === cat.id.toLowerCase()).length;

            const isActive = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-[#800020] text-white shadow-xs font-semibold'
                    : 'bg-[#FAF8F5] text-[#777777] hover:text-[#242424] hover:bg-stone-200/60 border border-[#EAE4DC]'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-white/20 text-white' : 'bg-[#EAE4DC] text-[#777777]'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Templates Grid */}
      {filteredTemplates.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-[#EAE4DC] shadow-xs">
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#FAF8F5] flex items-center justify-center text-[#777777]">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="font-serif font-bold text-lg text-[#242424]">No matching templates found</h3>
          <p className="text-xs text-[#777777] mt-1 max-w-sm mx-auto">
            Try adjusting your search keywords or select a different category filter above.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-[#FAF8F5] border border-[#EAE4DC] text-xs font-semibold text-[#800020] hover:bg-stone-100"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.map((tmpl) => {
            const swatches = PALETTE_MAP[tmpl.slug] || ['#800020', '#D4AF37', '#FAF8F5'];

            return (
              <div
                key={tmpl._id?.toString() || tmpl.slug}
                className="bg-white rounded-3xl border border-[#EAE4DC] shadow-xs overflow-hidden flex flex-col justify-between hover:border-[#D4AF37] hover:shadow-xl transition-all group"
              >
                <div>
                  <div className="relative h-60 w-full bg-stone-100 overflow-hidden">
                    <Image
                      src={tmpl.previewImage}
                      alt={tmpl.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute top-3.5 right-3.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur text-[10px] uppercase font-bold tracking-wider text-[#800020] shadow-xs border border-[#EAE4DC]">
                      {tmpl.category}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-serif font-bold text-xl text-[#242424] group-hover:text-[#800020] transition-colors">
                        {tmpl.name}
                      </h3>
                      <span className="text-[10px] font-mono text-[#777777] uppercase">
                        {tmpl.slug}
                      </span>
                    </div>

                    <p className="text-xs text-[#777777] leading-relaxed mb-4 line-clamp-2">
                      {tmpl.description}
                    </p>

                    {/* Color Swatches */}
                    <div className="pt-3 border-t border-[#EAE4DC]">
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-[#777777] block mb-2">
                        Template Color Palette
                      </span>
                      <div className="flex items-center gap-2">
                        {swatches.map((color, i) => (
                          <div
                            key={i}
                            className="w-6 h-6 rounded-full border border-black/10 shadow-2xs transition-transform hover:scale-115 cursor-help"
                            style={{ backgroundColor: color }}
                            title={color}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-[#EAE4DC]/60 mt-4 flex items-center justify-between gap-3">
                  <Link
                    href={`/wedding/aarav-weds-priya?template=${tmpl.slug}`}
                    target="_blank"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#777777] hover:text-[#242424] transition-colors"
                  >
                    <span>Preview Live</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#D4AF37]" />
                  </Link>

                  <Link
                    href={`/admin/dashboard/invitations/create?template=${tmpl.slug}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#800020] hover:bg-[#580016] text-white text-xs font-semibold shadow-xs transition-all hover:scale-102"
                  >
                    <span>Use Template</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
