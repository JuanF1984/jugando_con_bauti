import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import CategoryCard from "@/components/CategoryCard";
import { categories } from "@/lib/categories";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 max-w-5xl mx-auto w-full px-8 py-12 flex flex-col gap-12">
        <section>
          <h1 className="font-serif text-[32px] font-semibold text-[var(--ink)] mb-3">
            Jugar para aprender
          </h1>
          <p className="text-[15px] text-[var(--ink-soft)] max-w-[480px]">
            Cuatro mundos para explorar, cada uno con sus propios juegos. Tocá
            uno y vení a conocerlo.
          </p>
        </section>

        <section>
          <div className="grid grid-cols-2 gap-4">
            {categories.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
          <div className="flex flex-col items-center gap-1.5 mt-8">
            <span className="font-serif text-[22px] font-semibold text-[var(--accent)] leading-none">
              +
            </span>
            <p className="text-[15px] text-[var(--ink)] text-center">
              Cada mundo tiene espacio para crecer. Vamos sumando juegos nuevos
              de a poco.
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
