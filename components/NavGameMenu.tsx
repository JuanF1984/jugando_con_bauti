"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { categories } from "@/lib/categories";

export default function NavGameMenu() {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = pathname.startsWith("/juegos");

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={`px-3 py-1.5 rounded-lg text-[14px] flex items-center gap-1.5 transition-colors ${
          isActive || open
            ? "bg-[var(--accent-soft)] text-[var(--accent-dark)]"
            : "text-[var(--ink)] hover:bg-[var(--accent-soft)] hover:text-[var(--accent-dark)]"
        }`}
      >
        Juegos
        <svg
          width="11"
          height="11"
          viewBox="0 0 11 11"
          fill="none"
          className={`transition-transform duration-150 ${open ? "rotate-180" : ""}`}
        >
          <path
            d="M2 3.5l3.5 3.5 3.5-3.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-56 rounded-2xl border border-[var(--line)] bg-[var(--bg)] shadow-[0_4px_20px_rgba(45,42,38,0.10)] overflow-hidden z-50">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={cat.href}
              className="flex items-center justify-between px-4 py-3 border-l-[3px] transition-colors"
              style={{
                borderLeftColor: cat.fg,
                backgroundColor: hovered === cat.id ? cat.bg : "transparent",
              }}
              onMouseEnter={() => setHovered(cat.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <span className="font-serif text-[15px] font-semibold text-[var(--ink)]">
                {cat.nombre}
              </span>
              <span className="text-[12px] font-bold" style={{ color: cat.fg }}>
                {cat.juegoCount} {cat.juegoCount === 1 ? "juego" : "juegos"}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
