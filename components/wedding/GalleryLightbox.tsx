'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { IGalleryItem } from '@/types';

interface GalleryLightboxProps {
  gallery: IGalleryItem[];
}

export default function GalleryLightbox({ gallery }: GalleryLightboxProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (!gallery || gallery.length === 0) return null;

  const sortedGallery = [...gallery].sort((a, b) => a.displayOrder - b.displayOrder);

  const openLightbox = (index: number) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + sortedGallery.length) % sortedGallery.length);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % sortedGallery.length);
  };

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5">
        {sortedGallery.map((item, index) => (
          <div
            key={item._id || index}
            onClick={() => openLightbox(index)}
            className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-stone-100"
          >
            <Image
              src={item.imageUrl}
              alt={item.altText || `Wedding photo ${index + 1}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-108"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="p-2.5 rounded-full bg-white/80 text-stone-900 shadow-md">
                <ZoomIn className="w-5 h-5" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 transition-opacity animate-in fade-in"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            aria-label="Close photo preview"
            className="absolute top-5 right-5 z-50 p-2.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {sortedGallery.length > 1 && (
            <>
              <button
                onClick={prevImage}
                aria-label="Previous photo"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextImage}
                aria-label="Next photo"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          <div
            className="relative max-w-4xl max-h-[85vh] w-full h-[70vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full">
              <Image
                src={sortedGallery[selectedIndex].imageUrl}
                alt={sortedGallery[selectedIndex].altText || 'Wedding photo'}
                fill
                className="object-contain"
                priority
              />
            </div>
            {sortedGallery[selectedIndex].altText && (
              <p className="mt-3 text-sm text-stone-300 text-center font-sans tracking-wide">
                {sortedGallery[selectedIndex].altText}
              </p>
            )}
            <p className="text-xs text-stone-400 mt-1">
              {selectedIndex + 1} of {sortedGallery.length}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
