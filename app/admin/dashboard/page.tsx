import React from 'react';
import Link from 'next/link';
import AdminHeader from '@/components/admin/AdminHeader';
import { InvitationService } from '@/services/invitation.service';
import {
  Mail,
  CheckCircle2,
  Clock,
  Archive,
  ArrowRight,
  ExternalLink,
  PlusCircle,
  Eye,
  Calendar,
  Sparkles,
} from 'lucide-react';

export const revalidate = 0;

export default async function AdminDashboardOverviewPage() {
  const stats = await InvitationService.getDashboardStats();

  const statCards = [
    {
      label: 'Total Invitations',
      value: stats.total,
      icon: Mail,
      accentColor: 'text-[#800020]',
      bgColor: 'bg-[#800020]/10',
      badge: 'All Couples',
    },
    {
      label: 'Published Live',
      value: stats.published,
      icon: CheckCircle2,
      accentColor: 'text-emerald-700',
      bgColor: 'bg-emerald-50',
      badge: 'Public Accessible',
    },
    {
      label: 'Draft Invitations',
      value: stats.draft,
      icon: Clock,
      accentColor: 'text-amber-700',
      bgColor: 'bg-amber-50',
      badge: 'In Progress',
    },
    {
      label: 'Archived',
      value: stats.archived,
      icon: Archive,
      accentColor: 'text-stone-700',
      bgColor: 'bg-stone-100',
      badge: 'Completed',
    },
  ];

  return (
    <div className="space-y-8">
      <AdminHeader
        title="Dashboard Overview"
        subtitle="Manage all active wedding invitations, templates, and couples."
        actionText="Create Invitation"
        actionHref="/admin/dashboard/invitations/create"
      />

      <div className="p-6 sm:p-8 space-y-8 max-w-7xl mx-auto">
        {/* Metric Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {statCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.label}
                className="p-6 rounded-3xl bg-white border border-[#EAE4DC] shadow-xs flex flex-col justify-between hover:border-[#D4AF37] hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#777777]">
                    {card.label}
                  </span>
                  <span className={`p-2.5 rounded-2xl ${card.bgColor} ${card.accentColor}`}>
                    <Icon className="w-5 h-5" />
                  </span>
                </div>
                <div className="mt-5">
                  <span className="text-3xl sm:text-4xl font-serif font-bold text-[#242424] block leading-none">
                    {card.value}
                  </span>
                  <span className="text-[11px] text-[#777777] font-medium mt-2 block">
                    {card.badge}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Action Invitation Creation Banner */}
        <div className="rounded-3xl p-8 bg-gradient-to-r from-[#800020] via-[#5C0017] to-[#800020] text-white shadow-xl shadow-[#800020]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-6 border border-[#D4AF37]/30 relative overflow-hidden">
          <div className="relative z-10 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur border border-white/20 text-[#D4AF37] text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Multi-Step Invitation Studio</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold leading-tight">
              Create Your Next Beautiful Invitation
            </h2>
            <p className="text-xs sm:text-sm text-stone-200 mt-2 leading-relaxed">
              Design and publish a memorable wedding invitation in minutes. Configure couple profiles, event schedules, Google Maps, music, and select from 3 reusable royal templates.
            </p>
          </div>

          <div className="relative z-10 flex items-center gap-3 self-start sm:self-center">
            <Link
              href="/admin/dashboard/invitations/create"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white hover:bg-[#FAF8F5] text-[#800020] font-semibold text-xs shadow-lg transition-all hover:scale-105 whitespace-nowrap"
            >
              <PlusCircle className="w-4 h-4 text-[#D4AF37]" />
              <span>Create Invitation</span>
            </Link>
          </div>
        </div>

        {/* Recent Invitations Table */}
        <div className="bg-white rounded-3xl border border-[#EAE4DC] shadow-xs overflow-hidden">
          <div className="p-6 border-b border-[#EAE4DC] flex items-center justify-between">
            <div>
              <h3 className="font-serif font-bold text-lg text-[#242424]">
                Recently Created Invitations
              </h3>
              <p className="text-xs text-[#777777] mt-0.5">
                Most recent wedding invitations across the system
              </p>
            </div>
            <Link
              href="/admin/dashboard/invitations"
              className="text-xs font-semibold text-[#800020] hover:text-[#580016] flex items-center gap-1 transition-colors"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {stats.recent && stats.recent.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-[#777777]">
                <thead className="bg-[#FAF8F5] text-[11px] uppercase tracking-wider font-semibold text-[#777777] border-b border-[#EAE4DC]">
                  <tr>
                    <th className="px-6 py-4">Couple</th>
                    <th className="px-6 py-4">Invitation URL</th>
                    <th className="px-6 py-4">Template</th>
                    <th className="px-6 py-4">Wedding Date</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAE4DC]">
                  {stats.recent.map((inv) => (
                    <tr key={inv._id?.toString()} className="hover:bg-[#FAF8F5]/80 transition-colors">
                      <td className="px-6 py-4 font-serif font-bold text-[#242424] text-base">
                        {inv.groomName} &amp; {inv.brideName}
                        {inv.city && (
                          <span className="block text-xs font-sans font-normal text-[#777777] mt-0.5">
                            {inv.city}, {inv.state}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 font-mono text-xs">
                        <Link
                          href={`/wedding/${inv.slug}`}
                          target="_blank"
                          className="text-[#800020] hover:underline inline-flex items-center gap-1.5"
                        >
                          <span>/wedding/{inv.slug}</span>
                          <ExternalLink className="w-3 h-3 text-[#D4AF37]" />
                        </Link>
                      </td>
                      <td className="px-6 py-4 capitalize text-xs">
                        <span className="px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#EAE4DC] font-medium text-[#242424]">
                          {inv.templateId || 'royal'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs">
                        <div className="flex items-center gap-1.5 text-[#242424]">
                          <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                          <span>{inv.weddingDate}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider ${
                            inv.status === 'published'
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                              : inv.status === 'draft'
                              ? 'bg-amber-50 text-amber-800 border border-amber-200'
                              : 'bg-stone-100 text-stone-800 border border-stone-200'
                          }`}
                        >
                          {inv.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/admin/dashboard/invitations/${inv._id}`}
                            className="p-2 rounded-xl text-[#777777] hover:text-[#242424] hover:bg-[#FAF8F5] transition-colors"
                            title="View Invitation Details"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                          <Link
                            href={`/wedding/${inv.slug}?preview=true`}
                            target="_blank"
                            className="p-2 rounded-xl text-[#800020] hover:bg-[#800020]/10 transition-colors"
                            title="Preview Public Invitation"
                          >
                            <ExternalLink className="w-4 h-4 text-[#800020]" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-16 text-center text-[#777777]">
              <Mail className="w-10 h-10 mx-auto text-[#EAE4DC] mb-3" />
              <p className="font-serif font-semibold text-[#242424] text-base">No invitations created yet</p>
              <p className="text-xs text-[#777777] mt-1">Get started by creating your first wedding invitation</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
