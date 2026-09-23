import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CloudSun,
  Droplets,
  Leaf,
  MapPin,
  MessageCircle,
  Plus,
  Sprout,
  Tractor,
  TrendingUp,
} from "lucide-react";
import { LogoutButton } from "@/components/auth/logout-button";
import { AppShell } from "@/components/layout/app-shell";
import {
  getLanguageCodeByName,
} from "@/lib/i18n/config";
import { getTranslations } from "@/lib/i18n/translations";
export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Get farmer profile
  const { data: profile, error: profileError } = await supabase
    .from("farmer_profiles")
    .select(
      "id, full_name, phone, preferred_language",
    )
    .eq("user_id", user.id)
    .maybeSingle();

  if (profileError) {
    console.error("Profile loading error:", profileError.message);
  }

  if (!profile) {
    redirect("/profile");
  }

  const language = getLanguageCodeByName(
  profile.preferred_language,
);

const tr = getTranslations(language);

  // Get farmer's farm
  const { data: farm, error: farmError } = await supabase
    .from("farms")
    .select(
      "id, farm_name, location, state, district, village, land_area, area_unit, soil_type, water_source, irrigation_type, latitude, longitude",
    )
    .eq("farmer_id", profile.id)
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (farmError) {
    console.error("Farm loading error:", farmError.message);
  }

  
  
  // Get and save current weather for the farmer's farm
  let weather: {
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    precipitation: number;
    weather_code: number;
    wind_speed_10m: number;
  } | null = null;

  if (
    farm?.latitude !== null &&
    farm?.latitude !== undefined &&
    farm?.longitude !== null &&
    farm?.longitude !== undefined
  ) {
    const weatherUrl = new URL(
      "https://api.open-meteo.com/v1/forecast",
    );

    weatherUrl.searchParams.set(
      "latitude",
      String(farm.latitude),
    );
    weatherUrl.searchParams.set(
      "longitude",
      String(farm.longitude),
    );
    weatherUrl.searchParams.set(
      "current",
      [
        "temperature_2m",
        "relative_humidity_2m",
        "apparent_temperature",
        "precipitation",
        "weather_code",
        "wind_speed_10m",
      ].join(","),
    );
    weatherUrl.searchParams.set("timezone", "auto");

    try {
      const weatherResponse = await fetch(weatherUrl.toString(), {
        cache: "no-store",
      });

      if (weatherResponse.ok) {
        const weatherData = await weatherResponse.json();
        weather = weatherData.current;

        if (weather) {
          const { data: latestRecord, error: latestError } =
            await supabase
              .from("weather_records")
              .select("recorded_at")
              .eq("farm_id", farm.id)
              .order("recorded_at", { ascending: false })
              .limit(1)
              .maybeSingle();

          if (latestError) {
            console.error(
              "Latest weather record error:",
              latestError.message,
            );
          }

          const latestTimestamp = latestRecord?.recorded_at
            ? new Date(latestRecord.recorded_at).getTime()
            : 0;

          const oneHourInMilliseconds = 60 * 60 * 1000;

          const shouldSave =
            !latestTimestamp ||
            Date.now() - latestTimestamp >= oneHourInMilliseconds;

          if (shouldSave) {
            const { error: insertError } = await supabase
              .from("weather_records")
              .insert({
                farm_id: farm.id,
                recorded_at: new Date().toISOString(),
                temperature: weather.temperature_2m,
                humidity: weather.relative_humidity_2m,
                rainfall: weather.precipitation,
                wind_speed: weather.wind_speed_10m,
                weather_condition: String(weather.weather_code),
                source: "Open-Meteo",
                raw_data: weatherData,
              });

            if (insertError) {
              console.error(
                "Weather record insert error:",
                insertError.message,
              );
            }
          }
        }
      }
    } catch (error) {
      console.error("Dashboard weather loading error:", error);
    }
  }
    // Get farmer's active crop cycles
  let activeCropCount = 0;

  if (farm) {
    const { count, error: cropError } = await supabase
      .from("crop_cycles")
      .select("id", { count: "exact", head: true })
      .eq("farm_id", farm.id)
      .eq("status", "active");

    if (cropError) {
      console.error("Active crop loading error:", cropError.message);
    } else {
      activeCropCount = count ?? 0;
    }
  }

  const farmerName =
    profile.full_name ||
    user.user_metadata?.full_name ||
    user.email?.split("@")[0] ||
    "Farmer";

  const farmConfigured = Boolean(farm);

  const farmLocation = farm
    ? [farm.village, farm.district, farm.state]
        .filter(Boolean)
        .join(", ")
    : "";

  const farmArea = farm
    ? `${farm.land_area} ${farm.area_unit ?? "acre"}`
    : "—";

  const profileCompleteFields = [
    profile.full_name,
    profile.phone,
    profile.preferred_language,
  ].filter(Boolean).length;

  const farmCompleteFields = farm
    ? [
        farm.farm_name,
        farm.state,
        farm.district,
        farm.village,
        farm.land_area,
        farm.soil_type,
        farm.water_source,
        farm.irrigation_type,
      ].filter(Boolean).length
    : 0;

  const totalProfileFields = 3;
  const totalFarmFields = 8;

  const totalCompleted =
    profileCompleteFields + farmCompleteFields;

  const totalFields =
    totalProfileFields + totalFarmFields;

  const completionPercentage = farmConfigured
    ? Math.round((totalCompleted / totalFields) * 100)
    : Math.round((profileCompleteFields / totalProfileFields) * 100);

  return (
    <AppShell>
    <main className="min-h-screen bg-background text-foreground">
      {/* Top navigation */}
      <header className="border-b border-border bg-surface/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-green text-white">
              <Leaf size={21} />
            </div>

            <div>
              <p className="font-display text-lg font-bold tracking-tight">
                SAHAYAAK
              </p>

              <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-foreground-muted">
                {tr.smartFarming}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="hidden rounded-xl p-2.5 text-foreground-muted transition hover:bg-background hover:text-brand-green sm:block"
              aria-label="AI Assistant"
            >
              <MessageCircle size={20} />
            </button>

            
            <LogoutButton />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
        {/* Welcome */}
        <section className="relative overflow-hidden rounded-3xl bg-brand-green p-7 text-white shadow-sm sm:p-9">
          <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full border border-white/10" />
          <div className="absolute -bottom-32 right-24 h-80 w-80 rounded-full border border-brand-lime/20" />

          <div className="relative z-10 max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-lime">
              {tr.dashboard}
            </p>

            <h1 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              {tr.welcomeBack}, {farmerName}
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-6 text-white/70 sm:text-base">
              Your farming journey starts here. Manage your farm, monitor
              crops, understand markets and get AI-powered farming assistance.
            </p>

            {!farmConfigured && (
              <a
                href="/farm"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-lime px-5 py-3 text-sm font-bold text-black transition hover:opacity-90"
              >
                {tr.setupFarm}
                <ArrowRight size={17} />
              </a>
            )}

            {farmConfigured && (
              <div className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold text-white">
                <MapPin size={17} />
                {farmLocation || "Farm configured"}
              </div>
            )}
          </div>
        </section>

        {/* Overview */}
        <section className="mt-8">
          <div className="mb-4">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-green">
              {tr.yourOverview}
            </p>

            <h2 className="mt-1 font-display text-2xl font-bold tracking-tight">
              {tr.farmAtAGlance}
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {/* Farm */}
            <div className="rounded-2xl border border-border bg-surface p-5">
              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-green/10 text-brand-green">
                  <MapPin size={21} />
                </div>

                <span className="text-xs font-semibold text-foreground-muted">
                  Farm
                </span>
              </div>

              <p className="mt-5 text-sm text-foreground-muted">
                {tr.farmProfile}
              </p>

              <p className="mt-1 text-xl font-bold">
                {farmConfigured ? farm?.farm_name : "Not configured"}
              </p>

              <p className="mt-2 text-xs leading-5 text-foreground-muted">
                {farmConfigured
                  ? `${farmArea}${farmLocation ? ` • ${farmLocation}` : ""}`
                  : "Add your farm details to personalize SAHAYAAK."}
              </p>
            </div>

            {/* Crops */}
            <div className="rounded-2xl border border-border bg-surface p-5">
              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-lime/15 text-brand-green">
                  <Sprout size={21} />
                </div>

                <span className="text-xs font-semibold text-foreground-muted">
                  Crops
                </span>
              </div>

              <p className="mt-5 text-sm text-foreground-muted">
                {tr.activeCrops}
              </p>

                <p className="mt-1 text-xl font-bold">{activeCropCount}</p>
              <p className="mt-2 text-xs leading-5 text-foreground-muted">
            {activeCropCount > 0
              ? `${activeCropCount} active crop cycle${
                  activeCropCount === 1 ? "" : "s"
                } on your farm.`
              : "No active crop cycles yet. Add a crop to get started."}
          </p>
            </div>

            {/* Weather */}
            <div className="rounded-2xl border border-border bg-surface p-5">
              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400">
                  <CloudSun size={21} />
                </div>

                <span className="text-xs font-semibold text-foreground-muted">
                  Weather
                </span>
              </div>

              <p className="mt-5 text-sm text-foreground-muted">
                {tr.currentConditions}
              </p>

              <p className="mt-1 text-xl font-bold">
              {weather
                ? `${weather.temperature_2m}°C`
                : "Unavailable"}
            </p>

            <p className="mt-2 text-xs leading-5 text-foreground-muted">
              {weather
                ? `Feels like ${weather.apparent_temperature}°C • Humidity ${weather.relative_humidity_2m}% • Wind ${weather.wind_speed_10m} km/h`
                : "Add farm coordinates to view live weather."}
            </p>
            </div>

            {/* Market */}
            <div className="rounded-2xl border border-border bg-surface p-5">
              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-green/10 text-brand-green">
                  <TrendingUp size={21} />
                </div>

                <span className="text-xs font-semibold text-foreground-muted">
                  Market
                </span>
              </div>

              <p className="mt-5 text-sm text-foreground-muted">
                {tr.marketIntelligence}
              </p>

              <p className="mt-1 text-xl font-bold">Ready</p>

              <p className="mt-2 text-xs leading-5 text-foreground-muted">
                Explore prices and selling opportunities.
              </p>
            </div>
          </div>
        </section>

        {/* {tr.farmInformation} */}
        {farm && (
          <section className="mt-8">
            <div className="mb-4">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-green">
                {tr.farmInformation}
              </p>

              <h2 className="mt-1 font-display text-2xl font-bold tracking-tight">
                {farm.farm_name}
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-border bg-surface p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-green/10 text-brand-green">
                    <MapPin size={19} />
                  </div>

                  <div>
                    <p className="text-xs text-foreground-muted">
                      {tr.location}
                    </p>

                    <p className="mt-1 text-sm font-bold">
                      {farmLocation || "Not added"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-surface p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-lime/15 text-brand-green">
                    <Leaf size={19} />
                  </div>

                  <div>
                    <p className="text-xs text-foreground-muted">
                      {tr.landArea}
                    </p>

                    <p className="mt-1 text-sm font-bold">
                      {farmArea}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-surface p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400">
                    <Droplets size={19} />
                  </div>

                  <div>
                    <p className="text-xs text-foreground-muted">
                      {tr.waterSource}
                    </p>

                    <p className="mt-1 text-sm font-bold">
                      {farm.water_source || "Not added"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-surface p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-600 dark:text-orange-400">
                    <Tractor size={19} />
                  </div>

                  <div>
                    <p className="text-xs text-foreground-muted">
                      {tr.irrigation}
                    </p>

                    <p className="mt-1 text-sm font-bold">
                      {farm.irrigation_type || "Not added"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* {tr.quickActions} */}
        <section className="mt-8">
          <div className="mb-4">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-green">
              {tr.quickActions}
            </p>

            <h2 className="mt-1 font-display text-2xl font-bold tracking-tight">
              What do you want to do?
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <a
              href="/farm"
              className="group rounded-2xl border border-border bg-surface p-5 text-left transition hover:-translate-y-0.5 hover:border-brand-green/40 hover:shadow-md"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-green text-white">
                <Plus size={21} />
              </div>

              <h3 className="mt-5 font-bold">
                {farmConfigured ? "Manage farm" : "Set up farm"}
              </h3>

              <p className="mt-2 text-sm leading-5 text-foreground-muted">
                {farmConfigured
                  ? "Update your farm information and conditions."
                  : "Add land, location, soil and available resources."}
              </p>

              <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-brand-green">
                {farmConfigured ? "Manage farm" : "Start setup"}
                <ArrowRight size={14} />
              </span>
            </a>

            <Link
              href="/crops"
              className="group rounded-2xl border border-border bg-surface p-5 text-left transition hover:-translate-y-0.5 hover:border-brand-green/40 hover:shadow-md"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-lime/20 text-brand-green">
                <Sprout size={21} />
              </div>

              <h3 className="mt-5 font-bold">{tr.exploreCrops}</h3>

              <p className="mt-2 text-sm leading-5 text-foreground-muted">
                Get recommendations based on your farm conditions.
              </p>

              <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-brand-green">
                View crops
                <ArrowRight size={14} />
              </span>
            </Link>

            <Link
                href="/market"
                className="group rounded-2xl border border-border bg-surface p-5 text-left transition hover:-translate-y-0.5 hover:border-brand-green/40 hover:shadow-md"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500/10 text-orange-600 dark:text-orange-400">
                  <BarChart3 size={21} />
                </div>

                <h3 className="mt-5 font-bold">{tr.checkMarkets}</h3>

                <p className="mt-2 text-sm leading-5 text-foreground-muted">
                  Explore market prices and future selling opportunities.
                </p>

                <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-brand-green">
                  Explore market
                  <ArrowRight size={14} />
                </span>
              </Link>

            <button
              type="button"
              className="group rounded-2xl border border-border bg-surface p-5 text-left transition hover:-translate-y-0.5 hover:border-brand-green/40 hover:shadow-md"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
                <MessageCircle size={21} />
              </div>

              <h3 className="mt-5 font-bold">{tr.askSahayakAI}</h3>

              <p className="mt-2 text-sm leading-5 text-foreground-muted">
                Get farming guidance using text, voice and images.
              </p>

              <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-brand-green">
                Ask AI
                <ArrowRight size={14} />
              </span>
            </button>
          </div>
        </section>

        {/* {tr.gettingStarted} */}
        <section className="mt-8 grid gap-5 lg:grid-cols-[1.35fr_0.65fr]">
          <div className="rounded-2xl border border-border bg-surface p-6 sm:p-7">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-green/10 text-brand-green">
                <Tractor size={21} />
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-green">
                  {tr.gettingStarted}
                </p>

                <h3 className="mt-1 text-xl font-bold">
                  {farmConfigured
                    ? "Your farm is configured"
                    : "Complete your farm profile"}
                </h3>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-foreground-muted">
                  {farmConfigured
                    ? "Your farm information is ready. Next, start adding crops to unlock personalized farming intelligence."
                    : "SAHAYAAK needs your farm details before it can provide personalized recommendations and insights."}
                </p>
              </div>
            </div>

            <div className="mt-6 h-2 overflow-hidden rounded-full bg-background">
              <div
                className="h-full rounded-full bg-brand-green transition-all"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>

            <div className="mt-3 flex items-center justify-between text-xs">
              <span className="font-semibold text-foreground-muted">
                {tr.setupProgress}
              </span>

              <span className="font-bold text-brand-green">
                {completionPercentage}%
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-brand-green/15 bg-brand-green/5 p-6 sm:p-7">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-green text-white">
              <MessageCircle size={21} />
            </div>

            <h3 className="mt-5 text-lg font-bold">
              {tr.needFarmingGuidance}
            </h3>

            <p className="mt-2 text-sm leading-6 text-foreground-muted">
              SAHAYAAK AI will help you understand your farm and make better
              decisions using text, voice and images.
            </p>

            <Link
              href="/ai-assistant"
              className="group rounded-2xl border border-border bg-surface p-5 text-left transition hover:-translate-y-0.5 hover:border-brand-green/40 hover:shadow-md"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-green/10 text-brand-green">
                <MessageCircle size={21} />
              </div>

              <h3 className="mt-5 font-bold">{tr.askSahayakAI}</h3>

              <p className="mt-2 text-sm leading-5 text-foreground-muted">
                Get farming guidance, crop insights, and answers in your preferred language.
              </p>

              <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-brand-green">
                Ask AI
                <ArrowRight size={14} />
              </span>
            </Link>
          </div>
        </section>
      </div>
    </main>
    </AppShell>
  );
}


