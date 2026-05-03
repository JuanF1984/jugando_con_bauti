import type { Metadata } from "next";
import GameHeader from "@/components/GameHeader";
import SiteFooter from "@/components/SiteFooter";
import MemoryGame from "@/components/MemoryGame";

export const metadata: Metadata = {
  title: "Memoria Letras — Jugando con Bauti",
};

export default function MemoriaLetrasPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <GameHeader backHref="/juegos/memoria" juegoNombre="Memoria Letras" />
      <MemoryGame mode="letras" />
      <SiteFooter />
    </div>
  );
}
