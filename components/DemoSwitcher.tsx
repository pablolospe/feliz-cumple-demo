"use client";

import React, { useState, useRef, useEffect } from "react";
import { useDemoSettings, ThemeId } from "@/lib/demo-settings";
import { Palette, Check, ChevronDown, ChevronUp, X } from "lucide-react";

interface PaletteOption {
  id: ThemeId;
  label: string; // Solo una palabra
  colors: string[];
}

export const PALETTE_OPTIONS: PaletteOption[] = [
  {
    id: "dorado",
    label: "Dorado",
    colors: ["#c9a84c", "#0d0a14", "#e8a0b0"],
  },
  {
    id: "chicle",
    label: "Chicle",
    colors: ["#ff60ad", "#150914", "#ffa4d2"],
  },
  {
    id: "rock",
    label: "Rock",
    colors: ["#e62b2b", "#0a0808", "#ff7744"],
  },
  {
    id: "cyber",
    label: "Cyber",
    colors: ["#00d2ff", "#040c18", "#5ce1e6"],
  },
  {
    id: "matrix",
    label: "Matrix",
    colors: ["#00ff66", "#040a06", "#00cc88"],
  },
  {
    id: "atardecer",
    label: "Atardecer",
    colors: ["#f59e0b", "#150d0a", "#f97316"],
  },
  {
    id: "neon",
    label: "Neón",
    colors: ["#c026d3", "#0f081c", "#a855f7"],
  },
  {
    id: "esmeralda",
    label: "Esmeralda",
    colors: ["#10b981", "#061311", "#34d399"],
  },
];

export default function DemoSwitcher() {
  const { theme, setTheme } = useDemoSettings();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const current = PALETTE_OPTIONS.find((p) => p.id === theme) || PALETTE_OPTIONS[0];

  // Cerrar al hacer click afuera
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className="fixed top-3 right-3 sm:top-4 sm:right-4 z-50">
      {/* Botoncito para cambiar paletas */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Cambiar paleta de colores"
        className="flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full glass-panel border-gold/40 shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer text-xs font-medium text-text bg-surface/90 backdrop-blur-md hover:border-gold"
      >
        <Palette className="w-3.5 h-3.5 text-gold shrink-0" />
        <span className="font-semibold text-text">{current.label}</span>
        <span className="flex -space-x-1 shrink-0">
          {current.colors.map((c, i) => (
            <span
              key={i}
              className="w-2.5 h-2.5 rounded-full border border-black/40 shadow-xs"
              style={{ backgroundColor: c }}
            />
          ))}
        </span>
        {isOpen ? (
          <ChevronUp className="w-3.5 h-3.5 text-muted" />
        ) : (
          <ChevronDown className="w-3.5 h-3.5 text-muted" />
        )}
      </button>

      {/* Menú desplegable con las 8 paletas */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 sm:w-80 p-3 sm:p-4 rounded-2xl glass-panel shadow-2xl border-gold/40 bg-surface/95 backdrop-blur-xl animate-scaleUp text-text flex flex-col gap-2.5">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <span className="text-xs font-semibold text-gold uppercase tracking-wider flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5" />
              <span>Paletas ({PALETTE_OPTIONS.length})</span>
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-xs text-muted hover:text-text cursor-pointer p-1 rounded-md"
              aria-label="Cerrar selector"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {PALETTE_OPTIONS.map((opt) => {
              const isSelected = current.id === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => {
                    setTheme(opt.id);
                    setIsOpen(false);
                  }}
                  className={`px-3 py-2.5 rounded-xl text-left transition-all border cursor-pointer flex items-center justify-between gap-1.5 ${
                    isSelected
                      ? "bg-gold/20 border-gold shadow-md text-text font-semibold"
                      : "bg-surface2/60 border-white/5 hover:border-gold/30 hover:bg-surface2 text-text/80 hover:text-text"
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="flex -space-x-1 shrink-0">
                      {opt.colors.map((c, i) => (
                        <span
                          key={i}
                          className="w-3 h-3 rounded-full border border-black/40 shadow-xs"
                          style={{ backgroundColor: c }}
                        />
                      ))}
                    </span>
                    <span className="text-xs truncate">{opt.label}</span>
                  </div>
                  {isSelected && <Check className="w-3.5 h-3.5 text-gold shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
