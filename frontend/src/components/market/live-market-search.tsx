"use client";

import { useState } from "react";
import { Search } from "lucide-react";

type MarketPrice = {
  id: string;
  price_date: string;
  min_price: number | null;
  max_price: number | null;
  modal_price: number | null;
  unit: string | null;
  source: string | null;
  markets: {
    name: string;
    city: string | null;
    district: string | null;
    state: string | null;
  } | null;
  commodities: {
    name: string;
    category: string | null;
  } | null;
};

export default function LiveMarketSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<MarketPrice[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    setIsLoading(true);
    setHasSearched(true);

    try {
      const response = await fetch(
        `/api/market-prices?q=${encodeURIComponent(searchQuery)}`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch market prices");
      }

      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Market search error:", error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="rounded-2xl border border-border bg-surface p-5">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-foreground">
          Search Market Prices
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Search by crop, market, city, or district.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <input
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSearch();
              }
            }}
            placeholder="Search onion, wheat, Pune..."
            className="h-11 w-full rounded-xl border border-border bg-background pl-10 pr-4 text-sm outline-none focus:border-primary"
          />
        </div>

        <button
          type="button"
          onClick={handleSearch}
          disabled={isLoading}
          className="h-11 rounded-xl bg-primary px-6 text-sm font-semibold text-white disabled:opacity-60"
        >
          {isLoading ? "Searching..." : "Search"}
        </button>
      </div>

      {hasSearched && (
        <div className="mt-5 space-y-3">
          {results.length === 0 && !isLoading ? (
            <p className="rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
              No market prices found.
            </p>
          ) : (
            results.map((item) => (
              <article
                key={item.id}
                className="rounded-xl border border-border p-4"
              >
                <div className="flex flex-col justify-between gap-2 sm:flex-row">
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {item.commodities?.name ?? "Unknown commodity"}
                    </h3>

                    <p className="text-sm text-muted-foreground">
                      {item.markets?.name ?? "Unknown market"}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      {item.markets?.city},{" "}
                      {item.markets?.state}
                    </p>
                  </div>

                  <div className="text-left sm:text-right">
                    <p className="text-lg font-bold text-primary">
                      ₹{item.modal_price ?? "N/A"}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      Modal price / {item.unit ?? "unit"}
                    </p>
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2 text-sm sm:grid-cols-3">
                  <div className="rounded-lg bg-background p-2">
                    <p className="text-xs text-muted-foreground">
                      Minimum
                    </p>
                    <p className="font-semibold">
                      ₹{item.min_price ?? "N/A"}
                    </p>
                  </div>

                  <div className="rounded-lg bg-background p-2">
                    <p className="text-xs text-muted-foreground">
                      Maximum
                    </p>
                    <p className="font-semibold">
                      ₹{item.max_price ?? "N/A"}
                    </p>
                  </div>

                  <div className="rounded-lg bg-background p-2">
                    <p className="text-xs text-muted-foreground">
                      Date
                    </p>
                    <p className="font-semibold">
                      {item.price_date}
                    </p>
                  </div>
                </div>

                <p className="mt-3 text-xs text-muted-foreground">
                  Source: {item.source ?? "Unknown"}
                </p>
              </article>
            ))
          )}
        </div>
      )}
    </section>
  );
}