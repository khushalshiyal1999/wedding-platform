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

export default function RoyalTemplate({ invitation }: TemplateProps) {
  const [showWelcome, setShowWelcome] = useState(true);

  const primary = invitation.primaryColor || '#800020';
  const secondary = invitation.secondaryColor || '#D4AF37';
  const bg = invitation.backgroundColor || '#FFFDF9';

  const formattedWeddingDate = new Date(invitation.weddingDate).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div
      className="min-h-screen text-stone-800 font-sans selection:bg-amber-200 selection:text-amber-900 relative overflow-x-hidden"
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
        musicTitle={invitation.musicTitle || 'Royal Wedding Shehnai'}
        autoPlay={!showWelcome}
      />

      {/* Traditional Auspicious Header Banner */}
      <header className="pt-10 pb-6 text-center px-4">
        <div className="max-w-2xl mx-auto">
          <p className="text-amber-700 font-serif text-sm tracking-widest uppercase mb-1">
            ॥ श्री गणेशाय नमः ॥
          </p>
          <p className="text-xs sm:text-sm font-serif italic text-stone-600 max-w-lg mx-auto">
            वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ । निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥
          </p>
          <div className="flex items-center justify-center gap-3 my-4">
            <span className="h-[1px] w-16 bg-gradient-to-r from-transparent to-amber-400"></span>
            <span className="text-amber-600 text-lg">❖</span>
            <span className="h-[1px] w-16 bg-gradient-to-l from-transparent to-amber-400"></span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 py-12 text-center max-w-4xl mx-auto">
        <div className="relative rounded-3xl p-8 sm:p-14 border-2 border-amber-300/80 shadow-2xl bg-white/70 backdrop-blur-md overflow-hidden">
          {/* Corner traditional motifs */}
          <div className="absolute top-3 left-3 text-2xl text-amber-500/50 select-none">⚜</div>
          <div className="absolute top-3 right-3 text-2xl text-amber-500/50 select-none">⚜</div>
          <div className="absolute bottom-3 left-3 text-2xl text-amber-500/50 select-none">⚜</div>
          <div className="absolute bottom-3 right-3 text-2xl text-amber-500/50 select-none">⚜</div>

          <p className="text-xs sm:text-sm font-serif tracking-[0.25em] uppercase text-stone-600 mb-3">
            Together with their families
          </p>

          <h1
            className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold tracking-tight mb-4"
            style={{ color: primary }}
          >
            {invitation.groomName}
            <span className="block sm:inline sm:mx-4 text-3xl sm:text-5xl font-light italic text-amber-600">
              weds
            </span>
            {invitation.brideName}
          </h1>

          <p className="max-w-xl mx-auto text-stone-600 text-sm sm:text-base leading-relaxed mb-8">
            {invitation.description ||
              'Joyfully invite you to celebrate our sacred wedding ceremonies and share in our celebration of love, culture and lifelong togetherness.'}
          </p>

          {/* Wedding Date & Venue Quick Highlight */}
          <div className="inline-flex flex-wrap items-center justify-center gap-4 py-3 px-6 rounded-full bg-amber-50/80 border border-amber-200 text-xs sm:text-sm text-amber-950 font-serif">
            <span className="flex items-center gap-1.5 font-medium">
              <Calendar className="w-4 h-4 text-amber-700" />
              {formattedWeddingDate}
            </span>
            <span className="hidden sm:inline text-amber-300">•</span>
            <span className="flex items-center gap-1.5 font-medium">
              <Clock className="w-4 h-4 text-amber-700" />
              {invitation.weddingTime || '06:00 PM'}
            </span>
            <span className="hidden sm:inline text-amber-300">•</span>
            <span className="flex items-center gap-1.5 font-medium">
              <MapPin className="w-4 h-4 text-amber-700" />
              {invitation.city}, {invitation.state}
            </span>
          </div>
        </div>
      </section>

      {/* Countdown Section */}
      <section className="py-10 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs uppercase tracking-widest font-semibold text-amber-700 mb-2">
            Counting Down to the Auspicious Muhurat
          </p>
          <Countdown
            targetDate={invitation.weddingDate}
            targetTime={invitation.weddingTime}
            textColor={primary}
            accentColor={secondary}
          />
        </div>
      </section>

      {/* Couple Profiles Section */}
      <section className="py-16 px-4 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-widest text-amber-700 font-semibold mb-1">
            Soulmates
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold" style={{ color: primary }}>
            Meet the Couple
          </h2>
          <div className="w-20 h-0.5 bg-amber-400 mx-auto mt-3"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-stretch">
          {/* Groom Card */}
          <div className="rounded-3xl p-6 sm:p-8 bg-white/80 border border-amber-200 shadow-xl flex flex-col items-center text-center transition-all hover:shadow-2xl">
            {invitation.groomImage ? (
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden border-4 border-amber-300 shadow-lg mb-5">
                <Image
                  src={invitation.groomImage}
                  alt={invitation.groomName}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div
                className="w-40 h-40 rounded-full flex items-center justify-center font-serif text-3xl font-bold text-white mb-5 shadow-lg"
                style={{ backgroundColor: primary }}
              >
                {invitation.groomName.charAt(0)}
              </div>
            )}
            <p className="text-xs uppercase tracking-wider font-semibold text-amber-700">The Groom</p>
            <h3 className="text-2xl font-serif font-bold mt-1 mb-2" style={{ color: primary }}>
              {invitation.groomName}
            </h3>
            {invitation.groomParents && (
              <p className="text-xs sm:text-sm font-serif italic text-stone-600 mb-4 px-2">
                {invitation.groomParents}
              </p>
            )}
            {invitation.groomDescription && (
              <p className="text-sm text-stone-600 leading-relaxed mt-auto">
                {invitation.groomDescription}
              </p>
            )}
          </div>

          {/* Bride Card */}
          <div className="rounded-3xl p-6 sm:p-8 bg-white/80 border border-amber-200 shadow-xl flex flex-col items-center text-center transition-all hover:shadow-2xl">
            {invitation.brideImage ? (
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden border-4 border-amber-300 shadow-lg mb-5">
                <Image
                  src={invitation.brideImage}
                  alt={invitation.brideName}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div
                className="w-40 h-40 rounded-full flex items-center justify-center font-serif text-3xl font-bold text-white mb-5 shadow-lg"
                style={{ backgroundColor: primary }}
              >
                {invitation.brideName.charAt(0)}
              </div>
            )}
            <p className="text-xs uppercase tracking-wider font-semibold text-amber-700">The Bride</p>
            <h3 className="text-2xl font-serif font-bold mt-1 mb-2" style={{ color: primary }}>
              {invitation.brideName}
            </h3>
            {invitation.brideParents && (
              <p className="text-xs sm:text-sm font-serif italic text-stone-600 mb-4 px-2">
                {invitation.brideParents}
              </p>
            )}
            {invitation.brideDescription && (
              <p className="text-sm text-stone-600 leading-relaxed mt-auto">
                {invitation.brideDescription}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Wedding Events / Ceremonies Section */}
      {invitation.events && invitation.events.length > 0 && (
        <section className="py-16 px-4 max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-widest text-amber-700 font-semibold mb-1">
              Celebrations
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold" style={{ color: primary }}>
              Wedding Itinerary
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-2">
              Join us in every sacred moment and joyful celebration
            </p>
            <div className="w-20 h-0.5 bg-amber-400 mx-auto mt-3"></div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {invitation.events.map((evt, idx) => (
              <div
                key={evt._id || idx}
                className="rounded-3xl p-6 sm:p-7 bg-white/80 border border-amber-200/90 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {evt.eventImage && (
                    <div className="relative w-full h-44 rounded-2xl overflow-hidden mb-4 shadow">
                      <Image
                        src={evt.eventImage}
                        alt={evt.eventName}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-300">
                      {evt.eventDate}
                    </span>
                    <span className="flex items-center gap-1 text-xs font-medium text-stone-600">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      {evt.eventTime}
                    </span>
                  </div>

                  <h3 className="text-xl font-serif font-bold mb-2" style={{ color: primary }}>
                    {evt.eventName}
                  </h3>

                  {evt.eventDescription && (
                    <p className="text-sm text-stone-600 leading-relaxed mb-4">
                      {evt.eventDescription}
                    </p>
                  )}
                </div>

                <div className="pt-3 border-t border-amber-100 flex items-start gap-2 text-xs text-stone-700">
                  <MapPin className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span className="font-medium">{evt.eventVenue}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Venue Section */}
      <section className="py-16 px-4 max-w-4xl mx-auto">
        <div className="rounded-3xl p-8 sm:p-12 bg-white/90 border-2 border-amber-300 shadow-2xl text-center relative overflow-hidden">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-100 flex items-center justify-center text-amber-800">
            <Navigation className="w-8 h-8" />
          </div>

          <p className="text-xs uppercase tracking-widest font-semibold text-amber-700 mb-1">
            Location &amp; Destination
          </p>

          <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-2" style={{ color: primary }}>
            {invitation.venueName}
          </h2>

          <p className="text-stone-600 text-sm sm:text-base max-w-md mx-auto mb-2">
            {invitation.venueAddress}
          </p>
          <p className="text-stone-700 font-medium text-sm mb-6">
            {invitation.city}, {invitation.state}, {invitation.country}
          </p>

          {invitation.googleMapsUrl && (
            <a
              href={invitation.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-serif font-medium shadow-lg transition-transform hover:scale-105"
              style={{ backgroundColor: primary }}
            >
              <MapPin className="w-4 h-4 text-amber-300" />
              <span>Get Directions on Google Maps</span>
            </a>
          )}
        </div>
      </section>

      {/* Photo Gallery Section */}
      {invitation.gallery && invitation.gallery.length > 0 && (
        <section className="py-16 px-4 max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-widest text-amber-700 font-semibold mb-1">
              Moments
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold" style={{ color: primary }}>
              Captured Memories
            </h2>
            <div className="w-20 h-0.5 bg-amber-400 mx-auto mt-3"></div>
          </div>

          <GalleryLightbox gallery={invitation.gallery} />
        </section>
      )}

      {/* Thank You & Wishes Section */}
      <footer className="py-20 px-4 text-center border-t border-amber-200 bg-white/60">
        <div className="max-w-xl mx-auto">
          <Sparkles className="w-8 h-8 mx-auto text-amber-500 mb-3" />
          <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-3" style={{ color: primary }}>
            With Best Compliments
          </h2>
          <p className="text-stone-600 font-serif italic text-sm sm:text-base mb-6">
            Sharma &amp; Patel Families look forward to welcoming you with folded hands and open hearts.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            {invitation.whatsappNumber && (
              <a
                href={`https://wa.me/${invitation.whatsappNumber.replace(/[^0-9]/g, '')}?text=Warm%20congratulations%20on%20your%20wedding!`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-medium shadow transition-transform hover:scale-105"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Send Wishes on WhatsApp</span>
              </a>
            )}

            {invitation.contactNumber && (
              <a
                href={`tel:${invitation.contactNumber}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-stone-800 hover:bg-stone-900 text-white text-xs sm:text-sm font-medium shadow transition-transform hover:scale-105"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Call: {invitation.contactNumber}</span>
              </a>
            )}
          </div>

          <div className="mt-12 text-xs text-stone-500 flex items-center justify-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 inline" />
            <span>for {invitation.groomName} &amp; {invitation.brideName}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
