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
  Flame,
} from 'lucide-react';

interface TemplateProps {
  invitation: IInvitation;
}

export default function GujaratiTemplate({ invitation }: TemplateProps) {
  const [showWelcome, setShowWelcome] = useState(true);

  const primary = invitation.primaryColor || '#990000'; // Vermilion Red
  const secondary = invitation.secondaryColor || '#D48B1C'; // Turmeric Gold
  const bg = invitation.backgroundColor || '#FFFDF8'; // Auspicious Cream

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
        colors: [primary, secondary, '#E63946', '#F4A261', '#E76F51'],
      });
    } catch {
      // ignore
    }
    setTimeout(() => setShowWelcome(false), 500);
  };

  return (
    <div
      className="min-h-screen text-stone-900 font-sans selection:bg-[#F4A261]/30 selection:text-[#990000] relative overflow-x-hidden"
      style={{ backgroundColor: bg }}
    >
      {/* Auspicious Toran Top Border Strip */}
      <div className="w-full bg-[#990000] text-[#F4A261] py-1 text-center text-xs font-serif font-bold tracking-widest border-b-2 border-[#D48B1C] shadow-sm">
        ॥ ૐ શ્રી ગણેશાય નમઃ ॥ &nbsp;&bull;&nbsp; ॥ જય શ્રી કૃષ્ણ ॥ &nbsp;&bull;&nbsp; ॥ શુભ વિવાહ ॥
      </div>

      {/* Welcome Screen - Traditional Auspicious Patrika */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.88, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              className="relative max-w-lg w-full rounded-[2.5rem] p-8 sm:p-12 text-center shadow-2xl border-4 border-[#D48B1C] bg-gradient-to-b from-[#FFFDF8] via-[#FCF6E9] to-[#F7E7CD] overflow-hidden"
            >
              {/* Kalash & Toran Motif */}
              <div className="w-18 h-18 mx-auto mb-4 rounded-full bg-[#990000] text-[#F4A261] flex items-center justify-center shadow-lg border-2 border-[#D48B1C]">
                <Flame className="w-9 h-9 text-[#F4A261]" />
              </div>

              <p className="text-sm font-serif font-bold text-[#990000] mb-1 tracking-wider">
                ॥ ૐ શ્રી ગણેશાય નમઃ ॥
              </p>
              <p className="text-xs uppercase font-serif tracking-[0.2em] text-[#D48B1C] font-semibold mb-6">
                ગુજરાતી પરંપરાગત લગ્ન કંકોતરી
              </p>

              <h2 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-[#990000] mb-2">
                {invitation.groomName}
                <span className="block text-2xl font-normal italic text-[#D48B1C] my-1">
                  સંગ
                </span>
                {invitation.brideName}
              </h2>

              <p className="text-xs font-serif text-stone-700 italic my-4 px-2">
                પરમ કૃપાળુ પરમાત્માની અસીમ કૃપાથી, અમારા કુળદેવી-દેવતાના આશીર્વાદ સાથે આપનું હાર્દિક સ્વાગત છે.
              </p>

              <p className="text-xs uppercase tracking-widest font-bold text-stone-900 mb-8 font-sans">
                {formattedWeddingDate}
              </p>

              <button
                onClick={handleOpenInvitation}
                className="px-8 py-3.5 rounded-full font-serif font-bold text-white shadow-xl transition-all hover:scale-105 flex items-center justify-center gap-2 mx-auto cursor-pointer border-2 border-[#D48B1C]"
                style={{ backgroundColor: primary }}
              >
                <span>કંકોતરી ખોલો (View Patrika)</span>
                <Sparkles className="w-4 h-4 text-[#F4A261]" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Music Player */}
      <MusicPlayer
        musicUrl={invitation.musicUrl}
        musicTitle={invitation.musicTitle || 'Mangal Dhwani & Shehnai'}
        autoPlay={!showWelcome}
      />

      {/* Decorative Header Banner */}
      <header className="pt-10 pb-4 text-center px-4">
        <div className="max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-[#990000]/10 border border-[#D48B1C] text-xs font-serif font-bold text-[#990000] mb-2">
            <span>🚩</span>
            <span>માંગલિક વિવાહ મહોત્સવ</span>
          </div>
          <p className="text-sm font-serif italic text-[#D48B1C]">
            ॥ વક્રતુંડ મહાકાય સૂર્યકોટિ સમપ્રભ ॥
          </p>
          <div className="flex items-center justify-center gap-3 my-3">
            <span className="h-[2px] w-20 bg-gradient-to-r from-transparent to-[#D48B1C]"></span>
            <span className="text-[#990000] text-xl">卐</span>
            <span className="h-[2px] w-20 bg-gradient-to-l from-transparent to-[#D48B1C]"></span>
          </div>
        </div>
      </header>

      {/* Hero Section - Traditional Gujarati Mandap */}
      <section className="px-4 py-6 max-w-4xl mx-auto text-center">
        <div className="rounded-[3rem] p-6 sm:p-12 bg-white/90 border-4 border-[#D48B1C] shadow-2xl relative">
          <p className="text-xs uppercase tracking-[0.25em] font-serif font-bold text-[#990000] mb-2">
            આનંદ મંગલ લગ્ન સમારંભ
          </p>

          <h1
            className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold tracking-tight mb-4"
            style={{ color: primary }}
          >
            {invitation.groomName}
            <span className="block sm:inline sm:mx-4 text-3xl sm:text-5xl font-serif font-normal italic text-[#D48B1C]">
              સંગ
            </span>
            {invitation.brideName}
          </h1>

          <p className="max-w-xl mx-auto text-stone-700 text-sm sm:text-base leading-relaxed mb-8 font-serif">
            {invitation.description ||
              'બે પવિત્ર પરિવારોનું મંગલ મિલન અને પ્રભુતામાં પગલાં. આપ શ્રી સપરિવાર પધારી વર-કન્યાને આશીર્વાદ આપી શોભા વધારશો.'}
          </p>

          {/* Couple Photo in Ornate Gujarati Arch */}
          {(invitation.groomImage || (invitation.gallery && invitation.gallery[0]?.imageUrl)) && (
            <div className="my-8 max-w-md mx-auto">
              <div className="relative aspect-[4/5] w-full rounded-t-[4rem] rounded-b-2xl overflow-hidden border-4 border-[#D48B1C] shadow-xl">
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
                <div className="absolute inset-0 bg-gradient-to-t from-[#990000]/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white text-center">
                  <p className="text-2xl font-serif font-bold">{invitation.groomName} &amp; {invitation.brideName}</p>
                  <p className="text-xs text-[#F4A261] mt-1 font-sans">{formattedWeddingDate}</p>
                </div>
              </div>
            </div>
          )}

          {/* Date & Muhurat Pill */}
          <div className="inline-flex flex-wrap items-center justify-center gap-4 py-3.5 px-8 rounded-full bg-[#FCF6E9] border-2 border-[#D48B1C] text-xs sm:text-sm text-stone-900 font-serif shadow-xs">
            <span className="flex items-center gap-1.5 font-bold text-[#990000]">
              <Calendar className="w-4 h-4 text-[#D48B1C]" />
              {formattedWeddingDate}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 font-bold text-[#990000]">
              <Clock className="w-4 h-4 text-[#D48B1C]" />
              શુભ મુહૂર્ત: {invitation.weddingTime || '11:15 AM'}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 font-bold text-[#990000]">
              <MapPin className="w-4 h-4 text-[#D48B1C]" />
              {invitation.venueName}, {invitation.city}
            </span>
          </div>
        </div>
      </section>

      {/* Countdown Section */}
      <section className="py-12 px-4 text-center">
        <p className="text-xs uppercase tracking-widest font-serif font-bold text-[#990000] mb-3">
          માંગલિક લગ્ન મુહૂર્ત ગણતરી (Muhurat Countdown)
        </p>
        <Countdown
          targetDate={invitation.weddingDate}
          targetTime={invitation.weddingTime}
          textColor={primary}
          accentColor={secondary}
        />
      </section>

      {/* Family Blessings & Couple Section */}
      <section className="py-16 px-4 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-widest text-[#D48B1C] font-bold">વર અને કન્યા પરિચય</p>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold mt-1" style={{ color: primary }}>
            વર-વધૂ અને પરિવારના આશીર્વાદ
          </h2>
          <div className="w-20 h-1 bg-[#D48B1C] mx-auto mt-3 rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Groom Card */}
          <div className="p-8 rounded-[2.5rem] bg-white border-2 border-[#D48B1C] shadow-lg text-center flex flex-col items-center">
            {invitation.groomImage ? (
              <div className="relative w-44 h-44 rounded-full overflow-hidden border-4 border-[#990000] shadow-md mb-5">
                <Image src={invitation.groomImage} alt="Groom" fill className="object-cover" />
              </div>
            ) : null}
            <span className="px-3 py-1 rounded-full bg-[#FCF6E9] text-xs uppercase tracking-wider font-bold text-[#990000] border border-[#D48B1C]">
              ચિ. વરરાજા (Groom)
            </span>
            <h3 className="text-2xl font-serif font-bold text-[#990000] mt-3 mb-2">
              {invitation.groomName}
            </h3>
            {invitation.groomParents && (
              <p className="text-xs font-serif text-stone-700 italic mb-3">
                સુપુત્ર: {invitation.groomParents}
              </p>
            )}
            {invitation.groomDescription && (
              <p className="text-sm text-stone-600 leading-relaxed mt-auto font-serif">{invitation.groomDescription}</p>
            )}
          </div>

          {/* Bride Card */}
          <div className="p-8 rounded-[2.5rem] bg-white border-2 border-[#D48B1C] shadow-lg text-center flex flex-col items-center">
            {invitation.brideImage ? (
              <div className="relative w-44 h-44 rounded-full overflow-hidden border-4 border-[#990000] shadow-md mb-5">
                <Image src={invitation.brideImage} alt="Bride" fill className="object-cover" />
              </div>
            ) : null}
            <span className="px-3 py-1 rounded-full bg-[#FCF6E9] text-xs uppercase tracking-wider font-bold text-[#990000] border border-[#D48B1C]">
              અ. સૌ. કન્યા (Bride)
            </span>
            <h3 className="text-2xl font-serif font-bold text-[#990000] mt-3 mb-2">
              {invitation.brideName}
            </h3>
            {invitation.brideParents && (
              <p className="text-xs font-serif text-stone-700 italic mb-3">
                સુપુત્રી: {invitation.brideParents}
              </p>
            )}
            {invitation.brideDescription && (
              <p className="text-sm text-stone-600 leading-relaxed mt-auto font-serif">{invitation.brideDescription}</p>
            )}
          </div>
        </div>
      </section>

      {/* Auspicious Gujarati Wedding Itinerary */}
      {invitation.events && invitation.events.length > 0 && (
        <section className="py-16 px-4 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-widest text-[#D48B1C] font-bold">માંગલિક પ્રસંગો</p>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold mt-1" style={{ color: primary }}>
              લગ્ન વિધિ અને ઉત્સવ (Functions)
            </h2>
            <div className="w-20 h-1 bg-[#D48B1C] mx-auto mt-3 rounded-full"></div>
          </div>

          <div className="space-y-6">
            {invitation.events.map((evt, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-[2.5rem] bg-white border-2 border-[#D48B1C] shadow-md hover:border-[#990000] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-6"
              >
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FCF6E9] text-[#990000] text-[11px] font-bold border border-[#D48B1C]">
                    <span>શુભ પ્રસંગ {idx + 1}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#990000]">
                    {evt.eventName}
                  </h3>
                  {evt.eventDescription && (
                    <p className="text-xs sm:text-sm text-stone-700 font-serif leading-relaxed">
                      {evt.eventDescription}
                    </p>
                  )}
                  <p className="text-xs text-stone-600 flex items-center gap-1.5 pt-1">
                    <MapPin className="w-3.5 h-3.5 text-[#D48B1C]" />
                    <span>{evt.eventVenue}</span>
                  </p>
                </div>

                <div className="flex-shrink-0 text-left sm:text-right p-4 rounded-2xl bg-[#FCF6E9] border border-[#D48B1C]">
                  <p className="text-xs uppercase tracking-wider font-bold text-[#990000]">
                    {evt.eventDate}
                  </p>
                  <p className="text-lg font-serif font-bold text-[#D48B1C] mt-0.5">
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
            <p className="text-xs uppercase tracking-widest text-[#D48B1C] font-bold">યાદગાર ક્ષણો</p>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold mt-1" style={{ color: primary }}>
              પ્રી-વેડિંગ સ્મૃતિ ફોટો ગેલેરી
            </h2>
            <div className="w-20 h-1 bg-[#D48B1C] mx-auto mt-3 rounded-full"></div>
          </div>

          <GalleryLightbox gallery={invitation.gallery} />
        </section>
      )}

      {/* Venue & Location Section */}
      <section className="py-16 px-4 max-w-4xl mx-auto">
        <div className="p-8 sm:p-12 rounded-[3rem] bg-white border-4 border-[#D48B1C] shadow-xl text-center">
          <p className="text-xs uppercase tracking-widest font-bold text-[#D48B1C] mb-1">
            લગ્ન સ્થળ (Wedding Venue)
          </p>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#990000] mb-3">
            {invitation.venueName}
          </h2>
          <p className="text-sm font-serif text-stone-700 max-w-lg mx-auto mb-6">
            {invitation.venueAddress}, {invitation.city}, {invitation.state}, {invitation.country}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            {invitation.googleMapsUrl && (
              <a
                href={invitation.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white text-xs font-bold shadow-md hover:scale-105 transition-all border border-[#D48B1C]"
                style={{ backgroundColor: primary }}
              >
                <Navigation className="w-4 h-4 text-[#F4A261]" />
                <span>નકશો જુઓ (Google Maps)</span>
              </a>
            )}

            {invitation.contactNumber && (
              <a
                href={`tel:${invitation.contactNumber}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FCF6E9] text-[#990000] border-2 border-[#D48B1C] text-xs font-bold hover:bg-stone-100 transition-all"
              >
                <Phone className="w-4 h-4 text-[#D48B1C]" />
                <span>સંપર્ક કરો (Call)</span>
              </a>
            )}

            {invitation.whatsappNumber && (
              <a
                href={`https://wa.me/${invitation.whatsappNumber.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366] text-white text-xs font-bold shadow-md hover:scale-105 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>વોટ્સએપ સંદેશ (WhatsApp)</span>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 text-center border-t-2 border-[#D48B1C] bg-[#FCF6E9]">
        <div className="w-8 h-8 mx-auto mb-3 text-[#990000] flex items-center justify-center">
          <Heart className="w-5 h-5 fill-current text-[#990000]" />
        </div>
        <p className="text-base font-serif font-bold text-[#990000]">
          દર્શનાભિલાષી &amp; સ્નેહાધીન પરિવાર
        </p>
        <p className="text-xl font-serif font-bold text-[#D48B1C] mt-1">
          {invitation.groomName} &amp; {invitation.brideName}
        </p>
        <p className="text-[11px] text-stone-500 mt-4 tracking-wider uppercase font-sans">
          Created with VivaahInvites
        </p>
      </footer>
    </div>
  );
}
