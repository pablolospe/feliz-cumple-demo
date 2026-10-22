"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated, getUnlockedSections, unlockSection, resetProgress } from "@/lib/auth";
import { SECTIONS, SectionConfig } from "@/lib/questions";
import StationExperienceModal from "@/components/StationExperienceModal";
import { Sparkles, LogOut, Award } from "lucide-react";
import confetti from "canvas-confetti";
import { useDemoSettings } from "@/lib/demo-settings";
import { SteppedJourneyView } from "@/components/NavigationViews";
import { canAutoFocus } from "@/lib/device";

export default function HomePage() {
  const router = useRouter();
  const { themeConfig } = useDemoSettings();
  const [unlocked, setUnlocked] = useState<string[]>([]);
  const [activeModalSection, setActiveModalSection] = useState<SectionConfig | null>(null);
  const [originRect, setOriginRect] = useState<DOMRect | null>(null);
  const [easterEggOpen, setEasterEggOpen] = useState(false);
  const [easterEggSuccess, setEasterEggSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace("/");
    } else {
      const currentUnlocked = getUnlockedSections();
      setUnlocked(currentUnlocked);
      setLoading(false);

      // Si viene con parámetro ?unlock=id, abrir modal automáticamente
      if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        const unlockId = params.get("unlock");
        if (unlockId) {
          const target = SECTIONS.find((s) => s.id === unlockId);
          if (target && !currentUnlocked.includes(target.id)) {
            setActiveModalSection(target);
          }
        }
      }
    }
  }, [router]);

  const handleUnlock = (section: SectionConfig) => {
    const updated = unlockSection(section.id);
    setUnlocked(updated);
  };

  const handleLogout = () => {
    resetProgress();
    router.replace("/");
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-gold border-t-transparent animate-spin" />
      </div>
    );
  }

  // Comprobar qué sección puede desbloquearse (en orden estricto)
  const isEligibleToUnlock = (index: number) => {
    if (index === 0) return true;
    const prevSection = SECTIONS[index - 1];
    return unlocked.includes(prevSection.id);
  };

  const unlockedCount = unlocked.length;

  // Obtener datos activos para el modal según la temática activa
  const getModalConfig = (section: SectionConfig) => {
    const copy = themeConfig.sectionCopy[section.id];
    return {
      title: copy?.title || section.title,
      question: copy?.question || section.question,
      hint: copy?.hint || section.hint,
      exampleAnswer: copy?.exampleAnswer || section.exampleAnswer,
      validate: (ans: string) => {
        if (copy?.validateKeywords && copy.validateKeywords.length > 0) {
          const clean = ans.toLowerCase().trim();
          return copy.validateKeywords.some((k) => clean.includes(k.toLowerCase()));
        }
        return section.validate(ans);
      },
    };
  };

  return (
    <div className="flex-1 flex flex-col max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header Hub Tematizado */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-gold/20 gap-4">
        <div className="flex items-center gap-3.5 sm:gap-4">
          <div className="relative shrink-0">
            <div className="w-13 h-13 sm:w-16 sm:h-16 rounded-full p-0.5 bg-linear-to-tr from-gold via-gold-light to-gold shadow-lg shadow-gold/20">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/fotos/sofi-avatar.jpg"
                alt="Sofi"
                className="w-full h-full object-cover rounded-full border border-bg"
              />
            </div>
            <span className="absolute -bottom-1 -right-1 text-sm bg-surface2 rounded-full p-0.5 border border-gold/40 shadow-xs" title="Cumpleañera">
              👑
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] uppercase tracking-widest text-gold font-bold flex items-center gap-1.5 bg-gold/10 px-2.5 py-1 rounded-full border border-gold/30">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Mapa de Estaciones</span>
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-serif text-text mt-1.5 flex items-center gap-2.5">
              <span>{themeConfig.greetingHeader}</span>
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Pasaporte de Estampillas / Insignias (Badges) */}
          <div className="flex items-center gap-1 bg-surface2/80 px-3 py-1.5 rounded-xl border border-white/10" title="Estampillas obtenidas">
            <Award className="w-4 h-4 text-gold" />
            <div className="flex gap-1 ml-1">
              {SECTIONS.map((s) => (
                <span
                  key={s.id}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    unlocked.includes(s.id) ? "bg-gold shadow-xs shadow-gold" : "bg-white/10"
                  }`}
                  title={`${themeConfig.sectionCopy[s.id]?.title || s.title}: ${unlocked.includes(s.id) ? "Desbloqueada" : "Bloqueada"}`}
                />
              ))}
            </div>
          </div>

          <button
            onClick={handleLogout}
            title="Reiniciar o Salir"
            className="p-2.5 rounded-xl border border-white/10 hover:border-red-400/40 text-muted hover:text-red-400 hover:bg-red-400/5 transition-all text-xs flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Reiniciar</span>
          </button>
        </div>
      </header>

      {/* Progress Bar & Passport */}
      <div className="mb-6 p-4 sm:p-5 rounded-2xl glass-panel-subtle">
        <div className="flex items-center justify-between text-xs sm:text-sm mb-2 text-muted">
          <span className="flex items-center gap-2">
            <span>Progreso</span>
            {unlockedCount === SECTIONS.length && (
              <span className="text-[10px] bg-gold/20 text-gold-light px-2 py-0.5 rounded-full font-bold">
                ¡100%!
              </span>
            )}
          </span>
          <span className="font-semibold text-gold-light">
            {unlockedCount} / {SECTIONS.length}
          </span>
        </div>
        <div className="w-full bg-surface h-2.5 rounded-full overflow-hidden border border-white/5">
          <div
            className="h-full bg-linear-to-r from-gold to-gold-light transition-all duration-700 ease-out"
            style={{ width: `${(unlockedCount / SECTIONS.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Vista principal: Mapa de Estaciones */}
      <div className="min-h-105">
        <SteppedJourneyView
          sections={SECTIONS}
          unlocked={unlocked}
          isEligibleToUnlock={isEligibleToUnlock}
          onOpenModal={(sec, rect) => {
            setOriginRect(rect ?? null);
            setActiveModalSection(sec);
          }}
        />
      </div>

      {/* Easter Egg Trigger en Footer adaptado a la temática */}
      <footer className="mt-16 pt-8 border-t border-white/5 flex items-center justify-center text-xs text-muted">
        <button
          onClick={() => setEasterEggOpen(true)}
          className="text-xs text-muted/60 hover:text-gold-light transition-colors inline-flex items-center gap-1.5 cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-gold" />
          <span className="underline underline-offset-4 decoration-dotted">{themeConfig.secretButtonText}</span>
        </button>
      </footer>

      {/* Modal de Experiencia de Estación: Pregunta -> Video / Contenido expandido con mapa visible de fondo */}
      {activeModalSection && (() => {
        const modalCfg = getModalConfig(activeModalSection);
        const currentIndex = SECTIONS.findIndex((s) => s.id === activeModalSection.id);
        const nextSec = currentIndex !== -1 ? SECTIONS[currentIndex + 1] : undefined;
        const copy = themeConfig.sectionCopy[activeModalSection.id];
        const badgeText = copy?.badgeText || `Estación ${activeModalSection.order}`;
        const isAlreadyUnlocked = unlocked.includes(activeModalSection.id);

        return (
          <StationExperienceModal
            key={activeModalSection.id}
            originRect={originRect}
            sectionId={activeModalSection.id}
            sectionTitle={modalCfg.title}
            badgeText={badgeText}
            subtitle={copy?.subtitle || activeModalSection.subtitle}
            question={modalCfg.question}
            hint={modalCfg.hint}
            exampleAnswer={modalCfg.exampleAnswer}
            isAlreadyUnlocked={isAlreadyUnlocked}
            onValidate={modalCfg.validate}
            onUnlockSuccess={() => handleUnlock(activeModalSection)}
            onClose={() => setActiveModalSection(null)}
            hasNext={!!nextSec}
            nextTitle={nextSec ? (themeConfig.sectionCopy[nextSec.id]?.title || nextSec.title) : undefined}
            onGoNext={() => {
              if (nextSec) {
                setOriginRect(null);
                setActiveModalSection(nextSec);
              } else {
                setActiveModalSection(null);
              }
            }}
          />
        );
      })()}

      {/* Modal Easter Egg Tematizado */}
      {easterEggOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg p-6 sm:p-8 rounded-2xl glass-panel shadow-2xl border-gold/50">
            <h3 className="text-xl font-serif text-text mb-3 text-center">
              {themeConfig.secretButtonText}
            </h3>
            {easterEggSuccess ? (
              <div className="text-center py-4 space-y-4">
                <p className="text-gold-light font-medium leading-relaxed">
                  {themeConfig.secretReward}
                </p>
                <div className="w-full max-w-65 mx-auto aspect-9/16 rounded-xl overflow-hidden relative border border-gold/30 shadow-lg bg-black">
                  <video
                    className="w-full h-full object-cover"
                    src="/videos/saludos/saludo-falso-pol.mp4"
                    controls
                    autoPlay
                    playsInline
                  />
                </div>
                <button
                  onClick={() => {
                    setEasterEggOpen(false);
                    setEasterEggSuccess(false);
                  }}
                  className="mt-4 px-5 py-2 rounded-xl bg-gold text-bg font-medium text-xs uppercase cursor-pointer hover:bg-gold-light transition-colors"
                >
                  Cerrar
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const val = (e.currentTarget.elements.namedItem("ans") as HTMLInputElement).value;
                  const clean = val.toLowerCase().trim();
                  if (clean.includes(themeConfig.secretAnswer.toLowerCase()) || clean.includes("estrellas") || clean.includes("postre") || clean.includes("amistad") || clean.includes("amigos")) {
                    setEasterEggSuccess(true);
                    confetti({
                      particleCount: 80,
                      spread: 60,
                      origin: { y: 0.5 },
                      colors: ["#c9a84c", "#e8a0b0", "#ffffff"],
                    });
                  } else {
                    alert(`¡Casi! Pensá en: ${themeConfig.secretHint}`);
                  }
                }}
                className="space-y-4"
              >
                <p className="text-sm text-muted text-center leading-relaxed">
                  Consigna temática: <br />
                  <strong className="text-text text-base">{themeConfig.secretPrompt}</strong>
                </p>
                <div className="text-center">
                  <span className="text-[11px] text-muted italic">Pista: {themeConfig.secretHint}</span>
                </div>
                <input
                  name="ans"
                  type="text"
                  placeholder={`Ej: ${themeConfig.secretAnswer}...`}
                  autoFocus={canAutoFocus()}
                  className="w-full px-4 py-3 bg-bg/90 border border-gold/30 rounded-xl text-text text-center focus:outline-none focus:border-gold"
                />
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setEasterEggOpen(false)}
                    className="flex-1 py-2 rounded-xl border border-white/10 text-muted text-xs font-medium cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 rounded-xl bg-gold text-bg font-medium text-xs uppercase cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Descubrir</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
