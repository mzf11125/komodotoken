import { NextResponse } from "next/server";
import { apiClient } from "@liskhq/lisk-api-client";

export async function GET() {
  try {
    const client = await apiClient.createWSClient("ws://localhost:8080/ws");

    // This is a placeholder. You'll need to implement a custom module in your Lisk blockchain
    // to store and retrieve user transactions.
    const transactions = await client.invoke("transaction:getTransactions", {
      address: "user_address_here", // Replace with actual user address
      limit: 10,
      offset: 0,
    });

    await client.disconnect();

    return NextResponse.json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return NextResponse.json(
      { error: "Failed to fetch transactions" },
      { status: 500 }
    );
  }
}
