import SearchWidget from "../search/SearchWidget";
import HeroGraphic from "./HeroGraphic";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#061F44] pt-24 lg:pt-32">

      {/* Background Glow */}
      <div className="absolute -left-52 top-0 h-[700px] w-[700px] rounded-full bg-[#1E4E8C]/25 blur-[180px]" />
      <div className="absolute right-0 top-32 h-[500px] w-[500px] rounded-full bg-[#D4AF37]/10 blur-[140px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_45%)]" />

      {/* HERO CONTENT */}

      <div className="relative mx-auto max-w-[1400px] px-6">

        <div className="grid items-center gap-16 lg:grid-cols-[60%_40%]">

          {/* LEFT */}

          <div>

            <span className="inline-flex rounded-full border border-[#D4AF37]/30 bg-white/5 px-5 py-2 text-sm font-semibold uppercase tracking-[0.25em] text-[#D4AF37] backdrop-blur">
              CONNECTING INDIA'S DIAGNOSTICS ECOSYSTEM
            </span>

            <h1 className="mt-8 text-6xl font-black leading-[1.05] tracking-tight text-white lg:text-8xl">
              Smarter
              <br />
              <span className="text-[#D4AF37]">
                Diagnostics.
              </span>
              <br />
              Better Health.
            </h1>

            <p className="mt-8 max-w-2xl text-xl leading-9 text-slate-300">
              Book CT, MRI, PET-CT and advanced diagnostic scans
              through India's trusted diagnostic network with
              real-time availability, transparent pricing and
              digital healthcare experiences.
            </p>

            {/* Trust Badges */}

            <div className="mt-10 flex flex-wrap gap-8">

              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-[#D4AF37]" />
                <span className="font-medium text-white">
                  Trusted Network
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-[#D4AF37]" />
                <span className="font-medium text-white">
                  Book in 2 Minutes
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-[#D4AF37]" />
                <span className="font-medium text-white">
                  24×7 Support
                </span>
              </div>

            </div>

          </div>

          {/* RIGHT */}

          <HeroGraphic />

        </div>

        {/* SEARCH BAR */}

       <div className="relative z-20 mt-12 flex justify-center">
  <div className="w-full max-w-5xl">
    <SearchWidget />
  </div>
</div>

      </div>

    </section>
  );
}