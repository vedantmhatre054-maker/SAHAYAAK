import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  IndianRupee,
  MapPin,
  Package,
  ReceiptText,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Truck,
  UserRound,
  Weight,
} from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";

const saleDetails = [
  {
    label: "Produce",
    value: "Hybrid Maize",
    icon: Package,
  },
  {
    label: "Quantity sold",
    value: "1.2 Ton",
    icon: Weight,
  },
  {
    label: "Sale price",
    value: "₹2,310 / qtl",
    icon: IndianRupee,
  },
  {
    label: "Total sale value",
    value: "₹27,720",
    icon: ReceiptText,
  },
];

export default function SalesPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <section className="relative overflow-hidden rounded-3xl bg-primary p-6 text-primary-foreground shadow-sm sm:p-8">
          <div className="relative z-10 max-w-3xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium backdrop-blur-sm">
              <ReceiptText className="h-3.5 w-3.5" />
              Sales & Transactions
            </div>

            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Your harvest has been sold.
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/75 sm:text-base">
              Track your completed sale, buyer details, delivery progress, and
              payment status in one place.
            </p>
          </div>

          <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-lime/20 blur-3xl" />
          <div className="absolute -bottom-24 right-20 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
        </section>

        {/* Sale status */}
        <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <CheckCircle2 className="h-6 w-6 text-primary" />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-xl font-semibold text-foreground">
                    Sale completed
                  </h2>

                  <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary">
                    CONFIRMED
                  </span>
                </div>

                <p className="mt-1 text-sm text-muted-foreground">
                  Sale #SAL-024 • Transaction #TXN-024
                </p>
              </div>
            </div>

            <div className="rounded-xl bg-primary/5 px-5 py-4">
              <p className="text-xs text-muted-foreground">Sale value</p>

              <p className="mt-1 flex items-center gap-1 text-2xl font-semibold text-primary">
                <IndianRupee className="h-5 w-5" />
                27,720
              </p>
            </div>
          </div>
        </section>

        {/* Sale details */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {saleDetails.map((detail) => {
            const Icon = detail.icon;

            return (
              <div
                key={detail.label}
                className="rounded-2xl border border-border bg-surface p-5 shadow-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>

                <p className="mt-4 text-xs text-muted-foreground">
                  {detail.label}
                </p>

                <p className="mt-1 text-lg font-semibold text-foreground">
                  {detail.value}
                </p>
              </div>
            );
          })}
        </section>

        {/* Main content */}
        <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
          <div className="space-y-6">
            {/* Buyer and sale information */}
            <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6">
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  Sale information
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  Details of the confirmed transaction.
                </p>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl bg-background p-4">
                  <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    <UserRound className="h-3.5 w-3.5 text-primary" />
                    Buyer
                  </div>

                  <p className="mt-3 font-semibold text-foreground">
                    Verified Buyer
                  </p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Buyer ID: BUY-018
                  </p>

                  <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary">
                    <ShieldCheck className="h-3 w-3" />
                    Verified buyer
                  </div>
                </div>

                <div className="rounded-xl bg-background p-4">
                  <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5 text-primary" />
                    Market
                  </div>

                  <p className="mt-3 font-semibold text-foreground">
                    Pune APMC Market Yard
                  </p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Gultekdi, Pune
                  </p>
                </div>

                <div className="rounded-xl bg-background p-4">
                  <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    <CalendarDays className="h-3.5 w-3.5 text-primary" />
                    Sale date
                  </div>

                  <p className="mt-3 font-semibold text-foreground">
                    18 September 2026
                  </p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Confirmed at 10:42 AM
                  </p>
                </div>

                <div className="rounded-xl bg-background p-4">
                  <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    <Package className="h-3.5 w-3.5 text-primary" />
                    Auction
                  </div>

                  <p className="mt-3 font-semibold text-foreground">
                    Auction #AUC-024
                  </p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Winning bid: ₹2,310 / quintal
                  </p>
                </div>
              </div>
            </section>

            {/* Delivery status */}
            <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6">
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  Delivery & fulfilment
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  Follow the movement of your produce after the sale.
                </p>
              </div>

              <div className="mt-6 space-y-5">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>

                    <div className="mt-2 h-10 w-px bg-primary/20" />
                  </div>

                  <div className="pb-3">
                    <p className="font-medium text-foreground">
                      Sale confirmed
                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">
                      Winning bid accepted and sale recorded.
                    </p>

                    <p className="mt-2 text-[11px] font-medium text-primary">
                      Completed • 10:42 AM
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <Truck className="h-4 w-4" />
                    </div>

                    <div className="mt-2 h-10 w-px bg-border" />
                  </div>

                  <div className="pb-3">
                    <p className="font-medium text-foreground">
                      Transport arranged
                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">
                      Produce transport scheduled for the market delivery.
                    </p>

                    <p className="mt-2 text-[11px] font-medium text-primary">
                      Confirmed • 11:15 AM
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-primary bg-background">
                    <Clock3 className="h-4 w-4 text-primary" />
                  </div>

                  <div>
                    <p className="font-medium text-foreground">
                      Payment processing
                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">
                      Payment is pending final transaction confirmation.
                    </p>

                    <p className="mt-2 text-[11px] font-medium text-muted-foreground">
                      In progress
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Transaction reference */}
            <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <ReceiptText className="h-5 w-5 text-primary" />
                </div>

                <div>
                  <h2 className="font-semibold text-foreground">
                    Transaction record
                  </h2>

                  <p className="text-sm text-muted-foreground">
                    Keep these details for your farm records.
                  </p>
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl bg-background p-4">
                  <p className="text-[11px] text-muted-foreground">
                    Transaction ID
                  </p>
                  <p className="mt-1 text-sm font-semibold text-foreground">
                    TXN-024
                  </p>
                </div>

                <div className="rounded-xl bg-background p-4">
                  <p className="text-[11px] text-muted-foreground">
                    Sale reference
                  </p>
                  <p className="mt-1 text-sm font-semibold text-foreground">
                    SAL-024
                  </p>
                </div>

                <div className="rounded-xl bg-background p-4">
                  <p className="text-[11px] text-muted-foreground">
                    Payment status
                  </p>
                  <p className="mt-1 text-sm font-semibold text-primary">
                    Processing
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* AI sale insight */}
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
                      Your sale performance
                    </h2>
                  </div>
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-start gap-3">
                  <TrendingUp className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Your produce sold above the market reference.
                    </p>

                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                      The winning bid of ₹2,310 per quintal was higher than the
                      referenced average price of ₹2,210.
                    </p>
                  </div>
                </div>

                <div className="mt-5 rounded-xl bg-background p-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs text-muted-foreground">
                      Difference
                    </span>

                    <span className="text-sm font-semibold text-primary">
                      +₹100 / qtl
                    </span>
                  </div>

                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
                    <div className="h-full w-[72%] rounded-full bg-primary" />
                  </div>

                  <p className="mt-2 text-[11px] text-muted-foreground">
                    Approximately 4.5% above the market reference.
                  </p>
                </div>
              </div>
            </section>

            {/* Payment card */}
            <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <IndianRupee className="h-5 w-5 text-primary" />
                </div>

                <div>
                  <h2 className="font-semibold text-foreground">
                    Payment summary
                  </h2>

                  <p className="text-sm text-muted-foreground">
                    Current transaction value
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-xl bg-background p-4">
                <p className="text-xs text-muted-foreground">
                  Gross sale value
                </p>

                <p className="mt-1 text-2xl font-semibold text-foreground">
                  ₹27,720
                </p>
              </div>

              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    Sale value
                  </span>
                  <span className="text-sm font-medium text-foreground">
                    ₹27,720
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    Payment status
                  </span>
                  <span className="text-sm font-medium text-primary">
                    Processing
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    Transaction
                  </span>
                  <span className="text-sm font-medium text-foreground">
                    TXN-024
                  </span>
                </div>
              </div>
            </section>

            {/* Important note */}
            <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

                <div>
                  <h2 className="font-semibold text-foreground">
                    Transaction protection
                  </h2>

                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    Sale, buyer, payment, and transaction information will be
                    secured through the connected marketplace and payment
                    workflow.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Final summary */}
        <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6">
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Sale summary
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              A quick view of the completed selling activity.
            </p>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl bg-background p-4">
              <p className="text-[11px] text-muted-foreground">Produce</p>
              <p className="mt-1 text-sm font-semibold text-foreground">
                Hybrid Maize
              </p>
            </div>

            <div className="rounded-xl bg-background p-4">
              <p className="text-[11px] text-muted-foreground">
                Quantity sold
              </p>
              <p className="mt-1 text-sm font-semibold text-foreground">
                1.2 Ton
              </p>
            </div>

            <div className="rounded-xl bg-background p-4">
              <p className="text-[11px] text-muted-foreground">
                Winning price
              </p>
              <p className="mt-1 text-sm font-semibold text-primary">
                ₹2,310 / qtl
              </p>
            </div>

            <div className="rounded-xl bg-background p-4">
              <p className="text-[11px] text-muted-foreground">
                Gross sale
              </p>
              <p className="mt-1 text-sm font-semibold text-foreground">
                ₹27,720
              </p>
            </div>
          </div>
        </section>

        {/* Next step */}
        <section className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <h2 className="font-semibold text-foreground">
              Calculate your actual profit
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Add cultivation, transport, storage, and other farm expenses to
              understand your final net profit.
            </p>
          </div>

          <Link
            href="/profit"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
          >
            Continue to Profit
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>

        {/* Disclaimer */}
        <p className="text-center text-xs leading-5 text-muted-foreground">
          Sale values, buyer details, payment status, transaction references,
          and performance insights shown here are illustrative UI data. Real
          sales, payments, buyers, and transaction records will be connected
          during the integration phase.
        </p>
      </div>
    </AppShell>
  );
}