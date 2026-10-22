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

  // Orbes y gradientes según la paleta activa
  const themeGlows = useMemo(() => {
    switch (theme) {
      case "chicle":
      case "wes":
        return {
          orb1: "from-[#ff60ad]/20 via-[#ffa4d2]/15 to-transparent",
          orb2: "from-[#f472b6]/18 via-[#341832]/35 to-transparent",
          orb3: "from-[#ff60ad]/15 via-[#ffa4d2]/10 to-transparent",
        };
      case "rock":
        return {
          orb1: "from-[#e62b2b]/22 via-[#ff7744]/15 to-transparent",
          orb2: "from-[#ff5e5e]/18 via-[#261a1a]/40 to-transparent",
          orb3: "from-[#e62b2b]/15 via-[#ff5e5e]/10 to-transparent",
        };
      case "cyber":
      case "space":
        return {
          orb1: "from-[#00d2ff]/20 via-[#0f2442]/35 to-transparent",
          orb2: "from-[#5ce1e6]/18 via-[#3b82f6]/18 to-transparent",
          orb3: "from-[#00d2ff]/15 via-[#5ce1e6]/12 to-transparent",
        };
      case "matrix":
        return {
          orb1: "from-[#00ff66]/18 via-[#0f2414]/35 to-transparent",
          orb2: "from-[#55ff88]/15 via-[#00cc88]/15 to-transparent",
          orb3: "from-[#00ff66]/15 via-[#55ff88]/10 to-transparent",
        };
      case "atardecer":
      case "foodie":
        return {
          orb1: "from-[#f59e0b]/20 via-[#f97316]/15 to-transparent",
          orb2: "from-[#fbbf24]/16 via-[#342119]/30 to-transparent",
          orb3: "from-[#f97316]/15 via-[#f59e0b]/10 to-transparent",
        };
      case "neon":
        return {
          orb1: "from-[#c026d3]/22 via-[#e879f9]/18 to-transparent",
          orb2: "from-[#a855f7]/18 via-[#281446]/35 to-transparent",
          orb3: "from-[#e879f9]/15 via-[#c026d3]/12 to-transparent",
        };
      case "esmeralda":
        return {
          orb1: "from-[#10b981]/20 via-[#13332f]/35 to-transparent",
          orb2: "from-[#34d399]/18 via-[#2dd4bf]/15 to-transparent",
          orb3: "from-[#10b981]/15 via-[#34d399]/10 to-transparent",
        };
      case "dorado":
      case "standard":
      default:
        return {
          orb1: "from-gold/18 via-rose/12 to-transparent",
          orb2: "from-[#7c3aed]/15 via-gold/14 to-transparent",
          orb3: "from-rose/12 via-gold/10 to-transparent",
        };
    }
  }, [theme]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 transition-all duration-700" aria-hidden="true">
      {/* Auroras / orbes de luz ambiental según la paleta */}
      <div className={`absolute top-[-20%] left-[-10%] w-[55vw] h-[55vw] max-w-162.5 max-h-162.5 rounded-full bg-linear-to-br ${themeGlows.orb1} blur-[120px] animate-ambientPulse`} />
      <div className={`absolute top-[35%] right-[-15%] w-[50vw] h-[50vw] max-w-150 max-h-150 rounded-full bg-linear-to-bl ${themeGlows.orb2} blur-[130px] animate-ambientPulse [animation-delay:3s]`} />
      <div className={`absolute bottom-[-15%] left-[25%] w-[60vw] h-[60vw] max-w-175 max-h-175 rounded-full bg-linear-to-t ${themeGlows.orb3} blur-[140px] animate-ambientPulse [animation-delay:6s]`} />

      {/* Partículas de brillo estrellado */}
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
