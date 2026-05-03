import type { Metadata } from "next";
import GameHeader from "@/components/GameHeader";
import SiteFooter from "@/components/SiteFooter";
import OracionesGame from "@/components/OracionesGame";

export const metadata: Metadata = {
  title: "Armar oraciones — Jugando con Bauti",
};

export const revalidate = 3600;

const ALL_WORDS = [
  "caballo", "perro", "gato", "niño", "niña",
  "pájaro", "conejo", "hamster", "colibri", "tortuga",
  "jugar", "correr", "dormir", "comer", "saltar",
  "bosque", "parque", "casa", "campo", "playa",
];

async function fetchPictogramas(): Promise<Record<string, string>> {
  const results = await Promise.all(
    ALL_WORDS.map(async (word) => {
      try {
        const res = await fetch(
          `https://api.arasaac.org/api/pictograms/es/search/${encodeURIComponent(word)}`
        );
        if (!res.ok) return [word, null] as const;
        const data = await res.json();
        if (data.length > 0)
          return [
            word,
            `https://static.arasaac.org/pictograms/${data[0]._id}/${data[0]._id}_300.png`,
          ] as const;
      } catch {}
      return [word, null] as const;
    })
  );

  return Object.fromEntries(
    results.filter(([, url]) => url !== null) as [string, string][]
  );
}

export default async function ArmarOracionesPage() {
  const pictogramas = await fetchPictogramas();

  return (
    <>
      {Object.values(pictogramas).map((url) => (
        <link key={url} rel="preload" href={url} as="image" />
      ))}
      <div className="min-h-screen flex flex-col">
        <GameHeader backHref="/juegos/oraciones" juegoNombre="Armar oraciones" />
        <OracionesGame pictogramas={pictogramas} />
        <SiteFooter />
      </div>
    </>
  );
}
