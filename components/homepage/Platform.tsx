import {
  Activity,
  BarChart3,
  Brain,
  CalendarCheck2,
  FileText,
  Hospital,
  ScanSearch,
  ShieldCheck,
} from "lucide-react";

const capabilities = [
  {
    icon: ScanSearch,
    title: "CT, MRI & PET-CT Booking",
    description:
      "Search and book advanced diagnostic scans through one platform.",
  },
  {
    icon: CalendarCheck2,
    title: "Real-time Availability",
    description:
      "Check live appointment slots before booking.",
  },
  {
    icon: Hospital,
    title: "Trusted Diagnostic Network",
    description:
      "Verified diagnostic centres across India.",
  },
  {
    icon: FileText,
    title: "Digital Reports",
    description:
      "Secure online report delivery and history.",
  },
  {
    icon: ShieldCheck,
    title: "Transparent Pricing",
    description:
      "Compare prices and make informed decisions.",
  },
  {
    icon: Activity,
    title: "Equipment Lifecycle",
    description:
      "Support for imaging equipment and service ecosystem.",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description:
      "Business insights for centres and enterprises.",
  },
  {
    icon: Brain,
    title: "AI Ready Platform",
    description:
      "Future-ready workflows powered by intelligent automation.",
  },
];

export default function Platform() {
  return (
    <section className="bg-[#F8FAFC] py-32">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mx-auto max-w-3xl text-center">

          <span className="rounded-full bg-[#082B5B]/10 px-5 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#082B5B]">
            Platform Capabilities
          </span>

          <h2 className="mt-6 text-5xl font-bold text-slate-900">
            Everything Needed for
            <br />
            Modern Diagnostics
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Built to simplify diagnostic discovery, booking,
            reporting and healthcare collaboration.
          </p>

        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {capabilities.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="group rounded-[28px] border border-slate-200 bg-white p-8 transition-all duration-300 hover:-translate-y-2 hover:border-[#D4AF37] hover:shadow-2xl"
              >

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#082B5B]/10 transition group-hover:bg-[#D4AF37]/15">

                  <Icon
                    size={32}
                    className="text-[#082B5B]"
                  />

                </div>

                <h3 className="mt-8 text-xl font-bold text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  {item.description}
                </p>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}