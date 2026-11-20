'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { IInvitation } from '@/types';
import Countdown from '@/components/wedding/Countdown';
import MusicPlayer from '@/components/wedding/MusicPlayer';
import GalleryLightbox from '@/components/wedding/GalleryLightbox';
import WelcomeScreen from '@/components/wedding/WelcomeScreen';
import {
  MapPin,
  Calendar,
  Clock,
  Heart,
  Navigation,
  MessageCircle,
  Phone,
  Sparkles,
} from 'lucide-react';

interface TemplateProps {
  invitation: IInvitation;
}

export default function ModernTemplate({ invitation }: TemplateProps) {
  const [showWelcome, setShowWelcome] = useState(true);

  const primary = invitation.primaryColor || '#0F172A'; // Deep Slate
  const secondary = invitation.secondaryColor || '#B45309'; // Warm Bronze
  const bg = invitation.backgroundColor || '#F8FAFC'; // Minimal cool light

  const formattedWeddingDate = new Date(invitation.weddingDate).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div
      className="min-h-screen text-slate-900 font-sans selection:bg-slate-200 selection:text-slate-900 relative overflow-x-hidden"
      style={{ backgroundColor: bg }}
    >
      {/* Welcome Screen */}
      {showWelcome && (
        <WelcomeScreen
          groomName={invitation.groomName}
          brideName={invitation.brideName}
          weddingDate={invitation.weddingDate}
          onEnter={() => setShowWelcome(false)}
          primaryColor={primary}
          accentColor={secondary}
        />
      )}

      {/* Floating Music Player */}
      <MusicPlayer
        musicUrl={invitation.musicUrl}
        musicTitle={invitation.musicTitle || 'Modern Wedding Acoustic'}
        autoPlay={!showWelcome}
      />

      {/* Top Header */}
      <header className="pt-12 pb-4 text-center px-4">
        <p className="text-[11px] uppercase tracking-[0.35em] text-slate-500 font-bold">
          The Wedding Celebration
        </p>
      </header>

      {/* Hero Section */}
      <section className="px-4 py-8 max-w-4xl mx-auto text-center">
        <div className="rounded-3xl p-6 sm:p-12 bg-white border border-slate-200 shadow-md">
          <h1
            className="text-4xl sm:text-6xl md:text-7xl font-sans font-extrabold tracking-tight mb-4"
            style={{ color: primary }}
          >
            {invitation.groomName}
            <span className="text-amber-600 mx-3 font-serif font-light">&amp;</span>
            {invitation.brideName}
          </h1>

          <p className="max-w-xl mx-auto text-slate-600 text-sm sm:text-base leading-relaxed mb-8">
            {invitation.description ||
              'We invite you to share in our special day as we exchange promises and begin a new chapter together.'}
          </p>

          {/* Correctly Sized Couple Image */}
          {(invitation.groomImage || (invitation.gallery && invitation.gallery[0]?.imageUrl)) && (
            <div className="my-8 max-w-md mx-auto">
              <div className="relative aspect-[4/5] w-full max-h-[460px] rounded-3xl overflow-hidden border border-slate-300 shadow-xl mx-auto">
                <Image
                  src={
                    (invitation.gallery && invitation.gallery[0]?.imageUrl) ||
                    invitation.groomImage ||
                    ''
                  }
                  alt={`${invitation.groomName} & ${invitation.brideName}`}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )}

          <div className="inline-flex flex-wrap items-center justify-center gap-4 py-3 px-8 rounded-full bg-slate-50 border border-slate-200 text-xs sm:text-sm font-medium text-slate-700">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-amber-600" />
              {formattedWeddingDate}
            </span>
            <span>|</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-600" />
              {invitation.weddingTime || '18:00'}
            </span>
            <span>|</span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-amber-600" />
              {invitation.city}, {invitation.country}
            </span>
          </div>
        </div>
      </section>

      {/* Countdown */}
      <section className="py-10 px-4">
        <div className="max-w-xl mx-auto text-center">
          <p className="text-xs uppercase tracking-widest text-slate-500 font-semibold mb-3">
            Counting Down
          </p>
          <Countdown
            targetDate={invitation.weddingDate}
            targetTime={invitation.weddingTime}
            textColor={primary}
            accentColor={secondary}
          />
        </div>
      </section>

      {/* Couple Section */}
      <section className="py-16 px-4 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Groom */}
          <div className="rounded-3xl p-8 bg-white border border-slate-200 shadow-sm flex flex-col items-center text-center">
            {invitation.groomImage ? (
              <div className="relative w-40 h-40 rounded-2xl overflow-hidden mb-4 shadow">
                <Image src={invitation.groomImage} alt={invitation.groomName} fill className="object-cover" />
              </div>
            ) : (
              <div
                className="w-40 h-40 rounded-2xl flex items-center justify-center font-bold text-3xl text-white mb-4"
                style={{ backgroundColor: primary }}
              >
                {invitation.groomName.charAt(0)}
              </div>
            )}
            <span className="text-[11px] uppercase tracking-wider text-amber-700 font-bold">Groom</span>
            <h3 className="text-2xl font-bold mt-1 mb-2" style={{ color: primary }}>
              {invitation.groomName}
            </h3>
            {invitation.groomParents && (
              <p className="text-xs text-slate-500 mb-3">{invitation.groomParents}</p>
            )}
            {invitation.groomDescription && (
              <p className="text-sm text-slate-600 leading-relaxed mt-auto">{invitation.groomDescription}</p>
            )}
          </div>

          {/* Bride */}
          <div className="rounded-3xl p-8 bg-white border border-slate-200 shadow-sm flex flex-col items-center text-center">
            {invitation.brideImage ? (
              <div className="relative w-40 h-40 rounded-2xl overflow-hidden mb-4 shadow">
                <Image src={invitation.brideImage} alt={invitation.brideName} fill className="object-cover" />
              </div>
            ) : (
              <div
                className="w-40 h-40 rounded-2xl flex items-center justify-center font-bold text-3xl text-white mb-4"
                style={{ backgroundColor: primary }}
              >
                {invitation.brideName.charAt(0)}
              </div>
            )}
            <span className="text-[11px] uppercase tracking-wider text-amber-700 font-bold">Bride</span>
            <h3 className="text-2xl font-bold mt-1 mb-2" style={{ color: primary }}>
              {invitation.brideName}
            </h3>
            {invitation.brideParents && (
              <p className="text-xs text-slate-500 mb-3">{invitation.brideParents}</p>
            )}
            {invitation.brideDescription && (
              <p className="text-sm text-slate-600 leading-relaxed mt-auto">{invitation.brideDescription}</p>
            )}
          </div>
        </div>
      </section>

      {/* Events */}
      {invitation.events && invitation.events.length > 0 && (
        <section className="py-16 px-4 max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tight" style={{ color: primary }}>
              Schedule of Events
            </h2>
            <div className="w-12 h-0.5 bg-amber-500 mx-auto mt-2"></div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {invitation.events.map((evt, idx) => (
              <div
                key={evt._id || idx}
                className="rounded-3xl p-6 bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  {evt.eventImage && (
                    <div className="relative w-full h-40 rounded-2xl overflow-hidden mb-4">
                      <Image src={evt.eventImage} alt={evt.eventName} fill className="object-cover" />
                    </div>
                  )}
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
                    <span className="px-3 py-1 rounded-full bg-slate-100">{evt.eventDate}</span>
                    <span>{evt.eventTime}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: primary }}>
                    {evt.eventName}
                  </h3>
                  {evt.eventDescription && (
                    <p className="text-sm text-slate-600 leading-relaxed mb-4">{evt.eventDescription}</p>
                  )}
                </div>

                <p className="text-xs text-slate-600 flex items-center gap-1.5 pt-3 border-t border-slate-100">
                  <MapPin className="w-3.5 h-3.5 text-amber-600" />
                  <span>{evt.eventVenue}</span>
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Venue */}
      <section className="py-16 px-4 max-w-3xl mx-auto text-center">
        <div className="rounded-3xl p-8 sm:p-12 bg-white border border-slate-200 shadow-md">
          <h2 className="text-3xl font-bold mb-2" style={{ color: primary }}>
            {invitation.venueName}
          </h2>
          <p className="text-slate-600 text-sm mb-1">{invitation.venueAddress}</p>
          <p className="text-slate-500 text-sm mb-6">
            {invitation.city}, {invitation.state}, {invitation.country}
          </p>

          {invitation.googleMapsUrl && (
            <a
              href={invitation.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white text-xs uppercase tracking-wider font-semibold shadow hover:opacity-90 transition-opacity"
              style={{ backgroundColor: primary }}
            >
              <Navigation className="w-4 h-4" />
              <span>Get Directions</span>
            </a>
          )}
        </div>
      </section>

      {/* Gallery */}
      {invitation.gallery && invitation.gallery.length > 0 && (
        <section className="py-16 px-4 max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold" style={{ color: primary }}>
              Memories &amp; Moments
            </h2>
            <div className="w-12 h-0.5 bg-amber-500 mx-auto mt-2"></div>
          </div>
          <GalleryLightbox gallery={invitation.gallery} />
        </section>
      )}

      {/* Footer */}
      <footer className="py-16 px-4 text-center border-t border-slate-200 bg-white">
        <Sparkles className="w-6 h-6 text-amber-500 mx-auto mb-2" />
        <h3 className="text-xl font-bold mb-3" style={{ color: primary }}>
          Thank You
        </h3>
        <p className="text-sm text-slate-500 mb-6">We look forward to celebrating with you.</p>

        <div className="flex flex-wrap justify-center gap-3">
          {invitation.whatsappNumber && (
            <a
              href={`https://wa.me/${invitation.whatsappNumber.replace(/[^0-9]/g, '')}?text=Congratulations!`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
          )}
          {invitation.contactNumber && (
            <a
              href={`tel:${invitation.contactNumber}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold"
            >
              <Phone className="w-4 h-4" />
              <span>{invitation.contactNumber}</span>
            </a>
          )}
        </div>

        <p className="mt-8 text-xs text-slate-400">
          Wedding of {invitation.groomName} &amp; {invitation.brideName}
        </p>
      </footer>
    </div>
  );
}
