"use client";

import { clearProfile } from "@/app/actions";

type Props = {
  profile: "bauti" | "otro";
};

export default function ProfileBanner({ profile }: Props) {
  const label = profile === "bauti" ? "Bauti" : "Otro niño";

  return (
    <div className="border-b border-[var(--line)] bg-[var(--bg)]">
      <div className="max-w-5xl mx-auto px-8 h-10 flex items-center justify-between">
        <span className="text-[14px] text-[var(--ink-soft)]">
          Jugando como{" "}
          <strong className="text-[var(--ink)] font-bold">{label}</strong>
        </span>
        <form action={clearProfile}>
          <button
            type="submit"
            className="text-[13px] text-[var(--ink-soft)] hover:text-[var(--accent-dark)] underline underline-offset-2 transition-colors cursor-pointer"
          >
            Cambiar
          </button>
        </form>
      </div>
    </div>
  );
}
