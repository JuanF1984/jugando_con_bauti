import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t border-[var(--line)] mt-auto">
      <div className="max-w-5xl mx-auto px-8 h-12 flex items-center justify-between">
        <span className="text-[12px] text-[var(--ink-soft)]">
          San Andrés de Giles · {new Date().getFullYear()}
        </span>
        <div className="flex items-center gap-4">
          <Link
            href="/nosotros"
            className="text-[12px] text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors"
          >
            Nosotros
          </Link>
          <Link
            href="/contacto"
            className="text-[12px] text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors"
          >
            Contacto
          </Link>
        </div>
      </div>
    </footer>
  );
}
