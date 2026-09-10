import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock3,
  IndianRupee,
  MapPin,
  Package,
  ShieldCheck,
  Warehouse,
} from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";

const facilities = [
  {
    name: "Pune APMC Market Yard",
    type: "Mandi",
    location: "Gultekdi, Pune",
    distance: "148 km",
    availability: "Available",
    capacity: "High",
    charge: "₹180 / lot",
    slot: "8:30 AM",
    recommended: true,
  },
  {
    name: "Baramati Agricultural Market",
    type: "Mandi",
    location: "Baramati, Pune",
    distance: "32 km",
    availability: "Available",
    capacity: "Medium",
    charge: "₹150 / lot",
    slot: "10:00 AM",
    recommended: false,
  },
  {
    name: "Pune Grain Storage Centre",
    type: "Godown",
    location: "Hadapsar, Pune",
    distance: "154 km",
    availability: "Limited",
    capacity: "Medium",
    charge: "₹12 / quintal/day",
    slot: "12:30 PM",
    recommended: false,
  },
];

const slots = [
  {
    time: "8:30 AM",
    status: "Available",
  },
  {
    time: "10:00 AM",
    status: "Available",
  },
  {
    time: "12:30 PM",
    status: "Limited",
  },
  {
    time: "2:30 PM",
    status: "Available",
  },
];

