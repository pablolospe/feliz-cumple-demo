"use client";

import React from "react";
import Link from "next/link";
import { getUnlockedSections } from "@/lib/auth";
import { SECTIONS } from "@/lib/questions";
import { useDemoSettings } from "@/lib/demo-settings";
import { ArrowRight, ArrowLeft, Sparkles, CheckCircle2 } from "lucide-react";

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
      <div className="mt-10 p-5 rounded-2xl glass-panel border-gold/40 text-center max-w-md mx-auto shadow-xl">
        <div className="inline-flex p-2.5 rounded-full bg-gold/20 text-gold-light mb-2">
          <Sparkles className="w-5 h-5 animate-pulse" />
        </div>
        <h3 className="font-serif text-lg text-text mb-3">¡Recorrido completo!</h3>
        <Link
          href="/home"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gold text-bg font-semibold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-md"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Volver</span>
        </Link>
      </div>
    );
  }

  const isNextUnlocked = unlocked.includes(nextSection.id);
  const nextCopy = themeConfig.sectionCopy[nextSection.id];
  const nextTitle = nextCopy?.title || nextSection.title;

  return (
    <div className="mt-8 p-4 sm:p-5 rounded-2xl glass-panel-subtle border-gold/30 flex items-center justify-between gap-4 max-w-xl mx-auto">
      <div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-gold flex items-center gap-1 mb-0.5">
          {isNextUnlocked ? <CheckCircle2 className="w-3 h-3" /> : <Sparkles className="w-3 h-3" />}
          <span>Siguiente · 0{nextSection.order}</span>
        </span>
        <h4 className="font-serif text-base sm:text-lg text-text">{nextTitle}</h4>
      </div>

      <Link
        href={isNextUnlocked ? nextSection.route : "/home"}
        className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gold text-bg font-semibold text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-sm cursor-pointer"
      >
        <span>{isNextUnlocked ? "Ver" : "Desbloquear"}</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
}
