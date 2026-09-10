import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ImagePlus,
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


export default function MarketplacePage() {
  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <section className="relative overflow-hidden rounded-3xl bg-primary p-6 text-primary-foreground shadow-sm sm:p-8">
          <div className="relative z-10 max-w-3xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium backdrop-blur-sm">
              <Package className="h-3.5 w-3.5" />
              Produce Marketplace
            </div>

            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Turn your harvest into a better sale.
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/75 sm:text-base">
              Create a clear produce listing, showcase your harvest, and make
              it easier for buyers to discover your produce.
            </p>
          </div>

          <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-lime/20 blur-3xl" />
          <div className="absolute -bottom-24 right-20 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
        </section>

        {/* Produce overview */}
        <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Selected harvest
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-3">
                <h2 className="text-xl font-semibold text-foreground">
                  Maize
                </h2>

                <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                  Harvest batch #MB-024
                </span>
              </div>

              <p className="mt-1 text-sm text-muted-foreground">
                Hybrid maize • Harvested from My Farm • Baramati, Pune
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              <div className="rounded-xl bg-background px-4 py-3">
                <p className="text-[11px] text-muted-foreground">Quantity</p>
                <p className="mt-1 font-semibold text-foreground">1.2 Ton</p>
              </div>

              <div className="rounded-xl bg-background px-4 py-3">
                <p className="text-[11px] text-muted-foreground">Quality</p>
                <p className="mt-1 font-semibold text-foreground">Good</p>
              </div>

              <div className="col-span-2 rounded-xl bg-background px-4 py-3 sm:col-span-1">
                <p className="text-[11px] text-muted-foreground">
                  Selling market
                </p>
                <p className="mt-1 font-semibold text-foreground">
                  Pune APMC
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Main listing form */}
        <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
          <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6">
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                Create your listing
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Add the important details buyers need before contacting you.
              </p>
            </div>

            <div className="mt-6 space-y-5">
              {/* Produce name */}
              <div>
                <label className="text-sm font-medium text-foreground">
                  Produce
                </label>

                <div className="mt-2 flex items-center justify-between rounded-xl border border-border bg-background px-4 py-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Maize
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      Hybrid variety
                    </p>
                  </div>

                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>

              {/* Quantity + quality */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-foreground">
                    Quantity
                  </label>

                  <div className="mt-2 flex items-center justify-between rounded-xl border border-border bg-background px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Weight className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium text-foreground">
                        1.2 Ton
                      </span>
                    </div>

                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground">
                    Quality grade
                  </label>

                  <div className="mt-2 flex items-center justify-between rounded-xl border border-border bg-background px-4 py-3">
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Good
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        Clean and market-ready
                      </p>
                    </div>

                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </div>

              {/* Images */}
              <div>
                <label className="text-sm font-medium text-foreground">
                  Produce images
                </label>

                <div className="mt-2 grid gap-3 sm:grid-cols-3">
                  <div className="flex aspect-[4/3] flex-col items-center justify-center rounded-xl border border-dashed border-primary/40 bg-primary/5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                      <ImagePlus className="h-5 w-5 text-primary" />
                    </div>

                    <p className="mt-2 text-xs font-medium text-foreground">
                      Add photo
                    </p>

                    <p className="mt-1 text-[11px] text-muted-foreground">
                      JPG or PNG
                    </p>
                  </div>

                  <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl bg-muted">
                    <Package className="h-10 w-10 text-muted-foreground/40" />
                    <span className="absolute bottom-2 left-2 rounded-full bg-black/60 px-2 py-1 text-[10px] text-white">
                      Preview
                    </span>
                  </div>

                  <div className="flex aspect-[4/3] items-center justify-center rounded-xl border border-dashed border-border bg-background">
                    <span className="text-xs text-muted-foreground">
                      Optional second image
                    </span>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="text-sm font-medium text-foreground">
                  Selling location
                </label>

                <div className="mt-2 flex items-center justify-between rounded-xl border border-border bg-background px-4 py-3">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-primary" />

                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Pune APMC Market Yard
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        Gultekdi, Pune
                      </p>
                    </div>
                  </div>

                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>

              {/* Price */}
              <div>
                <label className="text-sm font-medium text-foreground">
                  Expected price
                </label>

                <div className="mt-2 flex items-center rounded-xl border border-border bg-background px-4 py-3">
                  <IndianRupee className="h-4 w-4 text-muted-foreground" />

                  <span className="ml-2 text-sm font-medium text-foreground">
                    ₹2,250 / quintal
                  </span>
                </div>

                <p className="mt-2 text-xs text-muted-foreground">
                  You can update the price before publishing your listing.
                </p>
              </div>

              {/* Validity */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-foreground">
                    Listing valid until
                  </label>

                  <div className="mt-2 flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-3">
                    <CalendarDays className="h-4 w-4 text-primary" />

                    <span className="text-sm font-medium text-foreground">
                      25 September
                    </span>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground">
                    Buyer visibility
                  </label>

                  <div className="mt-2 flex items-center justify-between rounded-xl border border-border bg-background px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-primary" />

                      <span className="text-sm font-medium text-foreground">
                        All verified buyers
                      </span>
                    </div>

                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="text-sm font-medium text-foreground">
                  Description
                </label>

                <div className="mt-2 min-h-28 rounded-xl border border-border bg-background p-4 text-sm text-muted-foreground">
                  Fresh hybrid maize harvested from my farm. Produce is clean,
                  sorted, and ready for market delivery.
                </div>
              </div>

              <button
                type="button"
                className="w-full rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
              >
                Publish Produce Listing
              </button>
            </div>
          </section>

          {/* AI pricing panel */}
          <div className="space-y-6">
            <section className="overflow-hidden rounded-2xl border border-primary/20 bg-primary/5 shadow-sm">
              <div className="border-b border-primary/10 p-5">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
                    <Sparkles className="h-4 w-4 text-primary-foreground" />
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                      AI Pricing Assistant
                    </p>
                    <h2 className="mt-0.5 font-semibold text-foreground">
                      Suggested listing price
                    </h2>
                  </div>
                </div>
              </div>

              <div className="p-5">
                <p className="text-sm leading-6 text-muted-foreground">
                  Based on the current market reference, produce quality, and
                  your selected selling market.
                </p>

                <div className="mt-5 rounded-xl bg-background p-4">
                  <p className="text-xs text-muted-foreground">
                    Recommended range
                  </p>

                  <p className="mt-1 text-2xl font-semibold text-primary">
                    ₹2,180 – ₹2,300
                  </p>

                  <p className="mt-2 flex items-center gap-1.5 text-xs text-primary">
                    <TrendingUp className="h-3.5 w-3.5" />
                    Market currently showing positive movement
                  </p>
                </div>

                <div className="mt-4 rounded-xl border border-primary/10 bg-background p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />

                    <p className="text-xs leading-5 text-muted-foreground">
                      Your current expected price of ₹2,250 falls within the
                      suggested range.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Market reference */}
            <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Market reference
                  </p>
                  <h2 className="mt-1 font-semibold text-foreground">
                    Pune APMC
                  </h2>
                </div>

                <TrendingUp className="h-5 w-5 text-primary" />
              </div>

              <div className="mt-5 space-y-3">
                <div className="flex items-center justify-between rounded-xl bg-background p-3">
                  <span className="text-xs text-muted-foreground">
                    Current average
                  </span>
                  <span className="text-sm font-semibold text-foreground">
                    ₹2,210 / qtl
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-background p-3">
                  <span className="text-xs text-muted-foreground">
                    Highest observed
                  </span>
                  <span className="text-sm font-semibold text-foreground">
                    ₹2,340 / qtl
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-background p-3">
                  <span className="text-xs text-muted-foreground">
                    Today&apos;s movement
                  </span>
                  <span className="text-sm font-semibold text-primary">
                    +2.4%
                  </span>
                </div>
              </div>
            </section>

            {/* Trust panel */}
            <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                </div>

                <div>
                  <h2 className="font-semibold text-foreground">
                    Safer marketplace
                  </h2>

                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    Listings can be shown to verified buyers. Final buyer,
                    payment, and transaction details will be handled through
                    the connected marketplace workflow.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Listing preview */}
        <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                Buyer preview
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                This is how your produce listing can appear to buyers.
              </p>
            </div>

            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Draft ready
            </span>
          </div>

          <div className="mt-5 overflow-hidden rounded-2xl border border-border bg-background">
            <div className="grid md:grid-cols-[280px_1fr]">
              <div className="flex min-h-52 items-center justify-center bg-muted">
                <Package className="h-16 w-16 text-muted-foreground/30" />
              </div>

              <div className="p-5 sm:p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary">
                    Maize
                  </span>

                  <span className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
                    Good Quality
                  </span>
                </div>

                <h3 className="mt-3 text-xl font-semibold text-foreground">
                  Fresh Hybrid Maize — 1.2 Ton
                </h3>

                <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-primary" />
                    Pune APMC
                  </span>

                  <span className="flex items-center gap-1.5">
                    <Weight className="h-4 w-4 text-primary" />
                    1.2 Ton
                  </span>

                  <span className="flex items-center gap-1.5">
                    <CalendarDays className="h-4 w-4 text-primary" />
                    Until 25 September
                  </span>
                </div>

                <div className="mt-5 flex flex-col gap-4 border-t border-border pt-5 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Expected price
                    </p>

                    <p className="mt-1 text-2xl font-semibold text-primary">
                      ₹2,250 / quintal
                    </p>
                  </div>

                  <div className="rounded-xl bg-primary px-4 py-2.5 text-center text-sm font-medium text-primary-foreground">
                    Buyer can enquire
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Next step */}
        <section className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <h2 className="font-semibold text-foreground">
              Want competitive offers?
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              After publishing, your produce can move into the auction and
              bidding workflow.
            </p>
          </div>

          <Link
            href="/auction"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
          >
            Continue to Auction
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>

        {/* Disclaimer */}
        <p className="text-center text-xs leading-5 text-muted-foreground">
          Listing details, market prices, buyer visibility, and AI price
          suggestions shown here are illustrative UI data. Real marketplace
          listings, verified buyers, pricing, and transactions will be
          connected during the integration phase.
        </p>
      </div>
    </AppShell>
  );
}