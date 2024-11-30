import React from "react";
import { ThemeProvider } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="text-center">
        <Image
          className="dark:invert mx-auto"
          src="/komodo.svg"
          alt="KomodoToken logo"
          width={180}
          height={38}
          priority
        />
        <h1 className="text-4xl font-bold mt-4">Welcome to KomodoToken</h1>
        <p className="text-xl mt-2">
          Bringing transparency and assurance to commodity trading
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              KomodoToken aims to revolutionize commodity trading by leveraging
              blockchain technology to ensure transparency, security, and
              efficiency in every transaction.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Key Features</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside">
              <li>Real-time commodity tracking</li>
              <li>Transparent pricing with National Average Price Index</li>
              <li>Verifiable transaction history</li>
              <li>Secure token-to-physical commodity exchange</li>
              <li>Ethereum wallet integration for seamless transactions</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Get Started</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-4">
            To start trading with KomodoToken, connect your Ethereum wallet
            using the "Connect Wallet" button in the navigation bar.
          </p>
          <p className="mb-4">
            Once connected, you can buy KomodoTokens, view your portfolio, and
            exchange tokens for physical commodities.
          </p>
          <div className="flex justify-center space-x-4">
            <Button variant="default" asChild>
              <Link href="/transaction">Buy KomodoToken</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/portfolio">View Portfolio</Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href="/exchange">Exchange Tokens</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Supported Platforms
        </h2>
        <div className="flex justify-center space-x-8">
          <Card className="w-24 h-24 flex items-center justify-center">
            <Image src="/lisk.svg" alt="Lisk logo" width={60} height={60} />
          </Card>
          <Card className="w-24 h-24 flex items-center justify-center">
            <Image
              src="/ethereum.svg"
              alt="Ethereum logo"
              width={60}
              height={60}
            />
          </Card>
          <Card className="w-24 h-24 flex items-center justify-center">
            <Image
              src="/bitcoin.svg"
              alt="Bitcoin logo"
              width={60}
              height={60}
            />
          </Card>
        </div>
      </div>
    </div>
  );
}
