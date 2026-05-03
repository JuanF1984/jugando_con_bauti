"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import NavGameMenu from "@/components/NavGameMenu";
import { categories } from "@/lib/categories";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header className="border-b border-[var(--line)] bg-[var(--bg)] relative z-40">
      <div className="max-w-5xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <img
            src="/img/jugando%20con%20bauty.svg"
            alt=""
            className="h-[54px] w-auto"
          />
          <div className="hidden sm:block">
            <div className="font-serif text-[18px] font-semibold text-[var(--ink)] leading-tight">
              Jugando con Bauti
            </div>
            <div className="text-[11px] text-[var(--ink-soft)] leading-tight">
              juegos para aprender jugando
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
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

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col justify-center gap-[5px] w-10 h-10 rounded-lg hover:bg-[var(--accent-soft)] transition-colors"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Menú"
        >
          <span
            className={`block mx-auto w-5 h-0.5 bg-[var(--ink)] transition-transform origin-center duration-200 ${
              mobileOpen ? "rotate-45 translate-y-[7px]" : ""
            }`}
          />
          <span
            className={`block mx-auto w-5 h-0.5 bg-[var(--ink)] transition-opacity duration-200 ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block mx-auto w-5 h-0.5 bg-[var(--ink)] transition-transform origin-center duration-200 ${
              mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[var(--line)] bg-[var(--bg)] px-4 py-3 flex flex-col">
          {navLinks.map(({ href, label }) => {
            const isActive =
              href === "/"
                ? pathname === "/"
                : pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                className={`px-3 py-2.5 rounded-lg text-[15px] transition-colors ${
                  isActive
                    ? "bg-[var(--accent-soft)] text-[var(--accent-dark)]"
                    : "text-[var(--ink)] hover:bg-[var(--accent-soft)]"
                }`}
              >
                {label}
              </Link>
            );
          })}

          <div className="mt-2 pt-2 border-t border-[var(--line)]">
            <span className="text-[11px] font-bold text-[var(--ink-soft)] uppercase tracking-widest px-3 mb-1 block">
              Juegos
            </span>
            {categories.map((cat) => {
              const isActive = pathname.startsWith(cat.href);
              return (
                <Link
                  key={cat.id}
                  href={cat.href}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-[15px] border-l-[3px] transition-colors ${
                    isActive ? "bg-[var(--accent-soft)]" : "hover:bg-[var(--accent-soft)]"
                  }`}
                  style={{ borderLeftColor: cat.fg }}
                >
                  <span className="text-[var(--ink)]">{cat.nombre}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
