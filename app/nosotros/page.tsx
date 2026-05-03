import type { Metadata } from "next";
import Image from "next/image";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Nosotros — Jugando con Bauti",
};

export default function Nosotros() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-8 py-10 sm:py-12">
        <h1 className="font-serif text-[32px] font-semibold text-[var(--ink)] mb-8 sm:mb-10">
          Nosotros
        </h1>

        <div className="flex flex-col sm:flex-row gap-8 sm:gap-10 items-start">
          <div className="relative shrink-0 w-full sm:w-[260px] h-[240px] sm:h-[300px] rounded-2xl overflow-hidden border border-[var(--line)]">
            <Image
              src="/img/Bauty%20r.jpeg"
              alt="Bauti y papá"
              fill
              className="object-cover"
            />
          </div>

          <div className="flex flex-col gap-5 pt-0 sm:pt-1">
            <p className="text-[16px] text-[var(--ink)] leading-relaxed">
              Bauty (en el momento en que le estamos dando vida a este proyecto)
              tiene 3 años, estamos transitando un caminito para que se afiance
              hablando. Entre juego y juego fuimos encontrando algunas páginas
              web en las que se pueden ver letras con palabras de ejemplo.
            </p>
            <p className="text-[16px] text-[var(--ink)] leading-relaxed">
              Yo soy el papá de Bauty, me recibí en el 2005 de analista de
              sistemas. No programé laboralmente nunca, y me alejé de los
              algoritmos durante muchos años hasta que llegó la pandemia
              (anecdóticamente también fue el año que llegó Bauty). Ese
              reencuentro me llevó a dar unos talleres de programación que me
              permitieron actualizar mis conocimientos.
            </p>
            <p className="text-[16px] text-[var(--ink)] leading-relaxed">
              En lo personal, programar es crear pero a la vez jugar: se puede
              decir que es igual a jugar con bloques. Así que nos subimos a
              jugar creando en una compu con Bauty y salió esto. No es algo que
              pueda ser medido en efectividad, sino que es algo que nació del
              amor y lo queremos compartir.
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
