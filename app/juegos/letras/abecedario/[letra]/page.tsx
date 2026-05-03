import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import GameHeader from "@/components/GameHeader";
import GameContextBar from "@/components/GameContextBar";
import NavCircle from "@/components/NavCircle";
import SiteFooter from "@/components/SiteFooter";
import { letras, getSlug } from "@/lib/data/letras";

type Props = { params: Promise<{ letra: string }> };

export const dynamic = "force-dynamic";

const PREVIEW_LETTERS = ["A", "B", "C", "D", "E"];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { letra } = await params;
  const item = letras.find((l) => getSlug(l) === letra);
  if (!item) return {};
  return { title: `${item.letra} de ${item.palabra} — Jugando con Bauti` };
}

export default async function LetraPage({ params }: Props) {
  const { letra } = await params;
  const index = letras.findIndex((l) => getSlug(l) === letra);
  if (index === -1) notFound();

  const item = letras[index];
  const prev = index > 0 ? letras[index - 1] : null;
  const next = index < letras.length - 1 ? letras[index + 1] : null;

  const c = await cookies();
  const profile = c.get("jcb_profile")?.value as "bauti" | "otro" | undefined;
  const useAlt = profile === "otro";

  const palabra = (useAlt && item.palabraAlt) ? item.palabraAlt : item.palabra;
  const imagen = (useAlt && item.imagenAlt) ? item.imagenAlt : item.imagen;

  return (
    <div className="min-h-screen flex flex-col">
      <GameHeader backHref="/juegos/letras/abecedario" juegoNombre="Abecedario" />
      <GameContextBar current={index + 1} total={letras.length} />

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-10 gap-8">
        <div className="flex items-center gap-8">
          <NavCircle
            direction="prev"
            href={prev ? `/juegos/letras/abecedario/${getSlug(prev)}` : undefined}
          />

          <div
            className="rounded-2xl px-10 py-8 flex flex-col items-center gap-4 w-[300px]"
            style={{ backgroundColor: "var(--letras-bg)" }}
          >
            <div
              className="font-serif text-[130px] font-semibold leading-none select-none"
              style={{ color: "var(--letras-fg)" }}
            >
              {item.letra}
              {item.letra.toLowerCase()}
            </div>

            <img
              src={imagen}
              alt={palabra}
              className="w-40 h-40 object-contain"
            />

            <div className="font-serif text-[40px] font-semibold text-[var(--ink)] leading-tight">
              {palabra.toUpperCase()}
            </div>
          </div>

          <NavCircle
            direction="next"
            href={next ? `/juegos/letras/abecedario/${getSlug(next)}` : undefined}
          />
        </div>

        <Link
          href="/juegos/letras/abecedario"
          className="group flex items-center gap-3 px-5 py-3 rounded-full border border-[var(--line-strong)] hover:border-[var(--accent)] hover:bg-[var(--accent-soft)] transition-all"
        >
          <div className="flex items-center gap-1">
            {PREVIEW_LETTERS.map((l) => (
              <span
                key={l}
                className="w-7 h-7 rounded-lg flex items-center justify-center bg-[var(--accent-soft)] group-hover:bg-white/60 font-serif text-[13px] font-semibold text-[var(--accent-dark)]"
              >
                {l}
              </span>
            ))}
            <span className="text-[12px] text-[var(--ink-soft)] mx-1">···</span>
          </div>
          <span className="text-[14px] text-[var(--ink)]">Ver abecedario</span>
        </Link>
      </main>

      <SiteFooter />
    </div>
  );
}
