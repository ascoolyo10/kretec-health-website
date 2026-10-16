
"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";
import {
  Activity, AlertTriangle, Banknote, Boxes, Calendar, ClipboardList,
  FileText, Gauge, LayoutGrid, ShieldCheck, Wrench, ChevronDown,
  TrendingUp, TrendingDown, Circle, Clock, IndianRupee, MapPin
} from "lucide-react";

/* ----------------------------- MOCK DATA ----------------------------- */

const DEFAULT_LOCATIONS = ["Andheri", "Thane", "Borivali"];

const EQUIPMENT = [
  { id: "EQ-01", location: "Andheri", modality: "CT", model: "NeuViz ACE", oem: "Neusoft", installDate: "2022-03-14",
    status: "Operational", health: 88, utilizationPct: 78, scansToday: 24, scansMTD: 512, scansYTD: 3120,
    revenueToday: 168000, revenueMTD: 3584000, revenueYTD: 21840000, avgRevPerScan: 7000, varCostPerScan: 1400,
    fixedCostDay: 42000, amcVendor: "Neusoft Service", amcType: "Comprehensive", amcExpiry: "2026-09-30",
    amcResponseSLA: "4 hrs", downtimeHoursMTD: 6, mttrHours: 3.2, mtbfDays: 41, revenuePerHour: 7000,
    sparesLow: false, casesToday: { booked: 26, inProgress: 2, completed: 24, noShow: 2 }, casesUpcoming7d: 168 },
  { id: "EQ-02", location: "Andheri", modality: "MRI", model: "NeuMR Verto", oem: "Neusoft", installDate: "2021-11-02",
    status: "Operational", health: 91, utilizationPct: 71, scansToday: 14, scansMTD: 298, scansYTD: 2760,
    revenueToday: 154000, revenueMTD: 3278000, revenueYTD: 30360000, avgRevPerScan: 11000, varCostPerScan: 2600,
    fixedCostDay: 58000, amcVendor: "Neusoft Service", amcType: "Comprehensive", amcExpiry: "2026-08-11",
    amcResponseSLA: "4 hrs", downtimeHoursMTD: 4, mttrHours: 2.8, mtbfDays: 55, revenuePerHour: 9600,
    sparesLow: false, casesToday: { booked: 15, inProgress: 1, completed: 14, noShow: 0 }, casesUpcoming7d: 96 },
  { id: "EQ-03", location: "Andheri", modality: "X-Ray", model: "NeuScan DR", oem: "Neusoft", installDate: "2023-01-20",
    status: "Maintenance", health: 64, utilizationPct: 52, scansToday: 18, scansMTD: 410, scansYTD: 2210,
    revenueToday: 27000, revenueMTD: 615000, revenueYTD: 3315000, avgRevPerScan: 1500, varCostPerScan: 300,
    fixedCostDay: 9000, amcVendor: "Neusoft Service", amcType: "Labour Only", amcExpiry: "2026-07-28",
    amcResponseSLA: "8 hrs", downtimeHoursMTD: 19, mttrHours: 6.1, mtbfDays: 18, revenuePerHour: 1500,
    sparesLow: true, casesToday: { booked: 20, inProgress: 1, completed: 18, noShow: 1 }, casesUpcoming7d: 140 },
  { id: "EQ-04", location: "Andheri", modality: "USG", model: "Voluson E10", oem: "GE", installDate: "2020-06-18",
    status: "Operational", health: 82, utilizationPct: 68, scansToday: 22, scansMTD: 476, scansYTD: 4310,
    revenueToday: 55000, revenueMTD: 1190000, revenueYTD: 10775000, avgRevPerScan: 2500, varCostPerScan: 400,
    fixedCostDay: 7000, amcVendor: "GE Healthcare", amcType: "Comprehensive", amcExpiry: "2026-12-05",
    amcResponseSLA: "6 hrs", downtimeHoursMTD: 2, mttrHours: 2.0, mtbfDays: 60, revenuePerHour: 2500,
    sparesLow: false, casesToday: { booked: 24, inProgress: 0, completed: 22, noShow: 2 }, casesUpcoming7d: 154 },
  { id: "EQ-05", location: "Thane", modality: "CT", model: "SOMATOM go.Up", oem: "Siemens", installDate: "2019-09-09",
    status: "Operational", health: 74, utilizationPct: 84, scansToday: 29, scansMTD: 588, scansYTD: 6740,
    revenueToday: 203000, revenueMTD: 4116000, revenueYTD: 47180000, avgRevPerScan: 7000, varCostPerScan: 1500,
    fixedCostDay: 41000, amcVendor: "Siemens Healthineers", amcType: "Comprehensive", amcExpiry: "2026-07-22",
    amcResponseSLA: "4 hrs", downtimeHoursMTD: 11, mttrHours: 4.5, mtbfDays: 27, revenuePerHour: 8700,
    sparesLow: true, casesToday: { booked: 31, inProgress: 3, completed: 27, noShow: 1 }, casesUpcoming7d: 203 },
  { id: "EQ-06", location: "Thane", modality: "MRI", model: "Ingenia 1.5T", oem: "Philips", installDate: "2022-02-01",
    status: "Down", health: 38, utilizationPct: 22, scansToday: 3, scansMTD: 210, scansYTD: 2490,
    revenueToday: 33000, revenueMTD: 2310000, revenueYTD: 27390000, avgRevPerScan: 11000, varCostPerScan: 2700,
    fixedCostDay: 57000, amcVendor: "Philips HealthTech", amcType: "Comprehensive", amcExpiry: "2027-01-15",
    amcResponseSLA: "6 hrs", downtimeHoursMTD: 38, mttrHours: 9.4, mtbfDays: 12, revenuePerHour: 9200,
    sparesLow: true, casesToday: { booked: 12, inProgress: 0, completed: 3, noShow: 3 }, casesUpcoming7d: 71 },
  { id: "EQ-07", location: "Thane", modality: "Mammo", model: "Senographe Pristina", oem: "GE", installDate: "2021-05-27",
    status: "Operational", health: 86, utilizationPct: 59, scansToday: 9, scansMTD: 187, scansYTD: 1980,
    revenueToday: 27000, revenueMTD: 561000, revenueYTD: 5940000, avgRevPerScan: 3000, varCostPerScan: 500,
    fixedCostDay: 8500, amcVendor: "GE Healthcare", amcType: "Comprehensive", amcExpiry: "2026-10-02",
    amcResponseSLA: "6 hrs", downtimeHoursMTD: 3, mttrHours: 2.5, mtbfDays: 58, revenuePerHour: 2800,
    sparesLow: false, casesToday: { booked: 10, inProgress: 0, completed: 9, noShow: 1 }, casesUpcoming7d: 62 },
  { id: "EQ-08", location: "Borivali", modality: "CT", model: "NeuViz 16", oem: "Neusoft", installDate: "2023-08-11",
    status: "Operational", health: 94, utilizationPct: 66, scansToday: 19, scansMTD: 402, scansYTD: 1890,
    revenueToday: 133000, revenueMTD: 2814000, revenueYTD: 13230000, avgRevPerScan: 7000, varCostPerScan: 1350,
    fixedCostDay: 40000, amcVendor: "Neusoft Service", amcType: "Comprehensive", amcExpiry: "2027-03-01",
    amcResponseSLA: "4 hrs", downtimeHoursMTD: 1, mttrHours: 1.5, mtbfDays: 70, revenuePerHour: 7300,
    sparesLow: false, casesToday: { booked: 21, inProgress: 1, completed: 19, noShow: 1 }, casesUpcoming7d: 132 },
  { id: "EQ-09", location: "Borivali", modality: "X-Ray", model: "Multix Impact", oem: "Siemens", installDate: "2020-12-04",
    status: "Operational", health: 77, utilizationPct: 61, scansToday: 21, scansMTD: 455, scansYTD: 4920,
    revenueToday: 31500, revenueMTD: 682500, revenueYTD: 7380000, avgRevPerScan: 1500, varCostPerScan: 280,
    fixedCostDay: 8000, amcVendor: "Siemens Healthineers", amcType: "Labour Only", amcExpiry: "2026-08-30",
    amcResponseSLA: "8 hrs", downtimeHoursMTD: 5, mttrHours: 3.0, mtbfDays: 45, revenuePerHour: 1500,
    sparesLow: false, casesToday: { booked: 22, inProgress: 0, completed: 21, noShow: 1 }, casesUpcoming7d: 148 },
];

