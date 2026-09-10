import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock3,
  IndianRupee,
  MapPin,
  Navigation,
  Package,
  Route,
  ShieldCheck,
  Truck,
  Weight,
} from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";

const transportOptions = [
  {
    name: "Mahindra Bolero Pickup",
    type: "Pickup / Small Truck",
    capacity: "1.5 Ton",
    distance: "148 km",
    time: "3 hr 35 min",
    cost: "₹3,200",
    rating: "4.8",
    recommended: true,
  },
  {
    name: "Tata 407",
    type: "Light Commercial Vehicle",
    capacity: "2.5 Ton",
    distance: "148 km",
    time: "3 hr 25 min",
    cost: "₹4,100",
    rating: "4.6",
    recommended: false,
  },
  {
    name: "Local Transport Partner",
    type: "Mini Truck",
    capacity: "1 Ton",
    distance: "148 km",
    time: "3 hr 50 min",
    cost: "₹2,750",
    rating: "4.4",
    recommended: false,
  },
];

export default function TransportPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <section className="relative overflow-hidden rounded-3xl bg-primary p-6 text-primary-foreground shadow-sm sm:p-8">
          <div className="relative z-10 max-w-3xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium backdrop-blur-sm">
              <Truck className="h-3.5 w-3.5" />
              Smart Transport Planning
            </div>

            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Move your produce smarter.
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/75 sm:text-base">
              Compare transport options, estimate costs, and plan your journey
              to the best market for your produce.
            </p>
          </div>

          <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-lime/20 blur-3xl" />
          <div className="absolute -bottom-24 right-20 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
        </section>

        {/* Journey planner */}
        <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                Plan your journey
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Enter your produce and destination to compare available
                options.
              </p>
            </div>

            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Route optimized
            </div>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-4">
            {/* Source */}
            <div className="rounded-xl border border-border bg-background p-4">
              <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 text-primary" />
                Pickup location
              </div>

              <div className="mt-3">
                <p className="font-medium text-foreground">My Farm</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Baramati, Pune
                </p>
              </div>
            </div>

            {/* Produce */}
            <div className="rounded-xl border border-border bg-background p-4">
              <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                <Package className="h-3.5 w-3.5 text-primary" />
                Produce
              </div>

              <div className="mt-3">
                <p className="font-medium text-foreground">Maize</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  1.2 Ton • Harvest batch #MB-024
                </p>
              </div>
            </div>

            {/* Destination */}
            <div className="rounded-xl border border-border bg-background p-4">
              <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                <Navigation className="h-3.5 w-3.5 text-primary" />
                Destination
              </div>

              <div className="mt-3 flex items-center justify-between gap-3">
                <div>
                  <p className="font-medium text-foreground">Pune APMC</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Gultekdi, Pune
                  </p>
                </div>

                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            {/* Date */}
            <div className="rounded-xl border border-border bg-background p-4">
              <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                <CalendarDays className="h-3.5 w-3.5 text-primary" />
                Preferred date
              </div>

              <div className="mt-3">
                <p className="font-medium text-foreground">18 September</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Morning departure
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Route summary */}
        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <Route className="h-5 w-5 text-primary" />
              </div>

              <div>
                <p className="text-xs text-muted-foreground">Route distance</p>
                <p className="text-xl font-semibold text-foreground">
                  148 km
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <Clock3 className="h-5 w-5 text-primary" />
              </div>

              <div>
                <p className="text-xs text-muted-foreground">
                  Estimated travel time
                </p>
                <p className="text-xl font-semibold text-foreground">
                  3 hr 35 min
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <Weight className="h-5 w-5 text-primary" />
              </div>

              <div>
                <p className="text-xs text-muted-foreground">Produce load</p>
                <p className="text-xl font-semibold text-foreground">
                  1.2 Ton
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Recommendation */}
        <section className="overflow-hidden rounded-2xl border border-primary/20 bg-primary/5 shadow-sm">
          <div className="border-b border-primary/10 p-5 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  SAHAYAAK Recommended
                </div>

                <h2 className="mt-3 text-xl font-semibold text-foreground">
                  Mahindra Bolero Pickup
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  Best balance of capacity, estimated cost, and travel time
                  for your 1.2-ton maize load.
                </p>
              </div>

              <div className="text-left sm:text-right">
                <p className="text-xs text-muted-foreground">Estimated cost</p>
                <p className="mt-1 flex items-center gap-1 text-2xl font-semibold text-primary sm:justify-end">
                  <IndianRupee className="h-5 w-5" />
                  3,200
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 p-5 sm:grid-cols-4 sm:p-6">
            <div>
              <p className="text-xs text-muted-foreground">Capacity</p>
              <p className="mt-1 font-medium text-foreground">1.5 Ton</p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground">Travel time</p>
              <p className="mt-1 font-medium text-foreground">3 hr 35 min</p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground">Available</p>
              <p className="mt-1 font-medium text-foreground">8:00 AM</p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground">Estimated savings</p>
              <p className="mt-1 font-medium text-primary">₹900 vs. highest</p>
            </div>
          </div>
        </section>

        {/* Transport options */}
        <section className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Compare transport options
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Choose the option that fits your load and selling plan.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {transportOptions.map((option) => (
              <article
                key={option.name}
                className={`rounded-2xl border bg-surface p-5 shadow-sm ${
                  option.recommended
                    ? "border-primary ring-1 ring-primary/20"
                    : "border-border"
                }`}
              >
                {option.recommended && (
                  <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary">
                    <CheckCircle2 className="h-3 w-3" />
                    Best match
                  </div>
                )}

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <Truck className="h-6 w-6 text-primary" />
                </div>

                <h3 className="mt-4 font-semibold text-foreground">
                  {option.name}
                </h3>

                <p className="mt-1 text-sm text-muted-foreground">
                  {option.type}
                </p>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-background p-3">
                    <p className="text-[11px] text-muted-foreground">
                      Capacity
                    </p>
                    <p className="mt-1 text-sm font-medium text-foreground">
                      {option.capacity}
                    </p>
                  </div>

                  <div className="rounded-xl bg-background p-3">
                    <p className="text-[11px] text-muted-foreground">
                      Distance
                    </p>
                    <p className="mt-1 text-sm font-medium text-foreground">
                      {option.distance}
                    </p>
                  </div>

                  <div className="rounded-xl bg-background p-3">
                    <p className="text-[11px] text-muted-foreground">
                      Travel time
                    </p>
                    <p className="mt-1 text-sm font-medium text-foreground">
                      {option.time}
                    </p>
                  </div>

                  <div className="rounded-xl bg-background p-3">
                    <p className="text-[11px] text-muted-foreground">
                      Rating
                    </p>
                    <p className="mt-1 text-sm font-medium text-foreground">
                      {option.rating} / 5
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex items-end justify-between border-t border-border pt-4">
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Estimated fare
                    </p>
                    <p className="mt-1 text-xl font-semibold text-foreground">
                      {option.cost}
                    </p>
                  </div>

                  <button
                    type="button"
                    className={`rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                      option.recommended
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "border border-border bg-background text-foreground hover:bg-muted"
                    }`}
                  >
                    Select
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Route timeline */}
        <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <Navigation className="h-5 w-5 text-primary" />
            </div>

            <div>
              <h2 className="font-semibold text-foreground">Journey summary</h2>
              <p className="text-sm text-muted-foreground">
                Your planned route from farm to market
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-center">
            <div className="rounded-xl border border-border bg-background p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Pickup
              </p>
              <p className="mt-2 font-semibold text-foreground">My Farm</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Baramati, Pune
              </p>
            </div>

            <div className="hidden md:block">
              <ArrowRight className="h-5 w-5 text-primary" />
            </div>

            <div className="rounded-xl border border-border bg-background p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Destination
              </p>
              <p className="mt-2 font-semibold text-foreground">Pune APMC</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Gultekdi, Pune
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <h2 className="font-semibold text-foreground">
              Transport plan ready
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Continue to check mandi and godown availability for your planned
              arrival.
            </p>
          </div>

          <Link
            href="/facilities"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
          >
            Continue to Booking
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>

        {/* Disclaimer */}
        <p className="text-center text-xs leading-5 text-muted-foreground">
          Transport costs, routes, availability, and travel times shown here
          are illustrative UI data. Real transport providers and route
          estimates will be connected during the integration phase.
        </p>
      </div>
    </AppShell>
  );
}