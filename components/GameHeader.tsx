import Link from "next/link";

type Props = {
  backHref: string;
  juegoNombre: string;
};

export default function GameHeader({ backHref, juegoNombre }: Props) {
  return (
    <header className="border-b border-[var(--line)] bg-[var(--bg)]">
      <div className="max-w-5xl mx-auto px-8 h-12 flex items-center gap-4">
        <Link
          href={backHref}
          className="flex items-center gap-1.5 text-[14px] text-[var(--ink)] hover:text-[var(--accent-dark)] transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M10 3L5 8l5 5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Volver
        </Link>

        <div className="w-px h-4 bg-[var(--line-strong)]" />

        <Link href="/" className="flex items-center gap-2">
          <img
            src="/img/jugando%20con%20bauty.svg"
            alt=""
            className="h-[28px] w-auto"
          />
          <span className="font-serif text-[15px] font-semibold text-[var(--ink)]">
            Jugando con Bauti
          </span>
        </Link>

        <div className="flex-1" />

        <span className="font-serif text-[15px] italic text-[var(--ink-soft)]">
          {juegoNombre}
        </span>
      </div>
    </header>
  );
}
