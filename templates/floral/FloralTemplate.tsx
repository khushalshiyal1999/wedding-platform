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
  Flower2,
  Navigation,
  MessageCircle,
  Phone,
} from 'lucide-react';

interface TemplateProps {
  invitation: IInvitation;
}

export default function FloralTemplate({ invitation }: TemplateProps) {
  const [showWelcome, setShowWelcome] = useState(true);

  const primary = invitation.primaryColor || '#9C4153'; // Soft Rose Burgundy
  const secondary = invitation.secondaryColor || '#6B8E23'; // Olive/Sage Green
  const bg = invitation.backgroundColor || '#FDFBF7'; // Soft Floral Cream

  const formattedWeddingDate = new Date(invitation.weddingDate).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div
      className="min-h-screen text-stone-800 font-sans selection:bg-rose-100 selection:text-rose-900 relative overflow-x-hidden"
      style={{ backgroundColor: bg }}
    >
      {/* Welcome Reveal Screen */}
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
        musicTitle={invitation.musicTitle || 'Romantic Wedding Melody'}
        autoPlay={!showWelcome}
      />

      {/* Floral Header Motif */}
      <header className="pt-12 pb-4 text-center px-4">
        <div className="flex items-center justify-center gap-2 text-rose-400 mb-2">
          <Flower2 className="w-5 h-5 animate-pulse" />
          <span className="text-xs uppercase tracking-[0.3em] font-medium text-stone-500">
            A Celebration of Love
          </span>
          <Flower2 className="w-5 h-5 animate-pulse" />
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 py-8 max-w-4xl mx-auto text-center">
        <div className="relative rounded-3xl p-8 sm:p-14 bg-white/70 border border-rose-200/60 shadow-xl backdrop-blur-sm">
          <p className="text-sm font-serif italic text-stone-600 mb-2">
            Two souls, one heart, a lifetime of love.
          </p>

          <h1
            className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold tracking-tight my-4"
            style={{ color: primary }}
          >
            {invitation.groomName}
            <span className="block sm:inline sm:mx-3 text-2xl sm:text-4xl font-light italic text-rose-400">
              &amp;
            </span>
            {invitation.brideName}
          </h1>

          <p className="max-w-xl mx-auto text-stone-600 text-sm sm:text-base leading-relaxed mb-6 font-serif">
            {invitation.description ||
              'We warmly invite you to join hands and celebrate with us as we exchange our vows and begin our forever.'}
          </p>

          <div className="inline-flex flex-wrap items-center justify-center gap-4 py-2.5 px-6 rounded-full bg-rose-50/70 border border-rose-200 text-xs sm:text-sm text-stone-700">
            <span className="flex items-center gap-1.5 font-medium">
              <Calendar className="w-4 h-4 text-rose-600" />
              {formattedWeddingDate}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 font-medium">
              <Clock className="w-4 h-4 text-rose-600" />
              {invitation.weddingTime || '18:00'}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 font-medium">
              <MapPin className="w-4 h-4 text-rose-600" />
              {invitation.city}
            </span>
          </div>
        </div>
      </section>

      {/* Countdown */}
      <section className="py-10 px-4">
        <div className="max-w-xl mx-auto text-center">
          <p className="text-xs uppercase tracking-widest text-rose-700 font-semibold mb-3">
            Counting the Days Until Forever
          </p>
          <Countdown
            targetDate={invitation.weddingDate}
            targetTime={invitation.weddingTime}
            textColor={primary}
            accentColor={secondary}
          />
        </div>
      </section>

      {/* Couple Profiles */}
      <section className="py-16 px-4 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold" style={{ color: primary }}>
            The Happy Couple
          </h2>
          <div className="w-16 h-0.5 bg-rose-300 mx-auto mt-2"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {/* Groom */}
          <div className="rounded-3xl p-6 sm:p-8 bg-white/70 border border-rose-100 shadow-lg text-center flex flex-col items-center">
            {invitation.groomImage ? (
              <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-rose-200 shadow mb-4">
                <Image src={invitation.groomImage} alt={invitation.groomName} fill className="object-cover" />
              </div>
            ) : (
              <div
                className="w-40 h-40 rounded-full flex items-center justify-center font-serif text-3xl font-bold text-white mb-4 shadow"
                style={{ backgroundColor: primary }}
              >
                {invitation.groomName.charAt(0)}
              </div>
            )}
            <p className="text-xs uppercase tracking-wider text-rose-600 font-semibold">Groom</p>
            <h3 className="text-2xl font-serif font-bold mb-1" style={{ color: primary }}>
              {invitation.groomName}
            </h3>
            {invitation.groomParents && (
              <p className="text-xs font-serif italic text-stone-600 mb-3">{invitation.groomParents}</p>
            )}
            {invitation.groomDescription && (
              <p className="text-sm text-stone-600 leading-relaxed mt-auto">{invitation.groomDescription}</p>
            )}
          </div>

          {/* Bride */}
          <div className="rounded-3xl p-6 sm:p-8 bg-white/70 border border-rose-100 shadow-lg text-center flex flex-col items-center">
            {invitation.brideImage ? (
              <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-rose-200 shadow mb-4">
                <Image src={invitation.brideImage} alt={invitation.brideName} fill className="object-cover" />
              </div>
            ) : (
              <div
                className="w-40 h-40 rounded-full flex items-center justify-center font-serif text-3xl font-bold text-white mb-4 shadow"
                style={{ backgroundColor: primary }}
              >
                {invitation.brideName.charAt(0)}
              </div>
            )}
            <p className="text-xs uppercase tracking-wider text-rose-600 font-semibold">Bride</p>
            <h3 className="text-2xl font-serif font-bold mb-1" style={{ color: primary }}>
              {invitation.brideName}
            </h3>
            {invitation.brideParents && (
              <p className="text-xs font-serif italic text-stone-600 mb-3">{invitation.brideParents}</p>
            )}
            {invitation.brideDescription && (
              <p className="text-sm text-stone-600 leading-relaxed mt-auto">{invitation.brideDescription}</p>
            )}
          </div>
        </div>
      </section>

      {/* Events */}
      {invitation.events && invitation.events.length > 0 && (
        <section className="py-16 px-4 max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold" style={{ color: primary }}>
              Wedding Ceremonies
            </h2>
            <div className="w-16 h-0.5 bg-rose-300 mx-auto mt-2"></div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {invitation.events.map((evt, idx) => (
              <div
                key={evt._id || idx}
                className="rounded-3xl p-6 bg-white/80 border border-rose-100 shadow hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div>
                  {evt.eventImage && (
                    <div className="relative w-full h-40 rounded-2xl overflow-hidden mb-4 shadow-sm">
                      <Image src={evt.eventImage} alt={evt.eventName} fill className="object-cover" />
                    </div>
                  )}
                  <div className="flex items-center justify-between text-xs text-rose-700 font-semibold mb-2">
                    <span className="px-2.5 py-1 rounded-full bg-rose-50 border border-rose-200">
                      {evt.eventDate}
                    </span>
                    <span>{evt.eventTime}</span>
                  </div>
                  <h3 className="text-xl font-serif font-bold mb-2" style={{ color: primary }}>
                    {evt.eventName}
                  </h3>
                  {evt.eventDescription && (
                    <p className="text-sm text-stone-600 leading-relaxed mb-3">{evt.eventDescription}</p>
                  )}
                </div>

                <p className="text-xs text-stone-600 flex items-center gap-1.5 pt-3 border-t border-rose-50">
                  <MapPin className="w-3.5 h-3.5 text-rose-500" />
                  <span>{evt.eventVenue}</span>
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Venue */}
      <section className="py-16 px-4 max-w-3xl mx-auto text-center">
        <div className="rounded-3xl p-8 sm:p-10 bg-white/80 border border-rose-200 shadow-xl">
          <h2 className="text-3xl font-serif font-bold mb-2" style={{ color: primary }}>
            {invitation.venueName}
          </h2>
          <p className="text-stone-600 text-sm mb-1">{invitation.venueAddress}</p>
          <p className="text-stone-700 font-medium text-sm mb-6">
            {invitation.city}, {invitation.state}, {invitation.country}
          </p>

          {invitation.googleMapsUrl && (
            <a
              href={invitation.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-white text-sm font-medium shadow hover:scale-105 transition-all"
              style={{ backgroundColor: primary }}
            >
              <Navigation className="w-4 h-4" />
              <span>View Map Directions</span>
            </a>
          )}
        </div>
      </section>

      {/* Gallery */}
      {invitation.gallery && invitation.gallery.length > 0 && (
        <section className="py-16 px-4 max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-serif font-bold" style={{ color: primary }}>
              Photo Gallery
            </h2>
            <div className="w-16 h-0.5 bg-rose-300 mx-auto mt-2"></div>
          </div>
          <GalleryLightbox gallery={invitation.gallery} />
        </section>
      )}

      {/* Footer */}
      <footer className="py-16 px-4 text-center border-t border-rose-100 bg-white/40">
        <p className="text-lg font-serif italic text-stone-700 mb-4">
          Thank you for being part of our special story!
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          {invitation.whatsappNumber && (
            <a
              href={`https://wa.me/${invitation.whatsappNumber.replace(/[^0-9]/g, '')}?text=Best%20wishes%20on%20your%20wedding!`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-600 text-white text-xs font-medium shadow hover:scale-105 transition-transform"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Message</span>
            </a>
          )}
          {invitation.contactNumber && (
            <a
              href={`tel:${invitation.contactNumber}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-stone-800 text-white text-xs font-medium shadow hover:scale-105 transition-transform"
            >
              <Phone className="w-4 h-4 text-rose-300" />
              <span>Call: {invitation.contactNumber}</span>
            </a>
          )}
        </div>

        <div className="mt-8 text-xs text-stone-400 flex items-center justify-center gap-1">
          <span>Celebrating {invitation.groomName} &amp; {invitation.brideName}</span>
          <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
        </div>
      </footer>
    </div>
  );
}
