"use client";

import Link from "next/link";
import { Lock, Unlock, ArrowRight, Sparkles, Music, Disc, Camera, Film } from "lucide-react";
import { SectionConfig } from "@/lib/questions";

interface SectionCardProps {
  section: SectionConfig;
  isUnlocked: boolean;
  canUnlock: boolean;
  onOpenModal: () => void;
}

function SectionIcon({ icon, className = "w-6 h-6" }: { icon: string; className?: string }) {
  switch (icon) {
    case "music":
      return <Music className={className} />;
    case "disc":
      return <Disc className={className} />;
    case "camera":
      return <Camera className={className} />;
    case "film":
      return <Film className={className} />;
    default:
      return <Sparkles className={className} />;
  }
}

export default function SectionCard({
  section,
  isUnlocked,
  canUnlock,
  onOpenModal,
}: SectionCardProps) {
  if (isUnlocked) {
    return (
      <Link
        href={section.route}
        className="group block p-6 sm:p-7 rounded-2xl glass-panel relative overflow-hidden transition-all duration-300 hover:border-gold-light hover:scale-[1.02] hover:shadow-xl hover:shadow-gold/10"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-2xl group-hover:bg-gold/20 transition-all pointer-events-none" />

        <div className="flex items-start justify-between mb-4">
          <div className="p-3 rounded-2xl bg-surface2 border border-gold/40 text-gold-light shadow-inner group-hover:border-gold group-hover:scale-105 transition-all">
            <SectionIcon icon={section.icon} className="w-6 h-6" />
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-gold/15 text-gold-light border border-gold/30">
            <Unlock className="w-3.5 h-3.5" />
            <span>Desbloqueada</span>
          </span>
        </div>

        <h3 className="text-xl sm:text-2xl font-serif text-text group-hover:text-gold-light transition-colors mb-1">
          {section.title}
        </h3>
        <p className="text-sm text-muted mb-5">{section.subtitle}</p>

        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold group-hover:text-gold-light transition-colors">
          <span>Ver contenido</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </Link>
    );
  }

  // Si está bloqueada pero es la siguiente a desbloquear
  if (canUnlock) {
    return (
      <div
        onClick={onOpenModal}
        className="group cursor-pointer p-6 sm:p-7 rounded-2xl glass-panel border-gold/40 relative overflow-hidden transition-all duration-300 hover:border-gold hover:scale-[1.02] hover:shadow-lg hover:shadow-gold/15"
      >
        <div className="absolute top-0 right-0 w-24 h-24 bg-gold/5 rounded-full blur-xl pointer-events-none" />

        <div className="flex items-start justify-between mb-4">
          <div className="p-3 rounded-2xl bg-surface2 border border-gold/30 text-gold-light">
            <SectionIcon icon={section.icon} className="w-6 h-6" />
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-surface2 text-gold-light border border-gold/40 animate-pulse">
            <Sparkles className="w-3.5 h-3.5" />
            <span>¡Lista para desbloquear!</span>
          </span>
        </div>

        <h3 className="text-xl sm:text-2xl font-serif text-text mb-1">
          {section.title}
        </h3>
        <p className="text-sm text-muted mb-5">{section.subtitle}</p>

        <button
          type="button"
          className="w-full py-2.5 px-4 rounded-xl bg-surface2 hover:bg-gold text-gold-light hover:text-bg border border-gold/30 font-medium text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Lock className="w-3.5 h-3.5" />
          <span>Responder pregunta</span>
        </button>
      </div>
    );
  }

  // Bloqueada en espera de resolver anteriores
  return (
    <div className="p-6 sm:p-7 rounded-2xl glass-panel-subtle relative overflow-hidden cursor-not-allowed select-none border-white/5">
      {/* Contenido blureado */}
      <div className="filter blur-[5px] opacity-40 transition-all select-none pointer-events-none">
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 rounded-2xl bg-surface border border-white/10 text-muted">
            <SectionIcon icon={section.icon} className="w-6 h-6" />
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-surface text-muted border border-white/10">
            <Lock className="w-3.5 h-3.5" />
            <span>Bloqueada</span>
          </span>
        </div>

        <h3 className="text-xl sm:text-2xl font-serif text-muted mb-1">
          {section.title}
        </h3>
        <p className="text-sm text-muted/70 mb-5">{section.subtitle}</p>

        <div className="py-2.5 text-center text-xs uppercase tracking-wider text-muted/60 border border-dashed border-white/10 rounded-xl">
          Paso {section.order} de 4
        </div>
      </div>

      {/* Overlay nítido que indica el bloqueo */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-bg/40">
        <div className="p-3 rounded-full bg-surface/90 border border-white/10 text-muted mb-2 shadow-lg backdrop-blur-md">
          <Lock className="w-5 h-5 text-muted" />
        </div>
        <span className="text-xs font-medium uppercase tracking-wider text-muted">
          Sección Bloqueada
        </span>
        <span className="text-[11px] text-muted/70 mt-0.5">
          Completá el paso anterior para verla
        </span>
      </div>
    </div>
  );
}
