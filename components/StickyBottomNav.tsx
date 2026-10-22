"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getUnlockedSections, isAuthenticated } from "@/lib/auth";
import { SECTIONS } from "@/lib/questions";
import { useDemoSettings } from "@/lib/demo-settings";
import { Home, Music, Disc, Camera, Film, Lock, Key, Wine, Flame, Utensils, Heart, Radio, Satellite, Orbit, Cpu, Feather, Sparkles } from "lucide-react";

function NavIcon({ icon, className = "w-4 h-4" }: { icon: string; className?: string }) {
  switch (icon) {
    case "music":
      return <Music className={className} />;
    case "disc":
      return <Disc className={className} />;
    case "camera":
      return <Camera className={className} />;
    case "film":
      return <Film className={className} />;
    case "key":
      return <Key className={className} />;
    case "wine":
      return <Wine className={className} />;
    case "flame":
      return <Flame className={className} />;
    case "utensils":
      return <Utensils className={className} />;
    case "heart":
      return <Heart className={className} />;
    case "radio":
      return <Radio className={className} />;
    case "satellite":
      return <Satellite className={className} />;
    case "orbit":
      return <Orbit className={className} />;
    case "cpu":
      return <Cpu className={className} />;
    case "feather":
      return <Feather className={className} />;
    default:
      return <Sparkles className={className} />;
  }
}

export default function StickyBottomNav() {
  const pathname = usePathname();
  const { themeConfig } = useDemoSettings();
  const [unlocked, setUnlocked] = useState<string[]>([]);
  const [authed, setAuthed] = useState(false);
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  // Si el teclado está abierto, la barra flotante tapa el formulario: se oculta
  useEffect(() => {
    const vv = window.visualViewport;
    const update = () => {
      const tag = document.activeElement?.tagName;
      const typing = tag === "INPUT" || tag === "TEXTAREA";
      const shrunk = vv ? window.innerHeight - vv.height > 150 : false;
      setKeyboardOpen(typing && (shrunk || window.matchMedia("(pointer: coarse)").matches));
    };
    vv?.addEventListener("resize", update);
    document.addEventListener("focusin", update);
    document.addEventListener("focusout", () => setTimeout(update, 50));
    return () => {
      vv?.removeEventListener("resize", update);
      document.removeEventListener("focusin", update);
    };
  }, []);

  useEffect(() => {
    const check = () => {
      setAuthed(isAuthenticated());
      setUnlocked(getUnlockedSections());
    };
    check();
    const interval = setInterval(check, 1000);
    return () => clearInterval(interval);
  }, []);

  // No mostrar en la pantalla de login / contraseña inicial
  if (!authed || pathname === "/" || keyboardOpen) return null;

  return (
    <div className="fixed bottom-3 inset-x-0 z-40 flex justify-center px-4 pointer-events-none">
      <nav aria-label="Navegación Rápida de Secciones" className="pointer-events-auto flex items-center gap-1 sm:gap-2 px-3 py-2 rounded-full glass-panel border-gold/30 shadow-2xl bg-surface/90 backdrop-blur-xl">
        {/* Hub Principal */}
        <Link
          href="/home"
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
            pathname === "/home"
              ? "bg-gold text-bg font-bold shadow-md shadow-gold/20"
              : "text-muted hover:text-text hover:bg-white/5"
          }`}
          title="Ir al Hub Principal"
        >
          <Home className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Hub</span>
        </Link>

        <span className="w-px h-4 bg-white/10 mx-0.5" />

        {/* 4 Secciones */}
        {SECTIONS.map((sec) => {
          const isUnlocked = unlocked.includes(sec.id);
          const isActive = pathname === sec.route;
          const copy = themeConfig.sectionCopy[sec.id];
          const iconName = copy?.icon || sec.icon;
          const title = copy?.title || sec.title;

          if (!isUnlocked) {
            return (
              <div
                key={sec.id}
                title={`${title} (Bloqueada)`}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs text-muted/40 cursor-not-allowed select-none"
              >
                <Lock className="w-3 h-3" />
                <span className="hidden md:inline max-w-20 truncate">{title.split(" ")[0]}</span>
              </div>
            );
          }

          return (
            <Link
              key={sec.id}
              href={sec.route}
              title={title}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                isActive
                  ? "bg-gold text-bg font-bold shadow-md shadow-gold/20"
                  : "text-muted hover:text-gold-light hover:bg-gold/10"
              }`}
            >
              <NavIcon icon={iconName} className="w-3.5 h-3.5" />
              <span className="hidden sm:inline max-w-24 truncate">{title.split(" ")[0]}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
