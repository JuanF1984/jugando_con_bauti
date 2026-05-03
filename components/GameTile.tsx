import Link from "next/link";
import type { Juego } from "@/lib/categories";

type Props = {
  juego: Juego;
  bg: string;
  fg: string;
};

export default function GameTile({ juego, bg, fg }: Props) {
  return (
    <Link
      href={juego.href}
      className="group block rounded-xl p-5 border border-[var(--line)] transition-all duration-150 hover:-translate-y-0.5 hover:border-[var(--line-strong)]"
      style={{ backgroundColor: bg }}
    >
      <div
        className="h-20 flex items-center justify-center mb-3 font-serif text-4xl font-semibold select-none"
        style={{ color: fg }}
      >
        {juego.preview}
      </div>
      <h2 className="font-serif text-[17px] font-semibold text-[var(--ink)] mb-1">
        {juego.nombre}
      </h2>
      <p className="text-[13px] text-[var(--ink-soft)]">{juego.descripcion}</p>
    </Link>
  );
}
