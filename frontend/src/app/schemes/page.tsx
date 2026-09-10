"use client";

import {
  ArrowRight,
  Bookmark,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  CreditCard,
  FileText,
  Landmark,
  Search,
  ShieldCheck,
  Sprout,
  WalletCards,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { createClient } from "@/lib/supabase/client";

const schemeCategories = [
  "All",
  "Agriculture",
  "Loans",
  "Equipment",
  "Insurance",
];

type Scheme = {
  id: string;
  title: string;
  category: string;
  description: string;
  eligibility: string;
  support: string;
  icon: LucideIcon;
  applicationUrl: string | null;
  officialSourceUrl: string | null;
};

function getSchemeIcon(category: string): LucideIcon {
  switch (category.toLowerCase()) {
    case "loans":
      return CreditCard;
    case "insurance":
      return ShieldCheck;
    case "equipment":
      return Landmark;
    default:
      return Sprout;
  }
}

function getJsonText(value: unknown, fallback: string): string {
  if (!value) {
    return fallback;
  }

  if (typeof value === "string") {
    return value;
  }

  if (Array.isArray(value)) {
    return value.join(", ");
  }

  if (typeof value === "object") {
    return (
      Object.values(value as Record<string, unknown>)
        .filter(
          (item) => typeof item === "string" || typeof item === "number",
        )
        .join(", ") || fallback
    );
  }

  return fallback;
}

const loans = [
  {
    title: "Kisan Credit Card",
    provider: "Agricultural credit",
    description:
      "Credit support for crop cultivation, working capital, and other eligible farming requirements.",
    type: "Agriculture Loan",
    icon: CreditCard,
  },
  {
    title: "Farm Equipment Loan",
    provider: "Equipment financing",
    description:
      "Financing options for eligible agricultural machinery and equipment purchases.",
    type: "Equipment Loan",
    icon: Landmark,
  },
  {
    title: "Crop Production Loan",
    provider: "Seasonal finance",
    description:
      "Financing designed around eligible crop production and seasonal agricultural expenses.",
    type: "Crop Loan",
    icon: WalletCards,
  },
];

export default function SchemesPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [savedSchemes, setSavedSchemes] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    const loadSchemes = async () => {
      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoadError("Please sign in to view schemes.");
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("government_schemes")
        .select(
          "id, name, description, eligibility_criteria, benefits, application_url, official_source_url, scheme_category",
        )
        .eq("active", true)
        .order("name", { ascending: true });

      if (error) {
        console.error("Scheme loading error:", error.message);
        setLoadError("Unable to load schemes right now.");
        setIsLoading(false);
        return;
      }

      const mappedSchemes: Scheme[] = (data ?? []).map((scheme) => ({
        id: scheme.id,
        title: scheme.name,
        category: scheme.scheme_category || "Agriculture",
        description:
          scheme.description ||
          "Explore this government support opportunity for farmers.",
        eligibility: getJsonText(
          scheme.eligibility_criteria,
          "Check eligibility",
        ),
        support: getJsonText(scheme.benefits, "Government support"),
        icon: getSchemeIcon(scheme.scheme_category || "Agriculture"),
        applicationUrl: scheme.application_url,
        officialSourceUrl: scheme.official_source_url,
      }));

      setSchemes(mappedSchemes);

      const { data: profile, error: profileError } = await supabase
        .from("farmer_profiles")
        .select("id")
        .eq("user_id", user.id)
        .maybeSingle();

      if (profileError) {
        console.error(
          "Farmer profile loading error:",
          profileError.message,
        );
      }

      if (profile) {
        const { data: savedData, error: savedError } = await supabase
          .from("scheme_saves")
          .select("scheme_id")
          .eq("farmer_id", profile.id);

        if (savedError) {
          console.error(
            "Saved schemes loading error:",
            savedError.message,
          );
        } else {
          setSavedSchemes(
            (savedData ?? []).map((item) => item.scheme_id),
          );
        }
      }

      setIsLoading(false);
    };

    loadSchemes();
  }, []);

  const filteredSchemes = schemes.filter((scheme) => {
    const matchesCategory =
      activeCategory === "All" || scheme.category === activeCategory;

    const query = searchQuery.toLowerCase().trim();

    const matchesSearch =
      !query ||
      scheme.title.toLowerCase().includes(query) ||
      scheme.description.toLowerCase().includes(query) ||
      scheme.category.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  const toggleSaved = (id: string) => {
    setSavedSchemes((current) =>
      current.includes(id)
        ? current.filter((schemeId) => schemeId !== id)
        : [...current, id],
    );
  };

  return (
    <AppShell>
      <section className="mx-auto w-full max-w-7xl">
        {/* Header */}
        <div className="mb-7 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              FARMER SUPPORT
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Schemes & Loans
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
              Discover government schemes, financial support, loans, and
              resources that may be useful for your farm.
            </p>
          </div>

          <button
            type="button"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-border bg-surface px-4 text-sm font-medium text-foreground transition hover:border-primary/40 hover:bg-surface-muted"
          >
            <Bookmark className="h-4 w-4 text-primary" />
            Saved schemes
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
              {savedSchemes.length}
            </span>
          </button>
        </div>

        {/* Personalized recommendation banner */}
        <div className="mb-7 overflow-hidden rounded-2xl border border-primary/15 bg-primary">
          <div className="grid lg:grid-cols-[1fr_330px]">
            <div className="p-6 sm:p-8">
              <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-lime">
                <Sprout className="h-4 w-4" />
                RECOMMENDED FOR YOUR FARM
              </div>

              <h2 className="max-w-2xl text-2xl font-bold leading-tight text-white sm:text-3xl">
                Find support that fits your farming needs.
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/75">
                SAHAYAAK can use your farm profile, crops, location, and other
                relevant information to help you discover potentially useful
                schemes and financial resources.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {[
                  "Your farm",
                  "Your crops",
                  "Your location",
                  "Your preferences",
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-[10px] font-medium text-white/80"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center p-5 sm:p-7">
              <div className="w-full rounded-2xl border border-white/15 bg-white/5 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-lime text-primary">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-white">
                      Eligibility assistance
                    </p>
                    <p className="text-xs text-white/55">
                      Understand before you apply
                    </p>
                  </div>
                </div>

                <div className="mt-5 space-y-2">
                  <div className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2">
                    <span className="text-xs text-white/65">
                      Farm information
                    </span>
                    <CheckCircle2 className="h-3.5 w-3.5 text-lime" />
                  </div>

                  <div className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2">
                    <span className="text-xs text-white/65">
                      Crop information
                    </span>
                    <CheckCircle2 className="h-3.5 w-3.5 text-lime" />
                  </div>

                  <div className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2">
                    <span className="text-xs text-white/65">
                      Scheme matching
                    </span>
                    <CheckCircle2 className="h-3.5 w-3.5 text-lime" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search + filters */}
        <div className="mb-7 rounded-2xl border border-border bg-surface p-4 sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-xl">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <input
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search schemes, loans, equipment support..."
                className="h-11 w-full rounded-xl border border-border bg-background pl-10 pr-4 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/10"
              />
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1">
              {schemeCategories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`whitespace-nowrap rounded-xl px-4 py-2.5 text-xs font-medium transition ${
                    activeCategory === category
                      ? "bg-primary text-white"
                      : "border border-border bg-background text-muted-foreground hover:border-primary/30 hover:text-primary"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Schemes */}
        <div className="mb-10">
          <div className="mb-4 flex items-end justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                GOVERNMENT SCHEMES
              </div>

              <h2 className="mt-1 text-xl font-bold text-foreground">
                Schemes you can explore
              </h2>
            </div>

            <span className="text-xs text-muted-foreground">
              {filteredSchemes.length} available
            </span>
          </div>

          {isLoading ? (
            <div className="rounded-2xl border border-border bg-surface p-12 text-center">
              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-primary/20 border-t-primary" />

              <h3 className="mt-4 font-semibold text-foreground">
                Loading schemes...
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Fetching the latest available scheme information.
              </p>
            </div>
          ) : loadError ? (
            <div className="rounded-2xl border border-dashed border-border bg-surface p-12 text-center">
              <CircleHelp className="mx-auto h-8 w-8 text-muted-foreground" />

              <h3 className="mt-4 font-semibold text-foreground">
                Unable to load schemes
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                {loadError}
              </p>
            </div>
          ) : filteredSchemes.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-surface p-12 text-center">
              <Search className="mx-auto h-8 w-8 text-muted-foreground" />

              <h3 className="mt-4 font-semibold text-foreground">
                No schemes found
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Try another search term or category.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {filteredSchemes.map((scheme) => {
                const Icon = scheme.icon;
                const isSaved = savedSchemes.includes(scheme.id);

                return (
                  <article
                    key={scheme.id}
                    className="group rounded-2xl border border-border bg-surface p-5 transition hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-sm sm:p-6"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-lime/15 text-primary">
                          <Icon className="h-5 w-5" />
                        </div>

                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-semibold text-foreground">
                              {scheme.title}
                            </h3>

                            <span className="rounded-full bg-surface-muted px-2 py-1 text-[9px] font-semibold uppercase tracking-wide text-muted-foreground">
                              {scheme.category}
                            </span>
                          </div>

                          <p className="mt-2 text-xs leading-5 text-muted-foreground">
                            {scheme.description}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleSaved(scheme.id)}
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition ${
                          isSaved
                            ? "bg-lime/15 text-primary"
                            : "text-muted-foreground hover:bg-surface-muted hover:text-primary"
                        }`}
                        aria-label={
                          isSaved ? "Remove saved scheme" : "Save scheme"
                        }
                      >
                        <Bookmark
                          className="h-4 w-4"
                          fill={isSaved ? "currentColor" : "none"}
                        />
                      </button>
                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-3">
                      <div className="rounded-xl bg-background p-3">
                        <p className="text-[10px] text-muted-foreground">
                          Eligibility
                        </p>

                        <div className="mt-1 flex items-center gap-1.5">
                          <CheckCircle2 className="h-3.5 w-3.5 text-primary" />

                          <p className="text-xs font-semibold text-foreground">
                            {scheme.eligibility}
                          </p>
                        </div>
                      </div>

                      <div className="rounded-xl bg-background p-3">
                        <p className="text-[10px] text-muted-foreground">
                          Support type
                        </p>

                        <p className="mt-1 text-xs font-semibold text-foreground">
                          {scheme.support}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                      <button
                        type="button"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-primary transition hover:gap-2"
                      >
                        View details
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>

                      <span className="text-[10px] text-muted-foreground">
                        Official information
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>

        {/* Loans */}
        <div className="mb-10">
          <div className="mb-4">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              FARM FINANCE
            </div>

            <h2 className="mt-1 text-xl font-bold text-foreground">
              Explore loan options
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Compare farming-related financing options before making a
              decision.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {loans.map((loan) => {
              const Icon = loan.icon;

              return (
                <article
                  key={loan.title}
                  className="rounded-2xl border border-border bg-surface p-5 transition hover:border-primary/25 hover:shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>

                    <span className="rounded-full bg-surface-muted px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wide text-muted-foreground">
                      {loan.type}
                    </span>
                  </div>

                  <h3 className="mt-5 font-semibold text-foreground">
                    {loan.title}
                  </h3>

                  <p className="mt-1 text-[11px] font-medium text-primary">
                    {loan.provider}
                  </p>

                  <p className="mt-3 text-xs leading-5 text-muted-foreground">
                    {loan.description}
                  </p>

                  <button
                    type="button"
                    className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-primary transition hover:gap-2"
                  >
                    Compare option
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </article>
              );
            })}
          </div>
        </div>

        {/* How SAHAYAAK helps */}
        <div className="grid gap-4 lg:grid-cols-[1fr_1.2fr]">
          <div className="rounded-2xl border border-primary/15 bg-primary/5 p-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-white">
              <CircleHelp className="h-5 w-5" />
            </div>

            <h2 className="mt-5 text-xl font-bold text-foreground">
              Not sure where to start?
            </h2>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Ask SAHAYAAK AI to explain a scheme, understand eligibility
              requirements, or help you identify what information you may need
              before applying.
            </p>

            <button
              type="button"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-primary/90"
            >
              Ask SAHAYAAK AI
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime/15 text-primary">
                <FileText className="h-5 w-5" />
              </div>

              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.15em] text-primary">
                  BEFORE YOU APPLY
                </div>

                <h3 className="mt-1 font-semibold text-foreground">
                  Keep your information ready
                </h3>
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {[
                "Farmer profile",
                "Farm information",
                "Relevant documents",
              ].map((item, index) => (
                <div
                  key={item}
                  className="flex items-center gap-2 rounded-xl bg-background p-3"
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

            <div className="mt-4 flex items-center gap-2 text-[10px] text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5 text-primary" />
              SAHAYAAK will guide you to the relevant official source when
              available.
            </div>
          </div>
        </div>

        {/* Footer note */}
        <div className="mt-6 flex items-center justify-center gap-2 text-center text-[10px] text-muted-foreground">
          <Landmark className="h-3.5 w-3.5 text-primary" />
          Scheme and loan information should always be verified with the
          relevant official authority or provider before applying.
          <ChevronRight className="hidden h-3.5 w-3.5 sm:block" />
        </div>
      </section>
    </AppShell>
  );
}