'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

interface MusicPlayerProps {
  musicUrl?: string;
  musicTitle?: string;
  autoPlay?: boolean;
}

export default function MusicPlayer({
  musicUrl,
  musicTitle = 'Auspicious Wedding Music',
  autoPlay = false,
}: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current && autoPlay && !hasInteracted) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // Autoplay policy prevented playback, user must click
          setIsPlaying(false);
        });
    }
  }, [autoPlay, hasInteracted]);

  if (!musicUrl) return null;

  const togglePlay = () => {
    setHasInteracted(true);
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((e) => console.log('Audio playback prevented:', e));
    }
  };

  return (
    <>
      <audio ref={audioRef} src={musicUrl} loop preload="auto" />
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        {isPlaying && (
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur shadow-md border border-amber-200/80 text-xs text-stone-700 animate-pulse">
            <Music className="w-3.5 h-3.5 text-amber-600" />
            <span className="font-medium max-w-[150px] truncate">{musicTitle}</span>
          </div>
        )}

        <button
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
          className={`relative p-3.5 rounded-full shadow-2xl transition-all duration-300 transform active:scale-95 ${
            isPlaying
              ? 'bg-amber-600 text-white shadow-amber-500/40 ring-4 ring-amber-300/40 animate-pulse'
              : 'bg-white/90 text-stone-700 shadow-stone-400/30 hover:bg-white'
          }`}
        >
          {isPlaying ? (
            <Volume2 className="w-5 h-5 animate-spin-slow" />
          ) : (
            <VolumeX className="w-5 h-5" />
          )}

          {/* Audio wave indicator */}
          {isPlaying && (
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
            </span>
          )}
        </button>
      </div>
    </>
  );
}
