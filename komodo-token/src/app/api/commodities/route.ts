import { NextResponse } from "next/server";
import { apiClient } from "@liskhq/lisk-api-client";

export async function GET() {
  try {
    const client = await apiClient.createWSClient("ws://localhost:8080/ws");

    // This is a placeholder. You'll need to implement a custom module in your Lisk blockchain
    // to store and retrieve commodity prices.
    const commodities = await client.invoke("commodity:getCommodities");

    await client.disconnect();

    return NextResponse.json(commodities);
  } catch (error) {
    console.error("Error fetching commodities:", error);
    return NextResponse.json(
      { error: "Failed to fetch commodities" },
      { status: 500 }
    );
  }
}
