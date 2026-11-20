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
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    // Fire celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: [accentColor, primaryColor, '#FFD700', '#FF69B4'],
      });
    } catch {
      // ignore
    }
    setTimeout(() => {
      onEnter();
    }, 600);
  };

  const formattedDate = new Date(weddingDate).toLocaleDateString('en-US', {
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
        transition={{ duration: 0.6 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/90 backdrop-blur-md"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          className="relative max-w-lg w-full rounded-3xl p-8 sm:p-12 text-center shadow-2xl border border-amber-300/40 overflow-hidden"
          style={{
            background: 'linear-gradient(145deg, #FFFDF9 0%, #FBF6EE 100%)',
          }}
        >
          {/* Decorative Corner Ornaments */}
          <div className="absolute top-3 left-3 text-amber-500/40 select-none text-2xl font-serif">❖</div>
          <div className="absolute top-3 right-3 text-amber-500/40 select-none text-2xl font-serif">❖</div>
          <div className="absolute bottom-3 left-3 text-amber-500/40 select-none text-2xl font-serif">❖</div>
          <div className="absolute bottom-3 right-3 text-amber-500/40 select-none text-2xl font-serif">❖</div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center shadow-inner"
            style={{ backgroundColor: `${accentColor}25` }}
          >
            <Sparkles className="w-8 h-8" style={{ color: accentColor }} />
          </motion.div>

          <p className="text-xs uppercase tracking-[0.3em] font-semibold text-stone-500 mb-2">
            Wedding Invitation
          </p>

          <h2
            className="text-3xl sm:text-4xl font-serif font-bold tracking-tight mb-3"
            style={{ color: primaryColor }}
          >
            {groomName} &amp; {brideName}
          </h2>

          <div className="flex items-center justify-center gap-3 my-4">
            <span className="h-[1px] w-12 bg-amber-300"></span>
            <Heart className="w-4 h-4 fill-amber-500 text-amber-500" />
            <span className="h-[1px] w-12 bg-amber-300"></span>
          </div>

          <p className="text-sm font-serif italic text-stone-600 mb-8">
            Request the honour of your gracious presence
            <br />
            <span className="font-semibold text-stone-800 not-italic font-sans text-xs uppercase tracking-wider mt-1 block">
              {formattedDate}
            </span>
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleOpen}
            className="relative px-8 py-3.5 rounded-full font-serif font-semibold text-white shadow-xl transition-all flex items-center justify-center gap-2 mx-auto cursor-pointer"
            style={{
              backgroundColor: primaryColor,
              boxShadow: `0 10px 25px -5px ${primaryColor}60`,
            }}
          >
            <span>Open Invitation</span>
            <Sparkles className="w-4 h-4 text-amber-300" />
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
