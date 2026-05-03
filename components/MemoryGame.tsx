"use client";

import { useState, useEffect, useCallback, useRef } from "react";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const ARASAAC_WORDS = [
  "casa", "perro", "gato", "sol", "luna", "flor",
  "libro", "pelota", "manzana", "pájaro", "coche", "árbol",
];

type CardState = "hidden" | "flipped" | "matched";
type Card = { id: number; value: string; state: CardState };

type Props = {
  mode: "letras" | "figuras";
  imagePool?: string[]; // server-prefetched URLs; when provided, skips client-side ARASAAC fetch
};

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function buildDeck(values: string[]): Card[] {
  return shuffle([...values, ...values]).map((value, id) => ({
    id,
    value,
    state: "hidden",
  }));
}

export default function MemoryGame({ mode, imagePool }: Props) {
  const [cards, setCards] = useState<Card[]>([]);
  const [locked, setLocked] = useState(false);
  const [loading, setLoading] = useState(mode === "figuras" && !imagePool?.length);
  const [completed, setCompleted] = useState(false);
  const lockedRef = useRef(false);

  const startLetras = useCallback(() => {
    setCards(buildDeck(shuffle(ALPHABET).slice(0, 8)));
    setCompleted(false);
    setLocked(false);
    lockedRef.current = false;
  }, []);

  const startFiguras = useCallback(async () => {
    // If the server prefetched a pool, pick 8 from it — no API call needed
    if (imagePool && imagePool.length >= 8) {
      setCards(buildDeck(shuffle(imagePool).slice(0, 8)));
      setCompleted(false);
      setLocked(false);
      lockedRef.current = false;
      return;
    }

    // Fallback: client-side fetch (e.g. during local dev without server fetch)
    setLoading(true);
    const words = shuffle(ARASAAC_WORDS).slice(0, 8);
    try {
      const results = await Promise.all(
        words.map(async (word) => {
          const res = await fetch(
            `https://api.arasaac.org/api/pictograms/es/search/${encodeURIComponent(word)}`
          );
          if (!res.ok) return null;
          const data = await res.json();
          if (data.length > 0)
            return `https://static.arasaac.org/pictograms/${data[0]._id}/${data[0]._id}_300.png`;
          return null;
        })
      );
      const urls = results.filter((u): u is string => u !== null);
      setCards(buildDeck(urls.slice(0, 8)));
    } catch {
      setCards(buildDeck(shuffle(ALPHABET).slice(0, 8)));
    } finally {
      setLoading(false);
      setCompleted(false);
      setLocked(false);
      lockedRef.current = false;
    }
  }, [imagePool]);

  useEffect(() => {
    if (mode === "letras") startLetras();
    else startFiguras();
  }, [mode, startLetras, startFiguras]);

  // Check for a match whenever cards change
  useEffect(() => {
    const flipped = cards.filter((c) => c.state === "flipped");
    if (flipped.length !== 2) return;

    lockedRef.current = true;
    setLocked(true);

    const [a, b] = flipped;
    const timer = setTimeout(() => {
      if (a.value === b.value) {
        setCards((prev) => {
          const next = prev.map((c) =>
            c.id === a.id || c.id === b.id ? { ...c, state: "matched" as CardState } : c
          );
          if (next.every((c) => c.state === "matched")) setCompleted(true);
          return next;
        });
      } else {
        setCards((prev) =>
          prev.map((c) =>
            c.id === a.id || c.id === b.id ? { ...c, state: "hidden" as CardState } : c
          )
        );
      }
      lockedRef.current = false;
      setLocked(false);
    }, 900);

    return () => clearTimeout(timer);
  }, [cards]);

  const handleClick = (id: number) => {
    if (lockedRef.current) return;
    setCards((prev) => {
      const card = prev[id];
      if (card.state !== "hidden") return prev;
      if (prev.filter((c) => c.state === "flipped").length >= 2) return prev;
      return prev.map((c) => (c.id === id ? { ...c, state: "flipped" as CardState } : c));
    });
  };

  const restart = () => {
    if (mode === "letras") startLetras();
    else startFiguras();
  };

  if (loading) {
    return (
      <div className="flex-1 flex justify-center items-start px-4 py-8">
        <div className="grid grid-cols-4 gap-2 sm:gap-3 w-full max-w-sm sm:max-w-md">
          {Array.from({ length: 16 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square rounded-xl border-2"
              style={{
                backgroundColor: "var(--memoria-bg)",
                borderColor: "var(--line)",
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (completed) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-8 px-6 py-10">
        <div className="text-center">
          <p className="font-serif text-[32px] font-semibold text-[var(--ink)]">
            ¡Muy bien!
          </p>
          <p className="text-[16px] text-[var(--ink-soft)] mt-2">
            Encontraste todos los pares.
          </p>
        </div>
        <button
          onClick={restart}
          className="px-10 py-3 rounded-full font-serif text-[18px] font-semibold transition-all hover:-translate-y-0.5 active:translate-y-0"
          style={{ backgroundColor: "var(--memoria-fg)", color: "var(--bg)" }}
        >
          Jugar de nuevo
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 flex justify-center items-start px-4 py-8">
      <div className="grid grid-cols-4 gap-2 sm:gap-3 w-full max-w-sm sm:max-w-md">
        {cards.map((card) => {
          const isHidden = card.state === "hidden";
          const isMatched = card.state === "matched";
          return (
            <button
              key={card.id}
              onClick={() => handleClick(card.id)}
              disabled={!isHidden || locked}
              className="aspect-square rounded-xl border-2 flex items-center justify-center transition-colors"
              style={{
                backgroundColor: isMatched
                  ? "var(--accent-soft)"
                  : isHidden
                  ? "var(--memoria-bg)"
                  : "var(--bg)",
                borderColor: isMatched ? "var(--accent)" : "var(--memoria-fg)",
              }}
            >
              {isHidden ? (
                <span
                  className="font-serif text-[22px] font-semibold select-none"
                  style={{ color: "var(--memoria-fg)" }}
                >
                  ?
                </span>
              ) : mode === "letras" ? (
                <span
                  className="font-serif text-[28px] sm:text-[34px] font-semibold select-none"
                  style={{
                    color: isMatched ? "var(--accent-dark)" : "var(--memoria-fg)",
                  }}
                >
                  {card.value}
                </span>
              ) : (
                <img
                  src={card.value}
                  alt="pictograma"
                  className="w-4/5 h-4/5 object-contain"
                  style={{ opacity: isMatched ? 0.45 : 1 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
