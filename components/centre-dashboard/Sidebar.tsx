"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  CalendarDays,
  Activity,
  IndianRupee,
  Boxes,
  ShieldCheck,
  FileBarChart,
  Settings,
  LogOut,
  Building2,
} from "lucide-react";

const menu = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    active: true,
  },
  {
    title: "Appointments",
    icon: CalendarDays,
  },
  {
    title: "Equipment",
    icon: Activity,
  },
  {
    title: "Finance",
    icon: IndianRupee,
  },
  {
    title: "Inventory",
    icon: Boxes,
  },
  {
    title: "Compliance",
    icon: ShieldCheck,
  },
  {
    title: "Reports",
    icon: FileBarChart,
  },
  {
    title: "Settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  return (
    <aside className="hidden w-72 flex-col bg-[#061F44] text-white lg:flex">

      {/* Logo */}

      <div className="border-b border-white/10 p-8">

        <Link href="/" className="flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#D4AF37] text-xl font-bold text-[#061F44]">
            K
          </div>

          <div>

            <h2 className="text-xl font-bold">
              Kretec CentreOS
            </h2>

            <p className="text-sm text-slate-300">
              Demo Dashboard
            </p>

          </div>

        </Link>

      </div>

      {/* Centre */}

      <div className="border-b border-white/10 p-6">

        <div className="flex items-center gap-4 rounded-2xl bg-white/5 p-4">

          <Building2 className="text-[#D4AF37]" />

          <div>

            <h3 className="font-semibold">
              NM Medical
            </h3>

            <p className="text-sm text-slate-300">
              Mumbai
            </p>

          </div>

        </div>

      </div>

      {/* Navigation */}

      <nav className="flex-1 px-4 py-6">

        <div className="space-y-2">

          {menu.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.title}
                className={`flex w-full items-center gap-4 rounded-xl px-4 py-3 text-left transition-all ${
                  item.active
                    ? "bg-[#D4AF37] font-semibold text-[#061F44]"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon size={20} />

                <span>{item.title}</span>
              </button>
            );
          })}

        </div>

      </nav>

      {/* Footer */}

      <div className="border-t border-white/10 p-6">

        <button className="flex w-full items-center gap-4 rounded-xl px-4 py-3 text-slate-300 transition hover:bg-white/5 hover:text-white">

          <LogOut size={20} />

          Logout

        </button>

      </div>

    </aside>
  );
}