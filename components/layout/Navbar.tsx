"use client";

import Link from "next/link";
import { Menu, X, User } from "lucide-react";
import { useState } from "react";

const navigation = [
  { name: "Patients", href: "#" },
  { name: "Diagnostic Centres", href: "#" },
  { name: "Corporates", href: "#" },
  { name: "About", href: "#" },
  { name: "Contact", href: "#" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#082B5B]/70 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Logo */}

        <Link href="/" className="flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D4AF37] text-xl font-bold text-[#082B5B] shadow-lg">
            K
          </div>

          <div>
            <h2 className="text-xl font-bold text-white">
              Kretec Health
            </h2>

            <p className="text-xs tracking-wider text-slate-300 uppercase">
              Diagnostics Platform
            </p>
          </div>

        </Link>

        {/* Desktop Navigation */}

        <nav className="hidden items-center gap-8 lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-white transition duration-300 hover:text-[#D4AF37]"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Buttons */}

        <div className="hidden items-center gap-4 lg:flex">

          <button className="flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium text-white transition hover:border-[#D4AF37] hover:text-[#D4AF37]">
            <User size={18} />
            Login
          </button>

          <button className="rounded-full bg-[#D4AF37] px-6 py-3 text-sm font-semibold text-[#082B5B] transition duration-300 hover:scale-105 hover:shadow-xl">
            Book a Scan
          </button>

        </div>

        {/* Mobile Menu */}

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-white lg:hidden"
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

      </div>

      {/* Mobile Navigation */}

      {mobileOpen && (
        <div className="border-t border-white/10 bg-[#082B5B] lg:hidden">

          <div className="flex flex-col px-6 py-6">

            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="py-4 text-white"
                onClick={() => setMobileOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            <button className="mt-6 rounded-full border border-white py-3 text-white">
              Login
            </button>

            <button className="mt-4 rounded-full bg-[#D4AF37] py-3 font-semibold text-[#082B5B]">
              Book a Scan
            </button>

          </div>

        </div>
      )}
    </header>
  );
}