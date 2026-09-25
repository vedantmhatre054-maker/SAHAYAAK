import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

type ChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

type OpenRouterMessage = {
  role: "user" | "assistant" | "system";
  content:
    | string
    | Array<
        | {
            type: "text";
            text: string;
          }
        | {
            type: "image_url";
            image_url: {
              url: string;
            };
          }
      >;
};

type Farm = {
  id: string;
  farm_name: string;
  location: string | null;
  state: string | null;
  district: string | null;
  village: string | null;
  latitude: number | null;
  longitude: number | null;
  land_area: number;
  area_unit: string | null;
  soil_type: string | null;
  water_source: string | null;
  irrigation_type: string | null;
};

type CropCycle = {
  id: string;
  farm_id: string;
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const messages = body.messages as ChatMessage[];
    const language = body.language || "English";
    const conversationId = body.conversationId as string | undefined;
    const image = body.image as string | undefined;

    if (image && !image.startsWith("data:image/")) {
      return NextResponse.json(
        { error: "Invalid image format." },
        { status: 400 },
      );
    }

    if (image && image.length > 12_000_000) {
      return NextResponse.json(
        { error: "Image is too large. Please use an image under 9 MB." },
        { status: 413 },
      );
    }

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Messages are required." },
        { status: 400 },
      );
    }

    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "OpenRouter API key is not configured." },
        { status: 500 },
      );
    }

    const supabase = await createClient();

    // ---------------------------------------------------------
    // 1. Get authenticated user
    // ---------------------------------------------------------

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: "You must be logged in to use the AI assistant." },
        { status: 401 },
      );
    }

    // ---------------------------------------------------------
    // 2. Get farmer profile
    // ---------------------------------------------------------

    const { data: profile, error: profileError } = await supabase
      .from("farmer_profiles")
      .select(
        "id, full_name, age, gender, phone, email, preferred_language",
      )
      .eq("user_id", user.id)
      .maybeSingle();

    if (profileError) {
      console.error("Farmer profile error:", profileError);
    }

    if (!profile) {
      return NextResponse.json(
        { error: "Farmer profile not found." },
        { status: 404 },
      );
    }

    // ---------------------------------------------------------
    // 3. Get farmer's farms
    // ---------------------------------------------------------

    let farms: Farm[] = [];

    const { data: farmData, error: farmError } = await supabase
      .from("farms")
      .select(
        `
        id,
        farm_name,
        location,
        state,
        district,
        village,
        latitude,
        longitude,
        land_area,
        area_unit,
        soil_type,
        water_source,
        irrigation_type
        `,
      )
      .eq("farmer_id", profile.id);

    if (farmError) {
      console.error("Farm context error:", farmError);
    } else {
      farms = (farmData ?? []) as Farm[];
    }

    // ---------------------------------------------------------
    // 4. Get crop cycles
    // ---------------------------------------------------------

    let cropCycles: CropCycle[] = [];

    const farmIds = farms.map((farm) => farm.id);

    if (farmIds.length > 0) {
      const { data: cropData, error: cropError } = await supabase
        .from("crop_cycles")
        .select(
          `
          id,
          farm_id,
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
        .in("farm_id", farmIds);

      if (cropError) {
        console.error("Crop context error:", cropError);
      } else {
        cropCycles = (cropData ?? []) as unknown as CropCycle[];
      }
    }

    // ---------------------------------------------------------
    // 5. Build farmer context
    // ---------------------------------------------------------

    const farmContext =
      farms.length > 0
        ? farms
            .map((farm, index) => {
              const farmCrops = cropCycles.filter(
                (crop) => crop.farm_id === farm.id,
              );

              const cropText =
                farmCrops.length > 0
                  ? farmCrops
                      .map((crop, cropIndex) => {
                        const cropName =
                          crop.crop?.name || "Unknown crop";

                        const details = [
                          crop.variety
                            ? `Variety: ${crop.variety}`
                            : null,
                          crop.season
                            ? `Season: ${crop.season}`
                            : null,
                          crop.area_used
                            ? `Area: ${crop.area_used} ${
                                crop.area_unit || ""
                              }`
                            : null,
                          crop.status
                            ? `Status: ${crop.status}`
                            : null,
                          crop.sowing_date
                            ? `Sowing date: ${crop.sowing_date}`
                            : null,
                          crop.expected_harvest_date
                            ? `Expected harvest: ${crop.expected_harvest_date}`
                            : null,
                        ]
                          .filter(Boolean)
                          .join(", ");

                        return `  ${cropIndex + 1}. ${cropName}${
                          details ? ` (${details})` : ""
                        }`;
                      })
                      .join("\n")
                  : "  No crops configured.";

              return `
Farm ${index + 1}
-----------
Farm Name: ${farm.farm_name}
Location: ${farm.location || "Not provided"}
State: ${farm.state || "Not provided"}
District: ${farm.district || "Not provided"}
Village: ${farm.village || "Not provided"}
Land Area: ${farm.land_area} ${farm.area_unit || ""}
Soil Type: ${farm.soil_type || "Not provided"}
Water Source: ${farm.water_source || "Not provided"}
Irrigation: ${farm.irrigation_type || "Not provided"}
Latitude: ${farm.latitude ?? "Not provided"}
Longitude: ${farm.longitude ?? "Not provided"}

Current Crops:
${cropText}
`.trim();
            })
            .join("\n\n")
        : "No farm has been configured yet.";

    const farmerContext = `
FARMER CONTEXT
==============

Name: ${profile.full_name || "Not provided"}
Age: ${profile.age || "Not provided"}
Gender: ${profile.gender || "Not provided"}
Preferred Language: ${
      profile.preferred_language || language
    }

FARM INFORMATION
================

${farmContext}
`.trim();

    // ---------------------------------------------------------
    // 6. Find the latest farmer message
    // ---------------------------------------------------------

    const latestUserMessage = [...messages]
      .reverse()
      .find((message) => message.role === "user");

    if (!latestUserMessage) {
      return NextResponse.json(
        { error: "A user message is required." },
        { status: 400 },
      );
    }

    // ---------------------------------------------------------
    // 7. Create or reuse AI conversation
    // ---------------------------------------------------------

    let activeConversationId = conversationId;

    if (activeConversationId) {
      const { data: existingConversation, error: conversationError } =
        await supabase
          .from("ai_conversations")
          .select("id")
          .eq("id", activeConversationId)
          .eq("farmer_id", profile.id)
          .maybeSingle();

      if (conversationError) {
        console.error(
          "Conversation lookup error:",
          conversationError,
        );
      }

      if (!existingConversation) {
        activeConversationId = undefined;
      }
    }

    if (!activeConversationId) {
      const title =
        latestUserMessage.content.length > 80
          ? `${latestUserMessage.content.slice(0, 77)}...`
          : latestUserMessage.content;

      const { data: newConversation, error: createConversationError } =
        await supabase
          .from("ai_conversations")
          .insert({
            farmer_id: profile.id,
            title,
            context_type: "farm_assistant",
          })
          .select("id")
          .single();

      if (createConversationError || !newConversation) {
        console.error(
          "Create conversation error:",
          createConversationError,
        );

        return NextResponse.json(
          {
            error:
              "Unable to create the AI conversation.",
          },
          { status: 500 },
        );
      }

      activeConversationId = newConversation.id;
    }

    // ---------------------------------------------------------
    // 8. Save farmer message
    // ---------------------------------------------------------

    const { error: saveUserMessageError } = await supabase
      .from("ai_messages")
      .insert({
        conversation_id: activeConversationId,
        sender_type: "farmer",
        input_type: image ? "multimodal" : "text",
        message: latestUserMessage.content,
        image_url: null,
        language,
        retrieved_context: {
          profile: {
            id: profile.id,
            name: profile.full_name,
            preferred_language: profile.preferred_language,
          },
          farms,
          cropCycles,
        },
        model_name: "openrouter/free",
      });

    if (saveUserMessageError) {
      console.error(
        "Save farmer message error:",
        saveUserMessageError,
      );
    }

    // ---------------------------------------------------------
    // 9. AI system message
    // ---------------------------------------------------------

    const systemMessage: ChatMessage = {
      role: "system",
      content: `
You are SAHAYAAK, an agricultural AI assistant designed to help Indian farmers.

IMPORTANT LANGUAGE RULE:
- The farmer's selected language is: ${language}
- Always respond in ${language}.
- Do not switch to English unless the farmer asks for English.
- Keep technical agricultural terms understandable for farmers.

FARMER-SPECIFIC CONTEXT:
Use the following information when it is relevant to the farmer's question.

${farmerContext}

IMPORTANT CONTEXT RULES:
- Use the farmer's actual farm and crop information when relevant.
- Do not invent missing farmer information.
- If something says "Not provided" or "No farm has been configured yet", do not assume a value.
- Do not unnecessarily repeat private or personal information.
- If the farmer asks about their crops, use the crops listed above.
- If the farmer asks about their farm, use the farm information above.
- If multiple farms exist, distinguish between them clearly.
- If the farmer asks something unrelated to their personal farm context, answer normally.

Your responsibilities:
- Give practical and easy-to-understand farming guidance.
- Help with crops, soil, irrigation, weather, markets, government schemes, and farm activities.
- Prefer simple language that a farmer can understand.
- Do not invent government schemes, prices, weather information, or agricultural facts.
- If information is uncertain or requires current local data, clearly say so.
- Do not present yourself as a replacement for an agricultural expert.
- For serious crop disease, pesticide, chemical, or safety decisions, recommend consulting a qualified agricultural expert when appropriate.

Keep responses concise, useful, and action-oriented.
      `.trim(),
    };

    // ---------------------------------------------------------
    // 10. Send request to OpenRouter
    // ---------------------------------------------------------

    // ---------------------------------------------------------
    // 10. Build OpenRouter messages
    // ---------------------------------------------------------

    const openRouterMessages: OpenRouterMessage[] = messages.map(
      (message, index) => {
        const isLatestUserMessage =
          index === messages.length - 1 &&
          message.role === "user" &&
          message.content === latestUserMessage.content;

        if (image && isLatestUserMessage) {
          return {
            role: "user",
            content: [
              {
                type: "text",
                text: message.content,
              },
              {
                type: "image_url",
                image_url: {
                  url: image,
                },
              },
            ],
          };
        }

        return {
          role: message.role,
          content: message.content,
        };
      },
    );

    // ---------------------------------------------------------
    // 11. Send request to OpenRouter
    // ---------------------------------------------------------

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "SAHAYAAK",
        },
        body: JSON.stringify({
          model: "openrouter/free",
          messages: [systemMessage, ...openRouterMessages],
        }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("OpenRouter error:", data);

      return NextResponse.json(
        {
          error:
            data?.error?.message ||
            "The AI service could not process the request.",
        },
        { status: response.status },
      );
    }

    const reply = data?.choices?.[0]?.message?.content;

    if (!reply) {
      return NextResponse.json(
        { error: "The AI returned an empty response." },
        { status: 502 },
      );
    }

    // ---------------------------------------------------------
    // 12. Save AI response
    // ---------------------------------------------------------

    const { error: saveAssistantMessageError } = await supabase
      .from("ai_messages")
      .insert({
        conversation_id: activeConversationId,
        sender_type: "assistant",
        input_type: "text",
        message: reply,
        language,
        retrieved_context: {
          profile: {
            id: profile.id,
            name: profile.full_name,
            preferred_language: profile.preferred_language,
          },
          farms,
          cropCycles,
        },
        model_name: "openrouter/free",
      });

    if (saveAssistantMessageError) {
      console.error(
        "Save assistant message error:",
        saveAssistantMessageError,
      );
    }

    // ---------------------------------------------------------
    // 13. Update conversation timestamp
    // ---------------------------------------------------------

    await supabase
      .from("ai_conversations")
      .update({
        updated_at: new Date().toISOString(),
      })
      .eq("id", activeConversationId)
      .eq("farmer_id", profile.id);

    // ---------------------------------------------------------
    // 14. Return response
    // ---------------------------------------------------------

    return NextResponse.json({
      reply,
      conversationId: activeConversationId,
    });
  } catch (error) {
    console.error("AI chat error:", error);

    return NextResponse.json(
      {
        error:
          "Something went wrong while contacting the AI service.",
      },
      { status: 500 },
    );
  }
}