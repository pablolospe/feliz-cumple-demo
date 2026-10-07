"use client";

import React, { useMemo } from "react";

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
  // Constelación de estrellitas sutiles y destellos
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

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {/* Auroras / orbes de luz ambiental cálida y festiva */}
      <div className="absolute top-[-20%] left-[-10%] w-[55vw] h-[55vw] max-w-162.5 max-h-162.5 rounded-full bg-linear-to-br from-gold/15 via-rose/10 to-transparent blur-[120px] animate-ambientPulse" />
      <div className="absolute top-[35%] right-[-15%] w-[50vw] h-[50vw] max-w-150 max-h-150 rounded-full bg-linear-to-bl from-[#7c3aed]/15 via-gold/12 to-transparent blur-[130px] animate-ambientPulse [animation-delay:3s]" />
      <div className="absolute bottom-[-15%] left-[25%] w-[60vw] h-[60vw] max-w-175 max-h-175 rounded-full bg-linear-to-t from-rose/12 via-gold/10 to-transparent blur-[140px] animate-ambientPulse [animation-delay:6s]" />

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
            boxShadow: "0 0 10px 2px rgba(232, 201, 122, 0.7)",
            animationDelay: s.delay,
            animationDuration: s.duration,
            opacity: s.opacity,
          }}
        />
      ))}
    </div>
  );
}
