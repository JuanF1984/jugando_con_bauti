"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function NavigationLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  // Hide when navigation completes
  useEffect(() => {
    setLoading(false);
  }, [pathname]);

  // Intercept internal link clicks
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("http") ||
        href.startsWith("mailto:") ||
        href === pathname
      )
        return;
      setLoading(true);
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [pathname]);

  if (!loading) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-5"
      style={{
        backgroundColor: "rgba(253, 252, 248, 0.80)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
      }}
    >
      <span
        className="font-serif text-[18px] font-semibold"
        style={{ color: "var(--ink-soft)" }}
      >
        Jugando con Bauti
      </span>
      <div className="flex gap-2.5">
        {[0, 150, 300].map((delay) => (
          <span
            key={delay}
            className="w-3 h-3 rounded-full animate-bounce"
            style={{
              backgroundColor: "var(--accent)",
              animationDelay: `${delay}ms`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
