"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Calendar, CheckCircle2, Loader2, MapPin, ScanSearch, Search } from "lucide-react";

type Service = { id: string; name: string; modality: string; platformPrice: number; currency: string; reportTurnaroundHours: number; centre: { id: string; name: string; city: string; address: string; accreditation: string; operatingHours: string } };

const scanTerms: Record<string, string> = { "CT Scan": "CT", MRI: "MRI", "PET-CT": "PET-CT", Ultrasound: "Ultrasound", "X-Ray": "X-Ray" };

export default function SearchWidget() {
  const [city, setCity] = useState("");
  const [scan, setScan] = useState("");
  const [date, setDate] = useState("");
  const [services, setServices] = useState<Service[]>([]);
  const [searched, setSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setIsLoading(true); setError("");
    try {
      const scanTerm = scanTerms[scan] || "";
      const params = new URLSearchParams();
      if (city) params.set("city", city);
      if (scanTerm) params.set("modality", scanTerm);
      const response = await fetch(`/api/services?${params.toString()}`);
      if (!response.ok) throw new Error("Unable to load services");
      const { services: databaseServices } = await response.json() as { services: Service[] };
      setServices(databaseServices);
      setSearched(true);
    } catch { setError("We could not load centre availability. Please try again."); setServices([]); setSearched(true); }
    finally { setIsLoading(false); }
  }

  return <div className="mx-auto w-full rounded-[30px] border border-white/30 bg-white/95 p-2 shadow-[0_25px_80px_rgba(0,0,0,0.18)] backdrop-blur-xl">
    <form onSubmit={handleSearch}><div className="grid overflow-hidden rounded-[26px] lg:grid-cols-[1fr_1fr_1fr_260px]">
      <div className="flex items-center gap-4 border-b border-slate-200 px-6 py-5 lg:border-b-0 lg:border-r"><MapPin className="h-6 w-6 text-[#082B5B]" /><div className="flex-1"><p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Location</p><select value={city} onChange={(event) => setCity(event.target.value)} className="mt-1 w-full cursor-pointer appearance-none bg-transparent text-lg font-semibold text-slate-900 outline-none"><option value="">All cities</option><option value="Mumbai">Mumbai</option><option value="Thane">Thane</option></select></div></div>
      <div className="flex items-center gap-4 border-b border-slate-200 px-6 py-5 lg:border-b-0 lg:border-r"><ScanSearch className="h-6 w-6 text-[#082B5B]" /><div className="flex-1"><p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Scan</p><select value={scan} onChange={(event) => setScan(event.target.value)} className="mt-1 w-full bg-transparent text-lg font-semibold text-slate-900 outline-none"><option value="">All scans</option>{Object.keys(scanTerms).map((scanName) => <option key={scanName}>{scanName}</option>)}</select></div></div>
      <div className="flex items-center gap-4 border-b border-slate-200 px-6 py-5 lg:border-b-0 lg:border-r"><Calendar className="h-6 w-6 text-[#082B5B]" /><div className="flex-1"><p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Preferred Date</p><input type="date" value={date} onChange={(event) => setDate(event.target.value)} className="mt-1 w-full bg-transparent text-lg font-semibold text-slate-900 outline-none" /></div></div>
      <button type="submit" disabled={isLoading} className="flex h-full items-center justify-center gap-3 rounded-[24px] bg-[#D4AF37] px-8 py-6 text-lg font-bold text-[#082B5B] transition duration-300 hover:bg-[#c9a228] disabled:cursor-wait disabled:opacity-70">{isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Search className="h-5 w-5" />} Search Availability</button>
    </div></form>
    {searched && <div className="mx-3 mb-3 mt-4 rounded-[22px] bg-slate-50 p-5">{error ? <p className="text-sm font-medium text-rose-600">{error}</p> : services.length === 0 ? <p className="text-sm text-slate-600">No centres match the selected location and scan.</p> : <div className="space-y-3"><p className="text-sm font-semibold text-[#082B5B]">{services.length} scan option{services.length === 1 ? "" : "s"} available{date ? ` for ${date}` : ""}</p><div className="grid gap-3 md:grid-cols-2">{services.map((service) => <article key={service.id} className="rounded-2xl border border-slate-200 bg-white p-4"><div className="flex items-start justify-between gap-3"><div><h3 className="font-bold text-[#082B5B]">{service.name}</h3><p className="mt-1 text-sm text-slate-500">Kretec {service.centre.name} · {service.centre.address}</p></div><CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" /></div><p className="mt-3 text-sm font-semibold text-slate-700">₹{service.platformPrice.toLocaleString("en-IN")} · {service.modality}</p><p className="mt-1 text-xs text-slate-500">{service.centre.accreditation} · Reports in about {service.reportTurnaroundHours}h · {service.centre.operatingHours}</p><Link href={`/booking?serviceId=${service.id}${date ? `&date=${date}` : ""}`} className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#082B5B] hover:text-[#D4AF37]">Choose a time <ArrowRight className="h-4 w-4" /></Link></article>)}</div></div>}</div>}
  </div>;
}