const CONTRACTS = [
  { id: "C-01", type: "AMC", party: "Neusoft Service", location: "Andheri", coverage: "CT + MRI + X-Ray", expiry: "2026-09-30", slaHrs: 4, status: "Active" },
  { id: "C-02", type: "AMC", party: "GE Healthcare", location: "Andheri", coverage: "USG", expiry: "2026-12-05", slaHrs: 6, status: "Active" },
  { id: "C-03", type: "AMC", party: "Siemens Healthineers", location: "Thane", coverage: "CT", expiry: "2026-07-22", slaHrs: 4, status: "Expiring Soon" },
  { id: "C-04", type: "AMC", party: "Philips HealthTech", location: "Thane", coverage: "MRI", expiry: "2027-01-15", slaHrs: 6, status: "Active" },
  { id: "C-05", type: "Consumables", party: "Bharat Contrast Media Pvt Ltd", location: "All", coverage: "Contrast agents", expiry: "2026-10-15", slaHrs: null, status: "Active" },
  { id: "C-06", type: "TPA Empanelment", party: "Star Health", location: "All", coverage: "Cashless imaging", expiry: "2026-11-01", slaHrs: null, status: "Active" },
  { id: "C-07", type: "TPA Empanelment", party: "Niva Bupa", location: "All", coverage: "Cashless imaging", expiry: "2026-08-05", slaHrs: null, status: "Expiring Soon" },
];

const SPARES = [
  { id: "SP-01", part: "CT X-Ray Tube", equipmentId: "EQ-01", stock: 0, reorderLevel: 1, leadTimeDays: 21, lastOrder: "2026-05-12", est: 1850000 },
  { id: "SP-02", part: "MRI Coil (Head)", equipmentId: "EQ-06", stock: 0, reorderLevel: 1, leadTimeDays: 35, lastOrder: "2026-04-02", est: 920000 },
  { id: "SP-03", part: "DR Detector Panel", equipmentId: "EQ-03", stock: 1, reorderLevel: 1, leadTimeDays: 14, lastOrder: "2026-06-01", est: 410000 },
  { id: "SP-04", part: "CT Slip Ring", equipmentId: "EQ-05", stock: 0, reorderLevel: 1, leadTimeDays: 18, lastOrder: "2026-06-20", est: 260000 },
  { id: "SP-05", part: "Contrast Injector Syringe (box)", equipmentId: "EQ-01", stock: 12, reorderLevel: 20, leadTimeDays: 5, lastOrder: "2026-07-08", est: 8500 },
];

