"use client";

import React, { useMemo } from "react";
import { useDemoSettings } from "@/lib/demo-settings";

interface Star {
  id: number;
  top: string;
  left: string;
  size: number;
  delay: string;
  duration: string;
  opacity: number;
}

export default function FestiveBackground() {
  const { theme } = useDemoSettings();

  const stars: Star[] = useMemo(() => {
    return [
      { id: 1, top: "12%", left: "15%", size: 3, delay: "0s", duration: "3.2s", opacity: 0.8 },
      { id: 2, top: "22%", left: "82%", size: 2.5, delay: "1.2s", duration: "4.1s", opacity: 0.7 },
      { id: 3, top: "35%", left: "8%", size: 2, delay: "2s", duration: "3.5s", opacity: 0.6 },
      { id: 4, top: "48%", left: "90%", size: 3.5, delay: "0.5s", duration: "4.5s", opacity: 0.75 },
      { id: 5, top: "65%", left: "18%", size: 2, delay: "1.8s", duration: "3.8s", opacity: 0.65 },
      { id: 6, top: "78%", left: "75%", size: 3, delay: "2.5s", duration: "3s", opacity: 0.8 },
      { id: 7, top: "85%", left: "28%", size: 2.5, delay: "0.8s", duration: "4.2s", opacity: 0.7 },
      { id: 8, top: "18%", left: "60%", size: 2, delay: "3s", duration: "3.6s", opacity: 0.5 },
      { id: 9, top: "58%", left: "50%", size: 2.5, delay: "1.5s", duration: "4.8s", opacity: 0.6 },
      { id: 10, top: "92%", left: "85%", size: 2, delay: "0.2s", duration: "3.4s", opacity: 0.55 },
      { id: 11, top: "8%", left: "42%", size: 3, delay: "2.1s", duration: "4s", opacity: 0.75 },
      { id: 12, top: "42%", left: "72%", size: 2, delay: "1.9s", duration: "3.7s", opacity: 0.6 },
    ];
  }, []);

  // Orbes y gradientes según la temática
  const themeGlows = useMemo(() => {
    if (theme === "foodie") {
      // Tonos tostados, café suave, ámbar y toques oliva sutiles (nada de rojo chillón)
      return {
        orb1: "from-[#e59843]/18 via-[#7d8b58]/12 to-transparent",
        orb2: "from-[#f5b96b]/14 via-[#302b26]/30 to-transparent",
        orb3: "from-[#7d8b58]/15 via-[#e59843]/10 to-transparent",
      };
    }
    if (theme === "space") {
      // Star Wars: Azul galáctico hiperespacio con destellos de sable de luz amarillo y cian
      return {
        orb1: "from-[#ffe81f]/15 via-[#1d4ed8]/25 to-transparent",
        orb2: "from-[#4deeea]/16 via-[#0e1726]/35 to-transparent",
        orb3: "from-[#2de26d]/12 via-[#1e3a8a]/25 to-transparent",
      };
    }
    if (theme === "wes") {
      // Wes Anderson: Paleta Grand Budapest (rosa empolvado, mostaza pastel, verde menta)
      return {
        orb1: "from-[#f09ea7]/22 via-[#f4b663]/18 to-transparent",
        orb2: "from-[#89b0ae]/16 via-[#f09ea7]/15 to-transparent",
        orb3: "from-[#f4b663]/20 via-[#2a2333]/30 to-transparent",
      };
    }
    // Standard (Golden Glam)
    return {
      orb1: "from-gold/15 via-rose/10 to-transparent",
      orb2: "from-[#7c3aed]/15 via-gold/12 to-transparent",
      orb3: "from-rose/12 via-gold/10 to-transparent",
    };
  }, [theme]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 transition-all duration-700" aria-hidden="true">
      {/* 🎈 Ilustración icónica y simétrica de fondo para Wes Anderson */}
      {theme === "wes" && (
        <div className="absolute inset-0 flex items-center justify-center opacity-15 pointer-events-none transition-opacity duration-700">
          <svg
            viewBox="0 0 800 600"
            className="w-[90vw] max-w-4xl max-h-[85vh] text-[#f4b663]"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
          >
            {/* Silueta simétrica estilo The Grand Budapest Hotel */}
            <rect x="250" y="240" width="300" height="300" rx="4" fill="currentColor" fillOpacity="0.03" />
            <polygon points="400,100 240,240 560,240" fill="currentColor" fillOpacity="0.04" />
            {/* Cúpula central simétrica */}
            <path d="M 370 100 Q 400 40 430 100 Z" fill="currentColor" fillOpacity="0.08" />
            <line x1="400" y1="40" x2="400" y2="15" stroke="currentColor" strokeWidth="2" />
            <circle cx="400" cy="15" r="4" fill="currentColor" />
            {/* Banderines de fiesta */}
            <path d="M 240 240 Q 400 270 560 240" strokeDasharray="6 6" />
            {/* Ventanas simétricas en cuadrícula estilo Anderson */}
            <rect x="280" y="280" width="40" height="60" rx="15" />
            <rect x="340" y="280" width="40" height="60" rx="15" />
            <rect x="420" y="280" width="40" height="60" rx="15" />
            <rect x="480" y="280" width="40" height="60" rx="15" />

            <rect x="280" y="370" width="40" height="60" rx="15" />
            <rect x="340" y="370" width="40" height="60" rx="15" />
            <rect x="420" y="370" width="40" height="60" rx="15" />
            <rect x="480" y="370" width="40" height="60" rx="15" />

            {/* Portón de entrada centrado */}
            <path d="M 360 540 L 360 470 Q 400 440 440 470 L 440 540 Z" fill="currentColor" fillOpacity="0.06" />
            <line x1="400" y1="455" x2="400" y2="540" />

            {/* Balcones laterales simétricos */}
            <rect x="180" y="320" width="70" height="220" rx="3" fill="currentColor" fillOpacity="0.02" />
            <rect x="550" y="320" width="70" height="220" rx="3" fill="currentColor" fillOpacity="0.02" />
            <polygon points="180,320 215,280 250,320" />
            <polygon points="550,320 585,280 620,320" />
          </svg>
        </div>
      )}

      {/* 🚀 Guiño Star Wars: Campo estelar hiperespacio y estrellas de fondo */}
      {theme === "space" && (
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          {/* Líneas de salto al hiperespacio sutiles */}
          <div className="absolute top-1/4 left-1/4 w-32 h-0.5 bg-linear-to-r from-transparent via-[#ffe81f] to-transparent rotate-45 animate-pulse" />
          <div className="absolute bottom-1/3 right-1/4 w-40 h-0.5 bg-linear-to-r from-transparent via-[#4deeea] to-transparent -rotate-30 animate-pulse [animation-delay:2s]" />
          <div className="absolute top-1/2 right-1/6 w-24 h-0.5 bg-linear-to-r from-transparent via-[#ffe81f] to-transparent rotate-12 animate-pulse [animation-delay:4s]" />
        </div>
      )}

      {/* Auroras / orbes de luz ambiental cálida y temática */}
      <div className={`absolute top-[-20%] left-[-10%] w-[55vw] h-[55vw] max-w-162.5 max-h-162.5 rounded-full bg-linear-to-br ${themeGlows.orb1} blur-[120px] animate-ambientPulse`} />
      <div className={`absolute top-[35%] right-[-15%] w-[50vw] h-[50vw] max-w-150 max-h-150 rounded-full bg-linear-to-bl ${themeGlows.orb2} blur-[130px] animate-ambientPulse [animation-delay:3s]`} />
      <div className={`absolute bottom-[-15%] left-[25%] w-[60vw] h-[60vw] max-w-175 max-h-175 rounded-full bg-linear-to-t ${themeGlows.orb3} blur-[140px] animate-ambientPulse [animation-delay:6s]`} />

      {/* Partículas de brillo estrellado */}
      {stars.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full bg-text animate-sparkle"
          style={{
            top: s.top,
            left: s.left,
            width: `${s.size}px`,
            height: `${s.size}px`,
            boxShadow: "0 0 10px 2px var(--app-accent-light, #e8c97a)",
            animationDelay: s.delay,
            animationDuration: s.duration,
            opacity: s.opacity,
          }}
        />
      ))}
    </div>
  );
}
