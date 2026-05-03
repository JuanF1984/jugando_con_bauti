"use client";

import { setProfile } from "@/app/actions";

export default function ProfileSelector() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 gap-10">
      <div className="text-center">
        <p className="font-serif text-[28px] font-semibold text-[var(--ink)] leading-tight">
          ¿Quién va a jugar?
        </p>
      </div>

      <div className="flex gap-6 flex-wrap justify-center">
        <form action={setProfile.bind(null, "bauti")}>
          <button
            type="submit"
            className="group flex flex-col items-center gap-4 p-6 rounded-2xl border-2 border-[var(--accent-border)] bg-[var(--accent-soft)] hover:border-[var(--accent)] hover:bg-[var(--accent-soft)] hover:-translate-y-1 active:translate-y-0 transition-all w-44 cursor-pointer"
          >
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[var(--accent-border)] group-hover:border-[var(--accent)] transition-colors">
              <img
                src="/img/letra/bauti.jpeg"
                alt="Bauti"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-serif text-[20px] font-semibold text-[var(--ink)]">
              Bauti
            </span>
          </button>
        </form>

        <form action={setProfile.bind(null, "otro")}>
          <button
            type="submit"
            className="group flex flex-col items-center gap-4 p-6 rounded-2xl border-2 border-[var(--line-strong)] bg-[var(--bg)] hover:border-[var(--ink-soft)] hover:-translate-y-1 active:translate-y-0 transition-all w-44 cursor-pointer"
          >
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[var(--line-strong)] group-hover:border-[var(--ink-soft)] transition-colors flex items-center justify-center bg-[var(--bg)]">
              <span className="text-[44px] select-none">😊</span>
            </div>
            <span className="font-serif text-[20px] font-semibold text-[var(--ink)]">
              Otro niño
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}
