"use client";

import React, { useRef, useEffect, useState } from "react";
import { Greeting } from "@/lib/data";
import { Play, Volume2, VolumeX, Heart, Sparkles, MessageCircleHeart } from "lucide-react";

interface VideoGalleryProps {
  greetings: Greeting[];
}

function VideoCard({
  greeting,
  isActive,
  onActivate,
}: {
  greeting: Greeting;
  isActive: boolean;
  onActivate: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isInView, setIsInView] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [liked, setLiked] = useState(false);
  const [thumbnailSrc, setThumbnailSrc] = useState<string>(() => {
    return greeting.youtubeId
      ? `https://i.ytimg.com/vi/${greeting.youtubeId}/maxresdefault.jpg`
      : greeting.thumbnail || "/fotos/placeholder-avatar.webp";
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "100px" }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleMouseEnter = () => {
    if (videoRef.current && videoRef.current.paused) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current && !videoRef.current.paused) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        onActivate();
        videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const handleImageError = () => {
    if (greeting.youtubeId && !thumbnailSrc.includes("hqdefault")) {
      setThumbnailSrc(`https://i.ytimg.com/vi/${greeting.youtubeId}/hqdefault.jpg`);
    }
  };

  return (
    <div
      className="group relative rounded-2xl overflow-hidden glass-panel border-[#c9a84c]/20 hover:border-[#c9a84c] transition-all duration-300 shrink-0 w-[85vw] max-w-[340px] md:w-full snap-center shadow-xl flex flex-col justify-between"
      onMouseEnter={greeting.youtubeId ? undefined : handleMouseEnter}
      onMouseLeave={greeting.youtubeId ? undefined : handleMouseLeave}
      onClick={greeting.youtubeId ? undefined : togglePlay}
    >
      {/* ── Si tiene mensaje de texto emotivo (Tarjeta / Carta de Saludo) ── */}
      {greeting.message ? (
        <div className="flex flex-col h-full bg-[#161224]/80">
          {/* Header con foto/avatar y categoría */}
          <div className="relative p-5 pb-4 flex items-center gap-3.5 border-b border-white/5">
            <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#c9a84c]/40 shrink-0 shadow-md">
              <img
                src={greeting.avatar || greeting.thumbnail || "/fotos/placeholder-avatar.webp"}
                alt={greeting.name}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="flex-1 min-w-0">
              <span className="inline-block px-2 py-0.5 rounded-full text-[9px] font-semibold tracking-wider uppercase bg-[#c9a84c]/20 text-[#e8c97a] border border-[#c9a84c]/30 mb-1">
                {greeting.category}
              </span>
              <h3 className="font-serif text-base text-[#f0ead6] truncate">{greeting.name}</h3>
              {greeting.relation && (
                <p className="text-[11px] text-[#8878a0] truncate">{greeting.relation}</p>
              )}
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLiked(!liked);
              }}
              className={`p-2 rounded-full transition-colors cursor-pointer ${
                liked
                  ? "bg-rose-500/20 text-rose-400"
                  : "bg-white/5 text-[#8878a0] hover:text-rose-400"
              }`}
              title="Dejar un corazón"
            >
              <Heart className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
            </button>
          </div>

          {/* Cuerpo del mensaje */}
          <div className="p-5 flex-1 flex flex-col justify-between">
            <div className="relative">
              <MessageCircleHeart className="w-6 h-6 text-[#c9a84c]/20 mb-2" />
              <p className="text-sm text-[#f0ead6]/90 leading-relaxed italic font-serif">
                &ldquo;{greeting.message}&rdquo;
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-[#8878a0]">
              <span className="flex items-center gap-1 text-[#e8c97a]">
                <Sparkles className="w-3 h-3" />
                <span>Te desea lo mejor</span>
              </span>
              <span>🎂 30 Años</span>
            </div>
          </div>
        </div>
      ) : (
        /* ── Caso Video Tradicional (YouTube o Directo) ── */
        <div className="relative w-full aspect-9/16 bg-surface overflow-hidden">
          {greeting.youtubeId ? (
            isActive ? (
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${greeting.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                title={greeting.name}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <button
                type="button"
                onClick={onActivate}
                className="relative w-full h-full block cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-[#c9a84c]"
                aria-label={`Reproducir video de ${greeting.name}`}
              >
                <img
                  src={thumbnailSrc}
                  alt={greeting.name}
                  loading="lazy"
                  decoding="async"
                  onError={handleImageError}
                  className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20 pointer-events-none" />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-14 h-14 rounded-full bg-[#c9a84c]/90 text-[#0d0a14] flex items-center justify-center shadow-2xl backdrop-blur-sm group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 fill-current ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 pointer-events-none">
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-[#c9a84c]/30 text-[#e8c97a] border border-[#c9a84c]/40 mb-1.5 backdrop-blur-xs">
                    {greeting.category}
                  </span>
                  <h3 className="font-serif text-lg text-[#f0ead6] leading-tight drop-shadow-md">
                    {greeting.name}
                  </h3>
                  <p className="text-[11px] text-[#8878a0] mt-0.5">Toca para reproducir</p>
                </div>
              </button>
            )
          ) : (
            <>
              <video
                ref={videoRef}
                poster={greeting.thumbnail}
                loop
                muted={isMuted}
                playsInline
                className="w-full h-full object-cover"
              >
                {isInView && <source src={greeting.videoSrc} type="video/mp4" />}
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 pointer-events-none" />
              <button
                onClick={toggleMute}
                className="absolute top-3 right-3 p-2 rounded-full bg-black/50 text-white/80 hover:text-white backdrop-blur-md transition-colors z-20 cursor-pointer"
                aria-label={isMuted ? "Activar audio" : "Silenciar"}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-14 h-14 rounded-full bg-[#c9a84c]/80 text-[#0d0a14] flex items-center justify-center shadow-xl backdrop-blur-sm group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 fill-current ml-1" />
                  </div>
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 p-4 z-10 pointer-events-none">
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-[#c9a84c]/20 text-[#e8c97a] border border-[#c9a84c]/30 mb-1.5">
                  {greeting.category}
                </span>
                <h3 className="font-serif text-lg text-[#f0ead6] leading-tight">
                  {greeting.name}
                </h3>
                <p className="text-[11px] text-[#8878a0] mt-0.5">Toca para reproducir</p>
              </div>
            </>
          )}
        </div>
      )}

      {/* Pie de tarjeta cuando el iframe está activo */}
      {greeting.youtubeId && isActive && (
        <div className="px-4 py-3 bg-[#161224] flex items-center justify-between border-t border-white/5">
          <div>
            <span className="inline-block px-2 py-0.5 rounded-full text-[9px] font-semibold tracking-wider uppercase bg-[#c9a84c]/20 text-[#e8c97a] border border-[#c9a84c]/30 mb-0.5">
              {greeting.category}
            </span>
            <h3 className="font-serif text-sm text-[#f0ead6] leading-tight">{greeting.name}</h3>
          </div>
          <button
            onClick={() => onActivate()}
            className="text-[11px] text-[#8878a0] hover:text-[#c9a84c] transition-colors underline cursor-pointer"
          >
            Detener
          </button>
        </div>
      )}
    </div>
  );
}

export default function VideoGallery({ greetings }: VideoGalleryProps) {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  if (greetings.length === 0) {
    return (
      <div className="text-center py-16 p-6 rounded-2xl glass-panel-subtle">
        <p className="text-base text-[#8878a0]">
          No encontramos saludos que coincidan con tu búsqueda.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Mobile: CSS Scroll Snap horizontal. Desktop (md+): Grilla de 3 columnas */}
      <div className="flex md:grid md:grid-cols-3 gap-4 sm:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-6 md:pb-0 px-2 -mx-2 scrollbar-none">
        {greetings.map((greeting) => (
          <VideoCard
            key={greeting.id}
            greeting={greeting}
            isActive={activeVideoId === greeting.id}
            onActivate={() =>
              setActiveVideoId((current) => (current === greeting.id ? null : greeting.id))
            }
          />
        ))}
      </div>
    </div>
  );
}
