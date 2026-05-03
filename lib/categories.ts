export type Juego = {
  id: string;
  nombre: string;
  descripcion: string;
  href: string;
  preview: string;
};

export type Category = {
  id: string;
  nombre: string;
  descripcion: string;
  juegoCount: number;
  href: string;
  bg: string;
  fg: string;
  preview: string;
  juegos: Juego[];
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
    juegos: [
      {
        id: "abecedario",
        nombre: "Abecedario",
        descripcion: "Explorá las 27 letras. Cada una con su imagen y su palabra.",
        href: "/juegos/letras/abecedario",
        preview: "Aa",
      },
      {
        id: "asociacion",
        nombre: "Asociación",
        descripcion: "Uní cada imagen con su nombre. De a seis pares a la vez.",
        href: "/juegos/letras/asociacion",
        preview: "A↔",
      },
    ],
  },
  {
    id: "numeros",
    nombre: "Números",
    descripcion: "Los números del 1 al 10 y sus cantidades.",
    juegoCount: 2,
    href: "/juegos/numeros",
    bg: "var(--numeros-bg)",
    fg: "var(--numeros-fg)",
    preview: "1  2  3",
    juegos: [
      {
        id: "contar",
        nombre: "Contar",
        descripcion: "Elegís un número del 1 al 10 y ves cuántos objetos son.",
        href: "/juegos/numeros/contar",
        preview: "1 2 3",
      },
      {
        id: "sumar",
        nombre: "Sumar",
        descripcion: "Elegís dos números y ves cuántos son en total.",
        href: "/juegos/numeros/sumar",
        preview: "2+3",
      },
    ],
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
    juegos: [
      {
        id: "figuras",
        nombre: "Figuras",
        descripcion: "Encontrá los 8 pares de pictogramas entre 16 cartas.",
        href: "/juegos/memoria/figuras",
        preview: "◻ ◻",
      },
      {
        id: "letras",
        nombre: "Letras",
        descripcion: "Encontrá los 8 pares de letras entre 16 cartas.",
        href: "/juegos/memoria/letras",
        preview: "A A",
      },
    ],
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
    juegos: [
      {
        id: "armar",
        nombre: "Armar oraciones",
        descripcion: "Elegís un personaje y se arma una oración con pictogramas.",
        href: "/juegos/oraciones/armar",
        preview: "···",
      },
    ],
  },
];
