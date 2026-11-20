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
  Crown,
} from 'lucide-react';

interface TemplateProps {
  invitation: IInvitation;
}

export default function RoyalPalaceTemplate({ invitation }: TemplateProps) {
  const [showWelcome, setShowWelcome] = useState(true);

  const primary = invitation.primaryColor || '#660018'; // Deep Royal Maroon
  const secondary = invitation.secondaryColor || '#C5A059'; // Antique Gold
  const bg = invitation.backgroundColor || '#FAF7F2'; // Royal Palace Ivory

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
        colors: [secondary, primary, '#D4AF37', '#FFF8DC'],
      });
    } catch {
      // ignore
    }
    setTimeout(() => setShowWelcome(false), 600);
  };

  return (
    <div
      className="min-h-screen text-stone-900 font-sans selection:bg-[#C5A059]/30 selection:text-[#660018] relative overflow-x-hidden"
      style={{ backgroundColor: bg }}
    >
      {/* Welcome Screen - Palace Gate Reveal */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/90 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.88, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              className="relative max-w-lg w-full rounded-[2.5rem] p-8 sm:p-12 text-center shadow-2xl border-2 border-[#C5A059] bg-gradient-to-b from-[#FFFDF9] via-[#FAF5EC] to-[#F3E7D3] overflow-hidden"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#660018] text-[#C5A059] flex items-center justify-center shadow-lg border border-[#C5A059]">
                <Crown className="w-8 h-8" />
              </div>

              <p className="text-xs uppercase tracking-[0.3em] font-serif font-bold text-[#660018] mb-1">
                ॥ ॐ श्री गणेशाय नमः ॥
              </p>
              <p className="text-[11px] font-serif italic text-stone-600 mb-6">
                Royal Imperial Wedding Announcement
              </p>

              <h2 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-[#660018] mb-2">
                {invitation.groomName}
                <span className="block text-2xl font-light italic text-[#C5A059] my-1">
                  &amp;
                </span>
                {invitation.brideName}
              </h2>

              <p className="text-xs font-serif text-stone-700 italic my-4">
                Cordially request your presence to grace the auspicious marriage celebrations
              </p>

              <p className="text-xs uppercase tracking-widest font-bold text-stone-900 mb-8 font-sans">
                {formattedWeddingDate}
              </p>

              <button
                onClick={handleOpenInvitation}
                className="px-8 py-3.5 rounded-full font-serif font-semibold text-white shadow-xl transition-all hover:scale-105 flex items-center justify-center gap-2 mx-auto cursor-pointer border border-[#C5A059]"
                style={{ backgroundColor: primary }}
              >
                <span>Enter The Palace</span>
                <Sparkles className="w-4 h-4 text-[#C5A059]" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Music Player */}
      <MusicPlayer
        musicUrl={invitation.musicUrl}
        musicTitle={invitation.musicTitle || 'Imperial Palace Shehnai'}
        autoPlay={!showWelcome}
      />

      {/* Palace Header Banner */}
      <header className="pt-12 pb-6 text-center px-4">
        <div className="max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#660018]/10 border border-[#C5A059] text-xs font-serif font-semibold text-[#660018] mb-3">
            <Crown className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Royal Mandap Celebrations</span>
          </div>
          <h2 className="text-base sm:text-lg font-serif font-bold text-[#660018]">
            ॥ राजसी विवाह निमंत्रण ॥
          </h2>
          <div className="flex items-center justify-center gap-3 my-3">
            <span className="h-[1px] w-20 bg-gradient-to-r from-transparent to-[#C5A059]"></span>
            <span className="text-[#C5A059] text-lg">⚜</span>
            <span className="h-[1px] w-20 bg-gradient-to-l from-transparent to-[#C5A059]"></span>
          </div>
        </div>
      </header>

      {/* Hero Section - Multi-Foil Arched Portrait */}
      <section className="px-4 py-8 max-w-4xl mx-auto text-center">
        <div className="rounded-[3rem] p-6 sm:p-14 bg-white/90 border-2 border-[#C5A059]/70 shadow-2xl relative overflow-hidden">
          <p className="text-xs uppercase tracking-[0.3em] font-serif text-stone-500 mb-2">
            Under The Auspices Of Royalty
          </p>

          <h1
            className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold tracking-tight mb-4"
            style={{ color: primary }}
          >
            {invitation.groomName}
            <span className="block sm:inline sm:mx-4 text-3xl sm:text-5xl font-light italic text-[#C5A059]">
              weds
            </span>
            {invitation.brideName}
          </h1>

          <p className="max-w-xl mx-auto text-stone-600 text-sm sm:text-base leading-relaxed mb-8 font-serif">
            {invitation.description ||
              'We invite you to share in the grandeur of our holy union as two families unite in traditional heritage and celebration.'}
          </p>

          {/* Arched Palace Portrait Frame */}
          {(invitation.groomImage || (invitation.gallery && invitation.gallery[0]?.imageUrl)) && (
            <div className="my-8 max-w-md mx-auto">
              <div className="relative aspect-[4/5] w-full max-h-[480px] rounded-t-[5rem] rounded-b-3xl overflow-hidden border-4 border-[#C5A059] shadow-2xl mx-auto">
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-6 text-white text-center">
                  <p className="text-xl font-serif font-bold">{invitation.groomName} &amp; {invitation.brideName}</p>
                  <p className="text-xs text-stone-300 mt-1">{formattedWeddingDate}</p>
                </div>
              </div>
            </div>
          )}

          <div className="inline-flex flex-wrap items-center justify-center gap-4 py-3 px-8 rounded-full bg-[#FAF5EB] border border-[#C5A059] text-xs sm:text-sm text-stone-900 font-serif shadow-xs">
            <span className="flex items-center gap-1.5 font-medium">
              <Calendar className="w-4 h-4 text-[#660018]" />
              {formattedWeddingDate}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 font-medium">
              <Clock className="w-4 h-4 text-[#660018]" />
              {invitation.weddingTime || '18:00'}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 font-medium">
              <MapPin className="w-4 h-4 text-[#660018]" />
              {invitation.venueName}, {invitation.city}
            </span>
          </div>
        </div>
      </section>

      {/* Countdown Section */}
      <section className="py-12 px-4 text-center">
        <p className="text-xs uppercase tracking-widest font-serif font-bold text-[#660018] mb-3">
          Auspicious Muhurat Countdown
        </p>
        <Countdown
          targetDate={invitation.weddingDate}
          targetTime={invitation.weddingTime}
          textColor={primary}
          accentColor={secondary}
        />
      </section>

      {/* Royal Couple Section */}
      <section className="py-16 px-4 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-widest text-[#660018] font-bold">The Royal Couple</p>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold mt-1" style={{ color: primary }}>
            Bride &amp; Groom
          </h2>
          <div className="w-24 h-0.5 bg-[#C5A059] mx-auto mt-3"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-8 rounded-[2.5rem] bg-white border-2 border-[#C5A059]/60 shadow-lg text-center flex flex-col items-center">
            {invitation.groomImage ? (
              <div className="relative w-44 h-44 rounded-t-full rounded-b-2xl overflow-hidden border-4 border-[#C5A059] shadow-lg mb-5">
                <Image src={invitation.groomImage} alt="Groom" fill className="object-cover" />
              </div>
            ) : null}
            <span className="text-xs uppercase tracking-wider font-bold text-[#660018]">Groom</span>
            <h3 className="text-2xl font-serif font-bold text-[#660018] mt-1 mb-2">
              {invitation.groomName}
            </h3>
            {invitation.groomParents && (
              <p className="text-xs font-serif italic text-stone-600 mb-3">{invitation.groomParents}</p>
            )}
            {invitation.groomDescription && (
              <p className="text-sm text-stone-600 leading-relaxed mt-auto font-serif">{invitation.groomDescription}</p>
            )}
          </div>

          <div className="p-8 rounded-[2.5rem] bg-white border-2 border-[#C5A059]/60 shadow-lg text-center flex flex-col items-center">
            {invitation.brideImage ? (
              <div className="relative w-44 h-44 rounded-t-full rounded-b-2xl overflow-hidden border-4 border-[#C5A059] shadow-lg mb-5">
                <Image src={invitation.brideImage} alt="Bride" fill className="object-cover" />
              </div>
            ) : null}
            <span className="text-xs uppercase tracking-wider font-bold text-[#660018]">Bride</span>
            <h3 className="text-2xl font-serif font-bold text-[#660018] mt-1 mb-2">
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

      {/* Royal Itinerary (Farman / Imperial Decree) */}
      {invitation.events && invitation.events.length > 0 && (
        <section className="py-16 px-4 max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-widest text-[#660018] font-bold">Imperial Farman</p>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold mt-1" style={{ color: primary }}>
              Royal Itinerary
            </h2>
            <div className="w-24 h-0.5 bg-[#C5A059] mx-auto mt-3"></div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {invitation.events.map((evt, idx) => (
              <div
                key={evt._id || idx}
                className="p-6 sm:p-7 rounded-3xl bg-white border border-[#C5A059]/80 shadow-md hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div>
                  {evt.eventImage && (
                    <div className="relative w-full h-44 rounded-2xl overflow-hidden mb-4 shadow">
                      <Image src={evt.eventImage} alt={evt.eventName} fill className="object-cover" />
                    </div>
                  )}
                  <div className="flex items-center justify-between text-xs font-semibold mb-2">
                    <span className="px-3 py-1 rounded-full bg-[#FAF5EB] text-[#660018] border border-[#C5A059]">
                      {evt.eventDate}
                    </span>
                    <span className="flex items-center gap-1 text-stone-600">
                      <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
                      {evt.eventTime}
                    </span>
                  </div>
                  <h3 className="text-xl font-serif font-bold text-[#660018] mb-2">
                    {evt.eventName}
                  </h3>
                  {evt.eventDescription && (
                    <p className="text-sm text-stone-600 leading-relaxed mb-4 font-serif">
                      {evt.eventDescription}
                    </p>
                  )}
                </div>

                <div className="pt-3 border-t border-[#C5A059]/30 flex items-center gap-2 text-xs text-stone-700">
                  <MapPin className="w-4 h-4 text-[#660018]" />
                  <span>{evt.eventVenue}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Palace Venue */}
      <section className="py-16 px-4 max-w-4xl mx-auto text-center">
        <div className="p-8 sm:p-12 rounded-[3rem] bg-white border-2 border-[#C5A059] shadow-xl">
          <p className="text-xs uppercase tracking-widest font-bold text-[#660018] mb-1">
            Royal Palace Destination
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-2 text-[#660018]">
            {invitation.venueName}
          </h2>
          <p className="text-stone-600 text-sm mb-1">{invitation.venueAddress}</p>
          <p className="text-stone-800 font-medium text-sm mb-6">
            {invitation.city}, {invitation.state}, {invitation.country}
          </p>

          {invitation.googleMapsUrl && (
            <a
              href={invitation.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-white text-xs font-semibold shadow-lg hover:scale-105 transition-all border border-[#C5A059]"
              style={{ backgroundColor: primary }}
            >
              <Navigation className="w-4 h-4 text-[#C5A059]" />
              <span>Get Directions to the Palace</span>
            </a>
          )}
        </div>
      </section>

      {/* Gallery */}
      {invitation.gallery && invitation.gallery.length > 0 && (
        <section className="py-16 px-4 max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-serif font-bold text-[#660018]">
              Royal Gallery &amp; Portraits
            </h2>
            <div className="w-20 h-0.5 bg-[#C5A059] mx-auto mt-2"></div>
          </div>
          <GalleryLightbox gallery={invitation.gallery} />
        </section>
      )}

      {/* Footer */}
      <footer className="py-16 px-4 text-center border-t border-[#C5A059]/40 bg-white">
        <Crown className="w-7 h-7 text-[#C5A059] mx-auto mb-2" />
        <h3 className="text-2xl font-serif font-bold text-[#660018] mb-3">
          With Imperial Warmth &amp; Regards
        </h3>
        <p className="text-sm font-serif italic text-stone-600 max-w-md mx-auto mb-6">
          The families eagerly await your gracious presence at the royal ceremonies.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          {invitation.whatsappNumber && (
            <a
              href={`https://wa.me/${invitation.whatsappNumber.replace(/[^0-9]/g, '')}?text=Congratulations!`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 text-white text-xs font-medium shadow hover:scale-105 transition-transform"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Wishes</span>
            </a>
          )}
          {invitation.contactNumber && (
            <a
              href={`tel:${invitation.contactNumber}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#660018] text-white text-xs font-medium shadow hover:scale-105 transition-transform border border-[#C5A059]"
            >
              <Phone className="w-4 h-4 text-[#C5A059]" />
              <span>Call: {invitation.contactNumber}</span>
            </a>
          )}
        </div>
      </footer>
    </div>
  );
}
