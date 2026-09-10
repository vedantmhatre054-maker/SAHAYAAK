import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  IndianRupee,
  Leaf,
  MapPin,
  Package,
  Search,
  Sparkles,
  TrendingUp,
  Wheat,
} from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";

const cropHistory = [
  {
    crop: "Hybrid Maize",
    season: "Kharif 2026",
    area: "2 acres",
    yield: "1.2 Ton",
    revenue: "₹27,720",
    expenses: "₹25,000",
    profit: "₹2,720",
    status: "Completed",
    market: "Pune APMC",
  },
  {
    crop: "Tomato",
    season: "Rabi 2025",
    area: "1.5 acres",
    yield: "8.4 Ton",
    revenue: "₹86,400",
    expenses: "₹61,200",
    profit: "₹25,200",
    status: "Completed",
    market: "Baramati APMC",
  },
  {
    crop: "Onion",
    season: "Kharif 2025",
    area: "2 acres",
    yield: "6.8 Ton",
    revenue: "₹71,400",
    expenses: "₹52,500",
    profit: "₹18,900",
    status: "Completed",
    market: "Pune APMC",
  },
];

const timeline = [
  {
    title: "Hybrid Maize",
    description: "Crop cycle completed and produce sold.",
    date: "September 2026",
    status: "Completed",
  },
  {
    title: "Tomato",
    description: "Harvested, sold, and profit recorded.",
    date: "March 2026",
    status: "Completed",
  },
  {
    title: "Onion",
    description: "Harvested and sold through the market.",
    date: "December 2025",
    status: "Completed",
  },
];

