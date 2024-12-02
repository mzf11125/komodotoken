"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

export default function ExchangePage() {
  const [selectedCommodity, setSelectedCommodity] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  const handleExchange = () => {
    // Handle token exchange
    fetch("/api/exchange", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ commodity: selectedCommodity, amount }),
    })
      .then((res) => res.json())
      .then((data) => {
        // Handle response (e.g., show success message, update user's portfolio)
        console.log(data);
      });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Token Exchange</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Exchange Tokens for Physical Commodities</CardTitle>
            <CardDescription>
              Redeem your tokens for physical commodities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Select onValueChange={setSelectedCommodity}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a commodity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gold">Gold</SelectItem>
                  <SelectItem value="silver">Silver</SelectItem>
                  <SelectItem value="oil">Oil</SelectItem>
                  <SelectItem value="wheat">Wheat</SelectItem>
                  <SelectItem value="coffee">Coffee</SelectItem>
                </SelectContent>
              </Select>
              <Input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <Button onClick={handleExchange}>Exchange Tokens</Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Exchange Process</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-2">
              <li>Select the commodity and amount you wish to exchange</li>
              <li>Confirm the exchange details and shipping information</li>
              <li>
                Your tokens will be burned and the physical commodity will be
                prepared for shipping
              </li>
              <li>Receive a tracking number and estimated delivery date</li>
              <li>
                Your commodity will be delivered to your registered address
              </li>
            </ol>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Shipping Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Physical commodities will be shipped to your registered address.
              Shipping fees may apply depending on the commodity and quantity.
            </p>
            <h3 className="font-semibold mb-2">Estimated Shipping Fees:</h3>
            <ul className="list-disc list-inside">
              <li>Gold/Silver: $20 per ounce</li>
              <li>Oil: $50 per barrel</li>
              <li>Wheat: $10 per bushel</li>
              <li>Coffee: $5 per pound</li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Verification and Assurance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              All physical commodities are stored in secure, audited facilities.
              Each shipment includes a certificate of authenticity and can be
              tracked on the blockchain.
            </p>
            <Button variant="outline" asChild>
              <a href="#" target="_blank" rel="noopener noreferrer">
                View Commodity Certificates
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
      <Alert className="mt-8">
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>Important Note</AlertTitle>
        <AlertDescription>
          Please ensure your registered address is up to date before initiating
          an exchange. Commodity exchanges are final and cannot be reversed once
          processed.
        </AlertDescription>
      </Alert>
    </div>
  );
}
