"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type ThemeId = "standard" | "foodie" | "space" | "wes";
export type NavStyleId = "cards" | "journey" | "timeline";

interface DemoSettingsContextType {
  theme: ThemeId;
  navStyle: NavStyleId;
  setTheme: (t: ThemeId) => void;
  setNavStyle: (n: NavStyleId) => void;
  themeConfig: ThemeConfig;
}

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  badge: string;
  tagline: string;
  greetingHeader: string;
  secretButtonText: string;
  secretPrompt: string;
  secretHint: string;
  secretAnswer: string;
  secretReward: string;
  sectionCopy: Record<string, {
    title: string;
    subtitle: string;
    icon: string;
    badgeText?: string;
    question: string;
    hint: string;
    exampleAnswer: string;
    validateKeywords: string[];
  }>;
}

export const THEMES_META: Record<ThemeId, ThemeConfig> = {
  standard: {
    id: "standard",
    name: "Golden Glam (Standard)",
    badge: "1. Standard",
    tagline: "Elegante & Festivo",
    greetingHeader: "¡Felices 30 Sofi! ✨",
    secretButtonText: "¿Un secreto más?",
    secretPrompt: "La vida sin amigos es como un cielo sin...",
    secretHint: "Brillan en la noche...",
    secretAnswer: "estrellas",
    secretReward: "¡Exacto! Gracias por llenar nuestros días de luz y risas. ✨",
    sectionCopy: {
      cumple2026: {
        title: "Video Musical de los 30",
        subtitle: "La sorpresa audiovisual producida por tus amigos",
        icon: "music",
        badgeText: "El Gran Estreno",
        question: "Infaltable en cada previa, cumpleaños o juntada con amigos: ¿qué bebida compartimos siempre?",
        hint: "Amargo o dulce, con hielo y espuma...",
        exampleAnswer: "fernet",
        validateKeywords: ["fernet", "cerveza", "birra", "vino", "trago"],
      },
      cumple2024: {
        title: "El Recuerdo de los 28",
        subtitle: "La versión acústica que quedó en la historia",
        icon: "disc",
        badgeText: "Acústico Retro",
        question: "El ritual sagrado de los domingos al mediodía para reunir a la familia y amigos:",
        hint: "Carne a la parrilla, brasas y aplauso para el asador...",
        exampleAnswer: "asado",
        validateKeywords: ["asado", "parrilla", "pastas", "almuerzo"],
      },
      fotos: {
        title: "Galería de Recuerdos",
        subtitle: "Risas, viajes y momentos compartidos capturados en fotos",
        icon: "camera",
        badgeText: "Álbum de Recuerdos",
        question: "Compañero inseparable de mañanas, estudio y charlas eternas: ¿qué nunca falta sobre la mesa?",
        hint: "Yerba, termo, bombilla y agua caliente...",
        exampleAnswer: "mate",
        validateKeywords: ["mate", "cafe", "café"],
      },
      saludos: {
        title: "Galería de Saludos",
        subtitle: "Mensajes y cartas llenas de amor de tu gente",
        icon: "film",
        badgeText: "Muro de Dedicatorias",
        question: "La comida salvadora por excelencia para una noche de series o festejo improvisado:",
        hint: "Al molde o a la piedra, con mucho queso y orégano...",
        exampleAnswer: "pizza",
        validateKeywords: ["pizza", "empanadas", "hamburguesa"],
      },
    },
  },
  foodie: {
    id: "foodie",
    name: "La Ruta Foodie (Sobremesa Cálida)",
    badge: "2. Foodie",
    tagline: "Café, Bodegón & Charlas",
    greetingHeader: "¡La Gran Sobremesa de los 30! ☕🥖",
    secretButtonText: "☕ ¿Un postre fuera de carta?",
    secretPrompt: "La mejor sobremesa del mundo siempre se corona con un rico...",
    secretHint: "Flan mixto, tiramisú, café espresso o volcán de chocolate...",
    secretAnswer: "postre",
    secretReward: "¡Salud y buen provecho! La vida se disfruta en bocados compartidos y charlas infinitas con la gente que queremos. 🍷☕",
    sectionCopy: {
      cumple2026: {
        title: "El Brindis Principal",
        subtitle: "La banda sonora de nuestras mejores cenas, cafés de especialidad y trasnoches",
        icon: "wine",
        badgeText: "Paso 1: Aperitivo",
        question: "¿Qué copa o trago descorchamos siempre cuando empieza a picar el hambre en la sobremesa?",
        hint: "Vino tinto, vermut con soda o birra bien helada...",
        exampleAnswer: "vino",
        validateKeywords: ["vino", "vermut", "cerveza", "birra", "fernet"],
      },
      cumple2024: {
        title: "Asado & Serenata",
        subtitle: "Aquel domingo de fuego lento, guitarreada y aplauso al asador",
        icon: "flame",
        badgeText: "Paso 2: Plato Fuerte",
        question: "El fuego sagrado del domingo que convoca a toda la barra a la mesa:",
        hint: "Costillitas, brasas al rojo vivo y ensalada de rúcula...",
        exampleAnswer: "asado",
        validateKeywords: ["asado", "parrilla", "fuego", "vacio", "achuras"],
      },
      fotos: {
        title: "Pasaporte Gastronómico",
        subtitle: "Registro fotográfico de banquetes, tostadas, cafecitos y risas",
        icon: "utensils",
        badgeText: "Paso 3: Cafecito & Recuerdos",
        question: "Para bajar la comida y estirar la charla durante horas: ¿qué infusión se pide?",
        hint: "Espresso doble, flat white o unos buenos amargos...",
        exampleAnswer: "cafe",
        validateKeywords: ["cafe", "café", "mate", "te", "cortado"],
      },
      saludos: {
        title: "Servilletas & Firmas",
        subtitle: "Mensajes escritos a birome en mantel de papel con dedicatorias sinceras",
        icon: "heart",
        badgeText: "Paso 4: El Brindis Final",
        question: "El plato para compartir cuando somos 15 y nadie quiere lavar los platos:",
        hint: "De muzzarella, fugazzeta rellena o napolitana con fainá...",
        exampleAnswer: "pizza",
        validateKeywords: ["pizza", "empanadas", "picada"],
      },
    },
  },
  space: {
    id: "space",
    name: "Star Wars: Episodio 30",
    badge: "3. Star Wars",
    tagline: "Hace mucho tiempo, en una galaxia muy cercana...",
    greetingHeader: "⚔️ Episodio XXX: El Ascenso de Sofi",
    secretButtonText: "🌌 ¿Transmisión holográfica de la Alianza Rebelde?",
    secretPrompt: "Que la Fuerza te acompañe... pero sobre todo, que nunca falte la...",
    secretHint: "Amistad, la fuerza rebelde o el amor de la tripulación...",
    secretAnswer: "fuerza",
    secretReward: "¡El Halcón Milenario ha aterrizado en la fiesta! Que la Fuerza esté siempre con vos, maestra Jedi. ⚔️✨",
    sectionCopy: {
      cumple2026: {
        title: "Himno de la Cantina de Mos Eisley",
        subtitle: "La pista compuesta por la banda de la Alianza Rebelde",
        icon: "radio",
        badgeText: "Sector 01: Frecuencia Rebelde",
        question: "Brebaje icónico para brindar en la Cantina con contrabandistas y amigos de confianza:",
        hint: "Leche azul de Tatooine o el elixir espumoso de las juntadas (Fernet / Cerveza)...",
        exampleAnswer: "fernet",
        validateKeywords: ["fernet", "cerveza", "birra", "vino", "leche"],
      },
      cumple2024: {
        title: "Crónicas de Tatooine (Año 28)",
        subtitle: "Grabación analógica recuperada de la memoria de R2-D2",
        icon: "satellite",
        badgeText: "Sector 02: Memoria de Droide",
        question: "El banquete ceremonial de domingo en la base rebelde antes de saltar al hiperespacio:",
        hint: "Fuego a la leña, parrilla y aplauso para el asador del Borde Exterior...",
        exampleAnswer: "asado",
        validateKeywords: ["asado", "parrilla", "banquete", "almuerzo"],
      },
      fotos: {
        title: "Holocrón de Recuerdos",
        subtitle: "Archivos holográficos de expediciones a mundos lejanos y planetas felices",
        icon: "orbit",
        badgeText: "Sector 03: Holocrón Jedi",
        question: "El artefacto místico de infusión caliente que los caballeros Jedi comparten en silencio:",
        hint: "Calabaza orgánica terrestre con bombilla metálica y agua caliente a 80°C...",
        exampleAnswer: "mate",
        validateKeywords: ["mate", "cafe", "café"],
      },
      saludos: {
        title: "Holomensajes de la Galaxia",
        subtitle: "«Ayúdame, Sofi Kenobi, eres nuestra única esperanza»: saludos de toda la tripulación",
        icon: "cpu",
        badgeText: "Sector 04: Transmisión Holográfica",
        question: "Ración redonda de la República dividida en 8 porciones triangulares con queso fundido:",
        hint: "La legendaria pizza intergaláctica...",
        exampleAnswer: "pizza",
        validateKeywords: ["pizza", "empanadas"],
      },
    },
  },
  wes: {
    id: "wes",
    name: "The Grand Budapest Hotel / Wes Anderson",
    badge: "4. Wes Anderson",
    tagline: "Simetría, Pasteles & Nostalgia Fílmica",
    greetingHeader: "The Grand Sofi Hotel & Society (Capítulo 30) 🎈",
    secretButtonText: "🏨 ¿Una nota confidencial del Concierge?",
    secretPrompt: "En el lobby de la vida, las habitaciones más cálidas siempre las reservan...",
    secretHint: "Tus amigos, tu familia o tus afectos incondicionales...",
    secretAnswer: "amigos",
    secretReward: "¡«Courtesan au Chocolat» de Mendl's para la homenajeada! Toda escena con vos rebosa poesía visual. 🧁🎬",
    sectionCopy: {
      cumple2026: {
        title: "Banda Sonora en 35mm",
        subtitle: "Composición simétrica con mandolinas y xilofones por la Sociedad de Amigos",
        icon: "sparkles",
        badgeText: "Acto I: La Obertura Simétrica",
        question: "El licor vintage servido en copas de cristal facetado durante el prólogo:",
        hint: "Vino de cosecha, vermú con sifón o cerveza artesanal de época...",
        exampleAnswer: "vino",
        validateKeywords: ["vino", "fernet", "cerveza", "birra", "vermut"],
      },
      cumple2024: {
        title: "Escena Retrospectiva (Año 28)",
        subtitle: "Fotograma en 16mm con serenata acústica filmada con lente anamórfica",
        icon: "film",
        badgeText: "Acto II: El Recuerdo en Pastel",
        question: "El banquete campestre de domingo donde los personajes visten atuendos coordinados:",
        hint: "Brasas de leña aromática, mantel a cuadros y risas en plano cenital...",
        exampleAnswer: "asado",
        validateKeywords: ["asado", "banquete", "parrilla", "almuerzo"],
      },
      fotos: {
        title: "La Colección Mendl's",
        subtitle: "Archivo fotográfico encuadrado con rigurosa simetría frontal y tonos pasteles",
        icon: "camera",
        badgeText: "Acto III: El Álbum de Fotogramas",
        question: "La infusión matutina compartida entre expediciones con termo de cuero y bombilla de alpaca:",
        hint: "Amargo o dulce, infusión nacional rioplatense...",
        exampleAnswer: "mate",
        validateKeywords: ["mate", "cafe", "café"],
      },
      saludos: {
        title: "Telegramas de la Sociedad Secreta",
        subtitle: "Epístolas mecanografiadas en máquina Olivetti y selladas con lacre por el elenco",
        icon: "feather",
        badgeText: "Acto IV: Epílogo Mecanografiado",
        question: "El refrigerio nocturno entregado en paquete de cartón cuadrado y consumido en el vagón:",
        hint: "Circular, humeante y dividida en sectores triangulares perfectos...",
        exampleAnswer: "pizza",
        validateKeywords: ["pizza", "empanadas"],
      },
    },
  },
};

