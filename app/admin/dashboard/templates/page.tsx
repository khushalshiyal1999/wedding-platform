import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AdminHeader from '@/components/admin/AdminHeader';
import { TemplateService } from '@/services/template.service';
import { Palette, CheckCircle, ArrowRight } from 'lucide-react';

export const revalidate = 0;

export default async function AdminTemplatesPage() {
  let templates = await TemplateService.getAllTemplates();
  if (!templates || templates.length === 0) {
    await TemplateService.seedDefaultTemplates();
    templates = await TemplateService.getAllTemplates();
  }

  return (
    <div>
      <AdminHeader
        title="Reusable Invitation Templates"
        subtitle="Manage available template designs. All wedding invitations can dynamically render any template."
        actionText="Create Invitation"
        actionHref="/admin/dashboard/invitations/create"
      />

      <div className="p-6 sm:p-8 space-y-8 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6">
          {templates.map((tmpl) => (
            <div
              key={tmpl._id?.toString()}
              className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all"
            >
              <div>
                <div className="relative h-48 w-full bg-stone-100">
                  <Image
                    src={tmpl.previewImage}
                    alt={tmpl.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur text-[10px] uppercase font-bold tracking-wider text-amber-800 shadow">
                    {tmpl.category}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-serif font-bold text-lg text-stone-900 mb-2">{tmpl.name}</h3>
                  <p className="text-xs text-stone-600 leading-relaxed mb-4">{tmpl.description}</p>
                  <div className="flex items-center gap-2 text-xs text-stone-500 font-mono">
                    <span className="text-stone-400">Slug:</span>
                    <span className="bg-stone-100 px-2 py-0.5 rounded font-semibold text-stone-700">
                      {tmpl.slug}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-stone-100 mt-4 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs text-emerald-600 font-semibold">
                  <CheckCircle className="w-4 h-4" />
                  <span>Active</span>
                </span>

                <Link
                  href={`/wedding/aarav-weds-priya`}
                  target="_blank"
                  className="text-xs font-semibold text-amber-600 hover:text-amber-700 flex items-center gap-1"
                >
                  <span>Preview</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
