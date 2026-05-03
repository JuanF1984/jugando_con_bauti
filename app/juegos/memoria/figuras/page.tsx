import type { Metadata } from "next";
import GameHeader from "@/components/GameHeader";
import SiteFooter from "@/components/SiteFooter";
import MemoryGame from "@/components/MemoryGame";

export const metadata: Metadata = {
  title: "Memoria Figuras — Jugando con Bauti",
};

export const revalidate = 3600; // refresh ARASAAC pool once per hour

const WORDS = [
  "casa", "perro", "gato", "sol", "luna", "flor",
  "libro", "pelota", "manzana", "pájaro", "coche", "árbol",
];

async function fetchImagePool(): Promise<string[]> {
  const results = await Promise.all(
    WORDS.map(async (word) => {
      try {
        const res = await fetch(
          `https://api.arasaac.org/api/pictograms/es/search/${encodeURIComponent(word)}`
        );
        if (!res.ok) return null;
        const data = await res.json();
        if (data.length > 0)
          return `https://static.arasaac.org/pictograms/${data[0]._id}/${data[0]._id}_300.png`;
      } catch {}
      return null;
    })
  );
  return results.filter((u): u is string => u !== null);
}

export default async function MemoriaFigurasPage() {
  const imagePool = await fetchImagePool();

  return (
    <>
      {imagePool.map((url) => (
        <link key={url} rel="preload" href={url} as="image" />
      ))}
      <div className="min-h-screen flex flex-col">
        <GameHeader backHref="/juegos/memoria" juegoNombre="Memoria Figuras" />
        <MemoryGame mode="figuras" imagePool={imagePool} />
        <SiteFooter />
      </div>
    </>
  );
}
