"use client";

import React from "react";
import Link from "next/link";
import { getUnlockedSections } from "@/lib/auth";
import { SECTIONS } from "@/lib/questions";
import { useDemoSettings } from "@/lib/demo-settings";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

interface NextSectionCtaProps {
  currentSectionId: string;
}

export default function NextSectionCta({ currentSectionId }: NextSectionCtaProps) {
  const { themeConfig } = useDemoSettings();
  const unlocked = getUnlockedSections();

  const currentIndex = SECTIONS.findIndex((s) => s.id === currentSectionId);
  if (currentIndex === -1) return null;

  const nextSection = SECTIONS[currentIndex + 1];

  if (!nextSection) {
    // Es la última sección (paso 4 completado)
    return (
      <div className="mt-12 p-6 rounded-2xl glass-panel border-gold/40 text-center max-w-xl mx-auto shadow-xl">
        <div className="inline-flex p-3 rounded-full bg-gold/20 text-gold-light mb-3">
          <Sparkles className="w-6 h-6 animate-pulse" />
        </div>
        <h3 className="font-serif text-xl text-text mb-1">¡Completaste todo el recorrido!</h3>
        <p className="text-xs sm:text-sm text-muted mb-4">
          Visitaste los 4 capítulos de esta celebración. Podés volver al Hub para repasar o buscar el secreto final.
        </p>
        <Link
          href="/home"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gold text-bg font-semibold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-md"
        >
          <span>Volver al Hub Principal</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  const isNextUnlocked = unlocked.includes(nextSection.id);
  const nextCopy = themeConfig.sectionCopy[nextSection.id];
  const nextTitle = nextCopy?.title || nextSection.title;

  return (
    <div className="mt-12 p-6 rounded-2xl glass-panel-subtle border-gold/30 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-2xl mx-auto">
      <div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-gold flex items-center gap-1 mb-1">
          {isNextUnlocked ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Sparkles className="w-3.5 h-3.5" />}
          <span>Siguiente Parada (Paso {nextSection.order} de 4)</span>
        </span>
        <h4 className="font-serif text-lg text-text">{nextTitle}</h4>
        <p className="text-xs text-muted">
          {isNextUnlocked
            ? "Ya la tenés desbloqueada. ¡Podés saltar directamente!"
            : "Volvé al Hub para responder la pregunta y desbloquearla."}
        </p>
      </div>

      <Link
        href={isNextUnlocked ? nextSection.route : "/home"}
        className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gold text-bg font-semibold text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-md shadow-gold/20 cursor-pointer"
      >
        <span>{isNextUnlocked ? "Avanzar ➔" : "Desbloquear en Hub ➔"}</span>
      </Link>
    </div>
  );
}
