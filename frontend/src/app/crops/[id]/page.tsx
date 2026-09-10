import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Leaf,
  MapPin,
  Sprout,
  Wheat,
} from "lucide-react";

import { CropActivities } from "@/components/crops/crop-activities";
import { CropDoctor } from "@/components/crops/crop-doctor";
import { createClient } from "@/lib/supabase/server";

interface CropDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

function formatDate(date: string | null) {
  if (!date) {
    return "Not set";
  }

  const formatted = new Date(`${date}T00:00:00`);

  return formatted.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatStatus(status: string) {
  return status
    .replace(/_/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function getStatusClasses(status: string) {
  switch (status) {
    case "active":
      return "bg-brand-green/10 text-brand-green border-brand-green/20";

    case "harvested":
      return "bg-brand-lime/15 text-brand-green border-brand-lime/30";

    case "sold":
      return "bg-blue-500/10 text-blue-600 border-blue-500/20";

    case "cancelled":
      return "bg-red-500/10 text-red-600 border-red-500/20";

    default:
      return "bg-amber-500/10 text-amber-600 border-amber-500/20";
  }
}

export default async function CropDetailPage({
  params,
}: CropDetailPageProps) {
  const { id } = await params;

  const supabase = await createClient();

  // ------------------------------------------------------------
  // Authentication
  // ------------------------------------------------------------

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // ------------------------------------------------------------
  // Load crop cycle
  // ------------------------------------------------------------

  const { data: cropCycle, error: cropCycleError } =
    await supabase
      .from("crop_cycles")
      .select(
        `
          id,
          farm_id,
          crop_id,
          variety,
          season,
          sowing_date,
          expected_harvest_date,
          actual_harvest_date,
          area_used,
          area_unit,
          status,
          expected_yield,
          expected_profit,
          created_at,
          updated_at
        `,
      )
      .eq("id", id)
      .single();

  if (cropCycleError || !cropCycle) {
    notFound();
  }

  // ------------------------------------------------------------
  // Load crop information
  // ------------------------------------------------------------

  const { data: crop, error: cropError } = await supabase
    .from("crops")
    .select(
      `
        id,
        name,
        scientific_name,
        category,
        season,
        description
      `,
    )
    .eq("id", cropCycle.crop_id)
    .single();

  if (cropError || !crop) {
    notFound();
  }

  // ------------------------------------------------------------
  // Load farm information
  // ------------------------------------------------------------

  const { data: farm, error: farmError } = await supabase
    .from("farms")
    .select(
      `
        id,
        farm_name,
        location,
        state,
        district,
        village,
        land_area,
        area_unit,
        soil_type,
        water_source,
        irrigation_type
      `,
    )
    .eq("id", cropCycle.farm_id)
    .single();

  if (farmError || !farm) {
    notFound();
  }

  // ------------------------------------------------------------
  // Security check
  //
  // Verify that this farm belongs to the authenticated farmer.
  // ------------------------------------------------------------

  const { data: farmerProfile } = await supabase
    .from("farmer_profiles")
    .select("id")
    .eq("user_id", user.id)
    .single();

  if (!farmerProfile) {
    redirect("/profile");
  }

  const { data: farmerFarm } = await supabase
    .from("farms")
    .select("id")
    .eq("id", farm.id)
    .eq("farmer_id", farmerProfile.id)
    .single();

  if (!farmerFarm) {
    notFound();
  }

  // ------------------------------------------------------------
  // Derived values
  // ------------------------------------------------------------

  const locationParts = [
    farm.village,
    farm.district,
    farm.state,
  ].filter(Boolean);

  const locationText =
    locationParts.length > 0
      ? locationParts.join(", ")
      : farm.location || "Location not available";

  const areaText = cropCycle.area_used
    ? `${cropCycle.area_used} ${cropCycle.area_unit ?? "acre"}`
    : "Not specified";

  const statusClasses = getStatusClasses(
    cropCycle.status,
  );

  // ------------------------------------------------------------
  // Page
  // ------------------------------------------------------------

  return (
    <main className="min-h-screen bg-background px-4 py-6 text-foreground sm:px-6 lg:px-8 lg:py-8">
      <div className="mx-auto w-full max-w-6xl">
        {/* Back navigation */}
        <Link
          href="/crops"
          className="inline-flex items-center gap-2 text-sm font-semibold text-foreground-muted transition hover:text-brand-green"
        >
          <ArrowLeft size={17} />
          Back to all crops
        </Link>

        {/* Hero */}
        <section className="mt-6 overflow-hidden rounded-3xl border border-border bg-surface">
          <div className="relative overflow-hidden bg-brand-green px-6 py-8 sm:px-8 sm:py-10">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-white/10" />

            <div className="absolute -bottom-28 -left-16 h-72 w-72 rounded-full border border-brand-lime/15" />

            <div className="relative z-10">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-brand-lime">
                    <Leaf size={28} />
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-lime">
                      Crop details
                    </p>

                    <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                      {crop.name}
                    </h1>

                    {crop.scientific_name && (
                      <p className="mt-1 text-sm italic text-white/65">
                        {crop.scientific_name}
                      </p>
                    )}
                  </div>
                </div>

                <span
                  className={`inline-flex w-fit items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold ${statusClasses}`}
                >
                  {cropCycle.status === "active" ? (
                    <CheckCircle2 size={15} />
                  ) : (
                    <Clock3 size={15} />
                  )}

                  {formatStatus(cropCycle.status)}
                </span>
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                {cropCycle.variety && (
                  <div className="rounded-xl bg-white/10 px-4 py-2 text-sm text-white/85">
                    <span className="text-white/50">
                      Variety:
                    </span>{" "}
                    {cropCycle.variety}
                  </div>
                )}

                {cropCycle.season && (
                  <div className="rounded-xl bg-white/10 px-4 py-2 text-sm text-white/85">
                    <span className="text-white/50">
                      Season:
                    </span>{" "}
                    {cropCycle.season}
                  </div>
                )}

                <div className="rounded-xl bg-white/10 px-4 py-2 text-sm text-white/85">
                  <span className="text-white/50">
                    Area:
                  </span>{" "}
                  {areaText}
                </div>
              </div>
            </div>
          </div>

          {/* Crop overview */}
          <div className="grid gap-0 border-t border-border sm:grid-cols-3">
            <div className="border-b border-border p-6 sm:border-b-0 sm:border-r">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-green/10 text-brand-green">
                  <CalendarDays size={19} />
                </div>

                <div>
                  <p className="text-xs font-medium text-foreground-muted">
                    Sowing date
                  </p>

                  <p className="mt-1 text-sm font-bold">
                    {formatDate(cropCycle.sowing_date)}
                  </p>
                </div>
              </div>
            </div>

            <div className="border-b border-border p-6 sm:border-b-0 sm:border-r">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-lime/15 text-brand-green">
                  <Wheat size={19} />
                </div>

                <div>
                  <p className="text-xs font-medium text-foreground-muted">
                    Expected harvest
                  </p>

                  <p className="mt-1 text-sm font-bold">
                    {formatDate(
                      cropCycle.expected_harvest_date,
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-green/10 text-brand-green">
                  <Sprout size={19} />
                </div>

                <div>
                  <p className="text-xs font-medium text-foreground-muted">
                    Area under crop
                  </p>

                  <p className="mt-1 text-sm font-bold">
                    {areaText}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Crop and farm information */}
        <section className="mt-7 grid gap-6 lg:grid-cols-2">
          {/* Crop information */}
          <div className="rounded-2xl border border-border bg-surface p-6 sm:p-7">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-green/10 text-brand-green">
                <Leaf size={21} />
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-green">
                  Crop information
                </p>

                <h2 className="mt-1 font-display text-xl font-bold">
                  About this crop
                </h2>
              </div>
            </div>

            {crop.description ? (
              <p className="mt-5 text-sm leading-7 text-foreground-muted">
                {crop.description}
              </p>
            ) : (
              <p className="mt-5 text-sm leading-7 text-foreground-muted">
                Crop-specific guidance and recommendations
                will appear here as SAHAYAAK services are
                connected.
              </p>
            )}

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-background p-4">
                <p className="text-xs text-foreground-muted">
                  Category
                </p>

                <p className="mt-1 text-sm font-bold">
                  {crop.category || "Not specified"}
                </p>
              </div>

              <div className="rounded-xl bg-background p-4">
                <p className="text-xs text-foreground-muted">
                  Recommended season
                </p>

                <p className="mt-1 text-sm font-bold">
                  {crop.season || "Not specified"}
                </p>
              </div>
            </div>
          </div>

          {/* Farm information */}
          <div className="rounded-2xl border border-border bg-surface p-6 sm:p-7">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-lime/15 text-brand-green">
                <MapPin size={21} />
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-green">
                  Farm information
                </p>

                <h2 className="mt-1 font-display text-xl font-bold">
                  {farm.farm_name}
                </h2>
              </div>
            </div>

            <div className="mt-5">
              <p className="text-sm text-foreground-muted">
                {locationText}
              </p>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-background p-4">
                <p className="text-xs text-foreground-muted">
                  Soil type
                </p>

                <p className="mt-1 text-sm font-bold">
                  {farm.soil_type || "Not specified"}
                </p>
              </div>

              <div className="rounded-xl bg-background p-4">
                <p className="text-xs text-foreground-muted">
                  Water source
                </p>

                <p className="mt-1 text-sm font-bold">
                  {farm.water_source || "Not specified"}
                </p>
              </div>

              <div className="rounded-xl bg-background p-4">
                <p className="text-xs text-foreground-muted">
                  Irrigation
                </p>

                <p className="mt-1 text-sm font-bold">
                  {farm.irrigation_type || "Not specified"}
                </p>
              </div>

              <div className="rounded-xl bg-background p-4">
                <p className="text-xs text-foreground-muted">
                  Total farm area
                </p>

                <p className="mt-1 text-sm font-bold">
                  {farm.land_area}{" "}
                  {farm.area_unit || "acre"}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Crop lifecycle */}
        <section className="mt-7 rounded-2xl border border-border bg-surface p-6 sm:p-7">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-green/10 text-brand-green">
              <Sprout size={21} />
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-green">
                Crop lifecycle
              </p>

              <h2 className="mt-1 font-display text-2xl font-bold">
                Track your crop journey
              </h2>

              <p className="mt-2 text-sm leading-6 text-foreground-muted">
                SAHAYAAK will maintain the complete journey
                of this crop from cultivation to harvest.
              </p>
            </div>
          </div>

          <div className="mt-7 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-brand-green/15 bg-brand-green/5 p-5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-green text-white">
                <CheckCircle2 size={17} />
              </div>

              <p className="mt-4 text-xs font-bold uppercase tracking-wider text-brand-green">
                Start
              </p>

              <h3 className="mt-1 text-base font-bold">
                Sowing
              </h3>

              <p className="mt-2 text-sm text-foreground-muted">
                {formatDate(cropCycle.sowing_date)}
              </p>
            </div>

            <div
              className={`rounded-2xl border p-5 ${
                cropCycle.status === "active"
                  ? "border-brand-green/20 bg-brand-green/5"
                  : "border-border bg-background"
              }`}
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-lime text-black">
                <Sprout size={17} />
              </div>

              <p className="mt-4 text-xs font-bold uppercase tracking-wider text-brand-green">
                Current stage
              </p>

              <h3 className="mt-1 text-base font-bold">
                {formatStatus(cropCycle.status)}
              </h3>

              <p className="mt-2 text-sm text-foreground-muted">
                Activity and crop monitoring will be
                tracked here.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-background p-5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-background border border-border text-foreground-muted">
                <Wheat size={17} />
              </div>

              <p className="mt-4 text-xs font-bold uppercase tracking-wider text-foreground-muted">
                Harvest
              </p>

              <h3 className="mt-1 text-base font-bold">
                Expected
              </h3>

              <p className="mt-2 text-sm text-foreground-muted">
                {formatDate(
                  cropCycle.expected_harvest_date,
                )}
              </p>
            </div>
          </div>
        </section>

        {/* Crop activities */}
        <CropActivities cropCycleId={cropCycle.id} />

        <CropDoctor cropCycleId={cropCycle.id} />
        {/* Bottom navigation */}
        <div className="mt-7">
          <Link
            href="/crops"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-3 text-sm font-semibold text-foreground-muted transition hover:border-brand-green hover:text-brand-green"
          >
            <ArrowLeft size={16} />
            Back to all crops
          </Link>
        </div>
      </div>
    </main>
  );
}