"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { ethers } from "ethers";

type WalletContextType = {
  address: string | null;
  balance: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
};

const WalletContext = createContext<WalletContextType>({
  address: null,
  balance: null,
  connectWallet: async () => {},
  disconnectWallet: () => {},
});

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        const balance = ethers.utils.formatEther(
          await provider.getBalance(address)
        );
        setAddress(address);
        setBalance(balance);
      } catch (error) {
        console.error("Failed to connect wallet:", error);
      }
    } else {
      console.error("Ethereum object not found, install MetaMask.");
    }
  };

  const disconnectWallet = () => {
    setAddress(null);
    setBalance(null);
  };

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      window.ethereum.on("accountsChanged", () => {
        disconnectWallet();
      });
    }
    return () => {
      if (typeof window.ethereum !== "undefined") {
        window.ethereum.removeListener("accountsChanged", disconnectWallet);
      }
    };
  }, []);

  return (
    <WalletContext.Provider
      value={{ address, balance, connectWallet, disconnectWallet }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
