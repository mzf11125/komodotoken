"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useWallet } from "../../contexts/WalletContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ConnectWalletPage() {
  const { address, connectWallet } = useWallet();
  const router = useRouter();

  useEffect(() => {
    if (address) {
      router.push("/portfolio");
    }
  }, [address, router]);

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Connect Your Wallet</CardTitle>
          <CardDescription>
            Connect your Ethereum wallet to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={connectWallet} className="w-full">
            Connect Wallet
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
