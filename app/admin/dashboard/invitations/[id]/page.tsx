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
  Copy,
  Sparkles,
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
    <div className="space-y-6">
      <AdminHeader
        title={`${invitation.groomName} & ${invitation.brideName}`}
        subtitle={`Public URL: /wedding/${invitation.slug}`}
      />

      <div className="p-6 sm:p-8 space-y-6 max-w-5xl mx-auto">
        {/* Top Control Bar */}
        <div className="p-6 rounded-3xl bg-white border border-[#EAE4DC] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                  invitation.status === 'published'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-amber-50 text-amber-800 border border-amber-200'
                }`}
              >
                {invitation.status}
              </span>
              <span className="text-xs text-[#777777] font-mono">
                Template: <strong className="text-[#242424]">{invitation.templateId}</strong>
              </span>
            </div>
            <p className="text-xs text-[#777777] mt-2 font-mono">
              Direct Link:{' '}
              <a href={publicUrl} target="_blank" className="text-[#800020] hover:underline">
                {publicUrl}
              </a>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={`/admin/dashboard/invitations/${id}/edit`}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-[#EAE4DC] text-[#242424] text-xs font-semibold hover:border-[#800020] transition-colors shadow-2xs"
            >
              <Edit className="w-3.5 h-3.5" />
              <span>Edit Details</span>
            </Link>

            <Link
              href={`/wedding/${invitation.slug}?preview=true`}
              target="_blank"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#800020] hover:bg-[#580016] text-white text-xs font-semibold transition-all shadow-md shadow-[#800020]/20"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Preview Live</span>
            </Link>
          </div>
        </div>

        {/* Overview Details Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Couple Details */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#EAE4DC] shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-[#242424] font-serif font-bold text-lg">
              <Heart className="w-5 h-5 text-[#800020]" />
              <span>The Happy Couple</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE4DC]">
                {invitation.groomImage ? (
                  <div className="relative w-20 h-20 mx-auto rounded-full overflow-hidden mb-2 border-2 border-[#D4AF37]">
                    <Image src={invitation.groomImage} alt="Groom" fill className="object-cover" />
                  </div>
                ) : null}
                <p className="font-serif font-bold text-sm text-[#242424]">{invitation.groomName}</p>
                <p className="text-[11px] text-[#777777] mt-1">{invitation.groomParents || 'Groom'}</p>
              </div>

              <div className="text-center p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE4DC]">
                {invitation.brideImage ? (
                  <div className="relative w-20 h-20 mx-auto rounded-full overflow-hidden mb-2 border-2 border-[#D4AF37]">
                    <Image src={invitation.brideImage} alt="Bride" fill className="object-cover" />
                  </div>
                ) : null}
                <p className="font-serif font-bold text-sm text-[#242424]">{invitation.brideName}</p>
                <p className="text-[11px] text-[#777777] mt-1">{invitation.brideParents || 'Bride'}</p>
              </div>
            </div>

            {invitation.description && (
              <p className="text-xs text-[#777777] italic leading-relaxed pt-2 border-t border-[#EAE4DC]">
                &ldquo;{invitation.description}&rdquo;
              </p>
            )}
          </div>

          {/* Venue & Timing */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#EAE4DC] shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-[#242424] font-serif font-bold text-lg">
              <MapPin className="w-5 h-5 text-[#D4AF37]" />
              <span>Venue &amp; Timing</span>
            </div>

            <div className="space-y-3 text-xs text-[#777777]">
              <p className="flex items-center gap-2 text-[#242424]">
                <Calendar className="w-4 h-4 text-[#800020]" />
                <span className="font-semibold">{invitation.weddingDate}</span>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#800020]" />
                <span>
                  {invitation.weddingTime || '18:00'} ({invitation.timezone || 'Asia/Kolkata'})
                </span>
              </p>
              <div className="pt-3 border-t border-[#EAE4DC] flex items-start gap-2 text-[#242424]">
                <MapPin className="w-4 h-4 text-[#800020] mt-0.5 flex-shrink-0" />
                <span>
                  <strong className="block text-sm">{invitation.venueName}</strong>
                  <span className="text-[#777777] text-xs">
                    {invitation.venueAddress}, {invitation.city}, {invitation.state}, {invitation.country}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Events Schedule */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#EAE4DC] shadow-xs space-y-4">
          <h3 className="font-serif font-bold text-lg text-[#242424]">
            Ceremony Schedule ({invitation.events?.length || 0})
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {invitation.events?.map((evt, idx) => (
              <div key={idx} className="p-4 rounded-2xl border border-[#EAE4DC] bg-[#FAF8F5]/60">
                <div className="flex items-center justify-between text-xs text-[#800020] font-semibold mb-1">
                  <span>{evt.eventDate}</span>
                  <span>{evt.eventTime}</span>
                </div>
                <h4 className="font-bold text-[#242424] text-sm mb-1">{evt.eventName}</h4>
                <p className="text-xs text-[#777777] mb-2">{evt.eventVenue}</p>
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
