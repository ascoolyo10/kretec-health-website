import Link from "next/link";
import {
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

const solutions = [
  "CT Scan",
  "MRI",
  "PET-CT",
  "Cath Lab",
];

const company = [
  "About Us",
  "Contact",
  "Careers",
  "Blogs",
];

const legal = [
  "Privacy Policy",
  "Terms & Conditions",
  "Cookie Policy",
];

export default function Footer() {
  return (
    <footer className="bg-[#04162F] text-white">

      <div className="mx-auto max-w-7xl px-6 py-20">

        <div className="grid gap-14 lg:grid-cols-5">

          {/* Logo */}

          <div className="lg:col-span-2">

            <div className="flex items-center gap-4">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#D4AF37] text-2xl font-bold text-[#082B5B]">
                K
              </div>

              <div>

                <h2 className="text-2xl font-bold">
                  Kretec Health
                </h2>

                <p className="text-sm text-slate-400">
                  Diagnostics Platform
                </p>

              </div>

            </div>

            <p className="mt-8 max-w-md leading-8 text-slate-400">
              Connecting patients, diagnostic centres and enterprises
              through India's most advanced diagnostics ecosystem.
            </p>

            <div className="mt-10 space-y-4">

              <div className="flex items-center gap-3">

                <MapPin
                  size={18}
                  className="text-[#D4AF37]"
                />

                <span className="text-slate-300">
                  Mumbai, India
                </span>

              </div>

              <div className="flex items-center gap-3">

                <Mail
                  size={18}
                  className="text-[#D4AF37]"
                />

                <span className="text-slate-300">
                  kretechealth@gmail.com
                </span>

              </div>

              <div className="flex items-center gap-3">

                <Phone
                  size={18}
                  className="text-[#D4AF37]"
                />

                <span className="text-slate-300">
                  +91 XXXXX XXXXX
                </span>

              </div>

            </div>

          </div>

          {/* Solutions */}

          <div>

            <h3 className="text-lg font-semibold">
              Solutions
            </h3>

            <div className="mt-6 space-y-4">

              {solutions.map((item) => (
                <Link
                  key={item}
                  href="#"
                  className="block text-slate-400 transition hover:text-[#D4AF37]"
                >
                  {item}
                </Link>
              ))}

            </div>

          </div>

          {/* Company */}

          <div>

            <h3 className="text-lg font-semibold">
              Company
            </h3>

            <div className="mt-6 space-y-4">

              {company.map((item) => (
                <Link
                  key={item}
                  href="#"
                  className="block text-slate-400 transition hover:text-[#D4AF37]"
                >
                  {item}
                </Link>
              ))}

            </div>

          </div>

          {/* Legal */}

          <div>

            <h3 className="text-lg font-semibold">
              Legal
            </h3>

            <div className="mt-6 space-y-4">

              {legal.map((item) => (
                <Link
                  key={item}
                  href="#"
                  className="block text-slate-400 transition hover:text-[#D4AF37]"
                >
                  {item}
                </Link>
              ))}

            </div>

            <div className="mt-10">
  <a
    href="mailto:kretechealth@gmail.com"
    className="inline-flex items-center gap-3 rounded-xl border border-white/10 px-5 py-3 text-slate-300 transition hover:border-[#D4AF37] hover:text-[#D4AF37]"
  >
    <Mail size={18} />
    kretechealth@gmail.com
  </a>
</div>

          </div>

        </div>

        <div className="mt-16 border-t border-white/10 pt-8 text-center text-slate-500">
          © 2026 Kretec Health. All Rights Reserved.
        </div>

      </div>

    </footer>
  );
}