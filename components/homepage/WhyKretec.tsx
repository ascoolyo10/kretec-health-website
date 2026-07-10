import {
  BadgeCheck,
  BrainCircuit,
  Clock3,
  Globe2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Transparent Pricing",
    desc: "Compare pricing across trusted diagnostic centres before booking.",
  },
  {
    icon: Clock3,
    title: "Real-time Availability",
    desc: "Check live appointment slots and book instantly.",
  },
  {
    icon: BadgeCheck,
    title: "Trusted Network",
    desc: "Verified diagnostic centres with quality standards.",
  },
  {
    icon: BrainCircuit,
    title: "Technology Driven",
    desc: "AI-powered workflows for faster and smarter diagnostics.",
  },
  {
    icon: Globe2,
    title: "Pan-India Expansion",
    desc: "Growing diagnostics network across India.",
  },
  {
    icon: Sparkles,
    title: "Digital Experience",
    desc: "Bookings, reports and support from one platform.",
  },
];

export default function WhyKretec() {
  return (
    <section className="bg-white py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-20 px-6 lg:grid-cols-2">

        {/* LEFT */}

        <div>

          <span className="rounded-full bg-[#082B5B]/10 px-5 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#082B5B]">
            Why Kretec
          </span>

          <h2 className="mt-6 text-5xl font-bold leading-tight text-slate-900">
            Why Healthcare
            <br />
            Leaders Choose
            <span className="text-[#D4AF37]"> Kretec.</span>
          </h2>

          <p className="mt-8 text-lg leading-8 text-slate-600">
            Kretec is building India's connected diagnostics ecosystem by
            bringing patients, diagnostic centres and enterprises onto one
            intelligent technology platform.
          </p>

          <div className="mt-12 rounded-[32px] border border-slate-200 bg-gradient-to-br from-[#082B5B] to-[#123F72] p-10 text-white shadow-2xl">

            <div className="flex items-center justify-center">

              <div className="flex h-36 w-36 items-center justify-center rounded-full bg-[#D4AF37] text-3xl font-bold text-[#082B5B]">
                K
              </div>

            </div>

            <div className="mt-10 grid grid-cols-2 gap-6 text-center">

              <div>

                <h3 className="text-3xl font-bold text-[#D4AF37]">
                  AI
                </h3>

                <p className="mt-2 text-slate-300">
                  Smart Platform
                </p>

              </div>

              <div>

                <h3 className="text-3xl font-bold text-[#D4AF37]">
                  24×7
                </h3>

                <p className="mt-2 text-slate-300">
                  Support
                </p>

              </div>

              <div>

                <h3 className="text-3xl font-bold text-[#D4AF37]">
                  PAN
                </h3>

                <p className="mt-2 text-slate-300">
                  India Vision
                </p>

              </div>

              <div>

                <h3 className="text-3xl font-bold text-[#D4AF37]">
                  One
                </h3>

                <p className="mt-2 text-slate-300">
                  Platform
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div className="space-y-6">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="flex gap-5 rounded-3xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37] hover:shadow-xl"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#082B5B]/10">
                  <Icon
                    className="text-[#082B5B]"
                    size={30}
                  />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {feature.title}
                  </h3>

                  <p className="mt-2 leading-7 text-slate-600">
                    {feature.desc}
                  </p>
                </div>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}