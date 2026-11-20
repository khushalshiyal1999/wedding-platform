import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AdminHeader from '@/components/admin/AdminHeader';
import { TemplateService } from '@/services/template.service';
import { Palette, CheckCircle, ArrowRight, Sparkles, ExternalLink } from 'lucide-react';

export const revalidate = 0;

export default async function AdminTemplatesPage() {
  let templates = await TemplateService.getAllTemplates();
  if (!templates || templates.length === 0) {
    await TemplateService.seedDefaultTemplates();
    templates = await TemplateService.getAllTemplates();
  }

  const paletteMap: Record<string, string[]> = {
    royal: ['#800020', '#D4AF37', '#FFFDF9', '#242424'],
    floral: ['#9C4153', '#6B8E23', '#FDFBF7', '#4A7C59'],
    modern: ['#0F172A', '#B45309', '#F8FAFC', '#475569'],
  };

  return (
    <div className="space-y-8">
      <AdminHeader
        title="Reusable Wedding Templates"
        subtitle="Manage available template designs. All wedding invitations can dynamically render any template."
        actionText="Create Invitation"
        actionHref="/admin/dashboard/invitations/create"
      />

      <div className="p-6 sm:p-8 space-y-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {templates.map((tmpl) => {
            const swatches = paletteMap[tmpl.slug] || ['#800020', '#D4AF37', '#FAF8F5'];

            return (
              <div
                key={tmpl._id?.toString()}
                className="bg-white rounded-3xl border border-[#EAE4DC] shadow-xs overflow-hidden flex flex-col justify-between hover:border-[#D4AF37] hover:shadow-xl transition-all group"
              >
                <div>
                  <div className="relative h-56 w-full bg-stone-100 overflow-hidden">
                    <Image
                      src={tmpl.previewImage}
                      alt={tmpl.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3.5 right-3.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur text-[10px] uppercase font-bold tracking-wider text-[#800020] shadow-xs">
                      {tmpl.category}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-serif font-bold text-xl text-[#242424] mb-2">{tmpl.name}</h3>
                    <p className="text-xs text-[#777777] leading-relaxed mb-4">{tmpl.description}</p>

                    {/* Color Swatches */}
                    <div className="pt-2 border-t border-[#EAE4DC]">
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-[#777777] block mb-2">
                        Template Palette
                      </span>
                      <div className="flex items-center gap-2">
                        {swatches.map((color, i) => (
                          <div
                            key={i}
                            className="w-6 h-6 rounded-full border border-black/10 shadow-2xs"
                            style={{ backgroundColor: color }}
                            title={color}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-[#EAE4DC]/60 mt-4 flex items-center justify-between gap-2">
                  <Link
                    href={`/wedding/aarav-weds-priya`}
                    target="_blank"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#777777] hover:text-[#242424] transition-colors"
                  >
                    <span>Preview Live</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#D4AF37]" />
                  </Link>

                  <Link
                    href="/admin/dashboard/invitations/create"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#800020] hover:bg-[#580016] text-white text-xs font-semibold shadow-xs transition-all hover:scale-102"
                  >
                    <span>Use Template</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
