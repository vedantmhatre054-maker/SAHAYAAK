
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

function getWeatherCondition(weatherCode: number): string {
  if (weatherCode === 0) return "Clear sky";
  if ([1, 2, 3].includes(weatherCode)) return "Partly cloudy";
  if ([45, 48].includes(weatherCode)) return "Foggy";
  if ([51, 53, 55, 56, 57].includes(weatherCode)) {
    return "Drizzle";
  }
  if ([61, 63, 65, 66, 67].includes(weatherCode)) {
    return "Rain";
  }
  if ([71, 73, 75, 77].includes(weatherCode)) {
    return "Snow";
  }
  if ([80, 81, 82].includes(weatherCode)) {
    return "Rain showers";
  }
  if ([85, 86].includes(weatherCode)) {
    return "Snow showers";
  }
  if ([95, 96, 99].includes(weatherCode)) {
    return "Thunderstorm";
  }

  return "Unknown";
}

export async function POST(request: Request) {
  const supabase = await createClient();

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Authentication required." },
        { status: 401 },
      );
    }

    const body = await request.json();
    const farmId = body.farmId;

    if (!farmId || typeof farmId !== "string") {
      return NextResponse.json(
        { error: "A valid farm ID is required." },
        { status: 400 },
      );
    }

    const { data: profile, error: profileError } = await supabase
      .from("farmer_profiles")
      .select("id")
      .eq("user_id", user.id)
      .maybeSingle();

    if (profileError || !profile) {
      return NextResponse.json(
        { error: "Farmer profile not found." },
        { status: 404 },
      );
    }

    const { data: farm, error: farmError } = await supabase
      .from("farms")
      .select("id, latitude, longitude")
      .eq("id", farmId)
      .eq("farmer_id", profile.id)
      .maybeSingle();

    if (farmError) {
      console.error("Farm verification error:", farmError.message);

      return NextResponse.json(
        { error: "Unable to verify farm ownership." },
        { status: 500 },
      );
    }

    if (!farm) {
      return NextResponse.json(
        { error: "Farm not found or access denied." },
        { status: 404 },
      );
    }

    if (farm.latitude === null || farm.longitude === null) {
      return NextResponse.json(
        { error: "Farm GPS coordinates are missing." },
        { status: 400 },
      );
    }

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

    const weatherResponse = await fetch(weatherUrl.toString(), {
      cache: "no-store",
    });

    if (!weatherResponse.ok) {
      return NextResponse.json(
        { error: "Weather service unavailable." },
        { status: 502 },
      );
    }

    const weatherData = await weatherResponse.json();
    const currentWeather = weatherData.current;

    if (!currentWeather) {
      return NextResponse.json(
        { error: "Current weather data is unavailable." },
        { status: 502 },
      );
    }

    const { data: latestRecord, error: latestRecordError } =
      await supabase
        .from("weather_records")
        .select("recorded_at")
        .eq("farm_id", farm.id)
        .order("recorded_at", { ascending: false })
        .limit(1)
        .maybeSingle();

    if (latestRecordError) {
      console.error(
        "Latest weather record error:",
        latestRecordError.message,
      );
    }

    const latestRecordedAt = latestRecord?.recorded_at
      ? new Date(latestRecord.recorded_at).getTime()
      : 0;

    const oneHourInMilliseconds = 60 * 60 * 1000;
    const shouldSave =
      !latestRecordedAt ||
      Date.now() - latestRecordedAt >= oneHourInMilliseconds;

    if (shouldSave) {
      const { error: insertError } = await supabase
        .from("weather_records")
        .insert({
          farm_id: farm.id,
          recorded_at: new Date().toISOString(),
          temperature: currentWeather.temperature_2m,
          humidity: currentWeather.relative_humidity_2m,
          rainfall: currentWeather.precipitation,
          wind_speed: currentWeather.wind_speed_10m,
          weather_condition: getWeatherCondition(
            currentWeather.weather_code,
          ),
          source: "Open-Meteo",
          raw_data: weatherData,
        });

      if (insertError) {
        console.error(
          "Weather record insert error:",
          insertError.message,
        );

        return NextResponse.json(
          { error: "Weather fetched but could not be saved." },
          { status: 500 },
        );
      }
    }

    return NextResponse.json({
      ...weatherData,
      savedToDatabase: shouldSave,
    });
  } catch (error) {
    console.error("Weather API error:", error);

    return NextResponse.json(
      { error: "Unable to process weather data." },
      { status: 500 },
    );
  }
}