import {
  ArrowRight,
  Building2,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

const trustItems = [
  {
    icon: ShieldCheck,
    value: "100%",
    label: "Verified Centres",
  },
  {
    icon: Users,
    value: "24×7",
    label: "Customer Support",
  },
  {
    icon: Sparkles,
    value: "AI",
    label: "Technology Driven",
  },
  {
    icon: Building2,
    value: "PAN",
    label: "India Vision",
  },
];

export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#082B5B] via-[#123F72] to-[#061F44] py-28 text-white">

      {/* Background Glow */}

      <div className="absolute -left-32 top-0 h-[350px] w-[350px] rounded-full bg-[#D4AF37]/10 blur-[120px]" />

      <div className="absolute right-0 bottom-0 h-[350px] w-[350px] rounded-full bg-blue-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6">

        {/* Trust */}

        <div className="grid gap-6 border-b border-white/10 pb-14 md:grid-cols-2 lg:grid-cols-4">

          {trustItems.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="flex items-center gap-4 rounded-2xl bg-white/5 p-6 backdrop-blur"
              >
                <div className="rounded-xl bg-[#D4AF37]/20 p-3">

                  <Icon
                    className="text-[#D4AF37]"
                    size={28}
                  />

                </div>

                <div>

                  <h3 className="text-2xl font-bold text-[#D4AF37]">
                    {item.value}
                  </h3>

                  <p className="text-sm text-slate-300">
                    {item.label}
                  </p>

                </div>

              </div>
            );
          })}

        </div>

        {/* CTA */}

        <div className="mx-auto mt-20 max-w-4xl text-center">

          <span className="rounded-full border border-[#D4AF37]/30 bg-white/5 px-5 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
            Start Your Journey
          </span>

          <h2 className="mt-8 text-5xl font-bold leading-tight md:text-6xl">
            Let's Build the Future
            <br />
            of Diagnostics Together.
          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-300">
            Whether you're a patient, diagnostic centre or enterprise,
            Kretec connects healthcare through one intelligent technology
            platform.
          </p>

          <div className="mt-12 flex flex-col justify-center gap-5 sm:flex-row">

            <button className="flex items-center justify-center gap-3 rounded-full bg-[#D4AF37] px-8 py-4 font-semibold text-[#082B5B] transition-all duration-300 hover:scale-105 hover:shadow-xl">

              Find & Book a Scan

              <ArrowRight size={20} />

            </button>

            <button className="rounded-full border border-white px-8 py-4 font-semibold text-white transition-all duration-300 hover:bg-white hover:text-[#082B5B]">

              Partner With Kretec

            </button>

          </div>

        </div>

      </div>

    </section>
  );
}