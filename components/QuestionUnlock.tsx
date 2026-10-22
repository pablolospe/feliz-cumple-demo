"use client";

import React, { useState } from "react";
import { X, Sparkles, AlertCircle, HelpCircle } from "lucide-react";
import confetti from "canvas-confetti";

interface QuestionUnlockProps {
  isOpen: boolean;
  onClose: () => void;
  sectionTitle: string;
  question: string;
  hint?: string;
  exampleAnswer?: string;
  onValidate: (answer: string) => boolean;
  onSuccess: () => void;
}

export default function QuestionUnlock({
  isOpen,
  onClose,
  sectionTitle,
  question,
  hint,
  exampleAnswer,
  onValidate,
  onSuccess,
}: QuestionUnlockProps) {
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleApplyAnswer = (val: string) => {
    setAnswer(val);
    if (onValidate(val)) {
      setIsSuccess(true);
      setError(false);

      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 },
        colors: ["#c9a84c", "#e8c97a", "#e8a0b0", "#ffffff"],
      });

      setTimeout(() => {
        onSuccess();
        setIsSuccess(false);
        setAnswer("");
        onClose();
      }, 900);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!answer.trim()) return;

    if (onValidate(answer)) {
      setIsSuccess(true);
      setError(false);

      // Lanzar confeti al desbloquear
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 },
        colors: ["#c9a84c", "#e8c97a", "#e8a0b0", "#ffffff"],
      });

      setTimeout(() => {
        onSuccess();
        setIsSuccess(false);
        setAnswer("");
        onClose();
      }, 1000);
    } else {
      setError(true);
      setTimeout(() => setError(false), 800);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div
        className={`relative w-full max-w-lg p-6 sm:p-8 rounded-2xl glass-panel shadow-2xl transition-all duration-300 ${
          error ? "animate-shake border-red-500/50" : ""
        } ${isSuccess ? "border-gold glow-gold" : ""}`}
      >
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-muted hover:text-text rounded-full hover:bg-white/5 transition-colors cursor-pointer"
          aria-label="Cerrar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Cabecera */}
        <div className="mb-6 text-center">
          <span className="inline-block text-xs uppercase tracking-widest text-gold font-medium mb-1">
            Desbloquear {sectionTitle}
          </span>
          <h2 className="text-xl sm:text-2xl font-serif text-text mt-2 leading-relaxed">
            {question}
          </h2>
          {hint && (
            <p className="text-xs text-muted mt-2 italic">Pista: {hint}</p>
          )}

          {/* Ayuda rápida */}
          {exampleAnswer && (
            <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/10 border border-gold/25 text-xs text-gold-light">
              <HelpCircle className="w-3.5 h-3.5 text-gold" />
              <span>Sugerencia:</span>
              <button
                type="button"
                onClick={() => handleApplyAnswer(exampleAnswer)}
                className="underline font-bold text-text hover:text-white cursor-pointer ml-0.5"
              >
                &ldquo;{exampleAnswer}&rdquo;
              </button>
            </div>
          )}
        </div>

        {/* Formulario de respuesta */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={answer}
              onChange={(e) => {
                setAnswer(e.target.value);
                if (error) setError(false);
              }}
              placeholder={exampleAnswer ? `Ej: ${exampleAnswer}...` : "Escribí tu respuesta acá..."}
              autoFocus
              className="w-full px-4 py-3 bg-bg/90 border border-gold/30 rounded-xl text-text placeholder-muted/50 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all text-center text-base"
            />
          </div>

          {error && (
            <div className="flex items-center justify-center gap-2 text-sm text-red-400">
              <AlertCircle className="w-4 h-4" />
              <span>Probá con &quot;{exampleAnswer || "otra opción"}&quot;</span>
            </div>
          )}

          {isSuccess && (
            <div className="flex items-center justify-center gap-2 text-sm text-gold-light">
              <Sparkles className="w-4 h-4 animate-spin" />
              <span>¡Correcto! Desbloqueando sección...</span>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-xl border border-white/10 text-muted hover:text-text hover:bg-white/5 transition-colors font-medium text-sm cursor-pointer"
            >
              Volver
            </button>
            <button
              type="submit"
              disabled={isSuccess || !answer.trim()}
              className="flex-1 py-3 px-4 rounded-xl bg-linear-to-r from-gold to-gold-light text-bg font-semibold text-sm shadow-md shadow-gold/20 hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-60 cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isSuccess ? "¡Hecho!" : "Desbloquear"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
