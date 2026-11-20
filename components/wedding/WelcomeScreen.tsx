'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface WelcomeScreenProps {
  groomName: string;
  brideName: string;
  weddingDate: string;
  onEnter: () => void;
  accentColor?: string;
  primaryColor?: string;
}

export default function WelcomeScreen({
  groomName,
  brideName,
  weddingDate,
  onEnter,
  accentColor = '#D4AF37',
  primaryColor = '#800020',
}: WelcomeScreenProps) {
  const [opening, setOpening] = useState(false);

  const handleOpen = () => {
    setOpening(true);
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: [accentColor, primaryColor, '#FFD700', '#FFFFFF', '#FFB6C1'],
      });
    } catch {
      // ignore
    }
    setTimeout(() => {
      onEnter();
    }, 700);
  };

  const formattedDate = new Date(weddingDate).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-md overflow-y-auto"
      >
        <motion.div
          initial={{ scale: 0.88, y: 25 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="relative max-w-lg w-full rounded-3xl p-8 sm:p-12 text-center shadow-2xl border-2 border-[#D4AF37]/50 overflow-hidden my-auto"
          style={{
            background: 'linear-gradient(150deg, #FFFDF9 0%, #FAF5EC 50%, #F5ECDD 100%)',
          }}
        >
          {/* Traditional Ornate Corners */}
          <div className="absolute top-3 left-3 text-[#D4AF37] select-none text-xl sm:text-2xl font-serif opacity-80">
            ❖
          </div>
          <div className="absolute top-3 right-3 text-[#D4AF37] select-none text-xl sm:text-2xl font-serif opacity-80">
            ❖
          </div>
          <div className="absolute bottom-3 left-3 text-[#D4AF37] select-none text-xl sm:text-2xl font-serif opacity-80">
            ❖
          </div>
          <div className="absolute bottom-3 right-3 text-[#D4AF37] select-none text-xl sm:text-2xl font-serif opacity-80">
            ❖
          </div>

          {/* Auspicious Sanskrit Blessing */}
          <div className="mb-4">
            <p className="text-xs sm:text-sm font-serif text-[#800020] font-semibold tracking-widest uppercase">
              ॥ श्री गणेशाय नमः ॥
            </p>
            <p className="text-[11px] font-serif italic text-stone-600 mt-1 max-w-xs mx-auto leading-relaxed">
              वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ ।<br />
              निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 my-3">
            <span className="h-[1px] w-12 bg-[#D4AF37]/60"></span>
            <span className="text-[#D4AF37] text-sm">⚜</span>
            <span className="h-[1px] w-12 bg-[#D4AF37]/60"></span>
          </div>

          <p className="text-[11px] uppercase tracking-[0.3em] font-semibold text-stone-500 mb-2">
            The Wedding Celebration Of
          </p>

          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight mb-2"
            style={{ color: primaryColor }}
          >
            {groomName}
            <span className="block text-2xl sm:text-3xl font-light italic text-[#D4AF37] my-1">
              &amp;
            </span>
            {brideName}
          </h2>

          <div className="flex items-center justify-center gap-2 my-4">
            <span className="h-[1px] w-10 bg-[#D4AF37]/60"></span>
            <Heart className="w-4 h-4 fill-[#800020] text-[#800020]" />
            <span className="h-[1px] w-10 bg-[#D4AF37]/60"></span>
          </div>

          <p className="text-xs sm:text-sm font-serif italic text-stone-700 mb-1">
            Request the honour of your presence to grace the wedding ceremonies
          </p>

          <p className="font-semibold text-stone-900 not-italic font-sans text-xs uppercase tracking-wider mb-8">
            {formattedDate}
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleOpen}
            disabled={opening}
            className="relative px-8 py-3.5 rounded-full font-serif font-semibold text-white shadow-xl transition-all flex items-center justify-center gap-2 mx-auto cursor-pointer border border-[#D4AF37]/60"
            style={{
              backgroundColor: primaryColor,
              boxShadow: `0 10px 25px -5px ${primaryColor}60`,
            }}
          >
            <span>{opening ? 'Opening Celebration...' : 'Open Invitation'}</span>
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
