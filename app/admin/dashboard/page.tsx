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
} from 'lucide-react';

export const revalidate = 0; // Dynamic server rendering

export default async function AdminDashboardOverviewPage() {
  const stats = await InvitationService.getDashboardStats();

  const statCards = [
    {
      label: 'Total Invitations',
      value: stats.total,
      icon: Mail,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
    },
    {
      label: 'Published',
      value: stats.published,
      icon: CheckCircle2,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
    },
    {
      label: 'Drafts',
      value: stats.draft,
      icon: Clock,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
    },
    {
      label: 'Archived',
      value: stats.archived,
      icon: Archive,
      color: 'text-stone-600',
      bgColor: 'bg-stone-100',
      borderColor: 'border-stone-200',
    },
  ];

  return (
    <div>
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
                className={`p-6 rounded-2xl bg-white border ${card.borderColor} shadow-sm flex flex-col justify-between`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                    {card.label}
                  </span>
                  <span className={`p-2 rounded-xl ${card.bgColor} ${card.color}`}>
                    <Icon className="w-5 h-5" />
                  </span>
                </div>
                <div className="mt-4">
                  <span className="text-3xl sm:text-4xl font-bold font-serif text-stone-900">
                    {card.value}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Action Banner */}
        <div className="rounded-2xl p-6 bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-serif font-bold">Ready to create a new wedding invitation?</h2>
            <p className="text-xs sm:text-sm text-amber-100 mt-1">
              Follow our 7-step multi-stage builder to set up couple photos, events, maps, and music.
            </p>
          </div>
          <Link
            href="/admin/dashboard/invitations/create"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-amber-800 font-semibold text-xs shadow hover:bg-amber-50 transition-colors whitespace-nowrap self-start sm:self-center"
          >
            <PlusCircle className="w-4 h-4 text-amber-700" />
            <span>Start Invitation Wizard</span>
          </Link>
        </div>

        {/* Recently Created Invitations */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-stone-200 flex items-center justify-between">
            <div>
              <h3 className="font-serif font-bold text-lg text-stone-900">Recently Created Invitations</h3>
              <p className="text-xs text-stone-500 mt-0.5">Most recent wedding invitations across the system</p>
            </div>
            <Link
              href="/admin/dashboard/invitations"
              className="text-xs font-semibold text-amber-600 hover:text-amber-700 flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {stats.recent && stats.recent.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-stone-600">
                <thead className="bg-stone-50 text-[11px] uppercase tracking-wider font-semibold text-stone-500 border-b border-stone-200">
                  <tr>
                    <th className="px-6 py-3.5">Couple</th>
                    <th className="px-6 py-3.5">Slug &amp; URL</th>
                    <th className="px-6 py-3.5">Template</th>
                    <th className="px-6 py-3.5">Wedding Date</th>
                    <th className="px-6 py-3.5">Status</th>
                    <th className="px-6 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  {stats.recent.map((inv) => (
                    <tr key={inv._id?.toString()} className="hover:bg-stone-50/80 transition-colors">
                      <td className="px-6 py-4 font-medium text-stone-900">
                        {inv.groomName} &amp; {inv.brideName}
                      </td>
                      <td className="px-6 py-4 font-mono text-xs text-stone-500">
                        <Link
                          href={`/wedding/${inv.slug}`}
                          target="_blank"
                          className="text-amber-700 hover:underline inline-flex items-center gap-1"
                        >
                          <span>/wedding/{inv.slug}</span>
                          <ExternalLink className="w-3 h-3 text-stone-400" />
                        </Link>
                      </td>
                      <td className="px-6 py-4 capitalize text-xs">
                        <span className="px-2.5 py-1 rounded-full bg-stone-100 font-medium text-stone-700">
                          {inv.templateId || 'royal'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs flex items-center gap-1 text-stone-600 mt-2">
                        <Calendar className="w-3.5 h-3.5 text-stone-400" />
                        <span>{inv.weddingDate}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider ${
                            inv.status === 'published'
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                              : inv.status === 'draft'
                              ? 'bg-amber-100 text-amber-800 border border-amber-200'
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
                            className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100"
                            title="View Invitation Details"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                          <Link
                            href={`/wedding/${inv.slug}?preview=true`}
                            target="_blank"
                            className="p-1.5 rounded-lg text-amber-600 hover:text-amber-800 hover:bg-amber-50"
                            title="Preview Public Invitation"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center text-stone-500">
              <Mail className="w-10 h-10 mx-auto text-stone-300 mb-2" />
              <p className="font-serif font-semibold text-stone-800">No invitations created yet</p>
              <p className="text-xs mt-1">Get started by creating your first wedding invitation</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
