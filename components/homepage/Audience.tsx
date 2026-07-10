import {
  ArrowRight,
  Building2,
  BriefcaseBusiness,
  UserRound,
} from "lucide-react";

const audience = [
  {
    title: "For Patients",
    icon: UserRound,
    description:
      "Book CT, MRI, PET-CT and advanced diagnostic scans with transparent pricing and trusted centres.",
    features: [
      "Compare Prices",
      "Instant Booking",
      "Digital Reports",
      "24×7 Support",
    ],
  },
  {
    title: "For Diagnostic Centres",
    icon: Building2,
    description:
      "Increase equipment utilization and reach more patients through India's diagnostics platform.",
    features: [
      "Increase Revenue",
      "Smart Scheduling",
      "Analytics Dashboard",
      "Patient Growth",
    ],
  },
  {
    title: "For Corporates",
    icon: BriefcaseBusiness,
    description:
      "Deliver employee wellness and preventive healthcare programs through one intelligent platform.",
    features: [
      "Employee Health",
      "Central Dashboard",
      "Billing",
      "Health Reports",
    ],
  },
];

export default function Audience() {
  return (
    <section className="bg-[#F8FAFC] py-28">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mx-auto max-w-3xl text-center">

          <span className="rounded-full bg-[#082B5B]/10 px-5 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#082B5B]">
            Built For Everyone
          </span>

          <h2 className="mt-6 text-5xl font-bold text-slate-900">
            One Platform.
            <br />
            Multiple Healthcare Stakeholders.
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Kretec connects patients, diagnostic centres and enterprises
            through one intelligent diagnostics ecosystem.
          </p>

        </div>

        <div className="mt-20 grid gap-8 lg:grid-cols-3">

          {audience.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="group rounded-[30px] bg-white p-10 shadow-sm transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl"
              >

                <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-[#082B5B]/10 transition group-hover:bg-[#D4AF37]/15">

                  <Icon
                    className="text-[#082B5B]"
                    size={36}
                  />

                </div>

                <h3 className="mt-8 text-3xl font-bold">
                  {item.title}
                </h3>

                <p className="mt-5 leading-8 text-slate-600">
                  {item.description}
                </p>

                <div className="mt-8 space-y-4">

                  {item.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-3"
                    >
                      <div className="h-2 w-2 rounded-full bg-[#D4AF37]" />

                      <span className="text-slate-700">
                        {feature}
                      </span>
                    </div>
                  ))}

                </div>

                <button className="mt-10 flex items-center gap-2 font-semibold text-[#082B5B] transition group-hover:text-[#D4AF37]">

                  Learn More

                  <ArrowRight size={18} />

                </button>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}