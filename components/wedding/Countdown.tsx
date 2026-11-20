'use client';

import React, { useState, useEffect } from 'react';

interface CountdownProps {
  targetDate: string; // YYYY-MM-DD
  targetTime?: string; // HH:mm
  accentColor?: string;
  textColor?: string;
}

export default function Countdown({
  targetDate,
  targetTime = '18:00',
  accentColor = '#D4AF37',
  textColor = '#800020',
}: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isPast: boolean;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const target = new Date(`${targetDate}T${targetTime}:00`);
      const now = new Date();
      const diff = target.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds, isPast: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate, targetTime]);

  const units = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  if (timeLeft.isPast) {
    return (
      <div className="text-center py-4 px-6 rounded-2xl bg-white/80 backdrop-blur border border-[#D4AF37]/40 shadow-sm max-w-md mx-auto">
        <p className="text-lg font-serif italic text-[#800020]">
          The auspicious wedding day has arrived! Together forever.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center gap-3 sm:gap-6 max-w-xl mx-auto">
      {units.map((unit) => (
        <div
          key={unit.label}
          className="flex flex-col items-center justify-center w-18 h-22 sm:w-24 sm:h-28 rounded-2xl bg-white/90 backdrop-blur-md shadow-md border transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          style={{ borderColor: `${accentColor}50` }}
        >
          <span
            className="text-2xl sm:text-4xl font-bold font-serif tracking-tight"
            style={{ color: textColor }}
          >
            {String(unit.value).padStart(2, '0')}
          </span>
          <span className="text-[10px] sm:text-xs uppercase tracking-widest font-semibold mt-1 text-stone-500">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
}
