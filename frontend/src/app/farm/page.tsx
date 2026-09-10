"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Droplets,
  Leaf,
  MapPin,
  Sprout,
  Tractor,
} from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

const soilTypes = [
  "Black Soil",
  "Red Soil",
  "Alluvial Soil",
  "Laterite Soil",
  "Sandy Soil",
  "Clay Soil",
  "Loamy Soil",
  "Other",
];

const waterSources = [
  "Borewell",
  "Well",
  "Canal",
  "River",
  "Rainwater",
  "Farm Pond",
  "Other",
];

const irrigationTypes = [
  "Drip Irrigation",
  "Sprinkler Irrigation",
  "Flood Irrigation",
  "Furrow Irrigation",
  "Rainfed",
  "Other",
];

export default function FarmSetupPage() {
  const supabase = createClient();
  const router = useRouter();

  const [farmerId, setFarmerId] = useState("");
  const [farmId, setFarmId] = useState("");

  const [farmName, setFarmName] = useState("");
  const [location, setLocation] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [village, setVillage] = useState("");
  const [landArea, setLandArea] = useState("");
  const [areaUnit, setAreaUnit] = useState("acre");
  const [soilType, setSoilType] = useState("");
  const [waterSource, setWaterSource] = useState("");
  const [irrigationType, setIrrigationType] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadFarm = async () => {
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

      if (profileError) {
        setErrorMessage(profileError.message);
        setIsLoading(false);
        return;
      }

      if (!profile) {
        router.replace("/profile");
        return;
      }

      setFarmerId(profile.id);

      const { data: farm, error: farmError } = await supabase
        .from("farms")
        .select(
          "id, farm_name, location, state, district, village, land_area, area_unit, soil_type, water_source, irrigation_type",
        )
        .eq("farmer_id", profile.id)
        .order("created_at", { ascending: true })
        .limit(1)
        .maybeSingle();

      if (farmError) {
        setErrorMessage(farmError.message);
        setIsLoading(false);
        return;
      }

      if (farm) {
        setFarmId(farm.id);
        setFarmName(farm.farm_name ?? "");
        setLocation(farm.location ?? "");
        setState(farm.state ?? "");
        setDistrict(farm.district ?? "");
        setVillage(farm.village ?? "");
        setLandArea(farm.land_area ? String(farm.land_area) : "");
        setAreaUnit(farm.area_unit ?? "acre");
        setSoilType(farm.soil_type ?? "");
        setWaterSource(farm.water_source ?? "");
        setIrrigationType(farm.irrigation_type ?? "");
      }

      setIsLoading(false);
    };
    loadFarm();
  }, [router, supabase]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErrorMessage("");

    if (!farmName.trim()) {
      setErrorMessage("Please enter your farm name.");
      return;
    }

    if (!landArea || Number(landArea) <= 0) {
      setErrorMessage("Please enter a valid land area.");
      return;
    }

    setIsSaving(true);

    const farmData = {
      farmer_id: farmerId,
      farm_name: farmName.trim(),
      location: location.trim() || null,
      state: state.trim() || null,
      district: district.trim() || null,
      village: village.trim() || null,
      land_area: Number(landArea),
      area_unit: areaUnit,
      soil_type: soilType || null,
      water_source: waterSource || null,
      irrigation_type: irrigationType || null,
    };

    const result = farmId
      ? await supabase
          .from("farms")
          .update(farmData)
          .eq("id", farmId)
      : await supabase.from("farms").insert(farmData);

    setIsSaving(false);

    if (result.error) {
      setErrorMessage(result.error.message);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  };

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background text-foreground">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-green text-white">
            <Leaf size={24} />
          </div>

          <p className="mt-4 text-sm font-semibold text-foreground-muted">
            Loading farm setup...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-surface/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5 sm:px-8">
          <Link href="/dashboard" className="flex items-center gap-3">
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
            className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-semibold transition hover:border-brand-green/40 hover:text-brand-green"
          >
            <ArrowLeft size={16} />
            Dashboard
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-5 py-10 sm:px-8 sm:py-14">
        {/* Page heading */}
        <section className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-green text-white shadow-sm">
            <Tractor size={27} />
          </div>

          <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-brand-green">
            Farm setup
          </p>

          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Tell us about your farm
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-foreground-muted">
            These details help SAHAYAAK understand your farming conditions and
            provide better crop, weather and market recommendations.
          </p>
        </section>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-10 rounded-3xl border border-border bg-surface p-6 shadow-sm sm:p-8"
        >
          {/* Farm details */}
          <section>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-green/10 text-brand-green">
                <Sprout size={20} />
              </div>

              <div>
                <h2 className="font-bold">Farm details</h2>
                <p className="text-xs text-foreground-muted">
                  Basic information about your farm
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label
                  htmlFor="farmName"
                  className="mb-2 block text-sm font-semibold"
                >
                  Farm name
                </label>

                <input
                  id="farmName"
                  value={farmName}
                  onChange={(event) => setFarmName(event.target.value)}
                  placeholder="e.g. My Family Farm"
                  required
                  className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition placeholder:text-foreground-muted/60 focus:border-brand-green focus:ring-2 focus:ring-brand-green/10"
                />
              </div>

              <div>
                <label
                  htmlFor="state"
                  className="mb-2 block text-sm font-semibold"
                >
                  State
                </label>

                <input
                  id="state"
                  value={state}
                  onChange={(event) => setState(event.target.value)}
                  placeholder="e.g. Maharashtra"
                  className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition placeholder:text-foreground-muted/60 focus:border-brand-green focus:ring-2 focus:ring-brand-green/10"
                />
              </div>

              <div>
                <label
                  htmlFor="district"
                  className="mb-2 block text-sm font-semibold"
                >
                  District
                </label>

                <input
                  id="district"
                  value={district}
                  onChange={(event) => setDistrict(event.target.value)}
                  placeholder="e.g. Pune"
                  className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition placeholder:text-foreground-muted/60 focus:border-brand-green focus:ring-2 focus:ring-brand-green/10"
                />
              </div>

              <div>
                <label
                  htmlFor="village"
                  className="mb-2 block text-sm font-semibold"
                >
                  Village
                </label>

                <input
                  id="village"
                  value={village}
                  onChange={(event) => setVillage(event.target.value)}
                  placeholder="Enter village name"
                  className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition placeholder:text-foreground-muted/60 focus:border-brand-green focus:ring-2 focus:ring-brand-green/10"
                />
              </div>

              <div>
                <label
                  htmlFor="location"
                  className="mb-2 block text-sm font-semibold"
                >
                  Location / Address
                </label>

                <div className="relative">
                  <MapPin
                    size={18}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-muted"
                  />

                  <input
                    id="location"
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                    placeholder="Farm location or address"
                    className="h-12 w-full rounded-xl border border-border bg-background pl-11 pr-4 text-sm outline-none transition placeholder:text-foreground-muted/60 focus:border-brand-green focus:ring-2 focus:ring-brand-green/10"
                  />
                </div>
              </div>
            </div>
          </section>

          <div className="my-8 border-t border-border" />

          {/* Land information */}
          <section>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-lime/15 text-brand-green">
                <Leaf size={20} />
              </div>

              <div>
                <h2 className="font-bold">Land information</h2>
                <p className="text-xs text-foreground-muted">
                  Tell us about your available farmland
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-[1fr_180px]">
              <div>
                <label
                  htmlFor="landArea"
                  className="mb-2 block text-sm font-semibold"
                >
                  Land area
                </label>

                <input
                  id="landArea"
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={landArea}
                  onChange={(event) => setLandArea(event.target.value)}
                  placeholder="Enter land area"
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
                  onChange={(event) => setAreaUnit(event.target.value)}
                  className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/10"
                >
                  <option value="acre">Acre</option>
                  <option value="hectare">Hectare</option>
                  <option value="guntha">Guntha</option>
                  <option value="bigha">Bigha</option>
                </select>
              </div>
            </div>
          </section>

          <div className="my-8 border-t border-border" />

          {/* Farm conditions */}
          <section>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400">
                <Droplets size={20} />
              </div>

              <div>
                <h2 className="font-bold">Farm conditions</h2>
                <p className="text-xs text-foreground-muted">
                  These details improve crop recommendations
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-3">
              <div>
                <label
                  htmlFor="soilType"
                  className="mb-2 block text-sm font-semibold"
                >
                  Soil type
                </label>

                <select
                  id="soilType"
                  value={soilType}
                  onChange={(event) => setSoilType(event.target.value)}
                  className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/10"
                >
                  <option value="">Select soil type</option>

                  {soilTypes.map((soil) => (
                    <option key={soil} value={soil}>
                      {soil}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="waterSource"
                  className="mb-2 block text-sm font-semibold"
                >
                  Water source
                </label>

                <select
                  id="waterSource"
                  value={waterSource}
                  onChange={(event) => setWaterSource(event.target.value)}
                  className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/10"
                >
                  <option value="">Select water source</option>

                  {waterSources.map((source) => (
                    <option key={source} value={source}>
                      {source}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="irrigationType"
                  className="mb-2 block text-sm font-semibold"
                >
                  Irrigation type
                </label>

                <select
                  id="irrigationType"
                  value={irrigationType}
                  onChange={(event) =>
                    setIrrigationType(event.target.value)
                  }
                  className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/10"
                >
                  <option value="">Select irrigation type</option>

                  {irrigationTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          {/* Error */}
          {errorMessage && (
            <div className="mt-7 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-600 dark:text-red-400">
              {errorMessage}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isSaving}
            className="mt-8 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-green px-5 text-sm font-bold text-white shadow-sm transition hover:bg-brand-green-dark disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSaving ? "Saving farm..." : "Save farm and continue"}
            {!isSaving && <ArrowRight size={17} />}
          </button>
        </form>

        <p className="mt-6 text-center text-xs leading-5 text-foreground-muted">
          You can update your farm information later from your SAHAYAAK
          dashboard.
        </p>
      </div>
    </main>
  );
}