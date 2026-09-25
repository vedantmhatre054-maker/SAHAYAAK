import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  CloudSun,
  Droplets,
  Globe2,
  Leaf,
  LineChart,
  ScanLine,
  ShieldCheck,
  Sprout,
  Store,
  Tractor,
  Wheat,
} from "lucide-react";
import { LandingNav } from "@/components/auth/landing-nav";

const solutions = [
  ["Weather Intelligence", "Get location-based weather forecasts and alerts.", CloudSun],
  ["Soil & Crop Recommendation", "Know the best crops for your soil and season.", Sprout],
  ["AI Disease Detection", "Upload a photo and get possible diagnosis.", ScanLine],
  ["Smart Irrigation", "Plan irrigation based on weather and crop needs.", Droplets],
  ["Government Schemes", "Find schemes you are eligible for, in your language.", Wheat],
  ["Market Insights", "Check market prices and find better selling options.", LineChart],
];

const journey = [
  ["01", "Set up your farm", "Add your land, crops, resources and preferences.", Tractor],
  ["02", "Get guidance", "Receive crop, weather and management advice.", Sprout],
  ["03", "Explore opportunities", "Check markets, schemes and useful resources.", BarChart3],
  ["04", "Take action", "Apply, book and connect for better outcomes.", Store],
];

