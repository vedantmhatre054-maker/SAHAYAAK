import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  IndianRupee,
  Leaf,
  Package,
  ReceiptText,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Truck,
  Wallet,
} from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";

const expenseBreakdown = [
  {
    category: "Seeds & planting material",
    amount: "₹4,500",
    percentage: 18,
    icon: Leaf,
  },
  {
    category: "Fertilizers & inputs",
    amount: "₹5,800",
    percentage: 23,
    icon: Package,
  },
  {
    category: "Labour",
    amount: "₹6,200",
    percentage: 25,
    icon: Wallet,
  },
  {
    category: "Irrigation",
    amount: "₹2,400",
    percentage: 10,
    icon: TrendingUp,
  },
  {
    category: "Transport",
    amount: "₹3,200",
    percentage: 13,
    icon: Truck,
  },
  {
    category: "Mandi & other charges",
    amount: "₹2,900",
    percentage: 11,
    icon: ReceiptText,
  },
];

export default function ProfitPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <section className="relative overflow-hidden rounded-3xl bg-primary p-6 text-primary-foreground shadow-sm sm:p-8">
          <div className="relative z-10 max-w-3xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium backdrop-blur-sm">
              <BarChart3 className="h-3.5 w-3.5" />
              Expenses & Profit
            </div>

            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Know what your harvest really earned.
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/75 sm:text-base">
              See your revenue, farm expenses, and final net profit together so
              every crop becomes a learning opportunity.
            </p>
          </div>

          <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-lime/20 blur-3xl" />
          <div className="absolute -bottom-24 right-20 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
        </section>

        {/* Crop summary */}
        <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Crop profitability
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-3">
                <h2 className="text-xl font-semibold text-foreground">
                  Hybrid Maize
                </h2>

                <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                  Harvest batch #MB-024
                </span>
              </div>

              <p className="mt-1 text-sm text-muted-foreground">
                1.2 Ton sold through Pune APMC • 2 acre crop cycle
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-xl bg-primary/5 px-4 py-3">
              <CheckCircle2 className="h-5 w-5 text-primary" />

              <div>
                <p className="text-xs text-muted-foreground">
                  Financial status
                </p>
                <p className="text-sm font-semibold text-primary">
                  Profit recorded
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Financial overview */}
        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <IndianRupee className="h-5 w-5 text-primary" />
              </div>

              <TrendingUp className="h-5 w-5 text-primary" />
            </div>

            <p className="mt-4 text-xs text-muted-foreground">
              Total sale revenue
            </p>

            <p className="mt-1 text-2xl font-semibold text-foreground">
              ₹27,720
            </p>

            <p className="mt-1 text-xs text-primary">
              Winning auction price
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <ReceiptText className="h-5 w-5 text-primary" />
              </div>

              <TrendingDown className="h-5 w-5 text-muted-foreground" />
            </div>

            <p className="mt-4 text-xs text-muted-foreground">
              Total expenses
            </p>

            <p className="mt-1 text-2xl font-semibold text-foreground">
              ₹25,000
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              Cultivation + selling costs
            </p>
          </div>

          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                <Wallet className="h-5 w-5 text-primary-foreground" />
              </div>

              <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary">
                +10.9%
              </span>
            </div>

            <p className="mt-4 text-xs text-muted-foreground">
              Net profit
            </p>

            <p className="mt-1 text-2xl font-semibold text-primary">
              ₹2,720
            </p>

            <p className="mt-1 text-xs text-primary">
              After recorded expenses
            </p>
          </div>
        </section>

        {/* Main financial grid */}
        <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
          <div className="space-y-6">
            {/* Expense breakdown */}
            <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6">
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  Expense breakdown
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  Understand where the money went during this crop cycle.
                </p>
              </div>

              <div className="mt-5 space-y-4">
                {expenseBreakdown.map((expense) => {
                  const Icon = expense.icon;

                  return (
                    <div
                      key={expense.category}
                      className="rounded-xl bg-background p-4"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                            <Icon className="h-4 w-4 text-primary" />
                          </div>

                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium text-foreground">
                              {expense.category}
                            </p>

                            <p className="mt-0.5 text-[11px] text-muted-foreground">
                              {expense.percentage}% of total expenses
                            </p>
                          </div>
                        </div>

                        <p className="shrink-0 text-sm font-semibold text-foreground">
                          {expense.amount}
                        </p>
                      </div>

                      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{ width: `${expense.percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-border pt-5">
                <span className="text-sm font-medium text-muted-foreground">
                  Total recorded expenses
                </span>

                <span className="text-lg font-semibold text-foreground">
                  ₹25,000
                </span>
              </div>
            </section>

            {/* Revenue calculation */}
            <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6">
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  Profit calculation
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  A simple view of how your final result was calculated.
                </p>
              </div>

              <div className="mt-5 space-y-3">
                <div className="flex items-center justify-between rounded-xl bg-background p-4">
                  <span className="text-sm text-muted-foreground">
                    Gross sale revenue
                  </span>
                  <span className="font-semibold text-foreground">
                    ₹27,720
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-background p-4">
                  <span className="text-sm text-muted-foreground">
                    Total crop expenses
                  </span>
                  <span className="font-semibold text-foreground">
                    − ₹25,000
                  </span>
                </div>

                <div className="border-t border-border pt-3">
                  <div className="flex items-center justify-between rounded-xl bg-primary/5 p-4">
                    <span className="text-sm font-semibold text-foreground">
                      Net profit
                    </span>

                    <span className="text-xl font-semibold text-primary">
                      ₹2,720
                    </span>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* AI insight */}
            <section className="overflow-hidden rounded-2xl border border-primary/20 bg-primary/5 shadow-sm">
              <div className="border-b border-primary/10 p-5">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
                    <Sparkles className="h-4 w-4 text-primary-foreground" />
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                      SAHAYAAK Insight
                    </p>

                    <h2 className="mt-0.5 font-semibold text-foreground">
                      Profitability insight
                    </h2>
                  </div>
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-start gap-3">
                  <TrendingUp className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Your sale price helped keep the crop profitable.
                    </p>

                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                      The winning auction price was above the market reference,
                      which improved the final crop outcome.
                    </p>
                  </div>
                </div>

                <div className="mt-5 rounded-xl bg-background p-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs text-muted-foreground">
                      Profit margin
                    </span>

                    <span className="text-sm font-semibold text-primary">
                      9.8%
                    </span>
                  </div>

                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
                    <div className="h-full w-[49%] rounded-full bg-primary" />
                  </div>

                  <p className="mt-2 text-[11px] text-muted-foreground">
                    Based on gross revenue and recorded crop expenses.
                  </p>
                </div>
              </div>
            </section>

            {/* Revenue per acre */}
            <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <BarChart3 className="h-5 w-5 text-primary" />
                </div>

                <div>
                  <h2 className="font-semibold text-foreground">
                    Per-acre performance
                  </h2>

                  <p className="text-sm text-muted-foreground">
                    Based on 2 acres
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                <div className="flex items-center justify-between rounded-xl bg-background p-3">
                  <span className="text-xs text-muted-foreground">
                    Revenue / acre
                  </span>

                  <span className="text-sm font-semibold text-foreground">
                    ₹13,860
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-background p-3">
                  <span className="text-xs text-muted-foreground">
                    Expense / acre
                  </span>

                  <span className="text-sm font-semibold text-foreground">
                    ₹12,500
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-primary/5 p-3">
                  <span className="text-xs font-medium text-foreground">
                    Profit / acre
                  </span>

                  <span className="text-sm font-semibold text-primary">
                    ₹1,360
                  </span>
                </div>
              </div>
            </section>

            {/* Cost alert */}
            <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
              <div className="flex items-start gap-3">
                <TrendingDown className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

                <div>
                  <h2 className="font-semibold text-foreground">
                    Watch your input costs
                  </h2>

                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    Fertilizers and labour together account for a significant
                    share of recorded expenses. Tracking these categories can
                    help improve margins in future crop cycles.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Financial snapshot */}
        <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6">
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Financial snapshot
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Key numbers from this crop cycle.
            </p>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl bg-background p-4">
              <p className="text-[11px] text-muted-foreground">
                Total revenue
              </p>
              <p className="mt-1 text-lg font-semibold text-foreground">
                ₹27,720
              </p>
            </div>

            <div className="rounded-xl bg-background p-4">
              <p className="text-[11px] text-muted-foreground">
                Total expenses
              </p>
              <p className="mt-1 text-lg font-semibold text-foreground">
                ₹25,000
              </p>
            </div>

            <div className="rounded-xl bg-background p-4">
              <p className="text-[11px] text-muted-foreground">Net profit</p>
              <p className="mt-1 text-lg font-semibold text-primary">
                ₹2,720
              </p>
            </div>

            <div className="rounded-xl bg-background p-4">
              <p className="text-[11px] text-muted-foreground">
                Profit margin
              </p>
              <p className="mt-1 text-lg font-semibold text-primary">9.8%</p>
            </div>
          </div>
        </section>

        {/* Next step */}
        <section className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <h2 className="font-semibold text-foreground">
              Keep this result in your farm history
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Compare this crop cycle with previous seasons and make better
              decisions for your next harvest.
            </p>
          </div>

          <Link
            href="/history"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
          >
            Continue to Farm History
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>

        {/* Disclaimer */}
        <p className="text-center text-xs leading-5 text-muted-foreground">
          Revenue, expenses, profit figures, margins, and AI insights shown
          here are illustrative UI data. Actual financial calculations will be
          connected to farm expenses, sales, transactions, and profit records
          during the integration phase.
        </p>
      </div>
    </AppShell>
  );
}