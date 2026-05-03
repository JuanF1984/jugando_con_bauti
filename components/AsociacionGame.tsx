"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { letras } from "@/lib/data/letras";

type GameItem = {
  key: string;
  palabra: string;
  imagen: string;
};

type Props = {
  profile?: "bauti" | "otro";
};

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function AsociacionGame({ profile }: Props) {
  const isOtro = profile === "otro";

  const pool = useMemo<GameItem[]>(
    () =>
      letras.map((item) => ({
        key: item.letra,
        palabra: isOtro && item.palabraAlt ? item.palabraAlt : item.palabra,
        imagen: isOtro && item.imagenAlt ? item.imagenAlt : item.imagen,
      })),
    [isOtro]
  );

  const [round, setRound] = useState<GameItem[]>([]);
  const [nameOrder, setNameOrder] = useState<GameItem[]>([]);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [wrongPair, setWrongPair] = useState<{ img: string; name: string } | null>(null);
  const [completed, setCompleted] = useState(false);

  const startRound = useCallback(() => {
    const picked = shuffle(pool).slice(0, 6);
    setRound(picked);
    setNameOrder(shuffle(picked));
    setMatched(new Set());
    setSelectedImg(null);
    setSelectedName(null);
    setWrongPair(null);
    setCompleted(false);
  }, [pool]);

  useEffect(() => {
    startRound();
  }, [startRound]);

  useEffect(() => {
    if (!selectedImg || !selectedName) return;

    if (selectedImg === selectedName) {
      const next = new Set([...matched, selectedImg]);
      setMatched(next);
      setSelectedImg(null);
      setSelectedName(null);
      if (next.size === round.length) setCompleted(true);
    } else {
      setWrongPair({ img: selectedImg, name: selectedName });
      const t = setTimeout(() => {
        setSelectedImg(null);
        setSelectedName(null);
        setWrongPair(null);
      }, 700);
      return () => clearTimeout(t);
    }
  }, [selectedImg, selectedName]);

  const handleImgClick = (key: string) => {
    if (matched.has(key) || wrongPair) return;
    setSelectedImg((prev) => (prev === key ? null : key));
  };

  const handleNameClick = (key: string) => {
    if (matched.has(key) || wrongPair) return;
    setSelectedName((prev) => (prev === key ? null : key));
  };

  if (round.length === 0) return null;

  if (completed) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-8 px-6 py-10">
        <div className="text-center">
          <p className="font-serif text-[32px] font-semibold text-[var(--ink)]">
            ¡Muy bien!
          </p>
          <p className="text-[16px] text-[var(--ink-soft)] mt-2">
            Uniste todos los pares correctamente.
          </p>
        </div>
        <button
          onClick={startRound}
          className="px-10 py-3 rounded-full font-serif text-[18px] font-semibold transition-all hover:-translate-y-0.5 active:translate-y-0"
          style={{
            backgroundColor: "var(--letras-fg)",
            color: "var(--bg)",
          }}
        >
          Jugar de nuevo
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 flex justify-center px-4 py-10">
      <div className="grid grid-cols-2 gap-3 w-full max-w-lg">
        {/* Images */}
        <div className="flex flex-col gap-3">
          {round.map((item) => {
            const isMatched = matched.has(item.key);
            const isSelected = selectedImg === item.key;
            const isWrong = wrongPair?.img === item.key;
            return (
              <button
                key={item.key}
                onClick={() => handleImgClick(item.key)}
                disabled={isMatched}
                className="flex items-center justify-center rounded-2xl border-2 h-20 transition-all"
                style={{
                  backgroundColor: isMatched
                    ? "var(--accent-soft)"
                    : isWrong
                    ? "#fee2e2"
                    : isSelected
                    ? "var(--letras-bg)"
                    : "var(--bg)",
                  borderColor: isMatched
                    ? "var(--accent)"
                    : isWrong
                    ? "#f87171"
                    : isSelected
                    ? "var(--letras-fg)"
                    : "var(--line-strong)",
                }}
              >
                {isMatched ? (
                  <span className="font-serif text-[14px] font-semibold text-[var(--accent-dark)]">
                    {item.palabra.toUpperCase()}
                  </span>
                ) : (
                  <img
                    src={item.imagen}
                    alt={item.palabra}
                    className="w-14 h-14 object-contain"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Names */}
        <div className="flex flex-col gap-3">
          {nameOrder.map((item) => {
            const isMatched = matched.has(item.key);
            const isSelected = selectedName === item.key;
            const isWrong = wrongPair?.name === item.key;
            return (
              <button
                key={item.key}
                onClick={() => handleNameClick(item.key)}
                disabled={isMatched}
                className="flex items-center justify-center rounded-2xl border-2 h-20 px-2 transition-all"
                style={{
                  backgroundColor: isMatched
                    ? "var(--accent-soft)"
                    : isWrong
                    ? "#fee2e2"
                    : isSelected
                    ? "var(--letras-bg)"
                    : "var(--bg)",
                  borderColor: isMatched
                    ? "var(--accent)"
                    : isWrong
                    ? "#f87171"
                    : isSelected
                    ? "var(--letras-fg)"
                    : "var(--line-strong)",
                }}
              >
                <span
                  className="font-serif text-[17px] font-semibold"
                  style={{
                    color: isMatched ? "var(--accent-dark)" : "var(--ink)",
                  }}
                >
                  {item.palabra.toUpperCase()}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
