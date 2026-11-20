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
  Sun,
} from 'lucide-react';

interface TemplateProps {
  invitation: IInvitation;
}

export default function BohemianTemplate({ invitation }: TemplateProps) {
  const [showWelcome, setShowWelcome] = useState(true);

  const primary = invitation.primaryColor || '#C86D51'; // Terracotta
  const secondary = invitation.secondaryColor || '#DDA15E'; // Warm Sunset Ochre
  const bg = invitation.backgroundColor || '#FAF3EB'; // Warm Sand / Cream

  const formattedWeddingDate = new Date(invitation.weddingDate).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const handleOpenInvitation = () => {
    try {
      confetti({
        particleCount: 90,
        spread: 85,
        origin: { y: 0.6 },
        colors: ['#C86D51', '#DDA15E', '#BC6C25', '#F4A261', '#E76F51'],
      });
    } catch {
      // ignore
    }
    setTimeout(() => setShowWelcome(false), 500);
  };

  return (
    <div
      className="min-h-screen text-[#4A3B32] font-sans selection:bg-[#C86D51]/30 selection:text-[#C86D51] relative overflow-x-hidden"
      style={{ backgroundColor: bg }}
    >
      {/* Welcome Screen - Sunset Horizon Card */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, y: 25 }}
              animate={{ scale: 1, y: 0 }}
              className="relative max-w-md w-full rounded-[3.5rem] p-8 sm:p-12 text-center shadow-2xl border-2 border-[#DDA15E] bg-gradient-to-b from-[#FFFDF9] via-[#FAF1E6] to-[#F5E2CE] overflow-hidden"
            >
              {/* Sunburst Motif */}
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#FAF0E6] text-[#C86D51] flex items-center justify-center shadow-inner border border-[#DDA15E]">
                <Sun className="w-8 h-8 text-[#C86D51] animate-spin-slow" />
              </div>

              <p className="text-xs uppercase tracking-[0.3em] font-serif font-bold text-[#C86D51] mb-1">
                Bohemian Sunset Union
              </p>
              <p className="text-[11px] font-serif italic text-stone-600 mb-6">
                Under the golden sky, two souls unite
              </p>

              <h2 className="text-3xl sm:text-4xl font-serif font-medium tracking-tight text-[#C86D51] mb-2">
                {invitation.groomName}
                <span className="block text-2xl font-serif italic text-[#DDA15E] my-1 font-normal">
                  &amp;
                </span>
                {invitation.brideName}
              </h2>

              <p className="text-xs font-serif text-stone-600 italic my-4 px-4">
                Join us for an evening of warm desert sunsets, soulful music and everlasting promises
              </p>

              <p className="text-xs uppercase tracking-widest font-bold text-[#4A3B32] mb-8 font-sans">
                {formattedWeddingDate}
              </p>

              <button
                onClick={handleOpenInvitation}
                className="px-8 py-3.5 rounded-full font-serif font-semibold text-white shadow-xl transition-all hover:scale-105 flex items-center justify-center gap-2 mx-auto cursor-pointer"
                style={{ backgroundColor: primary }}
              >
                <span>Witness The Sunset</span>
                <Sparkles className="w-4 h-4 text-[#DDA15E]" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Music Player */}
      <MusicPlayer
        musicUrl={invitation.musicUrl}
        musicTitle={invitation.musicTitle || 'Boho Acoustic Sunset Melodies'}
        autoPlay={!showWelcome}
      />

      {/* Bohemian Sunset Header */}
      <header className="pt-12 pb-6 text-center px-4">
        <div className="max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF1E6] border border-[#DDA15E] text-xs font-serif font-medium text-[#C86D51] mb-3">
            <Sun className="w-3.5 h-3.5 text-[#DDA15E]" />
            <span>Wild &amp; Free &bull; Soulful Vows</span>
          </div>
          <h2 className="text-base sm:text-lg font-serif italic text-[#C86D51]">
            As The Desert Sun Meets The Horizon
          </h2>
          <div className="flex items-center justify-center gap-3 my-3">
            <span className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#C86D51]/50"></span>
            <span className="text-[#DDA15E] text-sm">☼</span>
            <span className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#C86D51]/50"></span>
          </div>
        </div>
      </header>

      {/* Hero Section - Organic Arched Portrait Frame */}
      <section className="px-4 py-6 max-w-4xl mx-auto text-center">
        <div className="rounded-[4rem] p-8 sm:p-14 bg-gradient-to-b from-[#FFFDF9]/90 to-[#FAF1E6]/90 border-2 border-[#DDA15E]/60 shadow-xl relative backdrop-blur-xs">
          <p className="text-xs uppercase tracking-[0.25em] font-serif text-[#C86D51] mb-2 font-semibold">
            Wedding Festivities
          </p>

          <h1
            className="text-4xl sm:text-6xl md:text-7xl font-serif tracking-tight mb-4"
            style={{ color: primary }}
          >
            {invitation.groomName}
            <span className="block sm:inline sm:mx-4 text-3xl sm:text-5xl font-serif italic text-[#DDA15E]">
              &amp;
            </span>
            {invitation.brideName}
          </h1>

          <p className="max-w-xl mx-auto text-stone-600 text-sm sm:text-base leading-relaxed mb-8 font-serif italic">
            &ldquo;
            {invitation.description ||
              'Warm sands, dusty terracotta, and an endless horizon. We invite you to dance under the starry bohemian sky.'}
            &rdquo;
          </p>

          {/* Organic Rounded Arch Frame */}
          {(invitation.groomImage || (invitation.gallery && invitation.gallery[0]?.imageUrl)) && (
            <div className="my-8 max-w-sm mx-auto">
              <div className="relative aspect-[4/5] w-full rounded-t-[7rem] rounded-b-3xl overflow-hidden border-4 border-[#DDA15E] shadow-2xl">
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
                <div className="absolute inset-0 bg-gradient-to-t from-[#C86D51]/70 via-transparent to-transparent flex flex-col justify-end p-6 text-white text-center">
                  <p className="text-xl font-serif">{invitation.groomName} &amp; {invitation.brideName}</p>
                  <p className="text-xs text-[#FAF1E6] mt-1">{formattedWeddingDate}</p>
                </div>
              </div>
            </div>
          )}

          {/* Details Pill */}
          <div className="inline-flex flex-wrap items-center justify-center gap-4 py-3 px-8 rounded-full bg-[#FAF1E6] border border-[#DDA15E] text-xs sm:text-sm text-[#4A3B32] font-serif shadow-xs">
            <span className="flex items-center gap-1.5 font-medium">
              <Calendar className="w-4 h-4 text-[#C86D51]" />
              {formattedWeddingDate}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 font-medium">
              <Clock className="w-4 h-4 text-[#C86D51]" />
              {invitation.weddingTime || '17:30'}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 font-medium">
              <MapPin className="w-4 h-4 text-[#C86D51]" />
              {invitation.venueName}, {invitation.city}
            </span>
          </div>
        </div>
      </section>

      {/* Countdown Section */}
      <section className="py-12 px-4 text-center">
        <p className="text-xs uppercase tracking-widest font-serif font-bold text-[#C86D51] mb-3">
          Moments Until The Golden Hour
        </p>
        <Countdown
          targetDate={invitation.weddingDate}
          targetTime={invitation.weddingTime}
          textColor={primary}
          accentColor={secondary}
        />
      </section>

      {/* Couple Introduction - Rounded Arch Cards */}
      <section className="py-16 px-4 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-widest text-[#C86D51] font-bold">Two Souls</p>
          <h2 className="text-3xl sm:text-4xl font-serif font-normal mt-1" style={{ color: primary }}>
            The Free Spirits
          </h2>
          <div className="w-16 h-0.5 bg-[#DDA15E] mx-auto mt-3"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-8 rounded-[3.5rem] bg-white border border-[#DDA15E] shadow-sm text-center flex flex-col items-center">
            {invitation.groomImage ? (
              <div className="relative w-40 h-48 rounded-t-full rounded-b-2xl overflow-hidden border-2 border-[#DDA15E] shadow-md mb-5">
                <Image src={invitation.groomImage} alt="Groom" fill className="object-cover" />
              </div>
            ) : null}
            <span className="text-xs uppercase tracking-wider font-bold text-[#DDA15E]">The Groom</span>
            <h3 className="text-2xl font-serif font-semibold text-[#C86D51] mt-1 mb-2">
              {invitation.groomName}
            </h3>
            {invitation.groomParents && (
              <p className="text-xs font-serif italic text-stone-500 mb-3">{invitation.groomParents}</p>
            )}
            {invitation.groomDescription && (
              <p className="text-sm text-stone-600 leading-relaxed mt-auto font-serif">{invitation.groomDescription}</p>
            )}
          </div>

          <div className="p-8 rounded-[3.5rem] bg-white border border-[#DDA15E] shadow-sm text-center flex flex-col items-center">
            {invitation.brideImage ? (
              <div className="relative w-40 h-48 rounded-t-full rounded-b-2xl overflow-hidden border-2 border-[#DDA15E] shadow-md mb-5">
                <Image src={invitation.brideImage} alt="Bride" fill className="object-cover" />
              </div>
            ) : null}
            <span className="text-xs uppercase tracking-wider font-bold text-[#DDA15E]">The Bride</span>
            <h3 className="text-2xl font-serif font-semibold text-[#C86D51] mt-1 mb-2">
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

      {/* Boho Itinerary Cards */}
      {invitation.events && invitation.events.length > 0 && (
        <section className="py-16 px-4 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-widest text-[#C86D51] font-bold">The Journey</p>
            <h2 className="text-3xl sm:text-4xl font-serif font-normal mt-1" style={{ color: primary }}>
              Celebration Schedule
            </h2>
            <div className="w-16 h-0.5 bg-[#DDA15E] mx-auto mt-3"></div>
          </div>

          <div className="space-y-6">
            {invitation.events.map((evt, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-[3rem] bg-white border border-[#DDA15E] shadow-xs hover:border-[#C86D51] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-6"
              >
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF1E6] text-[#C86D51] text-[11px] font-semibold uppercase tracking-wider">
                    <Sun className="w-3 h-3 text-[#DDA15E]" />
                    <span>Gathering 0{idx + 1}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif font-semibold text-[#C86D51]">
                    {evt.eventName}
                  </h3>
                  {evt.eventDescription && (
                    <p className="text-xs sm:text-sm text-stone-600 font-serif leading-relaxed">
                      {evt.eventDescription}
                    </p>
                  )}
                  <p className="text-xs text-stone-500 flex items-center gap-1.5 pt-1">
                    <MapPin className="w-3.5 h-3.5 text-[#DDA15E]" />
                    <span>{evt.eventVenue}</span>
                  </p>
                </div>

                <div className="flex-shrink-0 text-left sm:text-right p-4 rounded-2xl bg-[#FAF1E6] border border-[#DDA15E]/60">
                  <p className="text-xs uppercase tracking-wider font-semibold text-[#C86D51]">
                    {evt.eventDate}
                  </p>
                  <p className="text-base font-serif font-bold text-[#DDA15E] mt-0.5">
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
            <p className="text-xs uppercase tracking-widest text-[#C86D51] font-bold">Captured Moments</p>
            <h2 className="text-3xl sm:text-4xl font-serif font-normal mt-1" style={{ color: primary }}>
              Boho Keepsakes
            </h2>
            <div className="w-16 h-0.5 bg-[#DDA15E] mx-auto mt-3"></div>
          </div>

          <GalleryLightbox gallery={invitation.gallery} />
        </section>
      )}

      {/* Venue Section */}
      <section className="py-16 px-4 max-w-4xl mx-auto">
        <div className="p-8 sm:p-12 rounded-[4rem] bg-white border border-[#DDA15E] shadow-md text-center">
          <p className="text-xs uppercase tracking-widest font-bold text-[#DDA15E] mb-1">
            Desert Horizon Venue
          </p>
          <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-[#C86D51] mb-3">
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
                <span>Navigate</span>
              </a>
            )}

            {invitation.contactNumber && (
              <a
                href={`tel:${invitation.contactNumber}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FAF1E6] text-[#C86D51] border border-[#DDA15E] text-xs font-semibold hover:bg-stone-100 transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>Call Us</span>
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

      {/* Boho Footer */}
      <footer className="py-12 px-4 text-center border-t border-[#DDA15E]/60 bg-white/40">
        <div className="w-8 h-8 mx-auto mb-3 text-[#C86D51] flex items-center justify-center">
          <Heart className="w-5 h-5 fill-current text-[#C86D51]" />
        </div>
        <p className="text-base font-serif italic text-stone-700">
          Wild Love, Endless Horizon
        </p>
        <p className="text-xl font-serif font-semibold text-[#C86D51] mt-1">
          {invitation.groomName} &amp; {invitation.brideName}
        </p>
        <p className="text-[11px] text-stone-400 mt-4 tracking-wider uppercase font-sans">
          Created with VivaahInvites
        </p>
      </footer>
    </div>
  );
}
