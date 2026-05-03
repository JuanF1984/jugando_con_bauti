import Link from "next/link";

type Props = {
  direction: "prev" | "next";
  href?: string;
};

export default function NavCircle({ direction, href }: Props) {
  if (!href) {
    return <div className="w-16 h-16 shrink-0" />;
  }

  return (
    <Link
      href={href}
      className="shrink-0 flex items-center justify-center w-16 h-16 rounded-full bg-[var(--bg)] border border-[var(--accent-border)] hover:bg-[var(--accent-soft)] hover:border-[var(--accent)] hover:-translate-y-px transition-all"
    >
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        {direction === "prev" ? (
          <path
            d="M13 5l-6 6 6 6"
            stroke="var(--ink)"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : (
          <path
            d="M9 5l6 6-6 6"
            stroke="var(--ink)"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>
    </Link>
  );
}
