import "./globals.css";
import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import { cn } from "../lib/utils";

const figtree = Figtree({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "Kretec Health",
  description: "Connecting India's Diagnostics Ecosystem",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans", figtree.variable)}>
      <body className="bg-white text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}