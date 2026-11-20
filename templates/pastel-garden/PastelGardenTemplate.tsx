'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { IInvitation } from '@/types';
import Countdown from '@/components/wedding/Countdown';
import MusicPlayer from '@/components/wedding/MusicPlayer';
import GalleryLightbox from '@/components/wedding/GalleryLightbox';
import confetti from 'canvas-confetti';
import {
  MapPin,
  Calendar,
  Clock,
  Heart,
  Navigation,
  MessageCircle,
  Phone,
  Sparkles,
  Flower2,
} from 'lucide-react';

interface TemplateProps {
  invitation: IInvitation;
}

export default function PastelGardenTemplate({ invitation }: TemplateProps) {
  const [showWelcome, setShowWelcome] = useState(true);

  const primary = invitation.primaryColor || '#9E5A63'; // Dusty Rose / Blush
  const secondary = invitation.secondaryColor || '#607D67'; // Sage Green
  const bg = invitation.backgroundColor || '#FCF9F5'; // Soft Cream

  const formattedWeddingDate = new Date(invitation.weddingDate).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const handleOpenInvitation = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#F7CAD0', '#B5E2FA', '#C1D37F', '#E8A598', '#FFFFFF'],
      });
    } catch {
      // ignore
    }
    setTimeout(() => setShowWelcome(false), 500);
  };

  return (
    <div
      className="min-h-screen text-stone-800 font-sans selection:bg-[#F7CAD0] selection:text-[#9E5A63] relative overflow-x-hidden"
      style={{ backgroundColor: bg }}
    >
      {/* Welcome Screen - Soft Botanical Bloom */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="relative max-w-md w-full rounded-[3rem] p-8 sm:p-12 text-center shadow-2xl border-4 border-[#F7CAD0] bg-gradient-to-b from-[#FFFDFB] via-[#FAF3EB] to-[#F5ECE1] overflow-hidden"
            >
              {/* Botanical Wreath Motif */}
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#FAF0E6] text-[#9E5A63] flex items-center justify-center shadow-inner border border-[#E8C5C8]">
                <Flower2 className="w-8 h-8 text-[#9E5A63] animate-pulse" />
              </div>

              <p className="text-xs uppercase tracking-[0.25em] font-serif font-bold text-[#607D67] mb-1">
                A Love In Full Bloom
              </p>
              <p className="text-[11px] font-serif italic text-stone-500 mb-6">
                Joyfully inviting you to celebrate our union
              </p>

              <h2 className="text-3xl sm:text-4xl font-serif font-medium tracking-tight text-[#9E5A63] mb-2">
                {invitation.groomName}
                <span className="block text-2xl font-serif italic text-[#607D67] my-1 font-normal">
                  &amp;
                </span>
                {invitation.brideName}
              </h2>

              <p className="text-xs font-serif text-stone-600 italic my-4 px-4">
                Two souls, one romantic journey amidst petals, vows and laughter.
              </p>

              <p className="text-xs uppercase tracking-widest font-bold text-stone-800 mb-8 font-sans">
                {formattedWeddingDate}
              </p>

              <button
                onClick={handleOpenInvitation}
                className="px-8 py-3.5 rounded-full font-serif font-semibold text-white shadow-lg transition-all hover:scale-105 flex items-center justify-center gap-2 mx-auto cursor-pointer"
                style={{ backgroundColor: primary }}
              >
                <span>Enter The Garden</span>
                <Sparkles className="w-4 h-4 text-[#F7CAD0]" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Music Player */}
      <MusicPlayer
        musicUrl={invitation.musicUrl}
        musicTitle={invitation.musicTitle || 'Acoustic Floral Garden'}
        autoPlay={!showWelcome}
      />

      {/* Garden Floral Header */}
      <header className="pt-12 pb-6 text-center px-4">
        <div className="max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF0E6] border border-[#E8C5C8] text-xs font-serif font-medium text-[#9E5A63] mb-3">
            <Flower2 className="w-3.5 h-3.5 text-[#607D67]" />
            <span>Pastel Garden Nuptials</span>
          </div>
          <h2 className="text-base sm:text-lg font-serif italic text-[#607D67]">
            Together With Our Families
          </h2>
          <div className="flex items-center justify-center gap-3 my-3">
            <span className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#9E5A63]/40"></span>
            <span className="text-[#9E5A63] text-sm">❀</span>
            <span className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#9E5A63]/40"></span>
          </div>
        </div>
      </header>

      {/* Hero Section - Oval Wreath Frame */}
      <section className="px-4 py-6 max-w-4xl mx-auto text-center">
        <div className="rounded-[3.5rem] p-8 sm:p-14 bg-white/80 border-2 border-[#E8C5C8]/80 shadow-xl relative backdrop-blur-xs">
          <p className="text-xs uppercase tracking-[0.25em] font-serif text-[#607D67] mb-2 font-semibold">
            Wedding Celebration
          </p>

          <h1
            className="text-4xl sm:text-6xl md:text-7xl font-serif tracking-tight mb-4"
            style={{ color: primary }}
          >
            {invitation.groomName}
            <span className="block sm:inline sm:mx-4 text-3xl sm:text-5xl font-serif italic text-[#607D67]">
              &amp;
            </span>
            {invitation.brideName}
          </h1>

          <p className="max-w-xl mx-auto text-stone-600 text-sm sm:text-base leading-relaxed mb-8 font-serif italic">
            &ldquo;
            {invitation.description ||
              'A whisper of petals, two loving hearts, and an evergreen tomorrow. We would be honored by your gracious presence.'}
            &rdquo;
          </p>

          {/* Oval Wreath Photo Frame */}
          {(invitation.groomImage || (invitation.gallery && invitation.gallery[0]?.imageUrl)) && (
            <div className="my-8 max-w-sm mx-auto">
              <div className="relative aspect-[4/5] w-full rounded-[4rem] overflow-hidden border-8 border-white shadow-2xl ring-4 ring-[#E8C5C8]">
                <Image
                  src={
                    (invitation.gallery && invitation.gallery[0]?.imageUrl) ||
                    invitation.groomImage ||
                    ''
                  }
                  alt={`${invitation.groomName} & ${invitation.brideName}`}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#9E5A63]/60 via-transparent to-transparent flex flex-col justify-end p-6 text-white text-center">
                  <p className="text-lg font-serif">{invitation.groomName} &amp; {invitation.brideName}</p>
                  <p className="text-xs text-[#FAF0E6] mt-1">{formattedWeddingDate}</p>
                </div>
              </div>
            </div>
          )}

          {/* Details Pill */}
          <div className="inline-flex flex-wrap items-center justify-center gap-4 py-3 px-8 rounded-full bg-[#FAF3EB] border border-[#E8C5C8] text-xs sm:text-sm text-stone-800 font-serif shadow-xs">
            <span className="flex items-center gap-1.5 font-medium">
              <Calendar className="w-4 h-4 text-[#9E5A63]" />
              {formattedWeddingDate}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 font-medium">
              <Clock className="w-4 h-4 text-[#9E5A63]" />
              {invitation.weddingTime || '17:00'}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 font-medium">
              <MapPin className="w-4 h-4 text-[#9E5A63]" />
              {invitation.venueName}, {invitation.city}
            </span>
          </div>
        </div>
      </section>

      {/* Countdown Section */}
      <section className="py-12 px-4 text-center">
        <p className="text-xs uppercase tracking-widest font-serif font-bold text-[#607D67] mb-3">
          Counting Down The Blooming Moments
        </p>
        <Countdown
          targetDate={invitation.weddingDate}
          targetTime={invitation.weddingTime}
          textColor={primary}
          accentColor={secondary}
        />
      </section>

      {/* Couple Introduction - Soft Rounded Cards */}
      <section className="py-16 px-4 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-widest text-[#607D67] font-bold">The Bride &amp; Groom</p>
          <h2 className="text-3xl sm:text-4xl font-serif font-normal mt-1" style={{ color: primary }}>
            Hand In Hand
          </h2>
          <div className="w-16 h-0.5 bg-[#E8C5C8] mx-auto mt-3"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Groom Card */}
          <div className="p-8 rounded-[3rem] bg-white border border-[#E8C5C8] shadow-sm text-center flex flex-col items-center hover:shadow-md transition-shadow">
            {invitation.groomImage ? (
              <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-[#FAF0E6] ring-2 ring-[#E8C5C8] shadow-md mb-5">
                <Image src={invitation.groomImage} alt="Groom" fill className="object-cover" />
              </div>
            ) : null}
            <span className="text-xs uppercase tracking-wider font-bold text-[#607D67]">The Groom</span>
            <h3 className="text-2xl font-serif font-semibold text-[#9E5A63] mt-1 mb-2">
              {invitation.groomName}
            </h3>
            {invitation.groomParents && (
              <p className="text-xs font-serif italic text-stone-500 mb-3">{invitation.groomParents}</p>
            )}
            {invitation.groomDescription && (
              <p className="text-sm text-stone-600 leading-relaxed mt-auto font-serif">{invitation.groomDescription}</p>
            )}
          </div>

          {/* Bride Card */}
          <div className="p-8 rounded-[3rem] bg-white border border-[#E8C5C8] shadow-sm text-center flex flex-col items-center hover:shadow-md transition-shadow">
            {invitation.brideImage ? (
              <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-[#FAF0E6] ring-2 ring-[#E8C5C8] shadow-md mb-5">
                <Image src={invitation.brideImage} alt="Bride" fill className="object-cover" />
              </div>
            ) : null}
            <span className="text-xs uppercase tracking-wider font-bold text-[#607D67]">The Bride</span>
            <h3 className="text-2xl font-serif font-semibold text-[#9E5A63] mt-1 mb-2">
              {invitation.brideName}
            </h3>
            {invitation.brideParents && (
              <p className="text-xs font-serif italic text-stone-500 mb-3">{invitation.brideParents}</p>
            )}
            {invitation.brideDescription && (
              <p className="text-sm text-stone-600 leading-relaxed mt-auto font-serif">{invitation.brideDescription}</p>
            )}
          </div>
        </div>
      </section>

      {/* Itinerary - Flower-Petal Event Cards */}
      {invitation.events && invitation.events.length > 0 && (
        <section className="py-16 px-4 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-widest text-[#607D67] font-bold">Celebrations</p>
            <h2 className="text-3xl sm:text-4xl font-serif font-normal mt-1" style={{ color: primary }}>
              Wedding Itinerary
            </h2>
            <div className="w-16 h-0.5 bg-[#E8C5C8] mx-auto mt-3"></div>
          </div>

          <div className="space-y-6">
            {invitation.events.map((evt, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-[2.5rem] bg-white border border-[#E8C5C8] shadow-xs hover:border-[#9E5A63] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-6"
              >
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF3EB] text-[#607D67] text-[11px] font-semibold uppercase tracking-wider">
                    <Flower2 className="w-3 h-3 text-[#9E5A63]" />
                    <span>Ceremony {idx + 1}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif font-semibold text-[#9E5A63]">
                    {evt.eventName}
                  </h3>
                  {evt.eventDescription && (
                    <p className="text-xs sm:text-sm text-stone-600 font-serif leading-relaxed">
                      {evt.eventDescription}
                    </p>
                  )}
                  <p className="text-xs text-stone-500 flex items-center gap-1.5 pt-1">
                    <MapPin className="w-3.5 h-3.5 text-[#607D67]" />
                    <span>{evt.eventVenue}</span>
                  </p>
                </div>

                <div className="flex-shrink-0 text-left sm:text-right p-4 rounded-2xl bg-[#FAF0E6]/50 border border-[#E8C5C8]">
                  <p className="text-xs uppercase tracking-wider font-semibold text-[#607D67]">
                    {evt.eventDate}
                  </p>
                  <p className="text-base font-serif font-bold text-[#9E5A63] mt-0.5">
                    {evt.eventTime}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Gallery Section */}
      {invitation.gallery && invitation.gallery.length > 0 && (
        <section className="py-16 px-4 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-widest text-[#607D67] font-bold">Sweet Memories</p>
            <h2 className="text-3xl sm:text-4xl font-serif font-normal mt-1" style={{ color: primary }}>
              Photo Gallery
            </h2>
            <div className="w-16 h-0.5 bg-[#E8C5C8] mx-auto mt-3"></div>
          </div>

          <GalleryLightbox gallery={invitation.gallery} />
        </section>
      )}

      {/* Venue & Location Section */}
      <section className="py-16 px-4 max-w-4xl mx-auto">
        <div className="p-8 sm:p-12 rounded-[3.5rem] bg-white border border-[#E8C5C8] shadow-md text-center">
          <p className="text-xs uppercase tracking-widest font-bold text-[#607D67] mb-1">
            Celebration Venue
          </p>
          <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-[#9E5A63] mb-3">
            {invitation.venueName}
          </h2>
          <p className="text-sm font-serif text-stone-600 max-w-lg mx-auto mb-6">
            {invitation.venueAddress}, {invitation.city}, {invitation.state}, {invitation.country}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            {invitation.googleMapsUrl && (
              <a
                href={invitation.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white text-xs font-semibold shadow-md hover:scale-105 transition-all"
                style={{ backgroundColor: primary }}
              >
                <Navigation className="w-4 h-4" />
                <span>Open Google Maps</span>
              </a>
            )}

            {invitation.contactNumber && (
              <a
                href={`tel:${invitation.contactNumber}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FAF3EB] text-[#607D67] border border-[#E8C5C8] text-xs font-semibold hover:bg-stone-100 transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>Call Concierge</span>
              </a>
            )}

            {invitation.whatsappNumber && (
              <a
                href={`https://wa.me/${invitation.whatsappNumber.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366] text-white text-xs font-semibold shadow-md hover:scale-105 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp RSVP</span>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Romantic Footer */}
      <footer className="py-12 px-4 text-center border-t border-[#E8C5C8]/60 bg-white/40">
        <div className="w-8 h-8 mx-auto mb-3 text-[#9E5A63] flex items-center justify-center">
          <Heart className="w-5 h-5 fill-current text-[#9E5A63]" />
        </div>
        <p className="text-base font-serif italic text-stone-700">
          With Love &amp; Gratitude
        </p>
        <p className="text-xl font-serif font-semibold text-[#9E5A63] mt-1">
          {invitation.groomName} &amp; {invitation.brideName}
        </p>
        <p className="text-[11px] text-stone-400 mt-4 tracking-wider uppercase font-sans">
          Created with VivaahInvites
        </p>
      </footer>
    </div>
  );
}
