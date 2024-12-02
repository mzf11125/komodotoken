import { NextResponse } from "next/server";
import { apiClient } from "@liskhq/lisk-api-client";

export async function GET() {
  try {
    const client = await apiClient.createWSClient("ws://localhost:8080/ws");

    // This is a placeholder. You'll need to implement a custom module in your Lisk blockchain
    // to store and retrieve user token balances.
    const tokens = await client.invoke("token:getBalance", {
      address: "user_address_here", // Replace with actual user address
    });

    await client.disconnect();

    return NextResponse.json(tokens);
  } catch (error) {
    console.error("Error fetching tokens:", error);
    return NextResponse.json(
      { error: "Failed to fetch tokens" },
      { status: 500 }
    );
  }
}
