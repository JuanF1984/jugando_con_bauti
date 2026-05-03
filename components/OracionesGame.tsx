"use client";

import { useState } from "react";

const ACCIONES = ["jugar", "correr", "dormir", "comer", "saltar"];

const CONJUGACIONES: Record<string, string> = {
  jugar: "juega",
  correr: "corre",
  dormir: "duerme",
  comer: "come",
  saltar: "salta",
};

// Each subject only appears in contextually appropriate places
const LUGARES_POR_SUJETO: Record<string, string[]> = {
  caballo: ["bosque", "campo", "parque"],
  perro:   ["bosque", "parque", "casa", "campo", "playa"],
  gato:    ["casa", "parque", "bosque"],
  niño:    ["bosque", "parque", "casa", "campo", "playa"],
  niña:    ["bosque", "parque", "casa", "campo", "playa"],
  pájaro:  ["bosque", "campo", "parque"],
  conejo:  ["bosque", "campo", "parque"],
  hamster: ["casa", "parque"],
  colibri: ["bosque", "campo", "parque"],
  tortuga: ["playa", "parque", "campo"],
};

const SUJETOS = Object.keys(LUGARES_POR_SUJETO);

function articulo(palabra: string, esSujeto: boolean): string {
  return palabra.endsWith("a")
    ? esSujeto ? "La" : "en la"
    : esSujeto ? "El" : "en el";
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

type Oracion = { sujeto: string; accion: string; lugar: string };
type Props = { pictogramas: Record<string, string> };

export default function OracionesGame({ pictogramas }: Props) {
  const [oracion, setOracion] = useState<Oracion | null>(null);
  const [activeSujeto, setActiveSujeto] = useState<string | null>(null);

  function generarOracion(sujeto: string) {
    const lugares = LUGARES_POR_SUJETO[sujeto] ?? ["parque", "campo"];
    setActiveSujeto(sujeto);
    setOracion({ sujeto, accion: pick(ACCIONES), lugar: pick(lugares) });
  }

  function volverASujetos() {
    setOracion(null);
    setActiveSujeto(null);
  }

  const textoOracion = oracion
    ? `${articulo(oracion.sujeto, true)} ${oracion.sujeto} ${CONJUGACIONES[oracion.accion]} ${articulo(oracion.lugar, false)} ${oracion.lugar}`
    : null;

  const availableSujetos = SUJETOS.filter((s) => pictogramas[s]);

  if (availableSujetos.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center px-6">
        <p className="text-[15px] text-[var(--ink-soft)] text-center">
          No se pudieron cargar los pictogramas. Intentá recargar la página.
        </p>
      </div>
    );
  }

  return (
    <main className="flex-1 flex flex-col items-center gap-8 px-4 sm:px-6 py-8 sm:py-10">

      {/* Subject grid — hidden on mobile when sentence is showing */}
      <div className={`flex flex-wrap justify-center gap-3 max-w-2xl w-full ${oracion ? "hidden sm:flex" : "flex"}`}>
        {availableSujetos.map((sujeto) => {
          const isActive = activeSujeto === sujeto;
          return (
            <button
              key={sujeto}
              onClick={() => generarOracion(sujeto)}
              className="flex flex-col items-center gap-1 rounded-xl p-2 border-2 transition-all hover:-translate-y-0.5 active:translate-y-0 w-[72px] sm:w-20"
              style={{
                borderColor: isActive ? "var(--oraciones-fg)" : "var(--line)",
                backgroundColor: isActive ? "var(--oraciones-bg)" : "var(--bg)",
              }}
            >
              <img
                src={pictogramas[sujeto]}
                alt={sujeto}
                className="w-12 h-12 sm:w-14 sm:h-14 object-contain"
              />
              <span className="font-serif text-[10px] sm:text-[11px] font-semibold text-[var(--ink-soft)] uppercase tracking-wide">
                {sujeto}
              </span>
            </button>
          );
        })}
      </div>

      {/* Sentence display */}
      {oracion && (
        <div className="flex flex-col items-center gap-6 w-full max-w-lg">
          {/* Pictogram row */}
          <div className="flex justify-center gap-3 sm:gap-4 flex-wrap">
            {[oracion.sujeto, oracion.accion, oracion.lugar].map((palabra) => {
              const url = pictogramas[palabra];
              if (!url) return null;
              return (
                <div
                  key={palabra}
                  className="flex flex-col items-center gap-2 rounded-2xl p-3 sm:p-4 border border-[var(--line)]"
                  style={{ backgroundColor: "var(--oraciones-bg)" }}
                >
                  <img
                    src={url}
                    alt={palabra}
                    className="w-20 h-20 sm:w-24 sm:h-24 object-contain"
                  />
                  <span className="font-serif text-[11px] sm:text-[12px] font-semibold text-[var(--ink-soft)] uppercase tracking-wide">
                    {palabra}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Sentence text */}
          <p className="font-serif text-[20px] sm:text-[22px] font-semibold text-center text-[var(--ink)]">
            {textoOracion?.toUpperCase()}
          </p>

          {/* Mobile: tap to generate new or go back */}
          <div className="flex gap-3 sm:hidden">
            <button
              onClick={() => generarOracion(activeSujeto!)}
              className="px-5 py-2.5 rounded-full border-2 font-serif text-[15px] font-semibold transition-all active:scale-95"
              style={{
                borderColor: "var(--oraciones-fg)",
                color: "var(--oraciones-fg)",
              }}
            >
              Nueva oración
            </button>
            <button
              onClick={volverASujetos}
              className="px-5 py-2.5 rounded-full border-2 border-[var(--line-strong)] font-serif text-[15px] font-semibold text-[var(--ink-soft)] transition-all active:scale-95"
            >
              Cambiar
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
