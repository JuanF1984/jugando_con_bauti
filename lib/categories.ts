export type Category = {
  id: string;
  nombre: string;
  descripcion: string;
  juegoCount: number;
  href: string;
  bg: string;
  fg: string;
  preview: string;
};

export const categories: Category[] = [
  {
    id: "letras",
    nombre: "Letras y palabras",
    descripcion: "Conocer las letras, descubrir las palabras.",
    juegoCount: 2,
    href: "/juegos/letras",
    bg: "var(--letras-bg)",
    fg: "var(--letras-fg)",
    preview: "Aa Bb",
  },
  {
    id: "numeros",
    nombre: "Números",
    descripcion: "Los números del 1 al 10 y sus cantidades.",
    juegoCount: 1,
    href: "/juegos/numeros",
    bg: "var(--numeros-bg)",
    fg: "var(--numeros-fg)",
    preview: "1  2  3",
  },
  {
    id: "memoria",
    nombre: "Memoria",
    descripcion: "Encontrá los pares escondidos.",
    juegoCount: 2,
    href: "/juegos/memoria",
    bg: "var(--memoria-bg)",
    fg: "var(--memoria-fg)",
    preview: "?  ?",
  },
  {
    id: "oraciones",
    nombre: "Oraciones",
    descripcion: "Armá oraciones con pictogramas.",
    juegoCount: 1,
    href: "/juegos/oraciones",
    bg: "var(--oraciones-bg)",
    fg: "var(--oraciones-fg)",
    preview: "···",
  },
];
