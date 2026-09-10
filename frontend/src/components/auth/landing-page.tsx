"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";

import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  CloudSun,
  Leaf,
  LineChart,
  Menu,
  Mic,
  ScanLine,
  Sprout,
  Store,
  Tractor,
  UserRound,
  X,
} from "lucide-react";

const capabilities = [
  {
    icon: Sprout,
    title: "Grow with confidence",
    description:
      "Get crop recommendations and practical guidance based on your farm conditions.",
  },
  {
    icon: ScanLine,
    title: "Understand crop problems",
    description:
      "Use your crop image to identify possible issues and understand what to do next.",
  },
  {
    icon: LineChart,
    title: "Make better market decisions",
    description:
      "Compare market conditions, prices and opportunities before selling your produce.",
  },
  {
    icon: BarChart3,
    title: "Know your farm economics",
    description:
      "Track expenses, sales and profitability across your farming journey.",
  },
];

const journey = [
  {
    number: "01",
    icon: Tractor,
    title: "Understand your farm",
    text: "Set up your farm, crops, resources and preferences.",
  },
  {
    number: "02",
    icon: Leaf,
    title: "Grow smarter",
    text: "Receive crop guidance, monitoring support and AI assistance.",
  },
  {
    number: "03",
    icon: Store,
    title: "Sell smarter",
    text: "Discover markets, compare prices and plan your sale.",
  },
];

