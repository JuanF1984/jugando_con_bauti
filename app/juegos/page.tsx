import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import CategoryCard from "@/components/CategoryCard";
import { categories } from "@/lib/categories";

export const metadata: Metadata = {
  title: "Juegos — Jugando con Bauti",
};

export default function Juegos() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 max-w-5xl mx-auto w-full px-8 py-12 flex flex-col gap-12">
        <section>
          <h1 className="font-serif text-[32px] font-semibold text-[var(--ink)] mb-3">
            Juegos
          </h1>
          <p className="text-[15px] text-[var(--ink-soft)] max-w-[480px]">
            Cuatro mundos para explorar. Tocá uno y conocé los juegos que tiene adentro.
          </p>
        </section>

        <section>
          <div className="grid grid-cols-2 gap-4">
            {categories.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
