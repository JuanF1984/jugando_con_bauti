import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Contacto — Jugando con Bauti",
};

export default function Contacto() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 max-w-5xl mx-auto w-full px-8 py-12">
        <h1 className="font-serif text-[32px] font-semibold text-[var(--ink)] mb-2">
          Contacto
        </h1>
        <p className="text-[15px] text-[var(--ink-soft)] mb-10">
          ¿Tenés alguna sugerencia o querés contarnos algo? Escribinos.
        </p>

        <form className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="name"
              className="text-[14px] font-bold text-[var(--ink)]"
            >
              Nombre
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="h-10 px-3 rounded-xl border border-[var(--line)] bg-[var(--bg)] text-[var(--ink)] text-[15px] outline-none focus:border-[var(--accent)] transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="text-[14px] font-bold text-[var(--ink)]"
            >
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="h-10 px-3 rounded-xl border border-[var(--line)] bg-[var(--bg)] text-[var(--ink)] text-[15px] outline-none focus:border-[var(--accent)] transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="subject"
              className="text-[14px] font-bold text-[var(--ink)]"
            >
              Asunto
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              className="h-10 px-3 rounded-xl border border-[var(--line)] bg-[var(--bg)] text-[var(--ink)] text-[15px] outline-none focus:border-[var(--accent)] transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="message"
              className="text-[14px] font-bold text-[var(--ink)]"
            >
              Mensaje
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              className="px-3 py-2.5 rounded-xl border border-[var(--line)] bg-[var(--bg)] text-[var(--ink)] text-[15px] outline-none focus:border-[var(--accent)] transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            className="self-center px-16 py-2.5 rounded-full bg-[var(--accent)] text-[var(--bg)] text-[15px] font-bold hover:bg-[var(--accent-dark)] transition-colors"
          >
            Enviar
          </button>
        </form>
      </main>
      <SiteFooter />
    </div>
  );
}
