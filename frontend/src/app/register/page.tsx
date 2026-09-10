"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  Leaf,
  LockKeyhole,
  Mail,
  Phone,
  User,
} from "lucide-react";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const benefits = [
  "Personalized farming guidance",
  "Crop and farm management",
  "AI-powered crop assistance",
  "Market and selling intelligence",
];

export default function RegisterPage() {
  const supabase = createClient();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;

    setErrorMessage("");

    const formData = new FormData(form);

    const fullName = String(formData.get("fullName") ?? "").trim();

    const email = String(formData.get("email") ?? "")
      .trim()
      .toLowerCase();

    const mobile = String(formData.get("mobile") ?? "").trim();

    const password = String(formData.get("password") ?? "");

    const confirmPassword = String(
      formData.get("confirmPassword") ?? "",
    );

    if (!fullName) {
      setErrorMessage("Please enter your full name.");
      return;
    }

    if (password.length < 8) {
      setErrorMessage("Password must contain at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setIsLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          mobile: mobile || null,
        },
      },
    });

    setIsLoading(false);

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    if (!data.user) {
      setErrorMessage("Account could not be created. Please try again.");
      return;
    }

    form.reset();

    router.push("/login?registered=true");
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="grid min-h-screen lg:grid-cols-[0.9fr_1.1fr]">
        {/* Brand panel */}
        <section className="relative hidden overflow-hidden bg-brand-green lg:flex">
          <div className="absolute inset-0">
            <div className="absolute -left-32 top-16 h-80 w-80 rounded-full border border-white/10" />
            <div className="absolute -right-40 bottom-10 h-[28rem] w-[28rem] rounded-full border border-white/10" />
            <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-lime/20" />
          </div>

          <div className="relative z-10 flex w-full flex-col justify-between p-12 xl:p-16">
            {/* Brand */}
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

            {/* Message */}
            <div className="max-w-xl">
              <div className="mb-5 h-1 w-12 bg-brand-lime" />

              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-lime">
                Start your journey
              </p>

              <h1 className="mt-4 font-display text-5xl font-bold leading-tight tracking-tight text-white xl:text-6xl">
                Your farm,
                <span className="block text-brand-lime">
                  one step smarter.
                </span>
              </h1>

              <p className="mt-6 max-w-lg text-base leading-7 text-white/70">
                Create your SAHAYAAK account and build a digital connection
                between your farm, crops, markets and the decisions that
                matter.
              </p>

              {/* Benefits */}
              <div className="mt-9 space-y-4">
                {benefits.map((benefit) => (
                  <div
                    key={benefit}
                    className="flex items-center gap-3 text-sm text-white/80"
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-lime text-black">
                      <Check size={14} strokeWidth={2.5} />
                    </span>

                    {benefit}
                  </div>
                ))}
              </div>
            </div>

            <p className="text-xs text-white/45">
              Smart Solutions for Stronger Farmers
            </p>
          </div>
        </section>

        {/* Registration panel */}
        <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8">
          <div className="w-full max-w-md">
            {/* Mobile brand */}
            <div className="mb-9 lg:hidden">
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
                className="mb-7 inline-flex items-center gap-2 text-xs font-semibold text-foreground-muted transition hover:text-brand-green"
              >
                <ArrowLeft size={14} />
                Back to SAHAYAAK
              </Link>

              <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-green">
                Farmer registration
              </p>

              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Create your account
              </h2>

              <p className="mt-3 text-sm leading-6 text-foreground-muted">
                Set up your SAHAYAAK account to begin your digital farming
                journey.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              {/* Name */}
              <div>
                <label
                  htmlFor="full-name"
                  className="mb-2 block text-sm font-semibold"
                >
                  Full name
                </label>

                <div className="relative">
                  <User
                    size={18}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-muted"
                  />

                  <input
                    id="full-name"
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    placeholder="Enter your full name"
                    required
                    disabled={isLoading}
                    className="h-12 w-full rounded-xl border border-border bg-surface pl-11 pr-4 text-sm outline-none transition placeholder:text-foreground-muted/60 focus:border-brand-green focus:ring-2 focus:ring-brand-green/10 disabled:cursor-not-allowed disabled:opacity-60"
                  />
                </div>
              </div>

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
                    disabled={isLoading}
                    className="h-12 w-full rounded-xl border border-border bg-surface pl-11 pr-4 text-sm outline-none transition placeholder:text-foreground-muted/60 focus:border-brand-green focus:ring-2 focus:ring-brand-green/10 disabled:cursor-not-allowed disabled:opacity-60"
                  />
                </div>
              </div>

              {/* Mobile */}
              <div>
                <label
                  htmlFor="mobile"
                  className="mb-2 block text-sm font-semibold"
                >
                  Mobile number
                  <span className="ml-2 text-xs font-normal text-foreground-muted">
                    Optional
                  </span>
                </label>

                <div className="relative">
                  <Phone
                    size={18}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-muted"
                  />

                  <input
                    id="mobile"
                    name="mobile"
                    type="tel"
                    autoComplete="tel"
                    placeholder="+91 XXXXX XXXXX"
                    disabled={isLoading}
                    className="h-12 w-full rounded-xl border border-border bg-surface pl-11 pr-4 text-sm outline-none transition placeholder:text-foreground-muted/60 focus:border-brand-green focus:ring-2 focus:ring-brand-green/10 disabled:cursor-not-allowed disabled:opacity-60"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold"
                >
                  Password
                </label>

                <div className="relative">
                  <LockKeyhole
                    size={18}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-muted"
                  />

                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Create a strong password"
                    required
                    minLength={8}
                    disabled={isLoading}
                    className="h-12 w-full rounded-xl border border-border bg-surface pl-11 pr-12 text-sm outline-none transition placeholder:text-foreground-muted/60 focus:border-brand-green focus:ring-2 focus:ring-brand-green/10 disabled:cursor-not-allowed disabled:opacity-60"
                  />

                  <button
                    type="button"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    onClick={() => setShowPassword((value) => !value)}
                    disabled={isLoading}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-foreground-muted transition hover:text-brand-green disabled:cursor-not-allowed"
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>

                <p className="mt-1.5 text-[11px] text-foreground-muted">
                  Use at least 8 characters.
                </p>
              </div>

              {/* Confirm password */}
              <div>
                <label
                  htmlFor="confirm-password"
                  className="mb-2 block text-sm font-semibold"
                >
                  Confirm password
                </label>

                <div className="relative">
                  <LockKeyhole
                    size={18}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-muted"
                  />

                  <input
                    id="confirm-password"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Re-enter your password"
                    required
                    minLength={8}
                    disabled={isLoading}
                    className="h-12 w-full rounded-xl border border-border bg-surface pl-11 pr-12 text-sm outline-none transition placeholder:text-foreground-muted/60 focus:border-brand-green focus:ring-2 focus:ring-brand-green/10 disabled:cursor-not-allowed disabled:opacity-60"
                  />

                  <button
                    type="button"
                    aria-label={
                      showConfirmPassword
                        ? "Hide password"
                        : "Show password"
                    }
                    onClick={() =>
                      setShowConfirmPassword((value) => !value)
                    }
                    disabled={isLoading}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-foreground-muted transition hover:text-brand-green disabled:cursor-not-allowed"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* Terms */}
              <label className="flex cursor-pointer items-start gap-2.5 pt-1">
                <input
                  name="terms"
                  type="checkbox"
                  required
                  disabled={isLoading}
                  className="mt-0.5 h-4 w-4 shrink-0 rounded border-border accent-brand-green"
                />

                <span className="text-xs leading-5 text-foreground-muted">
                  I agree to the SAHAYAAK terms of service and understand
                  that my information will be used to provide personalized
                  agricultural services.
                </span>
              </label>

              {/* Error */}
              {errorMessage && (
                <div
                  role="alert"
                  className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-400"
                >
                  {errorMessage}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-green px-5 text-sm font-bold text-white shadow-sm transition hover:bg-brand-green-dark disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Creating account...
                  </>
                ) : (
                  <>
                    Create farmer account
                    <ArrowRight size={17} />
                  </>
                )}
              </button>
            </form>

            {/* Login */}
            <div className="mt-7 border-t border-border pt-6 text-center">
              <p className="text-sm text-foreground-muted">
                Already have a SAHAYAAK account?
              </p>

              <Link
                href="/login"
                className="mt-2 inline-flex items-center text-sm font-bold text-brand-green hover:underline"
              >
                Sign in to your account
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}