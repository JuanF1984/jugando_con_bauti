import Link from "next/link";
import type { Category } from "@/lib/categories";

export default function CategoryCard({ category }: { category: Category }) {
  const { nombre, descripcion, juegoCount, href, bg, fg, preview } = category;

  return (
    <Link
      href={href}
      className="group block rounded-2xl p-6 border border-[var(--line)] transition-all duration-150 hover:-translate-y-0.5 hover:border-[var(--line-strong)]"
      style={{ backgroundColor: bg }}
    >
      <div
        className="h-28 flex items-center justify-center mb-4 font-serif text-5xl font-semibold tracking-wide select-none"
        style={{ color: fg }}
      >
        {preview}
      </div>

      <div className="flex items-end justify-between gap-2">
        <div>
          <h2 className="font-serif text-[19px] font-semibold text-[var(--ink)] leading-tight mb-1">
            {nombre}
          </h2>
          <p className="text-[13px] text-[var(--ink-soft)]">{descripcion}</p>
        </div>
        <span className="shrink-0 text-[12px] font-bold" style={{ color: fg }}>
          {juegoCount} {juegoCount === 1 ? "juego" : "juegos"}
        </span>
      </div>
    </Link>
  );
}