export function LandingPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <LandingNav />

      {/* HERO */}
      <section className="border-b border-border bg-[#f7faf4] dark:bg-[#07130d]">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 py-7 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-10 lg:py-9">
          <div className="relative z-10">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-green/15 bg-white/80 px-3 py-1.5 text-[11px] font-semibold text-brand-green shadow-sm dark:bg-white/5">
              <Leaf size={13} />
              From planting to profit
            </div>

            <h1 className="max-w-xl font-display text-4xl font-bold leading-[1.02] tracking-[-0.04em] sm:text-5xl lg:text-[52px]">
              One connected
              <span className="block text-brand-green">farming journey.</span>
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-6 text-foreground-muted sm:text-base">
              Get crop guidance, weather insights, market updates,
              government schemes and expert support — all in one place.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="/register"
                className="inline-flex items-center gap-2 rounded-lg bg-brand-green px-5 py-3 text-xs font-bold text-white shadow-sm transition hover:bg-brand-green-dark"
              >
                Start your farming journey
                <ArrowRight size={15} />
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-white px-5 py-3 text-xs font-semibold transition hover:border-brand-green hover:text-brand-green dark:bg-surface"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full border border-brand-green text-brand-green">
                  <ChevronRight size={11} />
                </span>
                Watch how it works
              </a>
            </div>

            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[10px] text-foreground-muted">
              {[
                ["Trusted information", ShieldCheck],
                ["In your language", Globe2],
                ["Government support", CheckCircle2],
                ["Better decisions", BarChart3],
              ].map(([label, Icon]) => (
                <span key={label as string} className="inline-flex items-center gap-1.5">
                  <Icon size={12} className="text-brand-green" />
                  {label as string}
                </span>
              ))}
            </div>
          </div>

          {/* Hero visual: photographic farm + manually built floating cards */}
          <div className="relative min-h-[300px] sm:min-h-[360px]">
            <div
              className="absolute inset-x-0 bottom-0 top-2 rounded-[22px] bg-cover bg-center shadow-sm"
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=85)",
              }}
            />
            <div className="absolute inset-0 rounded-[22px] bg-gradient-to-r from-brand-green/10 via-transparent to-black/5" />

            <div className="absolute left-3 top-4 rounded-xl border border-border bg-white/95 px-3.5 py-2.5 shadow-lg backdrop-blur dark:bg-[#0d1d14]/95">
              <div className="flex items-center gap-3">
                <CloudSun size={24} className="text-amber-500" />
                <div>
                  <p className="text-[9px] text-foreground-muted">Today</p>
                  <p className="font-display text-lg font-bold leading-none">28°C</p>
                  <p className="text-[9px] text-brand-green">Partly cloudy</p>
                </div>
              </div>
            </div>

            <div className="absolute right-3 top-4 w-40 rounded-xl border border-border bg-white/95 p-3 shadow-lg backdrop-blur dark:bg-[#0d1d14]/95">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-bold">Market Prices</p>
                <span className="text-[8px] text-brand-green">View all</span>
              </div>
              <div className="mt-2 space-y-1.5 text-[9px]">
                {[
                  ["Tomato", "₹2,840", "+12%"],
                  ["Onion", "₹1,920", "+5%"],
                  ["Potato", "₹1,430", "−3%"],
                ].map(([crop, price, change]) => (
                  <div key={crop} className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-brand-green" />
                      {crop}
                    </span>
                    <span className="font-semibold">{price}</span>
                    <span className={change.startsWith("+") ? "text-brand-green" : "text-red-500"}>
                      {change}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute bottom-3 left-3 w-32 rounded-xl border border-border bg-white/95 p-3 shadow-lg backdrop-blur dark:bg-[#0d1d14]/95">
              <div className="flex items-center justify-between">
                <p className="text-[9px] font-semibold">Soil Health</p>
                <Sprout size={14} className="text-brand-green" />
              </div>
              <p className="mt-2 text-[9px] text-foreground-muted">pH</p>
              <p className="text-sm font-bold">6.8</p>
              <div className="mt-1 h-1 rounded-full bg-brand-green/10">
                <div className="h-full w-4/5 rounded-full bg-brand-green" />
              </div>
            </div>

            <div className="absolute bottom-3 right-3 flex w-40 items-start gap-2.5 rounded-xl border border-border bg-white/95 p-3 shadow-lg backdrop-blur dark:bg-[#0d1d14]/95">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-green text-white">
                <span className="text-xs font-bold">AI</span>
              </div>
              <div>
                <p className="text-[10px] font-bold">AI Assistant</p>
                <p className="mt-0.5 text-[8px] leading-3 text-foreground-muted">
                  Ask anything about crops, schemes, weather and more.
                </p>
              </div>
              <ArrowRight size={12} className="ml-auto text-brand-green" />
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-b border-border bg-[#eef6eb] dark:bg-[#0b1d13]">
        <div className="mx-auto grid max-w-7xl divide-y divide-brand-green/10 px-5 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4 lg:px-10">
          {[
            ["1L+", "Farmers trust SAHAYAAK", Sprout],
            ["50+", "Government schemes", Wheat],
            ["Weather & market updates", "Across India", CloudSun],
            ["10+", "Indian languages", Globe2],
          ].map(([value, label, Icon]) => (
            <div key={value as string} className="flex items-center gap-3 px-5 py-4 lg:px-7">
              <Icon size={20} className="shrink-0 text-brand-green" />
              <div>
                <p className="text-sm font-bold">{value as string}</p>
                <p className="text-[9px] text-foreground-muted">{label as string}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SOLUTIONS */}
      <section id="solutions" className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="h-0.5 w-5 bg-brand-green" />
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand-green">
                Explore our solutions
              </p>
            </div>
            <h2 className="font-display text-2xl font-bold sm:text-3xl">
              Everything you need from growing to selling.
            </h2>
            <p className="mt-1.5 text-xs text-foreground-muted">
              Everything you need from growing to selling — in one platform.
            </p>
          </div>
          <a href="/dashboard" className="hidden items-center gap-1 text-[10px] font-bold text-foreground-muted sm:flex">
            View all features <ArrowRight size={13} />
          </a>
        </div>

        <div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-6">
          {solutions.map(([title, description, Icon]) => (
            <article
              key={title as string}
              className="rounded-xl border border-border bg-surface p-4 transition hover:-translate-y-0.5 hover:border-brand-green/30 hover:shadow-sm"
            >
              <Icon size={22} className="text-brand-green" />
              <h3 className="mt-4 text-[11px] font-bold">{title as string}</h3>
              <p className="mt-1.5 text-[9px] leading-4 text-foreground-muted">{description as string}</p>
            </article>
          ))}
        </div>
      </section>

      {/* IMPACT + HOW IT WORKS */}
      <section id="how-it-works" className="border-y border-border bg-[#edf5e9] dark:bg-[#0b1d13]">
        <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
          <div className="relative min-h-[310px] overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1000&q=85)",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="relative flex h-full flex-col justify-end p-7 text-white sm:p-9">
              <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-brand-lime">Our impact</p>
              <h2 className="mt-2 max-w-sm font-display text-2xl font-bold leading-tight">
                Helping farmers build a better tomorrow.
              </h2>
              <div className="mt-7 grid grid-cols-3 gap-5 border-t border-white/20 pt-4">
                <div><p className="text-lg font-bold">1L+</p><p className="text-[8px] text-white/70">Farmers supported</p></div>
                <div><p className="text-lg font-bold">50+</p><p className="text-[8px] text-white/70">Schemes integrated</p></div>
                <div><p className="text-lg font-bold">10+</p><p className="text-[8px] text-white/70">Languages</p></div>
              </div>
            </div>
          </div>

          <div className="p-7 sm:p-9">
            <div className="flex items-center gap-2">
              <span className="h-0.5 w-5 bg-brand-green" />
              <h2 className="font-display text-xl font-bold">How it works</h2>
            </div>
            <p className="mt-2 text-xs text-foreground-muted">A simple journey from your farm to better opportunities.</p>
            <div className="mt-6 space-y-4">
              {journey.map(([number, title, text, Icon]) => (
                <div key={number as string} className="flex gap-4 border-b border-border pb-4 last:border-0">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-green text-[9px] font-bold text-white">
                    {number as string}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-[11px] font-bold">{title as string}</h3>
                      <Icon size={16} className="text-brand-green" />
                    </div>
                    <p className="mt-1 text-[9px] leading-4 text-foreground-muted">{text as string}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="mx-auto max-w-5xl px-5 py-14 text-center sm:px-8">
        <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-brand-green text-white">
          <Sprout size={21} />
        </div>
        <h2 className="mt-4 font-display text-2xl font-bold sm:text-3xl">
          Your farm has a journey.
          <span className="block text-brand-green">Let&apos;s make every decision count.</span>
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-xs leading-5 text-foreground-muted">
          Start building your digital farm profile and bring your agricultural decisions together with SAHAYAAK.
        </p>
        <a
          href="/register"
          className="mt-5 inline-flex items-center gap-2 rounded-lg bg-brand-green px-5 py-3 text-xs font-bold text-white"
        >
          Get started
          <ArrowRight size={14} />
        </a>
      </section>

      <footer className="border-t border-border bg-surface">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-6 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-green text-white">
              <Leaf size={16} />
            </div>
            <div>
              <p className="text-xs font-bold">SAHAYAAK</p>
              <p className="text-[8px] text-foreground-muted">Smart Farming</p>
            </div>
          </div>
          <p className="text-[9px] text-foreground-muted">A digital agricultural companion from planting to profit.</p>
        </div>
      </footer>
    </main>
  );
}
