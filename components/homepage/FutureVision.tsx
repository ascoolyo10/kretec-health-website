import {
  CalendarClock,
  Hospital,
  Globe,
  BrainCircuit,
} from "lucide-react";

const roadmap = [
  {
    year: "2026",
    title: "Diagnostics Marketplace",
    description:
      "Launch India's connected diagnostics booking platform.",
    icon: CalendarClock,
  },
  {
    year: "2027",
    title: "Hospital Platform",
    description:
      "Expand into hospital workflows and enterprise healthcare.",
    icon: Hospital,
  },
  {
    year: "2028",
    title: "Medical Tourism",
    description:
      "Enable global patient access and cross-border healthcare.",
    icon: Globe,
  },
  {
    year: "2029+",
    title: "AI Healthcare Ecosystem",
    description:
      "Build India's intelligent healthcare infrastructure powered by AI.",
    icon: BrainCircuit,
  },
];

export default function FutureVision() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#061F44] via-[#082B5B] to-[#123F72] py-32 text-white">

      {/* Background Glow */}
      <div className="absolute -left-40 top-0 h-[450px] w-[450px] rounded-full bg-[#D4AF37]/10 blur-[140px]" />
      <div className="absolute right-0 bottom-0 h-[450px] w-[450px] rounded-full bg-blue-500/10 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-6">

        <div className="mx-auto max-w-3xl text-center">

          <span className="rounded-full border border-[#D4AF37]/30 bg-white/5 px-5 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
            Future Vision
          </span>

          <h2 className="mt-6 text-5xl font-bold">
            Building India's Future
            <br />
            Healthcare Platform
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-300">
            Kretec is evolving from a diagnostics platform into a connected,
            technology-driven healthcare ecosystem.
          </p>

        </div>

        <div className="relative mt-24">

          {/* Timeline */}
          <div className="absolute left-0 right-0 top-16 hidden h-[2px] bg-gradient-to-r from-[#D4AF37]/20 via-[#D4AF37] to-[#D4AF37]/20 lg:block" />

          <div className="grid gap-10 lg:grid-cols-4">

            {roadmap.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.year}
                  className="relative z-10 text-center"
                >
                  <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border-4 border-[#D4AF37] bg-[#082B5B] shadow-[0_0_40px_rgba(212,175,55,0.25)]">
                    <Icon
                      className="text-[#D4AF37]"
                      size={34}
                    />
                  </div>

                  <div className="mt-6 text-3xl font-bold text-[#D4AF37]">
                    {item.year}
                  </div>

                  <h3 className="mt-4 text-2xl font-semibold">
                    {item.title}
                  </h3>

                  <p className="mt-4 leading-7 text-slate-300">
                    {item.description}
                  </p>
                </div>
              );
            })}

          </div>

        </div>

      </div>
    </section>
  );
}