export function LandingPage() {
  const supabase = useMemo(() => createClient(), []);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(Boolean(session?.user));
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      {/* Navigation */}
      <header className="relative z-50 border-b border-border bg-surface/95 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-green text-white">
              <Leaf size={23} strokeWidth={2.2} />
            </div>

            <div>
              <div className="font-display text-xl font-bold tracking-tight">
                SAHAYAAK
              </div>
              <div className="text-[9px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">
                Smart Farming
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            <a
              href="#solutions"
              className="text-sm font-medium text-foreground-muted transition hover:text-brand-green"
            >
              Solutions
            </a>

            <a
              href="#journey"
              className="text-sm font-medium text-foreground-muted transition hover:text-brand-green"
            >
              How it works
            </a>

            <a
              href="#assistant"
              className="text-sm font-medium text-foreground-muted transition hover:text-brand-green"
            >
              AI Assistant
            </a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-3 md:flex">
            {isLoggedIn ? (
              <Link
                href="/dashboard"
                aria-label="Open your account"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-green/10 text-brand-green transition hover:bg-brand-green hover:text-white"
              >
                <UserRound size={18} />
              </Link>
            ) : (
              <Link
                href="/login"
                className="text-sm font-semibold transition hover:text-brand-green"
              >
                Sign in
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileMenuOpen((value) => !value)}
            className="rounded-xl border border-border p-2.5 text-foreground md:hidden"
          >
            {mobileMenuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="border-t border-border bg-surface px-5 py-5 md:hidden">
            <nav className="flex flex-col gap-1">
              <a
                href="#solutions"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl px-3 py-3 text-sm font-medium text-foreground-muted hover:bg-background hover:text-foreground"
              >
                Solutions
              </a>

              <a
                href="#journey"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl px-3 py-3 text-sm font-medium text-foreground-muted hover:bg-background hover:text-foreground"
              >
                How it works
              </a>

              <a
                href="#assistant"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl px-3 py-3 text-sm font-medium text-foreground-muted hover:bg-background hover:text-foreground"
              >
                AI Assistant
              </a>

              <div className="mt-3 grid grid-cols-2 gap-3 border-t border-border pt-4">
                <a
                  href="/login"
                  className="rounded-xl border border-border px-4 py-3 text-center text-sm font-semibold"
                >
                  Sign in
                </a>

                <a
                  href="/register"
                  className="rounded-xl bg-brand-green px-4 py-3 text-center text-sm font-semibold text-white"
                >
                  Get started
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 pb-20 pt-16 sm:px-8 sm:pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:pb-28 lg:pt-24">
          {/* Hero Copy */}
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-2 text-xs font-semibold text-brand-green shadow-sm">
              <span className="h-2 w-2 rounded-full bg-brand-lime" />
              Your digital agricultural companion
            </div>

            <h1 className="max-w-3xl font-display text-5xl font-bold leading-[1.02] tracking-[-0.04em] sm:text-6xl lg:text-[72px]">
              Better decisions.
              <span className="block text-brand-green">Better farming.</span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-7 text-foreground-muted sm:text-lg sm:leading-8">
              SAHAYAAK brings your farm, crop, weather, markets and farming
              knowledge together in one intelligent agricultural companion —
              helping you move from planting to profit with confidence.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="/register"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-green px-6 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-brand-green-dark"
              >
                Start your farming journey
                <ArrowRight size={17} />
              </a>

              <a
                href="#solutions"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-surface px-6 py-3.5 text-sm font-semibold text-foreground transition hover:border-brand-green hover:text-brand-green"
              >
                Explore SAHAYAAK
                <ChevronRight size={17} />
              </a>
            </div>

            {/* Trust points */}
            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3">
              {[
                "Farm-focused guidance",
                "AI-powered assistance",
                "Market intelligence",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 text-xs font-medium text-foreground-muted"
                >
                  <CheckCircle2
                    size={15}
                    className="text-brand-green"
                  />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-[28px] border border-border bg-surface p-5 shadow-card sm:p-7">
              {/* Visual header */}
              <div className="flex items-center justify-between border-b border-border pb-5">
                <div>
                  <p className="text-xs font-medium text-foreground-muted">
                    FARM OVERVIEW
                  </p>
                  <h2 className="mt-1 font-display text-xl font-bold">
                    Your farm at a glance
                  </h2>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-green/10 text-brand-green">
                  <Sprout size={20} />
                </div>
              </div>

              {/* Farm visual */}
              <div className="relative mt-5 overflow-hidden rounded-2xl bg-background p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-foreground-muted">
                      Current crop
                    </p>
                    <p className="mt-1 text-lg font-bold">Tomato</p>
                  </div>

                  <span className="rounded-full bg-brand-lime/20 px-3 py-1.5 text-[11px] font-bold text-brand-green">
                    Growing
                  </span>
                </div>

                {/* Farm rows */}
                <div className="mt-7 space-y-3">
                  {[0, 1, 2, 3].map((row) => (
                    <div
                      key={row}
                      className="flex items-center gap-2"
                    >
                      {Array.from({ length: 9 }).map((_, index) => (
                        <span
                          key={index}
                          className="flex h-7 flex-1 items-center justify-center rounded-md bg-brand-green/10"
                        >
                          <Leaf
                            size={12}
                            className="text-brand-green"
                          />
                        </span>
                      ))}
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                  <div className="flex items-center gap-2">
                    <CloudSun
                      size={17}
                      className="text-brand-green"
                    />
                    <span className="text-xs font-medium">
                      Weather monitored
                    </span>
                  </div>

                  <span className="text-xs font-semibold text-brand-green">
                    Good conditions
                  </span>
                </div>
              </div>

              {/* Intelligence row */}
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="border border-border bg-background p-4">
                  <div className="flex items-center gap-2 text-brand-green">
                    <LineChart size={17} />
                    <span className="text-[11px] font-bold uppercase tracking-wide">
                      Market
                    </span>
                  </div>

                  <p className="mt-3 text-xl font-bold">₹ 2,840</p>
                  <p className="mt-1 text-[11px] text-foreground-muted">
                    Current indicative price
                  </p>
                </div>

                <div className="border border-border bg-background p-4">
                  <div className="flex items-center gap-2 text-brand-green">
                    <BarChart3 size={17} />
                    <span className="text-[11px] font-bold uppercase tracking-wide">
                      Farm health
                    </span>
                  </div>

                  <p className="mt-3 text-xl font-bold">Healthy</p>
                  <p className="mt-1 text-[11px] text-foreground-muted">
                    Based on available information
                  </p>
                </div>
              </div>
            </div>

            {/* Small floating AI indicator */}
            <div className="absolute -bottom-5 -left-4 hidden items-center gap-3 rounded-2xl border border-border bg-surface px-4 py-3 shadow-card sm:flex">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-lime text-black">
                <Mic size={17} />
              </div>

              <div>
                <p className="text-xs font-bold">Ask SAHAYAAK</p>
                <p className="text-[10px] text-foreground-muted">
                  Speak. Show. Understand. Act.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section
        id="solutions"
        className="border-y border-border bg-surface"
      >
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-green">
              One companion. Many decisions.
            </p>

            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Everything your farm needs to make better decisions.
            </h2>

            <p className="mt-4 text-sm leading-7 text-foreground-muted sm:text-base">
              SAHAYAAK connects the important parts of the agricultural
              journey so you spend less time searching and more time acting.
            </p>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="bg-surface p-7 transition hover:bg-background"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-green/10 text-brand-green">
                    <Icon size={21} />
                  </div>

                  <h3 className="mt-6 font-display text-lg font-bold">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-foreground-muted">
                    {item.description}
                  </p>

                  <div className="mt-6 flex items-center gap-1 text-xs font-bold text-brand-green">
                    Learn more
                    <ArrowRight size={14} />
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* AI Assistant */}
      <section
        id="assistant"
        className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28"
      >
        <div className="overflow-hidden border border-border bg-brand-green text-white">
          <div className="grid lg:grid-cols-[1fr_0.85fr]">
            <div className="p-8 sm:p-12 lg:p-14">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-lime">
                AI Crop & Farm Assistant
              </p>

              <h2 className="mt-4 max-w-xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Speak naturally. Show the problem. Get practical guidance.
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-7 text-white/75 sm:text-base">
                Ask questions in your preferred language, upload a crop or
                produce image, and let SAHAYAAK combine what you say, what it
                sees and what it knows about your farm.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {["SPEAK", "SHOW", "UNDERSTAND", "ACT"].map(
                  (step, index) => (
                    <div
                      key={step}
                      className="flex items-center gap-2 border border-white/15 bg-white/10 px-3 py-2 text-xs font-bold"
                    >
                      <span className="text-brand-lime">
                        0{index + 1}
                      </span>
                      {step}
                    </div>
                  ),
                )}
              </div>
            </div>

            <div className="border-t border-white/10 bg-black/10 p-8 lg:border-l lg:border-t-0 lg:p-12">
              <div className="border border-white/10 bg-white/5 p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-lime text-black">
                    <Mic size={19} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold">
                      Ask SAHAYAAK
                    </p>
                    <p className="text-[11px] text-white/55">
                      Voice + Image + Farm Context
                    </p>
                  </div>
                </div>

                <div className="mt-7 border-l-2 border-brand-lime pl-4">
                  <p className="text-sm leading-6 text-white/85">
                    “What is wrong with my tomato plant?”
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-lime/15 text-brand-lime">
                    <ScanLine size={17} />
                  </div>

                  <div className="h-2 flex-1 overflow-hidden bg-white/10">
                    <div className="h-full w-3/4 bg-brand-lime" />
                  </div>
                </div>

                <p className="mt-5 text-xs leading-5 text-white/55">
                  Image analysis + crop context + agricultural knowledge
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Journey */}
      <section
        id="journey"
        className="border-y border-border bg-surface"
      >
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-green">
                From planting to profit
              </p>

              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                One connected farming journey.
              </h2>

              <p className="mt-5 text-sm leading-7 text-foreground-muted sm:text-base">
                Instead of treating every farming decision as a separate
                problem, SAHAYAAK connects the journey and keeps the right
                information available when you need it.
              </p>
            </div>

            <div className="divide-y divide-border border-y border-border">
              {journey.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.number}
                    className="grid gap-5 py-7 sm:grid-cols-[70px_45px_1fr] sm:items-center"
                  >
                    <span className="font-mono text-xs font-bold text-brand-green">
                      {item.number}
                    </span>

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-background text-brand-green">
                      <Icon size={19} />
                    </div>

                    <div>
                      <h3 className="font-display text-lg font-bold">
                        {item.title}
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-foreground-muted">
                        {item.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section>
        <div className="mx-auto max-w-7xl px-5 py-20 text-center sm:px-8 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-3xl">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-green text-white">
              <Sprout size={23} />
            </div>

            <h2 className="mt-6 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Your farm has a journey.
              <span className="block text-brand-green">
                Let&apos;s make every decision count.
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-foreground-muted sm:text-base">
              Start building your digital farm profile and bring your
              agricultural decisions together with SAHAYAAK.
            </p>

            <a
              href="/register"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-brand-green px-6 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-brand-green-dark"
            >
              Create your farmer account
              <ArrowRight size={17} />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-surface">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-green text-white">
              <Leaf size={18} />
            </div>

            <div>
              <p className="font-display text-sm font-bold">SAHAYAAK</p>
              <p className="text-[10px] text-foreground-muted">
                Smart Solutions for Stronger Farmers
              </p>
            </div>
          </div>

          <p className="text-xs text-foreground-muted">
            A digital agricultural companion from planting to profit.
          </p>
        </div>
      </footer>
    </main>
  );
}