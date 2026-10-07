// lib/questions.ts

export interface SectionConfig {
  id: string;
  order: number;
  title: string;
  subtitle: string;
  icon: string;
  route: string;
  question: string;
  hint?: string;
  exampleAnswer?: string;
  validate: (answer: string) => boolean;
}

export const SECTIONS: SectionConfig[] = [
  {
    id: "cumple2026",
    order: 1,
    title: "Video Musical de los 30",
    subtitle: "La sorpresa musical producida por tus amigos",
    icon: "music",
    route: "/home/sections/cumple2026",
    question: "Infaltable en cada previa, cumpleaños o juntada con amigos: ¿qué bebida compartimos siempre?",
    hint: "Amargo o dulce, con hielo y espuma...",
    exampleAnswer: "fernet",
    validate: (ans: string) => {
      const clean = ans.toLowerCase().trim();
      return (
        clean.includes("fernet") ||
        clean.includes("cerveza") ||
        clean.includes("birra") ||
        clean.includes("vino") ||
        clean.includes("trago")
      );
    },
  },
  {
    id: "cumple2024",
    order: 2,
    title: "El Recuerdo de los 28",
    subtitle: "La versión acústica que quedó en la historia",
    icon: "disc",
    route: "/home/sections/cumple2024",
    question: "El ritual sagrado de los domingos al mediodía para reunir a la familia y amigos:",
    hint: "Carne a la parrilla, brasas y aplauso para el asador...",
    exampleAnswer: "asado",
    validate: (ans: string) => {
      const clean = ans.toLowerCase().trim();
      return (
        clean.includes("asado") ||
        clean.includes("parrilla") ||
        clean.includes("pastas") ||
        clean.includes("almuerzo")
      );
    },
  },
  {
    id: "fotos",
    order: 3,
    title: "Galería de Recuerdos",
    subtitle: "Risas, viajes y momentos compartidos.",
    icon: "camera",
    route: "/home/sections/fotos",
    question: "Compañero inseparable de mañanas, estudio y charlas eternas: ¿qué nunca falta sobre la mesa?",
    hint: "Yerba, termo, bombilla y agua caliente...",
    exampleAnswer: "mate",
    validate: (ans: string) => {
      const clean = ans.toLowerCase().trim();
      return (
        clean.includes("mate") ||
        clean.includes("cafe") ||
        clean.includes("café")
      );
    },
  },
  {
    id: "saludos",
    order: 4,
    title: "Galería de Saludos",
    subtitle: "Mensajes y cartas llenas de amor de tu gente",
    icon: "film",
    route: "/home/sections/saludos",
    question: "La comida salvadora por excelencia para una noche de series o festejo improvisado:",
    hint: "Al molde o a la piedra, con mucho queso y orégano...",
    exampleAnswer: "pizza",
    validate: (ans: string) => {
      const clean = ans.toLowerCase().trim();
      return (
        clean.includes("pizza") ||
        clean.includes("empanadas") ||
        clean.includes("hamburguesa")
      );
    },
  },
];

export const EASTER_EGG_CONFIG = {
  id: "easter-egg-secreto",
  promptQuestion: "La vida sin amigos es como un cielo sin...",
  exampleAnswer: "estrellas",
  validate: (ans: string) => {
    const clean = ans.toLowerCase().trim();
    return clean.includes("estrellas") || clean.includes("sol") || clean.includes("luz");
  },
  rewardMessage: "¡Exacto! Gracias por llenar nuestros días de luz y risas. ✨",
  youtubeId: "kJQP7kiw5Fk",
};
