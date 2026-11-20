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
  Feather,
} from 'lucide-react';

interface TemplateProps {
  invitation: IInvitation;
}

export default function PeacockTemplate({ invitation }: TemplateProps) {
  const [showWelcome, setShowWelcome] = useState(true);

  const primary = invitation.primaryColor || '#0B2545'; // Peacock Navy
  const secondary = invitation.secondaryColor || '#D4AF37'; // Shimmering Gold
  const accent = '#00A896'; // Peacock Turquoise / Teal
  const bg = invitation.backgroundColor || '#081726'; // Deep Jewel Midnight

  const formattedWeddingDate = new Date(invitation.weddingDate).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const handleOpenInvitation = () => {
    try {
      confetti({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#00A896', '#028090', '#D4AF37', '#F0F3F4', '#0B2545'],
      });
    } catch {
      // ignore
    }
    setTimeout(() => setShowWelcome(false), 500);
  };

  return (
    <div
      className="min-h-screen text-stone-100 font-sans selection:bg-[#00A896]/30 selection:text-[#E5B869] relative overflow-x-hidden"
      style={{ backgroundColor: bg }}
    >
      {/* Welcome Screen - Peacock Feather Crest Reveal */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.88, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              className="relative max-w-lg w-full rounded-[3rem] p-8 sm:p-12 text-center shadow-2xl border-2 border-[#D4AF37] bg-gradient-to-b from-[#0D2947] via-[#091E35] to-[#05111E] overflow-hidden"
            >
              {/* Peacock Feather Crest */}
              <div className="w-18 h-18 mx-auto mb-4 rounded-full bg-gradient-to-tr from-[#028090] to-[#00A896] text-[#D4AF37] flex items-center justify-center shadow-lg border-2 border-[#D4AF37]">
                <Feather className="w-9 h-9 text-[#D4AF37] rotate-45" />
              </div>

              <p className="text-xs uppercase tracking-[0.3em] font-serif font-bold text-[#00A896] mb-1">
                ॥ ॐ श्री गणेशाय नमः ॥
              </p>
              <p className="text-[11px] font-serif italic text-stone-300 mb-6">
                Royal Peacock Splendour &bull; Wedding Celebration
              </p>

              <h2 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-[#E5B869] mb-2">
                {invitation.groomName}
                <span className="block text-2xl font-light italic text-[#00A896] my-1">
                  &amp;
                </span>
                {invitation.brideName}
              </h2>

              <p className="text-xs font-serif text-stone-300 italic my-4 px-2">
                Request your esteemed presence as they pledge eternal love under celestial blessings
              </p>

              <p className="text-xs uppercase tracking-widest font-bold text-stone-200 mb-8 font-sans">
                {formattedWeddingDate}
              </p>

              <button
                onClick={handleOpenInvitation}
                className="px-8 py-3.5 rounded-full font-serif font-semibold text-[#081726] shadow-xl transition-all hover:scale-105 flex items-center justify-center gap-2 mx-auto cursor-pointer border border-[#E5B869]"
                style={{ backgroundColor: secondary }}
              >
                <span>Enter The Royal Celebration</span>
                <Sparkles className="w-4 h-4 text-[#0B2545]" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Music Player */}
      <MusicPlayer
        musicUrl={invitation.musicUrl}
        musicTitle={invitation.musicTitle || 'Mayura Raag & Sitar'}
        autoPlay={!showWelcome}
      />

      {/* Header Banner */}
      <header className="pt-12 pb-6 text-center px-4">
        <div className="max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00A896]/15 border border-[#D4AF37]/50 text-xs font-serif font-semibold text-[#00A896] mb-3">
            <Feather className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Peacock Elegance &bull; Royal Vows</span>
          </div>
          <h2 className="text-base sm:text-lg font-serif font-bold text-[#D4AF37]">
            ॥ मयूर पंख सम प्रेम बंधन ॥
          </h2>
          <div className="flex items-center justify-center gap-3 my-3">
            <span className="h-[1px] w-20 bg-gradient-to-r from-transparent to-[#D4AF37]"></span>
            <span className="text-[#00A896] text-lg">🪶</span>
            <span className="h-[1px] w-20 bg-gradient-to-l from-transparent to-[#D4AF37]"></span>
          </div>
        </div>
      </header>

      {/* Hero Section - Jewel-Toned Arched Silhouette */}
      <section className="px-4 py-8 max-w-4xl mx-auto text-center">
        <div className="rounded-[3.5rem] p-6 sm:p-14 bg-gradient-to-b from-[#0D2845]/90 to-[#07192C]/90 border-2 border-[#D4AF37]/60 shadow-2xl relative overflow-hidden backdrop-blur-sm">
          <p className="text-xs uppercase tracking-[0.3em] font-serif text-[#00A896] mb-2 font-semibold">
            Together With Our Respected Families
          </p>

          <h1
            className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold tracking-tight mb-4"
            style={{ color: secondary }}
          >
            {invitation.groomName}
            <span className="block sm:inline sm:mx-4 text-3xl sm:text-5xl font-light italic text-[#00A896]">
              weds
            </span>
            {invitation.brideName}
          </h1>

          <p className="max-w-xl mx-auto text-stone-300 text-sm sm:text-base leading-relaxed mb-8 font-serif">
            {invitation.description ||
              'Like the majestic dance of peacocks at the arrival of rain, our hearts rejoice in pure joy as we embark upon this sacred union.'}
          </p>

          {/* Jewel-Rimmed Couple Portrait */}
          {(invitation.groomImage || (invitation.gallery && invitation.gallery[0]?.imageUrl)) && (
            <div className="my-8 max-w-md mx-auto">
              <div className="relative aspect-[4/5] w-full rounded-t-[5rem] rounded-b-3xl overflow-hidden border-4 border-[#D4AF37] shadow-2xl shadow-[#00A896]/20">
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
                <div className="absolute inset-0 bg-gradient-to-t from-[#07192C]/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white text-center">
                  <p className="text-2xl font-serif font-bold text-[#E5B869]">{invitation.groomName} &amp; {invitation.brideName}</p>
                  <p className="text-xs text-stone-300 mt-1">{formattedWeddingDate}</p>
                </div>
              </div>
            </div>
          )}

          <div className="inline-flex flex-wrap items-center justify-center gap-4 py-3 px-8 rounded-full bg-[#051627] border border-[#D4AF37]/50 text-xs sm:text-sm text-stone-200 font-serif shadow-xs">
            <span className="flex items-center gap-1.5 font-medium">
              <Calendar className="w-4 h-4 text-[#D4AF37]" />
              {formattedWeddingDate}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 font-medium">
              <Clock className="w-4 h-4 text-[#00A896]" />
              {invitation.weddingTime || '18:00'}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 font-medium">
              <MapPin className="w-4 h-4 text-[#D4AF37]" />
              {invitation.venueName}, {invitation.city}
            </span>
          </div>
        </div>
      </section>

      {/* Countdown Section */}
      <section className="py-12 px-4 text-center">
        <p className="text-xs uppercase tracking-widest font-serif font-bold text-[#00A896] mb-3">
          Auspicious Muhurat Countdown
        </p>
        <Countdown
          targetDate={invitation.weddingDate}
          targetTime={invitation.weddingTime}
          textColor={secondary}
          accentColor={accent}
        />
      </section>

      {/* Royal Couple Section */}
      <section className="py-16 px-4 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-widest text-[#00A896] font-bold">The Royal Pair</p>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold mt-1 text-[#E5B869]">
            Groom &amp; Bride
          </h2>
          <div className="w-24 h-0.5 bg-[#D4AF37] mx-auto mt-3"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-8 rounded-[2.5rem] bg-[#0A223B]/80 border border-[#D4AF37]/50 shadow-xl text-center flex flex-col items-center">
            {invitation.groomImage ? (
              <div className="relative w-44 h-44 rounded-full overflow-hidden border-4 border-[#00A896] ring-2 ring-[#D4AF37] shadow-lg mb-5">
                <Image src={invitation.groomImage} alt="Groom" fill className="object-cover" />
              </div>
            ) : null}
            <span className="text-xs uppercase tracking-wider font-bold text-[#00A896]">The Groom</span>
            <h3 className="text-2xl font-serif font-bold text-[#E5B869] mt-1 mb-2">
              {invitation.groomName}
            </h3>
            {invitation.groomParents && (
              <p className="text-xs font-serif italic text-stone-300 mb-3">{invitation.groomParents}</p>
            )}
            {invitation.groomDescription && (
              <p className="text-sm text-stone-300 leading-relaxed mt-auto font-serif">{invitation.groomDescription}</p>
            )}
          </div>

          <div className="p-8 rounded-[2.5rem] bg-[#0A223B]/80 border border-[#D4AF37]/50 shadow-xl text-center flex flex-col items-center">
            {invitation.brideImage ? (
              <div className="relative w-44 h-44 rounded-full overflow-hidden border-4 border-[#00A896] ring-2 ring-[#D4AF37] shadow-lg mb-5">
                <Image src={invitation.brideImage} alt="Bride" fill className="object-cover" />
              </div>
            ) : null}
            <span className="text-xs uppercase tracking-wider font-bold text-[#00A896]">The Bride</span>
            <h3 className="text-2xl font-serif font-bold text-[#E5B869] mt-1 mb-2">
              {invitation.brideName}
            </h3>
            {invitation.brideParents && (
              <p className="text-xs font-serif italic text-stone-300 mb-3">{invitation.brideParents}</p>
            )}
            {invitation.brideDescription && (
              <p className="text-sm text-stone-300 leading-relaxed mt-auto font-serif">{invitation.brideDescription}</p>
            )}
          </div>
        </div>
      </section>

      {/* Jewel-Tone Itinerary */}
      {invitation.events && invitation.events.length > 0 && (
        <section className="py-16 px-4 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-widest text-[#00A896] font-bold">Royal Festivities</p>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold mt-1 text-[#E5B869]">
              Wedding Ceremonies
            </h2>
            <div className="w-24 h-0.5 bg-[#D4AF37] mx-auto mt-3"></div>
          </div>

          <div className="space-y-6">
            {invitation.events.map((evt, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-[2.5rem] bg-[#0A223B]/80 border border-[#D4AF37]/40 shadow-lg hover:border-[#00A896] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-6"
              >
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00A896]/20 text-[#00A896] text-[11px] font-semibold uppercase tracking-wider border border-[#00A896]/40">
                    <Feather className="w-3 h-3 text-[#D4AF37]" />
                    <span>Ceremony {idx + 1}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif font-semibold text-[#E5B869]">
                    {evt.eventName}
                  </h3>
                  {evt.eventDescription && (
                    <p className="text-xs sm:text-sm text-stone-300 font-serif leading-relaxed">
                      {evt.eventDescription}
                    </p>
                  )}
                  <p className="text-xs text-stone-400 flex items-center gap-1.5 pt-1">
                    <MapPin className="w-3.5 h-3.5 text-[#00A896]" />
                    <span>{evt.eventVenue}</span>
                  </p>
                </div>

                <div className="flex-shrink-0 text-left sm:text-right p-4 rounded-2xl bg-[#051627] border border-[#D4AF37]/30">
                  <p className="text-xs uppercase tracking-wider font-semibold text-[#00A896]">
                    {evt.eventDate}
                  </p>
                  <p className="text-base font-serif font-bold text-[#E5B869] mt-0.5">
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
            <p className="text-xs uppercase tracking-widest text-[#00A896] font-bold">Jeweled Keepsakes</p>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold mt-1 text-[#E5B869]">
              Gallery
            </h2>
            <div className="w-24 h-0.5 bg-[#D4AF37] mx-auto mt-3"></div>
          </div>

          <GalleryLightbox gallery={invitation.gallery} />
        </section>
      )}

      {/* Venue Section */}
      <section className="py-16 px-4 max-w-4xl mx-auto">
        <div className="p-8 sm:p-12 rounded-[3.5rem] bg-[#0A223B]/90 border-2 border-[#D4AF37]/60 shadow-2xl text-center">
          <p className="text-xs uppercase tracking-widest font-bold text-[#00A896] mb-1">
            Celebration Venue
          </p>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#E5B869] mb-3">
            {invitation.venueName}
          </h2>
          <p className="text-sm font-serif text-stone-300 max-w-lg mx-auto mb-6">
            {invitation.venueAddress}, {invitation.city}, {invitation.state}, {invitation.country}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            {invitation.googleMapsUrl && (
              <a
                href={invitation.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[#081726] text-xs font-bold shadow-md hover:scale-105 transition-all"
                style={{ backgroundColor: secondary }}
              >
                <Navigation className="w-4 h-4" />
                <span>Google Maps</span>
              </a>
            )}

            {invitation.contactNumber && (
              <a
                href={`tel:${invitation.contactNumber}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#051627] text-[#00A896] border border-[#00A896] text-xs font-semibold hover:bg-[#081726] transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>Call Helpline</span>
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

      {/* Royal Footer */}
      <footer className="py-12 px-4 text-center border-t border-[#D4AF37]/30 bg-[#05111E]">
        <div className="w-8 h-8 mx-auto mb-3 text-[#D4AF37] flex items-center justify-center">
          <Heart className="w-5 h-5 fill-current text-[#D4AF37]" />
        </div>
        <p className="text-base font-serif italic text-stone-300">
          With Blessings &amp; Honour
        </p>
        <p className="text-xl font-serif font-bold text-[#E5B869] mt-1">
          {invitation.groomName} &amp; {invitation.brideName}
        </p>
        <p className="text-[11px] text-stone-500 mt-4 tracking-wider uppercase font-sans">
          Created with VivaahInvites
        </p>
      </footer>
    </div>
  );
}
