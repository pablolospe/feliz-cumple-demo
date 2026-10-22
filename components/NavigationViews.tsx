"use client";

import React from "react";
import Link from "next/link";
import { Lock, Unlock, ArrowRight, Sparkles, CheckCircle2, ChevronRight, Music, Disc, Camera, Film, Key, Wine, Flame, Utensils, Heart, Radio, Satellite, Orbit, Cpu, Feather } from "lucide-react";
import { SectionConfig } from "@/lib/questions";
import { useDemoSettings } from "@/lib/demo-settings";

interface NavigationViewsProps {
  sections: SectionConfig[];
  unlocked: string[];
  isEligibleToUnlock: (index: number) => boolean;
  onOpenModal: (section: SectionConfig) => void;
}

function SectionThemedIcon({ icon, className = "w-6 h-6" }: { icon: string; className?: string }) {
  switch (icon) {
    case "music": return <Music className={className} />;
    case "disc": return <Disc className={className} />;
    case "camera": return <Camera className={className} />;
    case "film": return <Film className={className} />;
    case "key": return <Key className={className} />;
    case "wine": return <Wine className={className} />;
    case "flame": return <Flame className={className} />;
    case "utensils": return <Utensils className={className} />;
    case "heart": return <Heart className={className} />;
    case "radio": return <Radio className={className} />;
    case "satellite": return <Satellite className={className} />;
    case "orbit": return <Orbit className={className} />;
    case "cpu": return <Cpu className={className} />;
    case "feather": return <Feather className={className} />;
    default: return <Sparkles className={className} />;
  }
}

