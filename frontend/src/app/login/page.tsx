"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Leaf,
  LockKeyhole,
  Mail,
} from "lucide-react";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const supabase = createClient();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;

    setErrorMessage("");

    const formData = new FormData(form);

    const email = String(formData.get("email") ?? "")
      .trim()
      .toLowerCase();

    const password = String(formData.get("password") ?? "");

    if (!email) {
      setErrorMessage("Please enter your email address.");
      return;
    }

    if (!password) {
      setErrorMessage("Please enter your password.");
      return;
    }

    setIsLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setIsLoading(false);

    if (error) {
      setErrorMessage("Invalid email or password. Please try again.");
      return;
    }

    router.push("/");
    router.refresh();
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="grid min-h-screen lg:grid-cols-[0.95fr_1.05fr]">
        {/* Brand panel */}
        <section className="relative hidden overflow-hidden bg-brand-green lg:flex">
          <div className="absolute inset-0">
            <div className="absolute -left-32 top-20 h-80 w-80 rounded-full border border-white/10" />
            <div className="absolute -right-32 bottom-20 h-96 w-96 rounded-full border border-white/10" />
            <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-lime/20" />
          </div>

          <div className="relative z-10 flex w-full flex-col justify-between p-12 xl:p-16">
            <Link href="/" className="flex items-center gap-3 text-white">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
                <Leaf size={23} />
              </div>

              <div>
                <p className="font-display text-xl font-bold tracking-tight">
                  SAHAYAAK
                </p>

                <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/60">
                  Smart Farming
                </p>
              </div>
            </Link>

            <div className="max-w-xl">
              <div className="mb-5 h-1 w-12 bg-brand-lime" />

              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-lime">
                Welcome back
              </p>

              <h1 className="mt-4 font-display text-5xl font-bold leading-tight tracking-tight text-white xl:text-6xl">
                Your farm.
                <span className="block text-brand-lime">
                  Your decisions.
                </span>
              </h1>

              <p className="mt-6 max-w-lg text-base leading-7 text-white/70">
                Continue your farming journey with your crops, farm insights,
                market intelligence and AI-powered assistance in one place.
              </p>
            </div>

            <p className="text-xs text-white/45">
              Smart Solutions for Stronger Farmers
            </p>
          </div>
        </section>

        {/* Login panel */}
        <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8">
          <div className="w-full max-w-md">
            {/* Mobile brand */}
            <div className="mb-10 lg:hidden">
              <Link href="/" className="inline-flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-green text-white">
                  <Leaf size={21} />
                </div>

                <div>
                  <p className="font-display text-lg font-bold">
                    SAHAYAAK
                  </p>

                  <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-foreground-muted">
                    Smart Farming
                  </p>
                </div>
              </Link>
            </div>

            {/* Heading */}
            <div>
              <Link
                href="/"
                className="mb-8 inline-flex items-center gap-2 text-xs font-semibold text-foreground-muted transition hover:text-brand-green"
              >
                <ArrowLeft size={14} />
                Back to SAHAYAAK
              </Link>

              <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-green">
                Farmer account
              </p>

              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Sign in to SAHAYAAK
              </h2>

              <p className="mt-3 text-sm leading-6 text-foreground-muted">
                Access your farm information and continue where you left off.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-9 space-y-5">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold"
                >
                  Email address
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-muted"
                  />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    required
                    className="h-12 w-full rounded-xl border border-border bg-surface pl-11 pr-4 text-sm outline-none transition placeholder:text-foreground-muted/60 focus:border-brand-green focus:ring-2 focus:ring-brand-green/10"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold"
                  >
                    Password
                  </label>

                  <button
                    type="button"
                    className="text-xs font-semibold text-brand-green hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>

                <div className="relative">
                  <LockKeyhole
                    size={18}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-muted"
                  />

                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    required
                    className="h-12 w-full rounded-xl border border-border bg-surface pl-11 pr-12 text-sm outline-none transition placeholder:text-foreground-muted/60 focus:border-brand-green focus:ring-2 focus:ring-brand-green/10"
                  />

                  <button
                    type="button"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    onClick={() => setShowPassword((value) => !value)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-foreground-muted transition hover:text-brand-green"
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember */}
              <label className="flex cursor-pointer items-center gap-2.5 text-sm text-foreground-muted">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-border accent-brand-green"
                />
                Remember me
              </label>

              {/* Error */}
              {errorMessage && (
                <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-600 dark:text-red-400">
                  {errorMessage}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="flex h-12 w-full items-center justify-center rounded-xl bg-brand-green px-5 text-sm font-bold text-white shadow-sm transition hover:bg-brand-green-dark disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </button>
            </form>

            {/* Register */}
            <div className="mt-8 border-t border-border pt-7 text-center">
              <p className="text-sm text-foreground-muted">
                Don&apos;t have a SAHAYAAK account?
              </p>

              <Link
                href="/register"
                className="mt-2 inline-flex items-center text-sm font-bold text-brand-green hover:underline"
              >
                Create your farmer account
              </Link>
            </div>

            <p className="mt-8 text-center text-[11px] leading-5 text-foreground-muted">
              Your SAHAYAAK account securely connects to your farmer profile
              after authentication.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}