export default function FacilitiesPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <section className="relative overflow-hidden rounded-3xl bg-primary p-6 text-primary-foreground shadow-sm sm:p-8">
          <div className="relative z-10 max-w-3xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium backdrop-blur-sm">
              <Warehouse className="h-3.5 w-3.5" />
              Mandi & Godown Booking
            </div>

            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Plan your arrival with confidence.
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/75 sm:text-base">
              Find suitable mandi and storage facilities, check availability,
              and reserve a convenient arrival slot for your produce.
            </p>
          </div>

          <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-lime/20 blur-3xl" />
          <div className="absolute -bottom-24 right-20 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
        </section>

        {/* Produce summary */}
        <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Produce being planned
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
                1.2 Ton • Pickup from My Farm, Baramati
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              <div className="rounded-xl bg-background px-4 py-3">
                <p className="text-[11px] text-muted-foreground">Quantity</p>
                <p className="mt-1 font-semibold text-foreground">1.2 Ton</p>
              </div>

              <div className="rounded-xl bg-background px-4 py-3">
                <p className="text-[11px] text-muted-foreground">Destination</p>
                <p className="mt-1 font-semibold text-foreground">Pune APMC</p>
              </div>

              <div className="col-span-2 rounded-xl bg-background px-4 py-3 sm:col-span-1">
                <p className="text-[11px] text-muted-foreground">Arrival</p>
                <p className="mt-1 font-semibold text-foreground">
                  18 September
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Recommended facility */}
        <section className="overflow-hidden rounded-2xl border border-primary/20 bg-primary/5 shadow-sm">
          <div className="border-b border-primary/10 p-5 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  SAHAYAAK Recommended
                </div>

                <h2 className="mt-3 text-xl font-semibold text-foreground">
                  Pune APMC Market Yard
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  Best match based on your selected market, route, produce
                  quantity, and expected arrival time.
                </p>
              </div>

              <div className="rounded-xl bg-background px-4 py-3 sm:text-right">
                <p className="text-xs text-muted-foreground">
                  Estimated facility charge
                </p>
                <p className="mt-1 flex items-center gap-1 text-xl font-semibold text-primary sm:justify-end">
                  <IndianRupee className="h-4 w-4" />
                  180 / lot
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 p-5 sm:grid-cols-4 sm:p-6">
            <div>
              <p className="text-xs text-muted-foreground">Distance</p>
              <p className="mt-1 font-medium text-foreground">148 km</p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground">Availability</p>
              <p className="mt-1 font-medium text-primary">Available</p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground">Capacity</p>
              <p className="mt-1 font-medium text-foreground">High</p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground">Suggested slot</p>
              <p className="mt-1 font-medium text-foreground">8:30 AM</p>
            </div>
          </div>
        </section>

        {/* Facility search/filter */}
        <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6">
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Find a facility
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Compare mandi and godown options around your selling route.
            </p>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-3">
            <button
              type="button"
              className="flex items-center justify-between rounded-xl border border-border bg-background px-4 py-3 text-left"
            >
              <span>
                <span className="block text-[11px] text-muted-foreground">
                  Facility type
                </span>
                <span className="mt-1 block text-sm font-medium text-foreground">
                  Mandi & Godown
                </span>
              </span>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </button>

            <button
              type="button"
              className="flex items-center justify-between rounded-xl border border-border bg-background px-4 py-3 text-left"
            >
              <span>
                <span className="block text-[11px] text-muted-foreground">
                  Location
                </span>
                <span className="mt-1 block text-sm font-medium text-foreground">
                  Pune
                </span>
              </span>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </button>

            <button
              type="button"
              className="flex items-center justify-between rounded-xl border border-border bg-background px-4 py-3 text-left"
            >
              <span>
                <span className="block text-[11px] text-muted-foreground">
                  Availability
                </span>
                <span className="mt-1 block text-sm font-medium text-foreground">
                  Available today
                </span>
              </span>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
        </section>

        {/* Facility cards */}
        <section className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Available facilities
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Compare nearby options before confirming your arrival.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {facilities.map((facility) => (
              <article
                key={facility.name}
                className={`rounded-2xl border bg-surface p-5 shadow-sm ${
                  facility.recommended
                    ? "border-primary ring-1 ring-primary/20"
                    : "border-border"
                }`}
              >
                {facility.recommended && (
                  <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary">
                    <CheckCircle2 className="h-3 w-3" />
                    Recommended
                  </div>
                )}

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <Warehouse className="h-6 w-6 text-primary" />
                </div>

                <div className="mt-4 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {facility.name}
                    </h3>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {facility.type}
                    </p>
                  </div>

                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium ${
                      facility.availability === "Available"
                        ? "bg-primary/10 text-primary"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {facility.availability}
                  </span>
                </div>

                <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 text-primary" />
                  {facility.location}
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-background p-3">
                    <p className="text-[11px] text-muted-foreground">
                      Distance
                    </p>
                    <p className="mt-1 text-sm font-medium text-foreground">
                      {facility.distance}
                    </p>
                  </div>

                  <div className="rounded-xl bg-background p-3">
                    <p className="text-[11px] text-muted-foreground">
                      Capacity
                    </p>
                    <p className="mt-1 text-sm font-medium text-foreground">
                      {facility.capacity}
                    </p>
                  </div>

                  <div className="rounded-xl bg-background p-3">
                    <p className="text-[11px] text-muted-foreground">
                      Charge
                    </p>
                    <p className="mt-1 text-sm font-medium text-foreground">
                      {facility.charge}
                    </p>
                  </div>

                  <div className="rounded-xl bg-background p-3">
                    <p className="text-[11px] text-muted-foreground">
                      Suggested slot
                    </p>
                    <p className="mt-1 text-sm font-medium text-foreground">
                      {facility.slot}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  className={`mt-5 w-full rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                    facility.recommended
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "border border-border bg-background text-foreground hover:bg-muted"
                  }`}
                >
                  Select Facility
                </button>
              </article>
            ))}
          </div>
        </section>

        {/* Slot selection */}
        <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                Choose arrival slot
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Select a convenient time for your planned produce arrival.
              </p>
            </div>

            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary">
              <CalendarDays className="h-3.5 w-3.5" />
              18 September
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {slots.map((slot, index) => (
              <button
                key={slot.time}
                type="button"
                className={`rounded-xl border p-4 text-left transition ${
                  index === 0
                    ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                    : "border-border bg-background hover:bg-muted"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <Clock3
                    className={`h-4 w-4 ${
                      index === 0
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  />

                  {index === 0 && (
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                  )}
                </div>

                <p className="mt-3 font-semibold text-foreground">
                  {slot.time}
                </p>

                <p
                  className={`mt-1 text-xs ${
                    slot.status === "Available"
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {slot.status}
                </p>
              </button>
            ))}
          </div>
        </section>

        {/* Booking summary */}
        <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <Package className="h-5 w-5 text-primary" />
            </div>

            <div>
              <h2 className="font-semibold text-foreground">
                Booking summary
              </h2>
              <p className="text-sm text-muted-foreground">
                Review your planned arrival before continuing.
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl bg-background p-4">
              <p className="text-[11px] text-muted-foreground">Facility</p>
              <p className="mt-1 text-sm font-medium text-foreground">
                Pune APMC Market Yard
              </p>
            </div>

            <div className="rounded-xl bg-background p-4">
              <p className="text-[11px] text-muted-foreground">Produce</p>
              <p className="mt-1 text-sm font-medium text-foreground">
                Maize • 1.2 Ton
              </p>
            </div>

            <div className="rounded-xl bg-background p-4">
              <p className="text-[11px] text-muted-foreground">Arrival</p>
              <p className="mt-1 text-sm font-medium text-foreground">
                18 September • 8:30 AM
              </p>
            </div>

            <div className="rounded-xl bg-background p-4">
              <p className="text-[11px] text-muted-foreground">Estimated fee</p>
              <p className="mt-1 text-sm font-medium text-foreground">
                ₹180 / lot
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <h2 className="font-semibold text-foreground">
              Ready to continue?
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Your next step is to prepare the produce listing for buyers.
            </p>
          </div>

          <Link
            href="/marketplace"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
          >
            Continue to Produce Listing
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>

        {/* Disclaimer */}
        <p className="text-center text-xs leading-5 text-muted-foreground">
          Facility availability, slot timings, storage capacity, and charges
          shown here are illustrative UI data. Real mandi and godown information
          will be connected during the integration phase.
        </p>
      </div>
    </AppShell>
  );
}