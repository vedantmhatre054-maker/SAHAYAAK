import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();

  const searchQuery =
    request.nextUrl.searchParams.get("q")?.trim() ?? "";

  let query = supabase
    .from("market_prices")
    .select(
      `
      id,
      price_date,
      min_price,
      max_price,
      modal_price,
      unit,
      source,
      variety,
      grade,
      markets (
        id,
        name,
        state,
        district,
        city
      ),
      commodities (
        id,
        name,
        category,
        unit
      )
    `,
    )
    .order("price_date", { ascending: false })
    .limit(100);

  if (searchQuery) {
    const { data: commodities, error: commodityError } =
      await supabase
        .from("commodities")
        .select("id")
        .ilike("name", `%${searchQuery}%`);

    if (commodityError) {
      return NextResponse.json(
        { error: commodityError.message },
        { status: 500 },
      );
    }

    const { data: markets, error: marketError } = await supabase
      .from("markets")
      .select("id")
      .or(
        `name.ilike.%${searchQuery}%,city.ilike.%${searchQuery}%,district.ilike.%${searchQuery}%`,
      );

    if (marketError) {
      return NextResponse.json(
        { error: marketError.message },
        { status: 500 },
      );
    }

    const commodityIds = (commodities ?? []).map((item) => item.id);
    const marketIds = (markets ?? []).map((item) => item.id);

    if (commodityIds.length === 0 && marketIds.length === 0) {
      return NextResponse.json([]);
    }

    const filters: string[] = [];

    if (commodityIds.length > 0) {
      filters.push(
        `commodity_id.in.(${commodityIds.join(",")})`,
      );
    }

    if (marketIds.length > 0) {
      filters.push(`market_id.in.(${marketIds.join(",")})`);
    }

    query = query.or(filters.join(","));
  }

  const { data, error } = await query;

  if (error) {
    console.error("Market prices API error:", error.message);

    return NextResponse.json(
      { error: "Unable to load market prices." },
      { status: 500 },
    );
  }

  return NextResponse.json(data ?? []);
}