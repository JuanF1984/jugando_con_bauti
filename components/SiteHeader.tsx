"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import NavGameMenu from "@/components/NavGameMenu";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
];

export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="border-b border-[var(--line)] bg-[var(--bg)]">
      <div className="max-w-5xl mx-auto px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <img
            src="/img/jugando%20con%20bauty.svg"
            alt=""
            className="h-[54px] w-auto"
          />
          <div>
            <div className="font-serif text-[18px] font-semibold text-[var(--ink)] leading-tight">
              Jugando con Bauti
            </div>
            <div className="text-[11px] text-[var(--ink-soft)] leading-tight">
              juegos para aprender jugando
            </div>
          </div>
        </Link>

        <nav>
          <ul className="flex items-center gap-1 list-none m-0 p-0">
            {navLinks.map(({ href, label }) => {
              const isActive =
                href === "/"
                  ? pathname === "/"
                  : pathname === href || pathname.startsWith(href + "/");

              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`px-3 py-1.5 rounded-lg text-[14px] transition-colors ${
                      isActive
                        ? "bg-[var(--accent-soft)] text-[var(--accent-dark)]"
                        : "text-[var(--ink)] hover:bg-[var(--accent-soft)] hover:text-[var(--accent-dark)]"
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
            <li>
              <NavGameMenu />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
