"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Leaf,
  MapPin,
  Plus,
  Sprout,
  Tractor,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type Crop = {
  id: string;
  name: string;
  scientific_name: string | null;
  category: string | null;
  season: string | null;
  description: string | null;
};

type CropCycle = {
  id: string;
  variety: string | null;
  season: string | null;
  sowing_date: string | null;
  expected_harvest_date: string | null;
  area_used: number | null;
  area_unit: string | null;
  status: string | null;
  crop: {
    name: string;
  } | null;
};

export default function CropsPage() {
  const supabase = createClient();
  const router = useRouter();

  const [farmId, setFarmId] = useState("");

  const [crops, setCrops] = useState<Crop[]>([]);
  const [cropCycles, setCropCycles] = useState<CropCycle[]>([]);

  const [showAddCrop, setShowAddCrop] = useState(false);

  const [cropId, setCropId] = useState("");
  const [variety, setVariety] = useState("");
  const [season, setSeason] = useState("");
  const [sowingDate, setSowingDate] = useState("");
  const [expectedHarvestDate, setExpectedHarvestDate] = useState("");
  const [areaUsed, setAreaUsed] = useState("");
  const [areaUnit, setAreaUnit] = useState("acre");

  const [farmName, setFarmName] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const loadData = async () => {
    setIsLoading(true);
    setErrorMessage("");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.replace("/login");
      return;
    }

    const { data: profile, error: profileError } = await supabase
      .from("farmer_profiles")
      .select("id")
      .eq("user_id", user.id)
      .maybeSingle();

    if (profileError || !profile) {
      router.replace("/profile");
      return;
    }


    const { data: farm, error: farmError } = await supabase
      .from("farms")
      .select("id, farm_name")
      .eq("farmer_id", profile.id)
      .order("created_at", { ascending: true })
      .limit(1)
      .maybeSingle();

    if (farmError) {
      setErrorMessage(farmError.message);
      setIsLoading(false);
      return;
    }

    if (!farm) {
      router.replace("/farm");
      return;
    }

    setFarmId(farm.id);
    setFarmName(farm.farm_name);

    const { data: cropData, error: cropError } = await supabase
      .from("crops")
      .select(
        "id, name, scientific_name, category, season, description",
      )
      .order("name", { ascending: true });

    if (cropError) {
      setErrorMessage(cropError.message);
      setIsLoading(false);
      return;
    }

    setCrops(cropData ?? []);

    const { data: cycleData, error: cycleError } = await supabase
      .from("crop_cycles")
      .select(
        `
        id,
        variety,
        season,
        sowing_date,
        expected_harvest_date,
        area_used,
        area_unit,
        status,
        crop:crops(name)
        `,
      )
      .eq("farm_id", farm.id)
      .order("created_at", { ascending: false });

    if (cycleError) {
      setErrorMessage(cycleError.message);
      setIsLoading(false);
      return;
    }

    setCropCycles((cycleData ?? []) as unknown as CropCycle[]);
    setIsLoading(false);
  };

  useEffect(() => {
  // This effect intentionally loads external Supabase data
  // and updates the page state after the data is received.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  loadData();
  // loadData is intentionally executed once when the page mounts.
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  const handleAddCrop = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setErrorMessage("");

    if (!cropId) {
      setErrorMessage("Please select a crop.");
      return;
    }

    if (!areaUsed || Number(areaUsed) <= 0) {
      setErrorMessage("Please enter a valid crop area.");
      return;
    }

    setIsSaving(true);

    const { error } = await supabase.from("crop_cycles").insert({
      farm_id: farmId,
      crop_id: cropId,
      variety: variety.trim() || null,
      season: season.trim() || null,
      sowing_date: sowingDate || null,
      expected_harvest_date: expectedHarvestDate || null,
      area_used: Number(areaUsed),
      area_unit: areaUnit,
      status: "planned",
    });

    setIsSaving(false);

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    setCropId("");
    setVariety("");
    setSeason("");
    setSowingDate("");
    setExpectedHarvestDate("");
    setAreaUsed("");
    setAreaUnit("acre");
    setShowAddCrop(false);

    await loadData();
  };

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background text-foreground">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-green text-white">
            <Sprout size={24} />
          </div>

          <p className="mt-4 text-sm font-semibold text-foreground-muted">
            Loading your crops...
          </p>
        </div>
      </main>
    );
  }

  const activeCrops = cropCycles.filter(
    (crop) => crop.status === "active",
  );

  const plannedCrops = cropCycles.filter(
    (crop) => crop.status === "planned",
  );

  const harvestedCrops = cropCycles.filter(
    (crop) => crop.status === "harvested",
  );

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-surface/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link
            href="/dashboard"
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-green text-white">
              <Leaf size={21} />
            </div>

            <div>
              <p className="font-display text-lg font-bold tracking-tight">
                SAHAYAAK
              </p>

              <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-foreground-muted">
                Smart Farming
              </p>
            </div>
          </Link>

          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-semibold transition hover:border-brand-green/40 hover:text-brand-green"
          >
            <ArrowLeft size={16} />
            Dashboard
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
        {/* Heading */}
        <section className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-green">
              Crop management
            </p>

            <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Your crops
            </h1>

            <div className="mt-3 flex items-center gap-2 text-sm text-foreground-muted">
              <MapPin size={15} />
              {farmName}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowAddCrop(true)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-green px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-brand-green-dark"
          >
            <Plus size={18} />
            Add crop
          </button>
        </section>

        {/* Stats */}
        <section className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-border bg-surface p-5">
            <p className="text-sm text-foreground-muted">
              Active crops
            </p>

            <p className="mt-2 text-3xl font-bold">
              {activeCrops.length}
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-5">
            <p className="text-sm text-foreground-muted">
              Planned crops
            </p>

            <p className="mt-2 text-3xl font-bold">
              {plannedCrops.length}
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-5">
            <p className="text-sm text-foreground-muted">
              Harvested
            </p>

            <p className="mt-2 text-3xl font-bold">
              {harvestedCrops.length}
            </p>
          </div>
        </section>

        {/* Error */}
        {errorMessage && (
          <div className="mt-6 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-600 dark:text-red-400">
            {errorMessage}
          </div>
        )}

        {/* Crop list */}
        <section className="mt-8">
          <div className="mb-4">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-green">
              Crop cycles
            </p>

            <h2 className="mt-1 font-display text-2xl font-bold">
              Your farming activity
            </h2>
          </div>

          {cropCycles.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-border bg-surface p-10 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-green/10 text-brand-green">
                <Sprout size={27} />
              </div>

              <h3 className="mt-5 text-lg font-bold">
                No crops added yet
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-foreground-muted">
                Add your first crop to start tracking its lifecycle,
                activities and future recommendations.
              </p>

              <button
                type="button"
                onClick={() => setShowAddCrop(true)}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-green px-5 py-3 text-sm font-bold text-white"
              >
                <Plus size={17} />
                Add your first crop
              </button>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {cropCycles.map((cycle) => (
                <Link
                key={cycle.id}
                href={`/crops/${cycle.id}`}
                className="block rounded-2xl border border-border bg-surface p-5 transition hover:-translate-y-0.5 hover:border-brand-green/40 hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-lime/15 text-brand-green">
                      <Sprout size={21} />
                    </div>

                    <span className="rounded-full bg-brand-green/10 px-3 py-1 text-[11px] font-bold capitalize text-brand-green">
                      {cycle.status ?? "planned"}
                    </span>
                  </div>

                  <h3 className="mt-5 text-xl font-bold">
                    {cycle.crop?.name ?? "Crop"}
                  </h3>

                  {cycle.variety && (
                    <p className="mt-1 text-sm text-foreground-muted">
                      Variety: {cycle.variety}
                    </p>
                  )}

                  <div className="mt-5 space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <CalendarDays
                        size={16}
                        className="text-foreground-muted"
                      />

                      <span>
                        Sowing:{" "}
                        <strong>
                          {cycle.sowing_date ?? "Not added"}
                        </strong>
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-sm">
                      <Tractor
                        size={16}
                        className="text-foreground-muted"
                      />

                      <span>
                        Area:{" "}
                        <strong>
                          {cycle.area_used
                            ? `${cycle.area_used} ${
                                cycle.area_unit ?? "acre"
                              }`
                            : "Not added"}
                        </strong>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Add crop form */}
        {showAddCrop && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-5">
            <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-border bg-surface p-6 shadow-2xl sm:p-8">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-green">
                    New crop cycle
                  </p>

                  <h2 className="mt-2 font-display text-2xl font-bold">
                    Add a crop
                  </h2>

                  <p className="mt-2 text-sm text-foreground-muted">
                    Add the crop you are planning or currently growing on{" "}
                    {farmName}.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowAddCrop(false)}
                  className="rounded-xl px-3 py-2 text-sm font-semibold text-foreground-muted hover:bg-background"
                >
                  Close
                </button>
              </div>

              <form
                onSubmit={handleAddCrop}
                className="mt-7 space-y-5"
              >
                <div>
                  <label
                    htmlFor="crop"
                    className="mb-2 block text-sm font-semibold"
                  >
                    Crop
                  </label>

                  <select
                    id="crop"
                    value={cropId}
                    onChange={(event) =>
                      setCropId(event.target.value)
                    }
                    required
                    className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/10"
                  >
                    <option value="">Select a crop</option>

                    {crops.map((crop) => (
                      <option key={crop.id} value={crop.id}>
                        {crop.name}
                        {crop.category ? ` — ${crop.category}` : ""}
                      </option>
                    ))}
                  </select>

                  {crops.length === 0 && (
                    <p className="mt-2 text-xs text-foreground-muted">
                      No crops are currently available in the crop
                      catalogue.
                    </p>
                  )}
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="variety"
                      className="mb-2 block text-sm font-semibold"
                    >
                      Variety
                    </label>

                    <input
                      id="variety"
                      value={variety}
                      onChange={(event) =>
                        setVariety(event.target.value)
                      }
                      placeholder="e.g. Hybrid / local variety"
                      className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition placeholder:text-foreground-muted/60 focus:border-brand-green focus:ring-2 focus:ring-brand-green/10"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="season"
                      className="mb-2 block text-sm font-semibold"
                    >
                      Season
                    </label>

                    <input
                      id="season"
                      value={season}
                      onChange={(event) =>
                        setSeason(event.target.value)
                      }
                      placeholder="e.g. Kharif"
                      className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition placeholder:text-foreground-muted/60 focus:border-brand-green focus:ring-2 focus:ring-brand-green/10"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="sowingDate"
                      className="mb-2 block text-sm font-semibold"
                    >
                      Sowing date
                    </label>

                    <input
                      id="sowingDate"
                      type="date"
                      value={sowingDate}
                      onChange={(event) =>
                        setSowingDate(event.target.value)
                      }
                      className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/10"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="expectedHarvestDate"
                      className="mb-2 block text-sm font-semibold"
                    >
                      Expected harvest date
                    </label>

                    <input
                      id="expectedHarvestDate"
                      type="date"
                      value={expectedHarvestDate}
                      onChange={(event) =>
                        setExpectedHarvestDate(event.target.value)
                      }
                      className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/10"
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-[1fr_180px]">
                  <div>
                    <label
                      htmlFor="areaUsed"
                      className="mb-2 block text-sm font-semibold"
                    >
                      Area used
                    </label>

                    <input
                      id="areaUsed"
                      type="number"
                      min="0.01"
                      step="0.01"
                      value={areaUsed}
                      onChange={(event) =>
                        setAreaUsed(event.target.value)
                      }
                      placeholder="Enter crop area"
                      required
                      className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition placeholder:text-foreground-muted/60 focus:border-brand-green focus:ring-2 focus:ring-brand-green/10"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="areaUnit"
                      className="mb-2 block text-sm font-semibold"
                    >
                      Unit
                    </label>

                    <select
                      id="areaUnit"
                      value={areaUnit}
                      onChange={(event) =>
                        setAreaUnit(event.target.value)
                      }
                      className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/10"
                    >
                      <option value="acre">Acre</option>
                      <option value="hectare">Hectare</option>
                      <option value="guntha">Guntha</option>
                      <option value="bigha">Bigha</option>
                    </select>
                  </div>
                </div>

                {errorMessage && (
                  <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-600 dark:text-red-400">
                    {errorMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSaving || crops.length === 0}
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-green px-5 text-sm font-bold text-white transition hover:bg-brand-green-dark disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSaving
                    ? "Saving crop..."
                    : "Save crop cycle"}

                  {!isSaving && <ArrowRight size={17} />}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}