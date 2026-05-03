import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import GameHeader from "@/components/GameHeader";
import SiteFooter from "@/components/SiteFooter";
import ProfileSelector from "@/components/ProfileSelector";
import ProfileBanner from "@/components/ProfileBanner";
import { letras, getSlug } from "@/lib/data/letras";

export const metadata: Metadata = {
  title: "Abecedario — Jugando con Bauti",
};

export default async function AbecedarioGrid() {
  const c = await cookies();
  const profile = c.get("jcb_profile")?.value as "bauti" | "otro" | undefined;

  return (
    <div className="min-h-screen flex flex-col">
      <GameHeader backHref="/juegos/letras" juegoNombre="Abecedario" />

      {profile == null ? (
        <ProfileSelector />
      ) : (
        <>
          <ProfileBanner profile={profile} />
          <main className="flex-1 max-w-5xl mx-auto w-full px-8 py-10">
            <div className="mb-8">
              <h1 className="font-serif text-[24px] font-semibold text-[var(--ink)] mb-1">
                Elegí una letra
              </h1>
              <p className="text-[15px] text-[var(--ink-soft)]">
                Tocá la letra que quieras conocer
              </p>
            </div>

            <div className="grid grid-cols-6 gap-3">
              {letras.map((item) => (
                <Link
                  key={item.letra}
                  href={`/juegos/letras/abecedario/${getSlug(item)}`}
                  className="aspect-square flex items-center justify-center rounded-xl border border-[var(--accent-border)] bg-[var(--accent-soft)] font-serif text-[38px] font-semibold text-[var(--accent-dark)] transition-all hover:bg-[var(--accent)] hover:text-[var(--bg)] hover:border-[var(--accent)] hover:-translate-y-0.5 active:bg-[var(--accent-dark)] active:border-[var(--accent-dark)] active:translate-y-0"
                >
                  {item.letra}
                </Link>
              ))}
            </div>
          </main>
        </>
      )}

      <SiteFooter />
    </div>
  );
}
