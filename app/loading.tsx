export default function Loading() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center gap-5"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <span
        className="font-serif text-[17px] font-semibold tracking-wide"
        style={{ color: "var(--ink-soft)" }}
      >
        Jugando con Bauti
      </span>

      <div className="flex gap-2">
        {[0, 150, 300].map((delay) => (
          <span
            key={delay}
            className="w-2 h-2 rounded-full animate-bounce"
            style={{
              backgroundColor: "var(--accent)",
              animationDelay: `${delay}ms`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
