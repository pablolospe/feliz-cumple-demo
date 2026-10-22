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
    id: "saludo1",
    order: 1,
    title: "Saludo 1",
    subtitle: "Video sorpresa",
    icon: "film",
    route: "/home/sections/saludo1",
    question: "¿Comida infaltable para una noche con amigos?",
    hint: "Al molde o a la piedra con queso...",
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
  {
    id: "saludo2",
    order: 2,
    title: "Saludo 2",
    subtitle: "Mensaje especial",
    icon: "film",
    route: "/home/sections/saludo2",
    question: "¿Bebida infaltable en cada previa o juntada?",
    hint: "Amargo o dulce con hielo...",
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
    id: "saludo3",
    order: 3,
    title: "Saludo 3",
    subtitle: "Dedicatoria",
    icon: "film",
    route: "/home/sections/saludo3",
    question: "¿El clásico almuerzo de domingo con amigos y familia?",
    hint: "Brasas y aplauso para el asador...",
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
    order: 4,
    title: "Galería de Fotos",
    subtitle: "Momentos compartidos",
    icon: "camera",
    route: "/home/sections/fotos",
    question: "¿Infusión infaltable en mañanas y charlas?",
    hint: "Yerba, termo y agua caliente...",
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
    id: "escape-room",
    order: 5,
    title: "Sala de Escape",
    subtitle: "Desafío de acertijos",
    icon: "key",
    route: "/home/sections/escape-room",
    question: "¿La clave final para abrir la Sala de Escape?",
    hint: "Brillan en el cielo nocturno...",
    exampleAnswer: "estrellas",
    validate: (ans: string) => {
      const clean = ans.toLowerCase().trim();
      return (
        clean.includes("estrellas") ||
        clean.includes("estrella") ||
        clean.includes("luz") ||
        clean.includes("amigos")
      );
    },
  },
];

export const EASTER_EGG_CONFIG = {
  id: "easter-egg-secreto",
  promptQuestion: "La vida sin amigos es como un cielo sin...",
  hint: "Brillan en la noche...",
  exampleAnswer: "estrellas",
  validate: (ans: string) => {
    const clean = ans.toLowerCase().trim();
    return clean.includes("estrellas") || clean.includes("estrella") || clean.includes("luz");
  },
};