/** 1. GRID CLÁSICO DE TARJETAS (Mejorado con datos temáticos dinámicos) **/
export function CardsGridView({ sections, unlocked, isEligibleToUnlock, onOpenModal }: NavigationViewsProps) {
  const { themeConfig } = useDemoSettings();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 animate-fadeIn">
      {sections.map((section, index) => {
        const isUnlocked = unlocked.includes(section.id);
        const canUnlock = !isUnlocked && isEligibleToUnlock(index);
        const copy = themeConfig.sectionCopy[section.id];
        const title = copy?.title || section.title;
        const subtitle = copy?.subtitle || section.subtitle;
        const icon = copy?.icon || section.icon;
        const badge = copy?.badgeText || `Paso ${section.order}`;

        if (isUnlocked) {
          return (
            <Link
              key={section.id}
              href={section.route}
              className="group block p-6 sm:p-7 rounded-2xl glass-panel relative overflow-hidden transition-all duration-300 hover:border-gold-light hover:scale-[1.02] hover:shadow-xl hover:shadow-gold/10"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-2xl group-hover:bg-gold/20 transition-all pointer-events-none" />

              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-2xl bg-surface2 border border-gold/40 text-gold-light shadow-inner group-hover:border-gold group-hover:scale-105 transition-all">
                  <SectionThemedIcon icon={icon} className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-md bg-white/5 text-muted border border-white/10">
                    {badge}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-gold/15 text-gold-light border border-gold/30">
                    <Unlock className="w-3.5 h-3.5" />
                    <span>Desbloqueada</span>
                  </span>
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-serif text-text group-hover:text-gold-light transition-colors mb-1">
                {title}
              </h3>
              <p className="text-sm text-muted mb-5 leading-relaxed">{subtitle}</p>

              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold group-hover:text-gold-light transition-colors">
                <span>Ver contenido</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        }

        if (canUnlock) {
          return (
            <div
              key={section.id}
              onClick={() => onOpenModal(section)}
              className="group cursor-pointer p-6 sm:p-7 rounded-2xl glass-panel border-gold/40 relative overflow-hidden transition-all duration-300 hover:border-gold hover:scale-[1.02] hover:shadow-lg hover:shadow-gold/15"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gold/5 rounded-full blur-xl pointer-events-none" />

              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-2xl bg-surface2 border border-gold/30 text-gold-light">
                  <SectionThemedIcon icon={icon} className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-md bg-white/5 text-muted border border-white/10">
                    {badge}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-surface2 text-gold-light border border-gold/40 animate-pulse">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>¡Lista para desbloquear!</span>
                  </span>
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-serif text-text mb-1">
                {title}
              </h3>
              <p className="text-sm text-muted mb-5 leading-relaxed">{subtitle}</p>

              <button
                type="button"
                className="w-full py-2.5 px-4 rounded-xl bg-surface2 hover:bg-gold text-gold-light hover:text-bg border border-gold/30 font-medium text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Responder pregunta y entrar</span>
              </button>
            </div>
          );
        }

        return (
          <div
            key={section.id}
            className="p-6 sm:p-7 rounded-2xl glass-panel-subtle relative overflow-hidden cursor-not-allowed select-none border-white/5"
          >
            <div className="filter blur-[5px] opacity-40 select-none pointer-events-none">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-2xl bg-surface border border-white/10 text-muted">
                  <SectionThemedIcon icon={icon} className="w-6 h-6" />
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-surface text-muted border border-white/10">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Bloqueada</span>
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-serif text-muted mb-1">
                {title}
              </h3>
              <p className="text-sm text-muted/70 mb-5 leading-relaxed">{subtitle}</p>

              <div className="py-2.5 text-center text-xs uppercase tracking-wider text-muted/60 border border-dashed border-white/10 rounded-xl">
                {badge}
              </div>
            </div>

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
      })}
    </div>
  );
}

/** 2. MAPA DE ESTACIONES / STEPPED JOURNEY (Estilo Duolingo / Estaciones Conectadas por Líneas SVG) **/
export function SteppedJourneyView({ sections, unlocked, isEligibleToUnlock, onOpenModal }: NavigationViewsProps) {
  const { themeConfig } = useDemoSettings();

  return (
    <div className="w-full max-w-3xl mx-auto py-4 animate-fadeIn">
      <div className="relative flex flex-col gap-8">
        {/* Línea troncal conectora de fondo */}
        <div className="absolute left-6 sm:left-10 top-8 bottom-8 w-1 bg-surface2 border-l-2 border-dashed border-gold/30 -z-0" />

        {sections.map((section, index) => {
          const isUnlocked = unlocked.includes(section.id);
          const canUnlock = !isUnlocked && isEligibleToUnlock(index);
          const copy = themeConfig.sectionCopy[section.id];
          const title = copy?.title || section.title;
          const subtitle = copy?.subtitle || section.subtitle;
          const icon = copy?.icon || section.icon;
          const badge = copy?.badgeText || `Estación ${section.order}`;

          return (
            <div key={section.id} className="relative z-10 flex items-start gap-4 sm:gap-6 group">
              {/* Nodo / Hito de la estación */}
              <div className="shrink-0 flex flex-col items-center">
                <div
                  className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center font-bold text-sm sm:text-base border-2 transition-all shadow-lg ${
                    isUnlocked
                      ? "bg-gold text-bg border-gold-light shadow-gold/30 scale-105"
                      : canUnlock
                      ? "bg-surface2 text-gold-light border-gold animate-bounce shadow-gold/20 cursor-pointer"
                      : "bg-surface text-muted/60 border-white/10"
                  }`}
                  onClick={() => canUnlock && onOpenModal(section)}
                >
                  {isUnlocked ? (
                    <CheckCircle2 className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" />
                  ) : canUnlock ? (
                    <Sparkles className="w-6 h-6 sm:w-7 sm:h-7" />
                  ) : (
                    <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-muted/50" />
                  )}
                </div>
                <span className="text-[11px] font-mono mt-1 font-semibold text-muted">
                  0{section.order}
                </span>
              </div>

              {/* Tarjeta de la Estación */}
              <div className="flex-1 min-w-0">
                {isUnlocked ? (
                  <Link
                    href={section.route}
                    className="block p-4 sm:p-5 rounded-2xl glass-panel border-gold/30 hover:border-gold-light transition-all hover:translate-x-1 shadow-md group-hover:shadow-gold/10"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gold-light flex items-center gap-1.5">
                        <SectionThemedIcon icon={icon} className="w-3.5 h-3.5" />
                        <span>{badge}</span>
                      </span>
                      <span className="text-xs text-gold flex items-center gap-1 font-semibold">
                        <span>Ver</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                    <h3 className="font-serif text-lg sm:text-xl text-text group-hover:text-gold-light transition-colors">
                      {title}
                    </h3>
                    {subtitle && <p className="text-xs text-muted mt-0.5">{subtitle}</p>}
                  </Link>
                ) : canUnlock ? (
                  <div
                    onClick={() => onOpenModal(section)}
                    className="p-4 sm:p-5 rounded-2xl glass-panel border-gold shadow-xl cursor-pointer hover:translate-x-1 transition-all hover:brightness-105 bg-surface/90"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gold flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 animate-spin" />
                        <span>{badge}</span>
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-gold text-bg font-bold uppercase">
                        Desbloquear
                      </span>
                    </div>
                    <h3 className="font-serif text-lg sm:text-xl text-text">
                      {title}
                    </h3>
                    {subtitle && <p className="text-xs text-muted mt-0.5 mb-3">{subtitle}</p>}
                    <button
                      type="button"
                      className="px-3 py-1.5 rounded-xl bg-gold text-bg text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 hover:bg-gold-light cursor-pointer shadow-sm"
                    >
                      <Lock className="w-3 h-3" />
                      <span>Responder para avanzar</span>
                    </button>
                  </div>
                ) : (
                  <div className="p-4 sm:p-5 rounded-2xl glass-panel-subtle border-white/5 opacity-50">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-muted block mb-0.5">
                      {badge}
                    </span>
                    <h3 className="font-serif text-base sm:text-lg text-muted">
                      {title}
                    </h3>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** 3. LÍNEA DEL TIEMPO NARRATIVA (Timeline Storytelling con hitos cronológicos/conceptuales) **/
export function NarrativeTimelineView({ sections, unlocked, isEligibleToUnlock, onOpenModal }: NavigationViewsProps) {
  const { themeConfig } = useDemoSettings();

  return (
    <div className="max-w-4xl mx-auto py-6 animate-fadeIn">
      {/* Encabezado del Timeline */}
      <div className="text-center mb-10">
        <span className="text-xs font-mono uppercase tracking-widest text-gold bg-gold/10 px-3 py-1 rounded-full border border-gold/30">
          Bitácora Narrativa en 4 Capítulos
        </span>
        <h2 className="text-xl sm:text-3xl font-serif text-text mt-3">
          {themeConfig.name}
        </h2>
        <p className="text-xs sm:text-sm text-muted mt-1 max-w-md mx-auto">
          Recorré la historia paso a paso. Cada capítulo guarda una parte irrepetible de esta celebración.
        </p>
      </div>

      <div className="relative">
        {/* Línea central en desktop, lateral en móvil */}
        <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-0.5 bg-linear-to-b from-gold via-gold/50 to-transparent -translate-x-1/2" />

        <div className="space-y-10">
          {sections.map((section, index) => {
            const isUnlocked = unlocked.includes(section.id);
            const canUnlock = !isUnlocked && isEligibleToUnlock(index);
            const isEven = index % 2 === 0;
            const copy = themeConfig.sectionCopy[section.id];
            const title = copy?.title || section.title;
            const subtitle = copy?.subtitle || section.subtitle;
            const icon = copy?.icon || section.icon;
            const badge = copy?.badgeText || `Capítulo ${section.order}`;

            return (
              <div
                key={section.id}
                className={`relative flex items-center gap-6 md:gap-10 ${
                  isEven ? "md:flex-row-reverse" : "md:flex-row"
                } flex-row`}
              >
                {/* Contenido (Tarjeta del Capítulo) */}
                <div className="flex-1 ml-12 md:ml-0">
                  <div
                    className={`p-6 rounded-2xl glass-panel transition-all ${
                      isUnlocked
                        ? "border-gold/30 hover:border-gold hover:shadow-xl hover:shadow-gold/10"
                        : canUnlock
                        ? "border-gold glow-gold bg-surface2/80 cursor-pointer"
                        : "border-white/5 opacity-50"
                    }`}
                    onClick={() => canUnlock && onOpenModal(section)}
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[11px] font-mono uppercase text-gold font-bold">
                        {badge}
                      </span>
                      <span
                        className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-bold ${
                          isUnlocked
                            ? "bg-gold/20 text-gold-light"
                            : canUnlock
                            ? "bg-gold text-bg animate-pulse"
                            : "bg-surface text-muted"
                        }`}
                      >
                        {isUnlocked ? "Completado" : canUnlock ? "¡Listo!" : "Pendiente"}
                      </span>
                    </div>

                    <h3 className="font-serif text-lg sm:text-2xl text-text mb-1">
                      {title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted mb-4 leading-relaxed">
                      {subtitle}
                    </p>

                    {isUnlocked && (
                      <Link
                        href={section.route}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-gold hover:text-gold-light uppercase tracking-wider transition-colors"
                      >
                        <span>Abrir capítulo</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    )}

                    {canUnlock && (
                      <button
                        type="button"
                        onClick={() => onOpenModal(section)}
                        className="w-full py-2 px-3 rounded-xl bg-gold text-bg font-bold text-xs uppercase tracking-wider hover:bg-gold-light cursor-pointer transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Lock className="w-3.5 h-3.5" />
                        <span>Desbloquear este capítulo</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Marcador Central en la Línea */}
                <div
                  className={`absolute left-6 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center border-2 z-10 transition-all ${
                    isUnlocked
                      ? "bg-gold text-bg border-gold-light shadow-md shadow-gold/40"
                      : canUnlock
                      ? "bg-surface2 text-gold-light border-gold scale-110 shadow-lg cursor-pointer"
                      : "bg-surface text-muted border-white/20"
                  }`}
                  onClick={() => canUnlock && onOpenModal(section)}
                >
                  <SectionThemedIcon icon={icon} className="w-4 h-4" />
                </div>

                {/* Espaciador del otro lado para desktop */}
                <div className="hidden md:block flex-1" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
