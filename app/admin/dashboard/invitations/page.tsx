'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import AdminHeader from '@/components/admin/AdminHeader';
import { IInvitation, InvitationStatus } from '@/types';
import {
  Search,
  Copy,
  Check,
  ExternalLink,
  Edit,
  Trash2,
  Calendar,
  AlertCircle,
  Eye,
  CheckCircle,
  XCircle,
  PlusCircle,
  Sparkles,
} from 'lucide-react';

export default function InvitationsManagementPage() {
  const [invitations, setInvitations] = useState<IInvitation[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const fetchInvitations = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (statusFilter !== 'all') params.set('status', statusFilter);
      params.set('limit', '50');

      const res = await fetch(`/api/invitations?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        setInvitations(data.data || []);
      }
    } catch (e) {
      console.error('Failed to load invitations:', e);
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchInvitations();
    }, 300);
    return () => clearTimeout(timer);
  }, [fetchInvitations]);

  const handleCopyUrl = (slug: string) => {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const fullUrl = `${origin}/wedding/${slug}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 2000);
  };

  const handleStatusChange = async (id: string, newStatus: InvitationStatus) => {
    setActionLoading(id);
    try {
      const res = await fetch(`/api/invitations/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setInvitations((prev) =>
          prev.map((inv) => (inv._id === id ? { ...inv, status: newStatus } : inv))
        );
      }
    } catch (e) {
      console.error('Failed to update status:', e);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id: string) => {
    setActionLoading(id);
    try {
      const res = await fetch(`/api/invitations/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        setInvitations((prev) => prev.filter((inv) => inv._id !== id));
        setDeleteConfirmId(null);
      }
    } catch (e) {
      console.error('Failed to delete invitation:', e);
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Wedding Invitations"
        subtitle="Create, edit, publish, preview, and share unique wedding invitations."
        actionText="New Invitation"
        actionHref="/admin/dashboard/invitations/create"
      />

      <div className="p-6 sm:p-8 space-y-6 max-w-7xl mx-auto">
        {/* Search and Filters Bar */}
        <div className="bg-white p-4 sm:p-6 rounded-3xl border border-[#EAE4DC] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#777777] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by couple names, venue, or slug..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#EAE4DC] text-sm focus:outline-none focus:border-[#800020] bg-[#FAF8F5]/80 placeholder-[#777777] transition-all"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            {['all', 'published', 'draft', 'archived'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold capitalize transition-all cursor-pointer whitespace-nowrap ${
                  statusFilter === status
                    ? 'bg-[#800020] text-white shadow-xs'
                    : 'bg-[#FAF8F5] text-[#777777] hover:text-[#242424] border border-[#EAE4DC]'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Invitations Table */}
        <div className="bg-white rounded-3xl border border-[#EAE4DC] shadow-xs overflow-hidden">
          {loading ? (
            <div className="p-16 text-center text-[#777777]">
              <div className="animate-spin w-8 h-8 border-2 border-[#800020] border-t-transparent rounded-full mx-auto mb-3"></div>
              <p className="text-sm font-medium">Loading invitations...</p>
            </div>
          ) : invitations.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-[#777777]">
                <thead className="bg-[#FAF8F5] text-[11px] uppercase tracking-wider font-semibold text-[#777777] border-b border-[#EAE4DC]">
                  <tr>
                    <th className="px-6 py-4">Couple</th>
                    <th className="px-6 py-4">URL Slug</th>
                    <th className="px-6 py-4">Template</th>
                    <th className="px-6 py-4">Wedding Date</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAE4DC]">
                  {invitations.map((inv) => (
                    <tr key={inv._id} className="hover:bg-[#FAF8F5]/70 transition-colors">
                      <td className="px-6 py-4 font-serif font-bold text-[#242424] text-base">
                        {inv.groomName} &amp; {inv.brideName}
                        {inv.city && (
                          <span className="block text-xs font-sans font-normal text-[#777777] mt-0.5">
                            {inv.city}, {inv.state}
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5">
                          <code className="text-xs bg-[#FAF8F5] border border-[#EAE4DC] px-2.5 py-1 rounded-lg text-[#242424] font-mono">
                            /wedding/{inv.slug}
                          </code>
                          <button
                            onClick={() => handleCopyUrl(inv.slug)}
                            className="p-1.5 rounded-lg text-[#777777] hover:text-[#800020] hover:bg-[#FAF8F5] cursor-pointer transition-colors"
                            title="Copy Public Invitation URL"
                          >
                            {copiedSlug === inv.slug ? (
                              <Check className="w-4 h-4 text-emerald-600" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#FAF8F5] text-[#242424] border border-[#EAE4DC] capitalize">
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
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Publish/Unpublish toggle */}
                          {inv.status === 'published' ? (
                            <button
                              onClick={() => handleStatusChange(inv._id!, 'draft')}
                              disabled={actionLoading === inv._id}
                              className="px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-[#FAF8F5] hover:bg-stone-100 text-[#777777] border border-[#EAE4DC] cursor-pointer transition-colors"
                              title="Unpublish to Draft"
                            >
                              <XCircle className="w-3.5 h-3.5 inline mr-1 text-[#777777]" />
                              Unpublish
                            </button>
                          ) : (
                            <button
                              onClick={() => handleStatusChange(inv._id!, 'published')}
                              disabled={actionLoading === inv._id}
                              className="px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer shadow-xs transition-colors"
                              title="Publish Invitation"
                            >
                              <CheckCircle className="w-3.5 h-3.5 inline mr-1 text-emerald-200" />
                              Publish
                            </button>
                          )}

                          {/* Preview link */}
                          <Link
                            href={`/wedding/${inv.slug}?preview=true`}
                            target="_blank"
                            className="p-2 rounded-xl text-[#777777] hover:text-[#800020] hover:bg-[#FAF8F5] transition-colors"
                            title="Preview Invitation"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>

                          {/* View details */}
                          <Link
                            href={`/admin/dashboard/invitations/${inv._id}`}
                            className="p-2 rounded-xl text-[#777777] hover:text-[#242424] hover:bg-[#FAF8F5] transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>

                          {/* Edit button */}
                          <Link
                            href={`/admin/dashboard/invitations/${inv._id}/edit`}
                            className="p-2 rounded-xl text-[#777777] hover:text-[#800020] hover:bg-[#FAF8F5] transition-colors"
                            title="Edit Invitation"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>

                          {/* Delete button */}
                          <button
                            onClick={() => setDeleteConfirmId(inv._id!)}
                            className="p-2 rounded-xl text-[#777777] hover:text-rose-600 hover:bg-rose-50 cursor-pointer transition-colors"
                            title="Delete Invitation"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-16 text-center text-[#777777]">
              <AlertCircle className="w-10 h-10 mx-auto text-[#EAE4DC] mb-3" />
              <p className="font-serif font-semibold text-[#242424] text-base">No invitations found</p>
              <p className="text-xs text-[#777777] mt-1">
                {search || statusFilter !== 'all'
                  ? 'Try clearing your search query or status filter.'
                  : 'Start by clicking "New Invitation" to create one.'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl border border-[#EAE4DC] text-center">
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#242424] mb-2">Delete Wedding Invitation?</h3>
            <p className="text-xs text-[#777777] mb-6 leading-relaxed">
              This action cannot be undone. Guests accessing the URL will see a 404 page.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2.5 rounded-xl border border-[#EAE4DC] text-xs font-semibold text-[#242424] hover:bg-[#FAF8F5] cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                disabled={actionLoading === deleteConfirmId}
                className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-xs cursor-pointer disabled:opacity-50"
              >
                {actionLoading === deleteConfirmId ? 'Deleting...' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
