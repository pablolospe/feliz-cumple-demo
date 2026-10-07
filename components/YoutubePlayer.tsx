"use client";

import React, { useState } from "react";
import { Play } from "lucide-react";

interface YoutubePlayerProps {
  videoId: string;
  title: string;
}

export default function YoutubePlayer({ videoId, title }: YoutubePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden glass-panel border border-gold/30 shadow-2xl bg-surface">
        {isPlaying ? (
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
            title={title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setIsPlaying(true)}
            className="group relative w-full h-full block cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-gold"
            aria-label={`Reproducir ${title}`}
          >
            {/* Portada en máxima definición (1080p) de YouTube */}
            <img
              src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
              alt={title}
              loading="lazy"
              decoding="async"
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.src.includes("hqdefault")) {
                  target.src = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
                }
              }}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />

            {/* Gradiente */}
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-black/30 pointer-events-none" />

            {/* Botón de Play animado */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gold/90 text-bg flex items-center justify-center shadow-2xl backdrop-blur-sm group-hover:scale-110 transition-transform">
                <Play className="w-7 h-7 sm:w-9 sm:h-9 fill-current ml-1" />
              </div>
            </div>

            {/* Título en la parte inferior */}
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 pointer-events-none">
              <h3 className="font-serif text-lg sm:text-2xl text-text leading-tight drop-shadow-md">
                {title}
              </h3>
              <p className="text-xs sm:text-sm text-gold-light mt-1">Toca para reproducir</p>
            </div>
          </button>
        )}
      </div>
    </div>
  );
}
