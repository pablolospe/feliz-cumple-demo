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
        } ${isSuccess ? "border-[#c9a84c] glow-gold" : ""}`}
      >
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#8878a0] hover:text-[#f0ead6] rounded-full hover:bg-white/5 transition-colors cursor-pointer"
          aria-label="Cerrar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Cabecera */}
        <div className="mb-6 text-center">
          <span className="inline-block text-xs uppercase tracking-widest text-[#c9a84c] font-medium mb-1">
            Desbloquear {sectionTitle}
          </span>
          <h2 className="text-xl sm:text-2xl font-serif text-[#f0ead6] mt-2 leading-relaxed">
            {question}
          </h2>
          {hint && (
            <p className="text-xs text-[#8878a0] mt-2 italic">Pista: {hint}</p>
          )}

          {/* Ayuda visible para portfolio */}
          {exampleAnswer && (
            <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/25 text-xs text-[#e8c97a]">
              <HelpCircle className="w-3.5 h-3.5 text-[#c9a84c]" />
              <span>Respuesta sugerida:</span>
              <button
                type="button"
                onClick={() => handleApplyAnswer(exampleAnswer)}
                className="underline font-bold text-[#f0ead6] hover:text-white cursor-pointer ml-0.5"
              >
                &ldquo;{exampleAnswer}&rdquo; (clic para autocompletar)
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
              className="w-full px-4 py-3 bg-[#0d0a14]/90 border border-[#c9a84c]/30 rounded-xl text-[#f0ead6] placeholder-[#8878a0]/50 focus:outline-none focus:border-[#c9a84c] focus:ring-2 focus:ring-[#c9a84c]/20 transition-all text-center text-base"
            />
          </div>

          {error && (
            <div className="flex items-center justify-center gap-2 text-sm text-red-400">
              <AlertCircle className="w-4 h-4" />
              <span>Probá con &quot;{exampleAnswer || "otra opción"}&quot;</span>
            </div>
          )}

          {isSuccess && (
            <div className="flex items-center justify-center gap-2 text-sm text-[#e8c97a]">
              <Sparkles className="w-4 h-4 animate-spin" />
              <span>¡Correcto! Desbloqueando sección...</span>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-xl border border-white/10 text-[#8878a0] hover:text-[#f0ead6] hover:bg-white/5 transition-colors font-medium text-sm cursor-pointer"
            >
              Volver
            </button>
            <button
              type="submit"
              disabled={isSuccess || !answer.trim()}
              className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#c9a84c] to-[#e8c97a] text-[#0d0a14] font-semibold text-sm shadow-md shadow-[#c9a84c]/20 hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-60 cursor-pointer flex items-center justify-center gap-1.5"
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
