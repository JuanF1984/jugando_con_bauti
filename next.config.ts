import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/letras.html",              destination: "/juegos/letras/abecedario",  permanent: true },
      { source: "/numeros.html",             destination: "/juegos/numeros/contar",     permanent: true },
      { source: "/juegoMemoriaFiguras.html", destination: "/juegos/memoria/figuras",   permanent: true },
      { source: "/juegoMemoriaLetras.html",  destination: "/juegos/memoria/letras",    permanent: true },
      { source: "/oraciones.html",           destination: "/juegos/oraciones/armar",   permanent: true },
      { source: "/juegoUnirImagens.html",    destination: "/juegos/letras/asociacion", permanent: true },
      { source: "/nosotros.html",            destination: "/nosotros",                 permanent: true },
      { source: "/contacto.html",            destination: "/contacto",                 permanent: true },
      { source: "/juegos.html",              destination: "/juegos",                   permanent: true },
      { source: "/index.html",               destination: "/",                         permanent: true },
    ];
  },
};

export default nextConfig;
