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
  Clapperboard,
  Film,
  Ticket,
} from 'lucide-react';

interface TemplateProps {
  invitation: IInvitation;
}

export default function CinematicTemplate({ invitation }: TemplateProps) {
  const [showWelcome, setShowWelcome] = useState(true);

  const primary = invitation.primaryColor || '#0D0D12'; // Cinema Charcoal
  const secondary = invitation.secondaryColor || '#F5C518'; // Cinema Gold
  const accent = '#E50914'; // Red Carpet Accent
  const bg = invitation.backgroundColor || '#08080B'; // Velvet Dark

  const formattedWeddingDate = new Date(invitation.weddingDate).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const handleOpenInvitation = () => {
    try {
      confetti({
        particleCount: 130,
        spread: 110,
        origin: { y: 0.6 },
        colors: ['#F5C518', '#E50914', '#FFFFFF', '#D4AF37'],
      });
    } catch {
      // ignore
    }
    setTimeout(() => setShowWelcome(false), 500);
  };

  return (
    <div
      className="min-h-screen text-stone-100 font-sans selection:bg-[#F5C518]/30 selection:text-[#F5C518] relative overflow-x-hidden"
      style={{ backgroundColor: bg }}
    >
      {/* 2.39:1 Cinema Letterbox Top Bar */}
      <div className="w-full bg-black py-2 px-6 flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.3em] text-[#F5C518] border-b border-white/10">
        <span className="flex items-center gap-2">
          <Clapperboard className="w-3.5 h-3.5 text-[#E50914]" />
          A Vivaah Studios Motion Picture
        </span>
        <span className="hidden sm:inline">2.39:1 CinemaScope &bull; 4K HDR</span>
      </div>

      {/* Welcome Screen - Movie Title Slate */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.88, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              className="relative max-w-lg w-full rounded-2xl p-8 sm:p-12 text-center shadow-2xl border border-[#F5C518]/40 bg-gradient-to-b from-[#14141A] via-[#0D0D12] to-black overflow-hidden"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-tr from-[#E50914] to-[#F5C518] text-black flex items-center justify-center shadow-lg">
                <Clapperboard className="w-8 h-8 text-black" />
              </div>

              <p className="text-[11px] uppercase tracking-[0.35em] font-mono text-[#F5C518] mb-1">
                Vivaah Studios Presents
              </p>
              <p className="text-xs font-serif italic text-stone-400 mb-6">
                An Epic True Story of Two Souls Destined Together
              </p>

              <h2 className="text-4xl sm:text-6xl font-serif font-black tracking-tight text-white mb-2 uppercase">
                {invitation.groomName}
                <span className="block text-2xl font-serif italic text-[#F5C518] my-1 font-normal lowercase">
                  weds
                </span>
                {invitation.brideName}
              </h2>

              <p className="text-xs font-mono text-stone-300 italic my-4 px-2">
                &ldquo;Some love stories are written in the stars, others are projected across eternity.&rdquo;
              </p>

              <div className="p-3 my-4 rounded-xl border border-white/10 bg-white/5 font-mono text-xs text-[#F5C518]">
                <span>WORLD PREMIERE: </span>
                <span className="font-bold text-white">{formattedWeddingDate}</span>
              </div>

              <button
                onClick={handleOpenInvitation}
                className="w-full py-4 rounded-xl font-mono text-xs uppercase tracking-[0.25em] font-bold text-black shadow-xl transition-all hover:scale-102 flex items-center justify-center gap-2 cursor-pointer mt-4"
                style={{ backgroundColor: secondary }}
              >
                <span>Roll Film &bull; Play Preview</span>
                <Film className="w-4 h-4 text-black" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Music Player */}
      <MusicPlayer
        musicUrl={invitation.musicUrl}
        musicTitle={invitation.musicTitle || 'Original Motion Picture Soundtrack'}
        autoPlay={!showWelcome}
      />

      {/* Hero Section - Theatrical Movie Poster Layout */}
      <section className="px-4 py-12 max-w-5xl mx-auto">
        <div className="rounded-3xl p-6 sm:p-12 border border-white/15 bg-gradient-to-b from-[#14141E] to-[#0A0A0E] shadow-2xl relative overflow-hidden">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/10 border border-[#F5C518]/30 text-[10px] font-mono uppercase tracking-[0.3em] text-[#F5C518]">
              <Film className="w-3 h-3 text-[#E50914]" />
              <span>Feature Presentation</span>
            </div>

            <h1 className="text-5xl sm:text-7xl md:text-8xl font-serif font-black tracking-tight text-white uppercase">
              {invitation.groomName}
              <span className="block text-3xl sm:text-5xl font-serif italic text-[#F5C518] my-2 font-normal lowercase">
                &amp;
              </span>
              {invitation.brideName}
            </h1>

            <p className="max-w-xl mx-auto text-stone-300 text-sm sm:text-base leading-relaxed font-serif italic">
              {invitation.description ||
                'Every scene led up to this premiere. Join us as the credits roll into happily ever after.'}
            </p>
          </div>

          {/* Widescreen Hero Still */}
          {(invitation.groomImage || (invitation.gallery && invitation.gallery[0]?.imageUrl)) && (
            <div className="my-10 max-w-3xl mx-auto">
              <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl">
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
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-end p-6">
                  <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#F5C518]">
                    Production Still No. 001
                  </span>
                  <p className="text-2xl font-serif font-bold text-white">
                    {invitation.groomName} &amp; {invitation.brideName}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Film Metadata Billing Bar */}
          <div className="grid sm:grid-cols-3 gap-4 pt-6 border-t border-white/10 text-center font-mono text-xs">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <span className="text-stone-400 block text-[10px] uppercase tracking-wider">Release Date</span>
              <span className="text-[#F5C518] font-bold mt-0.5 block">{formattedWeddingDate}</span>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <span className="text-stone-400 block text-[10px] uppercase tracking-wider">Showtime</span>
              <span className="text-[#F5C518] font-bold mt-0.5 block">{invitation.weddingTime || '18:00 HRS'}</span>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <span className="text-stone-400 block text-[10px] uppercase tracking-wider">Location / Set</span>
              <span className="text-[#F5C518] font-bold mt-0.5 block">{invitation.venueName}, {invitation.city}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Countdown Section */}
      <section className="py-12 px-4 text-center max-w-4xl mx-auto">
        <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-[#F5C518] block mb-3">
          Countdown To The Red Carpet Premiere
        </span>
        <Countdown
          targetDate={invitation.weddingDate}
          targetTime={invitation.weddingTime}
          textColor={secondary}
          accentColor={accent}
        />
      </section>

      {/* Cast & Crew (Couple Section) */}
      <section className="py-16 px-4 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#F5C518] block">
            Principal Cast
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold mt-1 uppercase text-white">
            Starring Roles
          </h2>
          <div className="w-16 h-0.5 bg-[#F5C518] mx-auto mt-3"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10 text-center flex flex-col items-center">
            {invitation.groomImage ? (
              <div className="relative w-44 h-56 rounded-xl overflow-hidden border border-[#F5C518]/50 shadow-lg mb-5">
                <Image src={invitation.groomImage} alt="Groom" fill className="object-cover" />
              </div>
            ) : null}
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#F5C518]">Leading Man</span>
            <h3 className="text-2xl font-serif font-bold text-white mt-1 mb-2">
              {invitation.groomName}
            </h3>
            {invitation.groomParents && (
              <p className="text-xs font-mono text-stone-400 mb-3">{invitation.groomParents}</p>
            )}
            {invitation.groomDescription && (
              <p className="text-xs text-stone-300 leading-relaxed mt-auto font-serif">{invitation.groomDescription}</p>
            )}
          </div>

          <div className="p-8 rounded-2xl bg-white/5 border border-white/10 text-center flex flex-col items-center">
            {invitation.brideImage ? (
              <div className="relative w-44 h-56 rounded-xl overflow-hidden border border-[#F5C518]/50 shadow-lg mb-5">
                <Image src={invitation.brideImage} alt="Bride" fill className="object-cover" />
              </div>
            ) : null}
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#F5C518]">Leading Lady</span>
            <h3 className="text-2xl font-serif font-bold text-white mt-1 mb-2">
              {invitation.brideName}
            </h3>
            {invitation.brideParents && (
              <p className="text-xs font-mono text-stone-400 mb-3">{invitation.brideParents}</p>
            )}
            {invitation.brideDescription && (
              <p className="text-xs text-stone-300 leading-relaxed mt-auto font-serif">{invitation.brideDescription}</p>
            )}
          </div>
        </div>
      </section>

      {/* Screenplay Acts (Timeline) */}
      {invitation.events && invitation.events.length > 0 && (
        <section className="py-16 px-4 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#F5C518] block">
              The Screenplay
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold mt-1 uppercase text-white">
              Acts &amp; Sequences
            </h2>
            <div className="w-16 h-0.5 bg-[#F5C518] mx-auto mt-3"></div>
          </div>

          <div className="space-y-6">
            {invitation.events.map((evt, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-[#F5C518] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-6"
              >
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#F5C518]/10 text-[#F5C518] text-[10px] font-mono font-bold uppercase tracking-wider border border-[#F5C518]/20">
                    <Film className="w-3 h-3 text-[#E50914]" />
                    <span>SCENE 0{idx + 1}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                    {evt.eventName}
                  </h3>
                  {evt.eventDescription && (
                    <p className="text-xs sm:text-sm text-stone-300 font-serif leading-relaxed">
                      {evt.eventDescription}
                    </p>
                  )}
                  <p className="text-xs text-stone-400 flex items-center gap-1.5 pt-1 font-mono">
                    <MapPin className="w-3.5 h-3.5 text-[#F5C518]" />
                    <span>{evt.eventVenue}</span>
                  </p>
                </div>

                <div className="flex-shrink-0 text-left sm:text-right p-4 rounded-xl bg-black border border-white/10 font-mono">
                  <p className="text-xs uppercase tracking-wider text-[#F5C518]">
                    {evt.eventDate}
                  </p>
                  <p className="text-base font-bold text-white mt-0.5">
                    {evt.eventTime}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Production Stills (Gallery) */}
      {invitation.gallery && invitation.gallery.length > 0 && (
        <section className="py-16 px-4 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#F5C518] block">
              Behind The Scenes
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold mt-1 uppercase text-white">
              Production Stills
            </h2>
            <div className="w-16 h-0.5 bg-[#F5C518] mx-auto mt-3"></div>
          </div>

          <GalleryLightbox gallery={invitation.gallery} />
        </section>
      )}

      {/* VIP Admit One RSVP Ticket */}
      <section className="py-16 px-4 max-w-4xl mx-auto">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#1A1A24] via-[#12121A] to-[#1A1A24] border-2 border-[#F5C518]/50 shadow-2xl text-center relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#E50914] text-white text-[10px] font-mono uppercase tracking-widest font-bold mb-4">
            <Ticket className="w-3.5 h-3.5" />
            <span>VIP All-Access Pass</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2 uppercase">
            {invitation.venueName}
          </h2>
          <p className="text-xs font-mono text-stone-300 max-w-md mx-auto mb-8">
            {invitation.venueAddress}, {invitation.city}, {invitation.state}, {invitation.country}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            {invitation.googleMapsUrl && (
              <a
                href={invitation.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#F5C518] hover:bg-amber-400 text-black text-xs font-mono uppercase tracking-wider font-bold shadow-md hover:scale-105 transition-all"
              >
                <Navigation className="w-4 h-4 text-black" />
                <span>Get Directions</span>
              </a>
            )}

            {invitation.contactNumber && (
              <a
                href={`tel:${invitation.contactNumber}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-mono uppercase tracking-wider transition-all"
              >
                <Phone className="w-4 h-4 text-[#F5C518]" />
                <span>Call Box Office</span>
              </a>
            )}

            {invitation.whatsappNumber && (
              <a
                href={`https://wa.me/${invitation.whatsappNumber.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#25D366] text-white text-xs font-mono uppercase tracking-wider font-bold shadow-md hover:scale-105 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>RSVP on WhatsApp</span>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Cinematic End Credits Footer */}
      <footer className="py-12 px-4 text-center border-t border-white/10 bg-black text-stone-400 font-mono text-xs">
        <div className="w-8 h-8 mx-auto mb-3 text-[#F5C518] flex items-center justify-center">
          <Heart className="w-5 h-5 fill-current text-[#E50914]" />
        </div>
        <p className="text-white font-serif uppercase tracking-widest text-sm mb-1">
          {invitation.groomName} &amp; {invitation.brideName}
        </p>
        <p className="text-[10px] text-stone-500 uppercase tracking-widest">
          Executive Producers: Both Families &bull; Created with VivaahInvites
        </p>
      </footer>
    </div>
  );
}
