"use client";

import * as React from "react";
import { CalendarIcon, MapPin, Search, ScanSearch } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Calendar } from "@/components/ui/calendar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { cn } from "@/lib/utils";

const cities = [
  "Mumbai",
  "Delhi",
  "Bengaluru",
  "Hyderabad",
  "Chennai",
  "Lucknow",
  "Pune",
];

const scans = [
  "CT Scan",
  "MRI",
  "PET-CT",
  "Ultrasound",
  "X-Ray",
  "Mammography",
];

export default function SearchWidget() {
  const [date, setDate] = React.useState<Date>();

  return (
    <div className="rounded-[30px] border border-white/40 bg-white/95 p-2 backdrop-blur-xl shadow-[0_25px_80px_rgba(0,0,0,0.18)]">

      <div className="grid lg:grid-cols-[1fr_1fr_1fr_240px] items-center divide-x divide-slate-200">

        {/* LOCATION */}

        <div className="flex items-center gap-3 px-5">

          <MapPin className="h-5 w-5 text-[#082B5B]" />

          <Select>

            <SelectTrigger className="h-20 border-0 rounded-none shadow-none focus:ring-0 text-lg font-medium">

              <SelectValue placeholder="Select City" />

            </SelectTrigger>

            <SelectContent>

              {cities.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}

            </SelectContent>

          </Select>

        </div>

        {/* SCAN */}

        <div className="flex items-center gap-3 px-5">

         <ScanSearch className="mr-3 h-5 w-5 text-[#082B5B]" />

          <Select>

            <SelectTrigger className="h-20 border-0 rounded-none shadow-none focus:ring-0 text-lg font-medium">

              <SelectValue placeholder="Select Scan" />

            </SelectTrigger>

            <SelectContent>

              {scans.map((scan) => (
                <SelectItem key={scan} value={scan}>
                  {scan}
                </SelectItem>
              ))}

            </SelectContent>

          </Select>

        </div>

        {/* DATE */}

        <div className="flex items-center gap-3 px-5">

         <CalendarIcon className="mr-3 h-5 w-5 text-[#082B5B]" />

          <Popover>

            <PopoverTrigger>

              <Button
                variant="outline"
                className={cn(
                  "h-20 w-full justify-start rounded-none border-0 shadow-none border-slate-200 text-left font-normal",
                  !date && "text-slate-400"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />

                {date ? format(date, "PPP") : "Choose Date"}

              </Button>

            </PopoverTrigger>

            <PopoverContent className="w-auto p-0">

             <Calendar
    mode="single"
    selected={date}
    onSelect={setDate}
/>

            </PopoverContent>

          </Popover>

        </div>

        {/* BUTTON */}

        <div className="flex items-end">

  <Button
    className="h-20 w-full rounded-[24px] bg-[#D4AF37] text-[#082B5B] text-lg font-semibold transition-all duration-300 hover:bg-[#caa42f] hover:shadow-xl"
  >
    <Search className="mr-2 h-5 w-5" />
    Search Availability
  </Button>

</div>

      </div>

    </div>
  );
}