const COMPLIANCE = [
  { location: "Andheri", item: "NABH Accreditation", expiry: "2026-09-10", status: "Active" },
  { location: "Andheri", item: "AERB License (CT/X-Ray)", expiry: "2026-07-25", status: "Expiring Soon" },
  { location: "Andheri", item: "PNDT Act Registration", expiry: "2027-02-14", status: "Active" },
  { location: "Thane", item: "NABL Accreditation", expiry: "2026-08-01", status: "Expiring Soon" },
  { location: "Thane", item: "AERB License (CT/MRI)", expiry: "2026-11-30", status: "Active" },
  { location: "Thane", item: "Biomedical Waste Authorization", expiry: "2026-07-19", status: "Expiring Soon" },
  { location: "Borivali", item: "AERB License (CT/X-Ray)", expiry: "2027-01-05", status: "Active" },
  { location: "Borivali", item: "PNDT Act Registration", expiry: "2026-12-20", status: "Active" },
];

const STAFF = [
  { location: "Andheri", role: "Radiographer", name: "Team A (4)", scansPerShift: 21, avgPerHead: 5.3 },
  { location: "Andheri", role: "Radiologist", name: "Dr. Mehta", reportsPerDay: 34, avgTAT: "1.8 hrs" },
  { location: "Thane", role: "Radiographer", name: "Team B (5)", scansPerShift: 26, avgPerHead: 5.2 },
  { location: "Thane", role: "Radiologist", name: "Dr. Kulkarni", reportsPerDay: 29, avgTAT: "2.6 hrs" },
  { location: "Borivali", role: "Radiographer", name: "Team C (3)", scansPerShift: 14, avgPerHead: 4.7 },
  { location: "Borivali", role: "Radiologist", name: "Dr. Shah", reportsPerDay: 18, avgTAT: "1.5 hrs" },
];

const REFERRERS = [
  { location: "Andheri", doctor: "Dr. R. Iyer (Ortho)", scansMTD: 84, trend: "up" },
  { location: "Andheri", doctor: "Kokilaben Referral Desk", scansMTD: 61, trend: "flat" },
  { location: "Thane", doctor: "Dr. S. Patil (Neuro)", scansMTD: 97, trend: "up" },
  { location: "Thane", doctor: "Jupiter Hospital OPD", scansMTD: 73, trend: "down" },
  { location: "Borivali", doctor: "Dr. A. Fernandes (GP network)", scansMTD: 58, trend: "up" },
];

const RECEIVABLES = [
  { location: "Andheri", payer: "Star Health (TPA)", "0-30": 210000, "30-60": 95000, "60-90": 40000, "90+": 12000 },
  { location: "Andheri", payer: "Niva Bupa", "0-30": 140000, "30-60": 60000, "60-90": 18000, "90+": 0 },
  { location: "Thane", payer: "CGHS", "0-30": 320000, "30-60": 180000, "60-90": 90000, "90+": 55000 },
  { location: "Thane", payer: "Star Health (TPA)", "0-30": 175000, "30-60": 88000, "60-90": 30000, "90+": 9000 },
  { location: "Borivali", payer: "Niva Bupa", "0-30": 98000, "30-60": 41000, "60-90": 12000, "90+": 0 },
];

const STATUS_COLOR = { Operational: "text-emerald-400", Maintenance: "text-amber-400", Down: "text-rose-500" };
const STATUS_DOT = { Operational: "bg-emerald-400", Maintenance: "bg-amber-400", Down: "bg-rose-500" };
const PIE_COLORS = ["#22d3ee", "#f59e0b", "#f43f5e", "#a78bfa"];

const inr = (n) => "₹" + Math.round(n).toLocaleString("en-IN");
const inrShort = (n) => {
  if (n >= 10000000) return "₹" + (n / 10000000).toFixed(2) + "Cr";
  if (n >= 100000) return "₹" + (n / 100000).toFixed(2) + "L";
  return "₹" + Math.round(n).toLocaleString("en-IN");
};

/* ----------------------------- SHARED UI ----------------------------- */

function Panel({ title, subtitle, children, right }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg p-5">
      <div className="flex items-start justify-between mb-4 gap-3 flex-wrap">
        <div>
          <h3 className="text-slate-200 font-semibold tracking-wide text-sm uppercase">{title}</h3>
          {subtitle && <p className="text-slate-500 text-xs mt-1">{subtitle}</p>}
        </div>
        {right}
      </div>
      {children}
    </div>
  );
}

function KpiCard({ icon: Icon, label, value, sub, trend, accent }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 flex flex-col gap-2 min-w-[180px]">
      <div className="flex items-center justify-between">
        <span className="text-slate-500 text-xs uppercase tracking-wider">{label}</span>
        <Icon size={16} className={accent || "text-cyan-400"} />
      </div>
      <div className="text-slate-100 text-2xl font-mono font-semibold">{value}</div>
      {sub && (
        <div className={`text-xs flex items-center gap-1 ${trend === "down" ? "text-rose-400" : trend === "up" ? "text-emerald-400" : "text-slate-500"}`}>
          {trend === "up" && <TrendingUp size={12} />}
          {trend === "down" && <TrendingDown size={12} />}
          {sub}
        </div>
      )}
    </div>
  );
}

