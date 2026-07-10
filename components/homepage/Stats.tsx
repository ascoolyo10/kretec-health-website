import {
  Building2,
  MapPinned,
  Users,
  Headset,
} from "lucide-react";

const stats = [
  {
    icon: Building2,
    value: "1000+",
    label: "Diagnostic Centres",
  },
  {
    icon: MapPinned,
    value: "50+",
    label: "Cities",
  },
  {
    icon: Users,
    value: "10L+",
    label: "Patients Served",
  },
  {
    icon: Headset,
    value: "24×7",
    label: "Support",
  },
];

export default function Stats() {
  return (
    <section className="bg-[#061F44] py-10">
      <div className="mx-auto max-w-7xl px-6">

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="flex items-center gap-5 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
              >
                <div className="rounded-2xl bg-[#D4AF37]/15 p-4">
                  <Icon
                    className="text-[#D4AF37]"
                    size={30}
                  />
                </div>

                <div>
                  <h3 className="text-3xl font-bold text-[#D4AF37]">
                    {item.value}
                  </h3>

                  <p className="mt-1 text-sm text-slate-300">
                    {item.label}
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