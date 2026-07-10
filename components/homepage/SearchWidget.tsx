"use client";

import {
  Calendar,
  ChevronDown,
  MapPin,
  Search,
  ScanSearch,
} from "lucide-react";

function Field({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <button className="flex h-24 items-center gap-4 rounded-2xl px-6 transition hover:bg-slate-50 w-full">

      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-slate-100 shrink-0">
        {icon}
      </div>

      <div className="flex-1 text-left overflow-hidden">

        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          {label}
        </p>

        <p className="mt-1 truncate text-lg font-semibold text-slate-900">
          {value}
        </p>

      </div>

      <ChevronDown
        size={18}
        className="text-slate-400 shrink-0"
      />

    </button>
  );
}

export default function SearchWidget() {
  return (
    <div className="w-full rounded-[28px] bg-white p-3 shadow-[0_20px_60px_rgba(0,0,0,.15)]">

      <div className="grid gap-2 lg:grid-cols-12">

        <div className="lg:col-span-3">
          <Field
            icon={<MapPin size={24} className="text-[#082B5B]" />}
            label="Location"
            value="Select City"
          />
        </div>

        <div className="lg:col-span-3">
          <Field
            icon={<ScanSearch size={24} className="text-[#082B5B]" />}
            label="Scan"
            value="CT, MRI & PET"
          />
        </div>

        <div className="lg:col-span-3">
          <Field
            icon={<Calendar size={24} className="text-[#082B5B]" />}
            label="Date"
            value="Preferred Date"
          />
        </div>

        <div className="lg:col-span-3">

          <button className="flex h-24 w-full items-center justify-center gap-3 rounded-2xl bg-[#D4AF37] text-lg font-bold text-[#082B5B] transition hover:brightness-95">

            <Search size={22} />

            Search Availability

          </button>

        </div>

      </div>

    </div>
  );
}