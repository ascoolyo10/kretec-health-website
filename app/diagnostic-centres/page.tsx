import Link from "next/link";
import { ArrowRight, Building2, ShieldCheck, BarChart3, CalendarCheck } from "lucide-react";

export default function DiagnosticCentresPage() {
  return (
    <main className="min-h-screen bg-white">

      {/* Hero */}

      <section className="bg-[#061F44] pt-36 pb-24">
        <div className="mx-auto max-w-7xl px-6">

          <div className="grid items-center gap-16 lg:grid-cols-2">

            <div>

              <span className="rounded-full border border-[#D4AF37]/30 bg-white/10 px-5 py-2 text-sm font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
                Kretec CentreOS
              </span>

              <h1 className="mt-8 text-6xl font-black leading-tight text-white">
                Run Your
                <br />
                Diagnostic Centre
                <br />
                Smarter.
              </h1>

              <p className="mt-8 max-w-xl text-xl leading-9 text-slate-300">
                Increase utilization, manage equipment, automate operations,
                improve revenue and deliver a better patient experience through
                one integrated operating platform.
              </p>

              <div className="mt-10 flex gap-5">

                <Link
                  href="/login"
                  className="rounded-full bg-[#D4AF37] px-8 py-4 font-semibold text-[#061F44] transition hover:scale-105"
                >
                  Centre Login
                </Link>

                <button className="rounded-full border border-white/20 px-8 py-4 font-semibold text-white hover:border-[#D4AF37]">
                  Request Demo
                </button>

              </div>

            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur">

              <div className="grid gap-6">

                <div className="flex items-start gap-5">
                  <Building2 className="text-[#D4AF37]" size={34} />
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      Multi-Centre Operations
                    </h3>
                    <p className="mt-2 text-slate-300">
                      Manage one or multiple diagnostic centres from a single dashboard.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <BarChart3 className="text-[#D4AF37]" size={34} />
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      Revenue Intelligence
                    </h3>
                    <p className="mt-2 text-slate-300">
                      Track utilization, profitability and machine performance.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <CalendarCheck className="text-[#D4AF37]" size={34} />
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      Appointment Management
                    </h3>
                    <p className="mt-2 text-slate-300">
                      Manage bookings, patients and reporting workflows.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <ShieldCheck className="text-[#D4AF37]" size={34} />
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      Compliance & Service
                    </h3>
                    <p className="mt-2 text-slate-300">
                      AMC, uptime, compliance and inventory monitoring in one place.
                    </p>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Preview */}

      <section className="py-24">

        <div className="mx-auto max-w-7xl px-6">

          <div className="text-center">

            <h2 className="text-5xl font-bold text-[#061F44]">
              Experience CentreOS
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-600">
              Explore our demo dashboard and discover how Kretec helps imaging
              centres manage operations, equipment, finances and compliance.
            </p>

            <Link
              href="/login"
              className="mt-10 inline-flex items-center gap-3 rounded-full bg-[#061F44] px-8 py-4 text-lg font-semibold text-white hover:bg-[#0B3B78]"
            >
              Launch Demo Dashboard
              <ArrowRight size={20} />
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}