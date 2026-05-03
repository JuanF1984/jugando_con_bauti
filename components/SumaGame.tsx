"use client";

import { useState } from "react";
import { numeros, type ItemNumero } from "@/lib/data/numeros";

type Problem = {
  n1: number;
  n2: number;
  correct: number;
  options: number[];
  item1: ItemNumero;
  item2: ItemNumero;
};

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function generateProblem(): Problem {
  const n1 = Math.floor(Math.random() * 9) + 1; // 1–9
  const n2 = Math.floor(Math.random() * (10 - n1)) + 1; // 1–(10−n1)
  const correct = n1 + n2;

  const candidates = [-3, -2, -1, 1, 2, 3]
    .map((d) => correct + d)
    .filter((n) => n > 0 && n <= 15);
  const wrongs = shuffle(candidates).slice(0, 2);
  const options = shuffle([correct, ...wrongs]);

  const item = shuffle(numeros)[0];

  return { n1, n2, correct, options, item1: item, item2: item };
}

export default function SumaGame() {
  const [problem, setProblem] = useState<Problem>(generateProblem);
  const [selected, setSelected] = useState<number | null>(null);

  const { n1, n2, correct, options, item1, item2 } = problem;
  const isCorrect = selected === correct;

  function next() {
    setProblem(generateProblem());
    setSelected(null);
  }

  return (
    <div className="flex-1 flex flex-col items-center gap-8 px-4 sm:px-6 py-8 sm:py-10">

      {/* Equation */}
      <div
        className="font-serif text-[52px] sm:text-[64px] font-semibold leading-none select-none"
        style={{ color: "var(--numeros-fg)" }}
      >
        {n1} + {n2} ={" "}
        <span style={{ color: selected !== null ? "var(--numeros-fg)" : "var(--line-strong)" }}>
          {selected !== null ? correct : "?"}
        </span>
      </div>

      {/* Visual groups — column on mobile, row on desktop */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
        {/* First group */}
        <div className="flex flex-wrap justify-center gap-1.5 max-w-[220px]">
          {Array.from({ length: n1 }, (_, i) => (
            <div
              key={i}
              className="rounded-xl p-2 border border-[var(--line)]"
              style={{ backgroundColor: "var(--numeros-bg)" }}
            >
              <img src={item1.imagen} alt={item1.nombre} className="w-10 h-10 sm:w-12 sm:h-12 object-contain" />
            </div>
          ))}
        </div>

        <span
          className="font-serif text-[40px] font-semibold shrink-0"
          style={{ color: "var(--numeros-fg)" }}
        >
          +
        </span>

        {/* Second group */}
        <div className="flex flex-wrap justify-center gap-1.5 max-w-[220px]">
          {Array.from({ length: n2 }, (_, i) => (
            <div
              key={i}
              className="rounded-xl p-2 border border-[var(--line)]"
              style={{ backgroundColor: "var(--numeros-bg)" }}
            >
              <img src={item2.imagen} alt={item2.nombre} className="w-10 h-10 sm:w-12 sm:h-12 object-contain" />
            </div>
          ))}
        </div>
      </div>

      {/* Answer options */}
      <div className="flex gap-4 flex-wrap justify-center">
        {options.map((opt) => {
          const isSelected = selected === opt;
          const isRight = isSelected && opt === correct;
          const isWrong = isSelected && opt !== correct;
          const wasCorrect = selected !== null && opt === correct && !isSelected;

          return (
            <button
              key={opt}
              onClick={() => selected === null && setSelected(opt)}
              disabled={selected !== null}
              className="w-20 h-20 rounded-2xl font-serif text-[34px] font-semibold border-2 transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-default"
              style={{
                backgroundColor: isRight
                  ? "var(--accent-soft)"
                  : isWrong
                  ? "#fee2e2"
                  : wasCorrect
                  ? "var(--accent-soft)"
                  : "var(--numeros-bg)",
                borderColor: isRight || wasCorrect
                  ? "var(--accent)"
                  : isWrong
                  ? "#f87171"
                  : "var(--numeros-fg)",
                color: isRight || wasCorrect
                  ? "var(--accent-dark)"
                  : isWrong
                  ? "#dc2626"
                  : "var(--numeros-fg)",
              }}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {/* Feedback + next */}
      {selected !== null && (
        <div className="flex flex-col items-center gap-4">
          <p className="font-serif text-[22px] font-semibold text-center text-[var(--ink)]">
            {isCorrect ? "¡Muy bien!" : `La respuesta es ${correct}`}
          </p>
          <button
            onClick={next}
            className="px-10 py-3 rounded-full font-serif text-[18px] font-semibold transition-all hover:-translate-y-0.5 active:translate-y-0"
            style={{ backgroundColor: "var(--numeros-fg)", color: "var(--bg)" }}
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
}
