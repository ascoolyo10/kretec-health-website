import {
  Search,
  Scale,
  CalendarCheck2,
  FileText,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Search",
    description:
      "Select your city and preferred diagnostic scan.",
    icon: Search,
  },
  {
    number: "02",
    title: "Compare",
    description:
      "Compare trusted centres, pricing and availability.",
    icon: Scale,
  },
  {
    number: "03",
    title: "Book",
    description:
      "Choose your preferred slot and confirm instantly.",
    icon: CalendarCheck2,
  },
  {
    number: "04",
    title: "Get Report",
    description:
      "Access reports securely anytime from your dashboard.",
    icon: FileText,
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-white py-32">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mx-auto max-w-3xl text-center">

          <span className="rounded-full bg-[#082B5B]/10 px-5 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#082B5B]">
            How It Works
          </span>

          <h2 className="mt-6 text-5xl font-bold text-slate-900">
            Book Your Diagnostic Scan
            <br />
            In Four Simple Steps
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            A simple, transparent and technology-driven booking experience.
          </p>

        </div>

        <div className="relative mt-24">

          {/* Timeline Line */}

          <div className="absolute left-0 right-0 top-12 hidden h-1 bg-slate-200 lg:block">
            <div className="h-full w-full bg-gradient-to-r from-[#082B5B] via-[#D4AF37] to-[#082B5B]" />
          </div>

          <div className="grid gap-10 lg:grid-cols-4">

            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="relative text-center"
                >
                  <div className="relative z-10 mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#082B5B] shadow-xl">

                    <Icon
                      className="text-[#D4AF37]"
                      size={34}
                    />

                  </div>

                  <div className="mt-6 text-sm font-bold tracking-widest text-[#D4AF37]">
                    STEP {step.number}
                  </div>

                  <h3 className="mt-3 text-2xl font-bold text-slate-900">
                    {step.title}
                  </h3>

                  <p className="mt-4 leading-7 text-slate-600">
                    {step.description}
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