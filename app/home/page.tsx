"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated, getUnlockedSections, unlockSection, resetProgress } from "@/lib/auth";
import { SECTIONS, SectionConfig, EASTER_EGG_CONFIG } from "@/lib/questions";
import SectionCard from "@/components/SectionCard";
import QuestionUnlock from "@/components/QuestionUnlock";
import { Sparkles, LogOut } from "lucide-react";
import confetti from "canvas-confetti";

export default function HomePage() {
  const router = useRouter();
  const [unlocked, setUnlocked] = useState<string[]>([]);
  const [activeModalSection, setActiveModalSection] = useState<SectionConfig | null>(null);
  const [easterEggOpen, setEasterEggOpen] = useState(false);
  const [easterEggSuccess, setEasterEggSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace("/");
    } else {
      setUnlocked(getUnlockedSections());
      setLoading(false);
    }
  }, [router]);

  const handleUnlock = (sectionId: string) => {
    const updated = unlockSection(sectionId);
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
  // La primera puede desbloquearse si no está desbloqueada.
  // La siguiente puede desbloquearse si todas las anteriores están desbloqueadas.
  const isEligibleToUnlock = (index: number) => {
    if (index === 0) return true;
    const prevSection = SECTIONS[index - 1];
    return unlocked.includes(prevSection.id);
  };

  const unlockedCount = unlocked.length;

  return (
    <div className="flex-1 flex flex-col max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header Hub */}
      <header className="flex items-center justify-between pb-6 mb-8 border-b border-gold/20">
        <div>
          <span className="text-xs uppercase tracking-widest text-gold font-medium flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Descubrí las sorpresas en 4 pasos</span>
          </span>
          <h1 className="text-2xl sm:text-4xl font-serif text-text mt-1 flex items-center gap-2.5">
            <span>¡Felices 30 Sofi! ✨</span>
          </h1>
        </div>

        <button
          onClick={handleLogout}
          title="Reiniciar o Salir"
          className="p-2.5 rounded-xl border border-white/10 hover:border-red-400/40 text-muted hover:text-red-400 hover:bg-red-400/5 transition-all text-xs flex items-center gap-1.5 cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Reiniciar</span>
        </button>
      </header>

      {/* Progress Bar */}
      <div className="mb-10 p-5 rounded-2xl glass-panel-subtle">
        <div className="flex items-center justify-between text-xs sm:text-sm mb-2 text-muted">
          <span>Progreso de desbloqueo</span>
          <span className="font-semibold text-gold-light">
            {unlockedCount} de {SECTIONS.length} secciones
          </span>
        </div>
        <div className="w-full bg-surface h-2.5 rounded-full overflow-hidden border border-white/5">
          <div
            className="h-full bg-linear-to-r from-gold to-gold-light transition-all duration-700 ease-out"
            style={{ width: `${(unlockedCount / SECTIONS.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Grid de Secciones */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
        {SECTIONS.map((section, index) => {
          const isSectionUnlocked = unlocked.includes(section.id);
          const canUnlock = !isSectionUnlocked && isEligibleToUnlock(index);

          return (
            <SectionCard
              key={section.id}
              section={section}
              isUnlocked={isSectionUnlocked}
              canUnlock={canUnlock}
              onOpenModal={() => setActiveModalSection(section)}
            />
          );
        })}
      </div>

      {/* Easter Egg Trigger en Footer */}
      <footer className="mt-16 pt-8 border-t border-white/5 flex items-center justify-center text-xs text-muted">
        <button
          onClick={() => setEasterEggOpen(true)}
          className="text-xs text-muted/60 hover:text-gold-light transition-colors inline-flex items-center gap-1.5 cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-gold" />
          <span className="underline underline-offset-4 decoration-dotted">¿Un secreto más?</span>
        </button>
      </footer>

      {/* Modal de Desbloqueo de Secciones */}
      {activeModalSection && (
        <QuestionUnlock
          isOpen={!!activeModalSection}
          onClose={() => setActiveModalSection(null)}
          sectionTitle={activeModalSection.title}
          question={activeModalSection.question}
          hint={activeModalSection.hint} exampleAnswer={activeModalSection.exampleAnswer}
          onValidate={activeModalSection.validate}
          onSuccess={() => handleUnlock(activeModalSection.id)}
        />
      )}

      {/* Modal Easter Egg */}
      {easterEggOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-lg p-6 sm:p-8 rounded-2xl glass-panel shadow-2xl border-gold/50">
            <h3 className="text-xl font-serif text-text mb-3 text-center">
              Un rincón especial...
            </h3>
            {easterEggSuccess ? (
              <div className="text-center py-4 space-y-4">
                <p className="text-gold-light font-medium leading-relaxed">
                  {EASTER_EGG_CONFIG.rewardMessage}
                </p>
                <div className="w-full aspect-video rounded-xl overflow-hidden relative border border-gold/30 shadow-lg">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${EASTER_EGG_CONFIG.youtubeId}?autoplay=1&rel=0`}
                    title="¿Un secreto más?"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
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
                  if (EASTER_EGG_CONFIG.validate(val)) {
                    setEasterEggSuccess(true);
                    confetti({
                      particleCount: 70,
                      spread: 60,
                      origin: { y: 0.5 },
                      colors: ["#c9a84c", "#e8a0b0"],
                    });
                  } else {
                    alert("¡Casi! Pensá en esa frase clásica...");
                  }
                }}
                className="space-y-4"
              >
                <p className="text-sm text-muted text-center">
                  Completá la frase: <br />
                  <strong className="text-text text-base">{EASTER_EGG_CONFIG.promptQuestion}</strong>
                </p>
                <input
                  name="ans"
                  type="text"
                  placeholder="Escribí acá..."
                  autoFocus
                  className="w-full px-4 py-3 bg-bg/90 border border-gold/30 rounded-xl text-text text-center focus:outline-none focus:border-gold"
                />
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setEasterEggOpen(false)}
                    className="flex-1 py-2 rounded-xl border border-white/10 text-muted text-xs font-medium"
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