export default function HistoryPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <section className="relative overflow-hidden rounded-3xl bg-primary p-6 text-primary-foreground shadow-sm sm:p-8">
          <div className="relative z-10 max-w-3xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium backdrop-blur-sm">
              <BarChart3 className="h-3.5 w-3.5" />
              My Farm History
            </div>

            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Learn from every season.
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/75 sm:text-base">
              Review your past crops, harvests, sales, expenses, and profits to
              understand how your farm is performing over time.
            </p>
          </div>

          <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-lime/20 blur-3xl" />
          <div className="absolute -bottom-24 right-20 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
        </section>

        {/* Farm overview */}
        <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Farm overview
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-3">
                <h2 className="text-xl font-semibold text-foreground">
                  My Farm
                </h2>

                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                  <MapPin className="h-3 w-3" />
                  Baramati, Pune
                </span>
              </div>

              <p className="mt-1 text-sm text-muted-foreground">
                2 acres • Farming history from 2025 onward
              </p>
            </div>

            <button
              type="button"
              className="flex w-full items-center justify-between rounded-xl border border-border bg-background px-4 py-3 text-left sm:w-56"
            >
              <span>
                <span className="block text-[11px] text-muted-foreground">
                  View period
                </span>

                <span className="mt-1 block text-sm font-medium text-foreground">
                  All seasons
                </span>
              </span>

              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
        </section>

        {/* Performance cards */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <Wheat className="h-5 w-5 text-primary" />
            </div>

            <p className="mt-4 text-xs text-muted-foreground">
              Crop cycles
            </p>

            <p className="mt-1 text-2xl font-semibold text-foreground">3</p>

            <p className="mt-1 text-xs text-muted-foreground">
              Recorded seasons
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <Package className="h-5 w-5 text-primary" />
            </div>

            <p className="mt-4 text-xs text-muted-foreground">
              Total produce
            </p>

            <p className="mt-1 text-2xl font-semibold text-foreground">
              16.4 Ton
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              Across recorded crops
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <IndianRupee className="h-5 w-5 text-primary" />
            </div>

            <p className="mt-4 text-xs text-muted-foreground">
              Total revenue
            </p>

            <p className="mt-1 text-2xl font-semibold text-foreground">
              ₹1.85L
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              Recorded sales
            </p>
          </div>

          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <TrendingUp className="h-5 w-5 text-primary-foreground" />
            </div>

            <p className="mt-4 text-xs text-muted-foreground">
              Total net profit
            </p>

            <p className="mt-1 text-2xl font-semibold text-primary">
              ₹46,820
            </p>

            <p className="mt-1 text-xs text-primary">
              Across recorded seasons
            </p>
          </div>
        </section>

        {/* Search and filters */}
        <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                Crop history
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Review your crop cycles and financial outcomes.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 sm:w-64">
                <Search className="h-4 w-4 text-muted-foreground" />

                <span className="text-sm text-muted-foreground">
                  Search crops...
                </span>
              </div>

              <button
                type="button"
                className="flex items-center justify-between gap-4 rounded-xl border border-border bg-background px-4 py-2.5 text-left"
              >
                <span className="text-sm font-medium text-foreground">
                  All crops
                </span>

                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
          </div>
        </section>

        {/* Crop history cards */}
        <section className="space-y-4">
          {cropHistory.map((crop, index) => (
            <article
              key={`${crop.crop}-${crop.season}`}
              className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6"
            >
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <Leaf className="h-6 w-6 text-primary" />
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-semibold text-foreground">
                        {crop.crop}
                      </h3>

                      <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary">
                        {crop.status}
                      </span>
                    </div>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {crop.season} • {crop.area} • {crop.market}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <CalendarDays className="h-4 w-4 text-primary" />
                  Crop cycle {index + 1}
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                <div className="rounded-xl bg-background p-4">
                  <p className="text-[11px] text-muted-foreground">
                    Production
                  </p>

                  <p className="mt-1 text-sm font-semibold text-foreground">
                    {crop.yield}
                  </p>
                </div>

                <div className="rounded-xl bg-background p-4">
                  <p className="text-[11px] text-muted-foreground">
                    Revenue
                  </p>

                  <p className="mt-1 text-sm font-semibold text-foreground">
                    {crop.revenue}
                  </p>
                </div>

                <div className="rounded-xl bg-background p-4">
                  <p className="text-[11px] text-muted-foreground">
                    Expenses
                  </p>

                  <p className="mt-1 text-sm font-semibold text-foreground">
                    {crop.expenses}
                  </p>
                </div>

                <div className="rounded-xl bg-primary/5 p-4">
                  <p className="text-[11px] text-muted-foreground">
                    Net profit
                  </p>

                  <p className="mt-1 text-sm font-semibold text-primary">
                    {crop.profit}
                  </p>
                </div>

                <div className="flex items-center justify-center rounded-xl border border-border bg-background p-4">
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary"
                  >
                    View details
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* Timeline and AI insight */}
        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          {/* Timeline */}
          <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6">
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                Farming timeline
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                A quick look at your recent crop journey.
              </p>
            </div>

            <div className="mt-6 space-y-5">
              {timeline.map((item, index) => (
                <div key={`${item.title}-${item.date}`} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>

                    {index !== timeline.length - 1 && (
                      <div className="mt-2 h-12 w-px bg-primary/20" />
                    )}
                  </div>

                  <div className="pb-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-medium text-foreground">
                        {item.title}
                      </p>

                      <span className="text-xs text-primary">
                        {item.status}
                      </span>
                    </div>

                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                      {item.description}
                    </p>

                    <p className="mt-2 text-[11px] font-medium text-muted-foreground">
                      {item.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* AI insight */}
          <section className="overflow-hidden rounded-2xl border border-primary/20 bg-primary/5 shadow-sm">
            <div className="border-b border-primary/10 p-5 sm:p-6">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
                  <Sparkles className="h-4 w-4 text-primary-foreground" />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                    SAHAYAAK Insight
                  </p>

                  <h2 className="mt-0.5 font-semibold text-foreground">
                    Your farm is learning
                  </h2>
                </div>
              </div>
            </div>

            <div className="p-5 sm:p-6">
              <p className="text-sm leading-6 text-muted-foreground">
                Your recorded crop history can help SAHAYAAK understand
                patterns in crop performance, expenses, market outcomes, and
                profitability.
              </p>

              <div className="mt-5 space-y-3">
                <div className="rounded-xl bg-background p-4">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="mt-0.5 h-4 w-4 shrink-0 text-primary" />

                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Tomato has your highest recorded profit.
                      </p>

                      <p className="mt-1 text-xs leading-5 text-muted-foreground">
                        Your Rabi 2025 tomato crop generated approximately
                        ₹25,200 net profit.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl bg-background p-4">
                  <div className="flex items-start gap-3">
                    <BarChart3 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />

                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Keep tracking expenses by crop.
                      </p>

                      <p className="mt-1 text-xs leading-5 text-muted-foreground">
                        Consistent expense records make future crop and market
                        recommendations more useful.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl bg-background p-4">
                  <div className="flex items-start gap-3">
                    <Leaf className="mt-0.5 h-4 w-4 shrink-0 text-primary" />

                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Your farm history is becoming more valuable.
                      </p>

                      <p className="mt-1 text-xs leading-5 text-muted-foreground">
                        More seasons will allow SAHAYAAK to compare outcomes
                        and identify useful patterns.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* History summary */}
        <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6">
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Farm performance summary
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Recorded performance across your farming history.
            </p>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl bg-background p-4">
              <p className="text-[11px] text-muted-foreground">
                Average revenue / crop
              </p>

              <p className="mt-1 text-lg font-semibold text-foreground">
                ₹61,840
              </p>
            </div>

            <div className="rounded-xl bg-background p-4">
              <p className="text-[11px] text-muted-foreground">
                Average profit / crop
              </p>

              <p className="mt-1 text-lg font-semibold text-primary">
                ₹15,607
              </p>
            </div>

            <div className="rounded-xl bg-background p-4">
              <p className="text-[11px] text-muted-foreground">
                Best crop by profit
              </p>

              <p className="mt-1 text-lg font-semibold text-foreground">
                Tomato
              </p>
            </div>

            <div className="rounded-xl bg-background p-4">
              <p className="text-[11px] text-muted-foreground">
                Completed cycles
              </p>

              <p className="mt-1 text-lg font-semibold text-foreground">
                3
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <h2 className="font-semibold text-foreground">
              Start your next crop cycle
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Use your farm history together with crop and market insights to
              plan your next decision.
            </p>
          </div>

          <Link
            href="/crops"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
          >
            Explore Crops
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>

        {/* Disclaimer */}
        <p className="text-center text-xs leading-5 text-muted-foreground">
          Crop history, production, revenue, expense, profit, and AI insights
          shown here are illustrative UI data. Real farm history will be
          connected to crop cycles, harvests, sales, expenses, transactions,
          and profit records during the integration phase.
        </p>
      </div>
    </AppShell>
  );
}