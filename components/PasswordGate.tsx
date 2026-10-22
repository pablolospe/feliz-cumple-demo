"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { checkPassword, setAuthenticated, MASTER_PASSWORD } from "@/lib/auth";
import confetti from "canvas-confetti";
import { Lock, Sparkles, KeyRound, Info } from "lucide-react";

export default function PasswordGate() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const handleAccess = (passToTry: string) => {
    if (checkPassword(passToTry)) {
      setIsSuccess(true);
      setError(false);
      setAuthenticated(true);

      // Lanzar confeti celebratorio
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#c9a84c", "#e8c97a", "#e8a0b0", "#ffffff"],
      });

      setTimeout(() => {
        router.push("/home");
      }, 900);
    } else {
      setError(true);
      setPassword("");
      setTimeout(() => setError(false), 800);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAccess(password);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] px-4 py-8">
      <div
        className={`w-full max-w-md p-8 rounded-2xl glass-panel shadow-2xl relative transition-all duration-300 ${
          error ? "animate-shake border-red-500/50" : ""
        } ${isSuccess ? "border-gold glow-gold" : ""}`}
      >
        {/* Glow de acento superior */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-gold/20 rounded-full blur-2xl pointer-events-none" />

        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-surface2 border border-gold/40 text-gold-light mb-4 shadow-inner">
            {isSuccess ? <Sparkles className="w-8 h-8 animate-spin" /> : <Lock className="w-8 h-8" />}
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif text-text tracking-tight mb-2">
            ¡Feliz Cumple Sofi!
          </h1>
          <p className="text-sm sm:text-base text-muted">
            Ingresá la clave de acceso para ver tus sorpresas y recuerdos
          </p>
        </div>

        {/* Badge para Reclutadores / Portfolio Demo */}
        <div className="mb-6 p-3 rounded-xl bg-gold/10 border border-gold/30 flex items-start gap-2.5 text-xs text-gold-light">
          <Info className="w-4 h-4 shrink-0 mt-0.5 text-gold" />
          <div>
            <p className="font-semibold text-text">Demo de Portfolio</p>
            <p className="text-gold-light/90 mt-0.5">
              Clave de acceso: <code className="bg-bg px-1.5 py-0.5 rounded text-text font-mono font-bold">{MASTER_PASSWORD}</code> (tipeala abajo para ingresar)
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <label className="block text-xs uppercase tracking-wider text-muted mb-2 font-medium">
              Contraseña
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-muted">
                <KeyRound className="w-5 h-5" />
              </span>
              <input
                type="text"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError(false);
                }}
                placeholder={MASTER_PASSWORD}
                autoFocus
                className="w-full pl-11 pr-4 py-3.5 bg-bg/80 border border-gold/30 rounded-xl text-text placeholder-muted/50 text-center tracking-widest text-lg focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all font-mono"
              />
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-400 text-center font-medium animate-fadeIn">
              Contraseña incorrecta. Intentá con &quot;{MASTER_PASSWORD}&quot;.
            </p>
          )}

          {isSuccess && (
            <p className="text-sm text-gold-light text-center font-medium animate-fadeIn flex items-center justify-center gap-1.5">
              <Sparkles className="w-4 h-4 animate-spin" />
              <span>¡Acceso concedido! Entrando a tu fiesta...</span>
            </p>
          )}

          <button
            type="submit"
            disabled={isSuccess}
            className="w-full py-3.5 px-6 rounded-xl bg-linear-to-r from-gold to-gold-light text-bg font-semibold text-base shadow-lg shadow-gold/20 hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer disabled:opacity-75 flex items-center justify-center gap-2"
          >
            {isSuccess ? (
              <span>Abriendo...</span>
            ) : (
              <>
                <span>Ingresar</span>
                <Sparkles className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
