"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type ThemeId =
  | "dorado"
  | "chicle"
  | "rock"
  | "cyber"
  | "matrix"
  | "atardecer"
  | "neon"
  | "esmeralda"
  // Legacy aliases
  | "standard"
  | "foodie"
  | "space"
  | "wes";

export type NavStyleId = "journey" | "cards" | "timeline";

interface DemoSettingsContextType {
  theme: ThemeId;
  navStyle: NavStyleId;
  setTheme: (t: ThemeId) => void;
  setNavStyle: (n: NavStyleId) => void;
  themeConfig: ThemeConfig;
}

export interface ThemeConfig {
  id: string;
  name: string;
  badge: string;
  tagline: string;
  greetingHeader: string;
  secretButtonText: string;
  secretPrompt: string;
  secretHint: string;
  secretAnswer: string;
  secretReward: string;
  sectionCopy: Record<
    string,
    {
      title: string;
      subtitle: string;
      icon: string;
      badgeText?: string;
      question: string;
      hint: string;
      exampleAnswer: string;
      validateKeywords: string[];
    }
  >;
}

export const BASE_THEME_CONFIG: ThemeConfig = {
  id: "dorado",
  name: "Dorado",
  badge: "Cumpleaños",
  tagline: "30 Años",
  greetingHeader: "¡Felices 30 Sofi! ✨",
  secretButtonText: "¿Un secreto más?",
  secretPrompt: "La vida sin amigos es como un cielo sin...",
  secretHint: "Brillan en la noche...",
  secretAnswer: "estrellas",
  secretReward: "¡Exacto! Gracias por llenar nuestros días de luz y risas. ✨",
  sectionCopy: {
    saludo1: {
      title: "Marcos",
      subtitle: "Video de saludo",
      icon: "film",
      badgeText: "Estación 1",
      question: "¿Comida infaltable para una noche con amigos?",
      hint: "Al molde o a la piedra con queso...",
      exampleAnswer: "pizza",
      validateKeywords: ["pizza", "empanadas", "hamburguesa"],
    },
    saludo2: {
      title: "Martu",
      subtitle: "Video de saludo",
      icon: "film",
      badgeText: "Estación 2",
      question: "¿Bebida infaltable en cada previa o juntada?",
      hint: "Amargo o dulce con hielo...",
      exampleAnswer: "fernet",
      validateKeywords: ["fernet", "cerveza", "birra", "vino", "trago"],
    },
    saludo3: {
      title: "Chicas de la facu",
      subtitle: "Video de saludo",
      icon: "film",
      badgeText: "Estación 3",
      question: "¿El clásico almuerzo de domingo con amigos y familia?",
      hint: "Brasas y aplauso para el asador...",
      exampleAnswer: "asado",
      validateKeywords: ["asado", "parrilla", "pastas", "almuerzo"],
    },
    saludo4: {
      title: "Papás",
      subtitle: "Video de saludo",
      icon: "film",
      badgeText: "Estación 4",
      question: "¿Postre infaltable en cada cumpleaños?",
      hint: "Con velitas y todos cantando...",
      exampleAnswer: "torta",
      validateKeywords: ["torta", "tarta", "pastel", "helado"],
    },
    fotos: {
      title: "Galería de Fotos",
      subtitle: "Momentos compartidos",
      icon: "camera",
      badgeText: "Estación 5",
      question: "¿Infusión infaltable en mañanas y charlas?",
      hint: "Yerba, termo y agua caliente...",
      exampleAnswer: "mate",
      validateKeywords: ["mate", "cafe", "café"],
    },
    // Alias para compatibilidad
    saludos: {
      title: "Saludo 1",
      subtitle: "Video sorpresa",
      icon: "film",
      badgeText: "Estación 1",
      question: "¿Comida infaltable para una noche con amigos?",
      hint: "Al molde o a la piedra con queso...",
      exampleAnswer: "pizza",
      validateKeywords: ["pizza", "empanadas", "hamburguesa"],
    },
  },
};

const THEME_ALIASES: Record<string, ThemeId> = {
  dorado: "dorado",
  chicle: "chicle",
  rock: "rock",
  cyber: "cyber",
  matrix: "matrix",
  atardecer: "atardecer",
  neon: "neon",
  esmeralda: "esmeralda",
  standard: "dorado",
  wes: "chicle",
  space: "cyber",
  foodie: "atardecer",
};

export const THEMES_META: Record<string, ThemeConfig> = new Proxy(
  {},
  {
    get: () => BASE_THEME_CONFIG,
  }
);

const DemoSettingsContext = createContext<DemoSettingsContextType | null>(null);

const STORAGE_THEME_KEY = "demo_chosen_theme";
const STORAGE_NAV_KEY = "demo_chosen_nav_style";

export function DemoSettingsProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>("dorado");
  const [navStyle, setNavStyleState] = useState<NavStyleId>("journey");

  useEffect(() => {
    const savedTheme = localStorage.getItem(STORAGE_THEME_KEY);
    if (savedTheme && THEME_ALIASES[savedTheme]) {
      setThemeState(THEME_ALIASES[savedTheme]);
    }
    // Forzamos "journey" (Mapa de Estaciones) como único modo activo
    setNavStyleState("journey");
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, [theme]);

  const setTheme = (t: ThemeId) => {
    const resolved = THEME_ALIASES[t] || "dorado";
    setThemeState(resolved);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_THEME_KEY, resolved);
    }
  };

  const setNavStyle = (n: NavStyleId) => {
    setNavStyleState(n);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_NAV_KEY, n);
    }
  };

  return (
    <DemoSettingsContext.Provider
      value={{
        theme,
        navStyle,
        setTheme,
        setNavStyle,
        themeConfig: BASE_THEME_CONFIG,
      }}
    >
      {children}
    </DemoSettingsContext.Provider>
  );
}

export function useDemoSettings() {
  const ctx = useContext(DemoSettingsContext);
  if (!ctx) {
    return {
      theme: "dorado" as ThemeId,
      navStyle: "journey" as NavStyleId,
      setTheme: () => {},
      setNavStyle: () => {},
      themeConfig: BASE_THEME_CONFIG,
    };
  }
  return ctx;
}
