"use client";

import {
  Bell,
  CalendarDays,
  ChevronDown,
  Search,
  UserCircle2,
} from "lucide-react";

interface HeaderProps {
  centre: string;
  period: string;
  onPeriodChange: (value: string) => void;
}

export default function Header({
  centre,
  period,
  onPeriodChange,
}: HeaderProps) {
  return (
    <header className="border-b bg-white">

      <div className="flex items-center justify-between px-8 py-6">

        {/* Left */}

        <div>

          <p className="text-sm font-medium text-slate-500">
            Welcome Back
          </p>

          <h1 className="mt-1 text-3xl font-bold text-slate-900">
            {centre}
          </h1>

          <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">

            <CalendarDays size={16} />

            {new Date().toLocaleDateString("en-IN", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}

          </div>

        </div>

        {/* Right */}

        <div className="flex items-center gap-5">

          {/* Search */}

          <div className="hidden items-center gap-3 rounded-2xl border bg-slate-50 px-4 py-3 lg:flex">

            <Search size={18} className="text-slate-400" />

            <input
              placeholder="Search..."
              className="bg-transparent outline-none"
            />

          </div>

          {/* Period */}

          <div className="flex items-center gap-3 rounded-2xl border px-5 py-3">

            <select
              value={period}
              onChange={(e) => onPeriodChange(e.target.value)}
              className="bg-transparent outline-none"
            >
              <option>Daily</option>
              <option>Weekly</option>
              <option>Monthly</option>
              <option>Quarterly</option>
              <option>Yearly</option>
            </select>

            <ChevronDown size={18} />

          </div>

          {/* Notification */}

          <button className="relative rounded-2xl border p-3 hover:bg-slate-50">

            <Bell size={22} />

            <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500" />

          </button>

          {/* Profile */}

          <button className="flex items-center gap-3 rounded-2xl border px-4 py-2 hover:bg-slate-50">

            <UserCircle2 size={34} />

            <div className="text-left">

              <h4 className="font-semibold">
                Admin
              </h4>

              <p className="text-sm text-slate-500">
                Centre Manager
              </p>

            </div>

          </button>

        </div>

      </div>

    </header>
  );
}