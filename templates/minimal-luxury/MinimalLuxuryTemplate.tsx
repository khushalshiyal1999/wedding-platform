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
  ArrowRight,
  Navigation,
  MessageCircle,
  Phone,
} from 'lucide-react';

interface TemplateProps {
  invitation: IInvitation;
}

export default function MinimalLuxuryTemplate({ invitation }: TemplateProps) {
  const [showWelcome, setShowWelcome] = useState(true);

  const primary = invitation.primaryColor || '#141414'; // Obsidian Black
  const secondary = invitation.secondaryColor || '#C5A059'; // Champagne Gold
  const bg = invitation.backgroundColor || '#FAF8F5'; // Warm Bone / Ivory

  const weddingDateObj = new Date(invitation.weddingDate);
  const formattedDay = weddingDateObj.toLocaleDateString('en-US', { day: '2-digit' });
  const formattedMonth = weddingDateObj.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
  const formattedYear = weddingDateObj.getFullYear();
  const formattedWeddingDate = `${formattedDay} . ${formattedMonth} . ${formattedYear}`;

  const handleOpenInvitation = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: [secondary, '#FFFFFF', '#242424'],
      });
    } catch {
      // ignore
    }
    setTimeout(() => setShowWelcome(false), 500);
  };

  return (
    <div
      className="min-h-screen text-[#141414] font-sans selection:bg-[#C5A059]/20 selection:text-[#141414] relative overflow-x-hidden"
      style={{ backgroundColor: bg }}
    >
      {/* Welcome Screen - Editorial Envelope Reveal */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-stone-950/90 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              className="relative max-w-md w-full p-10 sm:p-14 text-center border border-white/20 bg-[#FAF8F5] shadow-2xl"
            >
              <div className="w-12 h-12 mx-auto mb-6 rounded-full border border-[#C5A059] flex items-center justify-center text-[#C5A059] font-serif text-sm tracking-widest">
                VL
              </div>

              <p className="text-[10px] uppercase tracking-[0.35em] text-[#777777] font-mono mb-6">
                Private Invitation &bull; Issue 2026
              </p>

              <h2 className="text-3xl sm:text-4xl font-serif font-light tracking-tight text-[#141414] mb-4">
                {invitation.groomName}
                <span className="block text-xl font-serif italic text-[#C5A059] my-1">
                  &amp;
                </span>
                {invitation.brideName}
              </h2>

              <div className="w-12 h-[1px] bg-[#C5A059] mx-auto my-6"></div>

              <p className="text-xs font-serif text-stone-600 italic leading-relaxed mb-8">
                Request the honour of your company at the celebration of their marriage.
              </p>

              <p className="text-xs font-mono tracking-widest text-[#141414] mb-8">
                {formattedWeddingDate}
              </p>

              <button
                onClick={handleOpenInvitation}
                className="w-full py-4 border border-[#141414] hover:bg-[#141414] hover:text-white transition-all text-xs uppercase tracking-[0.25em] font-semibold cursor-pointer flex items-center justify-center gap-2 group"
              >
                <span>View Invitation</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Music Player */}
      <MusicPlayer
        musicUrl={invitation.musicUrl}
        musicTitle={invitation.musicTitle || 'Minimalist Piano & Strings'}
        autoPlay={!showWelcome}
      />

      {/* Top Editorial Bar */}
      <nav className="py-6 px-6 sm:px-12 border-b border-[#EAE4DC] flex items-center justify-between text-xs font-mono uppercase tracking-widest text-[#777777]">
        <span>The Wedding Of</span>
        <span className="text-[#C5A059]">{formattedWeddingDate}</span>
      </nav>

      {/* Hero Section - High-Fashion Asymmetrical Composition */}
      <section className="px-6 sm:px-12 py-16 sm:py-24 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#C5A059] block">
              Editorial Volume &bull; Formal Union
            </span>

            <h1
              className="text-5xl sm:text-7xl lg:text-8xl font-serif font-light tracking-tight leading-[0.95]"
              style={{ color: primary }}
            >
              {invitation.groomName}
              <span className="block font-serif italic text-4xl sm:text-6xl text-[#C5A059] my-2">
                &amp;
              </span>
              {invitation.brideName}
            </h1>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed max-w-md font-serif italic pt-4">
              &ldquo;
              {invitation.description ||
                'In the quiet confidence of forever, two paths converge into a singular, timeless legacy.'}
              &rdquo;
            </p>

            <div className="pt-6 border-t border-[#EAE4DC] flex flex-wrap gap-8 text-xs font-mono tracking-wider">
              <div>
                <span className="text-[#777777] block text-[10px] uppercase">Date</span>
                <span className="font-semibold text-[#141414]">{formattedWeddingDate}</span>
              </div>
              <div>
                <span className="text-[#777777] block text-[10px] uppercase">Time</span>
                <span className="font-semibold text-[#141414]">{invitation.weddingTime || '18:00 HRS'}</span>
              </div>
              <div>
                <span className="text-[#777777] block text-[10px] uppercase">Location</span>
                <span className="font-semibold text-[#141414]">{invitation.venueName}, {invitation.city}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            {(invitation.groomImage || (invitation.gallery && invitation.gallery[0]?.imageUrl)) && (
              <div className="relative aspect-[3/4] w-full border border-[#C5A059]/40 shadow-2xl overflow-hidden bg-stone-100">
                <Image
                  src={
                    (invitation.gallery && invitation.gallery[0]?.imageUrl) ||
                    invitation.groomImage ||
                    ''
                  }
                  alt={`${invitation.groomName} & ${invitation.brideName}`}
                  fill
                  className="object-cover grayscale contrast-110 hover:grayscale-0 transition-all duration-700"
                  priority
                />
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 p-4 border border-[#EAE4DC] text-center">
                  <p className="text-xs uppercase tracking-[0.2em] font-mono text-[#141414]">
                    Fig. 01 &bull; {invitation.groomName} &amp; {invitation.brideName}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Minimalist Countdown Section */}
      <section className="py-16 px-6 sm:px-12 max-w-4xl mx-auto border-y border-[#EAE4DC] text-center">
        <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-[#777777] block mb-4">
          Time Until The Vows
        </span>
        <Countdown
          targetDate={invitation.weddingDate}
          targetTime={invitation.weddingTime}
          textColor={primary}
          accentColor={secondary}
        />
      </section>

      {/* The Couple - Editorial Monograph */}
      <section className="py-20 px-6 sm:px-12 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#C5A059] block">
            Diptych
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-light mt-1">The Protagonists</h2>
          <div className="w-12 h-[1px] bg-[#C5A059] mx-auto mt-4"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Groom Profile */}
          <div className="p-8 border border-[#EAE4DC] bg-white flex flex-col justify-between">
            {invitation.groomImage ? (
              <div className="relative aspect-[4/5] w-full mb-6 overflow-hidden bg-stone-100 border border-[#EAE4DC]">
                <Image src={invitation.groomImage} alt="Groom" fill className="object-cover" />
              </div>
            ) : null}
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#C5A059] block">
                The Groom
              </span>
              <h3 className="text-2xl font-serif font-light text-[#141414] mt-1 mb-2">
                {invitation.groomName}
              </h3>
              {invitation.groomParents && (
                <p className="text-xs font-serif italic text-stone-500 mb-3">{invitation.groomParents}</p>
              )}
              {invitation.groomDescription && (
                <p className="text-xs text-stone-600 leading-relaxed font-serif pt-2 border-t border-[#EAE4DC]">
                  {invitation.groomDescription}
                </p>
              )}
            </div>
          </div>

          {/* Bride Profile */}
          <div className="p-8 border border-[#EAE4DC] bg-white flex flex-col justify-between">
            {invitation.brideImage ? (
              <div className="relative aspect-[4/5] w-full mb-6 overflow-hidden bg-stone-100 border border-[#EAE4DC]">
                <Image src={invitation.brideImage} alt="Bride" fill className="object-cover" />
              </div>
            ) : null}
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#C5A059] block">
                The Bride
              </span>
              <h3 className="text-2xl font-serif font-light text-[#141414] mt-1 mb-2">
                {invitation.brideName}
              </h3>
              {invitation.brideParents && (
                <p className="text-xs font-serif italic text-stone-500 mb-3">{invitation.brideParents}</p>
              )}
              {invitation.brideDescription && (
                <p className="text-xs text-stone-600 leading-relaxed font-serif pt-2 border-t border-[#EAE4DC]">
                  {invitation.brideDescription}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Minimal Itinerary Table */}
      {invitation.events && invitation.events.length > 0 && (
        <section className="py-20 px-6 sm:px-12 max-w-4xl mx-auto border-t border-[#EAE4DC]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#C5A059] block">
                Order Of Events
              </span>
              <h2 className="text-3xl font-serif font-light mt-1">Schedule</h2>
            </div>
            <p className="text-xs font-mono text-[#777777] mt-2 sm:mt-0">
              {invitation.events.length} Ceremonies Recorded
            </p>
          </div>

          <div className="divide-y divide-[#EAE4DC] border-y border-[#EAE4DC]">
            {invitation.events.map((evt, idx) => (
              <div
                key={idx}
                className="py-6 sm:py-8 grid sm:grid-cols-12 gap-4 items-baseline hover:bg-stone-50/50 transition-colors"
              >
                <div className="sm:col-span-3 text-xs font-mono text-[#C5A059]">
                  <span>ACT 0{idx + 1}</span>
                  <p className="text-stone-900 font-bold mt-0.5">{evt.eventTime}</p>
                  <p className="text-[11px] text-[#777777]">{evt.eventDate}</p>
                </div>

                <div className="sm:col-span-6 space-y-1">
                  <h3 className="text-lg font-serif font-medium text-[#141414]">{evt.eventName}</h3>
                  {evt.eventDescription && (
                    <p className="text-xs text-stone-600 font-serif leading-relaxed">
                      {evt.eventDescription}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-3 text-left sm:text-right text-xs font-mono text-[#777777]">
                  <span className="block truncate">{evt.eventVenue}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Gallery Section */}
      {invitation.gallery && invitation.gallery.length > 0 && (
        <section className="py-20 px-6 sm:px-12 max-w-6xl mx-auto border-t border-[#EAE4DC]">
          <div className="text-center mb-12">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#C5A059] block">
              Curated Portfolio
            </span>
            <h2 className="text-3xl font-serif font-light mt-1">Visual Archive</h2>
            <div className="w-12 h-[1px] bg-[#C5A059] mx-auto mt-4"></div>
          </div>

          <GalleryLightbox gallery={invitation.gallery} />
        </section>
      )}

      {/* Venue Section */}
      <section className="py-20 px-6 sm:px-12 max-w-4xl mx-auto border-t border-[#EAE4DC]">
        <div className="p-8 sm:p-12 border border-[#EAE4DC] bg-white text-center">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#C5A059] block mb-2">
            Location Coordinate
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-light text-[#141414] mb-3">
            {invitation.venueName}
          </h2>
          <p className="text-xs font-serif text-stone-600 max-w-md mx-auto mb-8 leading-relaxed">
            {invitation.venueAddress}, {invitation.city}, {invitation.state}, {invitation.country}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            {invitation.googleMapsUrl && (
              <a
                href={invitation.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-[#141414] hover:bg-[#141414] hover:text-white text-xs uppercase tracking-widest font-mono transition-all"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Navigate</span>
              </a>
            )}

            {invitation.contactNumber && (
              <a
                href={`tel:${invitation.contactNumber}`}
                className="inline-flex items-center gap-2 px-6 py-3 border border-[#EAE4DC] hover:border-[#141414] text-xs uppercase tracking-widest font-mono text-stone-800 transition-all"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Concierge</span>
              </a>
            )}

            {invitation.whatsappNumber && (
              <a
                href={`https://wa.me/${invitation.whatsappNumber.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#141414] text-white text-xs uppercase tracking-widest font-mono hover:bg-stone-800 transition-all"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>RSVP</span>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Editorial Colophon Footer */}
      <footer className="py-12 px-6 sm:px-12 border-t border-[#EAE4DC] text-center text-xs font-mono text-[#777777] uppercase tracking-widest">
        <p className="text-sm font-serif font-light text-[#141414] mb-2 normal-case">
          {invitation.groomName} &amp; {invitation.brideName} &bull; MMXXVI
        </p>
        <p className="text-[10px] text-stone-400">VivaahInvites Minimal Luxury</p>
      </footer>
    </div>
  );
}
