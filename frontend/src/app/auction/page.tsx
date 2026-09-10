import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  Award,
  Clock3,
  Gavel,
  IndianRupee,
  MapPin,
  Package,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Weight,
} from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";

const bids = [
  {
    bidder: "Verified Buyer",
    amount: "₹2,310",
    time: "2 min ago",
    highlighted: true,
  },
  {
    bidder: "Verified Buyer",
    amount: "₹2,290",
    time: "5 min ago",
    highlighted: false,
  },
  {
    bidder: "Verified Buyer",
    amount: "₹2,270",
    time: "8 min ago",
    highlighted: false,
  },
  {
    bidder: "Verified Buyer",
    amount: "₹2,250",
    time: "12 min ago",
    highlighted: false,
  },
];

export default function AuctionPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <section className="relative overflow-hidden rounded-3xl bg-primary p-6 text-primary-foreground shadow-sm sm:p-8">
          <div className="relative z-10 max-w-3xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium backdrop-blur-sm">
              <Gavel className="h-3.5 w-3.5" />
              Auction & Bidding
            </div>

            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Let buyers compete for your harvest.
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/75 sm:text-base">
              Track live offers, understand bidding activity, and choose the
              right opportunity for your produce.
            </p>
          </div>

          <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-lime/20 blur-3xl" />
          <div className="absolute -bottom-24 right-20 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
        </section>

        {/* Auction status */}
        <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <Gavel className="h-6 w-6 text-primary" />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-xl font-semibold text-foreground">
                    Maize — Hybrid
                  </h2>

                  <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary">
                    LIVE
                  </span>
                </div>

                <p className="mt-1 text-sm text-muted-foreground">
                  Auction #AUC-024 • Harvest batch #MB-024
                </p>
              </div>
            </div>

            <div className="rounded-xl bg-primary/5 px-5 py-4 text-left lg:min-w-52 lg:text-right">
              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground lg:justify-end">
                <Clock3 className="h-3.5 w-3.5" />
                Auction ends in
              </div>

              <p className="mt-1 text-2xl font-semibold text-primary">
                01:42:18
              </p>
            </div>
          </div>
        </section>

        {/* Main auction grid */}
        <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
          <div className="space-y-6">
            {/* Produce card */}
            <section className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
              <div className="grid md:grid-cols-[280px_1fr]">
                <div className="flex min-h-64 items-center justify-center bg-muted">
                  <Package className="h-20 w-20 text-muted-foreground/30" />
                </div>

                <div className="p-5 sm:p-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary">
                      Good Quality
                    </span>

                    <span className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
                      Verified listing
                    </span>
                  </div>

                  <h2 className="mt-3 text-xl font-semibold text-foreground">
                    Fresh Hybrid Maize
                  </h2>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Clean, sorted, market-ready produce from Baramati.
                  </p>

                  <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                    <div className="rounded-xl bg-background p-3">
                      <p className="text-[11px] text-muted-foreground">
                        Quantity
                      </p>
                      <p className="mt-1 text-sm font-semibold text-foreground">
                        1.2 Ton
                      </p>
                    </div>

                    <div className="rounded-xl bg-background p-3">
                      <p className="text-[11px] text-muted-foreground">
                        Starting price
                      </p>
                      <p className="mt-1 text-sm font-semibold text-foreground">
                        ₹2,200 / qtl
                      </p>
                    </div>

                    <div className="col-span-2 rounded-xl bg-background p-3 sm:col-span-1">
                      <p className="text-[11px] text-muted-foreground">
                        Market
                      </p>
                      <p className="mt-1 text-sm font-semibold text-foreground">
                        Pune APMC
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 text-primary" />
                    Gultekdi, Pune
                  </div>
                </div>
              </div>
            </section>

            {/* Current bid */}
            <section className="rounded-2xl border border-primary/20 bg-primary/5 p-5 shadow-sm sm:p-6">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Current highest bid
                  </p>

                  <div className="mt-2 flex items-center gap-1 text-3xl font-semibold text-primary">
                    <IndianRupee className="h-6 w-6" />
                    2,310
                    <span className="ml-1 text-sm font-medium text-muted-foreground">
                      / quintal
                    </span>
                  </div>

                  <p className="mt-2 flex items-center gap-1.5 text-xs text-primary">
                    <TrendingUp className="h-3.5 w-3.5" />
                    ₹110 above starting price
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-background px-4 py-3">
                    <p className="text-[11px] text-muted-foreground">
                      Bidders
                    </p>
                    <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-foreground">
                      <Users className="h-3.5 w-3.5 text-primary" />
                      8 buyers
                    </p>
                  </div>

                  <div className="rounded-xl bg-background px-4 py-3">
                    <p className="text-[11px] text-muted-foreground">
                      Total value
                    </p>
                    <p className="mt-1 text-sm font-semibold text-foreground">
                      ₹27,720
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Bid history */}
            <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-foreground">
                    Bid activity
                  </h2>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Recent offers received for this auction.
                  </p>
                </div>

                <span className="hidden rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground sm:inline-flex">
                  8 total bidders
                </span>
              </div>

              <div className="mt-5 overflow-hidden rounded-xl border border-border">
                {bids.map((bid, index) => (
                  <div
                    key={`${bid.amount}-${bid.time}`}
                    className={`flex items-center justify-between gap-4 p-4 ${
                      index !== bids.length - 1
                        ? "border-b border-border"
                        : ""
                    } ${bid.highlighted ? "bg-primary/5" : "bg-background"}`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-full ${
                          bid.highlighted
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {bid.highlighted ? (
                          <Award className="h-4 w-4" />
                        ) : (
                          <Users className="h-4 w-4" />
                        )}
                      </div>

                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {bid.bidder}
                        </p>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {bid.time}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p
                        className={`text-sm font-semibold ${
                          bid.highlighted
                            ? "text-primary"
                            : "text-foreground"
                        }`}
                      >
                        {bid.amount} / qtl
                      </p>

                      {bid.highlighted && (
                        <p className="mt-0.5 text-[10px] font-medium text-primary">
                          Highest bid
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* Place bid */}
            <section className="rounded-2xl border border-primary/20 bg-surface p-5 shadow-sm sm:p-6">
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  Participate in auction
                </h2>

                <p className="mt-1 text-sm leading-5 text-muted-foreground">
                  Buyers can place competitive offers while the auction is
                  active.
                </p>
              </div>

              <div className="mt-5 rounded-xl border border-border bg-background p-4">
                <p className="text-xs text-muted-foreground">
                  Current highest bid
                </p>

                <p className="mt-1 text-xl font-semibold text-foreground">
                  ₹2,310 / quintal
                </p>
              </div>

              <button
                type="button"
                className="mt-4 w-full rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
              >
                Place a Bid
              </button>

              <p className="mt-3 text-center text-[11px] leading-5 text-muted-foreground">
                Real-time bidding and buyer verification will be connected
                during the integration phase.
              </p>
            </section>

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
                      Auction signal
                    </h2>
                  </div>
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-start gap-3">
                  <TrendingUp className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Bidding is moving above the expected range.
                    </p>

                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                      Current bidding is ₹2,310 per quintal compared with the
                      recommended listing range of ₹2,180–₹2,300.
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2 rounded-xl bg-background p-3">
                  <ArrowDownRight className="h-4 w-4 text-primary" />

                  <p className="text-xs text-muted-foreground">
                    Consider waiting for the next competitive bid while the
                    auction remains active.
                  </p>
                </div>
              </div>
            </section>

            {/* Auction details */}
            <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
              <h2 className="font-semibold text-foreground">
                Auction details
              </h2>

              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Weight className="h-3.5 w-3.5 text-primary" />
                    Produce quantity
                  </span>
                  <span className="text-sm font-medium text-foreground">
                    1.2 Ton
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Gavel className="h-3.5 w-3.5 text-primary" />
                    Bid increment
                  </span>
                  <span className="text-sm font-medium text-foreground">
                    ₹10 / qtl
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock3 className="h-3.5 w-3.5 text-primary" />
                    Auction duration
                  </span>
                  <span className="text-sm font-medium text-foreground">
                    2 hours
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-2 text-xs text-muted-foreground">
                    <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                    Buyer access
                  </span>
                  <span className="text-sm font-medium text-foreground">
                    Verified buyers
                  </span>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Auction summary */}
        <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6">
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Your auction summary
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Keep track of the important numbers while your produce is being
              auctioned.
            </p>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl bg-background p-4">
              <p className="text-[11px] text-muted-foreground">
                Starting price
              </p>
              <p className="mt-1 text-lg font-semibold text-foreground">
                ₹2,200
              </p>
              <p className="mt-0.5 text-[11px] text-muted-foreground">
                per quintal
              </p>
            </div>

            <div className="rounded-xl bg-background p-4">
              <p className="text-[11px] text-muted-foreground">
                Current bid
              </p>
              <p className="mt-1 text-lg font-semibold text-primary">
                ₹2,310
              </p>
              <p className="mt-0.5 text-[11px] text-muted-foreground">
                per quintal
              </p>
            </div>

            <div className="rounded-xl bg-background p-4">
              <p className="text-[11px] text-muted-foreground">
                Current estimated value
              </p>
              <p className="mt-1 text-lg font-semibold text-foreground">
                ₹27,720
              </p>
              <p className="mt-0.5 text-[11px] text-muted-foreground">
                for 1.2 Ton
              </p>
            </div>

            <div className="rounded-xl bg-background p-4">
              <p className="text-[11px] text-muted-foreground">Status</p>
              <p className="mt-1 text-lg font-semibold text-primary">Live</p>
              <p className="mt-0.5 text-[11px] text-muted-foreground">
                01:42:18 remaining
              </p>
            </div>
          </div>
        </section>

        {/* Next step */}
        <section className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <h2 className="font-semibold text-foreground">
              Auction completed?
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Once a winning bid is confirmed, continue to the sales and
              transaction workflow.
            </p>
          </div>

          <Link
            href="/sales"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
          >
            Continue to Sales
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>

        {/* Disclaimer */}
        <p className="text-center text-xs leading-5 text-muted-foreground">
          Auction status, bids, bidder counts, prices, countdowns, and buyer
          information shown here are illustrative UI data. Real-time bidding,
          verified buyers, winning bids, and transactions will be connected
          during the integration phase.
        </p>
      </div>
    </AppShell>
  );
}