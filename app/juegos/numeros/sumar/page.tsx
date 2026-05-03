import type { Metadata } from "next";
import GameHeader from "@/components/GameHeader";
import SiteFooter from "@/components/SiteFooter";
import SumaGame from "@/components/SumaGame";

export const metadata: Metadata = {
  title: "Sumar — Jugando con Bauti",
};

export default function SumarPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <GameHeader backHref="/juegos/numeros" juegoNombre="Sumar" />
      <SumaGame />
      <SiteFooter />
    </div>
  );
}
