import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import AdminHeader from '@/components/admin/AdminHeader';
import { InvitationService } from '@/services/invitation.service';
import {
  ExternalLink,
  Edit,
  Calendar,
  Clock,
  MapPin,
  Heart,
  Music,
  CheckCircle,
} from 'lucide-react';

export const revalidate = 0;

export default async function InvitationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const invitation = await InvitationService.getInvitationById(id);

  if (!invitation) {
    notFound();
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const publicUrl = `${appUrl}/wedding/${invitation.slug}`;

  return (
    <div>
      <AdminHeader
        title={`${invitation.groomName} & ${invitation.brideName}`}
        subtitle={`Slug: /wedding/${invitation.slug}`}
      />

      <div className="p-6 sm:p-8 space-y-6 max-w-5xl mx-auto">
        {/* Top Control Bar */}
        <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                  invitation.status === 'published'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {invitation.status}
              </span>
              <span className="text-xs text-stone-500 font-mono">Template: {invitation.templateId}</span>
            </div>
            <p className="text-xs text-stone-500 mt-2 font-mono">
              Public Link: <a href={publicUrl} target="_blank" className="text-amber-700 hover:underline">{publicUrl}</a>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={`/admin/dashboard/invitations/${id}/edit`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition-colors"
            >
              <Edit className="w-3.5 h-3.5" />
              <span>Edit Details</span>
            </Link>

            <Link
              href={`/wedding/${invitation.slug}?preview=true`}
              target="_blank"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 text-white text-xs font-semibold hover:bg-amber-700 transition-colors shadow-sm"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Preview Live</span>
            </Link>
          </div>
        </div>

        {/* Overview Details Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Couple Details */}
          <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-stone-900 font-serif font-bold text-lg">
              <Heart className="w-5 h-5 text-rose-500" />
              <span>The Couple</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 rounded-xl bg-stone-50">
                {invitation.groomImage ? (
                  <div className="relative w-20 h-20 mx-auto rounded-full overflow-hidden mb-2">
                    <Image src={invitation.groomImage} alt="Groom" fill className="object-cover" />
                  </div>
                ) : null}
                <p className="font-serif font-bold text-sm text-stone-900">{invitation.groomName}</p>
                <p className="text-[11px] text-stone-500 mt-1">{invitation.groomParents || 'Groom'}</p>
              </div>

              <div className="text-center p-4 rounded-xl bg-stone-50">
                {invitation.brideImage ? (
                  <div className="relative w-20 h-20 mx-auto rounded-full overflow-hidden mb-2">
                    <Image src={invitation.brideImage} alt="Bride" fill className="object-cover" />
                  </div>
                ) : null}
                <p className="font-serif font-bold text-sm text-stone-900">{invitation.brideName}</p>
                <p className="text-[11px] text-stone-500 mt-1">{invitation.brideParents || 'Bride'}</p>
              </div>
            </div>
          </div>

          {/* Venue & Timing */}
          <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-stone-900 font-serif font-bold text-lg">
              <MapPin className="w-5 h-5 text-amber-600" />
              <span>Venue &amp; Schedule</span>
            </div>

            <div className="space-y-2 text-xs text-stone-600">
              <p className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-stone-400" />
                <span className="font-medium">{invitation.weddingDate}</span>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-stone-400" />
                <span>{invitation.weddingTime || '18:00'} ({invitation.timezone || 'Asia/Kolkata'})</span>
              </p>
              <p className="flex items-start gap-2 pt-2 border-t border-stone-100">
                <MapPin className="w-4 h-4 text-stone-400 mt-0.5" />
                <span>
                  <strong>{invitation.venueName}</strong>
                  <br />
                  {invitation.venueAddress}, {invitation.city}, {invitation.state}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Events Schedule */}
        <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-4">
          <h3 className="font-serif font-bold text-lg text-stone-900">
            Scheduled Ceremonies ({invitation.events?.length || 0})
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {invitation.events?.map((evt, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-stone-200 bg-stone-50/50">
                <div className="flex items-center justify-between text-xs text-amber-700 font-semibold mb-1">
                  <span>{evt.eventDate}</span>
                  <span>{evt.eventTime}</span>
                </div>
                <h4 className="font-bold text-stone-900 text-sm mb-1">{evt.eventName}</h4>
                <p className="text-xs text-stone-500 mb-2">{evt.eventVenue}</p>
                {evt.eventDescription && (
                  <p className="text-xs text-stone-600 italic">{evt.eventDescription}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
