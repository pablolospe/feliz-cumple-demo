// En pantallas táctiles el autoFocus abre el teclado de golpe y tapa el diseño
export const canAutoFocus = () =>
  typeof window !== "undefined" && !window.matchMedia("(pointer: coarse)").matches;
