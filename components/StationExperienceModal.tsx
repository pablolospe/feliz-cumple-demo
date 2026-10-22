"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Sparkles, AlertCircle, ArrowLeft, Play, RotateCcw, Volume2, VolumeX, CheckCircle2 } from "lucide-react";
import confetti from "canvas-confetti";
import PhotoGallery from "@/components/PhotoGallery";
import { SAMPLE_PHOTOS } from "@/lib/data";

interface StationExperienceModalProps {
  sectionId: string;
  sectionTitle: string;
  badgeText: string;
  subtitle?: string;
  question: string;
  hint?: string;
  exampleAnswer?: string;
  isAlreadyUnlocked: boolean;
  onValidate: (answer: string) => boolean;
  onUnlockSuccess: () => void;
  onClose: () => void;
  onGoNext?: () => void;
  hasNext?: boolean;
  nextTitle?: string;
  /** Rectángulo de la tarjeta tocada: el modal nace desde ahí y vuelve ahí al cerrar */
  originRect?: DOMRect | null;
}

export default function StationExperienceModal({
  sectionId,
  sectionTitle,
  badgeText,
  subtitle,
  question,
  hint,
  exampleAnswer,
  isAlreadyUnlocked,
  onValidate,
  onUnlockSuccess,
  onClose,
  onGoNext,
  hasNext,
  nextTitle,
  originRect,
}: StationExperienceModalProps) {
  // Estado: si ya estaba desbloqueada entra directo a 'content', si no entra a 'question'
  const [step, setStep] = useState<"question" | "content">(
    isAlreadyUnlocked ? "content" : "question"
  );
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState(false);
  const [isSuccessAnim, setIsSuccessAnim] = useState(false);

  // Video controls para secciones con video
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Fases de la animación: "origin" (tamaño de la tarjeta) -> "question" -> "content"
  const [phase, setPhase] = useState<"origin" | "question" | "content">("origin");
  const [viewport, setViewport] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const update = () => setViewport({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Al montar: un frame en el rect de la tarjeta y luego crece a su tamaño real
  useEffect(() => {
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setPhase(step));
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Cuando se responde bien, el recuadro crece de pregunta a contenido
  useEffect(() => {
    if (step === "content") setPhase("content");
  }, [step]);

  const handleClose = useCallback(() => {
    setPhase("origin");
    setTimeout(onClose, 550);
  }, [onClose]);

  const getRect = () => {
    const { w, h } = viewport;
    const centered = (width: number, height: number) => ({
      left: (w - width) / 2,
      top: (h - height) / 2,
      width,
      height,
    });
    if (phase === "question") return centered(Math.min(512, w - 24), Math.min(400, h - 24));
    if (phase === "content") {
      const maxW = sectionId === "fotos" ? 1024 : 640;
      return centered(Math.min(maxW, w - 24), Math.min(h * 0.92, 820));
    }
    if (originRect) {
      return { left: originRect.left, top: originRect.top, width: originRect.width, height: originRect.height };
    }
    const base = centered(Math.min(512, w - 24) * 0.7, 160);
    return base;
  };

  const rect = getRect();
  const showInner = phase !== "origin";

  const videoSources: Record<string, string> = {
    saludo1: "/videos/saludos/saludo-2.mp4",
    saludo2: "/videos/saludos/saludo-1.mp4",
    saludo3: "/videos/saludos/saludo-3.mp4",
    saludo4: "/videos/saludos/saludo-padres.mp4",
  };

  const currentVideoSrc = videoSources[sectionId];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!answer.trim()) return;

    if (onValidate(answer)) {
      setIsSuccessAnim(true);
      setError(false);

      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.5 },
        colors: ["#c9a84c", "#e8c97a", "#e8a0b0", "#ffffff"],
      });

      onUnlockSuccess();

      // Animación suave de transición al contenido del video/galería
      setTimeout(() => {
        setIsSuccessAnim(false);
        setStep("content");
      }, 700);
    } else {
      setError(true);
      setTimeout(() => setError(false), 800);
    }
  };

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

  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-500 ${
        showInner ? "bg-black/35 backdrop-blur-[3px]" : "bg-black/0 backdrop-blur-none"
      }`}
      onClick={handleClose}
    >
      {/* Recuadro único que se agranda: tarjeta -> pregunta -> video. El mapa queda visible detrás */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          left: rect.left,
          top: rect.top,
          width: rect.width,
          height: rect.height,
          background: "color-mix(in srgb, var(--app-glass-bg) 78%, transparent)",
        }}
        className={`absolute rounded-3xl glass-panel shadow-2xl border border-gold/30 flex flex-col overflow-hidden transition-[left,top,width,height,box-shadow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          error ? "animate-shake border-red-500/50" : ""
        } ${isSuccessAnim ? "border-gold glow-gold" : ""}`}
      >
        <div
          className={`flex-1 min-h-0 flex flex-col p-5 sm:p-7 transition-opacity duration-500 ${
            showInner ? "opacity-100 delay-200" : "opacity-0"
          }`}
        >
          {/* Barra superior: solo Volver con flecha + insignia */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 shrink-0">
            <button
              onClick={handleClose}
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted hover:text-gold-light transition-colors cursor-pointer group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
              <span>Volver</span>
            </button>
            <span className="text-[10px] uppercase font-bold tracking-widest text-gold bg-gold/15 px-2.5 py-0.5 rounded-full border border-gold/30">
              {badgeText}
            </span>
          </div>

          {/* ── PASO 1: CONSULTA / PREGUNTA ───────────────────── */}
          {step === "question" && (
            <div className="flex-1 flex flex-col justify-center text-center animate-fadeIn">
              <h2 className="text-xl sm:text-2xl font-serif text-text leading-relaxed">{question}</h2>
              {hint && <p className="text-xs text-muted mt-2 italic">Pista: {hint}</p>}

              <form onSubmit={handleSubmit} className="space-y-4 mt-6">
                <input
                  type="text"
                  value={answer}
                  onChange={(e) => {
                    setAnswer(e.target.value);
                    if (error) setError(false);
                  }}
                  placeholder={exampleAnswer ? `Ej: ${exampleAnswer}...` : "Escribí tu respuesta acá..."}
                  autoFocus
                  className="w-full px-4 py-3 bg-bg/90 border border-gold/30 rounded-xl text-text placeholder-muted/50 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all text-center text-base"
                />

                {error && (
                  <div className="flex items-center justify-center gap-2 text-sm text-red-400">
                    <AlertCircle className="w-4 h-4" />
                    <span>Probá con &quot;{exampleAnswer || "otra opción"}&quot;</span>
                  </div>
                )}

                {isSuccessAnim && (
                  <div className="flex items-center justify-center gap-2 text-sm text-gold-light animate-fadeIn">
                    <Sparkles className="w-4 h-4 animate-spin" />
                    <span>¡Correcto! Desbloqueando estación...</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSuccessAnim || !answer.trim()}
                  className="w-full py-3 px-4 rounded-xl bg-linear-to-r from-gold to-gold-light text-bg font-semibold text-sm shadow-md shadow-gold/20 hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-60 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{isSuccessAnim ? "¡Desbloqueando!" : "Desbloquear"}</span>
                </button>
              </form>
            </div>
          )}

          {/* ── PASO 2: CONTENIDO EXPANDIDO (VIDEO O GALERÍA) ─────────────── */}
          {step === "content" && (
            <div className="flex-1 min-h-0 flex flex-col overflow-y-auto pr-1 animate-fadeIn">
              <div className="text-center mb-4 shrink-0">
                <h2 className="text-2xl sm:text-3xl font-serif text-text">{sectionTitle}</h2>
                {subtitle && <p className="text-xs sm:text-sm text-muted mt-0.5">{subtitle}</p>}
              </div>

              {currentVideoSrc && (
                <div className="w-full max-w-[300px] sm:max-w-[330px] mx-auto my-1 shrink-0">
                  <div
                    onClick={togglePlay}
                    className="group relative aspect-9/16 w-full rounded-2xl overflow-hidden glass-panel border border-gold/40 shadow-2xl bg-black cursor-pointer select-none"
                  >
                    <video
                      ref={videoRef}
                      src={currentVideoSrc}
                      playsInline
                      controls
                      autoPlay
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                      onEnded={() => setIsPlaying(false)}
                      className="w-full h-full object-cover"
                    />

                    {!isPlaying && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 pointer-events-none transition-opacity">
                        <div className="w-16 h-16 rounded-full bg-gold text-bg flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform">
                          <Play className="w-7 h-7 fill-current ml-1" />
                        </div>
                      </div>
                    )}

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
              )}

              {sectionId === "fotos" && (
                <div className="w-full my-2">
                  <PhotoGallery photos={SAMPLE_PHOTOS} />
                </div>
              )}

              <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-end gap-3 shrink-0">
                {hasNext && onGoNext ? (
                  <button
                    onClick={onGoNext}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gold text-bg font-semibold text-xs uppercase tracking-wider hover:brightness-110 transition-all cursor-pointer shadow-md"
                  >
                    <span>Siguiente: {nextTitle || "Avanzar"}</span>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={handleClose}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gold text-bg font-semibold text-xs uppercase tracking-wider hover:brightness-110 transition-all cursor-pointer shadow-md"
                  >
                    <span>Cerrar</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
