import "./globals.css";
import type { Metadata } from "next";

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
    <html lang="en">
      <body className="bg-white text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}