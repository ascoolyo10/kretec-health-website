"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type Slot = { id: string; startsAt: string; endsAt: string };

export default function BookingPage() {
  const params = useSearchParams();
  const serviceId = params.get("serviceId") || "";
  const date = params.get("date") || "";
  const [slots, setSlots] = useState<Slot[]>([]);
  const [slotId, setSlotId] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!serviceId) { setIsLoading(false); return; }
    const query = new URLSearchParams({ serviceId });
    if (date) query.set("date", date);
    fetch(`/api/slots?${query.toString()}`)
      .then((response) => response.ok ? response.json() : Promise.reject())
      .then(({ slots: availableSlots }) => setSlots(availableSlots))
      .catch(() => setMessage("We could not load appointment times. Please return to search and try again."))
      .finally(() => setIsLoading(false));
  }, [serviceId, date]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!slotId) { setMessage("Please choose an appointment time."); return; }
    setIsSubmitting(true); setMessage("");
    try {
      const response = await fetch("/api/bookings", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ serviceId, slotId, patient: { fullName, phone, email, consentToStoreData: consent } }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to create booking");
      setMessage(`Booking ${result.booking.bookingNumber} is confirmed. Payment will be collected later.`);
      setSlots((current) => current.filter((slot) => slot.id !== slotId));
      setSlotId("");
    } catch (error) { setMessage(error instanceof Error ? error.message : "Unable to create booking"); }
    finally { setIsSubmitting(false); }
  }

  if (!serviceId) return <main className="mx-auto max-w-2xl px-6 py-24"><h1 className="text-3xl font-bold text-[#082B5B]">Choose a scan first</h1><Link className="mt-6 inline-block text-[#082B5B] underline" href="/">Return to search</Link></main>;

  return <main className="mx-auto max-w-2xl px-6 py-16"><Link className="text-sm font-semibold text-[#082B5B] underline" href="/">← Back to search</Link><h1 className="mt-6 text-3xl font-bold text-[#082B5B]">Reserve your scan</h1><p className="mt-2 text-slate-600">Choose an available time and share the details needed to hold your appointment.</p><form onSubmit={submit} className="mt-8 space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><fieldset><legend className="font-semibold text-slate-900">Available times</legend>{isLoading ? <p className="mt-2 text-sm text-slate-500">Loading times…</p> : slots.length === 0 ? <p className="mt-2 text-sm text-slate-500">No appointment times are available for this selection.</p> : <div className="mt-3 grid gap-2 sm:grid-cols-2">{slots.map((slot) => <label key={slot.id} className="cursor-pointer rounded-lg border border-slate-200 p-3 has-[:checked]:border-[#082B5B] has-[:checked]:bg-slate-50"><input className="mr-2" required type="radio" name="slot" value={slot.id} checked={slotId === slot.id} onChange={() => setSlotId(slot.id)} />{new Date(slot.startsAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}</label>)}</div>}</fieldset><label className="block text-sm font-medium">Full name<input required value={fullName} onChange={(event) => setFullName(event.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" /></label><label className="block text-sm font-medium">Mobile number<input required type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" /></label><label className="block text-sm font-medium">Email (optional)<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" /></label><label className="flex gap-2 text-sm text-slate-700"><input required type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} />I consent to Kretec storing these details to manage this booking.</label><button disabled={isLoading || isSubmitting || slots.length === 0} className="rounded-lg bg-[#D4AF37] px-5 py-3 font-bold text-[#082B5B] disabled:opacity-50">{isSubmitting ? "Reserving…" : "Reserve appointment"}</button>{message && <p className="text-sm font-medium text-[#082B5B]" role="status">{message}</p>}</form></main>;
}

