"use client";

import { useState } from "react";

const SUJETOS = [
  "caballo", "perro", "gato", "niño", "niña",
  "pájaro", "conejo", "hamster", "colibri", "tortuga",
];
const ACCIONES = ["jugar", "correr", "dormir", "comer", "saltar"];
const LUGARES = ["bosque", "parque", "casa", "campo", "playa"];

const CONJUGACIONES: Record<string, string> = {
  jugar: "juega",
  correr: "corre",
  dormir: "duerme",
  comer: "come",
  saltar: "salta",
};

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
    setActiveSujeto(sujeto);
    setOracion({ sujeto, accion: pick(ACCIONES), lugar: pick(LUGARES) });
  }

  const textoOracion = oracion
    ? `${articulo(oracion.sujeto, true)} ${oracion.sujeto} ${CONJUGACIONES[oracion.accion]} ${articulo(oracion.lugar, false)} ${oracion.lugar}`
    : null;

  const availableSujetos = SUJETOS.filter((s) => pictogramas[s]);

  if (availableSujetos.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-[15px] text-[var(--ink-soft)]">
          No se pudieron cargar los pictogramas. Intentá recargar la página.
        </p>
      </div>
    );
  }

  return (
    <main className="flex-1 flex flex-col items-center gap-10 px-6 py-10">
      {/* Subject grid */}
      <div className="flex flex-wrap justify-center gap-3 max-w-2xl">
        {availableSujetos.map((sujeto) => {
          const isActive = activeSujeto === sujeto;
          return (
            <button
              key={sujeto}
              onClick={() => generarOracion(sujeto)}
              className="flex flex-col items-center gap-1 rounded-xl p-2 border-2 transition-all hover:-translate-y-0.5 active:translate-y-0 w-20"
              style={{
                borderColor: isActive ? "var(--oraciones-fg)" : "var(--line)",
                backgroundColor: isActive ? "var(--oraciones-bg)" : "var(--bg)",
              }}
            >
              <img
                src={pictogramas[sujeto]}
                alt={sujeto}
                className="w-14 h-14 object-contain"
              />
              <span className="font-serif text-[11px] font-semibold text-[var(--ink-soft)] uppercase tracking-wide">
                {sujeto}
              </span>
            </button>
          );
        })}
      </div>

      {/* Sentence display */}
      {oracion && (
        <div className="flex flex-col items-center gap-6 w-full max-w-lg">
          <div className="flex justify-center gap-4 flex-wrap">
            {[oracion.sujeto, oracion.accion, oracion.lugar].map((palabra) => {
              const url = pictogramas[palabra];
              if (!url) return null;
              return (
                <div
                  key={palabra}
                  className="flex flex-col items-center gap-2 rounded-2xl p-4 border border-[var(--line)]"
                  style={{ backgroundColor: "var(--oraciones-bg)" }}
                >
                  <img
                    src={url}
                    alt={palabra}
                    className="w-24 h-24 object-contain"
                  />
                  <span className="font-serif text-[12px] font-semibold text-[var(--ink-soft)] uppercase tracking-wide">
                    {palabra}
                  </span>
                </div>
              );
            })}
          </div>

          <p className="font-serif text-[22px] font-semibold text-center text-[var(--ink)]">
            {textoOracion?.toUpperCase()}
          </p>
        </div>
      )}
    </main>
  );
}
