// lib/data.ts

export interface PhotoItem {
  id: string;
  filename?: string;
  src: string;
  title: string;
  description?: string;
  caption?: string;
  category?: string;
  tags?: string[];
  date?: string;
  aspectRatio?: "square" | "portrait" | "landscape";
}

export type GreetingCategory =
  | "amigos"
  | "familia"
  | "trabajo"
  | "viajes"
  | "mas";

export interface Greeting {
  id: string;
  name: string;
  category: GreetingCategory;
  relation?: string;
  message?: string;       // Saludo cálido tipo tarjeta
  avatar?: string;
  videoSrc?: string;      // para videos locales o URLs directas
  youtubeId?: string;     // para YouTube / YouTube Shorts
  thumbnail?: string;
}

export const YOUTUBE_VIDEOS = {
  cumple2026: {
    title: "Canción de Cumpleaños: Los 30 de Sofi",
    subtitle: "Producción especial grabada por tus amigos con guitarras, mates y mucho amor.",
    youtubeId: "kJQP7kiw5Fk",
    description: "Una recopilación con ritmo pop acústico compuesta para recordar las mejores anécdotas de estos años.",
  },
  cumple2024: {
    title: "El Clásico Acústico de los 28",
    subtitle: "La primera serenata improvisada en el balcón.",
    youtubeId: "kJQP7kiw5Fk",
    description: "Grabado en una tarde de verano con una guitarra criolla y toda la emoción compartida.",
  },
};

import galleryData from "./gallery.json";

export const GALLERY_PHOTOS: PhotoItem[] = galleryData as PhotoItem[];
export const SAMPLE_PHOTOS = GALLERY_PHOTOS;

export const CATEGORIES_CONFIG: { key: GreetingCategory; label: string; icon: string }[] = [
  { key: "amigos", label: "Amigos", icon: "sparkles" },
  { key: "familia", label: "Familia", icon: "heart" },
  { key: "trabajo", label: "Trabajo & Diseño", icon: "briefcase" },
  { key: "viajes", label: "Compañeros de Viaje", icon: "compass" },
  { key: "mas", label: "Más Saludos", icon: "plus" },
];

export const SAMPLE_GREETINGS: Greeting[] = [
  // ── Amigos ──────────────────────────────────────────
  {
    id: "valen-rossi",
    name: "Valen Rossi",
    category: "amigos",
    relation: "Amiga de siempre",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
    message: "¡Llegaron los 30 de mi persona favorita! Sobrevivimos a tantas etapas juntas, trasnoches de estudio, risas de vacaciones y ahora celebramos la vida. Te adoro, amiga.",
  },
  {
    id: "flor-gomez",
    name: "Flor Gómez",
    category: "amigos",
    relation: "Capitana de salidas",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    message: "¿Quién dijo que los 30 pesan? ¡Si estás más radiante que nunca! Preparate porque el sábado descorchamos en grande. ¡Te amamos con locura!",
  },
  {
    id: "nico-marcos",
    name: "Nico & Marcos",
    category: "amigos",
    relation: "Los sospechosos de siempre",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    message: "¡Feliz cumple, Sofi! Prometemos que esta vez no quemamos el asado como el año pasado. Gracias por bancar nuestras ocurrencias de siempre.",
  },
  {
    id: "solchu",
    name: "Solchu Martínez",
    category: "amigos",
    relation: "Amiga del alma",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80",
    message: "Amiga hermosa: que esta nueva década te regale todo el amor y los éxitos que te merecés. Gracias por estar siempre con un abrazo y una sonrisa.",
  },

  // ── Familia ──────────────────────────────────────────
  {
    id: "mama-papa",
    name: "Mamá y Papá",
    category: "familia",
    relation: "Los viejos",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
    message: "¡Felices 30 añitos, Sofi de nuestra vida! Verte crecer con tanta pasión, alegría y generosidad es nuestro mayor orgullo. Nunca pierdas esa risa contagiosa que ilumina cualquier casa.",
  },
  {
    id: "lucas-hermano",
    name: "Lucas",
    category: "familia",
    relation: "Hermano menor",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    message: "Feliz cumple a mi hermana favorita. Gracias por bancarme siempre, por los mates eternos de madrugada y por ser la mejor consejera del mundo. Te quiero infinito.",
  },
  {
    id: "abuela-marta",
    name: "Abu Marta",
    category: "familia",
    relation: "La abuela",
    avatar: "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&w=400&q=80",
    message: "Mi querida Sofía: 30 años de pura ternura. Ya te preparé una tarta de manzana casera para cuando vengas el domingo. ¡Que se cumplan todos tus sueños!",
  },

  // ── Trabajo & Diseño ──────────────────────────────────
  {
    id: "equipo-estudio",
    name: "Juli & Martu",
    category: "trabajo",
    relation: "Compañeras de estudio & proyectos",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    message: "¡Feliz cumple, crack total! Trabajar y crear cosas con vos hace que cualquier proyecto desafiante sea pura diversión y buen diseño. ¡A festejar como se debe!",
  },
  {
    id: "camila-m",
    name: "Cami Mendez",
    category: "trabajo",
    relation: "Colega & socia creativa",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    message: "¡Feliz cumple, Sofi! Sos la persona más talentosa, detallista y leal del equipo. ¡Por muchos años más compartiendo metas cumplidas!",
  },

  // ── Compañeros de Viaje ──────────────────────────────
  {
    id: "anita-viajera",
    name: "Anita & Pau",
    category: "viajes",
    relation: "Compañeras de ruta",
    avatar: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=400&q=80",
    message: "Todavía nos acordamos de cuando nos perdimos en las sierras buscando aquel atardecer. ¡Cada viaje con vos es una fiesta inolvidable! ¡Feliz cumpleaños, aventurera!",
  },

  // ── Más Saludos ──────────────────────────────────────
  {
    id: "tomas-pareja",
    name: "Tomás",
    category: "mas",
    relation: "Compañero de vida",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
    message: "Mi amor, feliz cumpleaños. Gracias por llenar cada rincón de música, proyectos y sonrisas. Caminar a tu lado es mi aventura preferida.",
  },
];
