"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Lock, Mail } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
  if (
    email === "demo@kretec.health" &&
    password === "demo123"
  ) {
    router.push("/dashboard");
  } else {
    alert("Invalid demo credentials");
  }
};

  return (
    <main className="min-h-screen bg-[#061F44]">

      <div className="mx-auto flex min-h-screen max-w-7xl items-center px-6">

        <div className="grid w-full items-center gap-20 lg:grid-cols-2">

          {/* LEFT */}

          <div>

            <span className="rounded-full border border-[#D4AF37]/30 bg-white/10 px-5 py-2 text-sm font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
              Kretec CentreOS
            </span>

            <h1 className="mt-8 text-6xl font-black leading-tight text-white">
              Welcome
              <br />
              Back.
            </h1>

            <p className="mt-8 max-w-lg text-xl leading-9 text-slate-300">
              Login to access your diagnostic centre dashboard,
              appointments, equipment monitoring, finance and
              operational insights.
            </p>

            <div className="mt-12 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">

              <p className="text-sm uppercase tracking-widest text-[#D4AF37]">
                Demo Credentials
              </p>

              <div className="mt-6 space-y-3 text-lg text-white">

                <p>
                  <strong>Email:</strong> demo@kretec.health
                </p>

                <p>
                  <strong>Password:</strong> demo123
                </p>

              </div>

            </div>

          </div>

          {/* RIGHT */}

          <div className="rounded-[36px] bg-white p-10 shadow-2xl">

            <h2 className="text-3xl font-bold text-[#061F44]">
              Centre Login
            </h2>

            <p className="mt-3 text-slate-500">
              Access your Kretec CentreOS dashboard.
            </p>

            <div className="mt-10 space-y-6">

              <div>

                <label className="mb-2 block font-medium text-slate-700">
                  Email
                </label>

                <div className="flex items-center rounded-2xl border border-slate-200 px-5">

                  <Mail className="text-slate-400" size={20} />

                  <input
                    type="email"
                    placeholder="demo@kretec.health"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent px-4 py-5 outline-none"
                  />

                </div>

              </div>

              <div>

                <label className="mb-2 block font-medium text-slate-700">
                  Password
                </label>

                <div className="flex items-center rounded-2xl border border-slate-200 px-5">

                  <Lock className="text-slate-400" size={20} />

                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent px-4 py-5 outline-none"
                  />

                </div>

              </div>

              <button
                onClick={handleLogin}
                className="flex w-full items-center justify-center gap-3 rounded-2xl bg-[#D4AF37] py-5 text-lg font-semibold text-[#061F44] transition hover:scale-[1.02] hover:bg-[#C9A228]"
              >
                Login
                <ArrowRight size={20} />
              </button>

            </div>

            <div className="mt-8 flex items-center justify-between text-sm">

              <Link
                href="/"
                className="text-slate-500 hover:text-[#061F44]"
              >
                ← Back to Website
              </Link>

              <button className="text-[#061F44] hover:underline">
                Forgot Password?
              </button>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}