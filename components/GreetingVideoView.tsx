"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { isAuthenticated, isSectionUnlocked } from "@/lib/auth";
import { ArrowLeft, Film, Play, RotateCcw, Volume2, VolumeX } from "lucide-react";
import { useDemoSettings } from "@/lib/demo-settings";
import NextSectionCta from "@/components/NextSectionCta";

interface GreetingVideoViewProps {
  sectionId: string;
  videoSrc: string;
  defaultTitle: string;
  defaultBadge: string;
  defaultSubtitle?: string;
}

export default function GreetingVideoView({
  sectionId,
  videoSrc,
  defaultTitle,
  defaultBadge,
  defaultSubtitle = "Video sorpresa",
}: GreetingVideoViewProps) {
  const router = useRouter();
  const { themeConfig } = useDemoSettings();
  const [authorized, setAuthorized] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const themedCopy = themeConfig.sectionCopy[sectionId];

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace("/");
    } else if (!isSectionUnlocked(sectionId)) {
      router.replace("/home");
    } else {
      setAuthorized(true);
    }
  }, [router, sectionId]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleRestart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
  };

  if (!authorized) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-gold border-t-transparent animate-spin" />
      </div>
    );
  }

  const pageTitle = themedCopy?.title || defaultTitle;
  const pageSubtitle = themedCopy?.subtitle || defaultSubtitle;
  const badgeText = themedCopy?.badgeText || defaultBadge;

  return (
    <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-10 flex-1 flex flex-col">
      {/* Cabecera minimalista */}
      <div className="mb-6 flex flex-col items-center text-center">
        <Link
          href="/home"
          className="self-start inline-flex items-center gap-2 text-xs font-medium text-muted hover:text-gold-light bg-surface2/60 hover:bg-surface2 px-3 py-1.5 rounded-full border border-white/10 hover:border-gold/30 transition-all mb-4 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Volver</span>
        </Link>

        <span className="text-[10px] font-bold uppercase tracking-wider text-gold bg-gold/10 px-2.5 py-0.5 rounded-full border border-gold/25 mb-1.5 flex items-center gap-1">
          <Film className="w-3 h-3" />
          <span>{badgeText}</span>
        </span>
        <h1 className="text-2xl sm:text-3xl font-serif text-text">{pageTitle}</h1>
        <p className="text-xs sm:text-sm text-muted mt-0.5">{pageSubtitle}</p>
      </div>

      {/* Reproductor Vertical */}
      <div className="w-full max-w-85 sm:max-w-95 mx-auto my-2">
        <div
          onClick={togglePlay}
          className="group relative aspect-9/16 w-full rounded-2xl overflow-hidden glass-panel border border-gold/40 shadow-2xl bg-black cursor-pointer select-none"
        >
          <video
            ref={videoRef}
            src={videoSrc}
            playsInline
            controls
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
            className="w-full h-full object-cover"
          />

          {/* Botón flotante central de Play cuando está pausado */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 pointer-events-none transition-opacity">
              <div className="w-16 h-16 rounded-full bg-gold text-bg flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform">
                <Play className="w-7 h-7 fill-current ml-1" />
              </div>
            </div>
          )}

          {/* Controles rápidos overlay */}
          <div className="absolute top-3 right-3 flex items-center gap-2 pointer-events-auto">
            <button
              onClick={handleRestart}
              className="p-2 rounded-full bg-black/60 text-white/80 hover:text-white backdrop-blur-md transition-colors cursor-pointer"
              title="Reiniciar video"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={toggleMute}
              className="p-2 rounded-full bg-black/60 text-white/80 hover:text-white backdrop-blur-md transition-colors cursor-pointer"
              title={isMuted ? "Activar audio" : "Silenciar"}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Siguiente parada conectada */}
      <div className="mt-8">
        <NextSectionCta currentSectionId={sectionId} />
      </div>
    </div>
  );
}
