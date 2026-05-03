type Props = {
  current: number;
  total: number;
  label?: string;
};

export default function GameContextBar({
  current,
  total,
  label = "Letra",
}: Props) {
  return (
    <div className="border-b border-[var(--line)] bg-[var(--bg)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-8 h-10 flex items-center">
        <span className="text-[14px] text-[var(--ink-soft)]">
          {label}{" "}
          <strong className="text-[var(--ink)] font-bold">{current}</strong> de{" "}
          {total}
        </span>
      </div>
    </div>
  );
}
