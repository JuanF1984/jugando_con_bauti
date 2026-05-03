"use client";

import { useState } from "react";
import { numeros } from "@/lib/data/numeros";

export default function NumerosGame() {
  const [selected, setSelected] = useState<number | null>(null);

  const item = selected != null ? numeros[selected - 1] : null;

  return (
    <div className="flex-1 flex flex-col items-center gap-8 px-6 py-10">
      {/* Number selector */}
      <div className="flex flex-wrap justify-center gap-3">
        {numeros.map(({ numero }) => {
          const active = selected === numero;
          return (
            <button
              key={numero}
              onClick={() => setSelected(numero)}
              className="w-14 h-14 rounded-full font-serif text-[22px] font-semibold border-2 transition-all hover:-translate-y-0.5 active:translate-y-0"
              style={{
                backgroundColor: active
                  ? "var(--numeros-fg)"
                  : "var(--numeros-bg)",
                borderColor: active
                  ? "var(--numeros-fg)"
                  : "var(--numeros-bg)",
                color: active ? "var(--bg)" : "var(--numeros-fg)",
              }}
            >
              {numero}
            </button>
          );
        })}
      </div>

      {/* Display area */}
      {item == null ? (
        <p className="text-[16px] text-[var(--ink-soft)] mt-4">
          Elegí un número para ver cuántos hay
        </p>
      ) : (
        <div className="flex flex-col items-center gap-6 w-full max-w-2xl">
          <div className="font-serif text-[64px] font-semibold leading-none select-none"
            style={{ color: "var(--numeros-fg)" }}>
            {item.numero}
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {Array.from({ length: item.numero }, (_, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-1 rounded-xl p-3 border border-[var(--line)]"
                style={{ backgroundColor: "var(--numeros-bg)" }}
              >
                <img
                  src={item.imagen}
                  alt={item.nombre}
                  className="w-16 h-16 object-contain"
                />
                <span
                  className="font-serif text-[18px] font-semibold"
                  style={{ color: "var(--numeros-fg)" }}
                >
                  {i + 1}
                </span>
              </div>
            ))}
          </div>

          <p className="font-serif text-[22px] font-semibold text-[var(--ink)]">
            {(item.numero > 1
              ? `${item.numero} ${item.nombre}s`
              : `${item.numero} ${item.nombre}`
            ).toUpperCase()}
          </p>
        </div>
      )}
    </div>
  );
}
