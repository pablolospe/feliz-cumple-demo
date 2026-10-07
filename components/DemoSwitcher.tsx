"use client";

import React, { useState } from "react";
import { useDemoSettings, ThemeId, NavStyleId } from "@/lib/demo-settings";
import { SlidersHorizontal, Sparkles, Compass, Check, ChevronDown, ChevronUp, Palette } from "lucide-react";

export default function DemoSwitcher() {
  const { theme, navStyle, setTheme, setNavStyle } = useDemoSettings();
  const [isOpen, setIsOpen] = useState(false);

  const themeOptions: { id: ThemeId; label: string; emoji: string; desc: string; colors: string[] }[] = [
    {
      id: "standard",
      label: "Golden Glam (Standard)",
      emoji: "✨",
      desc: "Elegante y festivo original",
      colors: ["#c9a84c", "#1a1527", "#e8a0b0"],
    },
    {
      id: "foodie",
      label: "La Ruta Foodie",
      emoji: "☕",
      desc: "Café, tostadas, sobremesa & bodegón cálido",
      colors: ["#e59843", "#231f1c", "#7d8b58"],
    },
    {
      id: "space",
      label: "Star Wars: Episodio XXX",
      emoji: "⚔️",
      desc: "Alianza Rebelde, Holocrones & crawl icónico",
      colors: ["#ffe81f", "#030509", "#4deeea"],
    },
    {
      id: "wes",
      label: "The Grand Budapest / Wes Anderson",
      emoji: "🏨",
      desc: "Simetría Mendl's, pasteles & nostalgia fílmica",
      colors: ["#f4b663", "#2a2333", "#f09ea7"],
    },
  ];

  const navOptions: { id: NavStyleId; label: string; emoji: string; desc: string }[] = [
    {
      id: "cards",
      label: "Grid de Tarjetas",
      emoji: "🎴",
      desc: "Vista clásica 2x2 en cuadrícula",
    },
    {
      id: "journey",
      label: "Mapa de Estaciones (Stepped)",
      emoji: "🗺️",
      desc: "Ruta secuencial con hitos conectados",
    },
    {
      id: "timeline",
      label: "Línea del Tiempo Narrativa",
      emoji: "📜",
      desc: "Storytelling cronológico guiado",
    },
  ];

  const currentThemeObj = themeOptions.find((t) => t.id === theme) || themeOptions[0];
  const currentNavObj = navOptions.find((n) => n.id === navStyle) || navOptions[0];

  return (
    <aside aria-label="Demo Explorer Control Panel" className="fixed top-3 right-3 sm:top-4 sm:right-4 z-50">
      {/* Botón flotante para abrir el switch */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-full glass-panel border-gold/40 shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer text-xs font-medium text-text bg-surface/90 backdrop-blur-md hover:border-gold"
        title="Cambiar temática y navegación del demo"
      >
        <span className="flex items-center gap-1.5">
          <Palette className="w-3.5 h-3.5 text-gold animate-pulse" />
          <span className="hidden sm:inline font-bold">Demo Switch:</span>
          <span>{currentThemeObj.emoji}</span>
          <span className="hidden md:inline text-gold-light">{currentThemeObj.label.split(" ")[0]}</span>
          <span className="text-muted/60">/</span>
          <span>{currentNavObj.emoji}</span>
        </span>
        {isOpen ? <ChevronUp className="w-3.5 h-3.5 text-muted" /> : <ChevronDown className="w-3.5 h-3.5 text-muted" />}
      </button>

      {/* Menú desplegable */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-[90vw] max-w-sm sm:max-w-md p-4 sm:p-5 rounded-2xl glass-panel shadow-2xl border-gold/40 bg-surface/95 backdrop-blur-xl animate-scaleUp text-text flex flex-col gap-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-gold" />
              <h3 className="text-sm font-semibold text-text">Laboratorio de Ideas (IDEAS.md)</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-xs text-muted hover:text-text cursor-pointer p-1 rounded-md"
            >
              Cerrar
            </button>
          </div>

          {/* Selector 1: Temáticas Visuales & Conceptuales */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-gold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>1. Temática Visual ({themeOptions.length})</span>
              </span>
              <span className="text-[10px] text-muted">Afecta paleta, arte & copys</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {themeOptions.map((opt) => {
                const isSelected = theme === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setTheme(opt.id)}
                    className={`p-2.5 rounded-xl text-left transition-all border cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? "bg-gold/15 border-gold shadow-md text-text"
                        : "bg-surface2/60 border-white/5 hover:border-gold/30 hover:bg-surface2 text-muted hover:text-text"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-xs flex items-center gap-1.5 text-text">
                        <span>{opt.emoji}</span>
                        <span>{opt.label}</span>
                      </span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-gold shrink-0" />}
                    </div>
                    <p className="text-[11px] text-muted/80 leading-tight mb-2">
                      {opt.desc}
                    </p>
                    <div className="flex items-center gap-1 mt-auto">
                      {opt.colors.map((c, i) => (
                        <span
                          key={i}
                          className="w-3 h-3 rounded-full border border-black/30 shadow-xs"
                          style={{ backgroundColor: c }}
                        />
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selector 2: Estilos de Navegación del Hub */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-gold flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5" />
                <span>2. Modo de Navegación Hub (3)</span>
              </span>
              <span className="text-[10px] text-muted">Afecta estructura y UX</span>
            </div>

            <div className="flex flex-col gap-2">
              {navOptions.map((nav) => {
                const isSelected = navStyle === nav.id;
                return (
                  <button
                    key={nav.id}
                    onClick={() => setNavStyle(nav.id)}
                    className={`p-2.5 rounded-xl text-left transition-all border cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? "bg-gold/15 border-gold shadow-md text-text"
                        : "bg-surface2/60 border-white/5 hover:border-gold/30 hover:bg-surface2 text-muted hover:text-text"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-base">{nav.emoji}</span>
                      <div>
                        <p className="text-xs font-semibold text-text">{nav.label}</p>
                        <p className="text-[11px] text-muted/80">{nav.desc}</p>
                      </div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-gold shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-muted">
            <span>Todas las combinaciones se guardan localmente</span>
            <span className="text-gold-light font-medium">4×3 = 12 Vistas</span>
          </div>
        </div>
      )}
    </aside>
  );
}
