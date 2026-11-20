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
  Shield,
} from 'lucide-react';

interface TemplateProps {
  invitation: IInvitation;
}

export default function MughalTemplate({ invitation }: TemplateProps) {
  const [showWelcome, setShowWelcome] = useState(true);

  const primary = invitation.primaryColor || '#12372A'; // Imperial Emerald
  const secondary = invitation.secondaryColor || '#C89D42'; // Antique Mughal Gold
  const bg = invitation.backgroundColor || '#FAF8F2'; // Sandstone Ivory

  const formattedWeddingDate = new Date(invitation.weddingDate).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const handleOpenInvitation = () => {
    try {
      confetti({
        particleCount: 110,
        spread: 90,
        origin: { y: 0.6 },
        colors: [secondary, '#12372A', '#D4AF37', '#FFF8DC', '#E9D8A6'],
      });
    } catch {
      // ignore
    }
    setTimeout(() => setShowWelcome(false), 500);
  };

  return (
    <div
      className="min-h-screen text-stone-900 font-sans selection:bg-[#C89D42]/30 selection:text-[#12372A] relative overflow-x-hidden"
      style={{ backgroundColor: bg }}
    >
      {/* Welcome Screen - Grand Mehrab Royal Farman */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.88, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              className="relative max-w-lg w-full rounded-[3rem] p-8 sm:p-12 text-center shadow-2xl border-4 border-[#C89D42] bg-gradient-to-b from-[#FFFDF8] via-[#F7F3E9] to-[#EFE7D5] overflow-hidden"
            >
              {/* Mehrab Emblem */}
              <div className="w-18 h-18 mx-auto mb-4 rounded-full bg-[#12372A] text-[#C89D42] flex items-center justify-center shadow-lg border-2 border-[#C89D42]">
                <Shield className="w-9 h-9 text-[#C89D42]" />
              </div>

              <p className="text-xs uppercase tracking-[0.3em] font-serif font-bold text-[#12372A] mb-1">
                शाही पैग़ाम &bull; Shahi Farman
              </p>
              <p className="text-[11px] font-serif italic text-stone-600 mb-6">
                दास्तान-ए-मोहब्बत &bull; An Imperial Mughal Union
              </p>

              <h2 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-[#12372A] mb-2">
                {invitation.groomName}
                <span className="block text-2xl font-light italic text-[#C89D42] my-1">
                  &amp;
                </span>
                {invitation.brideName}
              </h2>

              <p className="text-xs font-serif text-stone-700 italic my-4 px-2">
                The noble families request the honour of your graceful presence at the royal wedding jashn.
              </p>

              <p className="text-xs uppercase tracking-widest font-bold text-stone-900 mb-8 font-sans">
                {formattedWeddingDate}
              </p>

              <button
                onClick={handleOpenInvitation}
                className="px-8 py-3.5 rounded-full font-serif font-semibold text-white shadow-xl transition-all hover:scale-105 flex items-center justify-center gap-2 mx-auto cursor-pointer border border-[#C89D42]"
                style={{ backgroundColor: primary }}
              >
                <span>Enter The Shahi Darbar</span>
                <Sparkles className="w-4 h-4 text-[#C89D42]" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Music Player */}
      <MusicPlayer
        musicUrl={invitation.musicUrl}
        musicTitle={invitation.musicTitle || 'Mughal Darbari Raag & Santoor'}
        autoPlay={!showWelcome}
      />

      {/* Mughal Heritage Header */}
      <header className="pt-12 pb-6 text-center px-4">
        <div className="max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-[#12372A]/10 border border-[#C89D42] text-xs font-serif font-semibold text-[#12372A] mb-3">
            <Shield className="w-3.5 h-3.5 text-[#C89D42]" />
            <span>Mughal Heritage Celebrations</span>
          </div>
          <h2 className="text-base sm:text-lg font-serif font-bold text-[#12372A]">
            दास्तान-ए-इश्क़ व मुसर्रत
          </h2>
          <div className="flex items-center justify-center gap-3 my-3">
            <span className="h-[1px] w-20 bg-gradient-to-r from-transparent to-[#C89D42]"></span>
            <span className="text-[#C89D42] text-lg">⚜</span>
            <span className="h-[1px] w-20 bg-gradient-to-l from-transparent to-[#C89D42]"></span>
          </div>
        </div>
      </header>

      {/* Hero Section - Multi-Foil Mehrab Arch Frame */}
      <section className="px-4 py-8 max-w-4xl mx-auto text-center">
        <div className="rounded-[3.5rem] p-6 sm:p-14 bg-white/90 border-4 border-[#C89D42]/80 shadow-2xl relative">
          <p className="text-xs uppercase tracking-[0.3em] font-serif text-[#12372A] mb-2 font-bold">
            The Imperial Matrimonial Gathering
          </p>

          <h1
            className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold tracking-tight mb-4"
            style={{ color: primary }}
          >
            {invitation.groomName}
            <span className="block sm:inline sm:mx-4 text-3xl sm:text-5xl font-light italic text-[#C89D42]">
              weds
            </span>
            {invitation.brideName}
          </h1>

          <p className="max-w-xl mx-auto text-stone-700 text-sm sm:text-base leading-relaxed mb-8 font-serif">
            {invitation.description ||
              'With divine blessings and heartfelt rejoicings, two sovereign lineages merge in sacred vows, timeless poetry, and imperial grandeur.'}
          </p>

          {/* Arched Mughal Mehrab Photo Frame */}
          {(invitation.groomImage || (invitation.gallery && invitation.gallery[0]?.imageUrl)) && (
            <div className="my-8 max-w-md mx-auto">
              <div className="relative aspect-[4/5] w-full rounded-t-[5rem] rounded-b-2xl overflow-hidden border-4 border-[#C89D42] shadow-2xl">
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
                <div className="absolute inset-0 bg-gradient-to-t from-[#12372A]/85 via-transparent to-transparent flex flex-col justify-end p-6 text-white text-center">
                  <p className="text-2xl font-serif font-bold text-[#EFE7D5]">{invitation.groomName} &amp; {invitation.brideName}</p>
                  <p className="text-xs text-[#C89D42] mt-1 font-serif">{formattedWeddingDate}</p>
                </div>
              </div>
            </div>
          )}

          <div className="inline-flex flex-wrap items-center justify-center gap-4 py-3 px-8 rounded-full bg-[#F7F3E9] border border-[#C89D42] text-xs sm:text-sm text-stone-900 font-serif shadow-xs">
            <span className="flex items-center gap-1.5 font-bold text-[#12372A]">
              <Calendar className="w-4 h-4 text-[#C89D42]" />
              {formattedWeddingDate}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 font-bold text-[#12372A]">
              <Clock className="w-4 h-4 text-[#C89D42]" />
              {invitation.weddingTime || '18:00'}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 font-bold text-[#12372A]">
              <MapPin className="w-4 h-4 text-[#C89D42]" />
              {invitation.venueName}, {invitation.city}
            </span>
          </div>
        </div>
      </section>

      {/* Countdown Section */}
      <section className="py-12 px-4 text-center">
        <p className="text-xs uppercase tracking-widest font-serif font-bold text-[#12372A] mb-3">
          Countdown To The Imperial Muhurat
        </p>
        <Countdown
          targetDate={invitation.weddingDate}
          targetTime={invitation.weddingTime}
          textColor={primary}
          accentColor={secondary}
        />
      </section>

      {/* The Couple - Shahi Darbar Presentation */}
      <section className="py-16 px-4 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-widest text-[#C89D42] font-bold">The Royal Couple</p>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold mt-1" style={{ color: primary }}>
            Bridegroom &amp; Bride
          </h2>
          <div className="w-24 h-0.5 bg-[#C89D42] mx-auto mt-3"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-8 rounded-[2.5rem] bg-white border-2 border-[#C89D42] shadow-lg text-center flex flex-col items-center">
            {invitation.groomImage ? (
              <div className="relative w-44 h-44 rounded-t-full rounded-b-2xl overflow-hidden border-4 border-[#12372A] shadow-lg mb-5">
                <Image src={invitation.groomImage} alt="Groom" fill className="object-cover" />
              </div>
            ) : null}
            <span className="text-xs uppercase tracking-wider font-bold text-[#C89D42]">The Groom</span>
            <h3 className="text-2xl font-serif font-bold text-[#12372A] mt-1 mb-2">
              {invitation.groomName}
            </h3>
            {invitation.groomParents && (
              <p className="text-xs font-serif italic text-stone-600 mb-3">{invitation.groomParents}</p>
            )}
            {invitation.groomDescription && (
              <p className="text-sm text-stone-600 leading-relaxed mt-auto font-serif">{invitation.groomDescription}</p>
            )}
          </div>

          <div className="p-8 rounded-[2.5rem] bg-white border-2 border-[#C89D42] shadow-lg text-center flex flex-col items-center">
            {invitation.brideImage ? (
              <div className="relative w-44 h-44 rounded-t-full rounded-b-2xl overflow-hidden border-4 border-[#12372A] shadow-lg mb-5">
                <Image src={invitation.brideImage} alt="Bride" fill className="object-cover" />
              </div>
            ) : null}
            <span className="text-xs uppercase tracking-wider font-bold text-[#C89D42]">The Bride</span>
            <h3 className="text-2xl font-serif font-bold text-[#12372A] mt-1 mb-2">
              {invitation.brideName}
            </h3>
            {invitation.brideParents && (
              <p className="text-xs font-serif italic text-stone-600 mb-3">{invitation.brideParents}</p>
            )}
            {invitation.brideDescription && (
              <p className="text-sm text-stone-600 leading-relaxed mt-auto font-serif">{invitation.brideDescription}</p>
            )}
          </div>
        </div>
      </section>

      {/* Mughal Jashn Itinerary */}
      {invitation.events && invitation.events.length > 0 && (
        <section className="py-16 px-4 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-widest text-[#C89D42] font-bold">रस्म-ओ-रिवाज</p>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold mt-1" style={{ color: primary }}>
              शाही जश्न-ए-विवाह (Ceremonies)
            </h2>
            <div className="w-24 h-0.5 bg-[#C89D42] mx-auto mt-3"></div>
          </div>

          <div className="space-y-6">
            {invitation.events.map((evt, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-[2.5rem] bg-white border-2 border-[#C89D42]/60 shadow-sm hover:border-[#12372A] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-6"
              >
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F7F3E9] text-[#12372A] text-[11px] font-semibold uppercase tracking-wider border border-[#C89D42]">
                    <Shield className="w-3 h-3 text-[#C89D42]" />
                    <span>Dastarkhwan &bull; Event {idx + 1}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif font-semibold text-[#12372A]">
                    {evt.eventName}
                  </h3>
                  {evt.eventDescription && (
                    <p className="text-xs sm:text-sm text-stone-600 font-serif leading-relaxed">
                      {evt.eventDescription}
                    </p>
                  )}
                  <p className="text-xs text-stone-500 flex items-center gap-1.5 pt-1">
                    <MapPin className="w-3.5 h-3.5 text-[#C89D42]" />
                    <span>{evt.eventVenue}</span>
                  </p>
                </div>

                <div className="flex-shrink-0 text-left sm:text-right p-4 rounded-2xl bg-[#F7F3E9] border border-[#C89D42]">
                  <p className="text-xs uppercase tracking-wider font-semibold text-[#12372A]">
                    {evt.eventDate}
                  </p>
                  <p className="text-base font-serif font-bold text-[#C89D42] mt-0.5">
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
            <p className="text-xs uppercase tracking-widest text-[#C89D42] font-bold">तस्वीर-ए-खास</p>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold mt-1" style={{ color: primary }}>
              Heritage Photo Gallery
            </h2>
            <div className="w-24 h-0.5 bg-[#C89D42] mx-auto mt-3"></div>
          </div>

          <GalleryLightbox gallery={invitation.gallery} />
        </section>
      )}

      {/* Venue Section */}
      <section className="py-16 px-4 max-w-4xl mx-auto">
        <div className="p-8 sm:p-12 rounded-[3.5rem] bg-white border-4 border-[#C89D42] shadow-xl text-center">
          <p className="text-xs uppercase tracking-widest font-bold text-[#C89D42] mb-1">
            The Royal Palace Venue
          </p>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#12372A] mb-3">
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
                <Navigation className="w-4 h-4 text-[#C89D42]" />
                <span>Mughal Route (Maps)</span>
              </a>
            )}

            {invitation.contactNumber && (
              <a
                href={`tel:${invitation.contactNumber}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#F7F3E9] text-[#12372A] border border-[#C89D42] text-xs font-semibold hover:bg-stone-100 transition-all"
              >
                <Phone className="w-4 h-4 text-[#C89D42]" />
                <span>Royal Helpline</span>
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

      {/* Mughal Footer */}
      <footer className="py-12 px-4 text-center border-t-2 border-[#C89D42] bg-[#F7F3E9]">
        <div className="w-8 h-8 mx-auto mb-3 text-[#12372A] flex items-center justify-center">
          <Heart className="w-5 h-5 fill-current text-[#12372A]" />
        </div>
        <p className="text-base font-serif italic text-stone-700">
          Shahi Dua &amp; Tamanna
        </p>
        <p className="text-xl font-serif font-bold text-[#12372A] mt-1">
          {invitation.groomName} &amp; {invitation.brideName}
        </p>
        <p className="text-[11px] text-stone-500 mt-4 tracking-wider uppercase font-sans">
          Created with VivaahInvites
        </p>
      </footer>
    </div>
  );
}
