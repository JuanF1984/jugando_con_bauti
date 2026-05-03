import type { Metadata } from "next";
import GameHeader from "@/components/GameHeader";
import SiteFooter from "@/components/SiteFooter";
import NumerosGame from "@/components/NumerosGame";

export const metadata: Metadata = {
  title: "Contar — Jugando con Bauti",
};

export default function ContarPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <GameHeader backHref="/juegos/numeros" juegoNombre="Contar" />
      <NumerosGame />
      <SiteFooter />
    </div>
  );
}
