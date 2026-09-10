"use client";

import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  CalendarDays,
  ChevronDown,
  CircleDollarSign,
  Clock3,
  MapPin,
  Package,
  Search,
  Sparkles,
  Store,
  TrendingUp,
  Truck,
} from "lucide-react";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/layout/app-shell";

const commodities = [
  {
    name: "Maize",
    price: "₹2,450",
    change: "+4.8%",
    direction: "up",
    market: "Pune APMC",
    unit: "per quintal",
  },
  {
    name: "Tomato",
    price: "₹2,850",
    change: "+7.2%",
    direction: "up",
    market: "Nashik APMC",
    unit: "per quintal",
  },
  {
    name: "Onion",
    price: "₹2,180",
    change: "-2.4%",
    direction: "down",
    market: "Lasalgaon APMC",
    unit: "per quintal",
  },
  {
    name: "Soybean",
    price: "₹4,620",
    change: "+1.9%",
    direction: "up",
    market: "Akola APMC",
    unit: "per quintal",
  },
];

const markets = [
  {
    rank: 1,
    name: "Pune APMC",
    location: "Pune, Maharashtra",
    distance: "74 km",
    price: "₹2,520",
    transport: "₹1,200",
    net: "₹49,200",
    score: "94",
    status: "Best match",
  },
  {
    rank: 2,
    name: "Ahmednagar APMC",
    location: "Ahmednagar, Maharashtra",
    distance: "92 km",
    price: "₹2,490",
    transport: "₹1,450",
    net: "₹48,350",
    score: "89",
    status: "Good option",
  },
  {
    rank: 3,
    name: "Nashik APMC",
    location: "Nashik, Maharashtra",
    distance: "138 km",
    price: "₹2,475",
    transport: "₹2,100",
    net: "₹47,400",
    score: "83",
    status: "Alternative",
  },
];

const priceHistory = [
  { day: "Mon", price: 2320 },
  { day: "Tue", price: 2380 },
  { day: "Wed", price: 2350 },
  { day: "Thu", price: 2410 },
  { day: "Fri", price: 2390 },
  { day: "Sat", price: 2450 },
  { day: "Sun", price: 2520 },
];

