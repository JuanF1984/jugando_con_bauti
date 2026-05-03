import type { Metadata } from "next";
import { atkinson, fraunces } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jugando con Bauti",
  description: "Juegos para aprender jugando",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${atkinson.variable} ${fraunces.variable}`}>
      <body className="bg-[var(--bg)] text-[var(--ink)] font-sans">
        {children}
      </body>
    </html>
  );
}
