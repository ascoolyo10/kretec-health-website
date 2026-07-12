"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import {
  MapPin,
  ScanSearch,
  Calendar,
  Search,
} from "lucide-react";

export default function SearchWidget() {
  const [city, setCity] = useState("");
  const [scan, setScan] = useState("");
  const [date, setDate] = useState("");

  return (
    <div className="mx-auto w-full rounded-[30px] border border-white/30 bg-white/95 p-2 shadow-[0_25px_80px_rgba(0,0,0,0.18)] backdrop-blur-xl">

      <div className="grid overflow-hidden rounded-[26px] lg:grid-cols-[1fr_1fr_1fr_260px]">

        {/* LOCATION */}

        <div className="flex items-center gap-4 border-b border-slate-200 px-6 py-5 lg:border-b-0 lg:border-r">

          <MapPin className="h-6 w-6 text-[#082B5B]" />

          <div className="flex-1">

            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Location
            </p>

            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="mt-1 w-full appearance-none bg-transparent text-lg font-semibold text-slate-900 outline-none cursor-pointer"
            >
              <option value="">Select City</option>
              <option>Mumbai</option>
              <option>Delhi</option>
              <option>Lucknow</option>
              <option>Bangalore</option>
              <option>Hyderabad</option>
              <option>Chennai</option>
            </select>

          </div>

        </div>

        {/* SCAN */}

        <div className="flex items-center gap-4 border-b border-slate-200 px-6 py-5 lg:border-b-0 lg:border-r">

          <ScanSearch className="h-6 w-6 text-[#082B5B]" />

          <div className="flex-1">

            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Scan
            </p>

            <select
              value={scan}
              onChange={(e) => setScan(e.target.value)}
              className="mt-1 w-full bg-transparent text-lg font-semibold text-slate-900 outline-none"
            >
              <option value="">Select Scan</option>
              <option>CT Scan</option>
              <option>MRI</option>
              <option>PET-CT</option>
              <option>Ultrasound</option>
              <option>X-Ray</option>
            </select>

          </div>

        </div>

        {/* DATE */}

        <div className="flex items-center gap-4 border-b border-slate-200 px-6 py-5 lg:border-b-0 lg:border-r">

          <Calendar className="h-6 w-6 text-[#082B5B]" />

          <div className="flex-1">

            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Preferred Date
            </p>

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 w-full bg-transparent text-lg font-semibold text-slate-900 outline-none"
            />

          </div>

        </div>

        {/* SEARCH */}

        <button className="flex h-full items-center justify-center gap-3 rounded-[24px] bg-[#D4AF37] px-8 py-6 text-lg font-bold text-[#082B5B] transition duration-300 hover:bg-[#c9a228]">

          <Search className="h-5 w-5" />

          Search Availability

        </button>

      </div>

    </div>
  );
}