export default function MarketPage() {
  const [selectedCommodity, setSelectedCommodity] = useState("Maize");
  const [searchQuery, setSearchQuery] = useState("");

  const selectedData = useMemo(
    () =>
      commodities.find((commodity) => commodity.name === selectedCommodity) ??
      commodities[0],
    [selectedCommodity],
  );

  const filteredMarkets = markets.filter((market) => {
    const query = searchQuery.toLowerCase().trim();

    if (!query) {
      return true;
    }

    return (
      market.name.toLowerCase().includes(query) ||
      market.location.toLowerCase().includes(query)
    );
  });

  const maxPrice = Math.max(...priceHistory.map((item) => item.price));
  const minPrice = Math.min(...priceHistory.map((item) => item.price));

  return (
    <AppShell>
      <section className="mx-auto w-full max-w-7xl">
        {/* Header */}
        <div className="mb-7 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              <TrendingUp className="h-3.5 w-3.5" />
              MARKET INTELLIGENCE
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Market & Selling
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
              Understand current prices, compare markets, and find a smarter
              way to sell your produce.
            </p>
          </div>

          <button
            type="button"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-border bg-surface px-4 text-sm font-medium text-foreground transition hover:border-primary/40 hover:bg-surface-muted"
          >
            <CalendarDays className="h-4 w-4 text-primary" />
            Today
            <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
          </button>
        </div>

        {/* Commodity selector + overview */}
        <div className="mb-6 grid gap-4 lg:grid-cols-[1fr_280px]">
          <div className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                  CURRENT MARKET
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-lime/15 text-primary">
                    <Package className="h-5 w-5" />
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-foreground">
                      {selectedData.name}
                    </h2>

                    <p className="text-xs text-muted-foreground">
                      {selectedData.market}
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <select
                  value={selectedCommodity}
                  onChange={(event) =>
                    setSelectedCommodity(event.target.value)
                  }
                  className="h-10 appearance-none rounded-xl border border-border bg-background py-2 pl-3 pr-9 text-xs font-medium text-foreground outline-none transition focus:border-primary/50"
                >
                  {commodities.map((commodity) => (
                    <option key={commodity.name} value={commodity.name}>
                      {commodity.name}
                    </option>
                  ))}
                </select>

                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>

            <div className="mt-7 grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl bg-background p-4">
                <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                  Current price
                </p>

                <div className="mt-1 flex items-end gap-2">
                  <span className="text-2xl font-bold text-foreground">
                    {selectedData.price}
                  </span>

                  <span className="mb-1 text-[10px] text-muted-foreground">
                    {selectedData.unit}
                  </span>
                </div>
              </div>

              <div className="rounded-xl bg-background p-4">
                <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                  Today&apos;s movement
                </p>

                <div className="mt-1 flex items-center gap-2">
                  {selectedData.direction === "up" ? (
                    <ArrowUpRight className="h-5 w-5 text-primary" />
                  ) : (
                    <ArrowDownRight className="h-5 w-5 text-destructive" />
                  )}

                  <span
                    className={`text-xl font-bold ${
                      selectedData.direction === "up"
                        ? "text-primary"
                        : "text-destructive"
                    }`}
                  >
                    {selectedData.change}
                  </span>
                </div>
              </div>

              <div className="rounded-xl bg-background p-4">
                <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                  Market
                </p>

                <div className="mt-1 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />

                  <span className="text-sm font-semibold text-foreground">
                    {selectedData.market}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Market status */}
          <div className="rounded-2xl border border-primary/15 bg-primary p-5 text-white sm:p-6">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-lime">
              <Sparkles className="h-4 w-4" />
              MARKET SIGNAL
            </div>

            <h3 className="mt-4 text-xl font-bold">
              Prices are showing positive momentum.
            </h3>

            <p className="mt-2 text-xs leading-5 text-white/65">
              Current market conditions may be favorable, but compare
              realization after transport and other selling costs.
            </p>

            <div className="mt-5 flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-3">
              <span className="text-xs text-white/60">Signal strength</span>

              <span className="text-sm font-bold text-lime">Positive</span>
            </div>
          </div>
        </div>

        {/* Price chart */}
        <div className="mb-7 rounded-2xl border border-border bg-surface p-5 sm:p-6">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                PRICE TREND
              </div>

              <h2 className="mt-1 text-xl font-bold text-foreground">
                {selectedData.name} price movement
              </h2>

              <p className="mt-1 text-xs text-muted-foreground">
                Illustrative 7-day market trend for the UI prototype.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-primary">
              <BarChart3 className="h-4 w-4" />
              7 day view
            </div>
          </div>

          <div className="mt-7 overflow-x-auto">
            <div className="min-w-[620px]">
              <div className="relative h-64">
                <div className="absolute inset-0 flex flex-col justify-between">
                  {[0, 1, 2, 3, 4].map((line) => (
                    <div
                      key={line}
                      className="border-t border-border"
                    />
                  ))}
                </div>

                <div className="absolute inset-x-0 bottom-0 top-3 flex items-end justify-between gap-4 px-2">
                  {priceHistory.map((item) => {
                    const range = maxPrice - minPrice || 1;
                    const height =
                      35 + ((item.price - minPrice) / range) * 50;

                    return (
                      <div
                        key={item.day}
                        className="flex h-full flex-1 flex-col items-center justify-end gap-3"
                      >
                        <div className="relative flex h-[78%] w-full items-end justify-center">
                          <div
                            className="w-full max-w-14 rounded-t-xl bg-primary/15 transition hover:bg-primary/25"
                            style={{ height: `${height}%` }}
                          >
                            <div className="mx-auto mt-2 h-2 w-2 rounded-full bg-primary" />
                          </div>
                        </div>

                        <div className="text-center">
                          <p className="text-[10px] font-semibold text-foreground">
                            ₹{item.price}
                          </p>
                          <p className="mt-1 text-[10px] text-muted-foreground">
                            {item.day}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendation */}
        <div className="mb-7 overflow-hidden rounded-2xl border border-primary/15 bg-primary">
          <div className="grid lg:grid-cols-[1fr_370px]">
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-lime">
                <Sparkles className="h-4 w-4" />
                SAHAYAAK RECOMMENDATION
              </div>

              <h2 className="mt-3 max-w-2xl text-2xl font-bold leading-tight text-white sm:text-3xl">
                Pune APMC looks like the strongest option for your produce.
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/70">
                This recommendation considers indicative market price,
                distance, transport cost, and estimated net realization. The
                final decision should be based on current verified market
                information.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-[10px] text-white/75">
                  Price considered
                </span>

                <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-[10px] text-white/75">
                  Distance considered
                </span>

                <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-[10px] text-white/75">
                  Transport considered
                </span>
              </div>
            </div>

            <div className="p-5 sm:p-7">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-wide text-white/50">
                      BEST MARKET
                    </p>

                    <h3 className="mt-1 text-xl font-bold text-white">
                      Pune APMC
                    </h3>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-lime text-primary">
                    <Store className="h-5 w-5" />
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-white/5 p-3">
                    <p className="text-[10px] text-white/45">
                      Expected price
                    </p>
                    <p className="mt-1 text-sm font-bold text-white">
                      ₹2,520/q
                    </p>
                  </div>

                  <div className="rounded-xl bg-white/5 p-3">
                    <p className="text-[10px] text-white/45">Distance</p>
                    <p className="mt-1 text-sm font-bold text-white">74 km</p>
                  </div>

                  <div className="rounded-xl bg-white/5 p-3">
                    <p className="text-[10px] text-white/45">
                      Transport estimate
                    </p>
                    <p className="mt-1 text-sm font-bold text-white">
                      ₹1,200
                    </p>
                  </div>

                  <div className="rounded-xl bg-white/5 p-3">
                    <p className="text-[10px] text-white/45">
                      Recommendation
                    </p>
                    <p className="mt-1 text-sm font-bold text-lime">
                      94 / 100
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-lime px-4 py-3 text-xs font-bold text-primary transition hover:brightness-95"
                >
                  View market recommendation
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Market comparison */}
        <div className="mb-7">
          <div className="mb-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                COMPARE MARKETS
              </div>

              <h2 className="mt-1 text-xl font-bold text-foreground">
                Where could you sell?
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Compare expected realization instead of looking at price alone.
              </p>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <input
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search markets..."
                className="h-10 w-full rounded-xl border border-border bg-surface pl-10 pr-4 text-xs text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/10"
              />
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {filteredMarkets.map((market) => (
              <article
                key={market.name}
                className={`rounded-2xl border bg-surface p-5 transition hover:shadow-sm ${
                  market.rank === 1
                    ? "border-primary/30"
                    : "border-border"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                        market.rank === 1
                          ? "bg-lime/15 text-primary"
                          : "bg-background text-muted-foreground"
                      }`}
                    >
                      <span className="text-sm font-bold">
                        #{market.rank}
                      </span>
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground">
                          {market.name}
                        </h3>

                        {market.rank === 1 && (
                          <span className="rounded-full bg-lime/15 px-2 py-1 text-[9px] font-semibold text-primary">
                            Recommended
                          </span>
                        )}
                      </div>

                      <div className="mt-1 flex items-center gap-1 text-[10px] text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {market.location}
                      </div>
                    </div>
                  </div>

                  <span className="text-sm font-bold text-primary">
                    {market.score}
                  </span>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-background p-3">
                    <p className="text-[10px] text-muted-foreground">
                      Expected price
                    </p>
                    <p className="mt-1 text-sm font-bold text-foreground">
                      {market.price}/q
                    </p>
                  </div>

                  <div className="rounded-xl bg-background p-3">
                    <p className="text-[10px] text-muted-foreground">
                      Distance
                    </p>
                    <p className="mt-1 text-sm font-bold text-foreground">
                      {market.distance}
                    </p>
                  </div>

                  <div className="rounded-xl bg-background p-3">
                    <p className="text-[10px] text-muted-foreground">
                      Transport
                    </p>
                    <p className="mt-1 text-sm font-bold text-foreground">
                      {market.transport}
                    </p>
                  </div>

                  <div className="rounded-xl bg-background p-3">
                    <p className="text-[10px] text-muted-foreground">
                      Est. net
                    </p>
                    <p className="mt-1 text-sm font-bold text-primary">
                      {market.net}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                  <span className="text-[10px] text-muted-foreground">
                    {market.status}
                  </span>

                  <button
                    type="button"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-primary transition hover:gap-2"
                  >
                    Compare
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Selling preparation */}
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-surface p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-lime/15 text-primary">
                <Truck className="h-5 w-5" />
              </div>

              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                  BEFORE SELLING
                </div>

                <h2 className="mt-1 text-lg font-bold text-foreground">
                  Plan your movement
                </h2>
              </div>
            </div>

            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              Once you select a market, SAHAYAAK can help you plan transport,
              identify suitable facilities, and prepare the produce for
              selling.
            </p>

            <div className="mt-5 space-y-2">
              {[
                "Select the destination market",
                "Estimate transport requirement",
                "Check available mandi/godown facilities",
              ].map((item, index) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-xl bg-background p-3"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-[10px] font-bold text-primary">
                    0{index + 1}
                  </span>

                  <span className="text-xs font-medium text-foreground">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-primary/90"
            >
              Plan transport
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <CircleDollarSign className="h-5 w-5" />
              </div>

              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                  SELL YOUR PRODUCE
                </div>

                <h2 className="mt-1 text-lg font-bold text-foreground">
                  Ready to create a listing?
                </h2>
              </div>
            </div>

            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              Create a produce listing, choose how you want to sell, and
              continue into the marketplace and auction workflow.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <span className="rounded-lg bg-background px-3 py-2 text-[10px] font-medium text-muted-foreground">
                Produce listing
              </span>

              <span className="rounded-lg bg-background px-3 py-2 text-[10px] font-medium text-muted-foreground">
                Buyer discovery
              </span>

              <span className="rounded-lg bg-background px-3 py-2 text-[10px] font-medium text-muted-foreground">
                Auction
              </span>
            </div>

            <button
              type="button"
              className="mt-5 inline-flex items-center gap-2 rounded-xl border border-primary/25 bg-primary/5 px-4 py-2.5 text-xs font-semibold text-primary transition hover:bg-primary/10"
            >
              Sell produce
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Timing note */}
        <div className="mt-6 flex items-center justify-center gap-2 text-center text-[10px] text-muted-foreground">
          <Clock3 className="h-3.5 w-3.5 text-primary" />
          Market prices can change throughout the day. Always verify the
          latest price with the relevant market or official source before
          selling.
        </div>
      </section>
    </AppShell>
  );
}