const DemoSettingsContext = createContext<DemoSettingsContextType | null>(null);

const STORAGE_THEME_KEY = "demo_chosen_theme";
const STORAGE_NAV_KEY = "demo_chosen_nav_style";

export function DemoSettingsProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>("standard");
  const [navStyle, setNavStyleState] = useState<NavStyleId>("cards");

  useEffect(() => {
    const savedTheme = localStorage.getItem(STORAGE_THEME_KEY) as ThemeId | null;
    const savedNav = localStorage.getItem(STORAGE_NAV_KEY) as NavStyleId | null;
    if (savedTheme && (savedTheme === "standard" || savedTheme === "foodie" || savedTheme === "space" || savedTheme === "wes")) {
      setThemeState(savedTheme);
    }
    if (savedNav && (savedNav === "cards" || savedNav === "journey" || savedNav === "timeline")) {
      setNavStyleState(savedNav);
    }
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, [theme]);

  const setTheme = (t: ThemeId) => {
    setThemeState(t);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_THEME_KEY, t);
    }
  };

  const setNavStyle = (n: NavStyleId) => {
    setNavStyleState(n);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_NAV_KEY, n);
    }
  };

  const themeConfig = THEMES_META[theme] || THEMES_META.standard;

  return (
    <DemoSettingsContext.Provider
      value={{
        theme,
        navStyle,
        setTheme,
        setNavStyle,
        themeConfig,
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
      theme: "standard" as ThemeId,
      navStyle: "cards" as NavStyleId,
      setTheme: () => {},
      setNavStyle: () => {},
      themeConfig: THEMES_META.standard,
    };
  }
  return ctx;
}
