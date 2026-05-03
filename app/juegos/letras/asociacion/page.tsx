import type { Metadata } from "next";
import { cookies } from "next/headers";
import GameHeader from "@/components/GameHeader";
import SiteFooter from "@/components/SiteFooter";
import AsociacionGame from "@/components/AsociacionGame";

export const metadata: Metadata = {
  title: "Asociación — Jugando con Bauti",
};

export default async function AsociacionPage() {
  const c = await cookies();
  const profile = c.get("jcb_profile")?.value as "bauti" | "otro" | undefined;

  return (
    <div className="min-h-screen flex flex-col">
      <GameHeader backHref="/juegos/letras" juegoNombre="Asociación" />
      <AsociacionGame profile={profile} />
      <SiteFooter />
    </div>
  );
}
