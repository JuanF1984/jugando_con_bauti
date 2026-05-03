import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories } from "@/lib/categories";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import GameTile from "@/components/GameTile";

type Props = { params: Promise<{ categoria: string }> };

export function generateStaticParams() {
  return categories.map((cat) => ({ categoria: cat.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categoria } = await params;
  const cat = categories.find((c) => c.id === categoria);
  if (!cat) return {};
  return { title: `${cat.nombre} — Jugando con Bauti` };
}

export default async function CategoriaPage({ params }: Props) {
  const { categoria } = await params;
  const cat = categories.find((c) => c.id === categoria);
  if (!cat) notFound();

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <div
        className="border-b border-[var(--line)]"
        style={{ backgroundColor: cat.bg }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-8 py-8">
          <nav className="text-[13px] text-[var(--ink-soft)] mb-4">
            <Link href="/" className="hover:text-[var(--ink)] transition-colors">
              Inicio
            </Link>
            <span className="mx-1.5">›</span>
            <span style={{ color: cat.fg }}>{cat.nombre}</span>
          </nav>
          <h1 className="font-serif text-[32px] font-semibold text-[var(--ink)] mb-1">
            {cat.nombre}
          </h1>
          <p className="text-[15px] text-[var(--ink-soft)]">
            {cat.descripcion}
          </p>
        </div>
      </div>

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {cat.juegos.map((juego) => (
            <GameTile key={juego.id} juego={juego} bg={cat.bg} fg={cat.fg} />
          ))}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