function StatusPill({ status }) {
  const map = {
    Active: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    "Expiring Soon": "bg-amber-500/10 text-amber-400 border-amber-500/30",
    Operational: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    Maintenance: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    Down: "bg-rose-500/10 text-rose-400 border-rose-500/30",
  };
  return (
    <span className={`text-[11px] px-2 py-0.5 rounded border ${map[status] || "bg-slate-700/30 text-slate-300 border-slate-600"}`}>
      {status}
    </span>
  );
}

function Th({ children, className = "" }) {
  return <th className={`text-left text-[11px] uppercase tracking-wider text-slate-500 font-medium px-3 py-2 ${className}`}>{children}</th>;
}
function Td({ children, className = "" }) {
  return <td className={`px-3 py-2.5 text-slate-300 text-sm border-t border-slate-800/70 ${className}`}>{children}</td>;
}

/* ----------------------------- MODULES ----------------------------- */

function Overview({ equipment, locationMode, locations }) {
  const revenueToday = equipment.reduce((a, e) => a + e.revenueToday, 0);
  const revenueMTD = equipment.reduce((a, e) => a + e.revenueMTD, 0);
  const revenueYTD = equipment.reduce((a, e) => a + e.revenueYTD, 0);
  const avgUtil = Math.round(equipment.reduce((a, e) => a + e.utilizationPct, 0) / equipment.length);
  const operational = equipment.filter((e) => e.status === "Operational").length;
  const alerts =
    equipment.filter((e) => e.status !== "Operational").length +
    CONTRACTS.filter((c) => c.status === "Expiring Soon").length +
    COMPLIANCE.filter((c) => c.status === "Expiring Soon").length +
    SPARES.filter((s) => s.stock <= s.reorderLevel).length;

  const byLocation = locations.map((loc) => {
    const eq = EQUIPMENT.filter((e) => e.location === loc);
    return {
      location: loc,
      revenueMTD: eq.reduce((a, e) => a + e.revenueMTD, 0),
      utilization: Math.round(eq.reduce((a, e) => a + e.utilizationPct, 0) / eq.length),
    };
  });

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KpiCard icon={IndianRupee} label="Revenue Today" value={inrShort(revenueToday)} sub="vs target ₹5.8L" trend="up" />
        <KpiCard icon={IndianRupee} label="Revenue MTD" value={inrShort(revenueMTD)} sub="62% of monthly target" trend="up" accent="text-cyan-400" />
        <KpiCard icon={IndianRupee} label="Revenue YTD" value={inrShort(revenueYTD)} sub="FY26-27" accent="text-cyan-400" />
        <KpiCard icon={Gauge} label="Avg Utilization" value={avgUtil + "%"} sub="across active equipment" trend={avgUtil > 65 ? "up" : "down"} />
        <KpiCard icon={Circle} label="Equipment Operational" value={`${operational}/${equipment.length}`} sub={`${equipment.length - operational} need attention`} trend={operational === equipment.length ? "up" : "down"} accent="text-emerald-400" />
        <KpiCard icon={AlertTriangle} label="Open Alerts" value={alerts} sub="AMC, compliance, spares, downtime" trend="down" accent="text-amber-400" />
        <KpiCard icon={Clock} label="Cases Booked Today" value={equipment.reduce((a, e) => a + e.casesToday.booked, 0)} sub={`${equipment.reduce((a, e) => a + e.casesToday.noShow, 0)} no-shows`} accent="text-cyan-400" />
        <KpiCard icon={Wrench} label="Downtime Hrs (MTD)" value={equipment.reduce((a, e) => a + e.downtimeHoursMTD, 0)} sub="across all machines" trend="down" accent="text-rose-400" />
      </div>

      {locationMode === "all" && (
        <Panel title="Location Comparison" subtitle="Revenue MTD and utilization by center">
          <div className="grid md:grid-cols-2 gap-6">
            <div style={{ height: 220 }}>
              <ResponsiveContainer>
                <BarChart data={byLocation}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="location" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={12} tickFormatter={(v) => inrShort(v)} />
                  <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid #1e293b" }} formatter={(v) => inrShort(v)} />
                  <Bar dataKey="revenueMTD" fill="#22d3ee" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div style={{ height: 220 }}>
              <ResponsiveContainer>
                <BarChart data={byLocation}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="location" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={12} unit="%" />
                  <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid #1e293b" }} />
                  <Bar dataKey="utilization" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Panel>
      )}

      <Panel title="Alert Feed" subtitle="Everything that needs a decision, in one place">
        <div className="space-y-2">
          {equipment.filter((e) => e.status !== "Operational").map((e) => (
            <div key={e.id} className="flex items-center justify-between text-sm border-b border-slate-800/70 pb-2">
              <span className="flex items-center gap-2"><Circle size={8} className={STATUS_DOT[e.status].replace("bg-", "text-")} fill="currentColor" />{e.modality} · {e.model} · {e.location} is <b className={STATUS_COLOR[e.status]}>{e.status}</b></span>
              <span className="text-slate-500">MTTR {e.mttrHours}h</span>
            </div>
          ))}
          {CONTRACTS.filter((c) => c.status === "Expiring Soon").map((c) => (
            <div key={c.id} className="flex items-center justify-between text-sm border-b border-slate-800/70 pb-2">
              <span>{c.type} with <b>{c.party}</b> ({c.location}) expires {c.expiry}</span>
              <StatusPill status={c.status} />
            </div>
          ))}
          {COMPLIANCE.filter((c) => c.status === "Expiring Soon").map((c, i) => (
            <div key={i} className="flex items-center justify-between text-sm border-b border-slate-800/70 pb-2">
              <span>{c.item} ({c.location}) expires {c.expiry}</span>
              <StatusPill status={c.status} />
            </div>
          ))}
          {SPARES.filter((s) => s.stock <= s.reorderLevel).map((s) => (
            <div key={s.id} className="flex items-center justify-between text-sm">
              <span>{s.part} for {s.equipmentId} at {s.stock} units — lead time {s.leadTimeDays}d</span>
              <span className="text-amber-400 text-xs">Reorder</span>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

function EquipmentModule({ equipment }) {
  return (
    <Panel title="Equipment Registry" subtitle="Location-wise fleet status">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead><tr>
            <Th>Equipment</Th><Th>Location</Th><Th>OEM / Model</Th><Th>Status</Th><Th>Health</Th>
            <Th>Utilization</Th><Th>AMC Expiry</Th><Th>Install Date</Th>
          </tr></thead>
          <tbody>
            {equipment.map((e) => (
              <tr key={e.id}>
                <Td className="font-medium text-slate-200">{e.modality} <span className="text-slate-500">· {e.id}</span></Td>
                <Td>{e.location}</Td>
                <Td>{e.oem} — {e.model}</Td>
                <Td><span className="flex items-center gap-1.5"><Circle size={8} className={STATUS_DOT[e.status]} fill="currentColor" /><span className={STATUS_COLOR[e.status]}>{e.status}</span></span></Td>
                <Td>
                  <div className="w-24 bg-slate-800 rounded-full h-1.5">
                    <div className={`h-1.5 rounded-full ${e.health > 75 ? "bg-emerald-400" : e.health > 50 ? "bg-amber-400" : "bg-rose-500"}`} style={{ width: `${e.health}%` }} />
                  </div>
                </Td>
                <Td className="font-mono">{e.utilizationPct}%</Td>
                <Td>{e.amcExpiry}</Td>
                <Td>{e.installDate}</Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}

function UtilizationModule({ equipment }) {
  const data = equipment.map((e) => ({ name: `${e.modality} (${e.location.slice(0, 3)})`, utilization: e.utilizationPct, throughput: e.scansToday }));
  return (
    <div className="space-y-5">
      <Panel title="Utilization by Machine" subtitle="Booked slots ÷ available slots, today">
        <div style={{ height: 260 }}>
          <ResponsiveContainer>
            <BarChart data={data} layout="vertical" margin={{ left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
              <XAxis type="number" stroke="#64748b" fontSize={12} unit="%" />
              <YAxis type="category" dataKey="name" stroke="#64748b" fontSize={12} width={110} />
              <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid #1e293b" }} />
              <Bar dataKey="utilization" fill="#22d3ee" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Panel>
      <Panel title="Throughput Today" subtitle="Scans completed per machine, vs modality benchmark">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead><tr><Th>Machine</Th><Th>Scans Today</Th><Th>Scans MTD</Th><Th>Benchmark</Th><Th>Verdict</Th></tr></thead>
            <tbody>
              {equipment.map((e) => {
                const benchmark = { CT: 26, MRI: 16, "X-Ray": 30, USG: 24, Mammo: 12 }[e.modality] || 20;
                const ok = e.scansToday >= benchmark * 0.85;
                return (
                  <tr key={e.id}>
                    <Td className="font-medium text-slate-200">{e.modality} · {e.location}</Td>
                    <Td className="font-mono">{e.scansToday}</Td>
                    <Td className="font-mono">{e.scansMTD}</Td>
                    <Td className="font-mono text-slate-500">{benchmark}/day</Td>
                    <Td><span className={ok ? "text-emerald-400" : "text-amber-400"}>{ok ? "On track" : "Below benchmark"}</span></Td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}

function RevenueModule({ equipment }) {
  const byModality = Object.values(
    equipment.reduce((acc, e) => {
      acc[e.modality] = acc[e.modality] || { name: e.modality, value: 0 };
      acc[e.modality].value += e.revenueMTD;
      return acc;
    }, {})
  );
  return (
    <div className="space-y-5">
      <div className="grid md:grid-cols-2 gap-5">
        <Panel title="Revenue Mix by Modality (MTD)">
          <div style={{ height: 240 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={byModality} dataKey="value" nameKey="name" outerRadius={85} label={(d) => d.name}>
                  {byModality.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid #1e293b" }} formatter={(v) => inrShort(v)} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Panel>
        <Panel title="Revenue per Machine per Day (RPMD)" subtitle="Efficiency benchmark for capital equipment">
          <div className="space-y-3">
            {equipment.map((e) => (
              <div key={e.id} className="flex items-center justify-between text-sm">
                <span className="text-slate-300">{e.modality} · {e.location}</span>
                <span className="font-mono text-slate-200">{inrShort(e.revenueToday)}</span>
              </div>
            ))}
          </div>
        </Panel>
      </div>
      <Panel title="Day / MTD / YTD Detail">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead><tr><Th>Machine</Th><Th>Today</Th><Th>MTD</Th><Th>YTD</Th><Th>Avg / Scan</Th></tr></thead>
            <tbody>
              {equipment.map((e) => (
                <tr key={e.id}>
                  <Td className="font-medium text-slate-200">{e.modality} · {e.location}</Td>
                  <Td className="font-mono">{inr(e.revenueToday)}</Td>
                  <Td className="font-mono">{inrShort(e.revenueMTD)}</Td>
                  <Td className="font-mono">{inrShort(e.revenueYTD)}</Td>
                  <Td className="font-mono text-slate-500">{inr(e.avgRevPerScan)}</Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}

function BreakevenModule({ equipment }) {
  return (
    <Panel title="Breakeven Analysis" subtitle="Fixed cost ÷ contribution margin per scan, per machine">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead><tr>
            <Th>Machine</Th><Th>Fixed Cost / Day</Th><Th>Contribution / Scan</Th><Th>Breakeven Scans</Th>
            <Th>Scans Today</Th><Th>Gap to Breakeven</Th>
          </tr></thead>
          <tbody>
            {equipment.map((e) => {
              const contribution = e.avgRevPerScan - e.varCostPerScan;
              const breakevenScans = Math.ceil(e.fixedCostDay / contribution);
              const gap = e.scansToday - breakevenScans;
              return (
                <tr key={e.id}>
                  <Td className="font-medium text-slate-200">{e.modality} · {e.location}</Td>
                  <Td className="font-mono">{inr(e.fixedCostDay)}</Td>
                  <Td className="font-mono">{inr(contribution)}</Td>
                  <Td className="font-mono">{breakevenScans} scans</Td>
                  <Td className="font-mono">{e.scansToday} scans</Td>
                  <Td>
                    <span className={gap >= 0 ? "text-emerald-400" : "text-rose-400"}>
                      {gap >= 0 ? `+${gap} above` : `${gap} below`}
                    </span>
                  </Td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="text-slate-500 text-xs mt-4">Contribution/scan = avg revenue per scan − variable cost per scan. Breakeven scans = fixed cost per day ÷ contribution per scan.</p>
    </Panel>
  );
}

function ContractsModule({ locationMode, selectedLocation }) {
  const rows = CONTRACTS.filter((c) => locationMode === "all" || c.location === selectedLocation || c.location === "All");
  return (
    <Panel title="Contracts & Vendor Management">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead><tr><Th>Type</Th><Th>Vendor / Party</Th><Th>Location</Th><Th>Coverage</Th><Th>SLA</Th><Th>Expiry</Th><Th>Status</Th></tr></thead>
          <tbody>
            {rows.map((c) => (
              <tr key={c.id}>
                <Td>{c.type}</Td>
                <Td className="font-medium text-slate-200">{c.party}</Td>
                <Td>{c.location}</Td>
                <Td>{c.coverage}</Td>
                <Td className="font-mono">{c.slaHrs ? `${c.slaHrs} hrs` : "—"}</Td>
                <Td>{c.expiry}</Td>
                <Td><StatusPill status={c.status} /></Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}

function DowntimeModule({ equipment }) {
  const totalLoss = equipment.reduce((a, e) => a + e.downtimeHoursMTD * e.revenuePerHour, 0);
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <KpiCard icon={Clock} label="Downtime Hrs (MTD)" value={equipment.reduce((a, e) => a + e.downtimeHoursMTD, 0)} accent="text-amber-400" />
        <KpiCard icon={Banknote} label="Revenue Loss (MTD)" value={inrShort(totalLoss)} accent="text-rose-400" />
        <KpiCard icon={Wrench} label="Avg MTTR" value={(equipment.reduce((a, e) => a + e.mttrHours, 0) / equipment.length).toFixed(1) + " hrs"} accent="text-cyan-400" />
      </div>
      <Panel title="Downtime & Revenue Loss by Machine" subtitle="Revenue loss = downtime hours × avg revenue/hour for that machine">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead><tr><Th>Machine</Th><Th>Downtime (MTD)</Th><Th>MTTR</Th><Th>MTBF</Th><Th>Vendor SLA</Th><Th>Est. Revenue Loss</Th></tr></thead>
            <tbody>
              {equipment.map((e) => {
                const breach = e.mttrHours > (CONTRACTS.find((c) => c.party === e.amcVendor)?.slaHrs || 99);
                return (
                  <tr key={e.id}>
                    <Td className="font-medium text-slate-200">{e.modality} · {e.location}</Td>
                    <Td className="font-mono">{e.downtimeHoursMTD} hrs</Td>
                    <Td className="font-mono">{e.mttrHours} hrs</Td>
                    <Td className="font-mono">{e.mtbfDays} days</Td>
                    <Td>{e.amcResponseSLA} {breach && <span className="text-rose-400 text-xs ml-1">breach</span>}</Td>
                    <Td className="font-mono text-rose-400">{inrShort(e.downtimeHoursMTD * e.revenuePerHour)}</Td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}

function SparesModule({ equipment }) {
  const ids = new Set(equipment.map((e) => e.id));
  const rows = SPARES.filter((s) => ids.has(s.equipmentId));
  return (
    <Panel title="Spare Parts & Consumables Inventory">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead><tr><Th>Part</Th><Th>Equipment</Th><Th>Stock</Th><Th>Reorder Level</Th><Th>Lead Time</Th><Th>Last Order</Th><Th>Est. Cost</Th></tr></thead>
          <tbody>
            {rows.map((s) => (
              <tr key={s.id}>
                <Td className="font-medium text-slate-200">{s.part}</Td>
                <Td>{s.equipmentId}</Td>
                <Td className={s.stock <= s.reorderLevel ? "text-rose-400 font-mono" : "font-mono"}>{s.stock}</Td>
                <Td className="font-mono text-slate-500">{s.reorderLevel}</Td>
                <Td>{s.leadTimeDays} days</Td>
                <Td>{s.lastOrder}</Td>
                <Td className="font-mono">{inrShort(s.est)}</Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}

function CasesModule({ equipment }) {
  return (
    <Panel title="Cases Lined Up" subtitle="Today's queue and 7-day pipeline per machine">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead><tr><Th>Machine</Th><Th>Booked Today</Th><Th>In Progress</Th><Th>Completed</Th><Th>No-shows</Th><Th>Next 7 Days</Th></tr></thead>
          <tbody>
            {equipment.map((e) => (
              <tr key={e.id}>
                <Td className="font-medium text-slate-200">{e.modality} · {e.location}</Td>
                <Td className="font-mono">{e.casesToday.booked}</Td>
                <Td className="font-mono text-cyan-400">{e.casesToday.inProgress}</Td>
                <Td className="font-mono text-emerald-400">{e.casesToday.completed}</Td>
                <Td className="font-mono text-rose-400">{e.casesToday.noShow}</Td>
                <Td className="font-mono">{e.casesUpcoming7d}</Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}

function ComplianceStaffModule({ locationMode, selectedLocation }) {
  const inScope = (loc) => locationMode === "all" || loc === selectedLocation;
  return (
    <div className="space-y-5">
      <Panel title="Compliance & Accreditation Tracker" subtitle="Licenses that lapse silently and force a shutdown">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead><tr><Th>Item</Th><Th>Location</Th><Th>Expiry</Th><Th>Status</Th></tr></thead>
            <tbody>
              {COMPLIANCE.filter((c) => inScope(c.location)).map((c, i) => (
                <tr key={i}>
                  <Td className="font-medium text-slate-200">{c.item}</Td>
                  <Td>{c.location}</Td>
                  <Td>{c.expiry}</Td>
                  <Td><StatusPill status={c.status} /></Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
      <div className="grid md:grid-cols-2 gap-5">
        <Panel title="Staff Productivity">
          <div className="space-y-3">
            {STAFF.filter((s) => inScope(s.location)).map((s, i) => (
              <div key={i} className="flex items-center justify-between text-sm border-b border-slate-800/70 pb-2">
                <span className="text-slate-300">{s.name} · {s.location}</span>
                <span className="font-mono text-slate-200">{s.role === "Radiographer" ? `${s.scansPerShift} scans/shift` : `${s.reportsPerDay} reports/day · TAT ${s.avgTAT}`}</span>
              </div>
            ))}
          </div>
        </Panel>
        <Panel title="Referring Doctor Volume">
          <div className="space-y-3">
            {REFERRERS.filter((r) => inScope(r.location)).map((r, i) => (
              <div key={i} className="flex items-center justify-between text-sm border-b border-slate-800/70 pb-2">
                <span className="text-slate-300">{r.doctor} · {r.location}</span>
                <span className="font-mono text-slate-200 flex items-center gap-1">
                  {r.scansMTD}
                  {r.trend === "up" && <TrendingUp size={12} className="text-emerald-400" />}
                  {r.trend === "down" && <TrendingDown size={12} className="text-rose-400" />}
                </span>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}

function CashFlowModule({ locationMode, selectedLocation }) {
  const rows = RECEIVABLES.filter((r) => locationMode === "all" || r.location === selectedLocation);
  const totals = rows.reduce((a, r) => ({
    "0-30": a["0-30"] + r["0-30"], "30-60": a["30-60"] + r["30-60"],
    "60-90": a["60-90"] + r["60-90"], "90+": a["90+"] + r["90+"],
  }), { "0-30": 0, "30-60": 0, "60-90": 0, "90+": 0 });

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KpiCard icon={Banknote} label="0-30 days" value={inrShort(totals["0-30"])} accent="text-emerald-400" />
        <KpiCard icon={Banknote} label="30-60 days" value={inrShort(totals["30-60"])} accent="text-cyan-400" />
        <KpiCard icon={Banknote} label="60-90 days" value={inrShort(totals["60-90"])} accent="text-amber-400" />
        <KpiCard icon={Banknote} label="90+ days" value={inrShort(totals["90+"])} accent="text-rose-400" />
      </div>
      <Panel title="TPA / Insurance Receivables Aging" subtitle="Where imaging centers actually bleed cash">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead><tr><Th>Payer</Th><Th>Location</Th><Th>0-30d</Th><Th>30-60d</Th><Th>60-90d</Th><Th>90+d</Th></tr></thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i}>
                  <Td className="font-medium text-slate-200">{r.payer}</Td>
                  <Td>{r.location}</Td>
                  <Td className="font-mono">{inr(r["0-30"])}</Td>
                  <Td className="font-mono">{inr(r["30-60"])}</Td>
                  <Td className="font-mono text-amber-400">{inr(r["60-90"])}</Td>
                  <Td className="font-mono text-rose-400">{inr(r["90+"])}</Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}

/* ----------------------------- SHELL ----------------------------- */

const TABS = [
  { key: "overview", label: "Overview", icon: LayoutGrid },
  { key: "equipment", label: "Equipment", icon: Boxes },
  { key: "utilization", label: "Utilization", icon: Gauge },
  { key: "revenue", label: "Revenue", icon: IndianRupee },
  { key: "breakeven", label: "Breakeven", icon: Activity },
  { key: "contracts", label: "Contracts & Vendors", icon: FileText },
  { key: "downtime", label: "Downtime & Loss", icon: Wrench },
  { key: "spares", label: "Spare Parts", icon: ClipboardList },
  { key: "cases", label: "Cases Pipeline", icon: Calendar },
  { key: "compliance", label: "Compliance & Staff", icon: ShieldCheck },
  { key: "cashflow", label: "Cash Flow", icon: Banknote },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [locationMode, setLocationMode] = useState("single");
  const [centres, setCentres] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(DEFAULT_LOCATIONS[0]);
  const [locPickerOpen, setLocPickerOpen] = useState(false);

  const locations = centres.length ? centres.map((centre) => centre.name) : DEFAULT_LOCATIONS;

  useEffect(() => {
    async function loadCentres() {
      const response = await fetch("/api/centres");
      if (!response.ok) return;

      const { centres: databaseCentres } = await response.json();
      setCentres(databaseCentres);
    }

    loadCentres().catch(() => {
      // Retain the existing location list while the database is unavailable.
    });
  }, []);

  useEffect(() => {
    if (!locations.includes(selectedLocation)) {
      setSelectedLocation(locations[0]);
    }
  }, [locations, selectedLocation]);

  const equipment = useMemo(
    () => (locationMode === "all" ? EQUIPMENT : EQUIPMENT.filter((e) => e.location === selectedLocation)),
    [locationMode, selectedLocation]
  );

  const alertCount =
    equipment.filter((e) => e.status !== "Operational").length +
    CONTRACTS.filter((c) => c.status === "Expiring Soon" && (locationMode === "all" || c.location === selectedLocation || c.location === "All")).length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
      {/* Sidebar */}
      <aside className="w-60 shrink-0 border-r border-slate-800 bg-slate-900/40 flex flex-col">
        <div className="px-5 py-5 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center">
              <Activity size={14} className="text-cyan-400" />
            </div>
            <span className="font-semibold text-slate-100 tracking-wide text-sm">CENTRE CONTROL</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Imaging Operations Console</p>
        </div>
        <nav className="flex-1 py-3 overflow-y-auto">
          {TABS.map((t) => {
            const Icon = t.icon;
            const active = activeTab === t.key;
            return (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className={`w-full flex items-center gap-3 px-5 py-2.5 text-sm transition-colors ${
                  active ? "bg-cyan-400/10 text-cyan-300 border-r-2 border-cyan-400" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
                }`}
              >
                <Icon size={15} />
                {t.label}
              </button>
            );
          })}
        </nav>
        <div className="px-5 py-4 border-t border-slate-800 text-[11px] text-slate-600">
          Kretec Health · Ops Layer
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="border-b border-slate-800 px-6 py-4 flex items-center justify-between flex-wrap gap-3 bg-slate-950/80 sticky top-0 z-10">
          <div>
            <h1 className="text-slate-100 font-semibold text-lg">{TABS.find((t) => t.key === activeTab)?.label}</h1>
            <p className="text-slate-500 text-xs mt-0.5">Monday, 13 July 2026</p>
          </div>
          <div className="flex items-center gap-3">
            {alertCount > 0 && (
              <div className="flex items-center gap-1.5 text-amber-400 text-xs bg-amber-400/10 border border-amber-400/30 px-2.5 py-1.5 rounded">
                <AlertTriangle size={13} /> {alertCount} alerts
              </div>
            )}
            <div className="flex items-center bg-slate-900 border border-slate-800 rounded overflow-hidden text-xs">
              <button
                onClick={() => setLocationMode("single")}
                className={`px-3 py-2 ${locationMode === "single" ? "bg-cyan-400/10 text-cyan-300" : "text-slate-400"}`}
              >
                Single Center
              </button>
              <button
                onClick={() => setLocationMode("all")}
                className={`px-3 py-2 ${locationMode === "all" ? "bg-cyan-400/10 text-cyan-300" : "text-slate-400"}`}
              >
                All Locations
              </button>
            </div>
            {locationMode === "single" && (
              <div className="relative">
                <button
                  onClick={() => setLocPickerOpen((o) => !o)}
                  className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded px-3 py-2 text-xs text-slate-200"
                >
                  <MapPin size={13} className="text-cyan-400" /> {selectedLocation} <ChevronDown size={13} />
                </button>
                {locPickerOpen && (
                  <div className="absolute right-0 mt-1 bg-slate-900 border border-slate-800 rounded shadow-lg z-20 min-w-[140px]">
                    {locations.map((loc) => (
                      <button
                        key={loc}
                        onClick={() => { setSelectedLocation(loc); setLocPickerOpen(false); }}
                        className={`w-full text-left px-3 py-2 text-xs hover:bg-slate-800 ${loc === selectedLocation ? "text-cyan-300" : "text-slate-300"}`}
                      >
                        {loc}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </header>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          {activeTab === "overview" && <Overview equipment={equipment} locationMode={locationMode} locations={locations} />}
          {activeTab === "equipment" && <EquipmentModule equipment={equipment} />}
          {activeTab === "utilization" && <UtilizationModule equipment={equipment} />}
          {activeTab === "revenue" && <RevenueModule equipment={equipment} />}
          {activeTab === "breakeven" && <BreakevenModule equipment={equipment} />}
          {activeTab === "contracts" && <ContractsModule locationMode={locationMode} selectedLocation={selectedLocation} />}
          {activeTab === "downtime" && <DowntimeModule equipment={equipment} />}
          {activeTab === "spares" && <SparesModule equipment={equipment} />}
          {activeTab === "cases" && <CasesModule equipment={equipment} />}
          {activeTab === "compliance" && <ComplianceStaffModule locationMode={locationMode} selectedLocation={selectedLocation} />}
          {activeTab === "cashflow" && <CashFlowModule locationMode={locationMode} selectedLocation={selectedLocation} />}
        </div>
      </main>
    </div>
  );
}

