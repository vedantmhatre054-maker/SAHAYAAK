import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  if (!lat || !lon) {
    return NextResponse.json(
      { error: "Latitude and longitude are required." },
      { status: 400 },
    );
  }

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}`,
      {
        headers: {
          "User-Agent": "SAHAYAAK Agriculture Platform",
        },
        cache: "no-store",
      },
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Address service unavailable." },
        { status: 502 },
      );
    }

    const data = await response.json();

    return NextResponse.json({
      address: data.display_name || "Location detected",
    });
  } catch (error) {
    console.error("Reverse geocoding error:", error);

    return NextResponse.json(
      { error: "Unable to detect address." },
      { status: 500 },
    );
  }
}