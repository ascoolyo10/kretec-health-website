import {
  Building2,
  CircleDollarSign,
  Hospital,
  ShieldCheck,
  Users,
} from "lucide-react";

export default function HeroGraphic() {
  return (
    <div className="relative hidden h-[700px] items-center justify-center lg:flex">

      {/* Background Rings */}

      <div className="absolute h-[520px] w-[520px] rounded-full border border-white/10"></div>

      <div className="absolute h-[380px] w-[380px] rounded-full border border-dashed border-[#D4AF37]/30"></div>

      {/* Connection Lines */}

      <div className="absolute h-[2px] w-[340px] bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent"></div>

      <div className="absolute h-[340px] w-[2px] bg-gradient-to-b from-transparent via-[#D4AF37]/60 to-transparent"></div>

      {/* Center */}

      <div className="absolute z-20 flex h-44 w-44 flex-col items-center justify-center rounded-full bg-gradient-to-br from-[#D4AF37] to-[#E8C766] shadow-[0_0_80px_rgba(212,175,55,0.35)]">

        <Hospital size={42} className="text-[#082B5B]" />

        <h3 className="mt-3 text-2xl font-bold text-[#082B5B]">
          Kretec
        </h3>

      </div>

      {/* Top */}

      <div className="absolute top-8 rounded-3xl bg-white/10 p-6 backdrop-blur-xl border border-white/10 shadow-xl">

        <Users className="mb-3 text-[#D4AF37]" size={34} />

        <h4 className="font-bold text-white">
          Patients
        </h4>

        <p className="mt-2 text-sm text-slate-300">
          Easy Discovery
        </p>

      </div>

      {/* Left */}

      <div className="absolute left-0 rounded-3xl bg-white/10 p-6 backdrop-blur-xl border border-white/10 shadow-xl">

        <Building2 className="mb-3 text-[#D4AF37]" size={34} />

        <h4 className="font-bold text-white">
          Diagnostic Centres
        </h4>

        <p className="mt-2 text-sm text-slate-300">
          Better Utilisation
        </p>

      </div>

      {/* Right */}

      <div className="absolute right-0 rounded-3xl bg-white/10 p-6 backdrop-blur-xl border border-white/10 shadow-xl">

        <CircleDollarSign
          className="mb-3 text-[#D4AF37]"
          size={34}
        />

        <h4 className="font-bold text-white">
          Corporates
        </h4>

        <p className="mt-2 text-sm text-slate-300">
          Employee Wellness
        </p>

      </div>

      {/* Bottom */}

      <div className="absolute bottom-8 rounded-3xl bg-white/10 p-6 backdrop-blur-xl border border-white/10 shadow-xl">

        <ShieldCheck
          className="mb-3 text-[#D4AF37]"
          size={34}
        />

        <h4 className="font-bold text-white">
          Trusted Platform
        </h4>

        <p className="mt-2 text-sm text-slate-300">
          AI + Digital Healthcare
        </p>

      </div>

    </div>
  );
}