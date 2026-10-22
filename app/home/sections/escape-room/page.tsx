"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { isAuthenticated, isSectionUnlocked } from "@/lib/auth";
import { ArrowLeft, Key, Lock, Unlock, Sparkles, CheckCircle2, ChevronUp, ChevronDown, Award } from "lucide-react";
import confetti from "canvas-confetti";
import NextSectionCta from "@/components/NextSectionCta";

export default function EscapeRoomPage() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  // Enigma 1: Candado de 2 dígitos (Objetivo: 30)
  const [digit1, setDigit1] = useState(0);
  const [digit2, setDigit2] = useState(0);
  const [lock1Open, setLock1Open] = useState(false);

  // Enigma 2: Acertijo de palabra (Objetivo: estrellas)
  const [wordInput, setWordInput] = useState("");
  const [lock2Open, setLock2Open] = useState(false);
  const [wordError, setWordError] = useState(false);

  // Enigma 3: Bóveda final
  const [vaultOpen, setVaultOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace("/");
    } else if (!isSectionUnlocked("escape-room")) {
      router.replace("/home");
    } else {
      setAuthorized(true);
    }
  }, [router]);

  // Chequeo de candado 1: cuando es 30
  useEffect(() => {
    if (digit1 === 3 && digit2 === 0 && !lock1Open) {
      setLock1Open(true);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#c9a84c", "#e8c97a", "#ffffff"],
      });
    }
  }, [digit1, digit2, lock1Open]);

  const handleWordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = wordInput.trim().toLowerCase();
    if (clean.includes("estrella") || clean.includes("luz") || clean.includes("amigos")) {
      setLock2Open(true);
      setWordError(false);
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.5 },
        colors: ["#c9a84c", "#e8c97a", "#ffffff"],
      });
    } else {
      setWordError(true);
      setTimeout(() => setWordError(false), 900);
    }
  };

  const handleOpenVault = () => {
    setVaultOpen(true);
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.4 },
      colors: ["#c9a84c", "#e8c97a", "#e8a0b0", "#ffffff"],
    });
  };

  if (!authorized) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-gold border-t-transparent animate-spin" />
      </div>
    );
  }

  const cycleDigit = (
    setter: React.Dispatch<React.SetStateAction<number>>,
    delta: number
  ) => {
    setter((prev) => {
      const next = prev + delta;
      if (next > 9) return 0;
      if (next < 0) return 9;
      return next;
    });
  };

  return (
    <div className="max-w-3xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-10 flex-1 flex flex-col">
      {/* Cabecera */}
      <div className="mb-6 flex flex-col items-center text-center">
        <Link
          href="/home"
          className="self-start inline-flex items-center gap-1.5 text-xs text-muted hover:text-gold-light transition-colors mb-4"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Volver al Hub</span>
        </Link>

        <span className="text-[10px] font-bold uppercase tracking-wider text-gold bg-gold/10 px-2.5 py-0.5 rounded-full border border-gold/25 mb-1.5 flex items-center gap-1">
          <Key className="w-3 h-3" />
          <span>Estación 5 · Gran Final</span>
        </span>
        <h1 className="text-2xl sm:text-3xl font-serif text-text">Sala de Escape</h1>
        <p className="text-xs sm:text-sm text-muted mt-0.5">
          Resolvé los 3 enigmas para abrir la caja fuerte
        </p>
      </div>

      {/* Contenedor de la Sala de Escape */}
      <div className="flex flex-col gap-5">
        {/* ENIGMA 1: Candado de Dígitos */}
        <div
          className={`p-5 rounded-2xl glass-panel transition-all ${
            lock1Open ? "border-gold/60 bg-gold/5" : "border-white/10"
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-gold flex items-center gap-1.5">
              {lock1Open ? (
                <Unlock className="w-4 h-4 text-gold-light" />
              ) : (
                <Lock className="w-4 h-4" />
              )}
              <span>Enigma 1 · El Candado de la Década</span>
            </span>
            {lock1Open && (
              <span className="text-[10px] font-bold uppercase text-gold bg-gold/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Abierto
              </span>
            )}
          </div>

          <p className="text-xs text-muted mb-4">
            Pista: La edad dorada que celebramos hoy.
          </p>

          <div className="flex items-center justify-center gap-4 py-2">
            {/* Rueda 1 */}
            <div className="flex flex-col items-center">
              <button
                disabled={lock1Open}
                onClick={() => cycleDigit(setDigit1, 1)}
                className="p-1 rounded-md text-muted hover:text-gold disabled:opacity-40 cursor-pointer"
                aria-label="Subir decena"
              >
                <ChevronUp className="w-5 h-5" />
              </button>
              <div className="w-14 h-16 rounded-xl bg-surface2 border-2 border-gold/40 flex items-center justify-center font-mono text-2xl font-bold text-text shadow-inner">
                {digit1}
              </div>
              <button
                disabled={lock1Open}
                onClick={() => cycleDigit(setDigit1, -1)}
                className="p-1 rounded-md text-muted hover:text-gold disabled:opacity-40 cursor-pointer"
                aria-label="Bajar decena"
              >
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>

            <span className="font-mono text-2xl text-muted font-bold">:</span>

            {/* Rueda 2 */}
            <div className="flex flex-col items-center">
              <button
                disabled={lock1Open}
                onClick={() => cycleDigit(setDigit2, 1)}
                className="p-1 rounded-md text-muted hover:text-gold disabled:opacity-40 cursor-pointer"
                aria-label="Subir unidad"
              >
                <ChevronUp className="w-5 h-5" />
              </button>
              <div className="w-14 h-16 rounded-xl bg-surface2 border-2 border-gold/40 flex items-center justify-center font-mono text-2xl font-bold text-text shadow-inner">
                {digit2}
              </div>
              <button
                disabled={lock1Open}
                onClick={() => cycleDigit(setDigit2, -1)}
                className="p-1 rounded-md text-muted hover:text-gold disabled:opacity-40 cursor-pointer"
                aria-label="Bajar unidad"
              >
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* ENIGMA 2: La Palabra Secreta */}
        <div
          className={`p-5 rounded-2xl glass-panel transition-all ${
            !lock1Open
              ? "opacity-50 pointer-events-none"
              : lock2Open
              ? "border-gold/60 bg-gold/5"
              : "border-white/10"
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-gold flex items-center gap-1.5">
              {lock2Open ? (
                <Unlock className="w-4 h-4 text-gold-light" />
              ) : (
                <Lock className="w-4 h-4" />
              )}
              <span>Enigma 2 · La Clave Poética</span>
            </span>
            {lock2Open && (
              <span className="text-[10px] font-bold uppercase text-gold bg-gold/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Resuelto
              </span>
            )}
          </div>

          <p className="text-xs text-muted mb-3">
            &ldquo;La vida sin amigos es como un cielo sin...&rdquo;
          </p>

          {!lock2Open ? (
            <form onSubmit={handleWordSubmit} className="flex gap-2">
              <input
                type="text"
                value={wordInput}
                onChange={(e) => setWordInput(e.target.value)}
                placeholder="Escribí la palabra..."
                className={`flex-1 px-3 py-2 bg-surface2 border rounded-xl text-xs text-text focus:outline-none ${
                  wordError ? "border-red-400" : "border-gold/30 focus:border-gold"
                }`}
              />
              <button
                type="button"
                onClick={() => {
                  setWordInput("estrellas");
                }}
                className="px-2.5 py-2 rounded-xl border border-white/10 text-muted hover:text-gold text-[11px] cursor-pointer"
                title="Pista rápida"
              >
                Pista
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-gold text-bg font-semibold text-xs uppercase cursor-pointer hover:bg-gold-light"
              >
                Validar
              </button>
            </form>
          ) : (
            <p className="text-xs font-semibold text-gold-light">
              ✓ Clave desbloqueada: &ldquo;Estrellas&rdquo;
            </p>
          )}
        </div>

        {/* ENIGMA 3: Bóveda Final */}
        <div
          className={`p-6 rounded-2xl glass-panel transition-all text-center ${
            !lock2Open
              ? "opacity-50 pointer-events-none"
              : vaultOpen
              ? "border-gold shadow-2xl bg-gold/10"
              : "border-gold/40 shadow-xl"
          }`}
        >
          {!vaultOpen ? (
            <div className="py-4">
              <div className="w-16 h-16 rounded-full bg-gold/20 border-2 border-gold flex items-center justify-center mx-auto mb-3">
                <Key className="w-8 h-8 text-gold animate-pulse" />
              </div>
              <h3 className="font-serif text-lg text-text mb-1">
                ¡Las dos cerraduras están abiertas!
              </h3>
              <p className="text-xs text-muted mb-5">
                Girá la llave maestra para abrir la caja fuerte.
              </p>
              <button
                onClick={handleOpenVault}
                className="px-6 py-3 rounded-xl bg-linear-to-r from-gold to-gold-light text-bg font-bold text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-lg cursor-pointer inline-flex items-center gap-2"
              >
                <Key className="w-4 h-4" />
                <span>Abrir Caja Fuerte</span>
              </button>
            </div>
          ) : (
            <div className="py-4 animate-scaleUp">
              <div className="w-16 h-16 rounded-full bg-gold text-bg flex items-center justify-center mx-auto mb-3 shadow-xl">
                <Award className="w-8 h-8" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-gold block mb-1">
                ¡Misión Cumplida!
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-text mb-2">
                ¡Escapaste con Éxito!
              </h2>
              <p className="text-xs sm:text-sm text-muted max-w-md mx-auto mb-6 leading-relaxed">
                Demostraste que los 30 se empiezan con audacia, risas y la mejor
                compañía. ¡Salud por este gran festejo, Sofi! ✨🎂
              </p>
              <Link
                href="/home"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gold text-bg font-bold text-xs uppercase tracking-wider hover:bg-gold-light transition-all shadow-md"
              >
                <Sparkles className="w-4 h-4" />
                <span>Volver al Hub con Victoria</span>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Siguiente parada conectada */}
      <div className="mt-8">
        <NextSectionCta currentSectionId="escape-room" />
      </div>
    </div>
  );
}
